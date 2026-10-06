const SCOPE=new URL(self.registration.scope);
const BASE=SCOPE.pathname;
const CACHE_PREFIX='agpeya-gate-'+encodeURIComponent(BASE)+'-';
const CACHE=CACHE_PREFIX+(typeof "398c015501fd"==='undefined'?'dev':"398c015501fd");
const PRECACHE=typeof ["/agpeya-gate/","/agpeya-gate/manifest.webmanifest","/agpeya-gate/favicon.svg","/agpeya-gate/icon-192.png","/agpeya-gate/icon-512.png","/agpeya-gate/prayer-sources.json","/agpeya-gate/assets/index-B606MMwO.css","/agpeya-gate/assets/index-DXht3php.js","/agpeya-gate/assets/local-api-BNdhaQC2.js","/agpeya-gate/assets/reminder-client-fdXHwrYH.js"]==='undefined'?[]:["/agpeya-gate/","/agpeya-gate/manifest.webmanifest","/agpeya-gate/favicon.svg","/agpeya-gate/icon-192.png","/agpeya-gate/icon-512.png","/agpeya-gate/prayer-sources.json","/agpeya-gate/assets/index-B606MMwO.css","/agpeya-gate/assets/index-DXht3php.js","/agpeya-gate/assets/local-api-BNdhaQC2.js","/agpeya-gate/assets/reminder-client-fdXHwrYH.js"];
const inScope=url=>url.origin===SCOPE.origin&&url.pathname.startsWith(BASE);
const cached=async request=>(await caches.open(CACHE)).match(request);
function readingUrl(value){
 if(typeof value!=='string')return SCOPE.href;
 try{
  // Older senders use /?reading=; carry only that reading parameter into this app's scope.
  const url=new URL(value.startsWith('/?reading=')?value.slice(1):value,SCOPE);
  if(!inScope(url)||url.pathname!==BASE||!url.searchParams.has('reading'))return SCOPE.href;
  const reading=url.searchParams.get('reading');
  return reading&&reading.length<=100?new URL('?reading='+encodeURIComponent(reading),SCOPE).href:SCOPE.href;
 }catch{return SCOPE.href;}
}
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>Promise.all(PRECACHE.map(async url=>{const response=await fetch(url,{redirect:'error',cache:'reload'});if(!response.ok)throw new Error('Offline asset unavailable');await cache.put(url,response);})))));
// Do not take over an active reading. New versions activate when all old windows close.
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&(k.startsWith(CACHE_PREFIX)||(BASE==='/'&&/^agpeya-gate-(?:v1|[a-f0-9]{12})$/.test(k)))).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||!inScope(url)||/^(?:api\/|signin|signout|callback)/.test(url.pathname.slice(BASE.length)))return;
 if(request.mode==='navigate'){event.respondWith(fetch(request).then(async r=>r.ok?r:(await cached(BASE))||r).catch(async()=>(await cached(BASE))||Response.error()));return;}
 if(PRECACHE.includes(url.pathname))event.respondWith(cached(request).then(c=>c||fetch(request)));
});
self.addEventListener('push',event=>{let data={};try{data=event.data?.json()??{}}catch{}const title=typeof data.title==='string'?data.title:'Agpeya Gate';event.waitUntil(self.registration.showNotification(title,{body:typeof data.body==='string'?data.body:'A moment for prayer.',icon:BASE+'icon-192.png',badge:BASE+'icon-192.png',tag:typeof data.tag==='string'?data.tag:'agpeya-reminder',data:{url:readingUrl(data.url)}}));});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const url=readingUrl(event.notification.data?.url);const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});const existing=windows.find(client=>{try{return inScope(new URL(client.url))}catch{return false}});if(existing){await existing.navigate(url);return existing.focus();}return self.clients.openWindow(url);})());});
