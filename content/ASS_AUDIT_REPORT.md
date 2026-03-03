# ASS CONTENT — AUDIT REPORT
**Datum:** 2026-03-03  
**Audit durch:** Ass (Content Agent)  
**Geprüft:** Arbeit von Stich (Frontend Agent)  

---

## 🔴 KRITISCHE FEHLER

### 1. Navigation komplett kaputt
**Problem:** Header.tsx verwendet alte Keys (`verband`, `projekte`, `partner`), aber de.json hat neue Keys (`mitmachen`, `schweizermeisterschaft`, `plattformen`, `leitbild`).

**Auswirkung:** Navigation zeigt nur Home, News, Kontakt — alle neuen Links fehlen!

**Fix:** Header.tsx Interface + navItems updaten.

---

### 2. Statistik-Teaser Section — Schwach & Kindisch
**Probleme:**
- ❌ Zu viel Text, zu wenig visuell
- ❌ Emoji-Pfeile wirken "kindisch"
- ❌ Keine Verlinkung auf PDFs (Jass-Elo Ranking.pdf, Whitepaper)
- ❌ "Von Just Egg bis zum Göpf Egg" — wtf? Typo!
- ❌ "Statitiken lügen selten" — Typo + unlogisch (was heisst das?)

**Fix:** Komplette Überarbeitung:
- Kürzer, klarer, kraftvoller
- PDF-Links prominent
- Visuelle Icons statt Emoji-Pfeile
- Call-to-Action auf `/statistiken` (Coming Soon)

---

### 3. FAQ-Antworten — Geschwurbel & Unlogisch

**FAQ 1: "Weshalb braucht es den Jassverband?"**

❌ **Problem:** "Jassen wird regional unterschiedlich gespielt" → **FALSCH!** Die Grundregeln sind einheitlich. Es gibt Varianten, aber keine regionale Uneinigkeit.

❌ **Problem:** "Wir stellen die offiziellen Regeln kostenlos zur Verfügung und sorgen für Klarheit" → **Was hat das eine mit dem anderen zu tun?**

✅ **Fix:** Aussage korrigieren — nicht "regional unterschiedlich", sondern "verstreutes Wissen".

---

**FAQ 3: "Für wen ist der Verband da?"**

❌ **Problem:** "Göpf trainiert dich — kostenlos und geduldig" → **LINK FEHLT!** Wo ist Göpf?

✅ **Fix:** Link zu https://jassguru.ch/training (Coming Soon-Hinweis)

---

**FAQ 6: "Ich kann noch nicht jassen — wo fange ich an?"**

❌ **Problem:** "JassWiki erklärt dir alles. → jasswiki.ch" → **KEIN LINK!** Nur Text.

✅ **Fix:** Richtige HTML-Links (oder Markdown-Format für Rendering).

---

**FAQ 7: "Wo finde ich die offiziellen Regeln?"**

❌ **Problem:** "→ jasswiki.ch" → **KEIN LINK!**

✅ **Fix:** Link zu https://jasswiki.ch

---

### 4. Design-System-Verstösse

**Problem:** Backgrounds nicht abwechselnd.

**Aktuelle Reihenfolge:**
1. Hero — **cream** (Hero hat custom bg)
2. Vision — **white**
3. StatistikTeaser — **cream** ❌ (2x cream in Folge!)
4. Mission — **white**
5. Tournament — **chalk**
6. SystemrelevanzVideo — **white**
7. Ecosystem — **cream**
8. HomeFaq — **white**
9. Trust — **cream**

**Fix:** Backgrounds müssen abwechseln: cream → chalk → table → cream → chalk → table

---

### 5. Button-Breite unterschiedlich

**Problem:** Statistik-Teaser CTA-Buttons haben unterschiedliche Breiten.

**Fix:** Einheitliche Button-Styles (Design-System-konform).

---

## 📝 CONTENT-FIXES

### Statistik-Teaser (KOMPLETT NEU):

```json
"statistikTeaser": {
  "title": "Jede Partie zählt. Jeder Fortschritt ist messbar.",
  "subtitle": "Das erste nationale Elo-System für Schieber — präzise, fair, transparent.",
  "intro": "Wer ist dein bester Partner? Gegen wen gewinnst du am häufigsten? Wie hat sich dein Spiel über die Saison entwickelt?",
  "copy": "Mit dem Jass-Elo-System wird jede Partie erfasst und ausgewertet. Spielstärke von Partner und Gegner, Punkteverlauf, Matsch-Quote — alles fliesst in deine persönliche Statistik ein.",
  "cta1": "Ranking-System verstehen",
  "cta1Link": "/de/statistiken",
  "cta2": "Jass-Profil anlegen",
  "cta2Link": "/de/mitmachen",
  "pdfTitle": "Technische Dokumentation",
  "pdfLink1Label": "Jass-Elo Ranking (PDF)",
  "pdfLink1Url": "/Jass-Elo Ranking.pdf",
  "pdfLink2Label": "Whitepaper: Elo-System für Schieber (PDF)",
  "pdfLink2Url": "/Jass-Elo_ Ein Elo-basiertes Bewertungssystem für den Schieber.pdf"
}
```

---

### FAQ-Fixes:

**FAQ 1 — NEU:**
```
**1. Standards & Wissen** — Regelwissen ist verstreut. Wir stellen die offiziellen Regeln kostenlos, strukturiert und durchsuchbar zur Verfügung.
```

**FAQ 3, 6, 7 — Links ergänzen:**
```
Schritt 1: Die Regeln verstehen — <a href="https://jasswiki.ch" target="_blank">JassWiki</a> erklärt dir alles.
```

---

## 🎯 NÄCHSTE SCHRITTE

1. **Stich:** Header.tsx fixen (Navigation)
2. **Stich:** Statistik-Teaser komplett neu bauen (nach neuem Content)
3. **Stich:** FAQ-Links richtig rendern (HTML oder Markdown)
4. **Stich:** Backgrounds abwechselnd (cream/chalk/table)
5. **Stich:** Button-Breiten einheitlich
6. **Ass:** FR/IT-Übersetzungen (nach Freigabe DE)

---

**Status:** ⏳ Warte auf User-Freigabe für Content-Updates.
