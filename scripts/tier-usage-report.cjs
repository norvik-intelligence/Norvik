'use strict';
const fs = require('fs'); const path = require('path');
const LOG = path.join(__dirname, '..', 'memory', 'tier-usage.jsonl');
if (!fs.existsSync(LOG)) { console.log('No tier-usage log yet.'); process.exit(0); }
const entries = fs.readFileSync(LOG, 'utf8').split('\n').filter(Boolean)
  .map(l => { try { return JSON.parse(l); } catch (_) { return null; } }).filter(Boolean);
const N = parseInt(process.argv[2] || '100', 10);
const w = entries.slice(-N);
const by = { chat: 0, cheap: 0, precision: 0 }; const models = {};
let totalLatency = 0, fallbacks = 0, flagged = 0;
for (const e of w) {
  if (by[e.class] !== undefined) by[e.class]++;
  models[e.model] = (models[e.model] || 0) + 1;
  totalLatency += e.latency_ms || 0;
  if (e.fallback) fallbacks++;
  if (Array.isArray(e.verification_flags) && e.verification_flags.length) flagged++;
}
const total = w.length || 1;
console.log(`Last ${total} calls:\n`);
console.log(`  chat       ${(by.chat/total*100).toFixed(1)}%  (target 30% ±10%)`);
console.log(`  cheap      ${(by.cheap/total*100).toFixed(1)}%  (target 40% ±10%)`);
console.log(`  precision  ${(by.precision/total*100).toFixed(1)}%  (target 30% ±10%)`);
console.log(`\nAvg latency: ${(totalLatency/total).toFixed(0)}ms`);
console.log(`Fallbacks: ${fallbacks}  |  Verification-flagged: ${flagged}`);
console.log(`\nBy model:`);
for (const [m,c] of Object.entries(models).sort((a,b) => b[1]-a[1])) console.log(`  ${m.padEnd(28)} ${c}`);
