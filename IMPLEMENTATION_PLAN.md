# Jassverband Schweiz Website — Implementationsplan

**Erstellt:** 2026-02-22  
**Status:** READY FOR DEVELOPMENT  
**Geschätzte Dauer:** 3–5 Arbeitstage (ohne Content-Finalisierung)

---

## Executive Summary

Die Website-Struktur steht. Alle kritischen Assets sind vorhanden und optimiert. 
Das **Hauptproblem**: Assets liegen in `src/assets/`, aber der Code referenziert `public/images/` (leer).

**Nächster Schritt:** Asset-Migration + Pfad-Korrektur in allen Components.

---

## Aktueller Stand

### ✅ ERLEDIGT

| Bereich | Status | Details |
|---------|--------|---------|
| **Tech Stack** | ✅ | Next.js 16.1.6, React 19, Tailwind 4, next-intl, Framer Motion |
| **Homepage** | ✅ | 5 Sections implementiert (Hero, Pillars, Tournament, Ecosystem, Trust) |
| **Unterseiten** | ✅ | 7 Pages erstellt (verband, news, projekte, partner, kontakt, impressum, datenschutz) |
| **i18n** | ✅ | DE/FR/IT Dictionaries vorhanden |
| **Design System** | ✅ | CSS-Variablen in globals.css definiert |
| **Assets heruntergeladen** | ✅ | 8 Karten, 8 Logos, 4 Texturen, 1 Font |
| **Texturen optimiert** | ✅ | 47MB → 10MB (2000px, retina-ready) |

### ❌ BLOCKERS

| Problem | Impact | Lösung |
|---------|--------|--------|
| **Assets am falschen Ort** | Components zeigen keine Bilder | Migration zu `public/images/` |
| **Hero.tsx falsche Pfade** | Platzhalter statt echte Karten | Pfade korrigieren |
| **Font-Entscheidung** | Unklarheit Capita vs Zilla Slab | Mit Designer klären |
| **en.json fehlt** | Englische Version nicht übersetzt | Übersetzen oder auslassen |

---

## Phase 1: Asset-Integration (KRITISCH)

### 1.1 Asset-Migration

**Problem:** Assets sind in `src/assets/`, aber Next.js `<Image src="/">` braucht `public/`.

**Aktion:** Assets in die richtige public/-Struktur kopieren.

```bash
cd /Users/remoprinz/Documents/jassverband-schweiz

# Texturen → public/images/backgrounds/
cp src/assets/textures/wood-texture.jpg public/images/backgrounds/
cp src/assets/textures/chalkboard.jpg public/images/backgrounds/
cp src/assets/textures/felt-texture.png public/images/backgrounds/
cp src/assets/textures/felt-texture-gradient.png public/images/backgrounds/

# Karten → public/images/cards/
cp src/assets/cards/*.png public/images/cards/

# Logos → public/images/logos/ (neuer Ordner)
mkdir -p public/images/logos
cp src/assets/logos/*.svg public/images/logos/
cp src/assets/logos/*.png public/images/logos/

# Badges (lebendige-traditionen)
mkdir -p public/images/badges
cp src/assets/logos/lebendige-traditionen.png public/images/badges/

# Jester → illustrations
mkdir -p public/images/illustrations
cp src/assets/cards/jester.png public/images/illustrations/
```

**Checkliste:**
- [ ] `public/images/backgrounds/` enthält 4 Texturen
- [ ] `public/images/cards/` enthält 7 Spielkarten
- [ ] `public/images/logos/` enthält 8 Logo-Varianten
- [ ] `public/images/badges/` enthält lebendige-traditionen.png
- [ ] `public/images/illustrations/` enthält jester.png

### 1.2 Hero.tsx Pfade korrigieren

**Datei:** `src/components/sections/Hero.tsx`

**Aktuelle (falsche) Pfade:**
```tsx
// Zeile 56-59: Falsche Kartennamen
{ src: '/images/cards/schellen-unter.png', ... }  // existiert nicht
{ src: '/images/cards/schellen-10.png', ... }     // existiert nicht
{ src: '/images/cards/rosen-9.png', ... }         // existiert nicht
{ src: '/images/cards/eichel-6.png', ... }        // existiert nicht
```

**Korrekte Pfade (nach Migration):**
```tsx
{ src: '/images/cards/schilten-under.png', ... }
{ src: '/images/cards/schilten-10.png', ... }
{ src: '/images/cards/rosen-ass.png', ... }
{ src: '/images/cards/eichel-under.png', ... }
```

**Checkliste:**
- [ ] Alle 4 Karten-Pfade in Hero.tsx korrigiert
- [ ] Hintergrund-Pfad verifiziert: `/images/backgrounds/wood-texture.jpg`
- [ ] Fallback-Emoji-Symbole angepasst an echte Karten

