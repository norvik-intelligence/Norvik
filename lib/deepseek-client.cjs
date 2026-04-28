'use strict';
const fs = require('fs'); const path = require('path');
const ENV_PATH = path.join(__dirname, '..', '.env');
if (fs.existsSync(ENV_PATH)) for (const line of fs.readFileSync(ENV_PATH, 'utf8').split('\n')) {
  if (!line || line.startsWith('#') || !line.includes('=')) continue;
  const [k, ...v] = line.split('='); if (k.trim() && !process.env[k.trim()]) process.env[k.trim()] = v.join('=').trim();
}
const BASE = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';
const PRIMARY = process.env.TIER2_MODEL || 'deepseek-v4-pro';
const FALLBACK = process.env.TIER2_FALLBACK_MODEL || 'deepseek-v4-flash';
function getKey() { const k = process.env.DEEPSEEK_API_KEY; if (!k) throw new Error('DEEPSEEK_API_KEY not set'); return k; }
async function callDeepSeek(model, system, prompt, opts = {}) {
  const started = Date.now(); const m = model || PRIMARY;
  const inputSize = (system?.length || 0) + (prompt?.length || 0);
  const autoTimeout = Math.min(300000, 90000 + Math.floor(inputSize / 1000) * 1000);
  const timeoutMs = opts.timeout ?? autoTimeout; const maxRetries = opts.retries ?? 1;
  const body = { model: m,
    messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: prompt }],
    max_tokens: opts.max_tokens ?? 1024, temperature: opts.temperature ?? 0.7, stream: false };
  let lastErr;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`${BASE}/chat/completions`, { method: 'POST',
        headers: { 'Authorization': `Bearer ${getKey()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body), signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        const retryable = [429, 502, 503, 504].includes(res.status);
        const err = new Error(`deepseek ${res.status}: ${errText.slice(0, 300)}`);
        if (retryable && attempt < maxRetries) { lastErr = err; await new Promise(r => setTimeout(r, 1500 * (attempt + 1))); continue; }
        throw err;
      }
      const j = await res.json(); const choice = j.choices?.[0];
      return { text: (choice?.message?.content || '').trim(), model: j.model || m, usage: j.usage,
        finish_reason: choice?.finish_reason, reasoning: choice?.message?.reasoning_content || null,
        latency_ms: Date.now() - started, attempts: attempt + 1 };
    } catch (e) {
      const isTimeout = e.name === 'TimeoutError' || /aborted|timeout/i.test(e.message);
      if (isTimeout && attempt < maxRetries) { lastErr = e; await new Promise(r => setTimeout(r, 1500)); continue; }
      throw e;
    }
  }
  throw lastErr || new Error('deepseek call failed');
}
async function probeHealth() {
  const started = Date.now();
  try {
    if (!process.env.DEEPSEEK_API_KEY) return { ok: false, ts: Date.now(), reason: 'no key', latency_ms: 0 };
    const res = await fetch(`${BASE}/models`, { method: 'GET', headers: { 'Authorization': `Bearer ${getKey()}` },
      signal: AbortSignal.timeout(15000) });
    if (!res.ok) return { ok: false, ts: Date.now(), reason: `models ${res.status}`, latency_ms: Date.now() - started };
    return { ok: true, ts: Date.now(), latency_ms: Date.now() - started };
  } catch (e) { return { ok: false, ts: Date.now(), reason: e.message, latency_ms: Date.now() - started }; }
}
module.exports = { callDeepSeek, probeHealth, PRIMARY, FALLBACK, BASE };
