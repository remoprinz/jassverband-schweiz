# Jassverband Schweiz — Website

Offizielle Website: jassverband.ch

## Ökosystem

Dieses Repo ist Teil des JassGuru/Jassverband-Schweiz-Ökosystems:
- **jassverband-schweiz** (dieses Repo) — Website jassverband.ch
- **jasstafel** — PWA/App jassguru.ch (`/Users/remoprinz/Documents/Jassguru/jasstafel`)
- **jasswiki** — Jass-Enzyklopädie (`/Users/remoprinz/Documents/Jassguru/jasswiki`)
- **jassmeister** — Turnierplattform (`/Users/remoprinz/Documents/Jassguru/JASSx/jassmeister`)
- **Open_R** — Zentrale Wissensbasis, Agent-Definitionen, Identität (`/Users/remoprinz/Documents/Open_R`)

Für übergreifenden Kontext (Agents, Identität, Sicherheit, Workflows) → siehe Open_R.

## Tech-Stack

- **Framework:** Next.js 16.1 + TypeScript + App Router
- **Styling:** Tailwind CSS 4 + CSS Variables
- **i18n:** next-intl (DE/FR/IT, Default: DE)
- **Backend:** Firebase Admin, Stripe, Resend (E-Mail)
- **Animations:** Framer Motion
- **PDF:** Puppeteer (für Print-Generierung)
- **Deploy:** Vercel (auto-deploy via git push main)

## Commands

```bash
npm run dev          # Dev-Server (localhost:3000)
npm run build        # Production Build
npm run lint         # ESLint
npm run pdf          # PDF-Generierung
```

## Architektur

```
src/
├── app/[locale]/          # App Router mit i18n (de/fr/it)
│   ├── schweizermeisterschaft/  # SM-Seite
│   ├── plattform/               # JassGuru Promotion
│   ├── mitmachen/               # Mitgliedschaft + Stripe
│   └── ...
├── components/
│   ├── layout/            # Header, Footer, Container
│   └── sections/          # Wiederverwendbare Sektionen
├── lib/
│   ├── dictionaries/      # de.json, fr.json, it.json
│   ├── i18n.ts            # next-intl Konfiguration
│   ├── firebase.ts        # Firebase Admin
│   └── stripe.ts          # Stripe Integration
├── fonts/                 # Capita, Inter
└── assets/                # Logos, Medien
```

## Design System (VERBINDLICH)

Detailliert in `DESIGN_SYSTEM.md`. Die wichtigsten Regeln:

### Typografie
- **Headlines:** Capita (serif) — nur H1-H3
- **Body:** Inter (sans-serif) — alles andere

### Farben (CSS Variables)
- `--color-red: #ff0000` — Primär/CTA
- `--color-cream: #f0eee7` — Hintergründe
- `--color-felt-green: #1a472a` — Filz/Jass-Kontext
- `--color-chalkboard: #2d3436` — Kreidetafel-Kontext

### Container
- **Full:** max-w-[1152px] — Standard
- **Wide:** max-w-[1024px] — Content
- **Narrow:** max-w-[768px] — Text-fokussiert

### Spacing
- 8px-Grid: `py-16 md:py-24` (Sektionen), `gap-8 md:gap-12` (Elemente)

### Komponenten
- `StandardSection` — Wrapper für alle Sektionen (variant: default/chalkboard/felt/dark)
- Container-Grössen über prop `containerSize="full"|"wide"|"narrow"`

## i18n

- Dictionaries in `src/lib/dictionaries/{de,fr,it}.json`
- Keys: `schweizermeisterschaft.hero.title`, `schweizermeisterschaft.jassguru.copy` etc.
- **DE ist die Referenz** — FR/IT werden nachgezogen
- Alle User-sichtbaren Texte MÜSSEN über Dictionary-Keys laufen

## Konventionen

- **Mobile-first** responsive Design
- **Semantic HTML** (section, article, nav)
- **Framer Motion** für Animationen (nicht CSS transitions)
- **Bilder:** WebP/AVIF via Next.js Image Optimization
- Screenshots in `/public/images/screenshots/`

## Nicht tun

- Keine `.env.local` oder Credentials committen
- Keine Inline-Styles für Farben — CSS Variables verwenden
- Keine neuen Fonts hinzufügen (nur Capita + Inter)
- Keine Komponenten ausserhalb des Design Systems bauen
- Nicht direkt auf `main` pushen ohne explizite Aufforderung
- Keine Dokumentations-Files erstellen ausser explizit gewünscht
