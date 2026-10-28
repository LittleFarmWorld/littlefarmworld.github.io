/* ===== battle.js : ระบบต่อสู้ (spawn ศัตรู, วาดฉาก, ตีกัน, สกิล) ===== */
let B={st:1,kills:0,en:null,php:0,pmx:1};
const zn=s=>Math.min(5,Math.floor((s-1)/5)),tAtk=()=>team().reduce((a,m)=>a+(2+m.lv*1.5)*(1+stage(m)*.6),0),tHp=()=>team().reduce((a,m)=>a+10+m.lv*6,0);
function spawn(){
const st=B.st,boss=B.kills>=4,tier=Math.min(2,Math.floor(st/8)+(boss?1:0)),n=boss?Math.floor(Math.random()*3):1+Math.floor(Math.random()*6),f=1.6/(n+.6);
const mk=b=>{const mx=Math.max(4,Math.round(18*Math.pow(st,1.35)*(b?3:f)));return{k:Math.floor(Math.random()*6),s:tier,mx,hp:mx,atk:(1.5+st*1.4)*(b?1.6:f),boss:b,f:b?1:f}};
B.en=[];for(let i=0;i<n;i++)B.en.push(mk(false));if(boss)B.en.push(mk(true));
B.bw=boss;B.pmx=tHp();if(!(B.php>0)||B.php>B.pmx)B.php=B.pmx;B.walk=3;paint()}
function paint(){const c=document.getElementById('en'),sc=document.getElementById('sc');if(!c||!B.en)return;
c.innerHTML=B.en.map((e,i)=>{const sl=e.boss?[6,14]:(B.bw?MS[i]:ES[i]),z=e.boss?76:46;e.sl=sl;return `<div class='ez' id='e${i}' style='right:${B.walk>0?-120:sl[0]}px;bottom:${sl[1]}px;z-index:${100-sl[1]};${e.dead?'opacity:0':''}'><div class='hp' style='width:${Math.round(z*.6)}px;height:4px;margin:0 auto 1px'><i id='eh${i}' style='background:#e84'></i></div><div class='sp fe a${e.k}_${e.s}' style='width:${z}px;height:${z}px;filter:hue-rotate(${e.boss?200:140}deg) saturate(.8)'></div></div>`}).join('');
if(sc)sc.className='scene '+(B.walk>0?'w':'f');
void c.offsetWidth;B.en.forEach((e,i)=>{const el=document.getElementById('e'+i);if(el)el.style.right=e.sl[0]+'px'});bars()}
function bars(){const a=document.getElementById('eh'),b=document.getElementById('ph'),c=document.getElementById('kl');if(!B.en)return;let h=0,m=0;B.en.forEach((e,i)=>{h+=Math.max(0,e.hp);m+=e.mx;const x=document.getElementById('eh'+i);if(x)x.style.width=Math.max(0,e.hp/e.mx*100)+'%'});if(a)a.style.width=h/m*100+'%';if(b)b.style.width=Math.max(0,B.php/B.pmx*100)+'%';if(c)c.textContent=B.bw?'BOSS':B.kills+'/5'}
function fl(side,t){const p=document.getElementById('sc');if(!p)return;const d=document.createElement('div');d.className='fl';d.textContent=t;d.style.cssText=(side?'right:'+(20+Math.random()*60)+'px':'left:'+(20+Math.random()*60)+'px')+';bottom:'+(84+Math.random()*24)+'px';p.appendChild(d);setTimeout(()=>d.remove(),1200)}
function hit(e){const el=document.querySelector('#e'+B.en.indexOf(e)+' .sp');if(el){el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit')}}
function bt(){
if(!team().length||!B.en)return;
if(B.walk>0){B.walk-=1.5;if(B.walk<=0){const c=document.getElementById('sc');if(c)c.className='scene f'}return}
const c2=document.getElementById('sc');if(c2){c2.classList.remove('f');void c2.offsetWidth;c2.classList.add('f')}
setTimeout(strike,360)}
function strike(){
if(!team().length||!B.en||B.walk>0)return;
const al=()=>B.en.filter(e=>e.hp>0),t=team();let tot=0,red=0,thorn=0,steal=0,ev=0;
for(const m of t){const v=SV[m.k][stage(m)];if(m.k===1)red+=v;if(m.k===2)thorn+=v;if(m.k===5)steal+=v;
 const L=al();if(!L.length)break;const e=L[Math.floor(Math.random()*L.length)];
 let x=(2+m.lv*1.5)*(1+stage(m)*.6);
 if(m.k===4&&e.boss)x*=1+v;
 if(m.k===3&&Math.random()<v){x*=2.5;fl(1,'🌑×2.5')}
 if(m.k===0&&!e.burn&&Math.random()<v){e.burn=3;e.bd=x*.4;fl(1,'🔥')}
 e.hp-=x;tot+=x;hit(e)}
for(const e of al())if(e.burn){e.hp-=e.bd;tot+=e.bd;e.burn--}
const A2=al(),got=A2.reduce((s,e)=>s+e.atk*.6,0)*(1-Math.min(.5,red));
if(thorn&&A2.length){A2[Math.floor(Math.random()*A2.length)].hp-=got*thorn;fl(1,'🌵')}
B.php=Math.min(B.pmx,B.php-got+tot*steal);
fl(1,'-'+Math.round(tot));if(steal)fl(0,'👻+'+Math.round(tot*steal));
B.en.forEach((e,i)=>{if(e.hp<=0&&!e.dead){e.dead=1;S.coins+=Math.max(1,Math.round((3+B.st*2)*e.f*(e.boss?4:1)));for(const m of team())if(addXp(m,Math.max(1,Math.round((2+B.st)*e.f))))ev=m;const el=document.getElementById('e'+i);if(el)el.style.opacity=0}});
if(B.en.every(e=>e.dead)){B.kills++;if(B.bw){say('ผ่านด่าน '+B.st+'!');if(B.st>=S.best)S.best=B.st+1;B.kills=0}B.php=Math.min(B.pmx,B.php+B.pmx*.2);spawn()}
else if(B.php<=0){B.kills=0;B.php=0;say('ทีมแพ้ ลองอัพเลเวลก่อน');spawn()}
if(ev){say('✨ '+nm(ev)+' วิวัฒนาการ!');render()}
bars()}
