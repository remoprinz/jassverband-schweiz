# DESIGN SYSTEM — Jassverband Schweiz
**Version:** 1.0.0 | **Gültig für:** Alle Ewigkeiten 🏆  
**Letzte Aktualisierung:** 2026-03-02

> **GOLDENE REGEL:** Dieses Dokument definiert die unumstößlichen Design-Standards. Jede Abweichung muss explizit dokumentiert und begründet werden.

---

## 🎯 DESIGN-PRINZIPIEN

### **Einheitlichkeit über Alles**
- **EINE BREITE** für alle Content-Sections: `1152px + padding`
- **EINE TYPOGRAFIE-HIERARCHIE** für alle Texte
- **EINE FARB-PALETTE** für alle Elemente
- **EINE SPACING-SKALA** für alle Abstände

### **Performance First**
- Mobile-First Responsive Design
- Optimierte Font-Loading (next/font)
- CSS-Variablen für Theming
- Minimal Bundle Size

---

## 📐 CONTAINER-SYSTEM

### **Die Heilige Trinity der Container-Breiten**

| Container | Max-Width | Verwendung | CSS-Klasse |
|-----------|-----------|------------|-------------|
| **FULL** | `1152px + 144px padding` | **Standard für Content** | `container-main` |
| **WIDE** | `1024px + padding` | *Große Card-Grids* | `max-w-5xl mx-auto px-6 md:px-8` |
| **NARROW** | `768px + padding` | *Formulare, lange Texte* | `max-w-3xl mx-auto px-6 md:px-8` |

### **🚨 GOLDENE CONTAINER-REGELN:**

1. **DEFAULT = FULL** → Alle Standard-Sections nutzen `containerSize="full"`
2. **WIDE nur für komplexe Grids** → 3+ Karten nebeneinander
3. **NARROW nur für Form/Reading** → Formulare, lange Artikel
4. **NIE custom max-width** → Nur die 3 definierten Größen verwenden

---

## 🎨 TYPOGRAFIE-HIERARCHIE

### **Font-Familie Assignments**

| Element | Font | Verwendung | CSS-Variable |
|---------|------|------------|--------------|
| **Headlines** | Capita Bold | h1, h2, h3, Buttons | `--font-capita` |
| **Body-Text** | Inter | p, span, labels, links | `--font-inter` |
| **Monospace** | System | code, pre | `font-mono` |

### **Font-Size Scale (Responsive)**

| Level | Mobile | Desktop | Verwendung |
|-------|--------|---------|------------|
| **Hero** | `clamp(32px, 6vw, 48px)` | 48px | Haupt-Headlines |
| **Section** | `clamp(28px, 5vw, 42px)` | 42px | Section-Titel |
| **Sub-Section** | `clamp(24px, 4vw, 36px)` | 36px | Sub-Headlines |
| **Card-Title** | `clamp(20px, 3vw, 28px)` | 28px | Card-Überschriften |
| **Body** | 16px | 18px | Standard-Text |
| **Small** | 14px | 15px | Meta-Info |

### **🚨 GOLDENE TYPOGRAFIE-REGELN:**

1. **Capita nur für Headlines** → h1-h6, Buttons, Card-Titles
2. **Inter für alles andere** → body, labels, descriptions
3. **Clamp für Headlines** → Responsive ohne Media-Queries
4. **Line-Height Standards:** Headlines 1.2, Body 1.5, Small 1.4

---

## 🎨 FARB-PALETTE

### **Primary Colors**

```css
:root {
  /* Brand Colors */
  --color-primary: #ff0000;           /* Schweizer Rot */
  --color-primary-hover: #cc0000;     /* Hover State */
  --color-cream: #f0eee7;             /* Background Accent */
  --color-trust: #e8e4dc;             /* Trust Badge Background */
  
  /* Semantic Colors */
  --color-foreground: #000000;        /* Haupt-Text */
  --color-foreground-muted: #6b6b6b;  /* Sekundär-Text */
  --color-background: #ffffff;        /* Haupt-Background */
  --color-background-dark: #000000;   /* Dunkle Sections */
}
```

### **🚨 GOLDENE FARB-REGELN:**

1. **Nur CSS-Variablen** → Niemals Hex-Codes direkt verwenden
2. **Primary für CTAs** → Buttons, Links, Aktions-Elemente  
3. **Cream für Sections** → Abwechselnde Section-Backgrounds
4. **Muted für Meta-Info** → Subtexte, Platzhalter

---

## 📏 SPACING-SYSTEM

### **Section-Spacing (Vertical)**

