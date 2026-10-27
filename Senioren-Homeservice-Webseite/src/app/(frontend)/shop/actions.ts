'use server'

import { getPayloadClient } from '@/lib/payload'
import type { OrderInput } from './shop-types'

export type OrderResult =
  | { success: true; orderNumber: string }
  | { success: false; error: string }

function cleanText(value: unknown, label: string, maxLength: number) {
  if (typeof value !== 'string') throw new Error(`${label} fehlt.`)
  const clean = value.trim()
  if (!clean || clean.length > maxLength) throw new Error(`${label} ist ungültig.`)
  return clean
}

export async function submitOrder(input: OrderInput): Promise<OrderResult> {
  try {
    const customerName = cleanText(input.customerName, 'Name', 120)
    const email = cleanText(input.email, 'E-Mail', 200).toLowerCase()
    const phone = cleanText(input.phone, 'Telefon', 50)
    const street = cleanText(input.street, 'Strasse', 160)
    const postalCode = cleanText(input.postalCode, 'PLZ', 12)
    const city = cleanText(input.city, 'Ort', 100)
    const note = typeof input.note === 'string' ? input.note.trim().slice(0, 1000) : ''

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }
    }
    if (!Array.isArray(input.lines) || input.lines.length === 0 || input.lines.length > 30) {
      return { success: false, error: 'Ihr Warenkorb ist leer oder zu gross.' }
    }

    const lines = input.lines.map((line) => {
      if (
        typeof line.product !== 'string' ||
        typeof line.size !== 'string' ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1 ||
        line.quantity > 10
      ) {
        throw new Error('Ein Artikel im Warenkorb ist ungültig.')
      }
      return {
        product: line.product,
        size: line.size.trim().slice(0, 30),
        quantity: line.quantity,
      }
    })

    const payload = await getPayloadClient()
    const order = await payload.create({
      collection: 'orders',
      data: {
        customerName,
        email,
        phone,
        address: { street, postalCode, city },
        lines,
        note,
      },
      overrideAccess: false,
    })

    return {
      success: true,
      orderNumber: order.orderNumber ?? String(order.id),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Die Bestellung konnte nicht gesendet werden.'
    return { success: false, error: message }
  }
}
