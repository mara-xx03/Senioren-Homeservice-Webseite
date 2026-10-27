'use server'

import type { OrderInput } from './shop-types'

export type OrderResult =
  | { success: true; orderNumber: string }
  | { success: false; error: string }

export async function submitOrder(input: OrderInput): Promise<OrderResult> {
  return {
    success: true,
    orderNumber: 'DEMO-' + Math.floor(100000 + Math.random() * 900000),
  }
}