| Size | Padding | Verwendung |
|------|---------|------------|
| **XL** | `py-24 md:py-32` | Hero-Sections |
| **L** | `py-20 md:py-24` | Standard-Sections |
| **M** | `py-16 md:py-20` | Kompakte Sections |
| **S** | `py-12 md:py-16` | Sub-Sections |
| **XS** | `py-8 md:py-10` | Trust-Badge, Footer-Info |

### **Component-Spacing (Internal)**

| Element | Gap | CSS-Klasse |
|---------|-----|------------|
| **Card-Grids** | `gap-6 lg:gap-8` | Standard-Grid-Gap |
| **Button-Groups** | `gap-4` | Button nebeneinander |
| **Form-Fields** | `space-y-6` | Formular-Abstände |
| **Text-Blocks** | `space-y-4` | Paragraph-Abstände |

### **🚨 GOLDENE SPACING-REGELN:**

1. **Responsive-Pairs** → Immer Mobile + Desktop definieren
2. **8px-Grid** → Alle Werte Vielfache von 8px (4, 8, 12, 16, 20, 24...)
3. **Konsistente Section-Gaps** → py-20 md:py-24 für Standard-Sections

---

## 🧱 COMPONENT-HIERARCHIE

### **Layout-Components (Höchste Priorität)**

```tsx
// ✅ IMMER SO verwenden:
<StandardSection containerSize="full" background="cream">
  <content>
</StandardSection>

// ❌ NIEMALS SO:
<section className="py-20">
  <div className="max-w-4xl mx-auto">
```

### **UI-Components Usage-Rules**

| Component | Verwendung | Props |
|-----------|------------|-------|
| `StandardSection` | **Standard für alle Sections** | `containerSize`, `background`, `title` |
| `Button` | **Alle CTAs** | `variant`, `size`, `href` |
| `FAQCard` | **Accordion-Pattern** | `question`, `answer`, `isOpen` |
| `PricingCard` | **Pricing/Package-Display** | `title`, `price`, `features` |
| `SectionHeader` | **Section-Titles** | `title`, `subtitle`, `size` |

### **🚨 GOLDENE COMPONENT-REGELN:**

1. **StandardSection First** → Alle neuen Sections nutzen StandardSection
2. **Consistent Props** → Gleiche Props für gleiche Funktionen
3. **No Inline Styling** → Nur Tailwind-Klassen, CSS-Variablen
4. **Export in index.ts** → Alle Components barrel-exported

---

## 📱 RESPONSIVE-BREAKPOINTS

### **Breakpoint-Definitionen**

| Device | Breakpoint | Tailwind | Verwendung |
|--------|------------|----------|------------|
| **Mobile** | `< 768px` | Default | Basis-Styling |
| **Tablet** | `768px - 1023px` | `md:` | Intermediate Layout |
| **Desktop** | `≥ 1024px` | `lg:` | Full Layout |
| **Large** | `≥ 1280px` | `xl:` | Extra Spacing |

### **🚨 GOLDENE RESPONSIVE-REGELN:**

1. **Mobile-First** → Default = Mobile, dann md:, lg: erweitern
2. **Grid-Responsive** → `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
3. **Font-Responsive** → clamp() für Headlines, feste Sizes für Body

---

## 🔒 DESIGN-GOVERNANCE

### **Enforcement-Mechanismen**

1. **Agent-Integration** → Stich-Agent enforced diese Regeln
2. **PR-Reviews** → Design-System-Compliance prüfen
3. **Build-Validierung** → Linter-Rules für CSS-Variablen
4. **Component-Tests** → Responsive-Tests für alle Breakpoints

### **Update-Prozess**

1. **Änderungsvorschlag** → Issue mit Begründung
2. **Team-Review** → Design + Development Approval  
3. **Version-Update** → Semantic Versioning (1.0.0 → 1.1.0)
4. **Agent-Update** → stich-frontend.md synchronisieren

---

## 📊 ERFOLGSMESSUNG

### **Design-System Health-Checks**

- ✅ **Container-Konsistenz:** Alle Sections nutzen Standard-Container
- ✅ **Font-Compliance:** Capita/Inter korrekt zugewiesen
- ✅ **Color-Purity:** Nur CSS-Variablen, keine Hex-Codes
- ✅ **Spacing-Harmony:** 8px-Grid eingehalten
- ✅ **Component-Coverage:** 90%+ nutzen Standard-Components

---

## 🏆 CHANGELOG

| Version | Datum | Änderung |
|---------|-------|----------|
| **1.0.0** | 2026-03-02 | Initial Design System nach Container-Einheitlichkeit |

---

**🎯 MISSION:** "Aus einem Guss für alle Ewigkeiten" — Diese Standards sind unumstößlich und bilden die Grundlage für alle zukünftigen Entwicklungen.