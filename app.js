/* إعلان أوكسيرا التفاعلي — منطق التجربة
 * لا يعتمد على أي إطار عمل. كل المحتوى والروابط في config.js.
 */
(() => {
'use strict';
const C = window.OXCIRA_CONFIG;
const L = C.links;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- أيقونات ---------- */
const P = {
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z"/>',
  msg:'<path d="M12 3c5 0 9 3.4 9 7.6s-4 7.6-9 7.6c-1 0-2-.1-2.9-.4L4 20l1.3-3.7C3.9 15 3 13 3 10.6 3 6.4 7 3 12 3z"/>',
  back:'<path d="m9 5 7 7-7 7"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>',
  ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  store:'<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5V20h16V9.5M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M10 20v-5h4v5"/>',
  route:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4.5l2 2.5H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  note:'<path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 8h8M8 12h8M8 16h5"/>',
  gear:'<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M8 14h2M14 14h2M8 17.5h2"/>',
  insta:'<rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
  tree:'<path d="M12 3v18M12 8.5 6.5 3.5M12 8.5l5.5-5M12 8.5 4 10M12 8.5l8 1.5M12 13l-6 5M12 13l6 5"/>',
  wa:'<path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.1z"/><path d="M9 8.2c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.5l.8 1.8c.1.2.1.4 0 .6l-.6.8c-.1.2-.2.3 0 .6.5.9 1.4 1.8 2.4 2.3.3.2.5.1.6 0l.8-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.3.2.3.4 0 .9-.6 1.8-1.6 2-1 .2-2.6-.1-4.6-1.8-1.6-1.4-2.7-3.1-2.9-4-.2-.9 0-1.8.3-2.5z" fill="currentColor" stroke="none"/>',
  vol:'<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  mute:'<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m23 9-6 6M17 9l6 6"/>',
  min:'<path d="m6 9 6 6 6-6"/>',
  play:'<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
  download:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  up:'<path d="m6 15 6-6 6 6"/>',
  lock:'<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  missed:'<path d="M3 7l6 6 4-4 6 6M19 11v4h-4"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  torch:'<path d="M8 2h8v4l-2 4v11a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V10L8 6z"/><path d="M12 13v2"/>',
  camera:'<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
  arrowUp:'<path d="M12 19V5M6 11l6-6 6 6"/>'
};
const ico = (n, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${P[n] || ''}</svg>`;
const xLogo = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>';
const flower = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ['#f06d5f','#eda14e','#dfbe4b','#6cb760','#5dadd1','#9e83c6'].map((c, i) => `<ellipse cx="12" cy="6.6" rx="3.2" ry="5" fill="${c}" opacity=".92" transform="rotate(${i*60} 12 12)"/>`).join('') + '</svg>';

/* ---------- تخزين آمن ---------- */
const mem = {};
let storageOK = true;
const store = {
  get(k, d) { try { const v = localStorage.getItem('oxcira:' + k); return v == null ? (k in mem ? mem[k] : d) : JSON.parse(v); } catch { storageOK = false; return k in mem ? mem[k] : d; } },
  set(k, v) { mem[k] = v; try { localStorage.setItem('oxcira:' + k, JSON.stringify(v)); return true; } catch { storageOK = false; return false; } }
};

/* ---------- الحالة ---------- */
const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const S = {
  phase: 'gate', view: null, started: false,
  sound: store.get('sound', true),
  reduce: store.get('reduce', false),
  notifs: store.get('notifs', true),
  notes: store.get('notes', null),
  call: { status: 'idle', clip: 0, paused: false, mode: 'full', t0: 0, elapsed: 0, done: false, audioFailed: false },
  lockNotifs: [], callLog: [], chat: [], unread: { messages: 0, phone: 0 },
  callPending: false, chatStarted: false, journey: { step: 0, mat: '', qty: '', unit: 'طن', city: '' }
};
// الملاحظات الجاهزة: تُضاف مرة واحدة لكل معرّف، ولا تعود إذا حذفها الزائر
{
  if (!Array.isArray(S.notes)) S.notes = [];
  const seeded = store.get('seeded', []);
  const fresh = C.notes.filter(n => !seeded.includes(n.id) && !S.notes.some(x => x.id === n.id || x.title === n.title));
  if (fresh.length) {
    S.notes.push(...fresh.map(n => ({ id: n.id, title: n.title, text: n.text, t: Date.now() })));
    store.set('notes', S.notes); store.set('seeded', [...seeded, ...fresh.map(n => n.id)]);
  }
}

const timers = new Set();
const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
const cancel = id => { clearTimeout(id); timers.delete(id); };
const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };

const device = $('#device'), screen = $('#screen'), lockEl = $('#lock'), homeEl = $('#home'), appEl = $('#app'), callEl = $('#call'),
  gateEl = $('#gate'), bannersEl = $('#banners'), lbEl = $('#lightbox'), sheetEl = $('#sheet'), toastEl = $('#toast'), island = $('#island');

/* ---------- الوقت (توقيت الرياض، 12 ساعة دون ص/م) ---------- */
const nu = C.locale.digits === 'arab' ? 'arab' : 'latn';
const tf = new Intl.DateTimeFormat(`ar-SA-u-nu-${nu}`, { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: C.locale.timeZone });
const df = new Intl.DateTimeFormat(`ar-SA-u-ca-gregory-nu-${nu}`, { weekday: 'long', day: 'numeric', month: 'long', timeZone: C.locale.timeZone });
const timeNow = () => tf.formatToParts(new Date()).filter(p => p.type === 'hour' || p.type === 'minute').map(p => p.value).join(':');
function tick() {
  const t = timeNow();
  $$('.sb-time,.lk-time').forEach(e => { if (e.textContent !== t) e.textContent = t; });
  const d = df.format(new Date());
  $$('.lk-date').forEach(e => { if (e.textContent !== d) e.textContent = d; });
  if (S.call.status === 'active') renderCallTimer();
}
setInterval(tick, 1000);

/* ---------- الصوت ---------- */
const ring = new Audio(); ring.loop = true; ring.preload = 'auto';
const voice = new Audio(); voice.preload = 'auto';
let actx = null, voiceEpoch = 0, fallbackTimer = null;
function applySound() {
  ring.muted = voice.muted = !S.sound;
  const b = $('#ed-sound');
  if (b) { b.setAttribute('aria-pressed', String(!S.sound)); $('.lbl', b).textContent = S.sound ? 'الصوت مفعّل' : 'الصوت مكتوم'; }
  $$('[data-act="mute"]').forEach(x => { x.setAttribute('aria-pressed', String(!S.sound)); const l = $('.c-lbl', x); if (l) l.textContent = S.sound ? 'كتم' : 'إلغاء الكتم'; const c = $('.c-circle', x); if (c) c.innerHTML = ico(S.sound ? 'vol' : 'mute'); });
  const sw = $('#set-sound'); if (sw) sw.checked = S.sound;
}
function setSound(on) { S.sound = on; store.set('sound', on); applySound(); if (on && S.call.status === 'ringing' && !document.hidden) playRing(); }
// يُستدعى داخل لمسة «ابدأ التجربة» نفسها لفتح إذن الصوت في المتصفحات
function unlockAudio() {
  try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume(); } catch { actx = null; }
  ring.src = C.audio.ringtone; voice.src = C.audio.clips[0].src;
  [ring, voice].forEach(a => { a.muted = true; const p = a.play(); if (p && p.then) p.then(() => { a.pause(); a.currentTime = 0; a.muted = !S.sound; }).catch(() => { a.muted = !S.sound; }); else { a.pause(); a.muted = !S.sound; } });
}
function chime() {
  if (!S.sound || !actx || document.hidden) return;
  try {
    const t = actx.currentTime;
    [[1046, 0], [1568, .11]].forEach(([f, d]) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0, t + d); g.gain.linearRampToValueAtTime(.05, t + d + .01); g.gain.exponentialRampToValueAtTime(.001, t + d + .35); o.connect(g).connect(actx.destination); o.start(t + d); o.stop(t + d + .4); });
  } catch {}
}
const buzz = p => { try { navigator.vibrate && navigator.vibrate(p); } catch {} };
function playRing() {
  if (document.hidden) return;
  ring.muted = !S.sound; ring.volume = (C.audio.ringVolume ?? .7) * (S.volume ?? 1);
  if (ring.currentSrc === '' ) ring.src = C.audio.ringtone;
  try { ring.currentTime = 0; } catch {}
  const p = ring.play(); if (p && p.catch) p.catch(() => {});
  buzz([400, 200, 400, 200, 400]);
}
function stopRing() { ring.pause(); try { ring.currentTime = 0; } catch {} buzz(0); }
ring.addEventListener('error', () => { if (S.call.status === 'ringing') toast('تعذّر تحميل نغمة الرنين، المكالمة تعمل دون صوت.'); });

/* ---------- إشعارات ---------- */
const N_ICON = { oxcira: '', msg: ico('msg'), call: ico('phone'), notes: ico('note'), photos: flower };
function notifHTML(n, tag = 'button') {
  return `<${tag} type="button" class="notif" data-open="${esc(n.open || '')}" aria-label="${esc(n.title + ': ' + n.text)}">
    <span class="n-ico ${esc(n.kind)}">${N_ICON[n.kind] || ''}</span>
    <span class="n-body"><span class="n-top"><b>${esc(n.title)}</b><small>${esc(n.when || 'الآن')}</small></span><span class="n-text">${esc(n.text)}</span></span></${tag}>`;
}
function notify(n) {
  S.lockNotifs.unshift({ ...n, when: 'الآن' });
  S.lockNotifs.slice(1).forEach(x => x.when = 'منذ قليل');
  if (S.phase === 'lock') { renderLockNotifs(); chime(); buzz(30); return; }
  if (!S.notifs) return;
  chime(); buzz(30);
  const wrap = document.createElement('div');
  wrap.innerHTML = notifHTML(n);
  const el = wrap.firstElementChild;
  bannersEl.prepend(el);
  const kill = () => { el.style.transition = 'opacity .3s, transform .3s'; el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; setTimeout(() => el.remove(), 320); };
  let moved = false;
  swipeUpDismiss(el, () => { moved = true; el.remove(); });
  el.addEventListener('click', () => { if (moved) return; el.remove(); if (n.open) openApp(n.open); });
  later(kill, 5200);
}

// سحب اللافتة للأعلى لإخفائها كما في iOS
function swipeUpDismiss(el, onDismiss) {
  let y0 = null, dy = 0;
  el.addEventListener('pointerdown', e => { y0 = e.clientY; dy = 0; el.style.transition = 'none'; });
  el.addEventListener('pointermove', e => { if (y0 == null) return; dy = Math.min(0, e.clientY - y0); if (dy < -4) el.style.transform = `translateY(${dy}px)`; });
  const end = () => { if (y0 == null) return; y0 = null; el.style.transition = 'transform .3s var(--spring), opacity .3s'; if (dy < -40) { el.style.transform = 'translateY(-120%)'; el.style.opacity = '0'; setTimeout(onDismiss, 250); } else el.style.transform = ''; };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
}
const click = (f = 1800, d = .03) => { if (!S.sound || !actx || document.hidden) return; try { const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain(); o.type = 'square'; o.frequency.value = f; g.gain.setValueAtTime(.025, t); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d + .01); } catch {} };

/* ---------- البوابة وشاشة القفل ---------- */
function renderGate() {
  gateEl.classList.remove('gone'); gateEl.hidden = false;
  gateEl.innerHTML = `
    <h2>${esc(C.story.lockTitle)}<span>${esc(C.story.lockSub)}</span></h2>
    <button type="button" class="start" id="start">${esc(C.story.startLabel)} ${ico('play')}</button>
    <p>تجربة إعلانية تفاعلية · نحو دقيقة · ارفع الصوت</p>
    <button type="button" class="gate-install" data-install hidden>ثبّت أوكسيرا على جوالك</button>`;
  $('#start').addEventListener('click', start);
  syncInstall();
}
function renderLock() {
  lockEl.hidden = false; lockEl.classList.remove('leaving');
  lockEl.innerHTML = `
    <span class="lk-lockicon">${ico('lock')}</span>
    <div class="lk-date"></div>
    <div class="lk-time" dir="ltr"></div>
    <div class="lk-msg" ${S.started ? '' : 'hidden'}><strong>${esc(C.story.lockTitle)}</strong><span>${esc(C.story.lockSub)}</span></div>
    <div class="lk-notes" id="lk-notes"></div>
    <div class="lk-bottom" ${S.started ? '' : 'hidden'}>
      <button type="button" class="lk-quick" id="torch" aria-pressed="${!!S.torch}" aria-label="المصباح">${ico('torch')}</button>
      <button type="button" class="lk-unlock" id="unlock"><span>اسحب للأعلى للفتح</span></button>
      <button type="button" class="lk-quick" id="lk-cam" aria-label="الكاميرا: ألبوم المواد">${ico('camera')}</button>
    </div>`;
  $('#unlock').addEventListener('click', unlock);
  $('#torch').addEventListener('click', () => { S.torch = !S.torch; screen.classList.toggle('torch', S.torch); $('#torch').setAttribute('aria-pressed', String(S.torch)); click(1200, .04); buzz(15); });
  $('#lk-cam').addEventListener('click', () => { unlock(); openApp('photos'); });
  renderLockNotifs(); tick();
}
function renderLockNotifs() {
  const box = $('#lk-notes'); if (!box) return;
  box.innerHTML = S.lockNotifs.map(n => notifHTML(n)).join('');
  $$('.notif', box).forEach((b, i) => b.addEventListener('click', () => { const n = S.lockNotifs[i]; unlock(); if (n && n.open) openApp(n.open); }));
}
// سحب للأعلى لفتح القفل
(() => {
  let y0 = null, dy = 0, t0 = 0;
  const H = () => screen.clientHeight || 800;
  lockEl.addEventListener('pointerdown', e => {
    if (!S.started || S.phase !== 'lock' || (e.target.closest('button') && !e.target.closest('#unlock'))) return;
    y0 = e.clientY; dy = 0; t0 = performance.now();
    if (homeEl.hidden) renderHome();
    homeEl.classList.add('peek'); lockEl.style.transition = 'none';
  });
  lockEl.addEventListener('pointermove', e => {
    if (y0 == null) return;
    dy = Math.min(0, e.clientY - y0);
    const p = Math.min(1, -dy / (H() * .55));
    lockEl.style.transform = `translateY(${dy}px)`; lockEl.style.opacity = String(1 - p * .7);
    homeEl.style.setProperty('--peek', p.toFixed(3));
  });
  const end = () => {
    if (y0 == null) return;
    const v = -dy / Math.max(1, performance.now() - t0);
    y0 = null; lockEl.style.transition = '';
    if (-dy > H() * .22 || (v > .5 && -dy > 30)) { lockEl.style.transform = ''; lockEl.style.opacity = ''; unlock(); }
    else { lockEl.style.transform = ''; lockEl.style.opacity = ''; homeEl.classList.remove('peek'); homeEl.style.removeProperty('--peek'); if (S.phase === 'lock') homeEl.hidden = true; }
  };
  lockEl.addEventListener('pointerup', end); lockEl.addEventListener('pointercancel', end);
})();

function start() {
  if (S.started) return;
  unlockAudio();
  S.started = true; S.phase = 'lock';
  screen.classList.remove('asleep'); screen.classList.add('waking');
  setTimeout(() => screen.classList.remove('waking'), 1200);
  gateEl.classList.add('gone');
  setTimeout(() => { gateEl.hidden = true; }, 500);
  renderLock();
  $('#unlock').focus({ preventScroll: true });
  later(() => notify({ kind: 'oxcira', title: 'أوكسيرا', text: 'لديك فرصة لم تُكتشف بعد… ما يُهدر يُستَثمَر.', open: 'journey' }), 700);
  later(() => notify({ kind: 'photos', title: 'الصور', text: 'ألبوم المواد: ٦ صور من حملة أوكسيرا.', open: 'photos' }), 2600);
  scheduleCall(C.story.callDelayMs);
}
function unlock() {
  if (S.phase !== 'lock' || !S.started) return;
  S.phase = 'home';
  click(2400, .02); buzz(10);
  homeEl.classList.remove('peek'); homeEl.style.removeProperty('--peek');
  lockEl.classList.add('leaving');
  setTimeout(() => { if (S.phase !== 'lock') lockEl.hidden = true; }, 520);
  renderHome();
  if (S.call.status === 'ringing' && S.call.mode === 'full') { /* تبقى المكالمة ظاهرة */ }
}

/* ---------- الشاشة الرئيسية ---------- */
const EXT = 'target="_blank" rel="noopener noreferrer" data-ext';
const waHref = text => text ? `https://wa.me/${L.whatsappNumber}?text=${encodeURIComponent(text)}` : L.whatsapp;
const mailHref = (body = L.emailBody) => `mailto:${L.email}?subject=${encodeURIComponent(L.emailSubject)}&body=${encodeURIComponent(body)}`;
const APPS = [
  { id: 'oxcira', label: 'أوكسيرا', href: L.website, aria: 'أوكسيرا: يفتح الموقع الرسمي', tile: `<img src="${C.brand.appIcon}" alt="">` },
  { id: 'market', label: 'سوق أوكسيرا', href: L.marketplace, aria: 'سوق أوكسيرا: يفتح السوق مباشرة', bg: 'linear-gradient(145deg,#2A5C9E,#41717E)', tile: ico('store') },
  { id: 'journey', label: 'رحلة المادة', open: 'journey', bg: 'linear-gradient(145deg,#41717E,#2A9B5B)', tile: ico('route') },
  { id: 'photos', label: 'الصور', open: 'photos', bg: '#fff', tile: flower },
  { id: 'files', label: 'الملفات', open: 'files', bg: '#1d8cf8', tile: ico('folder') },
  { id: 'notes', label: 'الملاحظات', open: 'notes', bg: 'linear-gradient(#f9d65c,#f5c33b)', tile: ico('note') },
  { id: 'consult', label: 'الاستشارة', href: L.consultation, aria: 'حجز الاستشارة عبر Linktree', bg: '#3CB54A', tile: ico('cal') },
  { id: 'mail', label: 'البريد', href: mailHref(), mail: true, aria: 'البريد: رسالة غير مرسلة إلى ' + L.email, bg: 'linear-gradient(#3aa0ff,#1477f0)', tile: ico('mail') },
  { id: 'instagram', label: 'Instagram', href: L.instagram, aria: 'حساب أوكسيرا على Instagram', bg: 'radial-gradient(circle at 30% 107%,#fdf497 0%,#fd5949 45%,#d6249f 60%,#285AEB 90%)', tile: ico('insta') },
  { id: 'x', label: 'X', href: L.x, aria: 'حساب أوكسيرا على X', bg: '#000', tile: xLogo },
  { id: 'linkedin', label: 'LinkedIn', href: L.linkedin, aria: 'صفحة أوكسيرا على LinkedIn', bg: '#0a66c2', tile: '<b style="font:700 27px/1 Arial,sans-serif;letter-spacing:-1px" aria-hidden="true">in</b>' },
  { id: 'linktree', label: 'القنوات', href: L.linktree, aria: 'قنوات أوكسيرا على Linktree', bg: '#1f3b2c', tile: `<span style="color:#43e660">${ico('tree')}</span>` }
];
const DOCK = [
  { id: 'phone', label: 'الهاتف', open: 'phone', bg: 'linear-gradient(#5ee07a,#2fbf4f)', tile: ico('phone') },
  { id: 'messages', label: 'الرسائل', open: 'messages', bg: 'linear-gradient(#5ee07a,#2fbf4f)', tile: ico('msg') },
  { id: 'whatsapp', label: 'واتساب', href: waHref(), aria: 'واتساب أوكسيرا', bg: '#25d366', tile: ico('wa') },
  { id: 'settings', label: 'الإعدادات', open: 'settings', bg: 'linear-gradient(#a3a3aa,#7c7c84)', tile: ico('gear') }
];
function iconHTML(a) {
  const badge = a.open && S.unread[a.open] ? `<span class="badge" aria-label="${S.unread[a.open]} جديد">${S.unread[a.open]}</span>` : '';
  const tile = `<span class="tile" style="background:${a.bg || 'transparent'};color:${a.id === 'photos' ? '#000' : '#fff'}">${a.tile}${badge}${a.href ? `<span class="ext">${ico('ext')}</span>` : ''}</span><span class="lbl">${esc(a.label)}</span>`;
  if (a.href) return `<a class="ic" data-app="${a.id}" href="${esc(a.href)}" ${a.mail ? 'data-ext' : EXT} aria-label="${esc(a.aria || a.label)}">${tile}</a>`;
  return `<button type="button" class="ic" data-app="${a.id}" data-open="${a.open}" aria-label="${esc(a.label)}">${tile}</button>`;
}
function renderHome() {
  homeEl.hidden = false;
  homeEl.innerHTML = `
    <a class="widget" href="${esc(L.marketplace)}" ${EXT} aria-label="سوق أوكسيرا: يفتح السوق مباشرة">
      <span class="w-txt"><small>سوق المواد القابلة لإعادة التدوير</small><strong>${esc(C.brand.slogan)}</strong><em>تصفّح السوق ${ico('ext', 'width="14" height="14"')}</em></span>
      <img src="${C.brand.logoOnDark}" alt="">
    </a>
    <div class="grid">${APPS.map(iconHTML).join('')}</div>
    <p class="home-hint">الأيقونات ذات السهم ${ico('ext', 'width="11" height="11" style="vertical-align:-1px"')} تفتح قنوات أوكسيرا الرسمية</p>
    <div class="w-row">
      <button type="button" class="w-photo" data-open="photos" aria-label="الصور: ألبوم مواد حملة أوكسيرا">${C.photos.slice(0, 4).map((ph, i) => `<img src="${esc(ph.src)}" alt="" style="animation-delay:${i * 4}s">`).join('')}<span>ألبوم المواد</span></button>
      <button type="button" class="w-journey" data-open="journey" aria-label="رحلة المادة: أربع خطوات"><small>رحلة المادة</small><strong>من مخلفات… إلى فرصة</strong><span class="w-steps">${C.journey.map((j, i) => `<i>${i + 1}</i>`).join('')}</span></button>
    </div>
    <nav class="dock" aria-label="التطبيقات الأساسية">${DOCK.map(iconHTML).join('')}</nav>`;
  $$('[data-open]', homeEl).forEach(b => b.addEventListener('click', () => openApp(b.dataset.open)));
}
function refreshBadges() { if (S.phase === 'home' && !homeEl.hidden && S.view == null) renderHome(); }

/* ---------- التطبيقات ---------- */
function shell(title, body, { dark = false, cls = '', noLarge = false } = {}) {
  appEl.className = 'app' + (dark ? ' dark' : '') + (cls ? ' ' + cls : '');
  appEl.setAttribute('aria-label', title);
  appEl.innerHTML = `<header class="app-head"><button type="button" class="back" data-act="home" aria-label="رجوع إلى الشاشة الرئيسية">${ico('back')}<span>الرئيسية</span></button><h2 id="app-title">${esc(title)}</h2></header><div class="app-body">${noLarge ? '' : `<h1 class="large-title">${esc(title)}</h1>`}${body}</div>`;
  appEl.hidden = false;
  appEl.classList.toggle('no-large', !!noLarge);
  screen.classList.toggle('light-app', !dark);
  $('[data-act="home"]', appEl).addEventListener('click', goHome);
  const bd = $('.app-body', appEl);
  bd.addEventListener('scroll', () => appEl.classList.toggle('scrolled', bd.scrollTop > 34), { passive: true });
  return bd;
}
const VIEWS = {};
function openApp(id) {
  if (!VIEWS[id]) return;
  if (S.phase === 'lock') unlock();
  if (S.call.status === 'active' && S.call.mode === 'full') minimizeCall();
  const wasOpen = S.view != null && !appEl.hidden && !appEl.classList.contains('closing');
  clearTimeout(closeT); appEl.classList.remove('closing');
  S.view = id; S.phase = 'app';
  if (S.unread[id]) { S.unread[id] = 0; }
  VIEWS[id]();
  zoomFrom(wasOpen ? null : (originEl && originEl.isConnected ? originEl : $(`[data-app="${id}"]`, homeEl)));
  originEl = null;
  homeEl.classList.add('behind');
  const f = $('.back', appEl); f && f.focus({ preventScroll: true });
}
let closeT = null, originEl = null;
function zoomFrom(el) {
  const sr = screen.getBoundingClientRect(), sc = sr.width / screen.offsetWidth || 1;
  appEl.classList.remove('zoom-in'); void appEl.offsetWidth;
  if (el && !S.reduce) {
    const r = el.querySelector('.tile')?.getBoundingClientRect() || el.getBoundingClientRect();
    appEl.style.transformOrigin = `${((r.left + r.width / 2 - sr.left) / sc).toFixed(1)}px ${((r.top + r.height / 2 - sr.top) / sc).toFixed(1)}px`;
  } else appEl.style.transformOrigin = '50% 60%';
  appEl.dataset.origin = appEl.style.transformOrigin;
  appEl.classList.add('zoom-in');
}
document.addEventListener('pointerdown', e => { const b = e.target.closest('.ic,.w-photo,.w-journey,.notif'); if (b) originEl = b; }, true);
function goHome() {
  if (!lbEl.hidden) closeLightbox();
  if (S.view === 'notes') flushNote();
  S.view = null;
  screen.classList.remove('light-app');
  if (S.started && S.phase !== 'lock') { S.phase = 'home'; renderHome(); }
  homeEl.classList.remove('behind');
  if (appEl.hidden) return;
  appEl.classList.remove('zoom-in'); appEl.classList.add('closing');
  clearTimeout(closeT);
  closeT = setTimeout(() => { if (S.view == null) { appEl.hidden = true; appEl.innerHTML = ''; appEl.classList.remove('closing'); } }, S.reduce ? 0 : 330);
}

/* الهاتف */
VIEWS.phone = () => {
  const log = S.callLog.length ? S.callLog.map(c => `
      <div class="li"><span class="li-ico" style="background:${c.type === 'answered' ? '#2A9B5B' : '#ff3b30'}">${ico(c.type === 'answered' ? 'phone' : 'missed')}</span>
      <span class="li-txt"><b>${esc(C.story.caller)}</b><small>${c.type === 'answered' ? 'مكالمة مُجابة' : 'مكالمة فائتة'} · ${esc(c.time)}</small></span></div>`).join('')
    : `<div class="li"><span class="li-txt"><small>لا توجد مكالمات بعد. «الفرصة التالية» في طريقها إليك.</small></span></div>`;
  const b = shell('الهاتف', `
    <p class="app-note">${esc(C.story.disclaimer)}</p>
    <div class="section-t">الأخيرة</div><div class="list">${log}</div>
    <button type="button" class="btn primary" id="callback">${ico('phone')} معاودة الاتصال بـ«${esc(C.story.caller)}»</button>
    <div class="section-t">أوكسيرا الحقيقية</div>
    <div class="list">
      <a class="li" href="tel:${esc(L.phone)}" data-ext><span class="li-ico" style="background:#34c759">${ico('phone')}</span><span class="li-txt"><b>اتصال هاتفي بأوكسيرا</b><small>مكالمة حقيقية · <span class="ltr">${esc(L.phone)}</span></small></span>${ico('ext', 'class="chev"')}</a>
      <a class="li" href="${esc(waHref())}" ${EXT}><span class="li-ico" style="background:#25d366">${ico('wa')}</span><span class="li-txt"><b>واتساب</b><small class="ltr">wa.me/966538127976</small></span>${ico('ext', 'class="chev"')}</a>
    </div>`);
  $('#callback', b).addEventListener('click', () => { if (S.call.status === 'ringing' || S.call.status === 'active') return showCallFull(); toast('جارٍ الاتصال بك…'); scheduleCall(1400, true); });
};

/* الرسائل */
const REPLIES = {
  sell: { q: 'كيف أبيع موادي؟', a: [
    { t: 'ببساطة، في أربع خطوات:\n١. حدّد المادة التي تخرج من منشأتك.\n٢. صف الكمية والموقع.\n٣. اختر بين الشراء المباشر أو أفضل عرض أو المزاد، وفق ما تتيحه المنصة.\n٤. تواصل ونسّق مع الأطراف المناسبة.' },
    { t: 'جرّبها الآن في «رحلة المادة» داخل هذا الجوال:', btn: { open: 'journey', label: 'افتح رحلة المادة', icon: 'route' } }
  ]},
  market: { q: 'استكشف السوق', a: [
    { t: 'السوق يعرض إعلانات مواد قابلة لإعادة التدوير، مع فلاتر حسب الفئة والمدينة ونوع الشراء.', btn: { href: L.marketplace, label: 'افتح سوق أوكسيرا', icon: 'store' } }
  ]},
  team: { q: 'تواصل مع الفريق', a: [
    { t: 'اختر القناة الأنسب لك. لن يُرسل شيء تلقائيًا:', btns: [
      { href: waHref(), label: 'واتساب', icon: 'wa', cls: 'wa' },
      { href: mailHref(), label: 'البريد الإلكتروني', icon: 'mail', cls: 'ghost', mail: true },
      { href: L.consultation, label: 'حجز الاستشارة عبر Linktree', icon: 'cal', cls: 'ghost' }
    ]}
  ]}
};
function btnHTML(b) {
  if (b.open) return `<button type="button" class="btn primary" data-goto="${b.open}">${ico(b.icon)} ${esc(b.label)}</button>`;
  return `<a class="btn ${b.cls || 'primary'}" href="${esc(b.href)}" ${b.mail ? 'data-ext' : EXT}>${ico(b.icon)} ${esc(b.label)}</a>`;
}
function bubbleHTML(m) {
  if (m.typing) return '<div class="typing" aria-label="يكتب…"><i></i><i></i><i></i></div>';
  const btns = m.btn ? btnHTML(m.btn) : m.btns ? `<div class="stack" style="margin-top:4px">${m.btns.map(btnHTML).join('')}</div>` : '';
  return `<div class="bub ${m.from === 'me' ? 'out' : 'in'}${btns ? ' card-bub' : ''}">${esc(m.t)}${btns}</div>`;
}
function ensureChat() {
  if (S.chatStarted) return;
  S.chatStarted = true;
  S.chat.push({ t: 'مرحبًا 👋 هذه محادثة تعريفية مبرمجة ضمن إعلان أوكسيرا. اختر ما يهمّك:' });
}
VIEWS.messages = () => {
  ensureChat();
  const b = shell('أوكسيرا', `
    <div class="im-head"><span class="im-ava" aria-hidden="true"></span><b>أوكسيرا</b><small>محادثة تعريفية ضمن الإعلان</small></div>
    <p class="app-note">${ico('info', 'width="14" height="14" style="vertical-align:-2px"')} محادثة جاهزة مسبقًا ضمن الإعلان، لا يردّ عليها موظف أو مساعد متصل.</p>
    <div class="chat-meta">اليوم</div>
    <div class="chat" id="chat" aria-live="polite">${S.chat.map(bubbleHTML).join('')}</div>
    <div class="chips" id="chips">${Object.entries(REPLIES).map(([k, r]) => `<button type="button" class="chip" data-q="${k}">${esc(r.q)}</button>`).join('')}</div>`);
  bindChat(b);
  appEl.classList.add('im');
  const bar = document.createElement('form');
  bar.className = 'im-bar'; bar.setAttribute('aria-label', 'كتابة رسالة');
  bar.innerHTML = `<label class="sr" for="im-input">رسالة</label><input id="im-input" autocomplete="off" placeholder="رسالة نصية" maxlength="300"><button type="submit" class="im-send" aria-label="إرسال">${ico('arrowUp')}</button>`;
  appEl.appendChild(bar);
  bar.addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#im-input').value.trim(); if (!v) return;
    $('#im-input').value = '';
    S.chat.push({ from: 'me', t: v });
    const typing = { typing: true }; S.chat.push(typing); redrawChat(); click(900, .03);
    later(() => { S.chat.splice(S.chat.indexOf(typing), 1); S.chat.push({ t: 'شكرًا لك! هذه محادثة تعريفية جاهزة مسبقًا، فلا يقرأ رسالتك أحد هنا. لتصل رسالتك لفريق أوكسيرا فعلًا:', btns: REPLIES.team.a[0].btns }); redrawChat(); }, 900);
  });
  b.scrollTop = b.scrollHeight;
};
function bindChat(b) {
  $$('[data-goto]', b).forEach(x => x.onclick = () => openApp(x.dataset.goto));
  $$('.chip', b).forEach(c => c.onclick = () => ask(c.dataset.q));
}
function ask(k) {
  const r = REPLIES[k]; if (!r) return;
  S.chat.push({ from: 'me', t: r.q });
  const answers = r.a.slice();
  const typing = { typing: true };
  S.chat.push(typing);
  redrawChat();
  later(() => { S.chat.splice(S.chat.indexOf(typing), 1); S.chat.push(...answers); redrawChat(); }, 650);
}
function redrawChat() {
  if (S.view !== 'messages') return;
  const box = $('#chat'); if (!box) return;
  box.innerHTML = S.chat.map(bubbleHTML).join('');
  const b = $('.app-body', appEl); bindChat(b);
  b.scrollTo({ top: b.scrollHeight, behavior: S.reduce ? 'auto' : 'smooth' });
}
function deliverDetails(afterMiss) {
  ensureChat();
  S.chat.push({ t: afterMiss ? 'فاتتك المكالمة؟ لا بأس، هذه التفاصيل:' : 'كما وعدتك في المكالمة، هذه التفاصيل:' },
    { t: C.brand.definition, btn: { href: L.marketplace, label: 'تصفّح سوق أوكسيرا', icon: 'store' } });
  if (S.view === 'messages') redrawChat(); else { S.unread.messages = (S.unread.messages || 0) + 1; refreshBadges(); }
  notify({ kind: 'msg', title: 'أوكسيرا', text: afterMiss ? 'فاتتك «الفرصة التالية». أرسلنا لك التفاصيل.' : 'أرسلتُ لك التفاصيل كما وعدتك.', open: 'messages' });
}

/* الملاحظات */
let editing = null, saveT = null;
function persistNotes() { const ok = store.set('notes', S.notes); if (!ok) storageWarn(); }
function storageWarn() { const n = $('#store-warn'); if (n) n.hidden = false; }
VIEWS.notes = () => {
  editing = null;
  const b = shell('الملاحظات', `
    <p class="app-note">تُحفظ الملاحظات على هذا المتصفح فقط، ولا تُرسل إلى أي جهة.</p>
    <p class="app-note" id="store-warn" ${storageOK ? 'hidden' : ''} style="background:#fff4e0;border-color:#f3c77a;color:#7a5200">تعذّر الحفظ الدائم على هذا المتصفح؛ ستبقى ملاحظاتك حتى إغلاق الصفحة.</p>
    <button type="button" class="btn primary" id="note-new" style="margin-bottom:14px">${ico('plus')} ملاحظة جديدة</button>
    <div id="note-list">${S.notes.length ? S.notes.map(n => `<button type="button" class="note-item" data-id="${esc(n.id)}"><b>${esc(n.title || 'بلا عنوان')}</b><small>${esc((n.text || '').replace(/\n+/g, ' ').slice(0, 80) || 'فارغة')}</small></button>`).join('') : '<p class="j-sub">لا توجد ملاحظات.</p>'}</div>`, { cls: 'notes-app' });
  $('#note-new', b).onclick = () => { const n = { id: 'n' + Date.now(), title: '', text: '', t: Date.now() }; S.notes.unshift(n); persistNotes(); editNote(n.id); };
  $$('.note-item', b).forEach(x => x.onclick = () => editNote(x.dataset.id));
};
function editNote(id) {
  const n = S.notes.find(x => x.id === id); if (!n) return;
  editing = id;
  const b = shell('ملاحظة', `
    <p class="app-note" id="note-state">تُحفظ تلقائيًا على هذا المتصفح.</p>
    <div class="note-edit"><label class="sr" for="n-title">عنوان الملاحظة</label><input id="n-title" value="${esc(n.title)}" placeholder="العنوان" maxlength="120">
    <label class="sr" for="n-text">نص الملاحظة</label><textarea id="n-text" placeholder="اكتب ملاحظتك…" maxlength="5000">${esc(n.text)}</textarea></div>
    <div class="row2" style="margin-top:12px"><button type="button" class="btn ghost" id="n-done">${ico('back')} القائمة</button><button type="button" class="btn danger" id="n-del">${ico('trash')} حذف</button></div>`, { cls: 'notes-app' });
  const save = () => { n.title = $('#n-title').value; n.text = $('#n-text').value; n.t = Date.now(); clearTimeout(saveT); saveT = setTimeout(() => { persistNotes(); const s = $('#note-state'); if (s) s.textContent = storageOK ? 'تم الحفظ على هذا المتصفح.' : 'تعذّر الحفظ الدائم؛ الملاحظة محفوظة مؤقتًا حتى إغلاق الصفحة.'; }, 300); };
  $('#n-title', b).oninput = save; $('#n-text', b).oninput = save;
  $('#n-done', b).onclick = () => { flushNote(); VIEWS.notes(); };
  let armed = false;
  $('#n-del', b).onclick = e => {
    if (!armed) { armed = true; e.currentTarget.innerHTML = ico('trash') + ' تأكيد الحذف'; setTimeout(() => { armed = false; const d = $('#n-del'); if (d) d.innerHTML = ico('trash') + ' حذف'; }, 3500); return; }
    S.notes = S.notes.filter(x => x.id !== id); editing = null; persistNotes(); toast('حُذفت الملاحظة.'); VIEWS.notes();
  };
  $('#n-text', b).focus({ preventScroll: true });
}
function flushNote() {
  if (!editing) return;
  const t = $('#n-title'), x = $('#n-text'); const n = S.notes.find(q => q.id === editing);
  if (n && t && x) { n.title = t.value; n.text = x.value; }
  clearTimeout(saveT); persistNotes(); editing = null;
}

/* الصور */
let lbIndex = 0, lbReturn = null;
VIEWS.photos = () => {
  const b = shell('الصور', `
    <p class="app-note">ألبوم من مواد حملة أوكسيرا. اضغط أي صورة لفتحها.</p>
    <div class="album">${C.photos.map((p, i) => `<button type="button" data-i="${i}" aria-label="فتح الصورة ${i + 1}: ${esc(p.alt)}"><img src="${esc(p.src)}" alt="" loading="lazy" onerror="this.parentNode.style.background='#cfd8d5';this.remove()"></button>`).join('')}</div>`);
  $$('[data-i]', b).forEach(x => x.onclick = () => openLightbox(+x.dataset.i, x));
};
function openLightbox(i, from) {
  lbReturn = from || document.activeElement; lbIndex = i;
  lbEl.hidden = false;
  lbEl.innerHTML = `<div class="lb-head"><button type="button" class="lb-btn" data-lb="close" aria-label="إغلاق العارض">${ico('close')}</button><span id="lb-count" aria-live="polite"></span><span style="width:44px"></span></div>
    <div class="lb-stage"><img id="lb-img" alt=""><button type="button" class="lb-btn lb-nav prev" data-lb="prev" aria-label="الصورة السابقة">${ico('back')}</button><button type="button" class="lb-btn lb-nav next" data-lb="next" aria-label="الصورة التالية">${ico('back', 'style="transform:scaleX(-1)"')}</button></div>
    <p class="lb-cap" id="lb-cap"></p>`;
  lbEl.onclick = e => { const a = e.target.closest('[data-lb]'); if (!a) return; if (a.dataset.lb === 'close') closeLightbox(); else lbGo(a.dataset.lb === 'next' ? 1 : -1); };
  let x0 = null; const st = $('.lb-stage', lbEl);
  st.addEventListener('pointerdown', e => { x0 = e.clientX; });
  st.addEventListener('pointerup', e => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 50) lbGo(dx > 0 ? 1 : -1); });
  lbShow(); $('[data-lb="close"]', lbEl).focus();
}
function lbGo(d) { lbIndex = (lbIndex + d + C.photos.length) % C.photos.length; lbShow(); }
function lbShow() {
  const p = C.photos[lbIndex], img = $('#lb-img');
  img.onerror = () => { $('#lb-cap').textContent = 'تعذّر تحميل الصورة.'; };
  img.src = p.src; img.alt = p.alt;
  $('#lb-cap').textContent = p.alt; $('#lb-count').textContent = `${lbIndex + 1} من ${C.photos.length}`;
}
function closeLightbox() { lbEl.hidden = true; lbEl.innerHTML = ''; if (lbReturn && lbReturn.isConnected) lbReturn.focus(); }

