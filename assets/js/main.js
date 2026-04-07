/**
 * main.js — Azabell1993.github.io
 *
 * Minimal JavaScript:
 *  1. Mark the active navigation link based on current URL path.
 *  2. Toggle the mobile navigation menu (hamburger).
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1. Active navigation link
     Sets aria-current="page" on the nav link matching the current
     path so the CSS can highlight it.
  ---------------------------------------------------------------- */
  var path = window.location.pathname;

  document.querySelectorAll('.site-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;

    var isHome    = href === '/';
    var isMatch   = isHome ? path === '/' : path === href || path.startsWith(href);

    if (isMatch) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ----------------------------------------------------------------
     2. Mobile navigation toggle
     Toggles `.is-open` on #site-nav and updates aria-expanded.
  ---------------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav    = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close the menu if the user clicks outside the header */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

})();
