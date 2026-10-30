const CACHE="pcge-v1";
const SHELL=["./","index.html","manifest.json","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;const u=new URL(q.url);
 if(u.origin===location.origin){e.respondWith(fetch(q,{cache:"no-store"}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(q,c));return r}).catch(()=>caches.match(q).then(r=>r||caches.match("index.html"))))}
 else if(/fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(q,c));return res})))}});