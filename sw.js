// network-first: 問題データが更新され続けるため cache-first にしない。
// 年度データを追加したら ASSETS にも追記し、CACHE_NAME を上げること。
// 他の科目アプリと同一オリジンで公開されるため、削除対象は自アプリの接頭辞のキャッシュだけに限る。
const CACHE_PREFIX = "zaimu-quiz-";
const CACHE_NAME = CACHE_PREFIX + "v1";

const ASSETS = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "icon.svg",
  "data/registry.js",
  "data/r08.js",
  "data/r07.js",
  "data/r06.js",
  "data/r05.js",
  "data/r05s.js",
  "data/r04.js",
  "data/r03.js",
  "data/r02.js",
  "data/r01.js",
  "data/h30.js",
  "data/h29.js",
  "data/h28.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(ASSETS.map((url) => cache.add(url).catch(() => {})))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req, { cache: "no-store" })
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html"))
      )
  );
});
