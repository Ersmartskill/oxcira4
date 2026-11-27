/* عامل الخدمة لإعلان أوكسيرا: يجعل الإعلان قابلًا للتثبيت ويعمل دون إنترنت.
   عند أي تعديل على الملفات غيّر رقم VERSION ليحصل الزوار على النسخة الجديدة. */
const VERSION = 'oxcira-v3.1';
const CORE = ['./', 'index.html', 'style.css?v=4', 'app.js?v=4', 'config.js?v=4', 'manifest.webmanifest'];
const ASSETS = [
  'assets/app-icon.png', 'assets/icon-192.png', 'assets/icon-512.png', 'assets/icon-maskable-512.png',
  'assets/oxcira-logo.png', 'assets/oxcira-logo-white.png', 'assets/oxcira-logo-white-stacked.png', 'assets/oxcira-mark-white.png', 'assets/oxcira-icon.png',
  'assets/ringtone-reflection.m4a',
  'assets/call-ar-1.mp3',
  'assets/call-ar-2.mp3',
  'assets/call-ar-3.mp3',
  'assets/call-ar-4.mp3',
  'assets/fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2',
  'assets/fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2',
  'assets/fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2',
  'assets/fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2',
  'assets/fonts/ibm-plex-sans-latin-400-normal.woff2',
  'assets/fonts/ibm-plex-sans-latin-600-normal.woff2',
  'assets/social-1.webp',
  'assets/social-2.webp',
  'assets/social-3.webp',
  'assets/social-4.webp',
  'assets/social-5.webp',
  'assets/social-6.webp',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE.concat(ASSETS))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// الصوت يُطلب بأجزاء (Range) خاصة في سفاري؛ نقتطع الجزء المطلوب من النسخة المحفوظة
async function rangeFrom(res, range) {
  const buf = await res.arrayBuffer(), m = /bytes=(\d*)-(\d*)/.exec(range) || [];
  const start = m[1] ? +m[1] : 0, end = m[2] ? Math.min(+m[2], buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg',
    'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`, 'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' } });
}

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return; // الروابط الخارجية تمرّ كما هي
  const range = req.headers.get('range');
  if (range) {
    e.respondWith(caches.match(req.url, { ignoreSearch: true }).then(hit => hit ? rangeFrom(hit, range) : fetch(req)));
    return;
  }
  const core = req.mode === 'navigate' || /\.(html|css|js|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
  if (core) {
    // الشبكة أولًا لتصل التحديثات، والنسخة المحفوظة عند انقطاع الإنترنت
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then(r => r || caches.match('index.html'))));
    return;
  }
  // الصور والخطوط والصوت: المحفوظ أولًا، ثم الشبكة مع الحفظ
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok && res.status === 200) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
