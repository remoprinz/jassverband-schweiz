# Jassverband Schweiz - Complete Design Specification Report
**Website Analysis**: https://jassverband-schweiz.vercel.app/de  
**Generated**: February 22, 2026

---

## 1. FONT CONFIGURATION

### Current Implementation

#### **Primary Display Font (Headlines): Capita**
- **Font Family**: `Capita` (custom font)
- **Source**: Local font files in `/src/assets/fonts/Capita/`
- **Weights Available**:
  - Regular (400)
  - Bold (700)
  - Regular Italic
  - Bold Italic
- **Format**: WOFF2 files loaded via Next.js `localFont`
- **CSS Variable**: `--font-capita`
- **Fallback**: `Georgia, serif`
- **Usage**: All headlines (h1, h2, h3, h4, h5, h6), section titles, and CTA button text

#### **Body Font: Inter**
- **Font Family**: `Inter` (Google Font)
- **Source**: Loaded from Google Fonts via Next.js
- **CSS Variable**: `--font-inter`
- **Fallback**: `system-ui, -apple-system, sans-serif`
- **Usage**: All body text, paragraphs, navigation, and regular UI elements

### Font Loading Status
✅ **Capita WOFF2 files exist**: 
- `Capita-Regular.woff2` (88KB)
- `Capita-Bold.woff2` (85KB)
- `Capita-RegularItalic.woff2` (87KB)
- `Capita-BoldItalic.woff2` (84KB)

✅ **Inter loaded**: Via Next.js Google Fonts integration with `display: "swap"`

### Typography Scale

#### Hero Section (Homepage)
```css
h1.hero-title {
  font-family: var(--font-capita), Georgia, serif;
  font-size: 3rem;      /* Mobile (sm) */
  font-size: 4rem;      /* Tablet (md) */
  font-size: 5rem;      /* Desktop (lg) */
  font-size: 6rem;      /* Large Desktop (xl) */
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: white;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

p.hero-subtitle {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-size: 1.125rem; /* 18px - Mobile */
  font-size: 1.25rem;  /* 20px - Tablet (md) */
  font-size: 1.5rem;   /* 24px - Desktop (lg) */
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 10px rgba(0,0,0,0.3);
}
```

#### Section Titles (Pillars, Tournament, etc.)
```css
h2.section-title {
  font-family: var(--font-capita), Georgia, serif;
  font-size: 1.875rem; /* 30px - Mobile */
  font-size: 2.25rem;  /* 36px - Tablet (md) */
  font-size: 3rem;     /* 48px - Desktop (lg) */
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
}
```

#### Pillar Card Titles
```css
h3.pillar-title {
  font-family: var(--font-capita), Georgia, serif;
  font-size: 1.25rem;  /* 20px - Default */
  font-size: 1.5rem;   /* 24px - Desktop (lg) */
  font-weight: 700;
  margin-bottom: 0.75rem;
}
```

#### Body Text (Pillar Cards)
```css
p.pillar-description {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-size: 0.875rem; /* 14px - Default */
  font-size: 1rem;     /* 16px - Desktop (lg) */
  line-height: 1.6;
  color: var(--color-foreground-muted); /* #6B6B6B */
}
```

---

## 2. COLOR SYSTEM

### Primary Brand Colors
```css
--color-primary: #E31E24;           /* Swiss Red - Main CTA, accents */
--color-primary-hover: #C91A1F;     /* Darker red for hover states */
--color-primary-light: #FF4A4F;     /* Lighter red for highlights */
```

### Swiss Heritage Palette (Textures & Atmospheres)
```css
--color-wood-dark: #5D4037;         /* Dark brown for wood texture base */
--color-wood-medium: #8B6F47;       /* Medium brown for wood variation */
--color-wood-light: #A1887F;        /* Light brown for wood highlights */
--color-felt-green: #1B4D3E;        /* Deep green for felt table */
--color-felt-green-light: #2E7D5A;  /* Lighter felt green */
--color-cream: #F5F1E8;             /* Warm cream for section backgrounds */
--color-cream-dark: #EDE8DC;        /* Darker cream for contrast */
```

