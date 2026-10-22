/* ==========================================================================
   ErsteBude.ch – script.js
   1. Einstellungen (Tracking-IDs)        ← hier IDs eintragen
   2. Header, Footer, Cookie-Banner       ← Menü und Footer nur hier ändern
   3. Einwilligung und Tracking
   4. Menü, Checkliste, Klick-Events, Zügelplaner
   ========================================================================== */

/* 1. EINSTELLUNGEN ---------------------------------------------------------
   IDs zwischen die Anführungszeichen schreiben. Leer = Tool ist aus.
   Der Cookie-Banner erscheint beim ersten Besuch immer. */
var EB_CONFIG = {
  ga4_id: "G-1XR3P2EMRG",                   // Google Analytics 4, z.B. "G-AB12CD34EF"
  google_ads_id: "",            // Google Ads, z.B. "AW-123456789"
  google_ads_label_vorlage: "", // Conversion-Label: Download Dossier-Vorlage (Anzeigengruppe A)
  google_ads_label_budget: ""   // Conversion-Label: Download Budget-Tabelle (Anzeigengruppe B)
};

/* Pfad zum Hauptordner (funktioniert auf Unterseiten wie artikel/…) */
var ROOT = (document.currentScript && document.currentScript.getAttribute('src') || 'script.js').replace(/script\.js.*$/, '');

/* 2. HEADER, FOOTER, COOKIE-BANNER ---------------------------------------- */
var NAV = [
  ['wegweiser', 'wegweiser.html', 'Wegweiser'],
  ['checkliste', 'checkliste.html', 'Checkliste'],
  ['vorlagen', 'vorlagen.html', 'Vorlagen'],
  ['ueber', 'ueber-uns.html', 'Über uns']
];

function headerHTML(page) {
  var links = NAV.map(function (n) {
    return '<a href="' + ROOT + n[1] + '"' + (n[0] === page ? ' aria-current="page"' : '') + '>' + n[2] + '</a>';
  }).join('');
  return '' +
    '<a class="skip" href="#inhalt">Zum Inhalt springen</a>' +
    '<header class="site-header"><div class="wrap">' +
      '<a class="logo" href="' + ROOT + 'index.html" aria-label="ErsteBude.ch – zur Startseite">' +
        '<img src="' + ROOT + 'img/logo/erstebude_logo_gestapelt_farbig.svg" alt="ErsteBude.ch" width="131" height="58"></a>' +
      '<button class="menu-btn" type="button" aria-controls="nav" aria-expanded="false" aria-label="Menü öffnen">☰</button>' +
      '<nav class="nav" id="nav" aria-label="Hauptnavigation">' + links + '</nav>' +
      '<a class="btn btn-p" href="' + ROOT + 'artikel/bewerbungsdossier-wohnung-vorlage.html#vorlage" data-track="cta_header_vorlage">↓ Gratis Vorlage</a>' +
    '</div></header>';
}

function footerHTML() {
  var y = new Date().getFullYear();
  return '' +
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="flogo"><img src="' + ROOT + 'img/logo/erstebude_logo_slogan_gestapelt_weiss.svg" alt="ErsteBude.ch – Der Wegweiser für deinen ersten Auszug" width="220" height="124" loading="lazy"></div>' +
      '<div><h2>Wegweiser</h2><ul>' +
        '<li><a href="' + ROOT + 'suchen.html">1 · Suchen</a></li>' +
        '<li><a href="' + ROOT + 'bewerben.html">2 · Bewerben</a></li>' +
        '<li><a href="' + ROOT + 'kosten.html">3 · Kosten</a></li>' +
        '<li><a href="' + ROOT + 'zuegeln.html">4 · Zügeln</a></li></ul></div>' +
      '<div><h2>Hilfsmittel</h2><ul>' +
        '<li><a href="' + ROOT + 'artikel/bewerbungsdossier-wohnung-vorlage.html">Dossier-Vorlage</a></li>' +
        '<li><a href="' + ROOT + 'artikel/kosten-erste-wohnung-mietzinsdepot.html#budget">Budget-Tabelle</a></li>' +
        '<li><a href="' + ROOT + 'checkliste.html">Checkliste</a></li>' +
        '<li><a href="' + ROOT + 'vorlagen.html">Alle Vorlagen</a></li></ul></div>' +
      '<div><h2>ErsteBude.ch</h2><ul>' +
        '<li><a href="' + ROOT + 'ueber-uns.html">Über uns</a></li>' +
        '<li><a href="' + ROOT + 'impressum.html">Impressum</a></li>' +
        '<li><a href="' + ROOT + 'datenschutz.html">Datenschutz</a></li>' +
        '<li><button class="linklike" type="button" data-consent-open>Cookie-Einstellungen</button></li></ul></div>' +
      '<div class="legal"><span>Ein Studierendenprojekt im Modul Digital Marketing, FH Graubünden · ' + y + '</span>' +
        '<span>Keine Rechtsberatung. Bei Fragen zum Mietrecht hilft der Mieterinnen- und Mieterverband.</span></div>' +
    '</div></footer>' +
    cookieHTML();
}

