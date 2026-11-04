/* ===== bag.js (ui) : หน้ากระเป๋า + ส่วนแสดงหินที่ใช้ร่วมกับหน้ามอน ===== */
const gemC=g=>g?`<span class="gm" style="background:${GT[g.t].c}">${g.lv}</span>`:'<span class="gm e"></span>';
/* บรรทัดอัพเกรด: ราคา โอกาสสำเร็จ โอกาสแตก */
function gUpTxt(g){if(g.lv>=GMAX)return 'เลเวลสูงสุดแล้ว';const n=gmat(g).length;return `ตีบวก Lv${g.lv}→${g.lv+1}: ใช้${GT[g.t].n} Lv${g.lv} อีก 1 เม็ด (มี ${n}) + ${gcost(g)} 🪙<br>สำเร็จ ${pc(GUP[g.lv])}% · แตกทั้งคู่ ${pc(GBRK[g.lv])}% · ล้มเหลว ${pc(1-GUP[g.lv]-GBRK[g.lv])}% (เสียวัตถุดิบ 1)`}
function gUpBtn(g){return g.lv>=GMAX?'':`<button class="btn" onclick="upg(${g.id})" ${S.coins<gcost(g)||!gmat(g).length?'disabled':''}>ตีบวก</button>`}
function gInfo(g){return `<div class="row">${gemC(g)}<div style="flex:1"><b>${gname(g)}</b> ${GT[g.t].d} ${gbonus(g)}<br><span class="mut">${gUpTxt(g)}</span></div></div>`}

function bpg(d){bp=Math.max(0,Math.min(Math.ceil(BAGCAP/BPP)-1,bp+d));render()}
/* รายการไอเทมในกระเป๋าเรียงเป็นช่อง: ศิลาวิวัฒนาการก่อน แล้วหินเรียงตามสี/เลเวล (ชนิดเดียวกันซ้อนช่องละ STK) */
function bagItems(){
 const it=[];let n=S.evs||0;
 while(n>0){const c=Math.min(STK,n);it.push({e:1,n:c});n-=c}
 const m={};for(const g of S.bag){const k=g.t+g.lv;(m[k]=m[k]||[]).push(g)}
 Object.keys(m).sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:m[b][0].lv-m[a][0].lv).forEach(k=>{const l=m[k];for(let i=0;i<l.length;i+=STK)it.push({g:l[i],n:Math.min(STK,l.length-i),ids:l.slice(i,i+STK).map(x=>x.id)})});
 return it}
