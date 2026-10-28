/* ===== views.js : หน้าจอทุกแท็บ + render() ===== */
function vStg(){let h="<div class='card mut' style='text-align:center'>เลือกด่าน (ชนะบอสเพื่อปลดล็อกด่านถัดไป)</div><div class='grid' style='grid-template-columns:repeat(5,1fr)'>";for(let i=1;i<=30;i++){const o=i<=S.best;h+=`<div class='cell${i===B.st?' sel':''}' style='padding:6px 0;${o?'':'opacity:.4'}' ${o?`onclick='pick(${i})'`:''}>${o?i:'🔒'}</div>`}return h+'</div>'}
function vFarm(){const s=B.st,z=zn(s),c=ZC[z];return `<div class='scene ${B.walk>0?'w':'f'}' id='sc' data-z='${z}' style='background-color:${c[0]}'>${team().map((m,i)=>`<div class='sp a${m.k}_${stage(m)}' style='position:absolute;left:${HS[i][0]}px;bottom:${HS[i][1]}px;z-index:${100-HS[i][1]};width:56px;height:56px'></div>`).join('')}<div id='en'></div><div style='position:absolute;left:4px;top:4px;width:80px'><div class='hp'><i id='ph' style='background:#4d4'></i></div></div><div style='position:absolute;right:4px;top:4px;width:80px'><div class='hp'><i id='eh'></i></div></div><div class='kl' id='kl'></div></div>`+vFarmOld()}
function vFarmOld(){
 const t=team();let h='<div class="farm">';
 for(let i=0;i<3;i++){const m=t[i];
  h+=m?`<div class="slot" onclick="feed(${m.id})"><div class="bob">${spr(m.k,stage(m),34)}</div>${nm(m)}<br>Lv <span id="lv${m.id}">${m.lv}</span><div class="bar"><i id="xp${m.id}" style="width:${m.xp/need(m.lv)*100}%"></i></div></div>`
  :`<div class="slot" onclick="go('box')" style="padding-top:10px">+ ว่าง<br><span class="mut">เลือกจากคลัง</span></div>`}
 return h+`</div><div class="mut" style="font-size:9px;text-align:center">แตะมอนเพื่อให้อาหาร (5×เลเวล 🪙 = EXP +20)</div>`;
}
function vBox(){
 const d=mon(sid);let h='';
 if(d){const s=stage(d),on=S.team.includes(d.id);
  h+=`<div class="card row">${spr(d.k,s,48)}<div style="flex:1"><b>${nm(d)}</b><br>${ST[s]} · Lv ${d.lv}<br>+${rate(d).toFixed(1)}/วิ</div></div><div class="card mut" style="font-size:10px">${skd(d)}</div><div class="row" style="margin-bottom:6px"><button class="btn" onclick="tg(${d.id})">${on?'ถอดจากฟาร์ม':'ส่งไปฟาร์ม'}</button><button class="btn" style="background:#b8570f" onclick="sell(${d.id})">ขาย ${val(d)} 🪙</button></div>`}
 return h+'<div class="grid">'+S.mons.map(m=>`<div class="cell${m.id===sid?' sel':''}" onclick="sid=${m.id};render()">${spr(m.k,stage(m),36)}<br>Lv ${m.lv}${S.team.includes(m.id)?' ⭐':''}</div>`).join('')+'</div>';
}
function vCatch(){
 let h=`<div class="card" style="text-align:center"><div style="font-size:30px">🌱</div>ปลูกเมล็ดลึกลับ ได้มอนร่าง 1 แบบสุ่ม<br><button class="btn" style="margin-top:6px" ${S.coins<40?'disabled':''} onclick="plant()">ปลูกเมล็ด 40 🪙</button></div>`;
 if(last)h+=`<div class="card" style="text-align:center">ได้ตัวใหม่!<br>${spr(last.k,0,72)}<br><b>${SP[last.k].n[0]}</b></div>`;
 return h;
}
function vMkt(){
 return `<div class="row" style="margin-bottom:6px;justify-content:space-between"><span class="mut">ตลาดจำลอง (ผู้เล่นจริงมาตอนต่อเซิร์ฟเวอร์)</span><button class="btn" onclick="gen();render()">รีเฟรช</button></div>`+
 (L.length?L.map((x,i)=>`<div class="card row">${spr(x.k,stage(x),40)}<div style="flex:1"><b>${nm(x)}</b><br>Lv ${x.lv} · ${ST[stage(x)]}</div><button class="btn" ${S.coins<x.p?'disabled':''} onclick="buy(${i})">${x.p} 🪙</button></div>`).join(''):'<div class="card mut">ขายหมดแล้ว กดรีเฟรชเพื่อดูของใหม่</div>');
}
function vDex(){
 let n=Object.keys(S.dex).length,h=`<div class="card mut" style="text-align:center">สะสมแล้ว ${n}/${NSP*3} ร่าง</div><div class="grid">`;
 for(let k=0;k<NSP;k++)for(let s=0;s<3;s++){const o=S.dex[k+'_'+s];
  h+=`<div class="cell" style="${o?'':'opacity:.5'}"><div style="${o?'':'filter:brightness(0)'}">${spr(k,s,36)}</div>${o?SP[k].n[s]:'???'}</div>`}
 return h+'</div>';
}
const V={farm:vFarm,box:vBox,catch:vCatch,mkt:vMkt,dex:vDex,stg:vStg},TB=[['farm','⚔️','ต่อสู้'],['stg','📍',''],['box','🎒','คลัง'],['catch','🌱','ปลูก'],['mkt','🏪','ตลาด'],['dex','📖','ดัชนี']];
function render(){
 document.getElementById('ui').innerHTML=`<div class="hd"><span>🪙 <b id="co">${fmt(S.coins)}</b></span><span id="inc">+${income().toFixed(1)}/วิ</span></div><div class="main">${V[T]()}</div><div class="tabs">${TB.map(b=>`<button class="${T===b[0]?'on':''}" onclick="go('${b[0]}')">${b[1]}<br>${b[0]==='stg'?'ด่าน '+B.st:b[2]}</button>`).join('')}</div>`;
}
function live(){
 const c=document.getElementById('co');if(c)c.textContent=fmt(S.coins);
 const i=document.getElementById('inc');if(i)i.textContent='+'+income().toFixed(1)+'/วิ';
 for(const m of team()){const a=document.getElementById('xp'+m.id),b=document.getElementById('lv'+m.id);if(a)a.style.width=m.xp/need(m.lv)*100+'%';if(b)b.textContent=m.lv}
 const p=document.querySelector('.btn[onclick="plant()"]');if(p)p.disabled=S.coins<40;
}
function go(t){T=t;if(t!=='catch')last=null;render()}
