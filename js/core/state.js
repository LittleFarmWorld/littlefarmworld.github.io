/* ===== state.js : สถานะเกม, สูตรคำนวณ, เซฟ/โหลด, ตัวช่วยพื้นฐาน ===== */
const EVLV=[5,12]; /* เลเวลที่ต้องถึงเพื่อวิวัฒนาการเป็นร่าง 2 และร่าง 3 (ต้องใช้ศิลาด้วย) */
const EVDROP=1;     /* โอกาสที่บอสดรอปศิลาวิวัฒนาการ (0.01 = 1%) */
const stage=m=>m.ev||0, need=l=>8+l*4, val=m=>15+m.lv*8+stage(m)*60, rate=m=>(0.4+m.lv*0.25)*(1+stage(m)*0.6);
const canEvo=m=>stage(m)<2&&m.lv>=EVLV[stage(m)];
const nm=m=>no(m.k,stage(m)), fmt=n=>n>=1000?(n/1000).toFixed(1)+'k':Math.floor(n);
let S,T='farm',sid=0,L=[],last=null,tt,dp=0;
function load(){
 try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){S=null}
 if(!S||!S.mons){S={coins:30,nid:1,mons:[],team:[],dex:{},t:Date.now()};const m=mk(0);S.mons.push(m);S.team.push(m.id);dx(m)}
 S.bag=S.bag||[];S.gid=S.gid||1;/* กระเป๋าเก็บหิน */
 S.evs=S.evs||0;/* จำนวนศิลาวิวัฒนาการ */
 for(const m of S.mons)if(m.ev===undefined)m.ev=m.lv>=12?2:m.lv>=5?1:0;/* เซฟเก่า: คงร่างปัจจุบันไว้ */
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function mk(k,lv){return{id:S.nid++,k,lv:lv||1,xp:0,ev:0}}
function dx(m){S.dex[m.k+'_'+stage(m)]=1}
function addXp(m,x){m.xp+=x;while(m.xp>=need(m.lv)){m.xp-=need(m.lv);m.lv++}dx(m);return false}
const mon=id=>S.mons.find(m=>m.id===id), team=()=>S.team.map(mon).filter(Boolean);
const income=()=>team().reduce((a,m)=>a+rate(m),0);
function step(dt){const ev=[];for(const m of team()){S.coins+=rate(m)*dt;if(addXp(m,dt))ev.push(m)}return ev}
function say(t){const e=document.getElementById('ts');e.textContent=t;e.style.display='block';clearTimeout(tt);tt=setTimeout(()=>e.style.display='none',2200)}
