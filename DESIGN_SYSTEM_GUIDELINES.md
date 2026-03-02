# Design-System Guidelines — Jassverband Schweiz

> **"Aus einem Guss für alle Zeiten"** — Vollständige Anleitung für konsistente Frontend-Entwicklung

---

## 🎯 Container-Size Rules

### **WANN WELCHE BREITE VERWENDEN:**

| Container Size | Breite | Wann verwenden | Beispiele |
|---------------|--------|----------------|-----------|
| **`full`** | 1152px + padding | Haupt-Content, mehrspaltige Layouts | Homepage-Kacheln, FAQ, Ecosystem |
| **`narrow`** | ~768px | Single-Column Forms, Checkout | Anmeldeformulare, Checkout-Prozess |
| **`wide`** | ~1024px | Card-Grids, Pricing-Tables | Pricing-Section, Feature-Vergleiche |

### **✅ KONSISTENZ-REGEL:**
**Alle Content-Sections nutzen `containerSize="full"`** für maximale Konsistenz!

**Ausnahmen nur bei:**
- Forms & Checkout (`narrow` für bessere UX)
- Spezielle Card-Grids (`wide` wenn needed)

---

## 🏗️ Component Usage

### **StandardSection vs. Section**

#### **✅ VERWENDE StandardSection für:**
```tsx
// 95% aller Sections - Standard-Layout
<StandardSection
  title="Section Titel"
  subtitle="Untertitel"
  background="cream"
  containerSize="full"
  spacing="lg"
>
  <Content />
</StandardSection>
```

#### **⚠️ VERWENDE Section nur für:**
```tsx
// Spezielle Sections mit Background-Images oder Custom-Layout
<Section background="transparent" spacing="none" className="relative overflow-hidden">
  <div className="absolute inset-0">
    <Image src="/bg.jpg" fill />
  </div>
  <Container size="full">
    <CustomContent />
  </Container>
</Section>
```

---

## 🎴 Card-System Guidelines

### **Wann welche Card verwenden:**

```tsx
// Pricing & Mitgliedschaften
<PricingCard
  title="Botschafter"
  price={90}
  features={["Feature 1", "Feature 2"]}
  isHighlighted={false}
  onSelect={() => {}}
  ctaText="Auswählen"
/>

// FAQ & Expandable Content
<FAQCard
  question="Frage?"
  answer="Antwort"
  isOpen={isOpen}
  onToggle={() => setOpen(!isOpen)}
/>

// Projekte & Links
<EnhancedProjectCard
  title="JassWiki"
  description="Das Jass-Lexikon"
  href="https://jasswiki.ch"
  icon={<Icon />}
  ctaText="Erkunden"
/>

// Basis für Custom Cards
<BaseCard hover={true}>
  <CustomContent />
</BaseCard>
```

---

## 🎨 Design-Tokens (IMMER VERWENDEN)

### **Farben:**
```css
var(--color-primary)           /* #ff0000 - Schweizer Rot */
var(--color-cream)             /* #f0eee7 - Cream Background */
var(--color-foreground)        /* #000000 - Text */
var(--color-foreground-muted)  /* #6b6b6b - Secondary Text */
```

### **Typography:**
```css
var(--font-family-serif)   /* Capita - Headlines */
var(--font-family-sans)    /* Inter - Body Text */
var(--font-size-42)        /* 42px - H2 */
var(--font-size-28)        /* 28px - H3 */
var(--font-size-16)        /* 16px - Body */
```

### **Spacing & Shadows:**
```css
var(--radius-card)         /* 12px - Standard Radius */
var(--shadow-card)         /* Standard Shadow */
var(--shadow-card-hover)   /* Hover Shadow */
```

---

## 📱 Responsive Guidelines

### **Mobile-First Approach:**
```tsx
<div className="
  px-4 md:px-8 lg:px-12           // Padding
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  // Grid
  gap-4 md:gap-6 lg:gap-8         // Gaps
  text-base md:text-lg lg:text-xl // Typography
">
```

### **Breakpoints:**
- **Mobile**: `<768px` (default)
- **Tablet**: `md:` `768px-1023px`
- **Desktop**: `lg:` `≥1024px`

---

## ✅ Checkliste Neue Section

**Vor dem Code schreiben:**
- [ ] Brauche ich `StandardSection` oder custom Layout?
- [ ] Welche `containerSize`? (Regel: `full` für Content)
- [ ] Welches `background`? (cream, white, trust, etc.)
- [ ] Welches `spacing`? (lg für Standard-Sections)

