'use server'

import { getPayloadClient } from '@/lib/payload'

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

export type ConsultationResult =
  | { success: true }
  | { success: false; error: string }

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

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Die Anfrage konnte nicht gesendet werden.',
    }
  }
}
