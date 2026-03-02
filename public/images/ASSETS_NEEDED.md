# Assets für Jassverband Schweiz Website

## Benötigte Assets

### `/backgrounds/`
- [ ] `wood-texture.jpg` - Holztextur für Hero-Hintergrund (min. 2000x1200px, seamless tileable bevorzugt)
- [ ] `felt-texture.jpg` - Grüner Filz für Tournament-Section (min. 1920x800px)

### `/cards/`
Schweizer Jasskarten als transparente PNGs (ca. 400x600px):
- [ ] `schellen-unter.png`
- [ ] `schellen-10.png`
- [ ] `rosen-9.png`
- [ ] `eichel-6.png`
- [ ] `rosen-under.png` (für Pillars Dekoration)
- [ ] `schilten-bauer.png`
- [ ] `eichel-ass.png`

### `/badges/`
- [ ] `lebendige-traditionen.png` - Offizielles Badge "Lebendige Traditionen" (transparent PNG)

### `/illustrations/`
- [ ] `jester.png` - Jester/Narr-Figur mit Karte für Footer (transparent PNG, ca. 300x400px)

### `/icons/`
SVG-Icons falls die eingebauten nicht ausreichen:
- [ ] `tradition.svg`
- [ ] `youth.svg`
- [ ] `future.svg`
- [ ] `jasswiki.svg`
- [ ] `jassguru.svg`
- [ ] `jassmeister.svg`

## Schriften

Die Website verwendet:
- **Zilla Slab** (Google Font) - für Headlines
- **Geist Sans** (Vercel Font) - für Body Text

Beide werden automatisch über `next/font` geladen.

## Farben (Design-System)

```css
--color-primary: #E31E24      /* Schweizer Rot */
--color-felt-green: #1B4D3E   /* Jass-Tisch Grün */
--color-wood-dark: #5D4037    /* Holz dunkel */
--color-cream: #F5F1E8        /* Cremiger Hintergrund */
```

## Hinweise

- Alle Bilder sollten WebP-kompatibel sein (Next.js konvertiert automatisch)
- Für Retina-Displays: Liefern Sie Bilder in 2x Auflösung
- Transparente PNGs für Karten und Illustrationen
- JPGs für Texturen (bessere Kompression)
