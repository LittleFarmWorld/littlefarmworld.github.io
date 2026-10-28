/* ===== main.js : จุดเริ่มเกม (ปรับขนาดจอ, โหลดเซฟ, ตั้งเวลา loop) ===== */
const _r=render;render=function(){_r();paint()};
function fit(){const s=Math.min(2,Math.max(1,Math.min((innerWidth-12)/248,(innerHeight-24)/328))),w=document.getElementById('wrap');w.style.width=248*s+'px';w.style.height=328*s+'px';document.getElementById('dev').style.transform='scale('+s+')'}

load();S.best=S.best||1;gen();
const dt0=Math.min((Date.now()-S.t)/1000,28800),c0=S.coins;
if(dt0>30){step(dt0);setTimeout(()=>say('ตอนคุณไม่อยู่ ได้ +'+fmt(S.coins-c0)+' 🪙'),300)}
S.t=Date.now();
fit();addEventListener('resize',fit);buildCss();render();spawn();setInterval(bt,1500);
setInterval(()=>{const n=Date.now(),dt=Math.min((n-S.t)/1000,28800);S.t=n;const ev=step(dt);if(ev.length){say('✨ '+nm(ev[0])+' วิวัฒนาการ!');render()}else live()},1000);
setInterval(save,5000);
document.addEventListener('visibilitychange',()=>{if(document.hidden)save()});