/* الملفات */
VIEWS.files = () => {
  const files = C.publicFiles.map(f => f.kind === 'pdf'
    ? `<div class="li"><span class="li-ico" style="background:#e5483b">${ico('note')}</span><span class="li-txt"><b>${esc(f.title)}</b><small>${esc(f.meta)}</small></span>
        <a class="lb-btn" style="background:rgba(42,155,91,.1);color:#1d7445" href="${esc(f.href)}" target="_blank" rel="noopener" aria-label="فتح ${esc(f.title)}">${ico('ext')}</a>
        <a class="lb-btn" style="background:rgba(29,140,248,.1);color:#1d6fd0" href="${esc(f.href)}" download="${esc(f.download || '')}" aria-label="تنزيل ${esc(f.title)}">${ico('download')}</a></div>`
    : `<a class="li" href="${esc(f.href)}" download="${esc(f.download || '')}"><span class="li-ico" style="background:#1d8cf8">${ico('download')}</span><span class="li-txt"><b>${esc(f.title)}</b><small>${esc(f.meta)}</small></span></a>`).join('');
  shell('الملفات', `
    <p class="app-note">تُعرض هنا الملفات العامة المصرّح بنشرها فقط. اضغط ↗ للفتح أو ↓ للتنزيل.</p>
    <div class="section-t">ملفات للتنزيل</div><div class="list">${files || '<div class="li"><small>لا توجد ملفات عامة حاليًا.</small></div>'}</div>
    <div class="section-t">صفحات رسمية</div>
    <div class="list">
      <a class="li" href="${esc(L.website)}" ${EXT}><span class="li-ico" style="background:#2A9B5B">${ico('link')}</span><span class="li-txt"><b>الموقع الرسمي</b><small class="ltr">oxcira.sa/ar</small></span>${ico('ext', 'class="chev"')}</a>
      <a class="li" href="${esc(L.marketplace)}" ${EXT}><span class="li-ico" style="background:#2A5C9E">${ico('store')}</span><span class="li-txt"><b>سوق أوكسيرا</b><small class="ltr">oxcira.sa/ar/marketplace</small></span>${ico('ext', 'class="chev"')}</a>
    </div>`);
};

