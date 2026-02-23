# Contributing – Jassverband Schweiz

## Multi-Agent Workflow

Dieses Repo wird von zwei Rechnern aus bearbeitet. Um Konflikte zu vermeiden, gelten folgende Regeln.

### Rollen

| Agent | Rechner | Zuständigkeit |
|-------|---------|---------------|
| **Cursor (Hauptrechner)** | MacBook | Code, Design, Deployment (`src/`, `public/`, Config) |
| **Clawmic (Mac Mini)** | Mac Mini | Content, Texte, Strategie (`content/`, neue MD-Files) |

### Branch-Strategie

- **`main`** ist der Production-Branch (Vercel deployt automatisch von `main`)
- **Cursor** darf direkt auf `main` pushen (Code & Design)
- **Clawmic** arbeitet **immer auf einem eigenen Branch** (z.B. `clawmic/content-structure`)

### Workflow für Clawmic

```bash
cd /Users/remoprinz/Documents/jassverband-schweiz
git pull origin main
git checkout -b clawmic/<beschreibung>
# Änderungen machen...
git add .
git commit -m "beschreibung"
git push -u origin clawmic/<beschreibung>
```

Danach Bescheid geben → Cursor merged in `main`.

### Regeln

1. **Clawmic pusht nie direkt auf `main`**
2. **`src/` und `public/`** werden nur vom Hauptrechner (Cursor) bearbeitet
3. **`content/`** ist der primäre Arbeitsbereich für Clawmic
4. Vor jedem neuen Branch: `git pull origin main`
5. Ein Branch pro Aufgabe, nach Merge wird der Branch gelöscht

### Ordnerstruktur

```
jassverband-schweiz/
├── content/              ← Content-Referenz (öffentlich, im Repo)
│   ├── contentDE.md      ← Deutsche Inhalte (Referenz)
│   ├── contentFR.md      ← Französische Inhalte
│   └── contentIT.md      ← Italienische Inhalte
├── .internal/            ← Interne Docs (gitignored, nur lokal)
├── src/                  ← Source Code (nur Cursor)
├── public/               ← Assets (nur Cursor)
└── CONTRIBUTING.md       ← Dieses File
```

### Merge-Konflikte vermeiden

- Verschiedene Files bearbeiten → kein Konflikt möglich
- Falls doch derselbe File betroffen: Branch-Owner löst den Konflikt vor dem Merge-Request
- Im Zweifel: absprechen bevor man anfängt
