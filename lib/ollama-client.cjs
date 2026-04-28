'use strict';
const fs = require('fs'); const path = require('path');
const ENV_PATH = path.join(__dirname, '..', '.env');
if (fs.existsSync(ENV_PATH)) for (const line of fs.readFileSync(ENV_PATH, 'utf8').split('\n')) {
  if (!line || line.startsWith('#') || !line.includes('=')) continue;
  const [k, ...v] = line.split('='); if (k.trim() && !process.env[k.trim()]) process.env[k.trim()] = v.join('=').trim();
}
const BASE = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const PRIMARY = process.env.TIER1_MODEL || 'qwen3:32b';
async function callOllama(model, system, prompt, opts = {}) {
  const started = Date.now(); const m = model || PRIMARY;
  const body = { model: m,
    messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: prompt }],
    stream: false, options: { temperature: opts.temperature ?? 0.7, num_predict: opts.max_tokens ?? 1024 } };
  const res = await fetch(`${BASE}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body), signal: AbortSignal.timeout(opts.timeout ?? 120000) });
  if (!res.ok) throw new Error(`ollama ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  return { text: (j.message?.content || '').trim(), model: j.model || m,
    usage: { prompt_tokens: j.prompt_eval_count, completion_tokens: j.eval_count }, latency_ms: Date.now() - started };
}
async function probeHealth() {
  const started = Date.now();
  try {
    const res = await fetch(`${BASE}/api/tags`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return { ok: false, ts: Date.now(), reason: `tags ${res.status}`, latency_ms: Date.now() - started };
    const j = await res.json();
    const found = (j.models || []).some(m => m.name === PRIMARY);
    return { ok: found, ts: Date.now(), reason: found ? null : `model ${PRIMARY} not pulled`, latency_ms: Date.now() - started };
  } catch (e) { return { ok: false, ts: Date.now(), reason: e.message, latency_ms: Date.now() - started }; }
}
module.exports = { callOllama, probeHealth, PRIMARY, BASE };