/* رحلة المادة */
VIEWS.journey = () => renderJourney();
function renderJourney() {
  const J = S.journey, st = C.journey[J.step];
  const bar = `<div class="steps" aria-hidden="true">${C.journey.map((_, i) => `<i class="${i <= J.step ? 'on' : ''}"></i>`).join('')}</div>`;
  let body = '';
  if (J.step === 0) body = `<div class="mat-grid" role="group" aria-label="فئات المواد">${C.materials.map(m => `<button type="button" class="mat" aria-pressed="${J.mat === m}" data-mat="${esc(m)}">${esc(m)}</button>`).join('')}</div>`;
  if (J.step === 1) body = `
    <label class="field"><span>الكمية التقريبية</span><div class="row2"><input id="j-qty" inputmode="decimal" value="${esc(J.qty)}" placeholder="مثال: 12"><select id="j-unit" aria-label="الوحدة">${['طن', 'كيلوجرام', 'قطعة', 'لتر', 'حاوية'].map(u => `<option ${u === J.unit ? 'selected' : ''}>${u}</option>`).join('')}</select></div></label>
    <label class="field"><span>المدينة</span><input id="j-city" value="${esc(J.city)}" placeholder="مثال: الجبيل" maxlength="60"></label>
    <p class="app-note">لا تُرسل هذه البيانات من الصفحة؛ تُستخدم فقط لتجهيز رسالتك في الخطوة الأخيرة.</p>`;
  if (J.step === 2) body = C.dealTypes.map((d, i) => `<div class="card deal"><span class="num">${i + 1}</span><div><h3>${esc(d.title)}</h3><p>${esc(d.text)}</p></div></div>`).join('') + `<p class="app-note">الخيارات المتاحة لكل إعلان تظهر في السوق نفسه.</p>`;
  if (J.step === 3) {
    const sum = [J.mat && `المادة: ${J.mat}`, J.qty && `الكمية: ${J.qty} ${J.unit}`, J.city && `المدينة: ${J.city}`].filter(Boolean);
    const msg = `مرحبًا فريق أوكسيرا، أرغب في عرض/بيع مواد عبر المنصة.\n${sum.join('\n')}\nأرجو التواصل لتنسيق التفاصيل.`;
    body = `${sum.length ? `<div class="summary">${sum.map(esc).join('<br>')}</div>` : ''}
      <div class="stack">
        <a class="btn primary" href="${esc(L.marketplace)}" ${EXT}>${ico('store')} تصفّح سوق أوكسيرا</a>
        <a class="btn wa" href="${esc(waHref(msg))}" ${EXT}>${ico('wa')} أرسل التفاصيل عبر واتساب</a>
        <a class="btn ghost" href="${esc(mailHref(msg))}" data-ext>${ico('mail')} راسل الفريق بالبريد</a>
      </div>
      <p class="app-note" style="margin-top:12px">تُجهَّز الرسالة فقط، وترسلها أنت بنفسك من واتساب أو البريد.</p>`;
  }
  const nav = `<div class="j-nav">${J.step > 0 ? `<button type="button" class="btn ghost" data-j="-1">السابق</button>` : ''}${J.step < 3 ? `<button type="button" class="btn primary" data-j="1" ${J.step === 0 && !J.mat ? 'disabled style="opacity:.5"' : ''}>التالي</button>` : `<button type="button" class="btn ghost" data-j="reset">رحلة جديدة</button>`}</div>`;
  const b = shell('رحلة المادة', `${bar}<p class="j-sub" style="margin:0">الخطوة ${J.step + 1} من 4</p><h3 class="j-title">${esc(st.title)}</h3><p class="j-sub">${esc(st.text)}</p>${body}${nav}`);
  const keep = () => { if (J.step === 1) { J.qty = $('#j-qty').value.trim(); J.unit = $('#j-unit').value; J.city = $('#j-city').value.trim(); } };
  $$('[data-mat]', b).forEach(x => x.onclick = () => { J.mat = x.dataset.mat; renderJourney(); $(`[data-mat="${CSS.escape(J.mat)}"]`)?.focus(); });
  $$('[data-j]', b).forEach(x => x.onclick = () => { if (x.disabled) return; keep(); const v = x.dataset.j; if (v === 'reset') S.journey = { step: 0, mat: '', qty: '', unit: 'طن', city: '' }; else J.step = Math.max(0, Math.min(3, J.step + +v)); renderJourney(); $('.app-body', appEl).scrollTop = 0; });
}

