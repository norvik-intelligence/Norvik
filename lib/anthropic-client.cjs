'use strict';
const fs = require('fs'); const path = require('path');
const ENV_PATH = path.join(__dirname, '..', '.env');
if (fs.existsSync(ENV_PATH)) for (const line of fs.readFileSync(ENV_PATH, 'utf8').split('\n')) {
  if (!line || line.startsWith('#') || !line.includes('=')) continue;
  const [k, ...v] = line.split('='); if (k.trim() && !process.env[k.trim()]) process.env[k.trim()] = v.join('=').trim();
}
const BASE = 'https://api.anthropic.com/v1';
const PRIMARY = process.env.TIER3_MODEL || 'claude-opus-4-7';
function getKey() { const k = process.env.ANTHROPIC_API_KEY; if (!k) throw new Error('ANTHROPIC_API_KEY not set'); return k; }
async function callAnthropic(model, system, prompt, opts = {}) {
  const started = Date.now(); const m = model || PRIMARY;
  const body = { model: m, max_tokens: opts.max_tokens ?? 1024, temperature: opts.temperature ?? 0.7,
    system: system || undefined, messages: [{ role: 'user', content: prompt }] };
  const res = await fetch(`${BASE}/messages`, { method: 'POST',
    headers: { 'x-api-key': getKey(), 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
    body: JSON.stringify(body), signal: AbortSignal.timeout(opts.timeout ?? 120000) });
  if (!res.ok) throw new Error(`anthropic ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = await res.json();
  const text = (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('').trim();
  return { text, model: j.model || m, usage: j.usage, stop_reason: j.stop_reason, latency_ms: Date.now() - started };
}
async function probeHealth() {
  const started = Date.now();
  try {
    if (!process.env.ANTHROPIC_API_KEY) return { ok: false, ts: Date.now(), reason: 'no key', latency_ms: 0 };
    const r = await callAnthropic(PRIMARY, null, 'ping', { max_tokens: 5, timeout: 15000 });
    return { ok: !!r.text, ts: Date.now(), latency_ms: Date.now() - started };
  } catch (e) { return { ok: false, ts: Date.now(), reason: e.message, latency_ms: Date.now() - started }; }
}
module.exports = { callAnthropic, probeHealth, PRIMARY, BASE };
