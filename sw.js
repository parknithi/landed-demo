const C="landed-v4",F=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
if(r.mode==="navigate"||u.pathname.endsWith(".html")||u.pathname.endsWith("/")){e.respondWith(fetch(r,{cache:"no-store"}).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n}).catch(()=>caches.match(r).then(x=>x||caches.match("./index.html"))));return}
e.respondWith(caches.match(r).then(x=>x||fetch(r).then(n=>{if(n.ok&&u.origin===location.origin){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp))}return n})))});
