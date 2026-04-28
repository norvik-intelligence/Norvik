'use strict';
const fs = require('fs'); const path = require('path');
const { callOllama, probeHealth: probeT1, PRIMARY: T1 } = require('./ollama-client.cjs');
const { callDeepSeek, probeHealth: probeT2, PRIMARY: T2, FALLBACK: T2_FB } = require('./deepseek-client.cjs');
const { callAnthropic, probeHealth: probeT3, PRIMARY: T3 } = require('./anthropic-client.cjs');
const { verifyOutput } = require('./deepseek-verify.cjs');
const { logSoftFailure } = require('./soft-failure.cjs');

const ENV_PATH = path.join(__dirname, '..', '.env');
if (fs.existsSync(ENV_PATH)) for (const line of fs.readFileSync(ENV_PATH, 'utf8').split('\n')) {
  if (!line || line.startsWith('#') || !line.includes('=')) continue;
  const [k, ...v] = line.split('='); if (k.trim() && !process.env[k.trim()]) process.env[k.trim()] = v.join('=').trim();
}

const USAGE_LOG = path.join(__dirname, '..', 'memory', 'tier-usage.jsonl');
const WINDOW = parseInt(process.env.QUOTA_WINDOW_SIZE || '50', 10);
const TARGETS = {
  chat: parseFloat(process.env.QUOTA_TARGET_CHAT || '0.30'),
  cheap: parseFloat(process.env.QUOTA_TARGET_CHEAP || '0.40'),
  precision: parseFloat(process.env.QUOTA_TARGET_PRECISION || '0.30'),
};
const TOLERANCE = parseFloat(process.env.QUOTA_TOLERANCE || '0.10');

const HARD_FLOOR = new Set(['identity_audit','self_modification','phenomenology','architectural_decision','author_voice','high_stakes_review']);
const CHAT_P = new Set(['greeting','echo','classify','label','json_reformat','template_slot_fill','dedup','hash_match']);
const CHEAP_P = new Set(['summarize','summary','enrich','reflexion_first_pass','kg_titling','embedding_title','compact_memory','long_context_analysis','codebase_analysis','research_synthesis']);
const CHAT_F = new Set(['chat','light','cheap','mechanical']);
const CHEAP_F = new Set(['deepseek','cheap_reasoning','long_context']);

function classifyTask({ purpose, prompt, flags = [] }) {
  if (purpose && HARD_FLOOR.has(purpose)) return 'precision';
  if (flags.some(f => CHAT_F.has(f))) return 'chat';
  if (flags.some(f => CHEAP_F.has(f))) return 'cheap';
  if (purpose && CHAT_P.has(purpose)) return 'chat';
  if (purpose && CHEAP_P.has(purpose)) return 'cheap';
  if (typeof prompt === 'string' && prompt.length < 40 && /^(hi|hello|hey|thanks|thank you|ok|yes|no|sure)\b/i.test(prompt.trim())) return 'chat';
  return 'precision';
}

function readWindow() {
  if (!fs.existsSync(USAGE_LOG)) return [];
  return fs.readFileSync(USAGE_LOG, 'utf8').split('\n').filter(Boolean).slice(-WINDOW)
    .map(l => { try { return JSON.parse(l); } catch (_) { return null; } }).filter(Boolean);
}

function applyQuota(cls, isHardFloor) {
  if (isHardFloor) return cls;
  const w = readWindow(); if (w.length < 10) return cls;
  const counts = { chat: 0, cheap: 0, precision: 0 };
  for (const e of w) if (counts[e.class] !== undefined) counts[e.class]++;
  const total = w.length;
  const ratios = { chat: counts.chat/total, cheap: counts.cheap/total, precision: counts.precision/total };
  const overBy = (c) => ratios[c] - TARGETS[c];
  if (overBy(cls) > TOLERANCE) {
    const target = Object.keys(ratios).sort((a,b) => overBy(a) - overBy(b))[0];
    if (target !== cls) return target;
  }
  return cls;
}

async function dispatch(cls, system, prompt, opts) {
  if (cls === 'chat') {
    try { return { ...(await callOllama(T1, system, prompt, opts)), tier: 1, class: 'chat' }; }
    catch (e) { logSoftFailure('tier1', e, { prompt: prompt.slice(0,100) }); return dispatch('cheap', system, prompt, opts); }
  }
  if (cls === 'cheap') {
    try {
      const r = await callDeepSeek(T2, system, prompt, opts);
      return { ...r, tier: 2, class: 'cheap', verification_flags: verifyOutput(r.text) };
    } catch (e) {
      logSoftFailure('tier2-pro', e, { prompt: prompt.slice(0,100) });
      try {
        const r = await callDeepSeek(T2_FB, system, prompt, opts);
        return { ...r, tier: 2, class: 'cheap', fallback: true, verification_flags: verifyOutput(r.text) };
      } catch (e2) {
        logSoftFailure('tier2-flash', e2, { prompt: prompt.slice(0,100) });
        return dispatch('precision', system, prompt, opts);
      }
    }
  }
  try { return { ...(await callAnthropic(T3, system, prompt, opts)), tier: 3, class: 'precision' }; }
  catch (e) { logSoftFailure('tier3', e, { prompt: prompt.slice(0,100) }); throw e; }
}

async function ask({ purpose, prompt, system, flags = [], ...opts }) {
  const classified = classifyTask({ purpose, prompt, flags });
  const isHF = purpose && HARD_FLOOR.has(purpose);
  const final = applyQuota(classified, isHF);
  const result = await dispatch(final, system, prompt, opts);
  const entry = { ts: new Date().toISOString(), purpose: purpose || null, classified, class: result.class,
    tier: result.tier, model: result.model, latency_ms: result.latency_ms, prompt_chars: (prompt || '').length,
    usage: result.usage || null, fallback: result.fallback || false, verification_flags: result.verification_flags || null };
  try { fs.appendFileSync(USAGE_LOG, JSON.stringify(entry) + '\n'); } catch (_) {}
  return result;
}

async function ping() {
  const [t1,t2,t3] = await Promise.all([probeT1(), probeT2(), probeT3()]);
  return { tier1: t1, tier2: t2, tier3: t3 };
}

module.exports = { ask, ping, classifyTask, applyQuota };

if (require.main === module) {
  const [, , mode, ...rest] = process.argv;
  if (mode === 'ping') ping().then(r => { console.log(JSON.stringify(r,null,2)); process.exit(0); });
  else if (mode === 'ask') ask({ prompt: rest.join(' ') })
    .then(r => { console.log(JSON.stringify({ tier: r.tier, model: r.model, latency_ms: r.latency_ms, text: r.text },null,2)); process.exit(0); })
    .catch(e => { console.error('ERR:', e.message); process.exit(1); });
  else { console.log('Usage: node lib/tiered-ask.cjs <ping|ask> "<prompt>"'); process.exit(1); }
}
