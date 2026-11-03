/* ===== battle.js : ระบบต่อสู้ (spawn ศัตรู, วาดฉาก, ตีกัน, สกิล) ===== */
let B={st:1,kills:0,en:null,php:0,pmx:1};
const zn=s=>Math.min(5,Math.floor((s-1)/5)),tAtk=()=>team().reduce((a,m)=>a+(2+m.lv*1.5)*(1+stage(m)*.6),0),tHp=()=>team().reduce((a,m)=>a+(10+m.lv*6)*gh(m),0)*(1+team().reduce((a,m)=>skt(m.k)==='hp'?a+tv(m):a,0));
function spawn(){
const st=B.st,boss=B.kills>=4,tier=Math.min(2,Math.floor(st/8)+(boss?1:0)),n=boss?Math.floor(Math.random()*3):1+Math.floor(Math.random()*6),f=1.6/(n+.6);
const mk=b=>{const mx=Math.max(4,Math.round(18*Math.pow(st,1.35)*(b?3:f)));return{k:Math.floor(Math.random()*NSP),s:tier,mx,hp:mx,atk:(1.5+st*1.4)*(b?1.6:f),boss:b,f:b?1:f}};
B.en=[];for(let i=0;i<n;i++)B.en.push(mk(false));if(boss)B.en.push(mk(true));
B.bw=boss;B.pmx=tHp();if(!(B.php>0)||B.php>B.pmx)B.php=B.pmx;B.walk=3;paint()}
function paint(){const c=document.getElementById('en'),sc=document.getElementById('sc');if(!c||!B.en)return;
c.innerHTML=B.en.map((e,i)=>{const sl=e.boss?[6,14]:(B.bw?MS[i]:ES[i]),z=e.boss?76:46;e.sl=sl;e.z=z;return `<div class='ez' id='e${i}' style='right:${B.walk>0?-120:sl[0]}px;bottom:${sl[1]}px;z-index:${100-sl[1]};${e.dead?'opacity:0':''}'><div class='hp' style='width:${Math.round(z*.6)}px;height:4px;margin:0 auto 1px'><i id='eh${i}' style='background:#e84'></i></div>${spr(e.k,e.s,z,'transform:scaleX(-1)')}</div>`}).join('');
if(sc)sc.className='scene '+(B.walk>0?'w':'f');
void c.offsetWidth;B.en.forEach((e,i)=>{const el=document.getElementById('e'+i);if(el)el.style.right=e.sl[0]+'px'});bars()}
function bars(){const a=document.getElementById('eh'),b=document.getElementById('ph'),c=document.getElementById('kl');if(!B.en)return;let h=0,m=0;B.en.forEach((e,i)=>{h+=Math.max(0,e.hp);m+=e.mx;const x=document.getElementById('eh'+i);if(x)x.style.width=Math.max(0,e.hp/e.mx*100)+'%'});if(a)a.style.width=h/m*100+'%';if(b)b.style.width=Math.max(0,B.php/B.pmx*100)+'%';if(c)c.textContent=B.bw?'BOSS':B.kills+'/5'}
/* ตัวเลขลอย: fx = วางที่พิกัด, fe = เหนือศัตรู, ft = เหนือทีมเรา
   cls: fn ปกติ | fc คริติคอล | fb ไฟ/หนาม | fh ฟื้น HP | fd เราโดนตี | fs ป้ายสถานะ */
