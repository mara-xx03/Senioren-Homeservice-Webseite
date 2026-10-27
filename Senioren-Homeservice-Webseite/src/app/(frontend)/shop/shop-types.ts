export type ShopProduct = {
  id: string
  name: string
  sku: string
  category: 'damen' | 'herren' | 'schuhe'
  shortDescription: string
  price: number
  image: {
    url: string
    alt: string
  } | null
  sizes: string[]
  stockStatus: 'in-stock' | 'low' | 'out'
  featured: boolean
}

export type CartLineInput = {
  product: string
  size: string
  quantity: number
}

export type OrderInput = {
  customerName: string
  email: string
  phone: string
  street: string
  postalCode: string
  city: string
  note: string
  lines: CartLineInput[]
}
