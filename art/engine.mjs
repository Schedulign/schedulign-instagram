/**
 * The Schedulign Instagram drawing engine.
 *
 * Every slide is an SVG string drawn on a 400 x 500 canvas (Instagram's 4:5
 * portrait), rendered to a 1080 x 1350 JPEG by render.mjs. Scenes are built
 * from the pieces below: rooms and outdoor backdrops (day or lamplight), the
 * recurring cast, Slot (the booking page), props, and phone-screen UI bits.
 *
 * Improve the art here and every future post picks it up. Text classes used
 * in the SVG (.cap, .ui, .fr) are styled by render.mjs.
 */
let uid=0;
const INK='#1f2238', NAVY='#303159', LIME='#b9d32c', MUTED='#6a6f8f';
const svg=(inner,label,vb)=>`<svg class="scene" viewBox="${vb||'0 0 400 500'}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

/* ---------- environment ---------- */
function win({x,y,w,h,sky='night'}){
  const id='w'+(++uid);
  const g={night:['#10152e','#2a3462'],dawn:['#6f73ad','#f2b07c'],day:['#8fc0ea','#d6ebf8']}[sky];
  let s=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset="1" stop-color="${g[1]}"/></linearGradient><clipPath id="c${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs>`;
  s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})"/><g clip-path="url(#c${id})">`;
  if(sky==='night'){
    [[.15,.18],[.4,.1],[.7,.28],[.3,.35],[.55,.2]].forEach(([a,b])=>s+=`<circle cx="${x+a*w}" cy="${y+b*h}" r="1.4" fill="#fff" opacity=".8"/>`);
    s+=`<circle cx="${x+w-24}" cy="${y+26}" r="10" fill="#fff4d0"/>`;
  }
  if(sky==='day') s+=`<ellipse cx="${x+w*.3}" cy="${y+h*.3}" rx="22" ry="8" fill="#fff" opacity=".8"/>`;
  [.38,.55,.3,.48,.34].forEach((f,i)=>{
    const bx=x+i*w/5, bh=f*h, by=y+h-bh, c=sky==='day'?'#7e97bf':'#161a33';
    s+=`<rect x="${bx}" y="${by}" width="${w/5-2}" height="${bh}" fill="${c}" opacity="${sky==='day'?.7:.85}"/>`;
    if(sky!=='day') for(let k=0;k<3;k++) s+=`<rect x="${bx+5+(k%2)*9}" y="${by+8+k*12}" width="4" height="5" fill="#ffd98a" opacity=".85"/>`;
  });
  s+=`</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#4b5382" stroke-width="7" rx="2"/>`;
  s+=`<line x1="${x+w/2}" y1="${y}" x2="${x+w/2}" y2="${y+h}" stroke="#4b5382" stroke-width="4"/><line x1="${x}" y1="${y+h/2}" x2="${x+w}" y2="${y+h/2}" stroke="#4b5382" stroke-width="4"/>`;
  s+=`<rect x="${x-8}" y="${y+h}" width="${w+16}" height="7" rx="2" fill="#434a78"/>`;
  return s;
}
const lamp=x=>`<line x1="${x}" y1="0" x2="${x}" y2="54" stroke="#161a2e" stroke-width="2"/><path d="M${x-32},88 L${x-14},54 L${x+14},54 L${x+32},88 Z" fill="#e9b872"/><path d="M${x-32},88 L${x+32},88" stroke="#c9934f" stroke-width="3"/><ellipse cx="${x}" cy="90" rx="12" ry="5" fill="#fff3d6"/>`;
function glow(x,y,r,op){
  const id='g'+(++uid);
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#ffd79a" stop-opacity="${op||.5}"/><stop offset=".55" stop-color="#ffc57a" stop-opacity=".14"/><stop offset="1" stop-color="#ffc57a" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`;
}
function room({lamps=[200],wall,floorY=392,win:w=null,day=false}={}){
  wall=wall||(day?'#b9c5df':'#2f3659');
  const floor=day?'#a88163':'#232946', fl=day?'#8f6c52':'#2c3354';
  let s=`<rect width="400" height="500" fill="${wall}"/><rect y="${floorY-64}" width="400" height="64" fill="#000" opacity="${day?.05:.07}"/>`;
  if(day) s+=`<rect y="${floorY-70}" width="400" height="6" fill="#fff" opacity=".35"/>`;
  if(w) s+=win(w);
  s+=`<rect y="${floorY}" width="400" height="${500-floorY}" fill="${floor}"/><line x1="0" y1="${floorY+36}" x2="400" y2="${floorY+36}" stroke="${fl}" stroke-width="2"/><line x1="0" y1="${floorY+76}" x2="400" y2="${floorY+76}" stroke="${fl}" stroke-width="2"/>`;
  if(day&&w) s+=`<path d="M${w.x},${w.y+w.h} L${w.x+w.w},${w.y+w.h} L${w.x+w.w+90},${floorY+60} L${w.x+60},${floorY+60}Z" fill="#fff6d8" opacity=".2"/>`;
  if(!day) lamps.forEach(x=>s+=glow(x,150,240));
  lamps.forEach(x=>s+=day?lamp(x).replace('#fff3d6','#e8e2d2'):lamp(x));
  return s;
}
function outdoor(sky){
  const id='o'+(++uid);
  const g=sky==='golden'?['#4d5690','#f0a877']:sky==='day'?['#6fa9e6','#d9eefa']:['#232b55','#c98a86'];
  let s=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset=".62" stop-color="${g[1]}"/></linearGradient></defs><rect width="400" height="500" fill="url(#${id})"/>`;
  if(sky==='day') s+=`<circle cx="330" cy="70" r="46" fill="#fff3c4" opacity=".35"/><circle cx="330" cy="70" r="28" fill="#fff3c4"/>`+[[70,80,1],[190,50,.8],[250,130,.7]].map(([a,b,k])=>`<g transform="translate(${a},${b}) scale(${k})" fill="#fff" opacity=".9"><ellipse cx="0" cy="0" rx="34" ry="13"/><ellipse cx="-14" cy="-9" rx="16" ry="12"/><ellipse cx="12" cy="-12" rx="18" ry="14"/></g>`).join('');
  if(sky==='dusk') [[40,40],[120,110],[300,150],[360,60],[210,30]].forEach(([a,b])=>s+=`<circle cx="${a}" cy="${b}" r="1.5" fill="#fff" opacity=".7"/>`);
  return s;
}
function house(x,base,w,h,color,{num=null,day=false}={}){
  const wy=base-h+22;
  let s=`<path d="M${x-6},${base-h} L${x+w/2},${base-h-46} L${x+w+6},${base-h} Z" fill="#26294a"/><rect x="${x}" y="${base-h}" width="${w}" height="${h}" fill="${color}"/>`;
  s+=`<rect x="${x+14}" y="${wy}" width="26" height="24" fill="${day?'#cfe3f7':'#ffd48a'}"/><rect x="${x+w-40}" y="${wy}" width="26" height="24" fill="${day?'#cfe3f7':'#ffd48a'}"/>`;
  s+=`<line x1="${x+27}" y1="${wy}" x2="${x+27}" y2="${wy+24}" stroke="${color}" stroke-width="2"/><line x1="${x+w-27}" y1="${wy}" x2="${x+w-27}" y2="${wy+24}" stroke="${color}" stroke-width="2"/>`;
  s+=`<rect x="${x+w/2-15}" y="${base-50}" width="30" height="50" rx="3" fill="#2a2f55"/><circle cx="${x+w/2+8}" cy="${base-24}" r="2" fill="#e9b872"/>`;
  if(num) s+=`<rect x="${x+w/2-12}" y="${base-66}" width="24" height="13" rx="3" fill="#f3efe6"/><text x="${x+w/2}" y="${base-56}" text-anchor="middle" font-size="10" font-weight="700" class="ui" fill="${INK}">${num}</text>`;
  return s;
}
const tree=(x,base,s=1)=>`<g transform="translate(${x},${base}) scale(${s})"><rect x="-6" y="-70" width="12" height="70" fill="#5a3e31"/><circle cx="0" cy="-92" r="38" fill="#3f7a55"/><circle cx="-26" cy="-72" r="24" fill="#4a8a60"/><circle cx="26" cy="-74" r="26" fill="#3a7050"/><circle cx="-8" cy="-112" r="10" fill="#f0a877" opacity=".25"/></g>`;
function park(){
  return outdoor('day')+tree(60,330,1.1)+tree(350,320,.9)+`<path d="M0,300 Q200,270 400,296 L400,500 L0,500Z" fill="#4f8a5e"/><path d="M0,360 Q200,338 400,352 L400,500 L0,500Z" fill="#467d55"/>`+
    [[40,420],[120,380],[300,440],[370,390],[210,470]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="3" fill="#f2c14e"/><circle cx="${a+6}" cy="${b+4}" r="2.5" fill="#fff" opacity=".8"/>`).join('');
}

