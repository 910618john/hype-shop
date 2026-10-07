// 照片：快取優先（檔名不重複，可放心快取）；其他：網路優先，離線才用快取。不快取 GitHub API。
const C="hype-v2";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin)return;
  const key=u.origin+u.pathname; // 去掉 ?t= 之類的參數，避免快取越存越多
  if(/\/img\//.test(u.pathname)){
    e.respondWith(caches.open(C).then(c=>c.match(key).then(hit=>hit||fetch(r).then(res=>{if(res.ok)c.put(key,res.clone());return res}))));
    return;
  }
  e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(key,c))}return res}).catch(()=>caches.match(key)));
});