function cookieHTML() {
  return '' +
    '<div class="cookie" id="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden>' +
      '<div class="cookie-main">' +
        '<b id="cookie-title">Darf ErsteBude.ch messen?</b>' +
        '<p>Mit deiner Zustimmung messen wir mit Google Analytics, welche Inhalte dir helfen, und mit Google Ads, ob unsere Anzeigen funktionieren. Ohne Zustimmung messen wir nichts, die Seite funktioniert trotzdem vollständig. Deine Wahl kannst du jederzeit unter «Cookie-Einstellungen» im Footer ändern. <a href="' + ROOT + 'datenschutz.html">Mehr in der Datenschutzerklärung</a></p>' +
      '</div>' +
      '<div class="cookie-prefs" id="cookie-prefs" hidden>' +
        '<label class="pref"><input type="checkbox" checked disabled><span><b>Notwendig</b><small>Speichert deine Cookie-Wahl und deinen Checklisten-Fortschritt in deinem Browser. Immer aktiv.</small></span></label>' +
        '<label class="pref"><input type="checkbox" id="pref-analytics"><span><b>Statistik</b><small>Google Analytics 4: welche Seiten gelesen werden, ohne Werbeprofile.</small></span></label>' +
        '<label class="pref"><input type="checkbox" id="pref-marketing"><span><b>Marketing</b><small>Google Ads Conversion-Tracking: ob nach einem Anzeigenklick eine Vorlage heruntergeladen wurde. Kein Remarketing.</small></span></label>' +
      '</div>' +
      '<div class="row">' +
        '<button class="btn btn-p" type="button" data-consent="all">Alle akzeptieren</button>' +
        '<button class="btn btn-s" type="button" data-consent="none">Nur notwendige</button>' +
        '<button class="btn btn-s" type="button" data-consent="prefs" aria-expanded="false" aria-controls="cookie-prefs">Einstellungen</button>' +
        '<button class="btn btn-s" type="button" data-consent="save" hidden>Auswahl speichern</button>' +
      '</div>' +
    '</div>';
}

/* 3. EINWILLIGUNG UND TRACKING ---------------------------------------------
   Google Consent Mode v2, strenge Variante: Standard = "denied", Google-Skripte
   laden erst nach Zustimmung. Statistik (GA4) und Marketing (Ads) getrennt. */
