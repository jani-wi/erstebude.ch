# ErsteBude.ch – Website

Reines HTML, CSS und JavaScript. Kein Build-Schritt: Datei öffnen, ändern, hochladen.
Läuft kostenlos auf **GitHub Pages**. Lokal ansehen: `index.html` doppelklicken.

## Aufbau

```
├── index.html            Startseite
├── wegweiser.html        Übersicht aller Etappen und Artikel
├── suchen.html  bewerben.html  kosten.html  zuegeln.html   (die 4 Etappen)
├── checkliste.html       interaktive Checkliste (19 Punkte) + PDF
├── vorlagen.html         alle Downloads auf einer Seite
├── ueber-uns.html  impressum.html  datenschutz.html  404.html
├── artikel/              die 8 Artikel
├── style.css             alle Farben und Formen (Farben ganz oben in :root)
├── script.js             Tracking-IDs, Menü, Footer, Cookie-Banner, Checkliste
├── img/                  logo/, fotos/, og-image.png (Vorschau für Social Media)
├── downloads/            Dossier-Vorlage, Budget-Tabelle, WG-Checkliste, Fragenliste, Checkliste
├── fonts/                Schriften (lokal, keine Verbindung zu Google)
├── CNAME                 Domain erstebude.ch
└── sitemap.xml  robots.txt  site.webmanifest  favicon.ico
```

## 1. Auf GitHub veröffentlichen

1. Neues Repository auf github.com anlegen (Public), alle Dateien hochladen.
2. **Settings → Pages → Source: «Deploy from a branch» → Branch `main`, Ordner `/ (root)`** → Save.
3. Nach ca. 1 Minute ist die Seite online.

**Solange die Domain noch nicht verbunden ist:** Datei `CNAME` löschen. Die Seite läuft dann unter `https://DEIN-NAME.github.io/REPO/`.

