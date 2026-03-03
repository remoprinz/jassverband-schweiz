# ASS CONTENT — KORREKTUR COMPLETE

**Datum:** 2026-03-03 02:13 Uhr  
**Agent:** Ass (Content Creator)  
**Status:** ✅ Content korrigiert, bereit für Stich

---

## ✅ DURCHGEFÜHRTE CONTENT-KORREKTUREN

### 1. **statistikTeaser** — KOMPLETT ÜBERARBEITET

**ALT:**
- ❌ "Verfolge deine Entwicklung"
- ❌ "Von Just Egg bis zum Göpf Egg" (Typo!)
- ❌ "Statitiken lügen selten" (Typo + unlogisch)
- ❌ Zu viel Text, Emoji-Pfeile kindisch
- ❌ Keine PDF-Links

**NEU:**
- ✅ "Jede Partie zählt. Jeder Fortschritt ist messbar."
- ✅ Klarer Fokus auf Elo-System
- ✅ Strukturierte Fragen: "Wer ist dein bester Partner? Gegen wen gewinnst du am häufigsten?"
- ✅ PDF-Links prominent: 
  - `/Jass-Elo Ranking.pdf`
  - `/Jass-Elo_ Ein Elo-basiertes Bewertungssystem für den Schieber.pdf`
- ✅ 2 CTAs mit expliziten Links:
  - `cta1`: "Ranking-System verstehen" → `/de/statistiken`
  - `cta2`: "Jass-Profil anlegen" → `/de/mitmachen`

---

### 2. **homeFaq** — LOGIK & LINKS KORRIGIERT

#### FAQ 1: "Weshalb braucht es den Jassverband?"

**ALT:**
❌ "Jassen wird regional unterschiedlich gespielt" — **FALSCH!**

**NEU:**
✅ "Regelwissen ist über hunderte Webseiten und Stammtische verstreut"

**Begründung:** Die Grundregeln sind einheitlich. Das Problem ist **verstreutes Wissen**, nicht regionale Unterschiede.

---

#### FAQ 3: "Für wen ist der Verband da?"

**NEU:**
- ✅ Explizite `links`-Felder hinzugefügt:
  - `{"text": "JassWiki", "url": "https://jasswiki.ch"}`
  - `{"text": "Jasstrainer Göpf", "url": "https://jassguru.ch/training"}`

---

#### FAQ 6: "Ich kann noch nicht jassen – wo fange ich an?"

**NEU:**
- ✅ Links hinzugefügt (JassWiki, Göpf)
- ✅ "→ jasswiki.ch" entfernt (war nur Text, kein Link)

---

#### FAQ 7: "Wo finde ich die offiziellen Regeln?"

**NEU:**
- ✅ Link hinzugefügt: `{"text": "Zu den Regeln auf JassWiki", "url": "https://jasswiki.ch"}`
- ✅ "→ jasswiki.ch" entfernt

---

## 📋 OFFENE TASKS FÜR STICH

### KRITISCH (sofort):

1. **Header.tsx Navigation fixen:**
   - Interface updaten: `verband` → `leitbild`, `projekte` → `plattformen`, `partner` → `mitmachen`, + `schweizermeisterschaft`
   - `navItems` Array komplett neu aufbauen

2. **StatistikTeaser.tsx komplett neu bauen:**
   - Neues Content-Objekt nutzen (mit `intro`, `pdfTitle`, `pdfLink1Label`, etc.)
   - PDFs prominent verlinken
   - Keine Emoji-Pfeile mehr!
   - Icons oder visuelle Grafik statt Text-Wüste

3. **HomeFaq.tsx Links rendern:**
   - `links`-Array aus FAQ-Items auslesen
   - Als richtige `<a>`-Tags mit `target="_blank"` rendern

4. **Backgrounds abwechselnd:**
   - Hero: custom
   - Vision: white
   - StatistikTeaser: **chalk** (nicht cream!)
   - Mission: **table**
   - Tournament: **cream**
   - SystemrelevanzVideo: **chalk**
   - Ecosystem: **white**
   - HomeFaq: **chalk**
   - Trust: **cream**

5. **Button-Breiten einheitlich:**
   - Beide CTAs in StatistikTeaser: gleiche Breite
   - Design-System-konforme Styles

---

## 🚀 NEXT: STICH ÜBERNIMMT

Übergebe an @jassverband-schweiz/.cursor/agents/stich-frontend.md mit diesem Report.

**Alle Content-Fixes sind in de.json abgelegt.**  
**FR/IT warte ich ab bis DE-Freigabe erfolgt.**

---

**Ass out.** ✅
