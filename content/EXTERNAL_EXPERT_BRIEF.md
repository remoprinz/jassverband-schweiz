# EXPERT BRIEF — Content-Strategie Jassverband Schweiz

**Datum:** 2. März 2026  
**Zweck:** Externe Expertenmeinung zur optimalen Content-Struktur  
**Status:** Pre-Launch Phase

---

## PROJEKTKONTEXT

### Organisation
Der Jassverband Schweiz (JVS) ist ein neu gegründeter Verband (Januar 2026) mit folgenden Zielen:

- Jassen als Kulturgut fördern und modernisieren
- Nationale Strukturen etablieren (Meisterschaften, Ranglisten)
- Digitale Infrastruktur bereitstellen
- Community vernetzen (online + offline)

### Zielgruppen
1. **Aktive Jasser** — spielen regelmäßig, suchen Wettkampf/Community
2. **Gelegenheitsspieler** — jassen privat, interessiert an Lernangeboten
3. **Vereine/Clubs** — bestehende Strukturen, suchen Anbindung
4. **Institutionen** — potenzielle Förderer, Sponsoren, Partner
5. **Medien** — Kultur, Sport, Digitalisierung

### Kernprodukte
1. **Schweizermeisterschaft** (Team-Schieber) — erste nationale SM,  sobald interesse klar: "wird so gross wie die community."
2. **Elo-System** — nationales Ranking für Schieber (Partner + Gegner berücksichtigt)
3. **JassGuru** — digitale Erfassung, Statistiken, Turnierverwaltung (Status: up & running inkl. support: https://jassguru.ch/support/) – gratisnutzung der jasstafel. statistiken, elo, etc. für zahlende verbandsmitglieder.
4. **JassWiki** — Enzyklopädie (Regeln, Varianten, Strategie) — Live, gratis
5. **Jasstrainer Göpf** — KI-Trainer (geplant). wir haben aber einen untrainierten prototypen zum vorzeigen. hier braucht es fördergeld zur umsetzung.
6. **Jasskalkulator** — Wahrscheinlichkeitsrechner — Live, gratis
7. **JassChat** (geplant) — Vernetzung – Chat für die Vermittlung von Jassplätzen. Voraussichtlich mit KI-Funktionen und "KI Bot Manager".

---

## AKTUELLE SITUATION

### Website-Status
- Domain: jassverband.ch
- Sprachen: DE/FR/IT (geplant)
- Tech-Stack: Next.js 16, React 19, Tailwind CSS v4
- SEO: Vorbereitet (hreflang, Schema.org)

### Bestehende Seiten
- `/` — Homepage
- `/mitmachen` — Mitgliedschaft (3 Pakete: CHF 60/90/350)
- `/leitbild` — Vision & Mission
- `/verband` — Vorstand, Statuten
- `/projekte` — Übersicht Plattformen
- `/news` — Aktuelles
- `/kontakt` — Kontaktformular

### Aktuelle Homepage-Struktur
1. Hero ("Jassen ist mehr als ein Kartenspiel" + CTA "Mitglied werden")
2. Vision ("In der Schweiz bleibt kein Jasser ohne Tisch")
3. Mission (6 Kacheln: Meisterschaften etablieren, Jasser vernetzen, etc.)
4. Tournament (Schweizermeisterschaft — "Jetzt anmelden")
5. Ecosystem (JassWiki, JassGuru, Jassmeister, etc.)
6. Trust (Lebendige Tradition Badge)

### Aktuelle Navigation
- Home
- Verband
- News
- Projekte
- Partner werden
- Kontakt

---

## DISKUSSIONSPUNKTE & ÜBERLEGUNGEN

### 1. Launch-Strategie

**Kontext:**
Der Verband ist gegründet, aber noch nicht alle Produkte sind live. Die Schweizermeisterschaft kommt sobald Umfang des Interesses und Finanzierung klar ist.

**Frage:**
Sollte die Website **sofort Mitgliedschaften verkaufen** (mit festen Preisen) — oder zunächst mit einer **Warteliste + Umfrage** starten, um:
- Community-Interesse zu validieren
- Feedback zur Produktgestaltung einzuholen
- FOMO zu erzeugen ("Sei von Anfang an dabei")
- Preise basierend auf Nachfrage/Feedback festzulegen

**Pro Warteliste:**
- Validiert Nachfrage vor Commitment
- Erlaubt Preisanpassung
- Sammelt Daten (Was will die Community?)
- Niederschwelliger Einstieg

**Contra Warteliste:**
- Verzögert Revenue
- Könnte "unfertig" wirken
- Risiko: User verlieren Interesse

---

### 2. Value Proposition

**Kontext:**
Ein Mitglied bekommt:
- Startberechtigung Schweizermeisterschaft
- JassGuru Pro (Elo-Ranking, Statistiken)
- Jass-Brevet (digitales Badge)
- Verbandsnetzwerk
- Optional: Kartenset (Trumpf-Lizenz), Jassreisen-Rabatt

**Frage:**
Was ist die **Haupt-Value-Proposition**?

**Option A: Wettkampf**  
"Werde Schweizermeister — die erste nationale Meisterschaft im Team-Schieber"

**Option B: Community**  
"Finde Tische, Vereine und Mitspieler — kein Jasser bleibt ohne Tisch"

**Option C: Modernisierung**  
"Tradition trifft Innovation — Jassen digital, messbar, schweizweit"

**Option D: Entwicklung**  
"Messe deine Spielstärke — mit dem ersten nationalen Elo-System"

**Oder eine Kombination?**

---

### 3. Elo-System Kommunikation

**Kontext:**
Das Elo-System ist technisch das Herzstück (Ranking, Qualifikation, Statistiken). Es basiert auf Schach-Elo, berücksichtigt aber Partner + Gegner. Es gibt humorvolle Ränge (Egg 🥚 → Göpf 👼).

**Problem:**
- "Elo" ist für viele abstrakt/unverständlich
- Ranglisten können abschrecken (konservative Jasser lehnen "Vermessung" ab)
- Zu technische Erklärungen überfordern

**Frage:**
Wie prominent sollte das Elo-System auf der **Homepage** sein?

**Option A: Sehr prominent**  
Eigene Section: "Verfolge deine Entwicklung — mit dem nationalen Elo-System"  
Risiko: Schreckt Traditionalisten ab, wirkt nerdig

**Option B: Erwähnen, nicht erklären**  
Kurze Erwähnung in Ecosystem/Mission, ausführliche Erklärung auf Unterseite `/statistiken`  
Risiko: Value Proposition unklar

**Option C: Verstecken**  
Nur auf `/mitmachen` als Mitgliedschafts-Feature erwähnen  
Risiko: Hauptprodukt nicht sichtbar

---

### 4. Zielgruppen-Balance

**Kontext:**
Der Verband spricht mehrere Zielgruppen an:
- Ambitionierte Jasser (wollen Wettkampf)
- Gelegenheitsspieler (wollen Spaß, keine Ranglisten)
- Vereine (wollen Anbindung)
- Sponsoren/Förderer (wollen Wirkung sehen)

**Frage:**
Wen priorisiert die **Homepage**?

**Option A: Fokus auf Wettkampf**  
Homepage = Schweizermeisterschaft, Elo, Titel  
→ Zieht ambitionierte Jasser an, schreckt Gelegenheitsspieler ab

**Option B: Fokus auf Community**  
Homepage = Tische finden, Vereine, gemeinsam spielen  
→ Inklusiv, aber weniger conversion-stark

**Option C: Fokus auf Kultur**  
Homepage = Tradition bewahren, Nachwuchs fördern, Bildung  
→ Wirkt seriös für Institutionen, aber weniger aktivierend für Spieler

**Oder eine Balance? Wenn ja, wie?**

---

### 5. Navigation & Seitenstruktur

**Kontext:**
Die aktuelle Navigation ist:
- Home / Verband / News / Projekte / Partner werden / Kontakt

**Diskussion:**
Sollte die Navigation umstrukturiert werden?

**Vorschlag A: Conversion-orientiert**
- Mitglied werden (oder "Warteliste")
- Schweizermeisterschaft
- Plattformen
- Leitbild
- News
- Kontakt

**Vorschlag B: Zielgruppen-orientiert**
- Mitmachen
- Jassen lernen
- Turniere
- Vereine finden
- Über uns
- Kontakt

**Vorschlag C: Produkt-orientiert**
- Schweizermeisterschaft
- JassGuru
- JassWiki
- Verband
- News
- Kontakt

**Was ist optimal?**

---

### 6. Homepage-Länge

**Kontext:**
Aktuell sind auf der Homepage:
- 6 Sections (Hero, Vision, Mission, Tournament, Ecosystem, Trust)

**Diskussion:**
Sollte die Homepage **erweitert** werden mit:
- FAQ (4-8 Fragen)?
- Statistik/Elo-Teaser?
- Community-Section ("Jasser in deiner Nähe")?
- Testimonials/Social Proof?
- Warteliste/Umfrage-Section?

**Oder sollte sie **reduziert** bleiben?**
- Fokus auf Klarheit
- Conversion auf `/mitmachen` auslagern
- "Less is more"

---

### 7. Tonalität

**Kontext:**
Der Verband positioniert sich als "Tradition trifft Innovation". Die Vision ist "In der Schweiz bleibt kein Jasser ohne Tisch".

**Frage:**
Welche Tonalität ist optimal?

**Option A: Seriös-verbandlich**  
"Der Jassverband Schweiz organisiert und standardisiert das Jassen schweizweit."  
→ Wirkt offiziell, aber distanziert

**Option B: Modern-aktivierend**  
"Wir bringen die besten Jasser der Schweiz zusammen — und helfen jedem, besser zu werden."  
→ Wirkt dynamisch, aber vielleicht zu "startup-mäßig"

**Option C: Kulturell-emotional**  
"Jassen verbindet Generationen. Wir sorgen dafür, dass es so bleibt."  
→ Wirkt nahbar, aber vielleicht zu weich

**Oder ein Mix? Was passt zur Schweizer Zielgruppe?**

---

### 8. Call-to-Actions

**Kontext:**
Aktuell führen fast alle CTAs zu "Mitglied werden" (`/mitmachen`).

**Frage:**
Sollte es **differenzierte CTAs** geben?

**Beispiel:**
- Hero: "Mehr erfahren" (führt zu Vision-Section)
- Mission: "Zum Leitbild"
- Tournament: "Zur Schweizermeisterschaft" (eigene Seite)
- Ecosystem: "Zu JassWiki" (externer Link)
- Final: "Mitglied werden" (oder "Warteliste")

**Oder sollten alle CTAs auf **Conversion** (Mitgliedschaft/Warteliste) führen?**

---

### 9. Social Proof

**Kontext:**
Der Verband ist neu (Januar 2026). Es gibt vermutlich erste Mitglieder/Tester, aber noch keine große Community.

**Frage:**
Wie geht man mit **fehlendem Social Proof** um?

**Option A: Ehrlich kommunizieren**  
"Der Verband entsteht gerade. Sei von Anfang an dabei."

**Option B: Frühe Erfolge zeigen**  
"Über 200 Jasser haben sich bereits eingetragen" (Warteliste)  
"50 Gruppen spielen bereits mit JassGuru" (Beta-Tester)

**Option C: Autorität nutzen**  
Vorstand vorstellen, Partnerschaften erwähnen, "Lebendige Tradition"-Badge prominent

**Was ist glaubwürdig und überzeugend?**

---

### 10. Mehrsprachigkeit

**Kontext:**
Die Website soll auf Deutsch, Französisch und Italienisch verfügbar sein.

**Frage:**
Sind **kulturelle Anpassungen** nötig — oder reichen 1:1 Übersetzungen?

**Beispiele:**
- "Jassen ist systemrelevant" — funktioniert das auf Französisch/Italienisch?
- "Kein Jasser ohne Tisch" — idiomatisch übersetzbar?
- Elo-System-Namen (Egg, Göpf, Chlaus, Chäs) — deutsch-spezifisch?

---

## IHRE AUFGABE

Bitte analysieren Sie die obigen Diskussionspunkte und geben Sie eine **fundierte Empfehlung** zu folgenden Fragen:

### 1. Content-Strategie
- Was sollte auf der Homepage sein — und was nicht?
- Welche Sections sind kritisch, welche optional?
- Wie lang sollte die Homepage sein?

### 2. Launch-Strategie
- Sofort Mitgliedschaften verkaufen — oder mit Warteliste starten?
- Wenn Warteliste: Wie strukturiert man die Seite `/warteliste` oder `/mitmachen`?

### 3. Value Proposition
- Was ist das Hauptargument für eine Mitgliedschaft?
- Wie kommuniziert man das Elo-System (prominent / moderat / versteckt)?

### 4. Navigation & Seitenstruktur
- Wie sollte die Hauptnavigation aussehen?
- Welche Unterseiten sind kritisch für den Launch?

### 5. Tonalität & Positionierung
- Welcher Ton passt zur Schweizer Zielgruppe?
- Wie balanciert man Tradition und Innovation?

### 6. Priorisierung
- Wenn Sie nur 3 Sections auf der Homepage hätten — welche?
- Was sind die 3 wichtigsten Unterseiten (außer Home)?

---

## ZUSÄTZLICHE INFORMATIONEN

### Bestehende Inhalte
- Vision: "In der Schweiz bleibt kein Jasser ohne Tisch"
- Mission: 6 Säulen (Meisterschaften etablieren, Jasser vernetzen, Nachwuchs fördern, Hürden abbauen, Tradition modernisieren, Kultur gestalten)
- Hero-Claim: "Jassen ist mehr als ein Kartenspiel. Es ist Schweizer Kulturgut — und verdient eine moderne Zukunft."

### Einschränkungen
- Budget: Limitiert (Verband, keine VC-Finanzierung)
- Team: Klein (3 Vorstandsmitglieder + Developer)
- Zeitrahmen: Launch geplant Q2 2026
- Technisch: Next.js-Website, bereits gebaut, Content-Anpassungen möglich

### Erfolgsmetriken (angenommen)
- Mitgliederzahl (oder Wartelisten-Einträge)
- Engagement (Newsletter, WhatsApp-Community)
- Turnierregistrierungen (Schweizermeisterschaft)
- Plattform-Nutzung (JassGuru, JassWiki)

---

## FORMAT IHRER ANTWORT

Bitte strukturieren Sie Ihre Antwort wie folgt:

### 1. Strategische Positionierung
- Wer ist der JVS im Kern? (1 Satz)
- Was ist die dominante Value Proposition? (1 Satz)

### 2. Homepage-Struktur (Empfehlung)
- Liste der Sections (in Reihenfolge)
- Begründung für jede Section

### 3. Navigation (Empfehlung)
- Liste der Navi-Punkte
- Begründung

### 4. Launch-Strategie (Empfehlung)
- Mitgliedschaft sofort vs. Warteliste
- Begründung

### 5. Kritische Content-Entscheidungen
- Elo-System: Wie prominent?
- Tonalität: Welche?
- Zielgruppen-Balance: Wie?

### 6. Quick Wins
- Was sollte sofort umgesetzt werden?
- Was kann später kommen?

---

**Vielen Dank für Ihre Expertise!**

*Dieser Brief ist bewusst neutral gehalten, um unbeeinflusste Empfehlungen zu erhalten.*