/* الإعدادات */
VIEWS.settings = () => {
  const linkRows = [['الموقع الرسمي', L.website], ['السوق', L.marketplace], ['واتساب', L.whatsapp], ['Linktree', L.linktree], ['Instagram', L.instagram], ['X', L.x], ['LinkedIn', L.linkedin], ['البريد', L.email]];
  const b = shell('الإعدادات', `
    <div class="list">
      <div class="set-row"><label for="set-sound">الصوت<small>النغمة والتعليق الصوتي</small></label><span class="switch"><input type="checkbox" role="switch" id="set-sound" ${S.sound ? 'checked' : ''}><i></i></span></div>
      <div class="set-row"><label for="set-reduce">تقليل الحركة<small>إيقاف الحركات والانتقالات</small></label><span class="switch"><input type="checkbox" role="switch" id="set-reduce" ${S.reduce ? 'checked' : ''}><i></i></span></div>
      <div class="set-row"><label for="set-notifs">الإشعارات<small>لافتات أعلى الشاشة</small></label><span class="switch"><input type="checkbox" role="switch" id="set-notifs" ${S.notifs ? 'checked' : ''}><i></i></span></div>
    </div>
    <button type="button" class="btn primary" id="restart">إعادة التجربة من البداية</button>
    <button type="button" class="btn install-btn" data-install hidden>ثبّت أوكسيرا كتطبيق على جهازك</button>
    <div class="section-t">عن التجربة</div>
    <div class="card"><p>${esc(C.brand.definition)}</p><p style="margin-top:8px;font-size:13px">${esc(C.story.disclaimer)} التعليق الصوتي مولَّد آليًا، والمحادثة جاهزة مسبقًا.</p></div>
    <div class="section-t">روابط أوكسيرا (للنسخ)</div>
    <div class="list">${linkRows.map(([t, u]) => `<div class="li"><span class="li-txt"><b>${esc(t)}</b><span class="url">${esc(u)}</span></span><button type="button" class="lb-btn" style="background:rgba(42,155,91,.1);color:#1d7445" data-copy="${esc(u)}" aria-label="نسخ رابط ${esc(t)}">${ico('copy')}</button></div>`).join('')}</div>`);
  $('#set-sound', b).onchange = e => setSound(e.target.checked);
  $('#set-reduce', b).onchange = e => setReduce(e.target.checked);
  $('#set-notifs', b).onchange = e => { S.notifs = e.target.checked; store.set('notifs', S.notifs); };
  $('#restart', b).onclick = restart;
  syncInstall();
  $$('[data-copy]', b).forEach(x => x.onclick = () => copyText(x.dataset.copy, null).then(ok => toast(ok ? 'تم نسخ الرابط.' : 'تعذّر النسخ التلقائي؛ حدّد الرابط وانسخه يدويًا.')));
};
function setReduce(on) { S.reduce = on; store.set('reduce', on); document.documentElement.classList.toggle('reduce', on); }