/* ---------- people ---------- */
const ARMS={
  down:[['M-21,-136 Q-34,-110 -31,-84',-31,-84],['M21,-136 Q34,-110 31,-84',31,-84]],
  phone:[['M-21,-136 Q-30,-104 -6,-112',-6,-112],['M21,-136 Q30,-104 7,-116',7,-116]],
  wave:[['M-21,-136 Q-34,-110 -31,-84',-31,-84],['M21,-136 Q46,-150 42,-192',42,-192]],
  work:[['M-21,-136 Q-8,-104 24,-110',24,-110],['M21,-136 Q40,-112 48,-116',48,-116]],
  cut:[['M-21,-136 Q-6,-104 26,-116',26,-116],['M21,-136 Q50,-150 62,-178',62,-178]],
  hips:[['M-21,-136 Q-46,-116 -24,-94',-24,-94],['M21,-136 Q46,-116 24,-94',24,-94]],
  hold:[['M-21,-136 Q-34,-110 -31,-84',-31,-84],['M21,-136 Q36,-106 18,-106',18,-106]],
  lift:[['M-21,-136 Q-32,-100 -9,-96',-9,-96],['M21,-136 Q32,-100 9,-96',9,-96]],
  shoot:[['M-21,-136 Q-40,-150 -14,-176',-14,-176],['M21,-136 Q40,-150 14,-176',14,-176]],
  flex:[['M-21,-136 Q-50,-128 -44,-168',-44,-168],['M21,-136 Q50,-128 44,-168',44,-168]],
  cheer:[['M-21,-136 Q-46,-150 -42,-192',-42,-192],['M21,-136 Q46,-150 42,-192',42,-192]]
};
function hairFront(h,c){
  const hl=`<path d="M-13,-202 q10,-5 21,-2" stroke="#fff" stroke-opacity=".2" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  switch(h){
    case 'short': return `<path d="M-27,-176 Q-29,-209 0,-209 Q29,-209 27,-176 Q22,-194 6,-193 Q-12,-197 -27,-176Z" fill="${c}"/>`+hl;
    case 'bun': return `<circle cx="0" cy="-210" r="12" fill="${c}"/><path d="M-27,-174 Q-27,-206 0,-206 Q27,-206 27,-174 Q16,-196 0,-195 Q-16,-196 -27,-174Z" fill="${c}"/>`+hl;
    case 'long': case 'pony': return `<path d="M-28,-172 Q-28,-208 0,-208 Q28,-208 28,-172 Q20,-192 -2,-196 Q-18,-190 -28,-172Z" fill="${c}"/>`+hl;
    case 'curly': return [[-22,-192],[-12,-203],[2,-207],[16,-202],[25,-190],[-27,-178],[27,-177]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="11" fill="${c}"/>`).join('')+`<circle cx="-4" cy="-206" r="4" fill="#fff" opacity=".15"/>`;
    case 'cap': return `<path d="M-27,-180 Q-27,-211 0,-211 Q27,-211 27,-180Z" fill="${c}"/><path d="M-2,-183 Q22,-188 44,-179 Q22,-175 -2,-178Z" fill="${c}"/><rect x="-27" y="-184" width="54" height="5" fill="#000" opacity=".15"/><circle cx="0" cy="-196" r="6" fill="#fff" opacity=".85"/><path d="M-3,-196 q3,-5 6,0 q-3,3 -6,0z" fill="#2f9d91"/>`;
    case 'buzz': return `<path d="M-26,-182 Q-26,-206 0,-206 Q26,-206 26,-182 Q0,-197 -26,-182Z" fill="${c}"/>`;
    case 'headband': return `<path d="M-26,-182 Q-26,-206 0,-206 Q26,-206 26,-182 Q0,-197 -26,-182Z" fill="#1d1a1f"/><path d="M-27,-190 Q0,-202 27,-190 L27,-182 Q0,-194 -27,-182Z" fill="#f2c14e"/>`;
    default: return '';
  }
}
function faceEl(d){
  let f='';
  const brow=d.brow||(d.hair==='cap'||d.hair==='headband'?'#1d1a1f':d.hairC);
  if(d.beard) f+=`<path d="M-25,-178 Q-23,-147 0,-145 Q23,-147 25,-178 Q16,-159 8,-161 Q0,-157 -8,-161 Q-16,-159 -25,-178Z" fill="${d.beardC||d.hairC}"/>`;
  const st=`stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"`;
  const bst=`stroke="${brow}" stroke-width="2.8" fill="none" stroke-linecap="round"`;
  const eyes=r=>`<circle cx="-9" cy="-182" r="${r}" fill="${INK}"/><circle cx="9" cy="-182" r="${r}" fill="${INK}"/><circle cx="-8" cy="-183" r=".9" fill="#fff"/><circle cx="10" cy="-183" r=".9" fill="#fff"/>`;
  switch(d.face){
    case 'sleep': f+=`<path d="M-14,-181 q5,5 10,0 M4,-181 q5,5 10,0" ${st}/><path d="M-3,-167 h6" ${st}/>`; break;
    case 'tired': f+=`<path d="M-14,-181 h9 M5,-181 h9" ${st}/><path d="M-6,-166 q6,-3 12,0" ${st}/><path d="M-15,-192 l9,2 M15,-192 l-9,2" ${bst}/>`; break;
    case 'sad': f+=eyes(2.9)+`<path d="M-7,-165 Q0,-171 7,-165" ${st}/><path d="M-15,-190 l9,-3 M15,-190 l-9,-3" ${bst}/>`; break;
    case 'surprised': f+=eyes(3.3)+`<ellipse cx="0" cy="-166" rx="4" ry="5" fill="${INK}"/><path d="M-15,-195 q5,-4 10,-1 M5,-196 q5,-3 10,1" ${bst}/>`; break;
    case 'grin': f+=eyes(2.9)+`<path d="M-10,-170 Q0,-156 10,-170Z" fill="#7a2d3a"/><path d="M-8,-169 h16" stroke="#fff" stroke-width="2"/><path d="M-14,-192 q5,-3 10,0 M4,-192 q5,-3 10,0" ${bst}/>`; break;
    default: f+=eyes(2.9)+`<path d="M-8,-169 Q0,-161 8,-169" ${st}/><path d="M-14,-191 q5,-3 10,0 M4,-191 q5,-3 10,0" ${bst}/>`;
  }
  if(d.face!=='sleep') f+=`<path d="M0,-179 q-3,5 1,6" stroke="#000" stroke-opacity=".22" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  if(d.face!=='tired'&&d.face!=='sad') f+=`<circle cx="-17" cy="-171" r="5" fill="#ff8f8f" opacity=".35"/><circle cx="17" cy="-171" r="5" fill="#ff8f8f" opacity=".35"/>`;
  if(d.glasses) f+=`<circle cx="-10" cy="-182" r="8.5" fill="#fff" fill-opacity=".08" stroke="${INK}" stroke-width="2"/><circle cx="10" cy="-182" r="8.5" fill="#fff" fill-opacity=".08" stroke="${INK}" stroke-width="2"/><path d="M-2,-182 h4" stroke="${INK}" stroke-width="2"/>`;
  return f;
}
function heldItem(kind,hx,hy){
  switch(kind){
    case 'scissors': return `<g transform="translate(${hx},${hy}) rotate(-30)"><circle cx="-4" cy="6" r="4" fill="none" stroke="#dfe3ef" stroke-width="2.4"/><circle cx="5" cy="6" r="4" fill="none" stroke="#dfe3ef" stroke-width="2.4"/><path d="M-2,2 L6,-16 M3,2 L-4,-16" stroke="#dfe3ef" stroke-width="2.6" stroke-linecap="round"/></g>`;
    case 'sponge': return `<rect x="${hx-4}" y="${hy-10}" width="22" height="16" rx="5" fill="#f2c94c"/><circle cx="${hx+22}" cy="${hy-14}" r="3" fill="#fff" opacity=".8"/><circle cx="${hx+28}" cy="${hy-4}" r="2" fill="#fff" opacity=".7"/>`;
    case 'clipboard': return `<rect x="${hx-4}" y="${hy-30}" width="28" height="36" rx="3" fill="#b88a5a"/><rect x="${hx}" y="${hy-25}" width="20" height="26" fill="#f6f3ea"/><path d="M${hx+3},${hy-18} h14 M${hx+3},${hy-12} h14 M${hx+3},${hy-6} h9" stroke="#9aa0b8" stroke-width="1.6"/>`;
    case 'kettlebell': return `<path d="M${hx-9},${hy-2} q9,-14 18,0" fill="none" stroke="#2a2d3f" stroke-width="5"/><circle cx="${hx}" cy="${hy+14}" r="15" fill="#2a2d3f"/><circle cx="${hx-5}" cy="${hy+9}" r="4" fill="#fff" opacity=".15"/>`;
    case 'camera': return `<rect x="${hx-16}" y="${hy-12}" width="34" height="22" rx="4" fill="#23263a"/><circle cx="${hx+1}" cy="${hy-1}" r="8" fill="#4c5680" stroke="#11131f" stroke-width="3"/><rect x="${hx-12}" y="${hy-16}" width="10" height="5" rx="2" fill="#23263a"/>`;
    case 'mug': return `<rect x="${hx-6}" y="${hy-12}" width="16" height="16" rx="3" fill="#f3efe6"/><path d="M${hx+10},${hy-8} q7,0 7,5 q0,5 -7,5" fill="none" stroke="#f3efe6" stroke-width="2.4"/>`;
    case 'bottle': return `<rect x="${hx-5}" y="${hy-26}" width="12" height="30" rx="4" fill="#7fb7e6"/><rect x="${hx-3}" y="${hy-32}" width="8" height="7" rx="2" fill="#f3f4f8"/>`;
    case 'book': return `<rect x="${hx-4}" y="${hy-22}" width="24" height="30" rx="2" fill="#d9695f"/><rect x="${hx-1}" y="${hy-20}" width="3" height="26" fill="#b24f47"/>`;
    default: return '';
  }
}
function person(o){
  const d=Object.assign({x:200,y:390,s:1,flip:false,skin:'#f1c6a0',hair:'short',hairC:'#2b2233',top:'#e46b5a',pants:'#2b3150',pose:'stand',arms:'down',face:'smile',apron:null,beard:false,glasses:false,shoes:'#1a1c2c',hold:null,sleeves:'long',build:'',tank:false,stripe:false,towel:null},o);
  const sit=d.pose==='sit', ath=d.build==='athletic';
  const sole=`stroke="#fff" stroke-opacity=".55" stroke-width="2.4"`;
  let legs = sit
    ? `<rect x="-18" y="-14" width="60" height="19" rx="9" fill="${d.pants}"/><rect x="28" y="-4" width="16" height="56" rx="7" fill="${d.pants}"/><ellipse cx="42" cy="53" rx="13" ry="6" fill="${d.shoes}"/>`
    : `<rect x="-19" y="-66" width="17" height="62" rx="7" fill="${d.pants}"/><rect x="2" y="-66" width="17" height="62" rx="7" fill="${d.pants}"/><rect x="2" y="-66" width="17" height="62" rx="7" fill="#000" opacity=".08"/>`
      +(d.stripe?`<path d="M-17,-60 v52 M17,-60 v52" stroke="#fff" stroke-width="2.4" opacity=".8"/>`:'')
      +`<ellipse cx="-12" cy="-4" rx="13" ry="6.5" fill="${d.shoes}"/><ellipse cx="13" cy="-4" rx="13" ry="6.5" fill="${d.shoes}"/><path d="M-24,0 h24 M1,0 h24" ${sole}/>`;
  let u='';
  if(d.hair==='long') u+=`<path d="M-31,-182 Q-33,-214 0,-212 Q33,-214 31,-182 L33,-128 Q0,-118 -33,-128Z" fill="${d.hairC}"/>`;
  if(d.hair==='pony') u+=`<path d="M20,-200 Q52,-192 42,-146 Q34,-168 18,-182Z" fill="${d.hairC}"/>`;
  const torso = ath ? 'M-21,-60 L-29,-128 Q-31,-152 -8,-153 L8,-153 Q31,-152 29,-128 L21,-60 Z' : 'M-25,-60 L-25,-128 Q-25,-151 0,-151 Q25,-151 25,-128 L25,-60 Z';
  if(d.tank){
    u+=`<path d="${torso}" fill="${d.skin}"/><path d="M-21,-60 L-25,-122 Q-20,-140 -15,-151 L-9,-151 Q0,-134 9,-151 L15,-151 Q20,-140 25,-122 L21,-60Z" fill="${d.top}"/>`;
  } else {
    u+=`<path d="${torso}" fill="${d.top}"/><path d="M-8,-151 L0,-140 L8,-151Z" fill="${d.skin}"/>`;
  }
  u+=`<path d="M9,-151 Q26,-150 26,-126 L25,-60 L13,-60 Q18,-100 9,-151Z" fill="#000" opacity=".1"/>`;
  if(ath&&d.tank) u+=`<path d="M-10,-118 q10,5 20,0" stroke="#000" stroke-opacity=".12" stroke-width="2" fill="none"/>`;
  if(d.apron) u+=`<path d="M-17,-60 L-17,-118 L17,-118 L17,-60Z" fill="${d.apron}"/><path d="M-13,-118 L-8,-149 M13,-118 L8,-149" stroke="${d.apron}" stroke-width="4"/><rect x="-10" y="-102" width="20" height="14" rx="2" fill="#000" opacity=".15"/>`;
  if(d.towel) u+=`<path d="M-28,-146 Q-16,-158 -4,-151 L-9,-98 Q-18,-94 -27,-100Z" fill="${d.towel}"/><path d="M-26,-104 h16" stroke="#fff" stroke-width="2" opacity=".6"/>`;
  u+=`<rect x="-7" y="-161" width="14" height="14" fill="${d.skin}"/><rect x="-7" y="-161" width="14" height="6" fill="#000" opacity=".1"/><circle cx="-26" cy="-176" r="6" fill="${d.skin}"/><circle cx="26" cy="-176" r="6" fill="${d.skin}"/><circle cx="0" cy="-178" r="26" fill="${d.skin}"/>`;
  u+=faceEl(d)+hairFront(d.hair,d.hairC);
  const A=ARMS[d.arms];
  const aw=ath?15:13;
  let arms='';
  A.forEach(([p])=>{
    if(d.sleeves==='long') arms+=`<path d="${p}" stroke="${d.top}" stroke-width="${aw}" fill="none" stroke-linecap="round"/>`;
    else {
      arms+=`<path d="${p}" stroke="${d.skin}" stroke-width="${aw}" fill="none" stroke-linecap="round"/>`;
      if(d.sleeves==='short') arms+=`<path d="${p}" pathLength="100" stroke-dasharray="38 200" stroke="${d.top}" stroke-width="${aw+1}" fill="none" stroke-linecap="round"/>`;
    }
  });
  if(d.arms==='phone') arms+=`<rect x="-10" y="-142" width="20" height="33" rx="4" fill="#161829"/><rect x="-7.5" y="-139" width="15" height="26" rx="2" fill="#bfd8ff"/>`;
  A.forEach(([,hx,hy])=>arms+=`<circle cx="${hx}" cy="${hy}" r="7" fill="${d.skin}"/>`);
  if(d.wrist) A.forEach(([,hx,hy])=>arms+=`<circle cx="${hx}" cy="${hy+7}" r="5" fill="${d.wrist}"/>`);
  u+= ath?`<g transform="scale(1.12,1)">${arms}</g>`:arms;
  if(d.hold){
    if(d.arms==='shoot') u+=heldItem('camera',0,-172);
    else if(d.hold==='kettlebell') u+=heldItem('kettlebell',0,A[1][2]);
    else { const [,hx,hy]=A[1]; u+=heldItem(d.hold,ath?hx*1.12:hx,hy); }
  }
  const up = sit?`<g transform="translate(0,62)">${u}</g>`:u;
  return `<g transform="translate(${d.x},${d.y}) scale(${d.flip?-d.s:d.s},${d.s})"><ellipse cx="${sit?12:0}" cy="${sit?56:0}" rx="34" ry="5" fill="#000" opacity=".18"/>${legs}${up}</g>`;
}

/* ---------- Slot ---------- */
function slot(x,y,s=1,{mood='smile',wave=false,point=false}={}){
  const st=`stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"`;
  let face = mood==='surprised'
    ? `<circle cx="-8" cy="-26" r="3.4" fill="${INK}"/><circle cx="8" cy="-26" r="3.4" fill="${INK}"/><ellipse cx="0" cy="-15" rx="3.2" ry="4" fill="${INK}"/>`
    : `<circle cx="-8" cy="-26" r="3" fill="${INK}"/><circle cx="8" cy="-26" r="3" fill="${INK}"/><circle cx="-7" cy="-27" r=".9" fill="#fff"/><circle cx="9" cy="-27" r=".9" fill="#fff"/><path d="M-6,-17 Q0,-11 6,-17" ${st}/>`;
  const armR = wave?`M22,-24 Q34,-34 32,-50`:point?`M22,-24 Q36,-26 44,-34`:`M22,-24 Q30,-16 28,-8`;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="22" ry="3.5" fill="#000" opacity=".2"/>
    <path d="M-22,-24 Q-30,-16 -28,-8" stroke="${LIME}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="${armR}" stroke="${LIME}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="-10" cy="-2" rx="7" ry="4" fill="${NAVY}"/><ellipse cx="10" cy="-2" rx="7" ry="4" fill="${NAVY}"/>
    <rect x="-24" y="-50" width="48" height="46" rx="12" fill="${LIME}"/>
    <path d="M-24,-38 L-24,-40 Q-24,-50 -14,-50 L14,-50 Q24,-50 24,-40 L24,-38 Z" fill="${NAVY}"/>
    <rect x="-14" y="-57" width="5" height="12" rx="2.5" fill="${INK}"/><rect x="9" y="-57" width="5" height="12" rx="2.5" fill="${INK}"/>
    ${face}<circle cx="-15" cy="-19" r="3.5" fill="#fff" opacity=".35"/><circle cx="15" cy="-19" r="3.5" fill="#fff" opacity=".35"/>
  </g>`;
}
const slotHead=()=>slot(0,0,1).replace(/<ellipse[^>]*>/g,'').replace(/<path d="M-22[^>]*>|<path d="M22[^>]*>/g,'');

/* ---------- props & UI bits ---------- */
const bubble=(x,y,t,{me=false,size=15}={})=>{
  const w=Math.round(t.length*size*.54+28), h=size*2+6, bx=me?x-w:x;
  const tail = me ? `<path d="M${x-10},${y+h-12} q6,10 14,12 q-12,1 -22,-6z" fill="#7c8cff"/>` : `<path d="M${x+10},${y+h-12} q-6,10 -14,12 q12,1 22,-6z" fill="#fff"/>`;
  return `${tail}<rect x="${bx}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${me?'#7c8cff':'#fff'}"/><text x="${bx+14}" y="${y+h/2+size*.36}" font-size="${size}" class="ui" font-weight="500" fill="${me?'#fff':'#23263f'}">${t}</text>`;
};
const cap=(t,y=468,size=30)=>{
  const lines=t.split('\n'), lh=size*1.15, y0=y-(lines.length-1)*lh;
  return `<text class="cap" text-anchor="middle" font-size="${size}">${lines.map((l,i)=>`<tspan x="200" y="${y0+i*lh}">${l}</tspan>`).join('')}</text>`;
};
const T=(x,y,t,{size=12,w=500,c='#1c1e36',a='start',style=''}={})=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${w}" fill="${c}" text-anchor="${a}" class="ui" ${style}>${t}</text>`;
const chip=(x,y,t,on,wd=50)=>`<rect x="${x}" y="${y}" width="${wd}" height="28" rx="9" fill="${on?LIME:'#fff'}" stroke="${on?LIME:'#dfe2ec'}" stroke-width="1.5"/>${T(x+wd/2,y+18.5,t,{size:12,w:on?700:500,c:on?NAVY:'#1c1e36',a:'middle'})}`;
const card=(x,y,w,h)=>`<rect x="${x+4}" y="${y+8}" width="${w}" height="${h}" rx="16" fill="#000" opacity=".22"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#fff"/>`;
const check=(x,y,r=9)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${LIME}"/><path d="M${x-r*.45},${y} l${r*.33},${r*.33} l${r*.6},${r*-.7}" stroke="${NAVY}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
const toggle=(x,y,on)=>`<rect x="${x}" y="${y}" width="40" height="22" rx="11" fill="${on?LIME:'#d6d9e4'}"/><circle cx="${on?x+29:x+11}" cy="${y+11}" r="8" fill="#fff"/>`;
const box=(x,y,on)=>`<rect x="${x}" y="${y}" width="16" height="16" rx="4" fill="${on?LIME:'#fff'}" stroke="${on?LIME:'#c3c7d6'}" stroke-width="1.6"/>${on?`<path d="M${x+4},${y+8} l3,3 l6,-7" stroke="${NAVY}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`:''}`;
const bars=(x,y,n,w=160)=>Array.from({length:n},(_,i)=>`<rect x="${x}" y="${y+i*10}" width="${i===n-1?w*.6:w}" height="4" rx="2" fill="#dfe2ec"/>`).join('');
const btn=(x,y,w,t,kind='navy')=>`<rect x="${x}" y="${y}" width="${w}" height="36" rx="11" fill="${kind==='lime'?LIME:kind==='line'?'#fff':NAVY}" ${kind==='line'?`stroke="${NAVY}" stroke-width="1.5"`:''}/>`+T(x+w/2,y+23,t,{size:13,w:700,c:kind==='navy'?'#fff':NAVY,a:'middle'});
const notice=(x,y,w,title,sub,icon='check')=>`<rect x="${x}" y="${y}" width="${w}" height="58" rx="14" fill="#161a33" opacity=".94"/>${icon==='check'?check(x+24,y+29,11):`<circle cx="${x+24}" cy="${y+29}" r="11" fill="#7c8cff"/>`}`+T(x+44,y+25,title,{size:13,w:700,c:'#fff'})+T(x+44,y+43,sub,{size:12,c:'#aab0cc'});

const mirror=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w/2}" fill="#d9a95b"/><rect x="${x+7}" y="${y+7}" width="${w-14}" height="${h-14}" rx="${w/2-7}" fill="#8fa6cc"/><path d="M${x+24},${y+40} l30,-16 M${x+26},${y+60} l44,-24" stroke="#fff" stroke-width="5" opacity=".35" stroke-linecap="round"/>`;
const counter=(x,y,w,fy=392)=>`<rect x="${x}" y="${y}" width="${w}" height="${fy-y}" fill="#6e4a33"/><rect x="${x-6}" y="${y-8}" width="${w+12}" height="10" rx="3" fill="#a06f4a"/><rect x="${x+14}" y="${y+18}" width="${w/2-24}" height="${fy-y-36}" rx="3" fill="#5d3e2b"/><rect x="${x+w/2+10}" y="${y+18}" width="${w/2-24}" height="${fy-y-36}" rx="3" fill="#5d3e2b"/><rect x="${x+10}" y="${y-26}" width="10" height="18" rx="3" fill="#b77fc9"/><rect x="${x+24}" y="${y-22}" width="8" height="14" rx="3" fill="#7fb7e6"/>`;
const phoneFlat=(x,y,buzz)=>`<rect x="${x}" y="${y-8}" width="36" height="9" rx="3" fill="#161829"/>${buzz?`<path d="M${x-8},${y-16} l-6,-6 M${x+44},${y-16} l6,-6 M${x+18},${y-20} v-8" stroke="#ffe7a8" stroke-width="2.4" stroke-linecap="round"/>`:''}`;
const salonChair=(x,y)=>`<rect x="${x-34}" y="${y-96}" width="68" height="98" rx="18" fill="#8a3b4a"/><rect x="${x-40}" y="${y-4}" width="80" height="22" rx="10" fill="#9d4757"/><rect x="${x-6}" y="${y+18}" width="12" height="52" fill="#b9bfd4"/><ellipse cx="${x}" cy="${y+72}" rx="36" ry="7" fill="#b9bfd4"/>`;
const clock=(x,y,r,h,m)=>{
  const ha=((h%12)+m/60)*30-90, ma=m*6-90, rad=a=>a*Math.PI/180;
  return `<circle cx="${x}" cy="${y}" r="${r+3}" fill="#e9b872"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fbf7ee"/><line x1="${x}" y1="${y}" x2="${x+Math.cos(rad(ha))*r*.5}" y2="${y+Math.sin(rad(ha))*r*.5}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${x+Math.cos(rad(ma))*r*.78}" y2="${y+Math.sin(rad(ma))*r*.78}" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="2.5" fill="${INK}"/>`;
};
const plant=(x,y)=>`<path d="M${x},${y-30} q-26,-20 -20,-52 q16,20 20,52z M${x},${y-30} q24,-24 26,-50 q-20,14 -26,50z M${x},${y-30} q-2,-34 4,-62 q10,30 -4,62z" fill="#4f9a6e"/><path d="M${x-16},${y-32} h32 l-5,32 h-22z" fill="#c9774f"/>`;
const sofa=(x,y,w)=>`<rect x="${x}" y="${y-80}" width="${w}" height="70" rx="18" fill="#b8604d"/><rect x="${x}" y="${y-12}" width="${w}" height="36" rx="10" fill="#c86f55"/><rect x="${x-14}" y="${y-44}" width="30" height="68" rx="12" fill="#a95644"/><rect x="${x+w-16}" y="${y-44}" width="30" height="68" rx="12" fill="#a95644"/><rect x="${x+6}" y="${y+24}" width="8" height="12" fill="#4a2e22"/><rect x="${x+w-14}" y="${y+24}" width="8" height="12" fill="#4a2e22"/><rect x="${x+w-70}" y="${y-58}" width="40" height="34" rx="8" fill="#f2c14e" transform="rotate(-8 ${x+w-50} ${y-40})"/>`;
const bed=(x,y,w)=>`<rect x="${x-8}" y="${y-120}" width="26" height="162" rx="8" fill="#6b4a3a"/><rect x="${x}" y="${y}" width="${w}" height="36" rx="8" fill="#e7e2f0"/><rect x="${x}" y="${y+30}" width="${w}" height="12" fill="#5a3e31"/><ellipse cx="${x+44}" cy="${y-8}" rx="38" ry="17" fill="#f4f1fa"/>`;
const nightstand=(x,y)=>`<rect x="${x}" y="${y}" width="62" height="${410-y}" rx="4" fill="#6b4a3a"/><rect x="${x+8}" y="${y+14}" width="46" height="22" rx="3" fill="#5a3e31"/>${glow(x+46,y-30,90,.6)}<rect x="${x+42}" y="${y-22}" width="8" height="22" fill="#caa06a"/><path d="M${x+30},${y-22} L${x+36},${y-48} L${x+56},${y-48} L${x+62},${y-22}Z" fill="#f0c98a"/>`;
const shelf=(x,y)=>{ const cols=['#d9695f','#7fb7e6','#f2c14e','#8e7cc3','#4f9a6e','#e8883a'];
  let s=`<rect x="${x}" y="${y}" width="112" height="170" rx="4" fill="#6b4a3a"/>`;
  [0,1,2].forEach(r=>{ let bx=x+8; s+=`<rect x="${x+4}" y="${y+54+r*56}" width="104" height="5" fill="#5a3e31"/>`;
    for(let i=0;i<6;i++){ const w=10+((i*7+r*3)%7), h=34+((i*5+r)%12); s+=`<rect x="${bx}" y="${y+54+r*56-h}" width="${w}" height="${h}" rx="2" fill="${cols[(i+r*2)%6]}"/>`; bx+=w+3; } });
  return s; };
