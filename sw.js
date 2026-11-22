const V='navali-v1',CDN='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all([c.addAll(CORE),c.add(CDN).catch(()=>{})])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
 const html=r.mode=='navigate'||r.url.endsWith('index.html');
 e.respondWith(html?fetch(r).then(n=>{const cp=n.clone();caches.open(V).then(c=>c.put(r,cp));return n}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html')))
  :caches.match(r).then(m=>m||fetch(r).then(n=>{if(n&&(n.status==200||n.type=='opaque')){const cp=n.clone();caches.open(V).then(c=>c.put(r,cp))}return n})))});