**Domain verbinden** (Angaben laut GitHub-Dokumentation, dort nochmals prüfen):
- Beim Domain-Anbieter 4 × `A`-Eintrag für `erstebude.ch`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME`-Eintrag für `www`: `DEIN-NAME.github.io`
- Datei `CNAME` mit Inhalt `erstebude.ch` wieder hochladen, in Settings → Pages die Domain eintragen, **Enforce HTTPS** aktivieren.

## 2. Texte bearbeiten

Offene Stellen sind auf der Seite als gestrichelte Kästen **«✎ Text folgt»** sichtbar. Im Code:

```html
<p class="todo">Liste aller Unterlagen, kurz erklärt.</p>
```

Ersetzen durch normalen Text:

```html
<p>Für die Bewerbung brauchst du …</p>
```

Weitere Bausteine: `<h2>Frage?</h2>`, `<ul><li>Punkt</li></ul>`, `<a href="checkliste.html">Link</a>`.
Zwischentitel als echte Fragen formulieren und die Antwort direkt darunter: Das hilft Google (SEO) und KI-Suchen (GEO).

**Bei jeder inhaltlichen Änderung eines Artikels** das Datum aktualisieren: im sichtbaren Text («Aktualisiert am …», `<time datetime="…">`) und im Kopfbereich bei `"dateModified"`.

**Kurzantwort und FAQ:** Die Kurzantwort steht oben im Kasten «Kurz gesagt». FAQ-Antworten stehen unten in den `<details>`-Blöcken. Wenn eine FAQ beantwortet ist, kann sie auch im JSON-LD-Block im `<head>` als `FAQPage` ergänzt werden (Beispiele: `artikel/kosten-erste-wohnung-mietzinsdepot.html`, `artikel/wg-zimmer-finden.html`).

## 3. Menü und Footer ändern

Nur in **`script.js`, Abschnitt 2**. Die Änderung gilt sofort für alle Seiten.

## 4. Neuer Artikel

1. Einen bestehenden Artikel in `artikel/` kopieren und umbenennen (z.B. `wg-oder-eigene-wohnung.html`).
2. Im `<head>` anpassen: `<title>`, `description`, `canonical`, `og:title`, `og:url` und den JSON-LD-Block.
3. Inhalt ersetzen, Bild in `img/fotos/` ablegen.
4. Eine Karte im `wegweiser.html` und auf der passenden Etappen-Seite ergänzen (bestehende `<a class="art">` kopieren) und den Link in den Etappen-Karten (`<div class="step">`) auf Startseite, Wegweiser und Etappen-Seiten.
5. Die neue Adresse in `sitemap.xml` eintragen.

## 5. Fotos ersetzen

In `img/fotos/` liegen Platzhalter. Eigene Fotos **mit gleichem Dateinamen** speichern (JPG, ca. 1600 × 1000 px, `hero.jpg` hochformatig ca. 1200 × 1500 px). Bildnachweise im Impressum ergänzen.

## 6. Schriften

Outfit liegt bereits in `fonts/`. **Source Sans 3** bitte einmalig ergänzen: auf fonts.google.com/specimen/Source+Sans+3 «Get font» → «Download all», aus dem ZIP den Ordner `static/` öffnen und `SourceSans3-Regular.ttf`, `SourceSans3-SemiBold.ttf` und `SourceSans3-Bold.ttf` in `fonts/` legen. Bis dahin wird eine Systemschrift verwendet. Die Seite lädt keine Schriften von Google (Datenschutz).

## 7. Tracking und SEO-Codes

**In `script.js`, Abschnitt 1** die IDs eintragen:

| Feld | Wo finde ich das? |
|---|---|
| `ga4_id` | Google Analytics → Verwaltung → Datenstreams → Mess-ID `G-…` |
| `google_ads_id` | Google Ads → Ziele → Conversions → Tag einrichten → `AW-…` |
| `google_ads_label_vorlage` | Conversion-Aktion «Download Vorlage» → Conversion-Label (Teil nach dem `/`) |
| `google_ads_label_budget` | Conversion-Aktion «Download Budget-Tabelle» → Conversion-Label |

**Search Console / Bing:** In `index.html` im `<head>` den Kommentar mit `google-site-verification` bzw. `msvalidate.01` öffnen und den Code eintragen. Danach `sitemap.xml` in beiden Tools einreichen.

**Cookie-Banner:** Erscheint beim ersten Besuch immer (auch ohne IDs). Getrennte Wahl für Statistik (GA4) und Marketing (Google Ads), «Nur notwendige» ist gleich einfach wie «Alle akzeptieren». Die Wahl gilt 12 Monate. Google-Skripte laden erst nach Zustimmung (Consent Mode v2, strenge Variante). Nach Widerruf werden die Google-Cookies gelöscht.

**Einstellungen in Google Analytics** (so steht es in der Datenschutzerklärung, bitte genau so einstellen):
- Verwaltung → Datenerhebung und -aufbewahrung → Datenaufbewahrung: **2 Monate**
- Google Signals: **aus**; Werbefunktionen / Personalisierung: **aus**
- Verwaltung → Kontoeinstellungen: Datenverarbeitungsbedingungen akzeptieren
- In Google Ads kein Remarketing / keine Zielgruppenlisten anlegen

**Events an GA4** (in GA4 als Schlüsselereignis markieren: `generate_lead`):

| Event | Wann |
|---|---|
| `generate_lead` (Parameter `lead_type` = vorlage / budget) | Download Dossier-Vorlage oder Budget-Tabelle = Kampagnenziel (zählt auch als Google-Ads-Conversion) |
| `file_download` | jeder Download (auch WG-Checkliste, Fragenliste, Checkliste) |
| `checklist_check`, `checklist_print` | Punkt in der Checkliste abgehakt / Seite gedruckt |
| `zuegelplan_erstellt`, `zuegelplan_kalender` | Zügelplaner genutzt |
| `next_step_click`, `cta_*`, `feature_hub`, `link_checkliste`, `suchabo_*` | Klicks auf wichtige Buttons |

Beispiel-Link für Anzeigen (Google Ads setzt meist automatisch `gclid`, UTM optional):
`https://erstebude.ch/artikel/bewerbungsdossier-wohnung-vorlage.html?utm_source=google&utm_medium=cpc&utm_campaign=erstebude_nov26&utm_content=gruppe_a`

## 8. Vor dem Livegang

- [x] Artikeltexte eingebaut (Stand 29.10.2026). Offene «Text folgt»-Kästen nur noch auf der Über-uns-Seite
- [x] Impressum und Datenschutz mit Adresse und E-Mail
- [ ] Source Sans 3 in `fonts/` gelegt
- [ ] Fotos ersetzt, Bildnachweise eingetragen
- [ ] Tracking-IDs eingetragen, Cookie-Banner getestet, GA4 «DebugView» zeigt Events, GA4-Einstellungen wie oben
- [x] Alle Seiten auf `index, follow` (nur 404.html bleibt `noindex`)
- [ ] Am 1. Januar 2027 prüfen: Serafe CHF 312 und Krankenkasse CHF 338.80 (Artikel 1, 4, 6 und Budget-Tabelle)
- [ ] Quellenlinks einmal pro Semester prüfen
- [ ] Search Console und Bing bestätigen, `sitemap.xml` einreichen
