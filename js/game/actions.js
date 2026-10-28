/* ===== actions.js : การกระทำของผู้เล่น (เลือกด่าน, ให้อาหาร, ทีม, ขาย, ปลูก, ซื้อ) ===== */
function pick(i){B.st=i;B.kills=0;B.php=0;T='farm';render();spawn()}
function feed(id){const m=mon(id),c=5*m.lv;if(S.coins<c){say('เหรียญไม่พอ ต้องใช้ '+c);return}S.coins-=c;if(addXp(m,20))say('✨ '+nm(m)+' วิวัฒนาการ!');render();save()}
function tg(id){const i=S.team.indexOf(id);if(i>=0)S.team.splice(i,1);else if(S.team.length<3)S.team.push(id);else say('ฟาร์มเต็ม (สูงสุด 3 ตัว)');render();save()}
function sell(id){if(S.mons.length<=1){say('ขายตัวสุดท้ายไม่ได้');return}const m=mon(id);S.coins+=val(m);S.mons=S.mons.filter(x=>x.id!==id);S.team=S.team.filter(x=>x!==id);sid=0;render();save()}
function plant(){if(S.coins<40)return;S.coins-=40;let r=Math.random()*W.reduce((a,b)=>a+b,0),k=0;while(r>W[k]){r-=W[k];k++}const m=mk(k);S.mons.push(m);dx(m);last=m;render();save()}
function gen(){L=[];for(let i=0;i<4;i++){const m={k:Math.floor(Math.random()*NSP),lv:1+Math.floor(Math.random()*15)};m.p=Math.round(val(m)*1.4);L.push(m)}}
function buy(i){const x=L[i];if(S.coins<x.p)return;S.coins-=x.p;const m=mk(x.k,x.lv);S.mons.push(m);dx(m);L.splice(i,1);say('ซื้อ '+nm(m)+' แล้ว');render();save()}
