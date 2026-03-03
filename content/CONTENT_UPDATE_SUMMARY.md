# contentDE.md — Update Summary

> **WICHTIG:** contentDE.md wurde aktualisiert basierend auf CONTENT_STRUCTURE.md (Version 2.0)
> **Stand:** 2. März 2026
> **Backup:** contentDE.md.backup (alte Version)

---

## ✅ Was wurde aktualisiert:

### 1. Core Identity (Zeilen 9-22)
- ✅ Vision: "In der Schweiz bleibt kein Jasser ohne Tisch"
- ✅ Mission: "Wir organisieren, standardisieren und fördern das Jassen schweizweit"
- ✅ Sekundär-Ziel hinzugefügt: "Hürden fürs Lernen senken"

### 2. Navigation (muss noch implementiert werden)
**NEUE Struktur:**
1. Mitglied werden
2. Schweizermeisterschaft
3. Plattformen
4. Leitbild
5. News
6. Kontakt

**ALT → NEU Mappings:**
- `/verband` → `/leitbild` (mit 301 Redirect)
- `/projekte` → `/plattformen` (mit 301 Redirect)
- `/partner` → `/kontakt#partner` (Section statt eigene Seite)

### 3. Neue Homepage-Sections (müssen ergänzt werden)

#### Section 3: Statistik-Teaser (NEU)
**Titel:** Verfolge deine Entwicklung
**Subtitle:** Mit dem ersten nationalen Ranking-System für Schieber.
**Copy:** Siehe faqDE.md oder CONTENT_STRUCTURE.md
**Position:** Nach Vision, vor Mission

#### Section 7: Jass-Profil (NEU)
**Titel:** Dein Jass-Profil — erfasst, ausgewertet, verstanden
**3 Karten:** Entwicklung, Statistiken, Schweizermeister
**Position:** Nach SystemrelevanzVideo

#### Section 8: Tools (NEU)
**Titel:** Werkzeuge für alle Jasser
**3 Karten:** JassWiki, Jasstrainer Göpf, Jasskalkulator
**Position:** Nach Jass-Profil

#### Section 9: Community (NEU)
**Titel:** Jasser in deiner Nähe
**Content:** WhatsApp-Community + Coming Soon (Tisch-Finder etc.)
**Position:** Nach Tools

#### Section 10: FAQ (NEU)
**Titel:** Häufige Fragen
**8 Fragen:** Siehe faqDE.md
**Position:** Nach Community

### 4. Neue Unterseiten (müssen erstellt werden)

#### `/schweizermeisterschaft` (NEU)
- Hero: "Die erste Team-Schieber Schweizermeisterschaft"
- Sections: Format, So funktioniert's, Anmelden, FAQ
- CTA: Team anmelden → `/mitmachen#gruppen-lizenz`

#### `/plattformen` (NEU, ersetzt `/projekte`)
- Hero: "Unsere Plattformen"
- 2 Sections: Für Mitglieder (JassGuru Pro, Jassmeister) + Für alle (JassWiki, Göpf, Kalkulator)

#### `/statistiken` (NEU)
- Hero: "Das Ranking-System"
- Sections: Was ist Elo?, Wie funktioniert Jass-Elo?, Die Ränge, Wie steige ich auf?, FAQ

### 5. Aktualisierte Seiten

#### `/mitmachen` (Ergänzungen)
**NEUE Section:** "Was du bekommst" (VOR den Paketen)
- 3 Benefit-Blöcke: Jass-Profil, Startberechtigung, Premium-Extras

**NEUE FAQ:**
- "Ich jasse lieber mit Kreide und Tafel. Muss ich eine App nutzen?"
- Antwort siehe faqDE.md

#### `/leitbild` (ersetzt `/verband`)
**NEUE Sections:**
- Vorstand (von /verband übernommen)
- Werte (Respekt, Fairplay, Integrität, Inklusion)
- Statuten (Link zum PDF)

#### `/kontakt` (Ergänzung)
**NEUE Section:** Partner werden
- Warum Jassen fördern?
- Kontaktaufnahme
- Sponsoring-Broschüre (Link zum PDF)

### 6. Footer (Ergänzungen)
**NEUE Links:**
- Über den Verband → `/leitbild`
- Vorstand → `/leitbild#vorstand`
- Statuten → `/leitbild#statuten`
- Werte → `/leitbild#werte`

### 7. SystemrelevanzVideo-Section
**NEUER Titel:** Weshalb braucht es den Jassverband?
(vorher: "Warum Mitglied werden")

---

## 📋 Nächste Schritte für Frontend-Team:

### Phase 1: Navigation umbauen
- [ ] Neue Navigation-Items in de.json eintragen
- [ ] Routes erstellen (`/schweizermeisterschaft`, `/plattformen`, `/statistiken`)
- [ ] Redirects einrichten (`/verband` → `/leitbild`, `/projekte` → `/plattformen`)

### Phase 2: Neue Homepage-Sections bauen
- [ ] Statistik-Teaser Section
- [ ] Jass-Profil Section (3 Karten)
- [ ] Tools Section (3 Karten)
- [ ] Community Section (WhatsApp + Coming Soon)
- [ ] FAQ Section (8 Fragen, Accordion)

### Phase 3: Neue Unterseiten erstellen
- [ ] `/schweizermeisterschaft`
- [ ] `/plattformen`
- [ ] `/statistiken`

### Phase 4: Bestehende Seiten anpassen
- [ ] `/mitmachen` (Benefits-Section, neue FAQ)
- [ ] `/leitbild` (Vorstand, Werte integrieren)
- [ ] `/kontakt` (Partner-Section)

### Phase 5: Footer erweitern
- [ ] Neue Footer-Links hinzufügen

---

## 📂 Referenz-Dateien:

- **CONTENT_STRUCTURE.md** — Master-Dokument für alle Strukturen
- **faqDE.md** — 8 Homepage-FAQs ausformuliert
- **STATUS_RELAUNCH.md** — Übersicht & Roadmap
- **contentDE.md** — Dieses Dokument (aktualisierte Version)
- **contentDE.md.backup** — Alte Version (24. Februar 2026)

---

## 🎯 Wichtigste Content-Änderungen (Quick Reference):

| Element | ALT | NEU |
|---------|-----|-----|
| Vision | "Jeder lernt jassen" | "Kein Jasser ohne Tisch" |
| Mission | "Demokratisieren" | "Organisieren, standardisieren, fördern" |
| Navi 1 | Home | Mitglied werden |
| Navi 2 | Verband | Schweizermeisterschaft |
| Navi 3 | News | Plattformen |
| Navi 4 | Projekte | Leitbild |
| Video-Titel | "Warum Mitglied werden" | "Weshalb braucht es den Jassverband?" |

---

*Für vollständige Texte siehe CONTENT_STRUCTURE.md und faqDE.md*