const cnt=(n,f)=>`<span class="mut" style="display:block;font-size:8px;line-height:9px;min-height:9px">${n>1||f?'x'+n:''}</span>`;
function vBag(){
 const it=bagItems(),sel=S.bag.find(g=>g.id===gi);
 if(!sel&&!(gi===-1&&(S.evs||0)>0))gi=0;
 let h=`<div class="card row" style="justify-content:space-between"><span><b>กระเป๋า</b> ${bagSlots()}/${BAGCAP}</span><button class="btn" ${S.coins<GBUY||bagSlots()>=BAGCAP?'disabled':''} onclick="buyGem()">ซื้อหินสุ่ม ${GBUY} 🪙</button></div>`;
 if(sel)h+=`<div class="card">${gInfo(sel)}<div class="row" style="margin-top:4px">${gUpBtn(sel)}<button class="btn" style="background:#b8570f" onclick="sellGem(${sel.id})">ขาย ${gsell(sel)} 🪙</button></div></div>`;
 else if(gi===-1)h+=`<div class="card row"><span style="font-size:20px">💎</span><div style="flex:1"><b>ศิลาวิวัฒนาการ</b> x${S.evs||0}<br><span class="mut">ใช้วิวัฒนาการมอน: ร่าง 2 ใช้ ${EVCOST[0]} · ร่าง 3 ใช้ ${EVCOST[1]}<br>ดรอปจากบอส ${+(EVDROP*100).toFixed(2)}% · ซ้อนได้ช่องละ ${STK}</span></div></div>`;
 else h+=`<div class="card mut">แตะไอเทมเพื่อดูรายละเอียด · หินตีบวก/ขายได้<br>สวมหินที่หน้า "มอน" (ช่องหิน 6 ช่องต่อตัว)</div>`;
 const np=Math.ceil(BAGCAP/BPP);bp=Math.max(0,Math.min(np-1,bp));
 h+=`<div class="row" style="justify-content:space-between;margin-bottom:6px"><button class="btn" onclick="bpg(-10)">-10</button><button class="btn" onclick="bpg(-1)">&lt;</button><span class="mut">หน้า ${bp+1}/${np}</span><button class="btn" onclick="bpg(1)">&gt;</button><button class="btn" onclick="bpg(10)">+10</button></div>`;
 h+='<div class="grid" style="grid-template-columns:repeat(6,1fr)">';
 for(let i=bp*BPP;i<Math.min(BAGCAP,bp*BPP+BPP);i++){const x=it[i];
  if(!x){h+='<div class="cell" style="opacity:.5"><span class="gm" style="visibility:hidden"></span>'+cnt(0)+'</div>';continue}
  if(x.e)h+=`<div class="cell${gi===-1?' sel':''}" onclick="gi=${gi===-1?0:-1};render()"><span style="font-size:15px;line-height:16px;display:block">💎</span>${cnt(x.n,1)}</div>`;
  else{const on=x.ids.includes(gi);h+=`<div class="cell${on?' sel':''}" onclick="gi=${on?0:x.g.id};render()">${gemC(x.g)}${cnt(x.n)}</div>`}}
 h+='</div>';
 h+=`<div class="mut" style="margin-top:6px">${Object.keys(GT).map(t=>`<span class="gm" style="background:${GT[t].c};width:10px;height:10px;vertical-align:middle"></span> ${GT[t].d}`).join(' · ')}<br>ตีบวก = ใช้หินสีเดียวกัน เลเวลเท่ากัน 1 เม็ด (+1 กับ +1 → +2)<br>ของชนิดเดียวกันซ้อนกันได้ช่องละ ${STK} · หินได้จากการสู้ (บอสดรอปแน่นอน) หรือซื้อ</div>`;
 return h;
}

/* รวมหินชนิด+เลเวลเดียวกันเป็นกลุ่มเดียว (กันรายการยาวเมื่อกระเป๋าเยอะ) */
function gGroups(l){const o=[],m={};for(const g of l){const k=g.t+g.lv;if(m[k])m[k].n++;else{m[k]={g,n:1};o.push(m[k])}}return o}

/* ส่วนหินในหน้ามอน (vBox เรียกใช้) */
function vGems(d){
 const gl=gm(d);
 let h=`<div class="card"><div class="mut" style="margin-bottom:3px">หิน ${gl.filter(Boolean).length}/${GSLOT} · โจมตี +${pc(ga(d)-1)}% · HP +${pc(gh(d)-1)}% · คริ ${pc(gc(d))}%</div><div class="row" style="justify-content:space-between">`;
 h+=gl.map((g,i)=>`<span class="gs${gs===i?' sel':''}" onclick="gs=${gs===i?-1:i};render()">${gemC(g)}</span>`).join('')+'</div>';
 if(gs>=0){const g=gl[gs];
  if(g)h+=`<div style="margin-top:4px">${gInfo(g)}<div class="row" style="margin-top:4px">${gUpBtn(g)}<button class="btn" onclick="unequip(${d.id},${gs})">ถอดใส่กระเป๋า</button></div></div>`;
  else{const bl=S.bag.slice().sort((a,b)=>a.t<b.t?-1:a.t>b.t?1:b.lv-a.lv);
   h+=bl.length?`<div class="mut" style="margin:4px 0 2px">เลือกหินจากกระเป๋าเพื่อสวมช่อง ${gs+1}</div><div class="row" style="flex-wrap:wrap">${gGroups(bl).map(x=>`<span class="gs" onclick="equip(${d.id},${gs},${x.g.id})">${gemC(x.g)}${x.n>1?'<span class="mut">x'+x.n+'</span>':''}</span>`).join('')}</div>`:'<div class="mut" style="margin-top:4px">กระเป๋าไม่มีหิน (สู้บอสหรือซื้อที่แท็บกระเป๋า)</div>'}}
 return h+'</div>';
}