var EB = (function () {
  var C = EB_CONFIG, KEY = 'eb-consent-v2', MAX_AGE = 365 * 24 * 3600 * 1000, loaded = false, state = null;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });

  function get() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.ts && Date.now() - s.ts < MAX_AGE) return s;
    } catch (e) {}
    return null;
  }
  function set(s) { s.ts = Date.now(); state = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  function load() {
    if (!state) return;
    var wantGA = state.analytics && C.ga4_id, wantAds = state.marketing && C.google_ads_id;
    if (!wantGA && !wantAds) return;
    gtag('consent', 'update', {
      analytics_storage: state.analytics ? 'granted' : 'denied',
      ad_storage: state.marketing ? 'granted' : 'denied',
      ad_user_data: state.marketing ? 'granted' : 'denied',
      ad_personalization: 'denied'          /* kein Remarketing */
    });
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(wantGA ? C.ga4_id : C.google_ads_id);
    document.head.appendChild(s);
    gtag('js', new Date());
    if (wantGA) gtag('config', C.ga4_id, { allow_google_signals: false, allow_ad_personalization_signals: false });
    if (wantAds) gtag('config', C.google_ads_id, { allow_ad_personalization_signals: false });
  }

  /* Nach Widerruf: Google-Cookies löschen */
  function clearCookies() {
    var host = location.hostname, domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')];
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (/^(_ga|_gid|_gat|_gcl_)/.test(name)) domains.forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function el(id) { return document.getElementById(id); }
  function showPrefs(on) {
    var b = el('cookie'); if (!b) return;
    el('cookie-prefs').hidden = !on;
    b.querySelector('[data-consent="save"]').hidden = !on;
    b.querySelector('[data-consent="prefs"]').hidden = on;
    b.querySelector('[data-consent="prefs"]').setAttribute('aria-expanded', on ? 'true' : 'false');
  }
  function open(withPrefs) {
    var b = el('cookie'); if (!b) return;
    el('pref-analytics').checked = !!(state && state.analytics);
    el('pref-marketing').checked = !!(state && state.marketing);
    showPrefs(!!withPrefs);
    b.hidden = false;
  }
  function decide(s) {
    var before = state;
    set(s);
    el('cookie').hidden = true;
    var revoked = before && ((before.analytics && !s.analytics) || (before.marketing && !s.marketing));
    if (revoked) { clearCookies(); if (loaded) { location.reload(); return; } }
    load();
  }

  function init() {
    state = get();
    if (state) load(); else open(false);
    var b = el('cookie');
    if (b) b.addEventListener('click', function (e) {
      var t = e.target.closest('[data-consent]'); if (!t) return;
      var v = t.getAttribute('data-consent');
      if (v === 'all') decide({ analytics: true, marketing: true });
      else if (v === 'none') decide({ analytics: false, marketing: false });
      else if (v === 'prefs') showPrefs(true);
      else if (v === 'save') decide({ analytics: el('pref-analytics').checked, marketing: el('pref-marketing').checked });
    });
    document.querySelectorAll('[data-consent-open]').forEach(function (x) { x.addEventListener('click', function () { open(true); }); });
  }

  return {
    init: init,
    /* Event an GA4, z.B. EB.track('checklist_check', {item: 'dossier'}) */
    track: function (name, params) { if (loaded && state && state.analytics && C.ga4_id) gtag('event', name, params || {}); },
    /* Kampagnenziel: Download Vorlage (A) oder Budget-Tabelle (B) */
    conversion: function (type, params) {
      if (!loaded || !state) return;
      if (state.analytics && C.ga4_id) gtag('event', 'generate_lead', Object.assign({ lead_type: type }, params || {}));
      var label = type === 'budget' ? C.google_ads_label_budget : C.google_ads_label_vorlage;
      if (state.marketing && C.google_ads_id && label) gtag('event', 'conversion', { send_to: C.google_ads_id + '/' + label });
    }
  };
})();