const table=(x,y,w)=>`<rect x="${x}" y="${y}" width="${w}" height="14" rx="4" fill="#a06f4a"/><rect x="${x+14}" y="${y+14}" width="${w-28}" height="${410-y-14}" fill="#7d5436"/>`;
function van(x,base){
  return `<rect x="${x+20}" y="${base-128}" width="110" height="6" rx="3" fill="#23263a"/><path d="M${x+30},${base-122} v-6 M${x+120},${base-122} v-6" stroke="#23263a" stroke-width="4"/>
  <path d="M${x},${base-24} L${x},${base-104} Q${x},${base-118} ${x+14},${base-118} L${x+120},${base-118} Q${x+136},${base-118} ${x+146},${base-100} L${x+172},${base-64} Q${x+178},${base-56} ${x+178},${base-44} L${x+178},${base-24}Z" fill="#257f78"/>
  <path d="M${x+122},${base-108} L${x+140},${base-108} L${x+162},${base-72} L${x+122},${base-72}Z" fill="#1c2340"/>
  <path d="M${x},${base-50} Q${x+40},${base-72} ${x+80},${base-52} T${x+178},${base-50} L${x+178},${base-24} L${x},${base-24}Z" fill="#f2c14e"/>
  <path d="M${x+30},${base-104} q-12,16 -12,24 a12,12 0 0 0 24,0 q0,-8 -12,-24z" fill="#fff"/>
  <text x="${x+50}" y="${base-80}" class="fr" font-size="17" fill="#fff">SHINE</text><text x="${x+51}" y="${base-66}" class="ui" font-size="8.5" font-weight="700" fill="#cdeee9" letter-spacing="1.5">MOBILE DETAIL</text>
  <circle cx="${x+40}" cy="${base-22}" r="20" fill="#1b1d2e"/><circle cx="${x+40}" cy="${base-22}" r="8" fill="#8a90a8"/>
  <circle cx="${x+142}" cy="${base-22}" r="20" fill="#1b1d2e"/><circle cx="${x+142}" cy="${base-22}" r="8" fill="#8a90a8"/>`;
}
function car(x,base){
  return `<path d="M${x},${base-22} Q${x},${base-50} ${x+30},${base-52} L${x+62},${base-56} Q${x+88},${base-92} ${x+132},${base-92} L${x+164},${base-92} Q${x+196},${base-90} ${x+212},${base-56} L${x+238},${base-52} Q${x+258},${base-48} ${x+258},${base-22}Z" fill="#d9534f"/>
  <path d="M${x+76},${base-58} Q${x+96},${base-84} ${x+130},${base-84} L${x+140},${base-84} L${x+140},${base-58}Z M${x+150},${base-58} L${x+150},${base-84} L${x+164},${base-84} Q${x+188},${base-82} ${x+200},${base-58}Z" fill="#9fb9e0"/>
  <path d="M${x+20},${base-44} h214" stroke="#fff" stroke-width="3" opacity=".35"/>
  <circle cx="${x+56}" cy="${base-20}" r="20" fill="#1b1d2e"/><circle cx="${x+56}" cy="${base-20}" r="8" fill="#b9bfd4"/>
  <circle cx="${x+204}" cy="${base-20}" r="20" fill="#1b1d2e"/><circle cx="${x+204}" cy="${base-20}" r="8" fill="#b9bfd4"/>`;
}
const sparkle=(x,y,r,c='#fff')=>`<path d="M${x},${y-r} Q${x+r*.2},${y-r*.2} ${x+r},${y} Q${x+r*.2},${y+r*.2} ${x},${y+r} Q${x-r*.2},${y+r*.2} ${x-r},${y} Q${x-r*.2},${y-r*.2} ${x},${y-r}Z" fill="${c}"/>`;
function bigPhone(inner,x=96,y=34,w=208,h=368){
  return `<rect x="${x+6}" y="${y+10}" width="${w}" height="${h}" rx="30" fill="#000" opacity=".25"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="#161829"/><rect x="${x+8}" y="${y+8}" width="${w-16}" height="${h-16}" rx="23" fill="#fbfbfd"/><rect x="${x+w/2-24}" y="${y+14}" width="48" height="10" rx="5" fill="#161829"/><g transform="translate(${x+8},${y+8})">${inner}</g>`;
}
const phoneSlide=(bg,inner,caption,label)=>svg(bg+bigPhone(inner)+slot(346,bg.includes('data-floor="420"')?416:390,1,{point:true})+cap(caption),label);
const gymBg=(sky)=>room({lamps:[110],wall:sky==='day'?'#c4cde3':'#323a60',day:sky==='day',win:{x:252,y:78,w:118,h:140,sky}})
    +`<rect x="44" y="196" width="10" height="196" fill="#23263a"/><rect x="136" y="196" width="10" height="196" fill="#23263a"/><rect x="24" y="246" width="142" height="6" rx="3" fill="#b9bfd4"/><circle cx="34" cy="249" r="24" fill="#1b1d2e"/><circle cx="156" cy="249" r="24" fill="#1b1d2e"/><circle cx="34" cy="249" r="6" fill="#4a5070"/><circle cx="156" cy="249" r="6" fill="#4a5070"/>`
    +`<rect x="262" y="352" width="110" height="14" rx="6" fill="#3a3f5e"/><rect x="274" y="366" width="8" height="26" fill="#23263a"/><rect x="352" y="366" width="8" height="26" fill="#23263a"/>`
    +`<circle cx="330" cy="398" r="11" fill="#2a2d3f"/><path d="M322,388 q8,-11 16,0" fill="none" stroke="#2a2d3f" stroke-width="4"/><rect x="190" y="360" width="46" height="32" rx="4" fill="#3d4a7a"/>`
    +clock(200,110,20,6,0);
