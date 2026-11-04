/* ===== gems.js (game) : ระบบหิน — สวม/ถอด/อัพเกรด/ขาย/ดรอป และโบนัสสถานะ =====
   หินที่สวมอยู่เก็บใน m.gems (6 ช่อง) หินที่ไม่ได้สวมเก็บใน S.bag (กระเป๋า)
   ศิลาวิวัฒนาการเก็บเป็นจำนวนใน S.evs (ใช้ช่องกระเป๋าด้วย) */
let gi=0,gs=-1,bp=0;/* gi = id หินที่เลือกในกระเป๋า (-1 = เลือกศิลาวิวัฒนาการ), gs = ช่องหินที่เลือกในหน้ามอน, bp = หน้ากระเป๋า */
const STK=99;/* ไอเทมชนิดเดียวกันซ้อนกันได้สูงสุดกี่ชิ้นต่อ 1 ช่องกระเป๋า */
const pc=x=>Math.round(x*100);
const gm=m=>m.gems||(m.gems=Array(GSLOT).fill(null));
const gsum=(m,t)=>gm(m).reduce((a,g)=>a+(g&&g.t===t?g.lv:0),0);
/* โบนัสของมอน m: ga = ตัวคูณโจมตี, gh = ตัวคูณ HP, gc = โอกาสคริ */
const ga=m=>1+gsum(m,'r')*GT.r.p, gh=m=>1+gsum(m,'g')*GT.g.p, gc=m=>Math.min(.75,gsum(m,'p')*GT.p.p);
const gbonus=g=>g.t==='p'?'+'+(g.lv*GT.p.p*100).toFixed(1)+'%':'+'+pc(g.lv*GT[g.t].p)+'%';
const gname=g=>GT[g.t].n+' Lv'+g.lv;
function rndGem(st,boss){const t='rgp'[Math.floor(Math.random()*3)];let lv=1;if(Math.random()<Math.min(.5,st/40))lv++;if(boss&&Math.random()<.4)lv++;return{id:S.gid++,t,lv:Math.min(GMAX,lv)}}
/* จำนวนช่องกระเป๋าที่ใช้อยู่ (หินชนิด+เลเวลเดียวกันซ้อนช่องละ STK, ศิลาวิวัฒนาการซ้อนช่องละ STK) ex = รายการหินที่จะเพิ่ม (ไม่บังคับ) */
function bagSlots(ex){const c={};for(const g of S.bag)c[g.t+g.lv]=(c[g.t+g.lv]||0)+1;if(ex)for(const g of ex)c[g.t+g.lv]=(c[g.t+g.lv]||0)+1;let n=Math.ceil((S.evs||0)/STK);for(const k in c)n+=Math.ceil(c[k]/STK);return n}
function bagAdd(g){if(bagSlots([g])>BAGCAP)return false;S.bag.push(g);return true}
function evAdd(n){const o=S.evs||0;if(bagSlots()-Math.ceil(o/STK)+Math.ceil((o+n)/STK)>BAGCAP)return false;S.evs=o+n;return true}
function gfind(id){const i=S.bag.findIndex(g=>g.id===id);if(i>=0)return{g:S.bag[i],bag:1,i};for(const m of S.mons){const j=gm(m).findIndex(g=>g&&g.id===id);if(j>=0)return{g:m.gems[j],m,i:j}}return null}
function gRefresh(){B.pmx=tHp();if(B.php>B.pmx)B.php=B.pmx;bars()}
function equip(mid,slot,gid){const m=mon(mid),i=S.bag.findIndex(g=>g.id===gid);if(!m||i<0||gm(m)[slot])return;m.gems[slot]=S.bag.splice(i,1)[0];gRefresh();render();save()}
function unequip(mid,slot){const m=mon(mid),g=m&&gm(m)[slot];if(!g)return;if(!bagAdd(g)){say('กระเป๋าเต็ม');return}m.gems[slot]=null;gs=-1;gRefresh();render();save()}
/* หินวัตถุดิบตีบวก: สีเดียวกัน เลเวลเท่ากัน อยู่ในกระเป๋า (ไม่นับตัวมันเอง) */
const gmat=g=>S.bag.filter(x=>x.id!==g.id&&x.t===g.t&&x.lv===g.lv);
function upg(id){
 const f=gfind(id);if(!f)return;const g=f.g;if(g.lv>=GMAX)return;
 const mt=gmat(g)[0];if(!mt){say('ต้องมี'+gname(g)+' อีก 1 เม็ดในกระเป๋า');return}
 const c=gcost(g);if(S.coins<c){say('เหรียญไม่พอ ต้องใช้ '+c);return}
 S.coins-=c;const r=Math.random(),lv=g.lv;
 const rm=x=>{const i=S.bag.findIndex(y=>y.id===x.id);if(i>=0)S.bag.splice(i,1);if(gi===x.id)gi=0};
 if(r<GUP[lv]){rm(mt);g.lv++;say('ตีบวกสำเร็จ! Lv '+g.lv)}
 else if(r<GUP[lv]+GBRK[lv]){rm(mt);if(f.bag)rm(g);else{f.m.gems[f.i]=null;gs=-1}say('หินแตก! เสียทั้ง 2 เม็ด')}
 else{rm(mt);say('ตีบวกล้มเหลว เสียหินวัตถุดิบ 1 เม็ด')}
 gRefresh();render();save()}
function sellGem(id){const i=S.bag.findIndex(g=>g.id===id);if(i<0)return;S.coins+=gsell(S.bag[i]);S.bag.splice(i,1);gi=0;render();save()}
function buyGem(){if(S.coins<GBUY)return;const g=rndGem(0,false);if(!bagAdd(g)){say('กระเป๋าเต็ม');return}S.coins-=GBUY;gi=g.id;say('ได้'+gname(g));render();save()}
/* ของหลุดจากศัตรูที่ตาย: หิน บอส 100% / ทั่วไป 6% · ศิลาวิวัฒนาการ เฉพาะบอส (EVDROP ใน state.js) เข้ากระเป๋า */
function drop(e){
 if(Math.random()<(e.boss?1:.06)){const g=rndGem(B.st,e.boss);if(bagAdd(g))say('ได้'+gname(g));else say('กระเป๋าเต็ม หินหลุดหาย')}
 if(e.boss&&Math.random()<EVDROP){if(evAdd(1))say('ได้ 💎 ศิลาวิวัฒนาการ!');else say('กระเป๋าเต็ม ศิลาหลุดหาย')}}
