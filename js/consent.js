/*
 * Cookie consent + Google Consent Mode v2.
 *
 * Load this file WITHOUT async/defer, BEFORE the Google tag (gtag.js) on every
 * page that has one. It sets every Google storage type to "denied" first, so
 * Google Ads / Analytics set no cookies until the visitor clicks "Accept".
 * Without consent Google only receives cookieless pings (Consent Mode "advanced").
 *
 * Any element with a data-cookie-settings attribute reopens the banner.
 */
(function () {
  var KEY = 'mat_cookie_consent';
  var MAX_AGE = 365 * 24 * 60 * 60 * 1000; // ask again after 12 months

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);

  function readChoice() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(KEY));
      if (saved && (saved.choice === 'granted' || saved.choice === 'denied') &&
          Date.now() - saved.time < MAX_AGE) {
        return saved.choice;
      }
    } catch (e) { /* storage blocked or corrupt: ask again */ }
    return null;
  }

  function saveChoice(choice) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ choice: choice, time: Date.now() }));
    } catch (e) { /* storage blocked: choice applies to this page only */ }
  }

  function applyChoice(choice) {
    var value = choice === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value
    });
  }

  // Remove Google cookies already set, e.g. when someone accepts and later rejects.
  function clearGoogleCookies() {
    var host = window.location.hostname;
    var root = host.replace(/^www\./, '');
    var domains = ['', host, '.' + host, root, '.' + root];
    document.cookie.split(';').forEach(function (part) {
      var name = part.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl|_gac)/.test(name)) return;
      domains.forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  function closeBanner() {
    var box = document.getElementById('cc-banner');
    if (box) box.parentNode.removeChild(box);
  }

  function choose(choice) {
    saveChoice(choice);
    applyChoice(choice);
    if (choice === 'denied') clearGoogleCookies();
    closeBanner();
  }

  function showBanner() {
    if (document.getElementById('cc-banner')) return;
    var box = document.createElement('div');
    box.id = 'cc-banner';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Cookie choice');
    box.innerHTML =
      '<p>We use Google cookies to measure our ads and website visits. ' +
      'They are only set if you accept. ' +
      '<a href="privacy-policy.html#cookies">Privacy policy</a></p>' +
      '<div class="cc-buttons">' +
      '<button type="button" class="cc-reject">Reject</button>' +
      '<button type="button" class="cc-accept">Accept</button>' +
      '</div>';
    box.querySelector('.cc-accept').addEventListener('click', function () { choose('granted'); });
    box.querySelector('.cc-reject').addEventListener('click', function () { choose('denied'); });
    document.body.appendChild(box);
  }

  var saved = readChoice();
  if (saved) applyChoice(saved);

  function init() {
    if (!saved) showBanner();
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest && event.target.closest('[data-cookie-settings]');
      if (!trigger) return;
      event.preventDefault();
      showBanner();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