### Neutral Colors
```css
--color-background: #FFFFFF;         /* White - main background */
--color-background-alt: #F5F1E8;     /* Cream - alternating sections */
--color-background-dark: #1A1512;    /* Near-black for dark elements */
--color-foreground: #1A1A1A;         /* Almost black - main text */
--color-foreground-muted: #6B6B6B;   /* Gray - secondary text */
--color-foreground-light: #FFFFFF;   /* White text on dark backgrounds */
```

### Accent Colors
```css
--color-accent-jassmeister: #FF5F1F; /* Orange for tournament teaser */
```

### Borders
```css
--color-border: #E5E5E5;             /* Light gray borders */
--color-border-dark: #333333;        /* Dark borders */
```

---

## 3. BUTTON STYLES

### Primary Button (CTA)
```css
.btn-primary {
  background: #E31E24;              /* var(--color-primary) */
  color: white;
  font-family: var(--font-capita), Georgia, serif;
  font-weight: 600;
  padding: 1rem 2rem;               /* Large size */
  padding: 0.75rem 1.5rem;          /* Medium size */
  padding: 0.5rem 1rem;             /* Small size */
  border-radius: 9999px;            /* Fully rounded (pill shape) */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(227, 30, 36, 0.3);
}

.btn-primary:hover {
  background: #C91A1F;              /* var(--color-primary-hover) */
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(227, 30, 36, 0.4);
}
```

### Secondary Button
```css
.btn-secondary {
  border: 2px solid #1A1A1A;        /* var(--color-foreground) */
  color: #1A1A1A;
  background: transparent;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #1A1A1A;
  color: white;
  transform: scale(1.02);
}
```

---

## 4. CARD STYLES

### Pillar Cards
```css
.pillar-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;            /* 12px */
  padding: 1.5rem;                   /* 24px - Default */
  padding: 2rem;                     /* 32px - Desktop (lg) */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pillar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}
```

### Jass Playing Cards (Hero Section)
```css
.jass-card {
  position: absolute;
  width: 100px;                      /* Mobile */
  width: 140px;                      /* Desktop (md) */
  height: 150px;                     /* Mobile */
  height: 210px;                     /* Desktop (md) */
  border-radius: 0.5rem;             /* 8px */
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.35));
}

.jass-card:hover {
  transform: translateY(-15px) rotate(0deg) scale(1.08);
  z-index: 10;
}
```

Card positions in hero:
1. Schilten Under: `rotate: -15deg, x: -100px`
2. Schilten 10: `rotate: -5deg, x: -35px`
3. Rosen Ass: `rotate: 8deg, x: 35px`
4. Eichel Under: `rotate: 18deg, x: 100px`

---

## 5. SECTION LAYOUTS

### Hero Section
```css
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 6rem;                 /* 96px - space for fixed header */
  padding-bottom: 4rem;              /* 64px */
}

/* Background */
.hero-background {
  background-image: url('/images/backgrounds/wood-texture.jpg');
  background-size: cover;
  background-position: center;
}

/* Gradient Overlay */
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
}
```

### Pillars Section
```css
.pillars-section {
  background: #F5F1E8;               /* var(--color-cream) */
  padding-top: 5rem;                 /* 80px - Desktop */
  padding-bottom: 5rem;
  padding-top: 3rem;                 /* 48px - Mobile */
  padding-bottom: 3rem;
}

.pillars-grid {
  display: grid;
  grid-template-columns: 1fr;       /* Mobile: 1 column */
  grid-template-columns: repeat(3, 1fr); /* Tablet+: 3 columns */
  gap: 1.5rem;                      /* 24px */
  gap: 2rem;                        /* 32px - Desktop (lg) */
}
```

