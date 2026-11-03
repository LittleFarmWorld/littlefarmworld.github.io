/* ===== sprites.js : วาดสไปรต์มอนสเตอร์จากชีต (ภาพนิ่ง) ===== */
/* spr(k,s,sz) = กล่องขนาด sz px แสดงมอน k ร่าง s (0-2) ใช้ background-position เลือกช่องจากชีต */
function spr(k,s,sz,x){return `<div class='sp mn' style='width:${sz}px;height:${sz}px;background-image:url(${monImg(k)});background-position:${s*50}% ${k%4*100/3}%;${x||''}'></div>`}
function buildCss(){let c='';BG.forEach((u,i)=>c+='#sc[data-z="'+i+'"]{background-image:url('+u+')'+(i>5?',url('+BG[i%6]+')':'')+'}');const s=document.createElement('style');s.textContent=c;document.head.appendChild(s)}
