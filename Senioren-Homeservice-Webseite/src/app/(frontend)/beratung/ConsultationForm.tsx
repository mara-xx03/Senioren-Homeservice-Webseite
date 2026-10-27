'use client'

import { FormEvent, useState, useTransition } from 'react'
import { submitConsultation } from './actions'

export default function ConsultationForm() {
  const [pending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [topic, setTopic] = useState('personal')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await submitConsultation({
        customerName: String(form.get('customerName') ?? ''),
        email: String(form.get('email') ?? ''),
        phone: String(form.get('phone') ?? ''),
        preferredContact: String(form.get('preferredContact') ?? 'phone'),
        topic: String(form.get('topic') ?? 'personal'),
        message: String(form.get('message') ?? ''),
        institutionName: String(form.get('institutionName') ?? ''),
        institutionRole: String(form.get('institutionRole') ?? ''),
        authorizedRepresentative: form.get('authorizedRepresentative') === 'yes',
      })

      if (!result.success) {
        setError(result.error)
        return
      }
      setSuccess(true)
    })
  }

  if (success) {
    return (
      <div className="border border-[#263e33]/15 bg-[#fffdf8] p-8 text-center sm:p-12">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#263e33] text-2xl text-white">
          ✓
        </span>
        <h2 className="mt-6 font-serif text-4xl font-medium">Vielen Dank für Ihre Anfrage.</h2>
        <p className="mx-auto mt-4 max-w-lg text-[#657069]">
          Wir haben Ihre Nachricht erhalten und melden uns so bald wie möglich persönlich bei Ihnen.
        </p>
        <a
          href="/"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#9d3d46] px-6 font-semibold text-white"
        >
          Zurück zur Startseite
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[#26322c]/15 bg-[#fffdf8] p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold">Vor- und Nachname *</span>
          <input required name="customerName" autoComplete="name" className="shop-input" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold">Telefonnummer *</span>
          <input required name="phone" type="tel" autoComplete="tel" className="shop-input" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold">E-Mail-Adresse</span>
          <input name="email" type="email" autoComplete="email" className="shop-input" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold">Wie dürfen wir Sie kontaktieren? *</span>
          <select required name="preferredContact" className="shop-input">
            <option value="phone">Per Telefon</option>
            <option value="email">Per E-Mail</option>
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold">Worum geht es? *</span>
          <select
            required
            name="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="shop-input"
          >
            <option value="personal">Persönliche Modeberatung</option>
            <option value="product">Frage zu einem Produkt</option>
            <option value="home-service">Mobiler Homeservice</option>
            <option value="institution">Verkaufstag – nur für Heimleitungen</option>
            <option value="other">Andere Frage</option>
          </select>
        </label>
        {topic === 'institution' && (
          <div className="sm:col-span-2 grid gap-5 border border-[#9d3d46]/20 bg-[#9d3d46]/5 p-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <strong className="block font-serif text-2xl font-medium text-[#7e2e36]">
                Anfrage für einen Verkaufstag
              </strong>
              <p className="mt-1 text-sm text-[#657069]">
                Dieser Bereich ist ausschliesslich für Leitungen und autorisierte Vertretungen
                von Alters- und Pflegeheimen bestimmt.
              </p>
            </div>
            <label>
              <span className="mb-2 block text-sm font-semibold">Name des Heims *</span>
              <input required name="institutionName" className="shop-input" />
            </label>
            <label>
              <span className="mb-2 block text-sm font-semibold">Ihre Funktion *</span>
              <select required name="institutionRole" className="shop-input">
                <option value="">Bitte auswählen</option>
                <option value="management">Heimleitung / Geschäftsleitung</option>
                <option value="care-management">Pflegedienstleitung</option>
                <option value="administration">Einkauf / Verwaltung</option>
                <option value="authorized-representative">Andere autorisierte Vertretung</option>
              </select>
            </label>
            <label className="sm:col-span-2 flex items-start gap-3">
              <input
                required
                type="checkbox"
                name="authorizedRepresentative"
                value="yes"
                className="mt-1 h-5 w-5 accent-[#9d3d46]"
              />
              <span className="text-sm leading-relaxed">
                Ich bestätige, dass ich berechtigt bin, diese Anfrage im Namen der Institution
                zu stellen.
              </span>
            </label>
          </div>
        )}
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold">Ihre Nachricht</span>
          <textarea
            name="message"
            rows={5}
            className="shop-input resize-none"
            placeholder="Wie können wir Ihnen helfen?"
          />
        </label>
      </div>

      {error && (
        <p className="mt-5 border border-[#9d3d46]/30 bg-[#9d3d46]/10 p-3 text-sm text-[#7e2e36]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-7 min-h-14 w-full rounded-sm bg-[#9d3d46] px-7 font-bold text-white transition hover:bg-[#7e2e36] disabled:opacity-60 sm:w-auto"
      >
        {pending ? 'Anfrage wird gesendet …' : 'Beratung anfragen'}
      </button>
      <p className="mt-4 text-xs text-[#69746e]">
        Wir verwenden Ihre Angaben ausschliesslich zur Bearbeitung Ihrer Anfrage.
      </p>
    </form>
  )
}
