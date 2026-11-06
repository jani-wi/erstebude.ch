/* ==========================================================================
   erstebude.ch – script.js
   1. Einstellungen (Tracking-IDs)        ← hier IDs eintragen
   2. Header, Footer, Cookie-Banner       ← Menü und Footer nur hier ändern
   3. Einwilligung und Tracking
   4. Menü, Checkliste, Klick-Events, Zügelplaner
   ========================================================================== */

/* 1. EINSTELLUNGEN ---------------------------------------------------------
   IDs zwischen die Anführungszeichen schreiben. Leer = Tool ist aus.
   Der Cookie-Banner erscheint beim ersten Besuch immer. */
var EB_CONFIG = {
  ga4_id: "G-1XR3P2EMRG",       // Google Analytics 4
  google_ads_id: "",            // Google Ads, z.B. "AW-123456789"
  google_ads_label_vorlage: "", // Conversion-Label: Download Dossier-Vorlage (Anzeigengruppe A)
  google_ads_label_budget: ""   // Conversion-Label: Download Budget-Tabelle (Anzeigengruppe B)
};

/* Pfad zum Hauptordner (funktioniert auf Unterseiten wie artikel/…) */
var ROOT = (document.currentScript && document.currentScript.getAttribute('src') || 'script.js').replace(/script\.js.*$/, '');

/* 2. HEADER, FOOTER, COOKIE-BANNER ---------------------------------------- */
var NAV = [
  ['wegweiser', 'wegweiser', 'Wegweiser'],
  ['checkliste', 'checkliste', 'Checkliste'],
  ['ueber', 'ueber-uns', 'Über uns'],
  ['vorlagen', 'vorlagen', 'Gratis Vorlagen']
];

/* Alle Artikel nach Etappen: für das Wegweiser-Menü und die Übersicht links in den Artikeln */
var ETAPPEN = [
  ['', 'Überblick', [['erste-eigene-wohnung-tipps', '10 Tipps für den ersten Auszug']]],
  ['suchen', 'Etappe 1 · Suchen', [['wohnung-finden-schweiz-tipps', 'Wohnung suchen: Plattformen & Tricks'], ['wg-zimmer-finden', 'WG-Zimmer & Casting'], ['wochenaufenthalt', 'Wohnung oder Wochenaufenthalt']]],
  ['bewerben', 'Etappe 2 · Bewerben', [['bewerbungsdossier-wohnung-vorlage', 'Bewerbungsdossier mit Vorlage'], ['wohnungsbesichtigung-fragen', 'Besichtigung: 10 Fragen']]],
  ['kosten', 'Etappe 3 · Kosten', [['kosten-erste-wohnung-mietzinsdepot', 'Kaution, Miete, Nebenkosten']]],
  ['zuegeln', 'Etappe 4 · Zügeln', [['umzug-checkliste-erste-wohnung', 'Umzugs-Checkliste'], ['zuegeln-tipps', 'Zügeln ohne Stress']]]
];
function esc(t) { return t.replace(/&/g, '&amp;'); }
function etappenHTML(current) {
  return ETAPPEN.map(function (e) {
    var head = e[0] ? '<a class="et-head" href="' + ROOT + e[0] + '">' + e[1] + '</a>' : '<span class="et-head">' + e[1] + '</span>';
    return '<div class="et">' + head + '<ul>' + e[2].map(function (a) {
      return '<li><a href="' + ROOT + 'artikel/' + a[0] + '"' + (a[0] === current ? ' aria-current="page"' : '') + '>' + esc(a[1]) + '</a></li>';
    }).join('') + '</ul></div>';
  }).join('');
}

function headerHTML(page) {
  var links = NAV.map(function (n) {
    var link = '<a href="' + ROOT + n[1] + '"' + (n[0] === page ? ' aria-current="page"' : '') +
      (n[0] === 'vorlagen' ? ' class="nav-cta" data-track="cta_header_vorlagen"' : '') + '>' + n[2] + '</a>';
    if (n[0] !== 'wegweiser') return link;
    return '<div class="nav-drop">' + link +
      '<button class="drop-btn" type="button" aria-expanded="false" aria-controls="mega" aria-label="Alle Etappen und Artikel anzeigen"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>' +
      '<div class="mega" id="mega"><div class="mega-in">' + etappenHTML(document.body.getAttribute('data-article') || '') +
      '</div><a class="mega-all" href="' + ROOT + 'wegweiser">Zum ganzen Wegweiser →</a></div></div>';
  }).join('');
  return '' +
    '<a class="skip" href="#inhalt">Zum Inhalt springen</a>' +
    '<header class="site-header"><div class="wrap">' +
      '<a class="logo" href="' + (ROOT || './') + '" aria-label="erstebude.ch – zur Startseite">' +
        '<img src="' + ROOT + 'img/logo/erstebude_logo_gestapelt_farbig.svg" alt="erstebude.ch" width="131" height="58"></a>' +
      '<button class="menu-btn" type="button" aria-controls="nav" aria-expanded="false" aria-label="Menü öffnen">☰</button>' +
      '<nav class="nav" id="nav" aria-label="Hauptnavigation">' + links + '</nav>' +
    '</div></header>';
}