### 1.3 Alle Sections mit Assets aktualisieren

| Section | Asset benötigt | Pfad nach Migration |
|---------|---------------|---------------------|
| Hero | wood-texture.jpg | `/images/backgrounds/wood-texture.jpg` |
| Hero | 4 Karten | `/images/cards/*.png` |
| Tournament | felt-texture.png | `/images/backgrounds/felt-texture.png` |
| Trust | lebendige-traditionen.png | `/images/badges/lebendige-traditionen.png` |
| Header | JVS Logo | `/images/logos/JVS Logo farbig.svg` |
| Footer | JVS Logo weiss | `/images/logos/JVS Logo weiss.svg` |

**Checkliste:**
- [ ] Tournament.tsx: Filz-Textur als Hintergrund
- [ ] Trust.tsx: Badge-Bild statt Platzhalter
- [ ] Header.tsx: Logo einbinden (falls noch Platzhalter)
- [ ] Footer.tsx: Weisses Logo einbinden

---

## Phase 2: Design-System Finalisierung

### 2.1 Font-Entscheidung klären

**Frage an Designer (Jens):**
> "Welcher Font für Headlines: **Capita** (aus Figma-Export) oder **Zilla Slab** (aktuell im Code)?"

**Wenn Capita:**
```bash
# Font extrahieren
cd src/assets/fonts
unzip "Capita Webfont.zip"

# Font in public/ verschieben
mkdir -p public/fonts
cp -r Capita/* public/fonts/
```

Dann in `src/app/layout.tsx`:
```tsx
import localFont from 'next/font/local';

const capita = localFont({
  src: [
    { path: '../../public/fonts/Capita-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/Capita-Bold.woff2', weight: '700' },
  ],
  variable: '--font-capita',
});
```

**Wenn Zilla Slab:** Keine Änderung nötig (bereits via Google Fonts).

**Checkliste:**
- [ ] Font-Entscheidung von Jens erhalten
- [ ] Font korrekt eingebunden (lokal oder Google)
- [ ] `--font-display` Variable in globals.css aktualisiert

### 2.2 Farben verifizieren

Die aktuellen Farben sind aus Screenshots abgeleitet. Falls Figma-Zugriff mit `file_variables:read` Scope möglich wird:

```
Aktuell in globals.css:
--color-primary: #E31E24     ← Verifizieren
--color-felt-green: #1B4D3E  ← Verifizieren
--color-wood-dark: #5D4037   ← Verifizieren
--color-cream: #F5F1E8       ← Verifizieren
```

**Checkliste:**
- [ ] Primärfarbe mit Figma abgeglichen
- [ ] Alle 5 Hauptfarben bestätigt
- [ ] globals.css aktualisiert (falls Abweichungen)

---

## Phase 3: Homepage Polish

### 3.1 Responsive Testing

**Breakpoints testen:**
- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 14)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1280px (Laptop)
- [ ] 1440px (Desktop)
- [ ] 1920px (Full HD)

**Fokus-Bereiche:**
- [ ] Hero: Karten-Animation mobil
- [ ] Navigation: Mobile Menu
- [ ] Cards in Ecosystem: Grid-Layout
- [ ] Footer: Link-Columns

### 3.2 Animation Review

- [ ] Hero: Karten-Animation smooth
- [ ] Sections: Scroll-triggered Animationen
- [ ] Buttons: Hover-States
- [ ] Links: Focus-States (Accessibility)

### 3.3 Performance

- [ ] `npm run build` erfolgreich
- [ ] Lighthouse Score > 90 (Performance)
- [ ] Lighthouse Score > 90 (Accessibility)
- [ ] Bilder: Next.js `<Image>` mit korrekten `sizes`

---

## Phase 4: Unterseiten

Alle 7 Unterseiten existieren als Skelette. Content muss eingefügt werden.

### 4.1 Priorität HIGH

| Seite | Status | Content von |
|-------|--------|-------------|
| `/verband` | Skelett (99 Zeilen) | Remo (Text) |
| `/projekte` | Skelett (88 Zeilen) | Remo (Text) |
| `/kontakt` | Skelett (130 Zeilen) | Form implementieren |

### 4.2 Priorität MEDIUM

| Seite | Status | Content von |
|-------|--------|-------------|
| `/news` | Skelett + [slug] Route | Remo (Artikel) |
| `/partner` | Skelett (95 Zeilen) | Partner-Logos |

### 4.3 Priorität LOW

| Seite | Status | Content von |
|-------|--------|-------------|
| `/impressum` | Skelett (64 Zeilen) | Rechtliche Texte |
| `/datenschutz` | Skelett (78 Zeilen) | Rechtliche Texte |

