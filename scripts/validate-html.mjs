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

if (!DIALER_HTML.includes('id="authLoginOverlay" class="auth-overlay')) {
  throw new Error('[dialer] Login overlay element or base class is missing');
}

const workerSource = fs.readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
if (!DIALER_HTML.includes('id="dbSubAccountGroupNameInput"') ||
    !DIALER_HTML.includes('id="dbCreateGroupBtn"') ||
    !DIALER_HTML.includes('id="dbCreateMemberBtn"') ||
    !DIALER_HTML.includes('class="sub-group-select"') ||
    !DIALER_HTML.includes('group_name: role === "manager"')) {
  throw new Error('[dialer] Named group creation or member reassignment controls are missing');
}
if (!workerSource.includes("var requestedRole=String(body.role||'member')") ||
    !workerSource.includes("if(requestedRole==='manager'&&!groupName)") ||
    !workerSource.includes("group_name:role==='manager'?groupName:''") ||
    !workerSource.includes("target.parent_account_id=p")) {
  throw new Error('[worker] Named group creation, leader creation, or group reassignment logic is missing');
}

console.log(`Validated ${pages.length} HTML pages and ${checkedScripts} inline browser scripts.`);
