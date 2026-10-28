import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Impressum | Senioren Homeservice GmbH',
    description: 'Impressum und Kontaktangaben der Senioren Homeservice GmbH, Erlenstrasse 49, 4058 Basel.',
}

export default function ImpressumPage() {
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

            <main className="mx-auto max-w-[760px] px-5 py-14 lg:py-24">
                <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#9d3d46]">
                    Rechtliche Angaben
                </p>
                <h1 className="font-serif text-5xl leading-[1.02] font-medium tracking-[-.035em] sm:text-6xl">
                    Impressum
                </h1>

                <section className="mt-12 border-t border-[#26322c]/15 pt-8">
                    <h2 className="font-serif text-3xl font-medium">Verantwortlich für diese Website</h2>
                    <address className="mt-4 text-lg leading-relaxed not-italic text-[#5f6b64]">
                        Senioren Homeservice GmbH
                        <br />
                        Erlenstrasse 49
                        <br />
                        4058 Basel
                        <br />
                        Schweiz
                    </address>
                </section>

                <section className="mt-10 border-t border-[#26322c]/15 pt-8">
                    <h2 className="font-serif text-3xl font-medium">Kontakt</h2>
                    <dl className="mt-4 grid gap-3 text-lg leading-relaxed text-[#5f6b64] sm:grid-cols-[160px_1fr]">
                        <dt className="font-semibold text-[#26322c]">Telefon</dt>
                        <dd>
                            <a className="underline-offset-4 hover:underline" href="tel:+41788701050">
                                078 870 10 50
                            </a>
                            {' · '}
                            <a className="underline-offset-4 hover:underline" href="tel:+41615541115">
                                061 554 11 15
                            </a>
                        </dd>
                        <dt className="font-semibold text-[#26322c]">E-Mail</dt>
                        <dd>
                            <a
                                className="underline-offset-4 hover:underline"
                                href="mailto:senioren-homeservice@gmx.ch"
                            >
                                senioren-homeservice@gmx.ch
                            </a>
                        </dd>
                        <dt className="font-semibold text-[#26322c]">Erreichbarkeit</dt>
                        <dd>Montag bis Samstag, 11.00–19.00 Uhr</dd>
                    </dl>
                </section>

                <section className="mt-10 border-t border-[#26322c]/15 pt-8">
                    <h2 className="font-serif text-3xl font-medium">Haftung für Inhalte</h2>
                    <p className="mt-4 text-lg leading-relaxed text-[#5f6b64]">
                        Wir erstellen die Inhalte dieser Website mit grosser Sorgfalt. Für Richtigkeit,
                        Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen. Angaben zu
                        Sortiment, Preisen und Verfügbarkeit sind unverbindlich und ersetzen keine persönliche
                        Beratung. Haftungsansprüche wegen Schäden materieller oder immaterieller Art, die aus
                        dem Zugriff auf diese Website entstehen, sind ausgeschlossen.
                    </p>
                </section>

                <section className="mt-10 border-t border-[#26322c]/15 pt-8">
                    <h2 className="font-serif text-3xl font-medium">Haftung für Links</h2>
                    <p className="mt-4 text-lg leading-relaxed text-[#5f6b64]">
                        Diese Website enthält Verweise auf Websites Dritter, etwa auf unseren Online-Shop. Für
                        deren Inhalte sind ausschliesslich die jeweiligen Betreiberinnen und Betreiber
                        verantwortlich. Eine Haftung unsererseits ist ausgeschlossen.
                    </p>
                </section>

                <section className="mt-10 border-t border-[#26322c]/15 pt-8">
                    <h2 className="font-serif text-3xl font-medium">Urheberrecht</h2>
                    <p className="mt-4 text-lg leading-relaxed text-[#5f6b64]">
                        Alle Texte, Bilder und Gestaltungselemente auf dieser Website sind urheberrechtlich
                        geschützt. Jede Verwendung ausserhalb der gesetzlich erlaubten Fälle bedarf unserer
                        vorherigen schriftlichen Zustimmung.
                    </p>
                </section>

                <section className="mt-10 border-t border-[#26322c]/15 pt-8">
                    <h2 className="font-serif text-3xl font-medium">Datenschutz</h2>
                    <p className="mt-4 text-lg leading-relaxed text-[#5f6b64]">
                        Wenn Sie uns über das Anfrageformular, per E-Mail oder telefonisch kontaktieren,
                        verwenden wir Ihre Angaben ausschliesslich zur Bearbeitung Ihrer Anfrage. Wir geben
                        diese Daten nicht an Dritte weiter und verwenden sie nicht für Werbung. Sie können
                        jederzeit Auskunft über Ihre bei uns gespeicherten Daten verlangen oder deren Löschung
                        beantragen – schreiben Sie uns dazu einfach an{' '}
                        <a
                            className="underline-offset-4 hover:underline"
                            href="mailto:senioren-homeservice@gmx.ch"
                        >
                            senioren-homeservice@gmx.ch
                        </a>
                        .
                    </p>
                </section>

                <div className="mt-12 border-t border-[#26322c]/15 pt-8">
                    <Link
                        className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#9d3d46] px-6 font-semibold text-white"
                        href="/"
                    >
                        Zurück zur Startseite
                    </Link>
                </div>
            </main>
        </div>
    )
}
