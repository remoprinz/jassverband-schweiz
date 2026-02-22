# Briefing: Jassverband Schweiz Website

**Datum:** 2026-02-21 (aktualisiert)  
**Erstellt von:** Cursor Agent  
**Für:** Clawmic (OpenClaw)  
**Rolle:** Projektmanagement + Spec-Writing  
**Kommunikation:** Telegram-Gruppe "JVS Website" (Remo, Jens, Clawmic)

---

## 1. Projektübersicht

### Was ist das Projekt?
Offizielle Website für den **Jassverband Schweiz** – einen Verein, der das Schweizer Kartenspiel "Jass" als lebendige Tradition fördert.

### Ziel
Eine moderne, responsive Website, die:
- Das Branding des Verbands repräsentiert
- Die Jugendmeisterschaft bewirbt
- Das digitale Jass-Ökosystem (JassWiki, JassGuru, Jassmeister) präsentiert
- Als "Lebendige Tradition" (Bundesamt für Kultur) seriös wirkt

### Live-URL (geplant)
`jassverband.ch`

---

## 2. Tech Stack

| Technologie | Version | Zweck |
|-------------|---------|-------|
| **Next.js** | 16.1.6 | Framework |
| **React** | 19.2.3 | UI Library |
| **TypeScript** | 5.x | Type Safety |
| **Tailwind CSS** | 4.x | Styling |
| **Framer Motion** | 12.x | Animationen |
| **next-intl** | 4.8.2 | Mehrsprachigkeit (de/fr/it/en) |
| **Vercel** | - | Hosting (geplant) |

### Lokales Setup
```bash
cd /Users/remoprinz/Documents/jassverband-schweiz
npm install
npm run dev
# → http://localhost:3000
```

---

## 3. Aktueller Stand (Stand: 2026-02-18)

### ✅ ERLEDIGT

| Komponente | Datei | Status |
|------------|-------|--------|
| Design-System | `src/app/globals.css` | CSS-Variablen, Farben, Typography |
| Header | `src/components/layout/Header.tsx` | Responsive, Logo, Nav, Mobile Menu |
| Hero Section | `src/components/sections/Hero.tsx` | Holz-BG, Karten-Animation (Fallback) |
| Pillars/Mission | `src/components/sections/Pillars.tsx` | 3-Spalten, Icons |
| Tournament | `src/components/sections/Tournament.tsx` | Grüner Filz-BG, CTA |
| Ecosystem | `src/components/sections/Ecosystem.tsx` | 3 Produkt-Karten |
| Trust Badge | `src/components/sections/Trust.tsx` | "Lebendige Traditionen" |
| Footer | `src/components/layout/Footer.tsx` | Links, Kontakt, Logo |
| Asset-Struktur | `public/images/` | Ordner erstellt |
| i18n Setup | `src/lib/i18n.ts` + `messages/` | DE/FR/IT/EN vorbereitet |

### ⚠️ IN ARBEIT / OFFEN

| Task | Beschreibung | Priorität |
|------|--------------|-----------|
| **Assets einfügen** | Echte Bilder vom Designer | 🔴 HIGH |
| **Figma → Tokens** | Exakte Farben/Fonts aus Figma | 🔴 HIGH |
| **Unterseiten** | /verband, /news, /projekte, /partner, /kontakt | 🟡 MEDIUM |
| **Responsive QA** | Mobile/Tablet testen & fixen | 🟡 MEDIUM |
| **Texte finalisieren** | Finale Copy von Remo | 🟡 MEDIUM |
| **Build testen** | `npm run build` erfolgreich | 🟢 LOW |
| **Deployment** | Vercel Setup | 🟢 LOW |

---

## 4. Figma-Design

### Link
```
https://www.figma.com/design/7tW4421QSXQM6ISpugIwFm/JVS-Jassverband-Website?node-id=0-1&p=f&t=5CKhSVGewWudoCuV-0
```

### Was du aus Figma brauchst

#### Design-Tokens (KRITISCH)
Bitte vom Designer anfordern:
- [ ] **Farben** (Hex-Codes für Primary, Secondary, Neutrals)
- [ ] **Typography** (Font-Family, Sizes, Weights, Line-Heights)
- [ ] **Spacing** (Padding/Margin-System, z.B. 4px-Basis)
- [ ] **Shadows** (Box-Shadow Werte)
- [ ] **Border-Radius** (z.B. 8px, 12px, 16px)
- [ ] **Breakpoints** (Mobile, Tablet, Desktop Widths)

#### Asset-Exports (KRITISCH)
Bitte vom Designer exportieren lassen:
- [ ] **Logo** → SVG → `public/images/logos/`
- [ ] **Jasskarten** → PNG transparent → `public/images/cards/`
- [ ] **Holz-Textur** → JPG (2000px+) → `public/images/backgrounds/`
- [ ] **Filz-Textur** → JPG → `public/images/backgrounds/`
- [ ] **Icons** → SVG → `public/images/icons/`
- [ ] **Jester-Illustration** → PNG transparent → `public/images/illustrations/`
- [ ] **"Lebendige Traditionen" Badge** → PNG → `public/images/badges/`

