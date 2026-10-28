import type { Metadata } from 'next'
import Link from 'next/link'
import ConsultationForm from './ConsultationForm'

export const metadata: Metadata = {
  title: 'Beratung anfragen | Senioren Homeservice GmbH',
  description:
    'Fragen Sie eine persönliche Modeberatung oder einen Besuch der Senioren Homeservice GmbH an.',
}

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#26322c]">
      <div className="bg-[#263e33] text-white">
        <div className="mx-auto flex min-h-10 max-w-[1180px] items-center justify-center px-5 text-sm sm:justify-between">
          <span className="hidden sm:inline">Persönlich. Bequem. Bei Ihnen.</span>
          <a className="font-semibold" href="tel:+41788701050">
            078 870 10 50
          </a>
        </div>
      </div>

      <header className="border-b border-[#26322c]/15">
        <div className="mx-auto flex min-h-24 max-w-[1180px] items-center justify-between gap-5 px-5">
          <Link className="flex items-center gap-3 leading-none" href="/">
            <span className="grid h-12 w-12 place-items-center rounded-[50%_50%_50%_8px] bg-[#9d3d46] font-serif text-3xl italic text-white">
              S
            </span>
            <span>
              <strong className="block font-serif text-xl font-medium">
                Senioren Homeservice GmbH
              </strong>
              <small className="mt-1 hidden text-[10px] font-bold uppercase tracking-[.12em] text-[#68736d] sm:block">
                Persönliche Beratung
              </small>
            </span>
          </Link>
          <Link className="font-semibold underline-offset-4 hover:underline" href="/">
            Zur Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 lg:grid-cols-[.75fr_1.25fr] lg:py-24">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#9d3d46]">
            Wir nehmen uns Zeit
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] font-medium tracking-[-.035em] sm:text-6xl">
            Wie können wir Ihnen helfen?
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#5f6b64]">
            Ob Grössenberatung, Produktfrage oder ein persönlicher Besuch: Schreiben Sie uns kurz,
            worum es geht. Wir melden uns bei Ihnen.
          </p>
          <div className="mt-9 border-l-2 border-[#9d3d46] pl-5">
            <strong className="block">Lieber direkt sprechen?</strong>
            <a className="mt-1 block font-serif text-3xl text-[#9d3d46]" href="tel:+41788701050">
              078 870 10 50
            </a>
            <span className="text-sm text-[#69746e]">
              Telefonisch erreichbar: Montag bis Samstag, 11.00–19.00 Uhr
              <br />
              Besuch in Basel nach Terminvereinbarung, ebenfalls 11.00–19.00 Uhr
            </span>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#69746e]">
            Hausbesuche machen wir im Umkreis Basel ab einem Auftragswert von CHF 400.–.
            Verkaufstage in Alters- und Pflegeheimen sind auch ausserhalb möglich.
          </p>
        </div>
        <ConsultationForm />
      </main>
    </div>
  )
}