let fd=0;
const dn=x=>fmt(Math.max(1,Math.round(x)));
function fx(t,c,side,pos,y){const p=document.getElementById('sc');if(!p)return;const d=document.createElement('div'),dl=Math.min(fd++,8)*.1;d.className='fl '+c;d.textContent=t;d.style.cssText=side+':'+Math.round(pos)+'px;bottom:'+Math.round(y)+'px;animation-delay:'+dl+'s';p.appendChild(d);setTimeout(()=>d.remove(),1400+dl*1000)}
function fe(e,t,c){const z=e.z||46,sl=e.sl||[20,20];fx(t,c,'right',sl[0]+z/2-12+Math.random()*14-7,sl[1]+z*.6+Math.random()*8)}
function ft(t,c){const n=Math.max(1,team().length),i=Math.floor(Math.random()*n);fx(t,c,'left',HS[i][0]+16+Math.random()*12,HS[i][1]+34+Math.random()*8)}
function hit(e){const el=document.querySelector('#e'+B.en.indexOf(e)+' .sp');if(el){el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit')}}
function bt(){
if(!team().length||!B.en)return;
if(B.walk>0){B.walk-=1.5;if(B.walk<=0){const c=document.getElementById('sc');if(c)c.className='scene f'}return}
const c2=document.getElementById('sc');if(c2){c2.classList.remove('f');void c2.offsetWidth;c2.classList.add('f')}
setTimeout(strike,360)}
function strike(){
if(!team().length||!B.en||B.walk>0)return;
fd=0;const al=()=>B.en.filter(e=>e.hp>0),t=team();let tot=0,red=0,thorn=0,steal=0,heal=0,ev=0;
for(const m of t){const v=tv(m),ty=skt(m.k),ic=sk(m.k)[0];
 if(ty==='guard')red+=v;if(ty==='thorn')thorn+=v;if(ty==='steal')steal+=v;if(ty==='heal')heal+=v;
 const L=al();if(!L.length)break;const e=L[Math.floor(Math.random()*L.length)];
 let x=(2+m.lv*1.5)*(1+stage(m)*.6)*ga(m),cr=0;
 if(ty==='boss'&&e.boss)x*=1+v;
 if(ty==='crit'&&Math.random()<v){x*=2.5;cr=1}
 if(!cr&&Math.random()<gc(m)){x*=2;cr=1}
 if(ty==='burn'&&!e.burn&&Math.random()<v){e.burn=3;e.bd=x*.4;fe(e,'BURN','fs')}
 if(ty==='stun'&&Math.random()<v){e.stun=1;fe(e,'STUN','fs')}
 if(ty==='multi'&&Math.random()<v){const o=al().filter(q=>q!==e),e2=o.length?o[Math.floor(Math.random()*o.length)]:e;e2.hp-=x*.7;tot+=x*.7;hit(e2);fe(e2,dn(x*.7),'fn')}
 if(ty==='splash')for(const o of al())if(o!==e){o.hp-=x*v;tot+=x*v;fe(o,dn(x*v),'fn')}
 e.hp-=x;tot+=x;hit(e);fe(e,dn(x)+(cr?'!':''),cr?'fc':'fn')}
for(const e of al())if(e.burn){e.hp-=e.bd;tot+=e.bd;e.burn--;fe(e,dn(e.bd),'fb')}
const A2=al(),got=A2.filter(e=>!e.stun).reduce((s,e)=>s+e.atk*.6,0)*(1-Math.min(.5,red));
for(const e of B.en)e.stun=0;
if(thorn&&A2.length){const o=A2[Math.floor(Math.random()*A2.length)];o.hp-=got*thorn;fe(o,dn(got*thorn),'fb')}
B.php=Math.min(B.pmx,B.php-got+tot*steal+B.pmx*heal);
if(got>=.5)ft('-'+dn(got),'fd');if(steal&&tot*steal>=.5)ft('+'+dn(tot*steal),'fh');if(heal)ft('+'+dn(B.pmx*heal),'fh');
B.en.forEach((e,i)=>{if(e.hp<=0&&!e.dead){e.dead=1;drop(e);S.coins+=Math.max(1,Math.round((3+B.st*2)*e.f*(e.boss?4:1)));for(const m of team())if(addXp(m,Math.max(1,Math.round((2+B.st)*e.f))))ev=m;const el=document.getElementById('e'+i);if(el)el.style.opacity=0}});
if(B.en.every(e=>e.dead)){B.kills++;if(B.bw){say('ผ่านด่าน '+B.st+'!');if(B.st>=S.best)S.best=B.st+1;B.kills=0}B.php=Math.min(B.pmx,B.php+B.pmx*.2);spawn()}
else if(B.php<=0){B.kills=0;B.php=0;say('ทีมแพ้ ลองอัพเลเวลก่อน');spawn()}
if(ev){say('✨ '+nm(ev)+' วิวัฒนาการ!');render()}
bars()}