const study=(day)=>room({lamps:[250],day,win:{x:280,y:96,w:96,h:112,sky:day?'day':'night'}})+shelf(24,222);
const living=(lampX=300)=>room({lamps:[lampX],win:{x:286,y:150,w:90,h:110,sky:'night'}})+plant(370,392)+sofa(30,350,220);

/* ---------- cast ---------- */
const MAYA={skin:'#c98b62',hair:'bun',hairC:'#2a1d24',top:'#e46b5a',apron:'#2d3150',sleeves:'short'};
const JONAH={skin:'#6b4330',hair:'cap',hairC:'#2f9d91',top:'#f2c14e',pants:'#46609a',sleeves:'short'};
const DEV={skin:'#8d5a3b',hair:'headband',hairC:'#1d1a1f',beard:true,top:'#e8883a',tank:true,sleeves:'none',build:'athletic',pants:'#262b45',stripe:true,shoes:'#f3f4f8',towel:'#7fb7e6'};
const ROSA={skin:'#f1c6a0',hair:'long',hairC:'#7a3b2e',glasses:true,top:'#6f7fd0',pants:'#2b3150'};
const PRIYA={skin:'#d9a27a',hair:'pony',hairC:'#1e1a22',top:'#4c4f7a',pants:'#2a2f4a'};
const CLIENT1={skin:'#e7b48c',hair:'curly',hairC:'#5a3a2a',top:'#58b39a',pants:'#3d4466'};
const CLIENT2={skin:'#f1c6a0',hair:'short',hairC:'#8a4b2c',top:'#d9695f',pants:'#3a3f66'};
const CLIENT3={skin:'#f1c6a0',hair:'pony',hairC:'#3a2a24',top:'#8e7cc3',pants:'#2b3150',sleeves:'short'};
const CLIENT4={skin:'#e7b48c',hair:'long',hairC:'#c7893f',top:'#4f9a6e',pants:'#2b3150'};
const KID={skin:'#e7b48c',hair:'curly',hairC:'#c7893f',top:'#f2c14e',pants:'#3a3f66',sleeves:'short'};
const STUDENT={skin:'#6b4330',hair:'curly',hairC:'#1d1a1f',top:'#f2c14e',pants:'#2b3150'};


