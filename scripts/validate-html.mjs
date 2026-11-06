import fs from 'node:fs';
import vm from 'node:vm';
import { DIALER_HTML } from '../src/dialer_html.js';
import { DIET_HTML } from '../src/diet_html.js';
import { LEARN_HTML } from '../src/learn_html.js';

const pages = [
  ['dialer', DIALER_HTML],
  ['diet', DIET_HTML],
  ['learn', LEARN_HTML],
];

let checkedScripts = 0;

for (const [name, html] of pages) {
  if (typeof html !== 'string' || !html.includes('<!DOCTYPE html')) {
    throw new Error(`[${name}] HTML export is missing or invalid`);
  }

  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  for (let i = 0; i < scripts.length; i++) {
    const [, attrs, code] = scripts[i];
    if (/\bsrc\s*=/.test(attrs) || !code.trim()) continue;
    new vm.Script(code, { filename: `${name}-inline-${i}.js` });
    checkedScripts++;
  }
}

if (!DIALER_HTML.includes('id="authLoginOverlay"') ||
    !DIALER_HTML.includes('id="globalWallpaper"') ||
    !DIALER_HTML.includes('id="bootFallbackNotice"')) {
  throw new Error('[dialer] Critical first-screen fallback elements are missing');
}

if (!DIALER_HTML.includes('class="auth-overlay"') ||
    DIALER_HTML.includes('id="authLoginOverlay" class="auth-overlay auth-hidden"')) {
  throw new Error('[dialer] Login overlay must remain visible until JavaScript initializes');
}

console.log(`Validated ${pages.length} HTML pages and ${checkedScripts} inline browser scripts.`);