**Checkliste:**
- [ ] /verband: Team-Sektion, Mission, Geschichte
- [ ] /projekte: Jugendmeisterschaft Details
- [ ] /kontakt: Funktionierendes Formular
- [ ] /news: News-Liste mit mindestens 3 Artikeln
- [ ] /partner: Partner-Logos + Werden Sie Partner CTA
- [ ] /impressum: Vollständige Impressums-Texte
- [ ] /datenschutz: DSGVO-konformer Text

---

## Phase 5: i18n Finalisierung

### 5.1 Fehlende Sprache

| Sprache | Status | Aktion |
|---------|--------|--------|
| DE | ✅ Vorhanden | - |
| FR | ✅ Vorhanden | Review |
| IT | ✅ Vorhanden | Review |
| EN | ❌ Fehlt | Erstellen oder auslassen |

**Entscheidung nötig:** Brauchen wir EN?

**Checkliste:**
- [ ] EN-Entscheidung von Remo
- [ ] Falls ja: en.json erstellen
- [ ] FR/IT Übersetzungen reviewen

---

## Phase 6: Pre-Launch

### 6.1 SEO

- [ ] Meta-Tags in allen Pages
- [ ] OG:Image erstellen (1200x630)
- [ ] `sitemap.xml` generieren
- [ ] `robots.txt` konfigurieren
- [ ] Canonical URLs

### 6.2 Analytics

- [ ] Plausible oder Fathom einrichten (DSGVO-konform)
- [ ] Event-Tracking für CTAs

### 6.3 Deployment

- [ ] Vercel-Projekt erstellen
- [ ] Domain `jassverband.ch` verbinden
- [ ] SSL-Zertifikat aktiv
- [ ] Preview-Deployments für PRs

---

## Sofort-Aktionen (Copy-Paste Ready)

### Schritt 1: Assets migrieren

```bash
cd /Users/remoprinz/Documents/jassverband-schweiz

# Backgrounds
cp src/assets/textures/wood-texture.jpg public/images/backgrounds/
cp src/assets/textures/chalkboard.jpg public/images/backgrounds/
cp src/assets/textures/felt-texture.png public/images/backgrounds/
cp src/assets/textures/felt-texture-gradient.png public/images/backgrounds/

# Cards
cp src/assets/cards/*.png public/images/cards/

# Logos
mkdir -p public/images/logos
cp src/assets/logos/*.svg public/images/logos/
cp src/assets/logos/*.png public/images/logos/

# Badges
cp src/assets/logos/lebendige-traditionen.png public/images/badges/

# Illustrations
mkdir -p public/images/illustrations
cp src/assets/cards/jester.png public/images/illustrations/

# Verify
echo "=== MIGRATION COMPLETE ==="
find public/images -type f | wc -l
echo "files in public/images/"
```

### Schritt 2: Dev Server starten

```bash
cd /Users/remoprinz/Documents/jassverband-schweiz
npm run dev
# → http://localhost:3000
```

### Schritt 3: Hero.tsx fixen

In `src/components/sections/Hero.tsx`, Zeilen 55-60 ersetzen:

```tsx
const cards: CardData[] = [
  { id: 1, src: '/images/cards/schilten-under.png', symbol: '🛡️', color: 'text-yellow-600', value: 'U', rotate: -15, x: -100 },
  { id: 2, src: '/images/cards/schilten-10.png', symbol: '🛡️', color: 'text-yellow-600', value: '10', rotate: -5, x: -35 },
  { id: 3, src: '/images/cards/rosen-ass.png', symbol: '🌹', color: 'text-red-500', value: 'A', rotate: 8, x: 35 },
  { id: 4, src: '/images/cards/eichel-under.png', symbol: '🌰', color: 'text-amber-700', value: 'U', rotate: 18, x: 100 },
];
```

---

## Offene Fragen (für Remo/Jens)

1. **Font:** Capita (Figma) oder Zilla Slab (aktuell)?
2. **EN-Version:** Brauchen wir Englisch?
3. **Kontaktformular:** Wohin sollen Anfragen gehen?
4. **News:** Gibt es bereits Artikel für den Launch?
5. **Partner:** Welche Partner-Logos zeigen?

---

## Zusammenfassung

| Phase | Tasks | Geschätzt |
|-------|-------|-----------|
| **Phase 1** | Asset-Integration | 2 Stunden |
| **Phase 2** | Design-System | 2-4 Stunden |
| **Phase 3** | Homepage Polish | 4 Stunden |
| **Phase 4** | Unterseiten | 1-2 Tage |
| **Phase 5** | i18n | 2-4 Stunden |
| **Phase 6** | Pre-Launch | 4 Stunden |

**Gesamtschätzung:** 3-5 Arbeitstage

**Erster Schritt:** Asset-Migration ausführen (Schritt 1 oben), dann Hero.tsx fixen.

---

*Letzte Aktualisierung: 2026-02-22*