function footerHTML() {
  var y = new Date().getFullYear();
  return '' +
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="flogo"><img src="' + ROOT + 'img/logo/erstebude_logo_slogan_gestapelt_weiss.svg" alt="erstebude.ch – Der Wegweiser für deinen ersten Auszug" width="220" height="124" loading="lazy"></div>' +
      '<div><h2><a href="' + ROOT + 'wegweiser">Wegweiser</a></h2><ul>' +
        '<li><a href="' + ROOT + 'suchen">1 · Suchen</a></li>' +
        '<li><a href="' + ROOT + 'bewerben">2 · Bewerben</a></li>' +
        '<li><a href="' + ROOT + 'kosten">3 · Kosten</a></li>' +
        '<li><a href="' + ROOT + 'zuegeln">4 · Zügeln</a></li></ul></div>' +
      '<div><h2><a href="' + ROOT + 'vorlagen">Hilfsmittel</a></h2><ul>' +
        '<li><a href="' + ROOT + 'artikel/bewerbungsdossier-wohnung-vorlage">Dossier-Vorlage</a></li>' +
        '<li><a href="' + ROOT + 'artikel/kosten-erste-wohnung-mietzinsdepot#budget">Budget-Tabelle</a></li>' +
        '<li><a href="' + ROOT + 'checkliste">Checkliste</a></li>' +
        '<li><a href="' + ROOT + 'vorlagen">Alle Vorlagen</a></li></ul></div>' +
      '<div><h2><a href="' + (ROOT || './') + '">erstebude.ch</a></h2><ul>' +
        '<li><a href="' + ROOT + 'ueber-uns">Über uns</a></li>' +
        '<li><a href="mailto:1erstebude@gmail.com" data-track="contact_click" data-where="footer">Kontakt</a></li>' +
        '<li><a href="' + ROOT + 'impressum">Impressum</a></li>' +
        '<li><a href="' + ROOT + 'datenschutz">Datenschutz</a></li>' +
        '<li><button class="linklike" type="button" data-consent-open>Cookie-Einstellungen</button></li></ul></div>' +
      '<div class="legal"><span>Ein Studierendenprojekt im Modul Digital Marketing, FH Graubünden · ' + y + '</span>' +
        '<span>Keine Rechtsberatung. Bei Fragen zum Mietrecht hilft der <a href="https://www.mieterverband.ch/" rel="noopener" target="_blank">Mieterinnen- und Mieterverband</a>.</span></div>' +
    '</div></footer>' +
    cookieHTML();
}