/* ---------- المكالمة ---------- */
let callTimer = null, ringTimeout = null;
function scheduleCall(ms, replay = false) {
  if (callTimer) cancel(callTimer);
  if (replay) S.call.done = false;
  callTimer = later(() => { callTimer = null; incoming(); }, ms);
}
function incoming() {
  if (S.call.status === 'ringing' || S.call.status === 'active') return;
  if (document.hidden) { S.callPending = true; return; }
  Object.assign(S.call, { status: 'ringing', clip: 0, paused: false, elapsed: 0, audioFailed: false, mode: S.phase === 'lock' ? 'full' : 'banner' });
  if (S.call.mode === 'full') showCallFull(); else showCallBanner();
  playRing();
  ringTimeout = later(() => missCall('timeout'), C.story.ringTimeoutMs);
}
function showCallBanner() {
  callEl.hidden = true;
  $('#call-banner')?.remove();
  const el = document.createElement('div');
  el.className = 'banner-call'; el.id = 'call-banner'; el.setAttribute('role', 'alertdialog'); el.setAttribute('aria-label', 'اتصال وارد ضمن التجربة');
  el.innerHTML = `<span class="bc-ava" aria-hidden="true"></span><button type="button" class="bc-txt" data-c="full" aria-label="عرض المكالمة"><b>${esc(C.story.caller)}</b><small>${esc(C.story.callerSub)}</small></button>
    <button type="button" class="bc-btn bc-dec" data-c="decline" aria-label="رفض المكالمة">${ico('phone')}</button><button type="button" class="bc-btn bc-acc" data-c="accept" aria-label="الرد على المكالمة">${ico('phone')}</button>`;
  el.onclick = e => { const c = e.target.closest('[data-c]')?.dataset.c; if (c === 'accept') answer(); else if (c === 'decline') missCall('declined'); else if (c === 'full') { S.call.mode = 'full'; el.remove(); showCallFull(); } };
  bannersEl.prepend(el);
}
function showCallFull() {
  $('#call-banner')?.remove();
  island.classList.remove('live'); island.tabIndex = -1;
  S.call.mode = 'full';
  callEl.hidden = false;
  renderCall();
}
function renderCall() {
  const c = S.call, ringing = c.status === 'ringing';
  callEl.classList.toggle('ringing', ringing);
  const clips = C.audio.clips;
  const words = ringing ? [] : clips[Math.min(c.clip, clips.length - 1)].caption.split(/\s+/);
  const cap = ringing ? '' : `<p class="live" aria-label="${esc(words.join(' '))}">${words.map(w => `<span class="w">${esc(w)}</span>`).join(' ')}</p>`;
  const locked = S.phase === 'lock';
  callEl.innerHTML = `
    <div class="call-ava" aria-hidden="true"></div>
    <h2 class="call-name">${esc(C.story.caller)}</h2>
    ${ringing ? `<p class="call-sub">${esc(C.story.callerSub)}</p>` : `<p class="call-timer" id="call-timer" dir="ltr">0:00</p>`}
    <div class="call-cap" aria-live="polite">${cap}</div>
    ${ringing ? '' : `<div class="call-prog" aria-hidden="true">${clips.map((_, i) => `<i class="${i < c.clip ? 'done' : i === c.clip ? 'cur' : ''}"></i>`).join('')}</div>`}
    ${c.audioFailed ? '<p class="call-audio-note">تعذّر تشغيل التسجيل؛ يُعرض النص بدلًا منه.</p>' : ''}
    <p class="call-disc">${esc(C.story.disclaimer)}</p>
    <div class="call-actions${ringing && locked ? ' slide-mode' : ''}">${ringing && locked ? `
      <div class="slide" id="slide"><span class="slide-txt">اسحب للرد</span><button type="button" class="slide-knob" data-c="accept" aria-label="الرد على المكالمة (اسحب أو اضغط)">${ico('phone')}</button></div>
      <button type="button" class="c-mini" data-c="decline">${ico('phone')} رفض</button>` : ringing ? `
      <button type="button" class="c-btn decline" data-c="decline"><span class="c-circle">${ico('phone')}</span><span>رفض</span></button>
      <button type="button" class="c-btn accept" data-c="accept"><span class="c-circle">${ico('phone')}</span><span>ردّ</span></button>` : `
      <button type="button" class="c-btn" data-act="mute" aria-pressed="${!S.sound}"><span class="c-circle">${ico(S.sound ? 'vol' : 'mute')}</span><span class="c-lbl">${S.sound ? 'كتم' : 'إلغاء الكتم'}</span></button>
      ${c.paused ? `<button type="button" class="c-btn" data-c="resume"><span class="c-circle">${ico('play')}</span><span>متابعة</span></button>` : `<button type="button" class="c-btn" data-c="min"><span class="c-circle">${ico('min')}</span><span>تصغير</span></button>`}
      <button type="button" class="c-btn end" data-c="end"><span class="c-circle">${ico('phone')}</span><span>إنهاء</span></button>`}
    </div>`;
  callEl.onclick = e => {
    const b = e.target.closest('[data-c],[data-act]'); if (!b) return;
    const k = b.dataset.c || b.dataset.act;
    if (k === 'accept') answer(); else if (k === 'decline') missCall('declined'); else if (k === 'end') endCall(false);
    else if (k === 'min') minimizeCall(); else if (k === 'resume') resumeNarration(); else if (k === 'mute') setSound(!S.sound);
  };
  if (!ringing) { renderCallTimer(); setProgDuration(); syncWords(); }
  if (ringing && locked) bindSlide();
  device.classList.toggle('ringing', ringing && !S.reduce);
  const f = $(ringing ? '[data-c="accept"]' : c.paused ? '[data-c="resume"]' : '[data-c="end"]', callEl);
  f && f.focus({ preventScroll: true });
}
function syncWords() {
  const ws = $$('.call-cap .w'); if (!ws.length) return;
  let n = ws.length;
  if (!S.call.audioFailed && isFinite(voice.duration) && voice.duration > 0) n = Math.ceil((voice.currentTime / voice.duration) * ws.length * 1.12);
  ws.forEach((w, i) => w.classList.toggle('on', i < n));
}
voice.addEventListener('timeupdate', () => { if (S.call.status === 'active') syncWords(); });
function bindSlide() {
  const track = $('#slide'), knob = $('.slide-knob', track); if (!track) return;
  let x0 = null, dx = 0, dragged = false;
  const max = () => track.clientWidth - knob.offsetWidth - 8;
  knob.addEventListener('pointerdown', e => { x0 = e.clientX; dx = 0; dragged = false; knob.setPointerCapture?.(e.pointerId); knob.style.transition = 'none'; });
  knob.addEventListener('pointermove', e => { if (x0 == null) return; dx = Math.max(0, Math.min(max(), x0 - e.clientX)); if (dx > 6) dragged = true; knob.style.transform = `translateX(${-dx}px)`; $('.slide-txt', track).style.opacity = String(1 - dx / max()); });
  const end = () => { if (x0 == null) return; x0 = null; knob.style.transition = ''; if (dx > max() * .7) { knob.style.transform = `translateX(${-max()}px)`; dragged = true; answer(); } else { knob.style.transform = ''; $('.slide-txt', track).style.opacity = ''; } };
  knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
  knob.addEventListener('click', e => { if (dragged) { e.stopPropagation(); dragged = false; } }, true);
}
function renderCallTimer() {
  const s = Math.floor((S.call.elapsed + (S.call.paused ? 0 : Date.now() - S.call.t0)) / 1000);
  const v = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const t = $('#call-timer'); if (t) t.textContent = v;
  $('#isl-timer').textContent = v;
}
function setProgDuration() {
  const cur = $('.call-prog i.cur'); if (!cur) return;
  const d = isFinite(voice.duration) && voice.duration > 0 ? voice.duration : 7;
  cur.style.setProperty('--d', d + 's'); cur.classList.toggle('paused', S.call.paused);
}
function answer() {
  if (S.call.status !== 'ringing') return;
  device.classList.toggle('ringing', false);
  cancel(ringTimeout); stopRing();
  Object.assign(S.call, { status: 'active', clip: 0, paused: false, t0: Date.now(), elapsed: 0 });
  S.callLog.unshift({ type: 'answered', time: timeNow() });
  showCallFull();
  playClip(0);
}
function playClip(i) {
  const epoch = ++voiceEpoch;
  clearTimeout(fallbackTimer);
  S.call.clip = i;
  if (S.call.mode === 'full') renderCall();
  const clip = C.audio.clips[i];
  const next = () => { if (epoch !== voiceEpoch || S.call.status !== 'active') return; if (i + 1 < C.audio.clips.length) playClip(i + 1); else later(() => { if (epoch === voiceEpoch) endCall(true); }, 900); };
  const fail = () => {
    if (epoch !== voiceEpoch || S.call.status !== 'active') return;
    // فقط عند تعذّر الصوت: مهلة قراءة تتناسب مع طول النص
    if (!S.call.audioFailed) { S.call.audioFailed = true; if (S.call.mode === 'full') renderCall(); }
    fallbackTimer = setTimeout(next, Math.max(3500, clip.caption.length * 75));
  };
  voice.onended = next;
  voice.onerror = fail;
  voice.onloadedmetadata = () => { if (epoch === voiceEpoch) setProgDuration(); };
  voice.muted = !S.sound;
  if (!voice.src.endsWith(clip.src)) voice.src = clip.src;
  try { voice.currentTime = 0; } catch {}
  const p = voice.play();
  if (p && p.catch) p.catch(err => {
    if (epoch !== voiceEpoch) return;
    if (err && err.name === 'NotAllowedError') { S.call.paused = true; S.call.elapsed += Date.now() - S.call.t0; if (S.call.mode === 'full') renderCall(); }
    else if (err && err.name !== 'AbortError') fail();
  });
}
function pauseNarration() {
  if (S.call.status !== 'active' || S.call.paused) return;
  voice.pause(); clearTimeout(fallbackTimer);
  S.call.paused = true; S.call.elapsed += Date.now() - S.call.t0;
  if (S.call.mode === 'full') renderCall();
}
function resumeNarration() {
  if (S.call.status !== 'active' || !S.call.paused) return;
  S.call.paused = false; S.call.t0 = Date.now();
  if (S.call.audioFailed) { playClip(S.call.clip); return; }
  const p = voice.play(); if (p && p.catch) p.catch(() => playClip(S.call.clip));
  if (S.call.mode === 'full') renderCall();
}
function minimizeCall() {
  if (S.call.status !== 'active') return;
  S.call.mode = 'mini'; callEl.hidden = true;
  island.classList.add('live'); island.tabIndex = 0;
  if (S.phase === 'lock') unlock();
  renderCallTimer();
}
island.addEventListener('click', () => { if (S.call.status === 'active') showCallFull(); });
function endCall(completed) {
  if (S.call.status !== 'active') return;
  voiceEpoch++; clearTimeout(fallbackTimer); voice.pause();
  S.call.status = 'ended'; S.call.done = completed;
  callEl.hidden = true; island.classList.remove('live'); island.tabIndex = -1;
  if (S.phase === 'lock') unlock();
  if (S.view == null) renderHome();
  later(() => deliverDetails(false), 900);
}
function missCall(reason) {
  if (S.call.status !== 'ringing') return;
  cancel(ringTimeout); stopRing();
  S.call.status = 'missed'; device.classList.toggle('ringing', false);
  callEl.hidden = true; $('#call-banner')?.remove();
  S.callLog.unshift({ type: 'missed', time: timeNow() });
  S.unread.phone = (S.unread.phone || 0) + 1;
  notify({ kind: 'call', title: 'مكالمة فائتة', text: `${C.story.caller} · ${reason === 'declined' ? 'رفضت المكالمة' : 'لم يتم الرد'}. اضغط لمعاودة الاتصال.`, open: 'phone' });
  if (reason !== 'background') later(() => deliverDetails(true), 1800);
  refreshBadges();
}

