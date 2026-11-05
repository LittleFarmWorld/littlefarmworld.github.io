/* ===== craft.js : ระบบสร้างมอนสเตอร์จากวัตถุดิบ (แทนระบบปลูก) =====
   วัตถุดิบดรอปจากการสู้ เก็บในกระเป๋า (S.mat, ซ้อนช่องละ STK) แล้วนำไปสร้างมอนสเตอร์ที่แท็บ ⚒️ สร้าง
   ยิ่งเลขมอนสเตอร์สูง ยิ่งใช้วัตถุดิบมากขึ้นและต้องใช้ระดับสูงขึ้น (ดูสูตรที่ฟังก์ชัน recipe) */
const MATS=[['wood','ไม้','🪵'],['water','น้ำ','💧'],['core','แก่นมอนสเตอร์','🔮'],['ore','แร่','⛏️'],['crystal','ผลึก','💠'],['spirit','แก่นวิญญาณ','👻'],['legend','แก่นตำนาน','🌟']];
/* ดรอปจากศัตรูทุกตัว (บอสโอกาสเท่ากัน): [โอกาสต่อศัตรู, จำนวนสูงสุดต่อครั้ง, เริ่มดรอปเมื่อถึงด่านสัดส่วนนี้ของด่านทั้งหมด]
   โอกาส .01 = 1% · ปรับตัวเลขตรงนี้เพื่อให้ดรอปง่ายขึ้น/ยากขึ้น */
const MDROP=[[.01,1,0],[.01,1,0],[.005,1,0],[.002,1,.15],[.001,1,.4],[.0005,1,.7]];
const LGDROP=.005; /* โอกาสที่บอสดรอปแก่นตำนาน (.0001 = 0.01%) */
const RARE_K=[110,221,332,443,554]; /* ตัวหายากมาก No.111 222 333 444 555 (ใส่เลข-1) ต้องใช้แก่นตำนาน 1,2,3,4,5 ชิ้นตามลำดับ */
const stUnlock=i=>Math.max(1,Math.round(NST*MDROP[i][2]));
/* สูตรสร้างของมอนสเตอร์ลำดับ k (No.k+1) → จำนวนวัตถุดิบตามลำดับใน MATS
   No.004 = ไม้ 10 น้ำ 5 แก่น 2 แล้วเพิ่มขึ้นตามเลข · แร่เริ่มที่ No.100 · ผลึกเริ่มที่ No.250 · แก่นวิญญาณเริ่มที่ No.400 */
function recipe(k){
 const n=k+1,d=Math.max(0,n-4),r=[10+Math.floor(d/4),5+Math.floor(d/8),2+Math.floor(d/10),n>=100?Math.floor((n-60)/12):0,n>=250?Math.floor((n-200)/15):0,n>=400?Math.floor((n-350)/20):0,0];
 const L=RARE_K.indexOf(k);if(L>=0)r[6]=L+1;
 return r}
const canCraft=k=>recipe(k).every((x,i)=>(S.mat[i]||0)>=x);
/* วัตถุดิบหลุดจากศัตรูที่ตาย (drop() ใน gems.js เรียกใช้) */
let fullT=0;
function matDrop(e){
 const got=[];let full=0;
 MDROP.forEach((d,i)=>{
  if(B.st<stUnlock(i))return;
  if(Math.random()<d[0]){
   const n=1+Math.floor(Math.random()*d[1]);
   if(matAdd(i,n))got.push(MATS[i][2]+n);else full=1}});
 if(e.boss&&Math.random()<LGDROP){if(matAdd(6,1)){got.push(MATS[6][2]+1);say('ได้ 🌟 แก่นตำนาน!')}else full=1}
 if(got.length)ft('+'+got.join(' '),'fh');
 if(full&&Date.now()-fullT>10000){fullT=Date.now();say('กระเป๋าเต็ม วัตถุดิบหลุดหาย')}
 if(T==='craft')craftLive()}
function craft(k){
 const r=recipe(k);if(!canCraft(k)){say('วัตถุดิบไม่พอ');return}
 r.forEach((x,i)=>{S.mat[i]-=x});
 const m=mk(k);S.mons.push(m);dx(m);last=m;say('สร้าง '+no(k,0)+' สำเร็จ!');render();save()}
