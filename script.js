/* ==========================================================================
   ErsteBude.ch – script.js
   1. Einstellungen (Tracking-IDs)        ← hier IDs eintragen
   2. Header, Footer, Cookie-Banner       ← Menü und Footer nur hier ändern
   3. Einwilligung und Tracking
   4. Menü, Checkliste, Klick-Events
   ========================================================================== */

/* 1. EINSTELLUNGEN ---------------------------------------------------------
   IDs zwischen die Anführungszeichen schreiben. Leer = Tool ist aus.
   Sobald mindestens eine ID drin ist, erscheint der Cookie-Banner. */
var EB_CONFIG = {
  ga4_id: "",                     // Google Analytics 4, z.B. "G-AB12CD34EF"
  google_ads_id: "",              // Google Ads, z.B. "AW-123456789"
  google_ads_download_label: "",  // Conversion-Label für den Download der Vorlage
  meta_pixel_id: ""               // Meta Pixel, nur Zahlen, z.B. "1234567890"
};

/* Pfad zum Hauptordner (funktioniert auf Unterseiten wie artikel/…) */
var ROOT = (document.currentScript && document.currentScript.getAttribute('src') || 'script.js').replace(/script\.js.*$/, '');

/* 2. HEADER, FOOTER, COOKIE-BANNER ---------------------------------------- */
var NAV = [
  ['wegweiser', 'wegweiser.html', 'Wegweiser'],
  ['checkliste', 'checkliste.html', 'Checkliste'],
  ['vorlage', 'artikel/bewerbungsdossier-wohnung-vorlage.html', 'Dossier-Vorlage'],
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
      '<div class="flogo"><img src="' + ROOT + 'img/logo/erstebude_logo_slogan_gestapelt_weiss.svg" alt="ErsteBude.ch – Dein Wegweiser zur ersten eigenen Wohnung" width="220" height="124" loading="lazy"></div>' +
      '<div><h2>Wegweiser</h2><ul>' +
        '<li><a href="' + ROOT + 'suchen.html">1 · Suchen</a></li>' +
        '<li><a href="' + ROOT + 'bewerben.html">2 · Bewerben</a></li>' +
        '<li><a href="' + ROOT + 'kosten.html">3 · Kosten</a></li>' +
        '<li><a href="' + ROOT + 'zuegeln.html">4 · Zügeln</a></li></ul></div>' +
      '<div><h2>Hilfsmittel</h2><ul>' +
        '<li><a href="' + ROOT + 'artikel/bewerbungsdossier-wohnung-vorlage.html">Dossier-Vorlage</a></li>' +
        '<li><a href="' + ROOT + 'checkliste.html">Checkliste</a></li>' +
        '<li><a href="' + ROOT + 'artikel/erste-eigene-wohnung-tipps.html">10 Tipps</a></li></ul></div>' +
      '<div><h2>ErsteBude.ch</h2><ul>' +
        '<li><a href="' + ROOT + 'ueber-uns.html">Über uns</a></li>' +
        '<li><a href="' + ROOT + 'impressum.html">Impressum</a></li>' +
        '<li><a href="' + ROOT + 'datenschutz.html">Datenschutz</a></li>' +
        '<li><button class="linklike" type="button" data-consent-open>Cookie-Einstellungen</button></li></ul></div>' +
      '<div class="legal"><span>Ein Studierendenprojekt im Modul Digital Marketing, FH Graubünden · ' + y + '</span>' +
        '<span>Keine Rechtsberatung. Bei Fragen zum Mietrecht hilft der Mieterinnen- und Mieterverband.</span></div>' +
    '</div></footer>' +
    '<div class="cookie" id="cookie" role="dialog" aria-labelledby="cookie-title" hidden>' +
      '<b id="cookie-title">Kurz zu Cookies</b>' +
      '<span>Mit deiner Zustimmung messen wir mit Google Analytics, Google Ads und dem Meta Pixel, welche Inhalte helfen und wie gut unsere Anzeigen funktionieren. Ohne Zustimmung wird nichts gemessen. <a href="' + ROOT + 'datenschutz.html">Mehr dazu</a></span>' +
      '<div class="row"><button class="btn btn-p" type="button" id="cookie-yes">Einverstanden</button>' +
      '<button class="btn btn-s" type="button" id="cookie-no">Nur notwendige</button></div>' +
    '</div>';
}

/* 3. EINWILLIGUNG UND TRACKING ---------------------------------------------
   Google Consent Mode v2: Standard = "denied". Tracking-Skripte laden erst
   nach Klick auf "Einverstanden". */
var EB = (function () {
  var C = EB_CONFIG, KEY = 'eb-consent-v1', loaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });
  var hasTracking = !!(C.ga4_id || C.google_ads_id || C.meta_pixel_id);

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function load() {
    if (loaded || !hasTracking) return;
    loaded = true;
    gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
    var first = C.ga4_id || C.google_ads_id;
    if (first) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(first);
      document.head.appendChild(s);
      gtag('js', new Date());
      if (C.ga4_id) gtag('config', C.ga4_id);
      if (C.google_ads_id) gtag('config', C.google_ads_id);
    }
    if (C.meta_pixel_id) {
      /* Offizielles Meta-Pixel-Snippet */
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', C.meta_pixel_id);
      window.fbq('track', 'PageView');
    }
  }

  function banner(show) { var b = document.getElementById('cookie'); if (b) b.hidden = !show; }

  function init() {
    var choice = get();
    if (choice === 'granted') load();
    if (hasTracking && !choice) banner(true);
    var yes = document.getElementById('cookie-yes'), no = document.getElementById('cookie-no');
    if (yes) yes.addEventListener('click', function () { set('granted'); banner(false); load(); });
    if (no) no.addEventListener('click', function () { set('denied'); banner(false); if (loaded) location.reload(); });
    document.querySelectorAll('[data-consent-open]').forEach(function (el) { el.addEventListener('click', function () { banner(true); }); });
  }

  return {
    init: init,
    /* Event an GA4, z.B. EB.track('checklist_check', {item: 'dossier'}) */
    track: function (name, params) { if (loaded && C.ga4_id) gtag('event', name, params || {}); },
    /* Download der Vorlage = Conversion in GA4, Google Ads und Meta */
    conversion: function (params) {
      if (!loaded) return;
      if (C.ga4_id) gtag('event', 'generate_lead', params || {});
      if (C.google_ads_id && C.google_ads_download_label) gtag('event', 'conversion', { send_to: C.google_ads_id + '/' + C.google_ads_download_label });
      if (C.meta_pixel_id && window.fbq) window.fbq('track', 'Lead', params || {});
    }
  };
})();

/* 4. MENÜ, CHECKLISTE, KLICK-EVENTS ---------------------------------------- */
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
      if (scope === 'all') { total = +wrap.getAttribute('data-total'); n = done; }
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
  update();

  /* Klick-Events: Download der Vorlage und markierte Buttons (data-track) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (a.hasAttribute('data-download')) {
      var file = a.getAttribute('data-download');
      EB.track('file_download_vorlage', { file_name: file });
      EB.conversion({ content_name: file });
    } else if (a.hasAttribute('data-track')) {
      EB.track(a.getAttribute('data-track'), { link_text: a.textContent.trim().slice(0, 80), link_url: a.getAttribute('href') });
    }
  });
});
