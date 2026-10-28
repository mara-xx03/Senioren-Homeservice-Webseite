'use client'

import Link from "next/link"
import { useState } from "react"

const heroImage = "/images/senioren-modeberatung-hero.jpg"

const coupleImage = "/images/UeberUns.jpg"

const fashionImage = "/images/Kleider.jpg"

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 3h3l1.5 5-2.1 1.4a15 15 0 0 0 5 5l1.4-2.1 5 1.5v3A3.2 3.2 0 0 1 17.8 20C10.2 20 4 13.8 4 6.2A3.2 3.2 0 0 1 7.2 3Z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4.2 4L19 6.5" />
    </svg>
  )
}

// x/y sind Koordinaten im viewBox-System der Schweizer Karte weiter unten.
const serviceRegions = [
  { name: "Basel-Stadt", x: 221.2, y: 78.6 },
  { name: "Basel Land", x: 234.6, y: 88.8 },
  { name: "Aargau", x: 263.1, y: 101.5 },
  { name: "Solothurn", x: 216.5, y: 126 },
  { name: "Bern", x: 208.2, y: 161.2 },
  { name: "Zürich", x: 308.9, y: 103.3 },
  { name: "Luzern", x: 287.5, y: 147.3 },
  { name: "Winterthur", x: 327, y: 86.5 },
  { name: "Freiburg", x: 182, y: 180.3 },
]

function ServiceAreaMap() {
  const names = serviceRegions.map((region) => region.name)

  return (
    <svg
      className="swiss-map"
      viewBox="0 0 560 360"
      role="img"
      aria-labelledby="swiss-map-title swiss-map-description"
    >
      <title id="swiss-map-title">Unsere Einsatzgebiete in der Schweiz</title>
      <desc id="swiss-map-description">
        Markiert sind {names.slice(0, -1).join(", ")} und {names[names.length - 1]}.
      </desc>
      <path
        className="swiss-map-shape"
        fillRule="evenodd"
        d="M311.4,45.2 312.2,48.6 302.6,51.0 296.4,63.1 302.6,68.0 310.7,63.6 316.9,66.6 313.9,67.3 312.7,73.7 306.5,68.6 301.1,72.8 304.6,75.7 301.8,76.9 289.3,77.1 286.0,71.9 278.0,70.3 267.3,78.8 253.9,80.7 249.1,74.8 242.8,74.8 229.9,82.2 225.4,78.4 230.2,77.8 230.9,73.0 221.2,74.5 213.0,81.2 215.9,82.8 212.9,83.8 213.3,87.9 206.9,87.0 205.8,89.3 209.0,90.6 204.1,95.4 189.7,97.4 182.7,94.3 185.5,87.4 165.5,87.4 167.3,92.8 161.6,95.6 156.0,106.5 168.5,103.8 172.3,109.0 161.6,115.4 163.0,121.3 139.7,143.1 141.2,147.2 114.9,163.8 117.8,168.9 114.7,179.5 116.7,184.6 85.2,211.3 89.5,215.5 81.8,226.3 80.9,232.9 90.7,239.7 84.5,250.7 86.2,255.7 72.6,260.3 74.6,264.6 71.1,271.8 87.6,270.0 102.2,258.7 103.6,254.6 99.0,255.2 95.3,247.0 105.9,234.6 122.8,227.5 137.8,227.8 150.6,231.5 146.0,241.4 154.6,251.3 149.0,261.5 148.3,270.4 157.9,272.4 155.3,282.2 161.3,280.5 176.4,308.1 185.1,308.0 194.1,299.7 202.6,303.0 213.0,294.2 217.0,295.0 217.7,291.0 228.2,292.4 233.3,299.4 246.6,300.4 250.7,289.6 260.2,287.5 262.3,275.5 273.3,269.2 274.3,264.5 267.0,253.1 287.8,238.2 285.6,234.0 287.3,231.7 300.1,226.5 302.4,235.7 298.4,248.9 300.0,255.5 308.0,259.7 315.3,272.7 324.7,276.0 327.4,272.6 337.5,278.9 331.4,290.6 341.3,294.7 346.0,307.1 343.0,312.0 352.7,313.7 359.2,302.6 350.0,293.1 353.7,290.0 351.9,284.1 358.2,280.5 357.7,273.2 373.9,257.6 378.6,244.9 376.8,233.2 373.9,230.7 377.1,222.0 384.5,220.4 388.9,226.1 393.7,220.4 393.5,238.4 401.6,248.3 408.0,250.3 416.8,249.6 418.9,241.8 422.6,243.9 439.2,238.0 442.7,241.7 442.7,250.7 448.2,253.3 447.1,258.1 449.6,259.8 459.3,254.3 452.7,244.1 457.9,233.1 446.7,228.8 447.1,216.2 452.5,206.7 465.1,203.4 465.7,211.5 470.3,214.9 486.4,215.9 488.3,206.1 480.1,203.2 478.2,196.8 483.8,187.4 481.9,182.7 485.2,179.0 488.1,162.5 478.4,154.1 471.5,160.9 472.1,164.2 465.2,163.4 464.5,172.2 452.8,175.6 444.7,167.4 431.7,163.0 431.7,151.3 413.8,145.8 394.8,147.2 398.8,141.1 395.8,129.6 399.9,117.6 413.1,102.3 411.7,93.1 405.8,91.6 402.5,81.0 374.7,65.2 353.2,61.4 341.3,66.6 337.3,62.2 339.3,59.1 333.3,54.5 329.9,57.2 333.6,60.5 331.6,63.0 326.0,60.6 326.0,51.2 322.4,51.8 319.5,46.1 317.2,51.8 316.0,46.4 311.8,45.3 311.4,45.2Z M323.6,57.6 325.1,60.9 319.7,61.1 322.5,58.1 323.6,57.6Z M348.0,291.3 347.2,293.9 348.0,291.3Z"
      />
      {serviceRegions.map((region) => (
        <g className="swiss-map-marker" key={region.name}>
          <circle cx={region.x} cy={region.y} r="13" />
          <circle cx={region.x} cy={region.y} r="5" />
        </g>
      ))}
    </svg>
  )
}

