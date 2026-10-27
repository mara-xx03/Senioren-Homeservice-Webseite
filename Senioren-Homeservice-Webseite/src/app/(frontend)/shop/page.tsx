import type { Metadata } from 'next'
import ShopClient from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop - Senioren Homeservice',
}

export default async function ShopPage() {
  const products: any[] = []

  return <ShopClient products={products} />
}