/* ---------- الروابط الخارجية: فتح فعلي + بدائل واضحة ---------- */
let leftPage = false, extCheck = null;
const markLeft = () => { leftPage = true; };
window.addEventListener('blur', markLeft);
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-ext]');
  if (!a) return;
  // لا نمنع السلوك الافتراضي ولا ننتظر أي شيء قبل الفتح
  quietForExternal();
  leftPage = false;
  if (extCheck) clearTimeout(extCheck);
  const href = a.href, label = a.getAttribute('aria-label') || a.textContent.trim();
  extCheck = setTimeout(() => {
    extCheck = null;
    // إذا لم تفقد الصفحة التركيز ولم تُخفَ، فغالبًا مُنع الفتح في هذه البيئة
    if (!leftPage && document.visibilityState === 'visible' && document.hasFocus()) showLinkSheet(href, label);
  }, 1600);
}, true);
function quietForExternal() {
  if (S.call.status === 'ringing') missCall('background');
  if (S.call.status === 'active') pauseNarration();
  if (callTimer) { cancel(callTimer); callTimer = null; if (S.call.status === 'idle') S.callPending = true; }
}
function showLinkSheet(href, label) {
  sheetEl.hidden = false;
  const isWeb = /^https?:/i.test(href);
  sheetEl.innerHTML = `<div class="sheet"><div class="grab" aria-hidden="true"></div>
    <h3 id="sheet-title">لم تُفتح القناة؟</h3>
    <p>${esc(label)}. قد تمنع بعض المعاينات داخل التطبيقات فتح الروابط. اختر طريقة أخرى:</p>
    <label class="sr" for="sheet-url">الرابط</label><input class="url-box" id="sheet-url" readonly value="${esc(href)}">
    <div class="stack">
      <a class="btn primary" href="${esc(href)}" ${isWeb ? 'target="_blank" rel="noopener noreferrer"' : ''} data-sheet-open>${ico('ext')} فتح القناة</a>
      ${isWeb ? `<a class="btn blue" href="${esc(href)}" target="_top" data-sheet-open>${ico('link')} فتح في الصفحة الحالية</a>` : ''}
      <button type="button" class="btn ghost" id="sheet-copy">${ico('copy')} نسخ الرابط</button>
      <button type="button" class="btn ghost" id="sheet-close">إغلاق</button>
    </div><p class="sheet-status" id="sheet-status" role="status"></p></div>`;
  const inp = $('#sheet-url'); inp.addEventListener('focus', () => inp.select());
  $('#sheet-copy').onclick = () => copyText(href, inp).then(ok => { const s = $('#sheet-status'); s.classList.toggle('err', !ok); s.textContent = ok ? 'تم نسخ الرابط. الصقه في المتصفح أو التطبيق.' : 'تعذّر النسخ التلقائي. الرابط محدَّد أعلاه، انسخه يدويًا.'; });
  $('#sheet-close').onclick = closeSheet;
  sheetEl.onclick = e => { if (e.target === sheetEl) closeSheet(); };
  $$('[data-sheet-open]', sheetEl).forEach(x => x.addEventListener('click', () => quietForExternal()));
  $('[data-sheet-open]', sheetEl).focus();
}
function closeSheet() { sheetEl.hidden = true; sheetEl.innerHTML = ''; }
async function copyText(text, input) {
  try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch {}
  try {
    const el = input || Object.assign(document.createElement('textarea'), { value: text });
    if (!input) { el.setAttribute('readonly', ''); el.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(el); }
    el.focus(); el.select(); el.setSelectionRange?.(0, text.length);
    const ok = document.execCommand && document.execCommand('copy');
    if (!input) el.remove();
    if (ok) return true;
  } catch {}
  if (input) { input.focus(); input.select(); }
  return false;
}

