# ErsteBude.ch – Website

Reines HTML, CSS und JavaScript. Kein Build-Schritt: Datei öffnen, ändern, hochladen.
Läuft kostenlos auf **GitHub Pages**. Lokal ansehen: `index.html` doppelklicken.

## Aufbau

```
├── index.html            Startseite
├── wegweiser.html        Übersicht aller Etappen und Artikel
├── suchen.html  bewerben.html  kosten.html  zuegeln.html   (die 4 Etappen)
├── checkliste.html       interaktive Checkliste (18 Punkte)
├── ueber-uns.html  impressum.html  datenschutz.html  404.html
├── artikel/              die 8 Artikel
├── style.css             alle Farben und Formen (Farben ganz oben in :root)
├── script.js             Tracking-IDs, Menü, Footer, Cookie-Banner, Checkliste
├── img/                  logo/, fotos/, og-image.png (Vorschau für Social Media)
├── downloads/            Dossier-Vorlage (Word + PDF)
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

**Kurzantwort und FAQ:** Die Kurzantwort steht oben im Kasten «Kurz gesagt». FAQ-Antworten stehen unten in den `<details>`-Blöcken. Wenn eine FAQ beantwortet ist, kann sie auch im JSON-LD-Block im `<head>` als `FAQPage` ergänzt werden (Beispiel: `artikel/kosten-erste-wohnung-mietzinsdepot.html`).

## 3. Menü und Footer ändern

Nur in **`script.js`, Abschnitt 2**. Die Änderung gilt sofort für alle Seiten.

## 4. Neuer Artikel

1. Einen bestehenden Artikel in `artikel/` kopieren und umbenennen (z.B. `wg-oder-eigene-wohnung.html`).
2. Im `<head>` anpassen: `<title>`, `description`, `canonical`, `og:title`, `og:url` und den JSON-LD-Block.
3. Inhalt ersetzen, Bild in `img/fotos/` ablegen.
4. Eine Karte im `wegweiser.html` und auf der passenden Etappen-Seite ergänzen (bestehende `<a class="art">` kopieren).
5. Die neue Adresse in `sitemap.xml` eintragen.

## 5. Fotos ersetzen

In `img/fotos/` liegen Platzhalter. Eigene Fotos **mit gleichem Dateinamen** speichern (JPG, ca. 1600 × 1000 px, `hero.jpg` hochformatig ca. 1200 × 1500 px). Bildnachweise im Impressum ergänzen.

## 6. Tracking und SEO-Codes

**In `script.js`, Abschnitt 1** die IDs eintragen:

| Feld | Wo finde ich das? |
|---|---|
| `ga4_id` | Google Analytics → Verwaltung → Datenstreams → Mess-ID `G-…` |
| `google_ads_id` | Google Ads → Ziele → Conversions → Tag einrichten → `AW-…` |
| `google_ads_download_label` | dieselbe Conversion, Conversion-Label (Teil nach dem `/`) |
| `meta_pixel_id` | Meta Events Manager → Pixel-ID |

**Search Console / Bing:** In `index.html` im `<head>` den Kommentar mit `google-site-verification` bzw. `msvalidate.01` öffnen und den Code eintragen. Danach `sitemap.xml` in beiden Tools einreichen.

**Einwilligung:** Ohne IDs erscheint kein Cookie-Banner. Mit IDs erscheint er beim ersten Besuch, und die Tracking-Skripte laden erst nach «Einverstanden» (Google Consent Mode v2).

**Events an GA4** (in GA4 als Schlüsselereignis markieren, was wichtig ist):

| Event | Wann |
|---|---|
| `file_download_vorlage`, `generate_lead` | Download der Dossier-Vorlage (zählt auch als Google-Ads-Conversion und Meta «Lead») |
| `checklist_check` | Punkt in der Checkliste abgehakt |
| `next_step_click` | Klick auf «Dein nächster Schritt» |
| `cta_*`, `feature_hub`, `link_checkliste` | Klicks auf wichtige Buttons |

Sessions, Engaged Sessions, Returning Users und UTM-Kampagnen misst GA4 automatisch. Beispiel-Link für Anzeigen:
`https://erstebude.ch/artikel/bewerbungsdossier-wohnung-vorlage.html?utm_source=instagram&utm_medium=paid_social&utm_campaign=dossier_nov26&utm_content=hook_a`

## 7. Vor dem Livegang

- [ ] Alle «Text folgt»-Kästen ersetzt (in allen Dateien nach `class="todo"` suchen)
- [ ] Impressum und Datenschutz ausgefüllt und geprüft (Platzhalter in eckigen Klammern)
- [ ] Fotos ersetzt, Bildnachweise eingetragen
- [ ] Tracking-IDs eingetragen, Cookie-Banner getestet, GA4 «DebugView» zeigt Events
- [ ] In allen Dateien `noindex, nofollow` durch `index, follow` ersetzen (VS Code: «In Dateien ersetzen»)
- [ ] Search Console und Bing bestätigen, `sitemap.xml` einreichen
- [ ] Optional für den Datenschutz: Schriften lokal einbinden statt über Google Fonts und Abschnitt 3 der Datenschutzerklärung anpassen
