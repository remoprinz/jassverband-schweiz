# Website Visual Inspection Checklist

Use this checklist when manually inspecting https://jassverband-schweiz.vercel.app/de

---

## ✅ FONTS TO VERIFY

### Open DevTools (F12) and inspect:

#### Hero Section (Top)
- [ ] **Hero Title** "Jassverband Schweiz - Tradition, Jugend, Zukunft"
  - Expected: `font-family: Capita, Georgia, serif`
  - Expected: `font-weight: 700`
  - Expected: `color: white`
  - If shows Georgia → Capita not loading

- [ ] **Hero Subtitle** 
  - Expected: `font-family: Inter, system-ui, sans-serif`
  - Expected: `color: rgba(255, 255, 255, 0.9)`
  - If shows system-ui → Inter not loading

#### Pillar Cards Section
- [ ] **Section Title** "Unsere drei Säulen"
  - Expected: `font-family: Capita, Georgia, serif`
  - Expected: `font-weight: 700`

- [ ] **Card Titles** (Tradition, Jugend, Zukunft)
  - Expected: `font-family: Capita, Georgia, serif`
  - Expected: `font-weight: 700`

- [ ] **Card Body Text**
  - Expected: `font-family: Inter, system-ui, sans-serif`
  - Expected: `font-weight: 400`
  - Expected: `color: #6B6B6B` (muted gray)

---

## 🎨 VISUAL ELEMENTS TO CHECK

### Hero Section
- [ ] **Wood texture background** visible behind content
  - Should see wood grain pattern
  - Warm brown color (#5D4037)
  
- [ ] **Four Jass playing cards** displayed in center
  - Card 1 (left): Schilten Under, rotated left (-15°)
  - Card 2: Schilten 10, slight left rotation (-5°)
  - Card 3: Rosen Ass, slight right rotation (8°)
  - Card 4 (right): Eichel Under, rotated right (18°)
  
- [ ] **Cards animate on page load**
  - Fade in from below
  - Rotate into position
  - Staggered timing (appear one after another)
  
- [ ] **Cards respond to hover**
  - Card lifts up when you hover over it
  - Straightens out (rotation becomes 0°)
  - Slight scale increase

- [ ] **Scroll indicator** at bottom
  - Down arrow
  - Gentle bounce animation

### Pillar Cards Section
- [ ] **Cream background** (#F5F1E8)
  - Warm, off-white color (not pure white)
  
- [ ] **Three cards** in a row (mobile: stacked)
  - Each card has white/cream background
  - Subtle shadow below cards
  - Icons at top (green color)
  
- [ ] **Cards respond to hover**
  - Card lifts up slightly
  - Shadow becomes more prominent

### Tournament Section
- [ ] **Felt green background** (#1B4D3E)
  - Should see felt texture pattern
  - Like a card table surface
  
- [ ] **White text** on dark green background
  - Title clearly readable
  - "2026" badge with red dot
  
- [ ] **Decorative card symbols**
  - Subtle spade (♠) symbol top-left
  - Subtle heart (♥) symbol bottom-right
  - Very faint, barely visible

---

## 🔍 DEVTOOLS INSPECTION GUIDE

### Check Computed Styles
1. Open DevTools (F12)
2. Click "Elements" tab
3. Click the selector tool (top-left of DevTools)
4. Click on any text element on the page
5. Look at "Computed" tab on right side
6. Find `font-family` - shows what font is actually being used

### Check Network Tab for Font Loading
1. Open DevTools (F12)
2. Click "Network" tab
3. Reload page (Cmd/Ctrl + R)
4. Filter by "Font" or type "woff2" in filter
5. Should see:
   - `Capita-Regular.woff2` - Status: 200
   - `Capita-Bold.woff2` - Status: 200
   - Inter fonts from Google

### Check for Image Loading Errors
1. Open DevTools (F12)
2. Click "Console" tab
3. Look for any 404 errors (red text)
4. Specifically check:
   - `/images/backgrounds/wood-texture.jpg` - Should load (617KB)
   - `/images/backgrounds/felt-texture.png` - Should load (4.3MB)
   - `/images/cards/*.png` - All should load

---

## 🐛 COMMON ISSUES TO LOOK FOR

### Font Issues
❌ **Problem**: Headings show "Georgia" instead of "Capita"
- **Cause**: Capita font files not loading
- **Check**: Network tab → look for failed .woff2 requests

❌ **Problem**: Body text shows "Arial" or other system font
- **Cause**: Inter not loading from Google Fonts
- **Check**: Network tab → look for Google Fonts API calls

### Image Issues
❌ **Problem**: Hero section has no wood texture, just solid brown
- **Cause**: wood-texture.jpg not loading
- **Check**: Console for 404 errors

❌ **Problem**: Tournament section has no felt texture, just solid green
- **Cause**: felt-texture.png not loading (WAS fixed - should work now)
- **Check**: Console for 404 errors

❌ **Problem**: No Jass cards visible in hero
- **Cause**: Card PNG files not loading
- **Check**: Console for 404 errors

### Layout Issues
❌ **Problem**: Cards not animating on page load
- **Cause**: Framer Motion not loading
- **Check**: Console for JavaScript errors

❌ **Problem**: Pillar cards all white, no hover effect
- **Cause**: CSS not loading properly
- **Check**: Refresh hard (Cmd/Ctrl + Shift + R)

---

## 📸 SCREENSHOT COMPARISON

Take screenshots of:
1. **Hero section** - Full width, cards visible
2. **Pillar cards** - All three cards in view
3. **Tournament section** - Full section with felt texture
4. **DevTools Computed tab** - Showing Capita font on a heading
5. **DevTools Network tab** - Showing successful font loads

Compare with expected design specs in `DESIGN_SPECIFICATION_REPORT.md`

---

## ✅ EXPECTED RESULTS (All Good)

When everything is working:
- ✅ Headlines look like **traditional serif font** (Capita)
- ✅ Body text looks **modern and clean** (Inter)
- ✅ Hero has **visible wood grain texture**
- ✅ Four Jass cards **animate and respond to hover**
- ✅ Pillar cards have **cream background** and **lift on hover**
- ✅ Tournament section has **visible felt texture** like a card table
- ✅ No 404 errors in Console
- ✅ All fonts load with 200 status in Network tab

---

## 🚨 WHAT TO REPORT

If you find issues, note:
1. **What element** has the problem
2. **What you see** vs. what should be there
3. **Any console errors** (copy exact error message)
4. **Which font is actually rendering** (from Computed tab)
5. **Screenshot** of the issue

---

**After completing this checklist**, you'll have a complete understanding of:
- Which fonts are loading correctly
- Which visual assets are displaying
- Any layout or styling issues
- Performance issues (if any)