/* 4. MENÜ, CHECKLISTE, KLICK-EVENTS, ZÜGELPLANER ---------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  var page = document.body.getAttribute('data-page') || '';
  var h = document.getElementById('site-header'), f = document.getElementById('site-footer');
  if (h) h.outerHTML = headerHTML(page);
  if (f) f.outerHTML = footerHTML();
  EB.init();

  /* Mobile-Menü */
  var btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  if (btn && nav) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* Checkliste: Fortschritt bleibt im Browser gespeichert */
  var STORE = 'eb-checklist-v1';
  function read() { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (e) { return {}; } }
  function write(d) { try { localStorage.setItem(STORE, JSON.stringify(d)); } catch (e) {} }
  var state = read();
  var boxes = Array.prototype.slice.call(document.querySelectorAll('input[data-check]'));
  function update() {
    var done = Object.keys(state).filter(function (k) { return state[k]; }).length;
    document.querySelectorAll('[data-progress]').forEach(function (wrap) {
      var scope = wrap.getAttribute('data-progress'), total, n = 0;
      if (scope === 'all') { total = +wrap.getAttribute('data-total'); n = Math.min(done, total); }
      else {
        var inScope = document.querySelectorAll('input[data-check][data-group="' + scope + '"]');
        total = inScope.length;
        inScope.forEach(function (b) { if (b.checked) n++; });
      }
      var c = wrap.querySelector('[data-count]'); if (c) c.textContent = n + ' von ' + total;
      var bar = wrap.querySelector('[data-bar]'); if (bar) bar.style.width = (total ? n / total * 100 : 0) + '%';
    });
  }
  boxes.forEach(function (b) {
    var k = b.getAttribute('data-check');
    if (k in state) b.checked = !!state[k];
    b.addEventListener('change', function () {
      state[k] = b.checked; write(state);
      update();
      EB.track('checklist_check', { item: k, checked: b.checked });
    });
  });
  var reset = document.querySelector('[data-reset]');
  if (reset) reset.addEventListener('click', function () { state = {}; write(state); boxes.forEach(function (b) { b.checked = false; }); update(); });
  var pr = document.querySelector('[data-print]');
  if (pr) pr.addEventListener('click', function () { EB.track('checklist_print'); window.print(); });
  update();

  /* Klick-Events: Downloads und markierte Buttons (data-track) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (a.hasAttribute('data-download')) {
      var file = a.getAttribute('data-download');
      EB.track('file_download', { file_name: file, link_url: a.getAttribute('href') });
      if (a.hasAttribute('data-conversion')) EB.conversion(a.getAttribute('data-conversion'), { file_name: file });
    } else if (a.hasAttribute('data-track')) {
      EB.track(a.getAttribute('data-track'), { link_text: a.textContent.trim().slice(0, 80), link_url: a.getAttribute('href') });
    }
  });

  /* Zügelplaner: rechnet ab dem Zügeltag rückwärts (nur im Browser) */
  var form = document.querySelector('[data-planer]');
  if (form) {
    var TASKS = [
      [-42, 'Helfer anfragen und Zügelwagen reservieren'],
      [-28, 'Internet und Strom für die neue Wohnung bestellen'],
      [-21, 'Hausrat- und Privathaftpflichtversicherung prüfen'],
      [-14, 'Adressänderung bei der Post melden, Kartons besorgen'],
      [-7, 'Bei der alten Gemeinde abmelden, Kisten fertig packen'],
      [-1, 'Werkzeug, Putzzeug und Verpflegung für die Helfer bereitlegen'],
      [0, 'Übergabeprotokoll ausfüllen, Mängel fotografieren, Zählerstände notieren'],
      [14, 'Spätestens jetzt bei der neuen Gemeinde anmelden (Frist der Gemeinde prüfen)']
    ];
    var list = document.querySelector('[data-plan]'), actions = document.querySelector('[data-plan-actions]'), plan = [];
    function fmt(d) { return d.toLocaleDateString('de-CH', { weekday: 'short', day: 'numeric', month: 'long' }); }
    function rel(n) { var a = Math.abs(n), s = a % 7 === 0 ? (a / 7) + (a === 7 ? ' Woche' : ' Wochen') : a + (a === 1 ? ' Tag' : ' Tage'); return n === 0 ? 'Zügeltag' : s + (n < 0 ? ' vorher' : ' nachher'); }
    form.addEventListener('submit', function () {
      var v = form.querySelector('input').value; if (!v) return;
      var day = new Date(v + 'T12:00:00');
      plan = TASKS.map(function (t) { var d = new Date(day); d.setDate(d.getDate() + t[0]); return { d: d, n: t[0], t: t[1] }; });
      list.innerHTML = plan.map(function (p) {
        return '<li' + (p.n === 0 ? ' class="day"' : '') + '><span class="when"><b>' + fmt(p.d) + '</b>' + rel(p.n) + '</span><span>' + p.t + '</span></li>';
      }).join('');
      list.hidden = false; actions.hidden = false;
      EB.track('zuegelplan_erstellt');
    });
    document.querySelector('[data-ics]').addEventListener('click', function () {
      function ymd(d) { return d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2); }
      var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ErsteBude.ch//Zuegelplan//DE'];
      plan.forEach(function (p, i) {
        var end = new Date(p.d); end.setDate(end.getDate() + 1);
        lines.push('BEGIN:VEVENT', 'UID:zuegelplan-' + ymd(p.d) + '-' + i + '@erstebude.ch', 'DTSTAMP:' + ymd(new Date()) + 'T000000Z',
          'DTSTART;VALUE=DATE:' + ymd(p.d), 'DTEND;VALUE=DATE:' + ymd(end), 'SUMMARY:' + p.t.replace(/[,;]/g, ' '),
          'DESCRIPTION:Zügelplan von erstebude.ch', 'END:VEVENT');
      });
      lines.push('END:VCALENDAR');
      var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'Zuegelplan_ErsteBude.ics';
      document.body.appendChild(a); a.click(); a.remove();
      EB.track('zuegelplan_kalender');
    });
  }
});