### Tournament Section
```css
.tournament-section {
  position: relative;
  padding-top: 5rem;                 /* 80px */
  padding-bottom: 5rem;
  padding-top: 7rem;                 /* 112px - Desktop (md) */
  padding-bottom: 7rem;
  overflow: hidden;
}

/* Background */
.tournament-background {
  background-image: url('/images/backgrounds/felt-texture.png');
  background-size: cover;
  background-position: center;
  background-color: #1B4D3E;         /* var(--color-felt-green) */
}

/* Fallback Gradient (if texture fails to load) */
.tournament-background-fallback {
  background: linear-gradient(
    180deg,
    #1B4D3E 0%,                      /* var(--color-felt-green) */
    #2E7D5A 100%                     /* var(--color-felt-green-light) */
  );
}

/* Vignette Overlay */
.tournament-vignette {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
}
```

---

## 6. SPACING & LAYOUT SYSTEM

### Container
```css
.container-main {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;              /* 24px - Desktop */
  padding-right: 1.5rem;
  padding-left: 1rem;                /* 16px - Mobile */
  padding-right: 1rem;
}
```

### Section Spacing
```css
.section-spacing {
  padding-top: 5rem;                 /* 80px - Desktop */
  padding-bottom: 5rem;
  padding-top: 3rem;                 /* 48px - Mobile */
  padding-bottom: 3rem;
}
```

---

## 7. VISUAL ASSETS STATUS

### ✅ Background Textures (ALL PRESENT)
- `wood-texture.jpg` - 617KB (Hero section background)
- `felt-texture.png` - 4.3MB (Tournament section background)
- `felt-texture-gradient.png` - 4.2MB (Alternative felt texture)
- `chalkboard.jpg` - 499KB (Unused - for potential future use)

### ✅ Jass Playing Cards (ALL PRESENT)
Hero section cards:
- `schilten-under.png` - 192KB
- `schilten-10.png` - 354KB
- `rosen-ass.png` - 256KB
- `eichel-under.png` - 295KB

Additional cards available:
- `cards-left.png` - 765KB
- `cards-right.png` - 736KB
- `jester.png` - 404KB
- `rosen-koenig.png` - 351KB

### ⚠️ Pillar Card Decorative Images (MISSING)
The Pillars component references these images that DON'T exist:
- `rosen-under.png` - MISSING (referenced but not found)
- `schilten-bauer.png` - MISSING (referenced but not found)
- `eichel-ass.png` - MISSING (referenced but not found)

**Fallback**: SVG icons are used instead (tradition, youth, future icons)

### ✅ Logos & Badges
Directory exists: `/public/images/logos/` and `/public/images/badges/`

---

## 8. SHADOWS

```css
/* Card Shadow */
--shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
--shadow-card-hover: 0 8px 30px rgba(0, 0, 0, 0.12);

/* Elevated Elements */
--shadow-elevated: 0 20px 50px rgba(0, 0, 0, 0.15);

/* Text Shadows */
/* Hero title */
text-shadow: 0 2px 20px rgba(0,0,0,0.3);
/* Hero subtitle */
text-shadow: 0 1px 10px rgba(0,0,0,0.3);
/* Tournament title */
text-shadow: 0 2px 10px rgba(0,0,0,0.2);
```

---

## 9. ANIMATIONS & TRANSITIONS

### Default Transitions
```css
a, button {
  transition: all 0.2s ease;
}
```