/* ---------- الخلفية والعودة ---------- */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    leftPage = true;
    if (S.call.status === 'ringing') missCall('background');
    if (S.call.status === 'active') pauseNarration();
    if (callTimer) { cancel(callTimer); callTimer = null; if (S.call.status === 'idle') S.callPending = true; }
    try { actx && actx.suspend(); } catch {}
  } else {
    try { actx && actx.resume(); } catch {}
    // لا تشغيل تلقائي للصوت عند العودة؛ تظهر المكالمة المؤجلة بعد مهلة كإشعار غير حاجب
    if (S.callPending && S.started) { S.callPending = false; scheduleCall(5000); }
  }
});
window.addEventListener('pagehide', () => { stopRing(); voice.pause(); });

/* ---------- عام ---------- */
let toastT = null;
function toast(msg) { toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { toastEl.hidden = true; }, 2800); }
$('#homebar').addEventListener('click', () => {
  if (!sheetEl.hidden) return closeSheet();
  if (!lbEl.hidden) return closeLightbox();
  if (!callEl.hidden) { if (S.call.status === 'ringing') { S.call.mode = 'banner'; callEl.hidden = true; if (S.phase === 'lock') unlock(); showCallBanner(); } else minimizeCall(); return; }
  if (S.phase === 'lock') return unlock();
  if (S.view) goHome();
});
$('#ed-sound').addEventListener('click', () => setSound(!S.sound));
function restart() {
  clearTimers(); stopRing(); voiceEpoch++; voice.pause(); clearTimeout(fallbackTimer); if (extCheck) clearTimeout(extCheck);
  callTimer = ringTimeout = null;
  Object.assign(S, { phase: 'gate', view: null, started: false, lockNotifs: [], callLog: [], chat: [], unread: { messages: 0, phone: 0 }, callPending: false, chatStarted: false, journey: { step: 0, mat: '', qty: '', unit: 'طن', city: '' } });
  S.call = { status: 'idle', clip: 0, paused: false, mode: 'full', t0: 0, elapsed: 0, done: false, audioFailed: false };
  appEl.hidden = true; appEl.innerHTML = ''; homeEl.hidden = true; homeEl.innerHTML = ''; callEl.hidden = true; bannersEl.innerHTML = '';
  closeSheet(); if (!lbEl.hidden) closeLightbox(); island.classList.remove('live');
  screen.classList.remove('light-app', 'torch'); screen.classList.add('asleep'); S.torch = false;
  homeEl.classList.remove('behind', 'peek'); device.classList.toggle('ringing', false);
  renderLock(); renderGate(); $('#start').focus();
}