/* ---------- shared backgrounds and bits ---------- */
const salon=()=>room({lamps:[120],day:true,win:{x:30,y:112,w:110,h:128,sky:'day'}})+mirror(252,104,108,168)+counter(236,304,150);
const bedroom=()=>room({lamps:[],wall:'#283052',floorY:410,win:{x:36,y:70,w:120,h:140,sky:'night'}})+nightstand(318,340)+bed(64,334,250);
const paper=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><rect x="${x-14}" y="${y-18}" width="28" height="36" rx="2" fill="#f6f3ea"/><path d="M${x-9},${y-10} h18 M${x-9},${y-4} h18 M${x-9},${y+2} h12" stroke="#b7bccf" stroke-width="1.6"/></g>`;
const week=(x,y,full)=>['Mon','Tue','Wed','Thu','Fri'].map((d,i)=>{const cx=x+i*40, f=d===full;
  return `<rect x="${cx}" y="${y}" width="34" height="44" rx="9" fill="${f?'#f1f2f6':'#fff'}" stroke="#dfe2ec"/>`+T(cx+17,y+18,d,{size:10,c:f?'#a3a7bd':MUTED,a:'middle'})+T(cx+17,y+35,String(i+13),{size:13,w:700,c:f?'#a3a7bd':'#1c1e36',a:'middle'})+(f?`<path d="M${cx+6},${y+30} h22" stroke="#a3a7bd" stroke-width="1.6"/>`:'');}).join('');
const livingDay=()=>room({lamps:[300],day:true,win:{x:286,y:150,w:90,h:110,sky:'day'}})+plant(370,392)+sofa(30,350,220);
const kitchen=(day=true)=>room({lamps:[200],day,win:{x:40,y:96,w:110,h:120,sky:day?'day':'night'}})
  +`<rect x="220" y="96" width="150" height="70" rx="4" fill="${day?'#e9e4d8':'#5a4a44'}"/><path d="M295,96 v70" stroke="${day?'#cfc8b8':'#4a3c37'}" stroke-width="2"/>`
  +`<rect x="210" y="300" width="180" height="92" fill="#6e4a33"/><rect x="204" y="292" width="192" height="10" rx="3" fill="#a06f4a"/>`+plant(250,292);

/* ---------- week 2 props ---------- */
const keypad=(x,y)=>`<rect x="${x}" y="${y}" width="18" height="26" rx="3" fill="#2a2d3f"/>`+[0,1,2].map(r=>[0,1].map(c=>`<circle cx="${x+6+c*6}" cy="${y+7+r*6}" r="1.6" fill="#b9d32c"/>`).join('')).join('');
function fence(x,base,w,{gateAt=null,open=false}={}){
  let s=`<rect x="${x}" y="${base-44}" width="${w}" height="5" fill="#d8d2c4"/><rect x="${x}" y="${base-18}" width="${w}" height="5" fill="#d8d2c4"/>`;
  for(let px=x+4;px<x+w;px+=14){ if(gateAt!==null&&px>gateAt&&px<gateAt+56) continue; s+=`<path d="M${px},${base} v-58 l5,-6 l5,6 v58z" fill="#f3efe6"/>`; }
  if(gateAt!==null){
    s+=`<rect x="${gateAt-6}" y="${base-74}" width="10" height="74" fill="#3a3f5e"/><rect x="${gateAt+58}" y="${base-74}" width="10" height="74" fill="#3a3f5e"/>`;
    s+= open ? `<path d="M${gateAt+4},${base-62} l-30,-10 v58 l30,10z" fill="#4a4f73"/>` : `<rect x="${gateAt+4}" y="${base-62}" width="54" height="62" fill="#4a4f73"/><path d="M${gateAt+18},${base-62} v62 M${gateAt+31},${base-62} v62 M${gateAt+44},${base-62} v62" stroke="#3a3f5e" stroke-width="3"/>`;
    s+=keypad(gateAt+72,base-58);
  }
  return s;
}
function dog(x,base,s=1,flip=false){
  return `<g transform="translate(${x},${base}) scale(${flip?-s:s},${s})"><ellipse cx="0" cy="0" rx="30" ry="4" fill="#000" opacity=".18"/>
  <path d="M-30,-40 q-18,-10 -16,-28" stroke="#d9a35a" stroke-width="8" fill="none" stroke-linecap="round"/>
  <rect x="-26" y="-22" width="9" height="22" rx="4" fill="#c98f47"/><rect x="14" y="-22" width="9" height="22" rx="4" fill="#c98f47"/>
  <ellipse cx="0" cy="-34" rx="34" ry="18" fill="#d9a35a"/><rect x="-18" y="-24" width="9" height="24" rx="4" fill="#d9a35a"/><rect x="22" y="-24" width="9" height="24" rx="4" fill="#d9a35a"/>
  <circle cx="34" cy="-56" r="17" fill="#d9a35a"/><ellipse cx="48" cy="-50" rx="10" ry="7" fill="#e7b872"/><circle cx="56" cy="-52" r="3.4" fill="#1f2238"/>
  <path d="M26,-66 q-10,4 -8,22 q8,-2 10,-16z" fill="#b97b3a"/><circle cx="38" cy="-60" r="2.4" fill="#1f2238"/><path d="M46,-44 q4,8 8,0" fill="#e0707a"/>
  <rect x="18" y="-44" width="18" height="5" rx="2" fill="#b9d32c"/></g>`;
}
const road=(y)=>`<rect y="${y}" width="400" height="${500-y}" fill="#4a4f63"/><path d="M0,${y+60} h400" stroke="#f2e6a0" stroke-width="4" stroke-dasharray="26 22"/><rect y="${y-12}" width="400" height="12" fill="#b9bccb"/>`;
const radio=(x,y,on)=>on?`<circle cx="${x}" cy="${y}" r="8" fill="${LIME}"/><circle cx="${x}" cy="${y}" r="3" fill="${NAVY}"/>`:`<circle cx="${x}" cy="${y}" r="7.5" fill="#fff" stroke="#c3c7d6" stroke-width="2"/>`;
const field=(x,y,w,label,value,{h=34,size=13}={})=>T(x,y,label,{size:11,w:600,c:'#4a4f70'})+`<rect x="${x}" y="${y+8}" width="${w}" height="${h}" rx="9" fill="#f6f7fb" stroke="#dfe2ec"/>`+T(x+12,y+8+h/2+size*.36,value,{size});
const priceRow=(x,y,w,time,price,tone)=>{ const bg=tone==='peak'?'#fdecc8':tone==='deal'?'#eef6cc':'#fff', st=tone==='peak'?'#f2c14e':tone==='deal'?LIME:'#dfe2ec';
  return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="9" fill="${bg}" stroke="${st}" stroke-width="1.5"/>`+T(x+12,y+19.5,time,{size:12.5,w:600})+T(x+w-12,y+19.5,price,{size:12.5,w:700,a:'end'}); };
