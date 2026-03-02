# Design-System — Jassverband Schweiz

> **Stich** hat ein einheitliches Design-System implementiert für konsistente, skalierbare Frontend-Entwicklung.

## 🎯 Problem gelöst

**VORHER:** Inkonsistente Layouts, verschiedene Container-Breiten, inline Styles überall  
**NACHHER:** Einheitliches System, wiederverwendbare Komponenten, saubere Architektur

---

## 🏗️ Layout-System

### `<Section>` - Section-Wrapper
```tsx
import { Section } from '@/components/ui';

<Section 
  background="cream"     // white | cream | dark | transparent
  spacing="lg"           // none | sm | md | lg  
  className="custom"
>
  Content
</Section>
```

### `<Container>` - Container-Breiten
```tsx
import { Container } from '@/components/ui';

<Container 
  size="full"            // full | narrow | wide
  className="custom"
>
  Content
</Container>
```

**Container-Größen:**
- `full`: Volle Breite (1152px + padding) — Standard für Homepage
- `narrow`: Schmal (~768px) — Für FAQ, Formulare, fokussierte Inhalte
- `wide`: Mittel (~1024px) — Für Pricing, Cards-Grids

### `<StandardSection>` - Alles in einem
```tsx
import { StandardSection } from '@/components/layout/StandardSection';

<StandardSection
  title="Section Titel"
  subtitle="Untertitel"
  background="cream"
  containerSize="narrow"
  spacing="lg"
>
  Section Content
</StandardSection>
```

---

## 🎴 Card-System

### `<PricingCard>` - Für Mitgliedschafts-Packages
```tsx
import { PricingCard } from '@/components/ui';

<PricingCard
  title="Botschafter"
  price={90}
  period="Jahr"
  features={["Feature 1", "Feature 2", null]}
  isHighlighted={false}
  isSelected={isSelected}
  onSelect={() => handleSelect()}
  ctaText="Auswählen"
  badge="Empfohlen"
/>
```

### `<FAQCard>` - Für häufige Fragen
```tsx
import { FAQCard } from '@/components/ui';

<FAQCard
  question="Frage hier"
  answer="Antwort hier"
  isOpen={isOpen}
  onToggle={() => toggle()}
  linkUrl="https://example.com"
  linkLabel="Mehr erfahren"
/>
```

### `<EnhancedProjectCard>` - Für Ecosystem-Projekte
```tsx
import { EnhancedProjectCard } from '@/components/ui';

<EnhancedProjectCard
  title="JassWiki"
  description="Das Jass-Lexikon der Schweiz"
  href="https://jasswiki.ch"
  icon={<WikiIcon />}
  ctaText="Erkunden"
  external={true}
/>
```

---

## 📝 Typography System

### `<SectionHeader>` - Standardisierte Titel
```tsx
import { SectionHeader } from '@/components/ui';

<SectionHeader
  title="Haupttitel"
  subtitle="Untertitel"
  size="lg"              // sm | md | lg
  centered={true}
  light={false}          // für dunkle Hintergründe
/>
```

---

## 🎨 Design-Tokens (globals.css)

```css
/* Konsistente Verwendung überall */
--container-max: 1152px;
--container-padding: 144px;
--container-padding-mobile: 24px;

--font-size-42: 42px;
--font-size-28: 28px;
--font-size-20: 20px;
--font-size-17: 17px;
--font-size-16: 16px;
--font-size-15: 15px;

--color-primary: #ff0000;
--color-cream: #f0eee7;
--color-foreground-muted: #6b6b6b;

--radius-card: 12px;
--radius-card-lg: 16px;
--shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
--shadow-card-hover: 0 8px 30px rgba(0, 0, 0, 0.12);
```

---

## 🔄 Migration Guide

### Alte Pattern → Neue Pattern

**❌ VORHER:**
```tsx
<section className="py-20 md:py-24" style={{ backgroundColor: '#f0eee7' }}>
  <div className="container-main">
    <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', ... }}>Titel</h2>
    <div className="max-w-3xl mx-auto">Content</div>
  </div>
</section>
```

**✅ NACHHER:**
```tsx
<StandardSection 
  title="Titel" 
  background="cream" 
  containerSize="narrow"
>
  Content
</StandardSection>
```

### Button Migration

**❌ VORHER:**
```tsx
<button 
  style={{
    backgroundColor: '#ff0000',
    padding: '16px 32px',
    borderRadius: '9999px',
    // ... 20 weitere inline Styles
  }}
>
  Text
</button>
```

**✅ NACHHER:**
```tsx
<Button variant="primary" size="lg">
  Text  
</Button>
```

---

## ⚡ Performance Benefits

1. **CSS-Variablen** statt inline Styles → Weniger Bundle-Size
2. **Wiederverwendbare Komponenten** → Weniger Code-Duplikation  
3. **Konsistente Breakpoints** → Bessere Caching
4. **Design-Token System** → Einfache Theme-Änderungen

---

## 🧩 Component Index

```tsx
// Layout System
import { 
  Section, 
  Container, 
  SectionHeader 
} from '@/components/ui';

import { StandardSection } from '@/components/layout/StandardSection';

// Cards
import { 
  PricingCard, 
  FAQCard, 
  EnhancedProjectCard,
  BaseCard 
} from '@/components/ui';

// Existing
import { Button } from '@/components/ui';
```

---

## 🎯 Nächste Schritte

1. ✅ **FAQ-Inkonsistenz behoben** — Jetzt same Breite wie Homepage-Kacheln
2. ✅ **Pricing-Cards einheitlich** — Wiederverwendbares System  
3. ✅ **Section-Spacing konsistent** — Standardisierte Abstände
4. 🔄 **Weitere Sections migrieren** — Nach und nach alle Komponenten

---

## 📋 Checklist neue Komponenten

Beim Erstellen neuer Komponenten:

- [ ] CSS-Variablen verwenden statt hardcoded Werte
- [ ] `StandardSection` für Standard-Layouts
- [ ] Richtige `containerSize` wählen (full/narrow/wide)
- [ ] Bestehende Card-Komponenten wiederverwenden
- [ ] `SectionHeader` für Titel-Sections
- [ ] Design-Tokens aus globals.css nutzen
- [ ] Mobile-First Responsive Design

---

**Ergebnis:** Einheitliches, skalierbares Design-System für fließende Weiterentwicklung! 

*— Stich, Frontend-Meister*