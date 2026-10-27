import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import ShopClient from './ShopClient'
import type { ShopProduct } from './shop-types'

export const metadata: Metadata = {
  title: 'Online-Shop | Senioren Homeservice GmbH',
  description:
    'Bequeme Damen- und Herrenmode sowie Gesundheitsschuhe für Seniorinnen und Senioren sicher auf Rechnung bestellen.',
}

export default async function ShopPage() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 100,
    sort: ['-featured', 'name'],
    overrideAccess: false,
  })

  const products: ShopProduct[] = result.docs.map((product) => {
    const image =
      typeof product.image === 'object' && product.image?.url
        ? { url: product.image.url, alt: product.image.alt }
        : null

    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category,
      shortDescription: product.shortDescription,
      price: product.price,
      image,
      sizes: product.sizes?.map((entry) => entry.label) ?? [],
      stockStatus: product.stockStatus,
      featured: product.featured ?? false,
    }
  })

  return <ShopClient products={products} />
}