const tipCard=(lines,big,sub,foot)=>`<rect width="400" height="500" fill="${NAVY}"/>`+glow(200,40,300,.28)
  +`<text class="fr" font-size="28" fill="#fff" text-anchor="middle">${lines.map((l,i)=>`<tspan x="200" y="${120+i*44}">${l}</tspan>`).join('')}</text>`
  +`<path d="M90,${130+lines.length*44-16} h220" stroke="#5a5c8c" stroke-width="2"/>`
  +`<text class="fr" font-size="50" fill="${LIME}" text-anchor="middle" x="200" y="${130+lines.length*44+46}">${big}</text>`
  +`<text class="fr" font-size="22" fill="#fff" text-anchor="middle" x="200" y="${130+lines.length*44+80}">${sub}</text>`
  +(foot?T(200,470,foot,{size:13,c:'#aab0cc',a:'middle'}):'');

export { livingDay, kitchen, keypad, fence, dog, road, radio, field, priceRow, tipCard };
export { INK, NAVY, LIME, MUTED, svg, win, lamp, glow, room, outdoor, house, tree, park, ARMS, hairFront, faceEl, heldItem, person, slot, slotHead, bubble, cap, T, chip, card, check, toggle, box, bars, btn, notice, mirror, counter, phoneFlat, salonChair, clock, plant, sofa, bed, nightstand, shelf, table, van, car, sparkle, bigPhone, phoneSlide, gymBg, study, living, MAYA, JONAH, DEV, ROSA, PRIYA, CLIENT1, CLIENT2, CLIENT3, CLIENT4, KID, STUDENT, salon, bedroom, paper, week };