Eine Checkliste liegt unter:
```
public/images/ASSETS_NEEDED.md
```

---

## 5. Projektstruktur

```
jassverband-schweiz/
├── public/
│   └── images/
│       ├── ASSETS_NEEDED.md    ← Checkliste
│       ├── backgrounds/        ← Texturen
│       ├── cards/              ← Jasskarten
│       ├── badges/             ← Trust-Badges
│       ├── illustrations/      ← Jester etc.
│       └── icons/              ← SVG Icons
├── src/
│   ├── app/
│   │   ├── [locale]/           ← Mehrsprachige Seiten
│   │   │   ├── page.tsx        ← Homepage
│   │   │   ├── layout.tsx      ← Layout mit Header/Footer
│   │   │   ├── verband/
│   │   │   ├── news/
│   │   │   ├── projekte/
│   │   │   ├── partner/
│   │   │   ├── kontakt/
│   │   │   ├── impressum/
│   │   │   └── datenschutz/
│   │   └── globals.css         ← Design-System
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Pillars.tsx
│   │   │   ├── Tournament.tsx
│   │   │   ├── Ecosystem.tsx
│   │   │   └── Trust.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── SectionHeader.tsx
│   ├── lib/
│   │   └── i18n.ts             ← Locale Config
│   └── messages/
│       ├── de.json             ← Deutsche Texte
│       ├── fr.json
│       ├── it.json
│       └── en.json
├── package.json
├── tailwind.config.js
└── vercel.json
```

---

## 6. Design-System (aktuell implementiert)

### Farben (CSS-Variablen in `globals.css`)
```css
--color-primary: #E31E24;        /* Schweizer Rot */
--color-felt-green: #1B4D3E;     /* Jass-Tisch Grün */
--color-wood-dark: #5D4037;      /* Holz dunkel */
--color-cream: #F5F1E8;          /* Hintergrund hell */
--color-background-dark: #1A1512; /* Footer/Dark Sections */
```

### Typography (via Figma API verifiziert, 2026-02-22)
- **Headlines:** Capita, Bold (700) — lokaler Webfont in `src/assets/fonts/Capita Webfont.zip`
- **Body/UI:** Inter, Regular (400) + Bold (700) — Google Font
- **Type Scale Headlines:** 20, 28, 42, 75px
- **Type Scale Body:** 13, 15, 18.6, 28px
- **Buttons/Nav:** Inter Bold 16-17px

**Achtung:** Der aktuelle Code verwendet noch Zilla Slab + Geist Sans als Platzhalter. Muss in Phase 2 ersetzt werden (siehe IMPLEMENTATION_PLAN.md).

---

## 7. Kommunikation (Telegram)

### Telegram-Gruppe "JVS Website"
- **Remo** – Product Owner, finale Entscheidungen
- **Jens** – Designer, Figma-Owner, Assets
- **Clawmic** (@mr_remobot) – Projektmanagement, Specs

### Deine Aufgaben auf Telegram
1. **Assets anfordern** – Schreib Jens, was du brauchst (siehe Checkliste)
2. **Design-Tokens klären** – Frag nach erweitertem Figma-Token
3. **Status-Updates** – Halte das Team informiert
4. **Blocker melden** – Falls etwas unklar ist, sofort fragen

### Beispiel-Nachricht an Jens
```
Hallo Jens! Ich bin Clawmic, der AI-Partner für das JVS-Projekt.

Ich habe Zugriff auf das Figma-File, aber für die Design-Tokens 
(Farben als CSS-Variablen) brauche ich einen erweiterten Token mit 
dem Scope "file_variables:read".

Kannst du einen neuen Personal Access Token erstellen mit diesem Scope?
Oder alternativ die Variables als JSON exportieren?

Die ~80 Bilder im File kann ich bereits abrufen!
```

### Projekt-Status Tracking
Clawmic aktualisiert nach jeder Interaktion:
- **Open_R:** `context/PROJECT_STATUS.md` (Single Source of Truth)
- **Offene Fragen:** `context/QA_JVS_WEBSITE_*.md`

---

## 8. Priorisierte Aufgaben

### Phase 1: Design-System finalisieren (1-2 Tage)
1. [ ] Figma-Tokens holen (vom Designer)
2. [ ] `globals.css` mit echten Werten aktualisieren
3. [ ] Assets exportieren und in `public/images/` einfügen
4. [ ] Hero mit echten Karten-Bildern testen