function Logo() {
  return (
    <a
      className="logo"
      href="#start"
      aria-label="Senioren Homeservice GmbH Startseite"
    >
      <span className="logo-mark" aria-hidden="true">
        S
      </span>
      <span>
        <strong>Senioren Homeservice GmbH</strong>
        <small>Persönlich. Bequem. Bei Ihnen.</small>
      </span>
    </a>
  )
}

const categories = [
  {
    number: "01",
    title: "Damenmode",
    text: "Bequeme Gummizughosen und Schlupfhosen, Blusen, Strickmode sowie Tag- und Nachtwäsche – pflegeleicht und einfach anzuziehen.",
  },
  {
    number: "02",
    title: "Herrenmode",
    text: "Klassische Hemden, weiche Strickpullover sowie Schlupfhosen und komfortable Hosen mit elastischem Bund für Alltag und besondere Anlässe.",
  },
  {
    number: "03",
    title: "Therapie- & Gesundheitsschuhe",
    text: "Sichere Therapie-, Haus- und Strassenschuhe mit bequemem Fussbett, auch bei Diabetes, Schwellungen, Hallux valgus oder empfindlichen Füssen.",
  },
  {
    number: "04",
    title: "Diabetikersocken & Pflegewäsche",
    text: "Druckfreie Diabetikersocken ohne einschneidenden Gummibund sowie Pflegewäsche aus 100 % Baumwolle – bis 95 Grad waschbar und damit besonders hygienisch.",
  },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div id="start">
      <div className="topline">
        <div className="page-width topline-inner">
          <p>Mode, die zu Ihnen kommt – in der ganzen Schweiz</p>
          <a href="tel:+41788701050">
            <PhoneIcon /> 078 870 10 50
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="page-width nav-wrap">
          <Logo />
          <button
            className="menu-button"
            type="button"
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={menuOpen ? "main-nav open" : "main-nav"}
            aria-label="Hauptnavigation"
          >
            <a href="#angebot" onClick={closeMenu}>
              Angebot
            </a>
            <a href="#homeservice" onClick={closeMenu}>
              Homeservice
            </a>
            <a href="#ueber-uns" onClick={closeMenu}>
              Über uns
            </a>
            <a href="#kontakt" onClick={closeMenu}>
              Kontakt
            </a>
            <a
              className="nav-cta"
              href="https://shop.mode-homeservice.ch/"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Zum Online-Shop
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-photo">
            <img
              src={heroImage}
              alt="Persönliche Modeberatung für eine Seniorin"
            />
          </div>
          <div className="page-width hero-grid">
            <div className="hero-content">
              <p className="eyebrow">Mode mit Komfort und Stil</p>
              <h1>
                Gut gekleidet.
                <br />
                <em>Ganz bei Ihnen.</em>
              </h1>
              <p className="hero-copy">
                Wir bringen ausgewählte Mode und bequeme Schuhe direkt zu Ihnen
                nach Hause im Umkreis Basel, in Ihre Residenz oder an Ihren
                Seniorentreff.
              </p>
              <div className="hero-actions">
                <a
                  className="button primary"
                  href="https://shop.mode-homeservice.ch/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Zum Online-Shop <ArrowIcon />
                </a>
                <Link className="text-link" href="/beratung">
                  Beratung anfragen
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Ihre Vorteile">
          <div className="page-width trust-grid">
            {[
              "Persönliche Beratung",
              "Anprobe vor Ort",
              "Kauf auf Rechnung",
              "Gratis Versand",
            ].map((item) => (
              <div className="trust-item" key={item}>
                <span>
                  <CheckIcon />
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="section products" id="angebot">
          <div className="page-width">
            <div className="section-intro">
              <div>
                <p className="eyebrow">Unser Sortiment</p>
                <h2>Mode, die das Leben leichter macht.</h2>
              </div>
              <p>
                Aktuelle Farben und Designs treffen auf hochwertige,
                pflegeleichte Materialien und angenehmen Tragekomfort.
              </p>
            </div>

            <div className="category-layout">
              <div className="category-image">
                <img
                  src={fashionImage}
                  alt="Auswahl an Kleidern aus unserem Sortiment"
                />
                <div className="image-note">
                  <strong>Über 1’200</strong>
                  <span>ausgewählte Teile</span>
                </div>
              </div>
              <div className="category-list">
                {categories.map((category) => (
                  <article className="category-item" key={category.title}>
                    <span className="category-number">{category.number}</span>
                    <div>
                      <h3>{category.title}</h3>
                      <p>{category.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="comfort-promise">
              <div>
                <p>Für individuelle Bedürfnisse</p>
                <h3>Bequem gekleidet – auch bei körperlichen Einschränkungen.</h3>
              </div>
              <div>
                <p>
                  Jeder Mensch hat andere Bedürfnisse. Deshalb achten wir darauf, dass Kleidung
                  gut sitzt, leicht an- und auszuziehen ist und genügend Bewegungsfreiheit bietet.
                  Gemeinsam finden wir Lösungen, die zu Ihrer persönlichen Situation passen und
                  den ganzen Tag angenehm bleiben.
                </p>
                <ul>
                  <li>
                    <CheckIcon /> Bequeme, flexible Passformen
                  </li>
                  <li>
                    <CheckIcon /> Einfaches An- und Ausziehen
                  </li>
                  <li>
                    <CheckIcon /> Persönliche Beratung ohne Zeitdruck
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section service" id="homeservice">
          <div className="page-width">
            <div className="service-heading">
              <p className="eyebrow light">Unser mobiler Service</p>
              <h2>Ihr persönliches Modegeschäft kommt zu Ihnen.</h2>
              <p>
                In vertrauter Umgebung auswählen, in Ruhe anprobieren und sich
                ehrlich beraten lassen – ganz ohne Stress.
              </p>
            </div>
            <div className="steps">
              <article>
                <span>1</span>
                <h3>Termin vereinbaren</h3>
                <p>
                  Rufen Sie uns an. Gemeinsam finden wir den passenden Termin
                  und klären Ihre Wünsche.
                </p>
              </article>
              <article>
                <span>2</span>
                <h3>Wir kommen zu Ihnen</h3>
                <p>
                  Wir bringen eine sorgfältig gewählte Auswahl zu Ihnen nach
                  Hause im Umkreis Basel oder in Ihre Einrichtung.
                </p>
              </article>
              <article>
                <span>3</span>
                <h3>In Ruhe auswählen</h3>
                <p>
                  Probieren Sie alles bequem an. Wir beraten, ändern und liefern
                  bei Bedarf nach.
                </p>
              </article>
            </div>
            <div className="visit-options">
              <div className="visit-options-heading">
                <span>So treffen wir uns</span>
                <h3>Sie entscheiden, was für Sie am angenehmsten ist.</h3>
              </div>
              <div className="visit-option-list">
                <article>
                  <span>01</span>
                  <div>
                    <h4>Bei uns in Basel</h4>
                    <p>
                      Nach Terminvereinbarung empfangen wir Sie gerne an der Erlenstrasse 49 in
                      4058 Basel – Montag bis Samstag zwischen 11.00 und 19.00 Uhr. Unsere Räume
                      sind rollstuhlgerecht.
                    </p>
                  </div>
                </article>
                <article>
                  <span>02</span>
                  <div>
                    <h4>Bei Ihnen im Heim</h4>
                    <p>
                      Bei unseren Verkaufstagen bringen wir die Mode direkt in Ihre
                      Seniorenresidenz oder Ihr Pflegeheim.
                    </p>
                  </div>
                </article>
                <article>
                  <span>03</span>
                  <div>
                    <h4>Persönlich bei Ihnen zuhause</h4>
                    <p>
                      Hausbesuche machen wir im Umkreis Basel ab einem Auftragswert von
                      CHF 400.–. Wir beraten Sie in Ihrer vertrauten Umgebung.
                    </p>
                  </div>
                </article>
              </div>
              <Link className="button visit-button" href="/beratung">
                Termin oder Besuch vereinbaren <ArrowIcon />
              </Link>
            </div>
            <div className="service-note">
              <span>Für Heimleitungen</span>
              <p>
                Verkaufstage und kleine Modenschauen können ausschliesslich durch Leitungen oder
                autorisierte Vertretungen von Alters- und Pflegeheimen angefragt werden.
              </p>
              <Link href="/beratung">
                Als Heimleitung anfragen <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        <section className="section service-area" id="einsatzgebiet">
          <div className="page-width service-area-grid">
            <div className="map-wrap">
              <ServiceAreaMap />
              <span className="map-caption">
                Unsere Region in der Schweiz · Kartendaten: geoBoundaries
              </span>
            </div>
            <div className="service-area-content">
              <p className="eyebrow">Verkaufstage in Heimen</p>
              <h2>Wir kommen in Ihre Einrichtung.</h2>
              <p className="service-area-lead">
                Für Verkaufstage in Alters- und Pflegeheimen sind wir in diesen Regionen
                unterwegs. Persönliche Hausbesuche machen wir im Umkreis Basel ab einem
                Auftragswert von CHF 400.–.
              </p>
              <div className="region-list">
                {serviceRegions.map((region, index) => (
                  <div key={region.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{region.name}</strong>
                  </div>
                ))}
              </div>
              <p className="region-note">
                Ihr Heim liegt nicht in diesen Regionen? Fragen Sie uns gerne an – weitere
                Regionen sind nach Absprache möglich.
              </p>
              <Link className="button primary" href="/beratung">
                Verkaufstag anfragen <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        <section className="section family" id="ueber-uns">
          <div className="page-width family-grid">
            <div className="family-image">
              <img
                src={coupleImage}
                alt="Das Team des Senioren Homeservice"
              />
              <span className="swiss-badge" aria-label="Schweizer Unternehmen">
                <i />
                Aus der Schweiz
              </span>
            </div>
            <div className="family-content">
              <p className="eyebrow">Mit Herz geführt</p>
              <h2>Ein Familienbetrieb seit 2011, bei dem der Mensch zählt.</h2>
              <p className="large-copy">
                Wir glauben: Modebewusstsein kennt kein Alter. Darum verbinden
                wir persönliche Nähe mit sorgfältiger Auswahl und echter Freude
                an guter Beratung.
              </p>
              <p>
                Seit 2011 besuchen wir Seniorinnen und Senioren in ihrem
                vertrauten Umfeld. Wir nehmen uns Zeit, hören zu und helfen bei
                der Anprobe. Auch ein Änderungsservice zum Selbstkostenpreis und
                die Nachbestellung Ihrer Lieblingsstücke gehören für uns dazu.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section" id="kontakt">
          <div className="page-width contact-card">
            <div>
              <p className="eyebrow light">Wir freuen uns auf Sie</p>
              <h2>Gönnen Sie sich entspanntes Einkaufen.</h2>
              <p>
                Besuchen Sie uns nach Terminvereinbarung an der Erlenstrasse 49 in Basel – unsere
                Räume sind rollstuhlgerecht. Oder wir kommen zu Ihnen nach Hause im Umkreis Basel,
                ab einem Auftragswert von CHF 400.–.
              </p>
            </div>
            <div className="contact-actions">
              <a className="phone-link" href="tel:+41788701050">
                <span>Telefon</span>
                078 870 10 50
              </a>
              <div className="email-options">
                <span>E-Mail schreiben mit</span>
                <div>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=senioren-homeservice%40gmx.ch"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gmail
                  </a>
                  <a
                    href="https://outlook.live.com/mail/0/deeplink/compose?to=senioren-homeservice%40gmx.ch"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Outlook
                  </a>
                  <a href="mailto:senioren-homeservice@gmx.ch">Andere E-Mail-App</a>
                </div>
              </div>
              <small>
                Telefonisch erreichbar: Montag bis Samstag, 11.00–19.00 Uhr
                <br />
                Besuch in Basel nach Terminvereinbarung, ebenfalls 11.00–19.00 Uhr
              </small>
            </div>
          </div>

          <div className="page-width map-location">
            <h3>So finden Sie uns</h3>
            <div className="map-embed">
              <iframe
                title="Karte mit unserem Standort an der Erlenstrasse 49 in 4058 Basel"
                src="https://www.openstreetmap.org/export/embed.html?bbox=7.5954%2C47.5658%2C7.6074%2C47.5718&layer=mapnik&marker=47.5688391%2C7.6014090"
                loading="lazy"
              />
            </div>
            <a
              className="map-route-link"
              href="https://www.google.com/maps/dir/?api=1&destination=Erlenstrasse+49%2C+4058+Basel"
              target="_blank"
              rel="noreferrer"
            >
              Route planen <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-width footer-grid">
          <div>
            <Logo />
            <p>
              Komfortable Mode und persönliche Beratung für Seniorinnen und
              Senioren.
            </p>
          </div>
          <div>
            <h3>Kontakt</h3>
            <address>
              Senioren Homeservice GmbH
              <br />
              Erlenstrasse 49
              <br />
              4058 Basel
            </address>
          </div>
          <div>
            <h3>Erreichbar</h3>
            <a href="tel:+41615541115">061 554 11 15</a>
            <a href="tel:+41788701050">078 870 10 50</a>
            <a href="mailto:senioren-homeservice@gmx.ch">senioren-homeservice@gmx.ch</a>
          </div>
          <div>
            <h3>Informationen</h3>
            <a href="#angebot">Sortiment</a>
            <a href="#homeservice">Homeservice</a>
            <a href="#ueber-uns">Über uns</a>
            <Link href="/impressum">Impressum</Link>
          </div>
        </div>
        <div className="page-width footer-bottom">
          <span>© 2025 Senioren Homeservice GmbH</span>
          <span>senioren-homeservice.ch</span>
          <span className="photo-credit">Fotos: Unsplash</span>
        </div>
      </footer>
    </div>
  )
}
