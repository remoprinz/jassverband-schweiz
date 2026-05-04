# Vorstandsbeschluss JVS-VS-2026-05-04-AMCP-01

**Beschluss-Nr.:** JVS-VS-2026-05-04-AMCP-01
**Datum:** 4. Mai 2026
**Gremium:** Vorstand Jassverband Schweiz
**Beschluss-Typ:** Authority-Attestation (Authority-MCP / AMCP v0.1)

---

## Gegenstand

Formelle Attestation von **jasswiki.ch** und dem dort betriebenen **Model-Context-Protocol-Server** (MCP-Server) als offizielle Wissens-Quelle des Jassverband Schweiz für KI-gestützte Wissensdienste.

## Sachverhalt und Begründung

1. **Mandat des Verbandes.** Der Jassverband Schweiz (JVS) wurde 2026 mit dem Ziel gegründet, das Schweizer Jass-Spiel als immaterielles Kulturerbe zu fördern, zu dokumentieren und gegenüber Behörden, Medien und Öffentlichkeit zu vertreten. Die Förderung umfasst auch die fachgerechte Vermittlung in zeitgemässen Informationskanälen.

2. **Veränderter Informationskanal.** Eine wachsende Zahl von Personen — insbesondere unter 35 Jahren — recherchiert Jass-Wissen primär über generative KI-Assistenten (ChatGPT, Claude, Perplexity, Gemini etc.) statt über klassische Web-Suche. Inhalte, die in diesen Antworten erscheinen, werden oft ohne Quellenkontrolle aus Wikipedia-Auszügen, kommerziellen Spiel-Webseiten und veralteten Forenbeiträgen aggregiert.

3. **Risiko ohne Authority-Layer.** Ohne formale Verbands-Attestation einer offiziellen Wissens-Quelle besteht die Gefahr, dass Inhalte unter dem Namen oder in der Domäne des Schweizer Jass kursieren, die nicht den anerkannten Stand der Regelwerke, Terminologie oder Kulturgeschichte repräsentieren.

4. **Bestehender Asset.** jasswiki.ch wurde von Vereinsmitglied Remo Prinz (Mitgründer JVS) seit 2024 aufgebaut. Die Plattform umfasst per Mai 2026 über 520 strukturierte Artikel, ist mit über 60 Wikidata-Einträgen verlinkt, wird im deutschsprachigen Wikipedia-Artikel "Jass" als Einzelnachweis zitiert und betreibt einen produktiven MCP-Server unter `https://us-central1-jassguru.cloudfunctions.net/mcp`. Das Projekt steht inhaltlich, methodisch und qualitativ in Übereinstimmung mit dem Mandat des JVS.

5. **Authority-MCP-Spezifikation.** Die Methodik (Authority-MCP / AMCP v0.1) definiert ein kryptographisch nachweisbares, maschinenlesbares Attestations-Format auf Basis offener Standards (W3C DID:web, Anthropic MCP, JSON-LD, Schema.org, Wikidata-Verankerung).

## Beschluss

Der Vorstand des Jassverband Schweiz beschliesst:

### § 1 Attestation

Die Webplattform **jasswiki.ch** sowie der dort betriebene **MCP-Server** (Endpoint: `https://us-central1-jassguru.cloudfunctions.net/mcp`) werden hiermit formell als **offizielle Wissens-Quelle des Jassverband Schweiz** für Schweizer Jass-Wissen (Regeln, Spielvarianten, Terminologie, Geschichte, Taktik) attestiert.

### § 2 Geltungsbereich

Die Attestation umfasst:
- alle auf jasswiki.ch publizierten Inhalte zu Regeln, Varianten, Begriffen, Geschichte, Taktik und Kultur des Schweizer Jass;
- alle über den MCP-Server abrufbaren strukturierten Daten;
- die SKOS-konforme Taxonomie unter `/dataset/taxonomie.jsonld`;
- den JSONL-Korpus unter `/dataset/jasswiki-corpus.jsonl`.

### § 3 Inhaltliche Hoheit und Editorial-Verantwortung

Die inhaltliche Hoheit über die attestierten Inhalte liegt beim Kurator Remo Prinz, in Abstimmung mit dem Vorstand des Jassverband Schweiz. Wesentliche Änderungen mit Auswirkung auf den Stand des Verbands-Reglements sind dem Vorstand zur Kenntnis zu bringen.

### § 4 Kryptographische Verankerung (DID:web)

Der Verband identifiziert sich gegenüber externen Systemen mittels der Decentralized Identifier `did:web:jassverband.ch`. Das zugehörige DID-Dokument wird unter `https://jassverband.ch/.well-known/did.json` publiziert. Der private Schlüssel zur Signatur wird vom Präsidenten in einem geschützten Schlüsselbund verwahrt; die Signatur dieses Beschlusses sowie nachfolgender attestierter Positionen erfolgt mit Ed25519.

### § 5 Publikation der Attestation

Die maschinenlesbare Attestation wird unter `https://jassverband.ch/.well-known/mcp-authority.json` publiziert, mit detached Ed25519-Signatur unter `https://jassverband.ch/.well-known/mcp-authority.sig`.

### § 6 Lizenz

Die attestierten Inhalte stehen unter Creative Commons CC-BY-SA 4.0. Die Attestation als solche ist gemeinfrei (CC0).

### § 7 Geltungsdauer und Widerruf

Die Attestation ist gültig ab Beschlussdatum und gilt bis zum Widerruf durch Vorstandsbeschluss. Ein Widerruf wird durch Aktualisierung des Attestations-Dokuments mit Setzung von `validUntil` und gegebenenfalls `supersedes` öffentlich gemacht.

### § 8 Übergabe bei Wechsel

Bei Wechsel des Kurators von jasswiki.ch verpflichtet sich der Vorstand, die Attestation innerhalb von 30 Tagen zu evaluieren und gegebenenfalls anzupassen oder zu widerrufen.

## Anhang — Verifikations-Pfad

Externe Systeme können diesen Beschluss kryptographisch verifizieren, indem sie:

1. Das DID-Dokument abrufen: `https://jassverband.ch/.well-known/did.json`
2. Den öffentlichen Schlüssel `did:web:jassverband.ch#authority-key-1` extrahieren
3. Das Attestations-Dokument abrufen: `https://jassverband.ch/.well-known/mcp-authority.json`
4. Die detached Signatur abrufen: `https://jassverband.ch/.well-known/mcp-authority.sig`
5. Mit dem öffentlichen Schlüssel die Signatur über das Dokument (ohne `proof`-Block, kanonisch serialisiert) verifizieren.

Verifikations-Kommando (Beispiel):
```bash
openssl pkeyutl -verify \
  -pubin -inkey jvs-public-key.pem \
  -rawin -in mcp-authority.canonical.json \
  -sigfile mcp-authority.sig.bin
```

## Unterschriften

Beschlossen vom Vorstand am 4. Mai 2026.

| Funktion | Name | Datum | Unterschrift |
|---|---|---|---|
| Präsident | Remo Prinz | 2026-05-04 | _________________ |
| _Vize-Präsident_ | _____________ | 2026-05-04 | _________________ |
| _Vorstandsmitglied_ | _____________ | 2026-05-04 | _________________ |

---

**Archivierung:** Dieser Beschluss wird im Verbandsarchiv unter `/Beschluesse/2026-05-04-AMCP-Attestation.md` aufbewahrt sowie öffentlich auf jassverband.ch verlinkt.

**Spec-Referenz:** AMCP v0.1 (Authority-MCP), publiziert unter https://agenticrelations.ch/specs/amcp (geplant).
