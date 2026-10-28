/* ===== sprites.js : สร้างสไปรต์ (CSS จากไฟล์รูป, SVG, bake ลง canvas) ===== */
const PX={};
function spr(k,s,sz){return `<div class='sp a${k}_${s}' style='width:${sz}px;height:${sz}px'></div>`}
function buildCss(){let c='';BG.forEach((u,i)=>c+='#sc[data-z="'+i+'"]{background-image:url('+u+')}');for(const k in ATLAS)c+='.a'+k+"{background-image:url('"+ATLAS[k]+"')}";if(STILL)c+='.sp{background-size:100% 100%!important;background-position:0 0!important;animation:none!important}.w .sp,.f .sp,.bob,.run,.hit,.gnd{animation:none!important}';const s=document.createElement('style');s.textContent=c;document.head.appendChild(s)}
function svg(k,s,sz){
 const p=SP[k],c=p.c,d=p.d,[x1,x2,y]=p.e,f=[.78,.92,1.04][s],st=`stroke="${d}" stroke-width="1.2"`;
 const B=[
 `<path d="M7 11Q20 5 25 15Q28 27 13 29Q19 20 7 11Z" fill="${c}" ${st}/><rect x="4.5" y="8.5" width="5" height="4" rx="1.5" fill="#3d9a3a" transform="rotate(-25 7 10)"/>`,
 `<circle cx="16" cy="18" r="11" fill="${c}" ${st}/><path d="M7 22Q16 29 25 22M16 7v3" fill="none" stroke="${d}"/>`,
 `<rect x="9" y="4" width="14" height="25" rx="7" fill="${c}" ${st}/><g fill="${d}"><circle cx="12" cy="22" r=".9"/><circle cx="20" cy="24" r=".9"/><circle cx="16" cy="27" r=".9"/><circle cx="12" cy="8" r=".9"/><circle cx="20" cy="9" r=".9"/></g>`,
 `<ellipse cx="16" cy="19" rx="10" ry="11" fill="${c}" ${st}/><path d="M8 11Q16 5 24 11L21 13 16 10 11 13Z" fill="#3d9a3a"/>`,
 `<path d="M6 9Q16 5 26 9L16 30Z" fill="${c}" ${st}/><path d="M16 8L11 1M16 8V0M16 8L21 1" stroke="#3d9a3a" stroke-width="2.4" stroke-linecap="round"/>`,
 `<ellipse cx="16" cy="19" rx="13" ry="10" fill="${c}" ${st}/><path d="M16 9Q11 19 16 29M10 10Q4 19 10 28M22 10Q28 19 22 28" fill="none" stroke="${d}" stroke-width=".9"/><rect x="14.5" y="5" width="3" height="5" rx="1" fill="#6a4a1f"/>`][k];
 let face=`<g fill="#fff" stroke="#222" stroke-width=".6"><circle cx="${x1}" cy="${y}" r="2.4"/><circle cx="${x2}" cy="${y}" r="2.4"/></g><g fill="#111"><circle cx="${x1+.4}" cy="${y}" r="1.2"/><circle cx="${x2+.4}" cy="${y}" r="1.2"/></g><path d="M${x1+1.5} ${y+5.5}Q16 ${y+8} ${x2-1.5} ${y+5.5}" fill="none" stroke="#222" stroke-width="1"/>`;
 if(s>=1)face+=`<path d="M${x1-2.5} ${y-3.6}L${x1+2.2} ${y-2.2}M${x2+2.5} ${y-3.6}L${x2-2.2} ${y-2.2}" stroke="#222" stroke-width="1.2"/>`;
 if(s>=2)face+=`<path d="M10 4L12 .5 16 3 20 .5 22 4Z" fill="#ffd23a" stroke="#b8860b" stroke-width=".7"/><path d="M3 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM27 22l.8 1.6 1.6.8-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.8z" fill="#ffd23a"/>`;
 return `<svg viewBox="0 0 32 32" width="${sz}" height="${sz}" style="overflow:visible"><g transform="translate(16 30) scale(${f}) translate(-16 -30)">${B}${face}</g></svg>`;
}
function bake(cb){let n=18;for(let k=0;k<6;k++)for(let s=0;s<3;s++){const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=c.height=28;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(i,0,0,28,28);PX[k+'_'+s]=c.toDataURL();if(!--n)cb()};i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg(k,s,64).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '))}}
