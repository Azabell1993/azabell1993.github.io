#!/usr/bin/env node
/**
 * scripts/cache-bust.js
 *
 * Appends ?v=<git-short-hash> (or a timestamp fallback) to every
 * local CSS and JS reference inside all HTML files in the project.
 *
 * Usage:
 *   node scripts/cache-bust.js          # auto version from git
 *   node scripts/cache-bust.js 20260408 # explicit version string
 *
 * Run this once before each deployment (or wire it to `npm run deploy`).
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── 1. Resolve version string ────────────────────────────────────────────────
const version = process.argv[2] || (function () {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['pipe', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch (_) {
    // Not a git repo or git not available — use a compact timestamp
    return Date.now().toString(36);
  }
})();

// ── 2. Collect all HTML files ────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');

function collectHtml(dir, results) {
  results = results || [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'scripts') return;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtml(full, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = collectHtml(ROOT);

// ── 3. Replace / insert ?v= on local asset references ────────────────────────
// Matches href="...local-path.css[?anything]" and src="...local-path.js[?anything]"
// Only touches paths that do NOT start with http/https to leave CDN links untouched.
const CSS_RE  = /(href="(?!https?:\/\/)[^"]+\.css)(?:\?[^"]*)?"/g;
const JS_RE   = /(src="(?!https?:\/\/)[^"]+\.js)(?:\?[^"]*)?"/g;

let totalUpdated = 0;

htmlFiles.forEach(function (file) {
  const original = fs.readFileSync(file, 'utf8');
  const updated  = original
    .replace(CSS_RE, '$1?v=' + version + '"')
    .replace(JS_RE,  '$1?v=' + version + '"');

  if (updated !== original) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log('  updated  ' + path.relative(ROOT, file));
    totalUpdated++;
  } else {
    console.log('  no change ' + path.relative(ROOT, file));
  }
});

console.log('\nCache-bust complete.  version=' + version + '  files changed=' + totalUpdated);