function cookieHTML() {
  return '' +
    '<div class="cookie-wrap" id="cookie" hidden><div class="cookie" role="dialog" aria-modal="true" aria-labelledby="cookie-title">' +
      '<div class="cookie-main">' +
        '<b id="cookie-title">Darf erstebude.ch messen?</b>' +
        '<p>Mit deiner Zustimmung messen wir mit Google Analytics, welche Inhalte dir helfen, und mit Google Ads, ob unsere Anzeigen funktionieren. Ohne Zustimmung messen wir nichts, die Seite funktioniert trotzdem vollständig. Deine Wahl kannst du jederzeit unter «Cookie-Einstellungen» im Footer ändern. <a href="' + ROOT + 'datenschutz">Mehr in der Datenschutzerklärung</a></p>' +
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
    '</div></div>';
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
    document.documentElement.classList.add('cookie-open');
  }
  function decide(s) {
    var before = state;
    set(s);
    el('cookie').hidden = true;
    document.documentElement.classList.remove('cookie-open');
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
  var prose = document.querySelector('.prose[data-article]');
  if (prose) document.body.setAttribute('data-article', prose.getAttribute('data-article'));
  if (h) h.outerHTML = headerHTML(page);

  /* Übersicht aller Artikel links neben dem Artikel */
  if (prose) {
    var lay = document.createElement('div'); lay.className = 'art-layout';
    prose.parentNode.insertBefore(lay, prose);
    var side = document.createElement('aside'); side.className = 'art-nav'; side.setAttribute('aria-label', 'Alle Artikel');
    side.innerHTML = '<div class="art-nav-in"><b class="art-nav-t">Alle Artikel</b>' + etappenHTML(prose.getAttribute('data-article')) +
      '<div class="et"><span class="et-head">Hilfsmittel</span><ul><li><a href="' + ROOT + 'checkliste">Checkliste</a></li><li><a href="' + ROOT + 'vorlagen">Gratis Vorlagen</a></li></ul></div></div>';
    lay.appendChild(side); lay.appendChild(prose);
  }

  /* Wegweiser-Menü: Klick auf den Pfeil (Touch, Tastatur) */
  var dropBtn = document.querySelector('.drop-btn');
  if (dropBtn) {
    dropBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var o = dropBtn.parentNode.classList.toggle('open');
      dropBtn.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-drop')) { dropBtn.parentNode.classList.remove('open'); dropBtn.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { dropBtn.parentNode.classList.remove('open'); dropBtn.setAttribute('aria-expanded', 'false'); }
    });
  }
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
      EB.track(a.getAttribute('data-track'), { link_text: a.textContent.trim().slice(0, 80), link_url: a.getAttribute('href'), placement: a.getAttribute('data-where') || page });
    } else if (/^https?:/.test(a.getAttribute('href') || '') && a.hostname !== location.hostname) {
      EB.track('outbound_click', { link_url: a.href, link_domain: a.hostname });
    }
  });

  /* Durchsuchbare Liste (Wohnungsbörsen) */
  document.querySelectorAll('[data-filter]').forEach(function (box) {
    var input = box.querySelector('[data-filter-input]'), rows = box.querySelectorAll('[data-filter-row]');
    var count = box.querySelector('[data-filter-count]'), empty = box.querySelector('[data-filter-empty]'), timer;
    function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
    function run() {
      var q = norm(input.value.trim()), n = 0;
      rows.forEach(function (r) { var hit = !q || q.split(/\s+/).every(function (w) { return norm(r.textContent).indexOf(w) > -1; }); r.hidden = !hit; if (hit) n++; });
      count.textContent = q ? n + ' von ' + rows.length + ' Angeboten' : rows.length + ' Angebote';
      empty.hidden = n > 0;
    }
    input.addEventListener('input', function () {
      run(); clearTimeout(timer);
      timer = setTimeout(function () { if (input.value.trim().length > 1) EB.track('search', { search_term: input.value.trim().slice(0, 60), list: 'wohnungsboersen' }); }, 1200);
    });
    run();
  });

  /* Artikel zu Ende gelesen (GA4-Event, nur mit Einwilligung) */
  var endMark = document.querySelector('[data-article-end]'), art = document.querySelector('[data-article]');
  if (endMark && art && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { EB.track('article_read_end', { article: art.getAttribute('data-article') }); io.disconnect(); }
    });
    io.observe(endMark);
  }

  /* Zügelplaner: rechnet ab dem Zügeltag rückwärts (nur im Browser) */
  var form = document.querySelector('[data-planer]');
  if (form) {
    var TASKS = [
      [-42, 'Transporter reservieren, Helfer und Freunde anfragen, frei nehmen'],
      [-28, 'Kartons besorgen, Internet bestellen, ausmisten'],
      [-14, 'Nachsendeauftrag einrichten, neue Adresse melden, Parkplatz klären'],
      [-7, 'Packen, Kisten beschriften, Essen für die Helfer planen'],
      [0, 'Schweres zuerst laden, Möbel sichern, Übergabe: jeden Mangel ins Protokoll, Zählerstände fotografieren'],
      [14, 'Spätestens jetzt bei der neuen Gemeinde anmelden (Art. 11 RHG), Mängel schriftlich nachreichen']
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
      var today = new Date(); today.setHours(12, 0, 0, 0);
      var days = Math.round((day - today) / 86400000), warn = document.querySelector('[data-plan-warn]');
      plan.forEach(function (p, i) { if (p.d < today) list.children[i].classList.add('late'); });
      if (warn) {
        if (days < 0) warn.textContent = 'Dieses Datum liegt in der Vergangenheit. Wähl deinen kommenden Zügeltag.';
        else if (days < 42) warn.textContent = 'Achtung: Dein Zügeltag ist schon in ' + (days === 1 ? 'einem Tag' : days + ' Tagen') + '. Der Plan rechnet mit 6 Wochen Vorlauf. Die grau markierten Punkte sind schon vorbei: Erledige sie so bald wie möglich, vor allem Transporter und Helfer.';
        warn.hidden = days >= 42;
      }
      list.hidden = false; actions.hidden = false;
      EB.track('zuegelplan_erstellt', { tage_bis_zuegeltag: days });
    });
    document.querySelector('[data-ics]').addEventListener('click', function () {
      function ymd(d) { return d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2); }
      var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//erstebude.ch//Zuegelplan//DE'];
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