### Phase 2: Homepage polieren (2-3 Tage)
5. [ ] Alle Sections visuell abgleichen mit Figma
6. [ ] Responsive testen (375px, 768px, 1024px, 1440px)
7. [ ] Animationen feintunen
8. [ ] Cross-Browser Check (Chrome, Safari, Firefox)

### Phase 3: Unterseiten (3-5 Tage)
9. [ ] /verband – Über uns, Team
10. [ ] /news – Blog/News-Liste
11. [ ] /projekte – Jugendmeisterschaft etc.
12. [ ] /partner – Partner-Logos
13. [ ] /kontakt – Kontaktformular

### Phase 4: Launch (1-2 Tage)
14. [ ] Texte finalisieren (alle Sprachen)
15. [ ] SEO-Checks (Meta, OG, Sitemap)
16. [ ] Performance-Audit (Lighthouse > 90)
17. [ ] Vercel Deployment

---

## 9. Wichtige Hinweise

### Code-Qualität
- TypeScript strict mode
- Keine `any` Types
- Components sind bereits responsive-ready (mobile-first)
- Framer Motion für alle Animationen

### Performance
- Next.js Image-Komponente nutzen (automatische Optimierung)
- Lazy-Loading für Below-the-fold Content
- Fonts sind über `next/font` optimiert

### Accessibility
- WCAG 2.1 AA anstreben
- Focus-States sind definiert
- Keyboard-Navigation testen

### Git
- Repo: `/Users/remoprinz/Documents/jassverband-schweiz`
- Branch: `main`
- Commits bitte auf Deutsch oder Englisch

---

## 10. Team & Kommunikation

| Person | Rolle | Erreichbarkeit |
|--------|-------|----------------|
| **Remo** | Product Owner, finale Entscheidungen | Telegram-Gruppe + DM |
| **Jens** | Designer, Figma-Owner, Asset-Lieferung | Telegram-Gruppe |
| **Clawmic** | Projektmanagement, Specs, Koordination | @mr_remobot auf Telegram |
| **Cursor/Opus** | Code-Implementation | Via Remo (Cursor IDE) |

### Primärer Kanal
**Telegram-Gruppe "JVS Website"** — Alle Projekt-Kommunikation

### Figma API
- **Token:** In `.env.local` (FIGMA_ACCESS_TOKEN)
- **File:** `RVZcmCaTCDouMhRxfyAOmP`
- **Link:** https://www.figma.com/design/RVZcmCaTCDouMhRxfyAOmP/JVS-Jassverband-Website--Bot-

---

## 11. Implementation Workflow (VERPFLICHTEND)

**Du folgst IMMER diesem Workflow für Code-Arbeit:**

```
RECOGNITION → Q&A → SPEC → [REVIEW] → BUILD → VERIFICATION
```

### Phase 1: Pre-Implementation Checklist
Bevor IRGENDEIN Code geschrieben wird:
- [ ] Alle Assets vom Designer erhalten
- [ ] Design-Tokens (Farben, Fonts) geklärt
- [ ] Figma-Abweichungen dokumentiert
- [ ] Q&A mit Remo abgeschlossen
- [ ] SPEC geschrieben und approved

### Phase 2: Q&A Keywords
Systematisch abarbeiten:
- **Scope:** Was genau? Was NICHT?
- **Assets:** Was fehlt noch?
- **Tokens:** Stimmen Farben/Fonts?
- **Edge Cases:** Mobile? Dark Mode? Fallbacks?
- **Acceptance:** Woran erkennen wir "fertig"?

### Phase 3: SPEC → REVIEW → BUILD
- User sagt `SPEC` → Du schreibst die Spec
- User sagt `REVIEW` → Opus prüft die Spec
- User sagt `BUILD S/A/B/C` → Execution startet

### Wichtig: Cursor für Code
**Clawmic macht KEIN direktes Coding.** 
Stattdessen:
1. Clawmic erstellt perfekte Specs
2. Remo gibt die Specs an Cursor
3. Cursor (Opus) implementiert den Code
4. Clawmic verifiziert und koordiniert

---

## 12. Erste Aktion (Projekt-Kickoff)

1. **Scan:** Repository-Status prüfen
2. **Assets-Check:** Was fehlt konkret?
3. **Designer kontaktieren:** Assets + Tokens anfordern
4. **Q&A mit Remo:** Offene Fragen klären
5. **SPEC:** Sobald alles klar ist

---

## Zusammenfassung

1. **Figma-Link hast du** – Tokens + Assets von Jens holen
2. **Code ist ready** – Components existieren, brauchen nur echte Assets
3. **Slack nutzen** – Direkte Kommunikation mit Jens + Remo
4. **Workflow befolgen** – Q&A → SPEC → REVIEW → BUILD
5. **Cursor für Code** – Du planst, Remo delegiert Code-Arbeit an Cursor

---

**Letzte Aktualisierung:** 2026-02-21 (Telegram-Migration, Figma API integriert)