/* หน้าจอแท็บสร้าง */
let crK=3,crP=0;const CRPP=12;/* crK = มอนที่เลือก (เริ่มที่ No.004), crP = หน้า */
function crPage(d){crP=Math.max(0,Math.min(Math.ceil(NSP/CRPP)-1,crP+d));render()}
function crPick(k){crK=k;render()}
function reqSpan(i,need){const have=S.mat[i]||0;return `<span id="rq${i}" style="margin-right:8px;color:${have>=need?'#2a7':'#c33'}">${MATS[i][2]}${MATS[i][1]} ${have}/${need}</span>`}
function vCraft(){
 const r=recipe(crK),np=Math.ceil(NSP/CRPP);crP=Math.max(0,Math.min(np-1,crP));
 let h=`<div class="card mut" style="text-align:center">${MATS.map((m,i)=>m[2]+'<span id="mt'+i+'">'+(S.mat[i]||0)+'</span>').join(' · ')}</div>`;
 if(last)h+=`<div class="card" style="text-align:center">สร้างสำเร็จ!<br>${spr(last.k,0,64)}<br><b>${no(last.k,0)}</b></div>`;
 h+=`<div class="card"><div class="row">${spr(crK,0,48)}<div style="flex:1"><b>${no(crK,0)}</b>${RARE_K.includes(crK)?' ⭐หายากมาก':''}<br>${JOB[MON[crK][3]]}</div></div><div class="row" style="flex-wrap:wrap;margin:4px 0">${r.map((x,i)=>x?reqSpan(i,x):'').join('')}</div><button class="btn" id="cbtn" ${canCraft(crK)?'':'disabled'} onclick="craft(${crK})">สร้าง</button></div>`;
 h+=`<div class="row" style="justify-content:space-between;margin:6px 0"><button class="btn" onclick="crPage(-10)">-10</button><button class="btn" onclick="crPage(-1)">&lt;</button><span class="mut">หน้า ${crP+1}/${np}</span><button class="btn" onclick="crPage(1)">&gt;</button><button class="btn" onclick="crPage(10)">+10</button></div><div class="grid" style="grid-template-columns:repeat(4,1fr)">`;
 for(let k=crP*CRPP;k<Math.min(NSP,crP*CRPP+CRPP);k++)h+=`<div class="cell${k===crK?' sel':''}" style="${canCraft(k)?'outline:2px solid #4c4;':''}" onclick="crPick(${k})">${spr(k,0,36)}<br>${no(k,0)}${RARE_K.includes(k)?'⭐':''}</div>`;
 h+=`</div><div class="mut" style="margin-top:6px;font-size:10px">โอกาสดรอปต่อศัตรู 1 ตัว: ${MDROP.map((d,i)=>MATS[i][2]+(+(d[0]*100).toFixed(2))+'%').join(' ')} · ${MATS[6][2]}${+(LGDROP*100).toFixed(2)}% (บอสเท่านั้น)<br>⛏️ แร่ เริ่มด่าน ${stUnlock(3)} · 💠 ผลึก ด่าน ${stUnlock(4)} · 👻 แก่นวิญญาณ ด่าน ${stUnlock(5)}<br>กรอบเขียว = สร้างได้ตอนนี้ · ⭐ = หายากมาก</div>`;
 return h}
/* อัพเดตตัวเลขบนหน้าสร้างตอนมีของดรอป โดยไม่ต้องวาดหน้าใหม่ */
function craftLive(){
 const r=recipe(crK);
 MATS.forEach((m,i)=>{const a=document.getElementById('mt'+i);if(a)a.textContent=S.mat[i]||0;
  const q=document.getElementById('rq'+i);if(q){const have=S.mat[i]||0;q.textContent=m[2]+m[1]+' '+have+'/'+r[i];q.style.color=have>=r[i]?'#2a7':'#c33'}});
 const b=document.getElementById('cbtn');if(b)b.disabled=!canCraft(crK)}