**Beim Implementieren:**
- [ ] TypeScript Props-Interface definiert
- [ ] CSS-Variablen statt hardcoded values
- [ ] Mobile-First Responsive
- [ ] framer-motion Animationen (falls sinnvoll)
- [ ] Accessibility (aria-labels, keyboard navigation)

**Nach Implementierung:**
- [ ] Alle Breakpoints getestet
- [ ] Mit anderen Sections visuell konsistent
- [ ] Performance-optimiert (Bilder, Animationen)

---

## 🚀 Workflow Neue Features

### **1. Analyse**
```bash
# Gibt es bereits ähnliche Komponenten?
grep -r "similar-pattern" src/components/
```

### **2. Design-Entscheidung**
- Welche Container-Size macht Sinn?
- Passt es zum bestehenden Design-System?
- Kann ich bestehende Cards/Komponenten wiederverwenden?

### **3. Implementierung**
```tsx
import { StandardSection, FAQCard } from '@/components/ui';

// ✅ Konsistent mit System
<StandardSection 
  title="Neue Section" 
  containerSize="full"
  background="cream"
>
  <NewContent />
</StandardSection>
```

### **4. Test & Deploy**
```bash
npm run build     # Build Test
npm run dev       # Visual Test
vercel --prod     # Deploy
```

---

## 🎯 Migration Guidelines

### **Legacy Section → StandardSection:**

**❌ Alt:**
```tsx
<section className="py-20 md:py-24" style={{ backgroundColor: '#f0eee7' }}>
  <div className="container-main">
    <h2 style={{ fontSize: '42px', ... }}>Titel</h2>
    <div className="max-w-3xl mx-auto">Content</div>
  </div>
</section>
```

**✅ Neu:**
```tsx
<StandardSection 
  title="Titel"
  background="cream" 
  containerSize="full"
>
  <Content />
</StandardSection>
```

### **Migration Steps:**
1. Import `StandardSection` hinzufügen
2. Props extrahieren (`title`, `background`, etc.)
3. Container-Logic entfernen
4. CSS-Variablen verwenden
5. Testen & Vergleichen

---

## 🔧 Troubleshooting

### **Problem: Inkonsistente Breiten**
```tsx
// ❌ Falsch: Verschiedene Breiten
<StandardSection containerSize="narrow">  // 768px
<StandardSection containerSize="full">    // 1152px

// ✅ Richtig: Konsistente Breiten für Content
<StandardSection containerSize="full">    // Beide 1152px
<StandardSection containerSize="full">
```

### **Problem: Hardcoded Styles**
```tsx
// ❌ Falsch: Hardcoded
style={{ backgroundColor: '#ff0000', fontSize: '42px' }}

// ✅ Richtig: CSS-Variablen
style={{ 
  backgroundColor: 'var(--color-primary)',
  fontSize: 'var(--font-size-42)'
}}
```

### **Problem: Fehlende Responsiveness**
```tsx
// ❌ Falsch: Fixed Size
<div className="px-8 gap-8">

// ✅ Richtig: Responsive
<div className="px-4 md:px-8 gap-4 md:gap-8">
```

---

## 📈 Performance Best Practices

### **Images:**
```tsx
// ✅ Optimiert
<Image
  src="/images/bg.jpg"
  alt="Description"
  fill
  quality={85}
  priority={isAboveFold}
  sizes="(max-width: 768px) 100vw, 1152px"
/>
```

### **Animations:**
```tsx
// ✅ Performance-bewusst
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}  // ← Wichtig!
  transition={{ duration: 0.5 }}
>
```

### **CSS-Variablen statt Inline:**
```tsx
// ✅ Besser für Performance
className="bg-[var(--color-primary)]"
// vs
style={{ backgroundColor: '#ff0000' }}
```

---

## 🎉 Erfolgs-Kriterien

**Ein perfektes "aus einem Guss" System hat:**

- ✅ **Konsistente Container-Breiten** über alle Seiten
- ✅ **Einheitliches Typography-System** (Capita + Inter)
- ✅ **Wiederverwendbare Komponenten** für alle Use Cases  
- ✅ **Design-Tokens** statt hardcoded values
- ✅ **Mobile-First Responsive** auf allen Komponenten
- ✅ **Performance-optimiert** (Images, Animations, CSS)
- ✅ **TypeScript-safe** APIs für alle Komponenten
- ✅ **Klare Guidelines** für zukünftige Entwicklung

---

**Das System ist bereit für "alle Zeiten" — entwickle mit Vertrauen!** 🚀

*— Stich, Frontend-Meister*