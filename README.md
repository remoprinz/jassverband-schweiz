# Jassverband Schweiz

**The official website for the Swiss Jass Federation** -- a non-profit organization dedicated to preserving, promoting, and digitizing Swiss Jass culture. Home of Switzerland's first national team-based Jass championship.

Live at [jassverband.ch](https://jassverband.ch)

---

## What Is This

Jass is the Swiss national card game, played by millions across the country. Jassverband Schweiz (JVS) is the federation that brings structure, competition, and community to the game. This website serves as the digital home for:

- **Schweizermeisterschaft** -- a three-level national championship (form a group, challenge teams, compete in the finals) with home-field advantage and a binding code of honor
- **Membership management** -- five membership tiers with Stripe-powered payments (CHF, TWINT, card)
- **Trilingual content** -- full German, French, and Italian support, reflecting Switzerland's linguistic regions
- **News and communication** -- federation updates, partner pages, and contact forms

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4, Framer Motion |
| i18n | next-intl (DE / FR / IT) |
| Payments | Stripe (Checkout, Webhooks) |
| Database | Firebase Admin SDK (Firestore) |
| Email | Resend (transactional + marketing) |
| Media | Vercel Blob |
| PDF | Puppeteer |
| Deployment | Vercel (auto-deploy from main) |
| Design | Custom serif font (Capita), felt-green and chalkboard theme, mobile-first |

## Membership Tiers

| Tier | Price | Description |
|---|---|---|
| Pionier | CHF 60/year | Individual license |
| Botschafter | CHF 90/year | Ambassador license |
| Patron | CHF 350/year | Group license |
| Jugend | CHF 20/year | Youth (under 25) |
| Goenner | Custom (min CHF 10) | Supporter donation |

### Payment Flow

```
Stripe Checkout -> Webhook -> Firebase member creation -> Auto-link to JassGuru player -> Welcome email (Resend)
```

Members are automatically linked to their JassGuru player profile upon signup, connecting federation membership with the digital scoreboard ecosystem.

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Localized pages (de, fr, it)
│   │   ├── schweizermeisterschaft/   # Championship
│   │   ├── mitmachen/                # Membership signup
│   │   ├── kontakt/                  # Contact
│   │   ├── verband/                  # About the federation
│   │   ├── ehrenkodex/               # Code of honor
│   │   ├── news/                     # News
│   │   ├── partner/                  # Partners
│   │   └── ...
│   └── api/
│       ├── checkout/       # Stripe session creation
│       ├── contact/        # Rate-limited contact form
│       └── webhooks/       # Stripe payment events
├── components/             # UI components
├── lib/
│   ├── dictionaries/       # Translation files (de.json, fr.json, it.json)
│   ├── firebaseAdmin.ts    # Firebase Admin SDK setup
│   ├── stripe.ts           # Stripe client
│   └── i18n.ts             # Internationalization config
├── assets/                 # Static assets
├── fonts/                  # Custom fonts (Capita)
└── middleware.ts           # Locale detection and routing
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Environment Variables

Create a `.env.local` file with the following:

```env
# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Firebase
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=info@jassverband.ch
CONTACT_EMAIL=kontakt@jassverband.ch
```

### Commands

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run lint             # ESLint
npm run pdf              # Generate PDF documents
npm run pdf:broschuere   # Generate JVS brochure PDF
```

## Ecosystem

This project is part of the JassGuru ecosystem:

| Project | Description |
|---|---|
| **jassverband-schweiz** (this repo) | Federation website at jassverband.ch |
| **jasstafel** | Digital Jass scoreboard PWA at [jassguru.ch](https://jassguru.ch) |
| **jasswiki** | Jass encyclopedia and rule reference |
| **jassmeister** | Tournament platform |

## License

Private. All rights reserved by Jassverband Schweiz.
