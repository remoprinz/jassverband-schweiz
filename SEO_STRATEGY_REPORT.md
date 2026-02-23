# Jassverband Schweiz – SEO & GEO Strategie

> **Status:** Draft / Proposal
> **Ziel:** Best-in-Class Sichtbarkeit ohne "Content-Flut"
> **Fokus:** Autorität, Struktur, Semantic Web

---

## 1. Status Quo Analyse

### Stärken
- **Sauberer Tech-Stack:** Next.js, Vercel, schnelles Loading (ausser Bilder-Optimierung, die wir gefixt haben).
- **Klare Struktur:** Flache Hierarchie (`/verband`, `/projekte`, `/news`).
- **Mehrsprachigkeit:** `de`, `fr`, `it` Routing ist bereits nativ integriert (Best Practice für CH-SEO).

### Schwächen (Kritik)
- **Fehlende Sitemap & Robots:** Google weiss nicht, was indexiert werden soll.
- **Dünne Metadata:** `title` und `description` sind zu generisch. Keine Keywords, kein `alternates`-Tag für Sprachen.
- **Kein Schema.org:** Die Seite "spricht" nicht mit Suchmaschinen. Google versteht nicht, dass es sich um eine **Organisation** (Verband) handelt.
- **Content-Silos:** News-Artikel sind isoliert, wenig interne Verlinkung zu Projekten.

---

## 2. JassWiki als Referenz (Benchmark)

JassWiki dominiert durch **Masse und Detailtiefe** (Long-Tail-Keywords wie "Vierblatt Regeln").
Strategie JassWiki: *Lexikon-Ansatz*. Jede Frage zum Jassen hat eine eigene URL.

**Unsere Strategie (Jassverband):** *Leuchtturm-Ansatz*.
Wir konkurrenzieren nicht mit JassWiki im Detail-Wissen (wir verlinken darauf!). Wir positionieren uns als die **offizielle Instanz**.

---

## 3. Die Strategie: "Digital Authority"

Wir fluten die Seite nicht mit Texten ("Was ist ein Schieber?"), sondern etablieren den Verband als **Entity** im Knowledge Graph.

### Säule 1: Technische Exzellenz (Semantic SEO)

**Ziel:** Google muss verstehen: "Das ist DER Verband."

1. **Schema.org (JSON-LD) auf jeder Seite:**
   - **Startseite:** `Organization` (JVS) mit `sameAs` zu Social Media, Wikidata (wenn vorhanden), JassWiki.
   - **News:** `NewsArticle` mit Author (Remo Prinz) und Publisher (JVS).
   - **Verband:** `AboutPage`.
   - **Kontakt:** `ContactPage`.

2. **Hreflang-Tags korrekt setzen:**
   Damit Google weiss: `/de/verband` ist für Deutschschweizer, `/fr/verband` für Romandie.

3. **Sitemap.xml dynamisch generieren:**
   Muss alle News-Artikel und statischen Seiten enthalten, updated bei jedem neuen Artikel.

### Säule 2: Geo-Relevanz (Lokale Verankerung)

**Ziel:** Gefunden werden bei "Jass Turnier Zürich", "Jassen Bern".

1. **Regionale Landingpages für Turniere:**
   Statt nur "Meisterschaft", erstellen wir Unterseiten für Qualifikationen:
   `/turniere/zuerich`, `/turniere/bern`.
   *Kein Spam!* Echte Infos: Wo findet es statt? Wer organisiert es?

2. **Google My Business (sobald Adresse fix):**
   Eintrag als "Verband" in Zürich. Wichtig für lokale Sichtbarkeit ("Jassverband in der Nähe").

### Säule 3: Content-Hub (Qualität vor Quantität)

**Ziel:** Traffic für relevante, aktuelle Themen.

1. **News als Motor:**
   Regelmässige Updates (1x/Monat) zu echten Themen (Gründung, Meisterschafts-Start, Partner).
   
2. **Kuratierte Verlinkung:**
   Auf `/projekte` nicht nur Logos zeigen, sondern "Deep Links" setzen:
   - "Jass-Regeln lernen? → JassWiki"
   - "Trainieren? → JassGuru"
   
   Das stärkt das gesamte Ökosystem und gibt JVS die Rolle des "Verteilers" (Gatekeeper).

---

## 4. Konkreter Massnahmen-Plan (Roadmap)

### Phase 1: Technisches Fundament (Sofort)
- [ ] `sitemap.xml` und `robots.txt` hinzufügen (dynamisch via `next-sitemap` oder Custom Route).
- [ ] `generateMetadata` in `layout.tsx` massiv ausbauen (Keywords, Authors, Alternates, OpenGraph Images).
- [ ] JSON-LD (`Organization`) in den Footer oder Head injecten.

### Phase 2: Content-Optimierung (Woche 1-2)
- [ ] News-Artikel mit strukturierten Daten anreichern.
- [ ] Interne Verlinkung optimieren (News → Projekte → Partner).

### Phase 3: Geo-Expansion (Woche 3-4)
- [ ] Falls Turniere feststehen: Landingpages pro Region erstellen.

---

## 5. Fazit

Wir bauen kein zweites Wikipedia. Wir bauen das **digitale Rathaus** des Schweizer Jassens. Seriös, strukturiert, amtlich.

**Code-Vermeidung:**
Alle Inhalte für Metadata und Schema können via `content/` gesteuert und via Config injected werden. Wir brauchen keine neuen wilden Komponenten, nur saubere Metadaten-Injection.