/* ---------- إيماءات iOS: السحب من المؤشر السفلي، والسحب من الحافة للرجوع ---------- */
(() => {
  const hb = $('#homebar'); let y0 = null;
  hb.addEventListener('pointerdown', e => { y0 = e.clientY; });
  hb.addEventListener('pointerup', e => { if (y0 != null && y0 - e.clientY > 30) { e.preventDefault(); hb.click(); } y0 = null; });
  let x0 = null, dx = 0;
  appEl.addEventListener('pointerdown', e => {
    const r = appEl.getBoundingClientRect(), sc = r.width / appEl.offsetWidth || 1;
    if ((r.right - e.clientX) / sc < 22 && e.pointerType !== 'mouse') { x0 = e.clientX; dx = 0; appEl.style.transition = 'none'; }
  });
  appEl.addEventListener('pointermove', e => { if (x0 == null) return; dx = Math.max(0, x0 - e.clientX); appEl.style.transform = `translateX(${-dx}px)`; });
  const end = () => { if (x0 == null) return; x0 = null; appEl.style.transition = ''; appEl.style.transform = ''; if (dx > 90) goHome(); };
  appEl.addEventListener('pointerup', end); appEl.addEventListener('pointercancel', end);
})();

/* ---------- أزرار الجهاز الجانبية (على الكمبيوتر) ---------- */
let volT = null;
S.volume = store.get('volume', 1);
function applyVolume() { ring.volume = (C.audio.ringVolume ?? .7) * S.volume; voice.volume = S.volume; }
function showVol() {
  let h = $('#vol-hud');
  if (!h) { h = document.createElement('div'); h.id = 'vol-hud'; h.className = 'vol-hud'; h.setAttribute('role', 'status'); h.innerHTML = '<i></i>'; screen.appendChild(h); }
  $('i', h).style.height = Math.round(S.volume * 100) + '%';
  h.setAttribute('aria-label', 'مستوى الصوت ' + Math.round(S.volume * 100) + '%');
  h.classList.add('show'); clearTimeout(volT); volT = setTimeout(() => h.classList.remove('show'), 1300);
}
function changeVol(d) { S.volume = Math.max(0, Math.min(1, Math.round((S.volume + d) * 10) / 10)); store.set('volume', S.volume); applyVolume(); showVol(); click(1500, .02); }
function powerButton() {
  if (!S.started) return start();
  if (S.phase === 'lock') { screen.classList.add('waking'); setTimeout(() => screen.classList.remove('waking'), 900); return; }
  if (S.call.status === 'active') return endCall(false);
  if (S.view) goHome();
  S.phase = 'lock'; click(600, .05); buzz(20);
  screen.classList.add('sleeping');
  setTimeout(() => { screen.classList.remove('sleeping'); homeEl.hidden = true; renderLock(); screen.classList.add('waking'); setTimeout(() => screen.classList.remove('waking'), 900); }, 380);
}
$('#btn-power')?.addEventListener('click', powerButton);
$('#btn-volup')?.addEventListener('click', () => changeVol(.1));
$('#btn-voldown')?.addEventListener('click', () => changeVol(-.1));
$('#btn-action')?.addEventListener('click', () => setSound(!S.sound));
applyVolume();

// لوحة المفاتيح: Escape وحبس التركيز في النوافذ
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!sheetEl.hidden) return closeSheet();
    if (!lbEl.hidden) return closeLightbox();
    if (!callEl.hidden && S.call.status === 'active') return minimizeCall();
    if (S.view) return goHome();
  }
  if (!lbEl.hidden && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { lbGo(e.key === 'ArrowLeft' ? 1 : -1); e.preventDefault(); }
  if (e.key === 'Tab') {
    const modal = !sheetEl.hidden ? sheetEl : !lbEl.hidden ? lbEl : !callEl.hidden ? callEl : null;
    if (!modal) return;
    const f = $$('a[href],button:not([disabled]),input,textarea,select', modal).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (!modal.contains(document.activeElement)) { first.focus(); e.preventDefault(); }
    else if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
});

// مقياس الجهاز على الكمبيوتر
const mobileMQ = window.matchMedia('(max-width:600px), (max-height:560px) and (pointer:coarse)');
function fit() {
  if (mobileMQ.matches) { document.documentElement.style.setProperty('--scale', 1); return; }
  const h = window.innerHeight - 72, w = window.innerWidth - 48;
  const s = Math.min(1, h / 868, w / 414);
  document.documentElement.style.setProperty('--scale', Math.max(.55, s).toFixed(3));
}
window.addEventListener('resize', fit);
fit();

// معالجة تعذّر الخطوط بلطف
if (document.fonts && document.fonts.load) document.fonts.load('400 16px Plex', 'أوكسيرا').catch(() => {});

/* ---------- بدء ---------- */
$('#ed-intro').textContent = C.brand.definition;
screen.classList.add('asleep');
setReduce(S.reduce);
applySound();
renderLock();
renderGate();
tick();
/* ---------- التثبيت كتطبيق (PWA) ---------- */
var installEvt = null; // var: تُستدعى syncInstall من renderGate قبل الوصول إلى هذا السطر
function standalone() { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; }
function isIOS() { return /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
function syncInstall() {
  const can = !standalone() && !!(installEvt || isIOS());
  $$('[data-install], #ed-install').forEach(b => { b.hidden = !can; });
}
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; syncInstall(); });
addEventListener('appinstalled', () => { installEvt = null; syncInstall(); toast('تم تثبيت أوكسيرا. افتحه من الشاشة الرئيسية.'); });
document.addEventListener('click', e => {
  if (!e.target.closest('[data-install], #ed-install')) return;
  if (installEvt) { const ev = installEvt; installEvt = null; ev.prompt(); ev.userChoice.finally(syncInstall); return; }
  if (isIOS()) toast('في Safari: اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية».');
});
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
syncInstall();

window.__oxcira = { S, openApp, restart, ring, voice }; // للاختبارات فقط
})();
