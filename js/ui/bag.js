/* ===== bag.js (ui) : หน้ากระเป๋า + ส่วนแสดงหินที่ใช้ร่วมกับหน้ามอน ===== */
const gemC=g=>g?`<span class="gm" style="background:${GT[g.t].c}">${g.lv}</span>`:'<span class="gm e"></span>';
/* บรรทัดอัพเกรด: ราคา โอกาสสำเร็จ โอกาสแตก */
function gUpTxt(g){if(g.lv>=GMAX)return 'เลเวลสูงสุดแล้ว';return `อัพเกรด Lv${g.lv}→${g.lv+1}: ${gcost(g)} 🪙<br>สำเร็จ ${pc(GUP[g.lv])}% · แตก ${pc(GBRK[g.lv])}%`}
function gUpBtn(g){return g.lv>=GMAX?'':`<button class="btn" onclick="upg(${g.id})" ${S.coins<gcost(g)?'disabled':''}>อัพเกรด</button>`}
function gInfo(g){return `<div class="row">${gemC(g)}<div style="flex:1"><b>${gname(g)}</b> ${GT[g.t].d} ${gbonus(g)}<br><span class="mut">${gUpTxt(g)}</span></div></div>`}

function vBag(){
 const sorted=S.bag.slice().sort((a,b)=>a.t<b.t?-1:a.t>b.t?1:b.lv-a.lv);
 const sel=S.bag.find(g=>g.id===gi);if(!sel)gi=0;
 let h=`<div class="card row" style="justify-content:space-between"><span><b>กระเป๋า</b> ${S.bag.length}/${BAGCAP}</span><button class="btn" ${S.coins<GBUY||S.bag.length>=BAGCAP?'disabled':''} onclick="buyGem()">ซื้อหินสุ่ม ${GBUY} 🪙</button></div>`;
 if(sel)h+=`<div class="card">${gInfo(sel)}<div class="row" style="margin-top:4px">${gUpBtn(sel)}<button class="btn" style="background:#b8570f" onclick="sellGem(${sel.id})">ขาย ${gsell(sel)} 🪙</button></div></div>`;
 else h+=`<div class="card mut">แตะหินเพื่อดูรายละเอียด / อัพเกรด / ขาย<br>สวมหินที่หน้า "มอน" (ช่องหิน 6 ช่องต่อตัว)</div>`;
 h+='<div class="grid" style="grid-template-columns:repeat(6,1fr)">';
 for(let i=0;i<BAGCAP;i++){const g=sorted[i];h+=g?`<div class="cell${g.id===gi?' sel':''}" onclick="gi=${g.id===gi?0:g.id};render()">${gemC(g)}</div>`:'<div class="cell" style="opacity:.5">'+gemC(null)+'</div>'}
 h+='</div>';
 h+=`<div class="mut" style="margin-top:6px">${Object.keys(GT).map(t=>`<span class="gm" style="background:${GT[t].c};width:10px;height:10px;vertical-align:middle"></span> ${GT[t].d}`).join(' · ')}<br>หินได้จากการสู้ (บอสดรอปแน่นอน) หรือซื้อ</div>`;
 return h;
}

/* ส่วนหินในหน้ามอน (vBox เรียกใช้) */
function vGems(d){
 const gl=gm(d);
 let h=`<div class="card"><div class="mut" style="margin-bottom:3px">หิน ${gl.filter(Boolean).length}/${GSLOT} · โจมตี +${pc(ga(d)-1)}% · HP +${pc(gh(d)-1)}% · คริ ${pc(gc(d))}%</div><div class="row" style="justify-content:space-between">`;
 h+=gl.map((g,i)=>`<span class="gs${gs===i?' sel':''}" onclick="gs=${gs===i?-1:i};render()">${gemC(g)}</span>`).join('')+'</div>';
 if(gs>=0){const g=gl[gs];
  if(g)h+=`<div style="margin-top:4px">${gInfo(g)}<div class="row" style="margin-top:4px">${gUpBtn(g)}<button class="btn" onclick="unequip(${d.id},${gs})">ถอดใส่กระเป๋า</button></div></div>`;
  else{const bl=S.bag.slice().sort((a,b)=>a.t<b.t?-1:a.t>b.t?1:b.lv-a.lv);
   h+=bl.length?`<div class="mut" style="margin:4px 0 2px">เลือกหินจากกระเป๋าเพื่อสวมช่อง ${gs+1}</div><div class="row" style="flex-wrap:wrap">${bl.map(x=>`<span class="gs" onclick="equip(${d.id},${gs},${x.id})">${gemC(x)}</span>`).join('')}</div>`:'<div class="mut" style="margin-top:4px">กระเป๋าไม่มีหิน (สู้บอสหรือซื้อที่แท็บกระเป๋า)</div>'}}
 return h+'</div>';
}
