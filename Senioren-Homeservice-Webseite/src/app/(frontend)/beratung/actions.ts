'use server'

import { getPayloadClient } from '@/lib/payload'
import { sendMail } from '@/lib/send-mail'

type ConsultationInput = {
  customerName: string
  email: string
  phone: string
  preferredContact: string
  topic: string
  message: string
  institutionName: string
  institutionRole: string
  authorizedRepresentative: boolean
}

export type MailLinks = {
  mailto: string
  gmail: string
  outlook: string
}

export type ConsultationResult =
  | { success: true; mailSent: boolean; mailLinks: MailLinks }
  | { success: false; error: string }

const CONTACT_EMAIL = 'senioren-homeservice@gmx.ch'
const CONTACT_CC_EMAIL = 'mode-homeservice@gmx.ch'

const topicLabels: Record<string, string> = {
  personal: 'Persönliche Modeberatung',
  product: 'Frage zu einem Produkt',
  'home-service': 'Mobiler Homeservice',
  institution: 'Verkaufstag – Anfrage einer Heimleitung',
  other: 'Andere Frage',
}

const roleLabels: Record<string, string> = {
  management: 'Heimleitung / Geschäftsleitung',
  'care-management': 'Pflegedienstleitung',
  administration: 'Einkauf / Verwaltung',
  'authorized-representative': 'Andere autorisierte Vertretung',
}

function buildMailContent(fields: {
  customerName: string
  phone: string
  email: string
  preferredContact: 'phone' | 'email'
  topic: string
  message: string
  institutionName: string
  institutionRole?: string
}) {
  const subject = `Anfrage von ${fields.customerName} – ${topicLabels[fields.topic] ?? 'Anfrage'}`

  const lines = [
    `Name: ${fields.customerName}`,
    `Telefon: ${fields.phone}`,
    `E-Mail: ${fields.email || '–'}`,
    `Gewünschter Kontaktweg: ${fields.preferredContact === 'email' ? 'Per E-Mail' : 'Per Telefon'}`,
    `Anliegen: ${topicLabels[fields.topic] ?? fields.topic}`,
  ]

  if (fields.institutionName) lines.push(`Heim: ${fields.institutionName}`)
  if (fields.institutionRole) {
    lines.push(`Funktion: ${roleLabels[fields.institutionRole] ?? fields.institutionRole}`)
  }

  lines.push('', 'Nachricht:', fields.message || '–')

  return { subject, body: lines.join('\n') }
}

function buildMailLinks(subject: string, body: string): MailLinks {
  // URLSearchParams kodiert Leerzeichen als "+", in mailto-Links muss es %20 sein.
  const encode = (params: Record<string, string>) =>
    new URLSearchParams(params).toString().replace(/\+/g, '%20')

  return {
    mailto: `mailto:${CONTACT_EMAIL}?${encode({ cc: CONTACT_CC_EMAIL, subject, body })}`,
    gmail: `https://mail.google.com/mail/?${encode({
      view: 'cm',
      fs: '1',
      to: CONTACT_EMAIL,
      cc: CONTACT_CC_EMAIL,
      su: subject,
      body,
    })}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?${encode({
      to: CONTACT_EMAIL,
      cc: CONTACT_CC_EMAIL,
      subject,
      body,
    })}`,
  }
}

function cleanRequired(value: unknown, label: string, maxLength: number) {
  if (typeof value !== 'string') throw new Error(`${label} fehlt.`)
  const clean = value.trim()
  if (!clean || clean.length > maxLength) throw new Error(`${label} ist ungültig.`)
  return clean
}

export async function submitConsultation(
  input: ConsultationInput,
): Promise<ConsultationResult> {
  try {
    const customerName = cleanRequired(input.customerName, 'Name', 120)
    const phone = cleanRequired(input.phone, 'Telefon', 50)
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
    const message = typeof input.message === 'string' ? input.message.trim().slice(0, 1500) : ''
    const preferredContact = input.preferredContact === 'email' ? 'email' : 'phone'
    const allowedTopics = ['personal', 'product', 'home-service', 'institution', 'other'] as const
    const topic = allowedTopics.includes(input.topic as (typeof allowedTopics)[number])
      ? (input.topic as (typeof allowedTopics)[number])
      : 'personal'
    const institutionName =
      typeof input.institutionName === 'string' ? input.institutionName.trim().slice(0, 160) : ''
    const allowedRoles = [
      'management',
      'care-management',
      'administration',
      'authorized-representative',
    ] as const
    const institutionRole = allowedRoles.includes(
      input.institutionRole as (typeof allowedRoles)[number],
    )
      ? (input.institutionRole as (typeof allowedRoles)[number])
      : undefined

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }
    }
    if (preferredContact === 'email' && !email) {
      return { success: false, error: 'Für eine Antwort per E-Mail benötigen wir Ihre E-Mail-Adresse.' }
    }
    if (
      topic === 'institution' &&
      (!institutionName || !institutionRole || input.authorizedRepresentative !== true)
    ) {
      return {
        success: false,
        error:
          'Verkaufstagsanfragen sind nur für autorisierte Leitungen oder Vertretungen von Alters- und Pflegeheimen möglich.',
      }
    }

    const payload = await getPayloadClient()
    if (payload) {
      await payload.create({
        collection: 'consultation-requests',
        data: {
          customerName,
          phone,
          email: email || undefined,
          preferredContact,
          topic,
          message,
          institutionName: institutionName || undefined,
          institutionRole,
          authorizedRepresentative:
            topic === 'institution' ? input.authorizedRepresentative === true : false,
        },
        overrideAccess: false,
      })
    }

    const { subject, body } = buildMailContent({
      customerName,
      phone,
      email,
      preferredContact,
      topic,
      message,
      institutionName,
      institutionRole,
    })

    const mailSent = await sendMail({
      to: CONTACT_EMAIL,
      cc: CONTACT_CC_EMAIL,
      replyTo: email || undefined,
      subject,
      text: body,
    })

    return { success: true, mailSent, mailLinks: buildMailLinks(subject, body) }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Die Anfrage konnte nicht gesendet werden.',
    }
  }
}