### Card Hover
```css
.pillar-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

### Jass Card Hover
```css
.jass-card {
  transition: transform 0.4s ease;
}
```

### Framer Motion Animations
- **Hero title**: Fade in + slide up (0.8s duration)
- **Hero subtitle**: Fade in + slide up (0.8s duration, 0.15s delay)
- **CTA Button**: Fade in + slide up (0.8s duration, 0.3s delay)
- **Jass Cards**: Fade in + slide up + rotate (0.8s duration, staggered by 0.12s)
- **Pillar Cards**: Fade in + slide up (0.5s duration, staggered by 0.1s)

### Scroll Indicator
```css
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.scroll-indicator {
  animation: bounce-subtle 2s ease-in-out infinite;
}
```

---

## 10. RESPONSIVE BREAKPOINTS

Using Tailwind CSS default breakpoints:
```css
/* Mobile-first approach */
/* Default (< 640px) - Mobile */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
```

---

## 11. ACCESSIBILITY FEATURES

### Focus States
```css
:focus-visible {
  outline: 2px solid #E31E24;      /* var(--color-primary) */
  outline-offset: 2px;
}
```

### Selection
```css
::selection {
  background: #E31E24;             /* var(--color-primary) */
  color: white;
}
```

### Font Smoothing
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 12. KEY FINDINGS & POTENTIAL ISSUES

### ✅ Font Loading
**Status**: **WORKING CORRECTLY**
- Capita WOFF2 files are present and correctly configured
- Inter loaded from Google Fonts
- Proper fallbacks defined (Georgia for Capita, system-ui for Inter)

### ⚠️ Background Textures - File Extension Mismatch
**Issue Found**:
- `globals.css` references: `url('/images/backgrounds/felt-texture.jpg')`
- Actual file: `felt-texture.png` (PNG, not JPG)
- **Impact**: CSS references `.jpg` but file is `.png` - potential loading failure

**Recommendation**: Update `globals.css` line 141 to:
```css
background-image: url('/images/backgrounds/felt-texture.png');
```

✅ **Tournament.tsx component already uses correct `.png` extension**

### ⚠️ Missing Pillar Card Images
**Issue**: Three decorative card images referenced in Pillars component don't exist:
- `rosen-under.png`
- `schilten-bauer.png`
- `eichel-ass.png`

**Current Behavior**: Component will show empty decorative space (opacity 10%, so not very noticeable)

**Recommendation**: Either:
1. Create these images from existing card assets
2. Use existing cards as alternatives
3. Remove decorative card images from design

### ✅ All Other Assets Present
- Wood texture: ✅
- Hero Jass cards: ✅ (all 4 cards present)
- Font files: ✅ (all WOFF2 files present)

---

## 13. DESIGN SYSTEM SUMMARY

### Typography Hierarchy
1. **Hero H1**: 48-96px, Capita Bold, White
2. **Section H2**: 30-48px, Capita Bold, Dark Gray
3. **Card H3**: 20-24px, Capita Bold, Dark Gray
4. **Body Text**: 14-16px, Inter Regular, Muted Gray
5. **Buttons**: 16-18px, Capita Semibold, White (primary) or Dark (secondary)

### Color Philosophy
- **Swiss Heritage**: Red (#E31E24), Wood browns, Felt green
- **Authentic Materials**: Textures over flat colors
- **Warm & Approachable**: Cream backgrounds, soft shadows

### Visual Style
- **Playful Traditional**: Animated Jass cards meet modern web design
- **Tactile**: Wood and felt textures create physical connection
- **Clean & Modern**: Despite traditional elements, layout is contemporary
- **Interactive**: Hover states, animations, and motion bring energy

---

## 14. TECHNICAL IMPLEMENTATION

### Framework
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **next-intl** (i18n)

### Font Loading Strategy
- **Next.js `localFont`** for Capita (optimized loading)
- **Next.js Google Fonts** for Inter (automatic optimization)
- **`display: "swap"`** to prevent FOIT (Flash of Invisible Text)

### Image Optimization
- **Next.js Image component** for all images
- Responsive sizes defined
- Lazy loading enabled
- Error boundaries for missing images

---

## RECOMMENDED FIXES

### Priority 1 (Critical)
1. ✅ Already fixed in Tournament.tsx, but update `globals.css` line 141:
   ```css
   background-image: url('/images/backgrounds/felt-texture.png');
   ```

### Priority 2 (Nice to Have)
2. Add missing pillar decorative card images or use alternatives:
   - Use `rosen-koenig.png` instead of `rosen-under.png`
   - Create or find `schilten-bauer.png` and `eichel-ass.png`
   - Or remove decorative images entirely (they're subtle anyway)

---

**Report Generated By**: Code Analysis Tool  
**Analysis Date**: February 22, 2026  
**Codebase Version**: Current Git HEAD
