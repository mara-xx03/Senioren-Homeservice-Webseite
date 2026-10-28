'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useMemo, useState, useTransition } from 'react'
import { submitOrder } from './actions'
import type { ShopProduct } from './shop-types'

type CartItem = {
  product: ShopProduct
  size: string
  quantity: number
}

const categoryLabels = {
  alle: 'Alle Artikel',
  damen: 'Damen',
  herren: 'Herren',
  schuhe: 'Schuhe',
} as const

function formatPrice(value: number) {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
  }).format(value)
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-2">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export default function ShopClient({ products }: { products: ShopProduct[] }) {
  const [category, setCategory] = useState<keyof typeof categoryLabels>('alle')
  const [sizes, setSizes] = useState<Record<string, string>>({})
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  const visibleProducts = useMemo(
    () => (category === 'alle' ? products : products.filter((product) => product.category === category)),
    [category, products],
  )
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  function addToCart(product: ShopProduct) {
    const size = sizes[String(product.id)] ?? product.sizes[0]
    if (!size || product.stockStatus === 'out') return

    setCart((current) => {
      const existing = current.find(
        (item) => String(item.product.id) === String(product.id) && item.size === size,
      )
      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, quantity: Math.min(10, item.quantity + 1) } : item,
        )
      }
      return [...current, { product, size, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function changeQuantity(index: number, quantity: number) {
    if (quantity < 1) {
      setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))
      return
    }
    setCart((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: Math.min(10, quantity) } : item,
      ),
    )
  }

  function handleOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await submitOrder({
        customerName: String(form.get('customerName') ?? ''),
        email: String(form.get('email') ?? ''),
        phone: String(form.get('phone') ?? ''),
        street: String(form.get('street') ?? ''),
        postalCode: String(form.get('postalCode') ?? ''),
        city: String(form.get('city') ?? ''),
        note: String(form.get('note') ?? ''),
        lines: cart.map((item) => ({
          product: item.product.id,
          size: item.size,
          quantity: item.quantity,
        })),
      })

      if (!result.success) {
        setError(result.error)
        return
      }
      setCart([])
      setCheckoutOpen(false)
      setConfirmation(result.orderNumber)
    })
  }

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#26322c]">
      <div className="bg-[#263e33] text-white">
        <div className="mx-auto flex min-h-10 max-w-[1180px] items-center justify-center px-5 text-sm sm:justify-between">
          <span className="hidden sm:inline">Kostenlose Lieferung ab CHF 80.–</span>
          <a className="font-semibold" href="tel:+41788701050">
            Persönliche Beratung: 078 870 10 50
          </a>
        </div>
      </div>

      <header className="border-b border-[#26322c]/15 bg-[#f6f1e8]">
        <div className="mx-auto flex min-h-24 max-w-[1180px] items-center justify-between gap-5 px-5">
          <Link className="flex items-center gap-3 leading-none" href="/">
            <span className="grid h-12 w-12 place-items-center rounded-[50%_50%_50%_8px] bg-[#9d3d46] font-serif text-3xl italic text-white">
              S
            </span>
            <span>
              <strong className="block font-serif text-xl font-medium">
                Senioren Homeservice GmbH
              </strong>
              <small className="mt-1 block text-[10px] font-bold uppercase tracking-[.12em] text-[#68736d]">
                Online-Shop
              </small>
            </span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-7">
            <Link className="hidden text-sm font-semibold underline-offset-4 hover:underline sm:block" href="/">
              Zur Startseite
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex min-h-12 items-center gap-2 rounded-sm bg-[#9d3d46] px-4 font-semibold text-white transition hover:bg-[#7e2e36]"
            >
              <BagIcon />
              <span className="hidden sm:inline">Warenkorb</span>
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1 text-xs text-[#9d3d46]">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-[#26322c]/15 bg-[#e9dfd0]">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-16 md:grid-cols-[1.2fr_.8fr] md:items-end md:py-24">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#9d3d46]">
                Bequem von zuhause einkaufen
              </p>
              <h1 className="max-w-3xl font-serif text-5xl leading-[.98] font-medium tracking-[-.035em] sm:text-7xl">
                Mode mit Komfort.
                <br />
                <em className="text-[#9d3d46]">Für jeden Tag.</em>
              </h1>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-[#56635c]">
              Pflegeleichte Mode und bequeme Schuhe, sorgfältig ausgewählt und sicher auf Rechnung bestellt.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-14 sm:py-20">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#26322c]/15 pb-7 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-[#69746e]">{products.length} ausgewählte Artikel</p>
              <h2 className="font-serif text-4xl font-medium">Unser Sortiment</h2>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Produkte filtern">
              {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition ${category === key
                      ? 'border-[#263e33] bg-[#263e33] text-white'
                      : 'border-[#26322c]/20 bg-transparent hover:border-[#26322c]'
                    }`}
                >
                  {categoryLabels[key]}
                </button>
              ))}
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="border border-dashed border-[#26322c]/25 p-12 text-center">
              <h3 className="font-serif text-3xl">Noch keine Artikel in dieser Kategorie</h3>
              <p className="mt-3 text-[#69746e]">Schauen Sie bald wieder vorbei.</p>
            </div>
          ) : (
            <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => {
                const selectedSize = sizes[String(product.id)] ?? product.sizes[0]
                return (
                  <article key={product.id} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#e4ddd2]">
                      {product.image ? (
                        <Image
                          src={product.image.url}
                          alt={product.image.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.025]"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-[#758078]">Kein Bild</div>
                      )}
                      {product.featured && (
                        <span className="absolute top-4 left-4 bg-[#9d3d46] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                          Empfehlung
                        </span>
                      )}
                      <span className="absolute right-4 bottom-4 bg-[#fffdf8]/95 px-3 py-1 text-xs font-semibold">
                        {product.stockStatus === 'low'
                          ? 'Wenige verfügbar'
                          : product.stockStatus === 'out'
                            ? 'Ausverkauft'
                            : 'Auf Lager'}
                      </span>
                    </div>
                    <div className="pt-5">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[.12em] text-[#9d3d46]">
                            {categoryLabels[product.category]}
                          </p>
                          <h3 className="mt-1 font-serif text-[28px] leading-tight font-medium">{product.name}</h3>
                        </div>
                        <strong className="pt-1 whitespace-nowrap text-lg">{formatPrice(product.price)}</strong>
                      </div>
                      <p className="mt-3 min-h-[52px] text-[15px] leading-relaxed text-[#69746e]">
                        {product.shortDescription}
                      </p>
                      <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                        <label className="sr-only" htmlFor={`size-${product.id}`}>
                          Grösse
                        </label>
                        <select
                          id={`size-${product.id}`}
                          value={selectedSize}
                          onChange={(event) =>
                            setSizes((current) => ({
                              ...current,
                              [String(product.id)]: event.target.value,
                            }))
                          }
                          className="min-h-12 rounded-sm border border-[#26322c]/25 bg-transparent px-3 font-semibold outline-none focus:border-[#26322c]"
                        >
                          {product.sizes.map((size) => (
                            <option key={size} value={size}>
                              Grösse {size}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          disabled={product.stockStatus === 'out'}
                          onClick={() => addToCart(product)}
                          className="min-h-12 rounded-sm bg-[#263e33] px-5 font-semibold text-white transition hover:bg-[#355646] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Hinzufügen
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <section className="bg-[#263e33] text-white">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-12 sm:grid-cols-3 sm:py-16">
            {[
              ['Sicher bestellen', 'Ihre Bestellung wird persönlich geprüft.'],
              ['Kauf auf Rechnung', 'Bezahlen Sie bequem nach Erhalt der Ware.'],
              ['Persönlich erreichbar', 'Wir helfen Ihnen gerne bei Grössen und Auswahl.'],
            ].map(([title, text], index) => (
              <div key={title} className="border-l border-white/20 pl-5">
                <span className="text-xs font-bold tracking-widest text-[#e7c1b5]">0{index + 1}</span>
                <h3 className="mt-2 font-serif text-2xl font-medium">{title}</h3>
                <p className="mt-2 text-sm text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-[#142019]/55" role="presentation" onMouseDown={() => setCartOpen(false)}>
          <aside
            className="ml-auto flex h-full w-full max-w-xl flex-col bg-[#fffdf8] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Warenkorb"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#26322c]/15 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#9d3d46]">Ihre Auswahl</p>
                <h2 className="font-serif text-3xl font-medium">Warenkorb</h2>
              </div>
              <button
                type="button"
                aria-label="Warenkorb schliessen"
                className="grid h-12 w-12 place-items-center rounded-full border border-[#26322c]/15"
                onClick={() => setCartOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {confirmation ? (
                <div className="mt-10 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#263e33] text-2xl text-white">✓</span>
                  <h3 className="mt-5 font-serif text-4xl font-medium">Vielen Dank!</h3>
                  <p className="mt-4 text-[#647068]">
                    Ihre Bestellung <strong>{confirmation}</strong> ist bei uns eingegangen. Wir melden uns in Kürze bei Ihnen.
                  </p>
                  <button
                    className="mt-7 min-h-12 rounded-sm bg-[#9d3d46] px-6 font-semibold text-white"
                    type="button"
                    onClick={() => {
                      setConfirmation('')
                      setCartOpen(false)
                    }}
                  >
                    Weiter einkaufen
                  </button>
                </div>
              ) : checkoutOpen ? (
                <form onSubmit={handleOrder}>
                  <button
                    type="button"
                    className="mb-5 text-sm font-semibold underline"
                    onClick={() => setCheckoutOpen(false)}
                  >
                    ← Zurück zum Warenkorb
                  </button>
                  <h3 className="font-serif text-3xl font-medium">Bestelldaten</h3>
                  <p className="mt-2 text-sm text-[#69746e]">Alle Felder ausser Bemerkung sind erforderlich.</p>
                  <div className="mt-6 grid gap-4">
                    <input required name="customerName" placeholder="Vor- und Nachname" className="shop-input" />
                    <input required type="email" name="email" placeholder="E-Mail-Adresse" className="shop-input" />
                    <input required type="tel" name="phone" placeholder="Telefonnummer" className="shop-input" />
                    <input required name="street" placeholder="Strasse und Hausnummer" className="shop-input" />
                    <div className="grid grid-cols-[.45fr_1fr] gap-3">
                      <input required name="postalCode" placeholder="PLZ" className="shop-input" />
                      <input required name="city" placeholder="Ort" className="shop-input" />
                    </div>
                    <textarea name="note" placeholder="Bemerkung (optional)" rows={3} className="shop-input resize-none" />
                  </div>
                  {error && (
                    <p className="mt-4 border border-[#9d3d46]/30 bg-[#9d3d46]/10 p-3 text-sm text-[#7e2e36]">{error}</p>
                  )}
                  <div className="mt-6 border-t border-[#26322c]/15 pt-5">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Gesamtsumme</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#69746e]">Zahlung auf Rechnung</p>
                  </div>
                  <button
                    type="submit"
                    disabled={pending}
                    className="mt-5 min-h-14 w-full rounded-sm bg-[#9d3d46] px-6 font-bold text-white transition hover:bg-[#7e2e36] disabled:opacity-60"
                  >
                    {pending ? 'Bestellung wird gesendet …' : 'Zahlungspflichtig bestellen'}
                  </button>
                </form>
              ) : cart.length === 0 ? (
                <div className="mt-16 text-center">
                  <BagIcon />
                  <h3 className="mt-5 font-serif text-3xl font-medium">Ihr Warenkorb ist leer</h3>
                  <p className="mt-2 text-[#69746e]">Entdecken Sie unsere bequeme Mode.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item, index) => (
                    <div key={`${item.product.id}-${item.size}`} className="grid grid-cols-[80px_1fr] gap-4 border-b border-[#26322c]/15 pb-5">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#e4ddd2]">
                        {item.product.image && (
                          <Image src={item.product.image.url} alt="" fill sizes="80px" className="object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="flex justify-between gap-3">
                          <div>
                            <h3 className="font-serif text-xl font-medium leading-tight">{item.product.name}</h3>
                            <p className="mt-1 text-xs text-[#69746e]">Grösse {item.size}</p>
                          </div>
                          <strong className="whitespace-nowrap">{formatPrice(item.product.price * item.quantity)}</strong>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="Menge verringern"
                            onClick={() => changeQuantity(index, item.quantity - 1)}
                            className="grid h-9 w-9 place-items-center border border-[#26322c]/20"
                          >
                            −
                          </button>
                          <span className="min-w-5 text-center font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Menge erhöhen"
                            onClick={() => changeQuantity(index, item.quantity + 1)}
                            className="grid h-9 w-9 place-items-center border border-[#26322c]/20"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="ml-auto text-xs font-semibold underline"
                            onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                          >
                            Entfernen
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!confirmation && !checkoutOpen && cart.length > 0 && (
              <div className="border-t border-[#26322c]/15 bg-[#f6f1e8] px-6 py-6 sm:px-8">
                <div className="flex justify-between text-xl font-bold">
                  <span>Gesamtsumme</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <p className="mt-1 text-xs text-[#69746e]">Versand wird vor Bestätigung geprüft.</p>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(true)}
                  className="mt-5 min-h-14 w-full rounded-sm bg-[#9d3d46] px-6 font-bold text-white transition hover:bg-[#7e2e36]"
                >
                  Zur Bestellung
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      <footer className="bg-[#1e2b25] text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-5 px-5 py-8 text-sm text-white/65 sm:flex-row">
          <span>© 2025 Senioren Homeservice GmbH</span>
          <span>senioren-homeservice@gmx.ch · 078 870 10 50</span>
        </div>
      </footer>
    </div>
  )
}
