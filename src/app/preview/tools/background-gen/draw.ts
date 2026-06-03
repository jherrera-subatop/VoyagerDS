// @ts-nocheck
/* eslint-disable */
import type { BgParams } from "./store";

/* ── Color base siempre #2E0F70 ── */
const BG = "rgba(46,15,112,1)";          /* #2E0F70 exacto */
const ORANGE  = (a: number) => `rgba(237,137,54,${a})`;   /* #ED8936 */
const CYAN    = (a: number) => `rgba(0,202,206,${a})`;    /* #00CACE */
const LAVENDER = (a: number) => `rgba(210,190,255,${a})`; /* lavanda sobre vault */
const WHITE   = (a: number) => `rgba(255,255,255,${a})`;

/* ── Noise helpers ── */
function fract(x: number): number { return x - Math.floor(x); }
function hash2(x: number, y: number): number {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);
}
function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  return hash2(ix,iy) + (hash2(ix+1,iy)-hash2(ix,iy))*ux
       + (hash2(ix,iy+1)-hash2(ix,iy))*uy
       + (hash2(ix,iy)-hash2(ix+1,iy)-hash2(ix,iy+1)+hash2(ix+1,iy+1))*ux*uy;
}
function fbm(x: number, y: number, oct: number): number {
  let v = 0, a = 0.5, f = 1;
  for (let o = 0; o < oct; o++) { v += a * smoothNoise(x*f, y*f); a *= 0.5; f *= 2; }
  return v;
}
function curlXY(x: number, y: number, t: number, freq: number) {
  const eps = 0.01;
  const psi = (px: number, py: number) => fbm(px*freq + t*0.3, py*freq + t*0.2, 2);
  return { vx: (psi(x,y+eps)-psi(x,y-eps))/(2*eps), vy: -(psi(x+eps,y)-psi(x-eps,y))/(2*eps) };
}
function glow(ctx: CanvasRenderingContext2D, color: string, blur: number): void {
  ctx.shadowColor = color; ctx.shadowBlur = blur;
}
function noGlow(ctx: CanvasRenderingContext2D): void {
  ctx.shadowColor = "transparent"; ctx.shadowBlur = 0;
}

/* ══ MESH GRADIENT ══ */
export function drawMeshGradient(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  type Blob = { cx:number;cy:number;ax:number;ay:number;wx:number;wy:number;px:number;py:number;radius:number;color:string };
  const blobs: Blob[] = [
    { cx:.45,cy:.50,ax:.30,ay:.28,wx:.31,wy:.27,px:0,   py:.70, radius:Math.max(W,H)*.75, color:`rgba(88,28,200,${0.28+p.patternOpacity})` },
    { cx:.70,cy:.30,ax:.22,ay:.20,wx:.41,wy:.38,px:.60, py:.10, radius:Math.max(W,H)*.60, color:`rgba(237,115,22,${0.20+p.accentOpacity})` },
    { cx:.20,cy:.70,ax:.18,ay:.22,wx:.53,wy:.47,px:1.20,py:.40, radius:Math.max(W,H)*.55, color:`rgba(0,202,206,${0.18+p.patternOpacity*0.5})` },
    { cx:.80,cy:.80,ax:.14,ay:.16,wx:.67,wy:.59,px:.80, py:2.0, radius:Math.max(W,H)*.45, color:`rgba(167,80,210,${0.15+p.patternOpacity*0.3})` },
  ];
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "screen";
  blobs.forEach(function drawBlob(b) {
    const x = (b.cx + Math.cos(b.wx*t+b.px)*b.ax)*W;
    const y = (b.cy + Math.sin(b.wy*t+b.py)*b.ay)*H;
    const r = b.radius*(0.85+Math.sin(t*0.3)*0.15)*(p.scaleX*0.12+0.5);
    const g2 = ctx.createRadialGradient(x,y,0,x,y,r);
    const m = b.color.match(/([\d.]+)\)$/);
    const baseA = m ? parseFloat(m[1]) : 0.2;
    g2.addColorStop(0, b.color);
    g2.addColorStop(0.45, b.color.replace(/[\d.]+\)$/, `${(baseA*0.35).toFixed(3)})`));
    g2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  });
  ctx.globalCompositeOperation = "source-over";
  /* Sweep sutil */
  const sweep = (Math.sin(t*p.speed*0.4)+1)*0.5;
  const sg = ctx.createLinearGradient(sweep*W*1.4-W*0.6, 0, sweep*W*1.4+W*0.6, H);
  sg.addColorStop(0,   "rgba(0,0,0,0)");
  sg.addColorStop(0.35,"rgba(0,0,0,0)");
  sg.addColorStop(0.50,`rgba(255,255,255,${p.glowAmount*0.025})`);
  sg.addColorStop(0.65,"rgba(0,0,0,0)");
  sg.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, W, H);
}

/* ══ LIGHT SWEEP ══ */
export function drawLightSweep(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  drawMeshGradient(ctx, W, H, t*0.3, { ...p, patternOpacity: p.patternOpacity*0.6 });
  const angle = Math.PI/5 + p.twistAmount*0.05;
  const prog  = ((t*p.speed*0.0008) % 1.6) - 0.3;
  const w2    = W*(0.25+p.strokeWeight*0.04);
  const cos   = Math.cos(angle), sin2 = Math.sin(angle);
  const cx    = prog*W*1.5, cy = H*0.5;
  const g = ctx.createLinearGradient(cx-cos*w2, cy-sin2*w2, cx+cos*w2, cy+sin2*w2);
  const peak = `rgba(255,255,255,${Math.min(0.12, p.glowAmount*0.055)})`;
  g.addColorStop(0,"rgba(0,0,0,0)"); g.addColorStop(0.30,"rgba(0,0,0,0)");
  g.addColorStop(0.50,peak);
  g.addColorStop(0.70,"rgba(0,0,0,0)"); g.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (p.accentOpacity > 0.01) {
    const ag = ctx.createRadialGradient(cx,cy,0,cx,cy,w2*0.8);
    ag.addColorStop(0,`rgba(237,115,22,${p.accentOpacity*0.5})`); ag.addColorStop(1,"rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "screen"; ctx.fillStyle = ag; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation = "source-over";
  }
}

/* ══ HALFTONE NEBULA ══ */
const htCache = { sprites:[] as OffscreenCanvas[], grain:[] as OffscreenCanvas[], built:false };
function buildHT(): void {
  if (htCache.built || typeof OffscreenCanvas === "undefined") { return; }
  for (let i = 0; i <= 16; i++) {
    const oc = new OffscreenCanvas(16, 16);
    const c2 = oc.getContext("2d")!;
    const r = 0.3 + Math.pow(i/16, 1.8) * 5.2;
    c2.fillStyle = "rgba(255,255,255,0.45)";
    c2.beginPath(); c2.arc(8,8,r,0,Math.PI*2); c2.fill();
    htCache.sprites.push(oc);
  }
  for (let f = 0; f < 4; f++) {
    const oc = new OffscreenCanvas(128,128);
    const c2 = oc.getContext("2d")!;
    const img = c2.createImageData(128,128);
    for (let i = 0; i < img.data.length; i+=4) {
      const v = Math.max(0,Math.min(255,(Math.random()-Math.random())*18));
      img.data[i]=img.data[i+1]=img.data[i+2]=v; img.data[i+3]=12;
    }
    c2.putImageData(img,0,0); htCache.grain.push(oc);
  }
  htCache.built = true;
}
export function drawHalftone(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  buildHT();
  ctx.fillStyle = BG; ctx.fillRect(0,0,W,H);

  /* Dos focos laterales — visibles en los costados del frame 1024px */
  const nr = Math.min(W,H)*(0.38+p.displacementAmount*0.001);
  /* Oscilan suavemente en los extremos del viewport */
  const lx = W*0.04 + Math.sin(t*0.35)*W*0.04;
  const rx = W*0.96 + Math.cos(t*0.28)*W*0.03;
  const ly = H*0.50 + Math.cos(t*0.42)*H*0.15;
  const ry = H*0.50 + Math.sin(t*0.38)*H*0.14;

  ctx.globalCompositeOperation = "screen";

  /* Glow izquierdo — violeta */
  const gl = ctx.createRadialGradient(lx,ly,0,lx,ly,nr*1.5);
  gl.addColorStop(0,`rgba(120,50,220,${0.50+p.patternOpacity})`);
  gl.addColorStop(0.4,"rgba(80,30,180,0.15)"); gl.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle = gl; ctx.fillRect(0,0,W,H);

  /* Glow derecho — violeta con tinte naranja si accentOpacity */
  const gr2 = ctx.createRadialGradient(rx,ry,0,rx,ry,nr*1.5);
  const rc = p.accentOpacity > 0.02 ? `rgba(160,60,220,${0.45+p.patternOpacity})` : `rgba(100,40,210,${0.50+p.patternOpacity})`;
  gr2.addColorStop(0,rc);
  gr2.addColorStop(0.4,"rgba(80,30,180,0.15)"); gr2.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle = gr2; ctx.fillRect(0,0,W,H);

  /* Acento naranja en los focos laterales */
  if (p.accentOpacity > 0.01) {
    const ol = ctx.createRadialGradient(lx,ly,0,lx,ly,nr*0.7);
    ol.addColorStop(0,`rgba(237,115,22,${p.accentOpacity+0.08})`);
    ol.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle = ol; ctx.fillRect(0,0,W,H);

    const or2 = ctx.createRadialGradient(rx,ry,0,rx,ry,nr*0.7);
    or2.addColorStop(0,`rgba(237,115,22,${p.accentOpacity+0.06})`);
    or2.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle = or2; ctx.fillRect(0,0,W,H);
  }
  ctx.globalCompositeOperation = "source-over";

  /* Halftone dots — INVERTIDO: densos en bordes, void en el centro */
  if (htCache.built) {
    const grid = Math.max(10, Math.round(20-p.density*0.4));
    const cx = W / 2;
    /* Zona de fade: qué tan amplio es el void central.
       ~40% del ancho total queda vacío en el medio */
    const voidR = cx * 0.42;

    for (let x = grid/2; x < W; x += grid) {
      for (let y = grid/2; y < H; y += grid) {
        /* Distancia horizontal al centro — define el void */
        const distFromCenter = Math.abs(x - cx);
        /* 0 en el centro, 1 en los bordes */
        const edgeFrac = Math.max(0, (distFromCenter - voidR) / (cx - voidR));
        /* Pulso vertical suave para que no sea una banda plana */
        const vertPulse = 0.7 + 0.3 * Math.sin(y * 0.008 + t * 0.5 + x * 0.003);
        /* patternOpacity amplifica la densidad — rango más amplio */
        const intensity = edgeFrac * vertPulse;
        if (intensity < 0.04) { continue; }
        const idx = Math.round(Math.min(1, intensity) * 15);
        const sprite = htCache.sprites[idx];
        if (sprite) {
          /* globalAlpha aplica directamente sobre el sprite — responde al slider */
          ctx.globalAlpha = intensity * p.patternOpacity * 8;
          ctx.drawImage(sprite, x-8, y-8);
        }
      }
    }
    ctx.globalAlpha = 1; /* restaurar */
    const gf = Math.floor(t*10)%4;
    const gp = ctx.createPattern(htCache.grain[gf],"repeat");
    if (gp) { ctx.fillStyle = gp; ctx.fillRect(0,0,W,H); }
  }
}

/* ══ RIBBONS ══ */
export function drawRibbons(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const rows = Math.max(3,Math.round(p.density)), cols = 80, cx=W/2, cy=H/2;
  type V={x:number;y:number;z:number};
  const verts:V[][]=[];
  for (let row=0;row<=rows;row++) {
    const arr:V[]=[];
    for (let col=0;col<=cols;col++) {
      const nu=col/cols,nt=row/rows;
      const bx=(nu-.5)*W*p.scaleX, by=(nt-.5)*H*p.scaleY;
      const {vx,vy}=curlXY(bx*.01,by*.01,t,p.curlFrequency*100);
      const z=(vx*.7+vy*.3)*p.displacementAmount;
      const ta=Math.sin(by*.006)*p.twistAmount*.3;
      const ct=Math.cos(ta),st=Math.sin(ta);
      arr.push({x:cx+bx*ct-(by+z)*st,y:cy+bx*st+(by+z)*ct,z});
    }
    verts.push(arr);
  }
  for (let row=0;row<rows;row++) {
    const top=verts[row],bot=verts[row+1],isAccent=row%3===0;
    ctx.beginPath(); ctx.moveTo(top[0].x,top[0].y);
    for (let c=1;c<=cols;c++) { ctx.lineTo(top[c].x,top[c].y); }
    ctx.strokeStyle=isAccent?`rgba(237,115,22,${p.patternOpacity*3+0.05})`:`rgba(140,80,200,${p.patternOpacity*2})`;
    ctx.lineWidth=p.strokeWeight*(isAccent?2:1);
    if (isAccent) { glow(ctx,"rgba(237,115,22,0.6)",20*p.glowAmount); }
    ctx.stroke(); noGlow(ctx);
    ctx.beginPath(); ctx.moveTo(top[0].x,top[0].y);
    for (let c=1;c<=cols;c++) { ctx.lineTo(top[c].x,top[c].y); }
    for (let c=cols;c>=0;c--) { ctx.lineTo(bot[c].x,bot[c].y); }
    ctx.closePath();
    ctx.fillStyle=isAccent?`rgba(237,100,22,${p.accentOpacity+0.02})`:`rgba(60,30,120,${p.patternOpacity*0.8})`;
    ctx.fill();
  }
}

/* ══ AURORA ══ */
export function drawAurora(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.fillStyle=BG; ctx.fillRect(0,0,W,H);
  const bands=Math.max(3,Math.round(p.density));
  for (let b=0;b<bands;b++) {
    const baseX=(b/bands)*W+(Math.sin(t*0.4+b)*W*0.08);
    const width2=(W/bands)*(0.4+p.strokeWeight*0.3);
    const pts:{x:number;y:number}[]=[];
    for (let i=0;i<=120;i++) {
      const y=(i/120)*H;
      const wave=Math.sin(y*p.curlFrequency*200+t+b*1.2)*p.displacementAmount*0.6
               +fbm(baseX*0.003,y*0.004,2)*p.displacementAmount*0.4;
      pts.push({x:baseX+wave,y});
    }
    const grad=ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,   `rgba(237,115,22,${p.patternOpacity*1.5})`);
    grad.addColorStop(0.35,`rgba(0,202,206,${p.patternOpacity*2})`);
    grad.addColorStop(0.7, `rgba(88,28,200,${p.patternOpacity*1.5})`);
    grad.addColorStop(1,   `rgba(40,10,80,${p.patternOpacity})`);
    ctx.beginPath();
    pts.forEach(function(pt,i){if(i===0){ctx.moveTo(pt.x-width2/2,pt.y);}else{ctx.lineTo(pt.x-width2/2,pt.y);}});
    for(let i=120;i>=0;i--){ctx.lineTo(pts[i].x+width2/2,pts[i].y);}
    ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath();
    pts.forEach(function(pt,i){if(i===0){ctx.moveTo(pt.x,pt.y);}else{ctx.lineTo(pt.x,pt.y);}});
    ctx.strokeStyle=b%3===0?`rgba(237,115,22,${p.accentOpacity+0.06})`:`rgba(0,202,206,${p.patternOpacity*2})`;
    ctx.lineWidth=p.strokeWeight*1.2;
    if(b%3===0){glow(ctx,"rgba(237,115,22,0.5)",18*p.glowAmount);}
    ctx.stroke(); noGlow(ctx);
  }
}

/* ══ VORTEX ══ */
export function drawVortex(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.fillStyle=BG; ctx.fillRect(0,0,W,H);
  const arms=Math.max(2,Math.round(p.density*0.5)), cx=W/2, cy=H/2, maxR=Math.min(W,H)*0.6;
  for(let arm=0;arm<arms;arm++){
    const off=(arm/arms)*Math.PI*2;
    ctx.beginPath();
    for(let i=0;i<=200;i++){
      const frac=i/200, r=frac*maxR*p.scaleX*0.15;
      const angle=frac*Math.PI*6*p.curlFrequency*300+off+t*p.speed;
      const noise=fbm(r*0.004+t*0.1,angle*0.3,2)*p.displacementAmount*0.3;
      const x=cx+(r+noise)*Math.cos(angle), y=cy+((r+noise)*Math.sin(angle)*p.scaleY/p.scaleX);
      if(i===0){ctx.moveTo(x,y);}else{ctx.lineTo(x,y);}
    }
    ctx.strokeStyle=arm%2===0?`rgba(237,115,22,${p.patternOpacity*3+0.08})`:`rgba(0,202,206,${p.patternOpacity*2})`;
    ctx.lineWidth=(p.strokeWeight*1.5)*(1-0.3*(arm/arms));
    if(arm%2===0){glow(ctx,"rgba(237,115,22,0.5)",22*p.glowAmount);}
    else{glow(ctx,"rgba(0,202,206,0.4)",14*p.glowAmount*0.6);}
    ctx.stroke(); noGlow(ctx);
  }
}

/* ══ STARFIELD ══ */
interface Star{x:number;y:number;z:number;px:number;py:number}
const sp:Star[]=[];
function initSp(W:number,H:number,n:number){sp.length=0;for(let i=0;i<n;i++){sp.push({x:(Math.random()-.5)*W*3,y:(Math.random()-.5)*H*3,z:Math.random(),px:0,py:0});}}
export function drawStarfield(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const count=Math.max(20,Math.round(p.density*12));
  if(sp.length!==count){initSp(W,H,count);}
  ctx.fillStyle=BG.replace(",1)",",0.18)"); ctx.fillRect(0,0,W,H);
  const cx=W/2,cy=H/2,spd=p.speed*0.8;
  sp.forEach(function(s){
    s.z-=spd*0.002; if(s.z<=0){s.x=(Math.random()-.5)*W*3;s.y=(Math.random()-.5)*H*3;s.z=1;}
    const sx=cx+s.x/s.z, sy=cy+s.y/s.z, r=Math.max(0.3,(1-s.z)*p.strokeWeight*2.5);
    const bright=1-s.z, isAccent=hash2(s.x*0.01,s.y*0.01)>0.88;
    ctx.beginPath(); ctx.moveTo(s.px||sx,s.py||sy); ctx.lineTo(sx,sy);
    ctx.strokeStyle=isAccent?`rgba(237,115,22,${bright*(p.patternOpacity*4+0.05)})`:`rgba(180,140,255,${bright*p.patternOpacity*3})`;
    ctx.lineWidth=r*0.5;
    if(isAccent&&bright>0.6){glow(ctx,"rgba(237,115,22,0.5)",12*p.glowAmount);}
    ctx.stroke(); noGlow(ctx);
    ctx.beginPath(); ctx.arc(sx,sy,r,0,Math.PI*2);
    ctx.fillStyle=isAccent?`rgba(255,180,80,${bright*(p.accentOpacity+0.1)})`:`rgba(255,255,255,${bright*p.patternOpacity*2.5})`;
    ctx.fill(); s.px=sx; s.py=sy;
  });
}

/* ══ PLASMA ══ */
export function drawPlasma(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.fillStyle=BG; ctx.fillRect(0,0,W,H);
  const n=Math.max(2,Math.round(p.density*0.4));
  for(let i=0;i<n;i++){
    const ang=(i/n)*Math.PI*2+t*0.3*(i%2===0?1:-1);
    const dist=Math.min(W,H)*(0.15+0.1*Math.sin(t*0.5+i));
    const bx=W/2+dist*Math.cos(ang)*p.scaleX*0.3;
    const by=H/2+dist*Math.sin(ang)*p.scaleY*0.3;
    const br=Math.min(W,H)*(0.12+0.08*Math.sin(t*0.7+i*1.3))*p.displacementAmount*0.01+60;
    const isOrange=i%2===0;
    const g2=ctx.createRadialGradient(bx,by,0,bx,by,br*1.5);
    g2.addColorStop(0,isOrange?`rgba(237,115,22,${p.patternOpacity*4+0.08})`:`rgba(0,202,206,${p.patternOpacity*3+0.05})`);
    g2.addColorStop(0.5,isOrange?"rgba(120,40,0,0.08)":"rgba(0,80,100,0.08)");
    g2.addColorStop(1,"rgba(0,0,0,0)");
    ctx.globalCompositeOperation="screen";
    ctx.fillStyle=g2;
    if(isOrange){glow(ctx,"rgba(237,115,22,0.3)",30*p.glowAmount);}
    else{glow(ctx,"rgba(0,202,206,0.3)",20*p.glowAmount*0.6);}
    ctx.fillRect(0,0,W,H); noGlow(ctx); ctx.globalCompositeOperation="source-over";
  }
}

/* ══ CONSTELLATION ══ */
interface Node{x:number;y:number;vx:number;vy:number}
const np:Node[]=[];
function initNp(W:number,H:number,n:number){np.length=0;for(let i=0;i<n;i++){np.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*0.3,vy:(Math.random()-.5)*0.3});}}
export function drawConstellation(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  const count=Math.max(6,Math.round(p.density*1.5));
  if(np.length!==count){initNp(W,H,count);}
  ctx.fillStyle=BG.replace(",1)",",0.12)"); ctx.fillRect(0,0,W,H);
  const spd=p.speed*0.5, maxD=Math.min(W,H)*0.3*p.scaleX*0.15;
  np.forEach(function(n){n.x+=n.vx*spd;n.y+=n.vy*spd;if(n.x<0||n.x>W){n.vx*=-1;}if(n.y<0||n.y>H){n.vy*=-1;}});
  for(let i=0;i<np.length;i++){for(let j=i+1;j<np.length;j++){
    const dx=np[i].x-np[j].x,dy=np[i].y-np[j].y,dist=Math.sqrt(dx*dx+dy*dy);
    if(dist<maxD){
      const alpha=(1-dist/maxD)*p.patternOpacity*2;
      const isAcc=(i+j)%5===0;
      ctx.beginPath();ctx.moveTo(np[i].x,np[i].y);ctx.lineTo(np[j].x,np[j].y);
      ctx.strokeStyle=isAcc?`rgba(237,115,22,${alpha+p.accentOpacity*0.5})`:`rgba(140,80,200,${alpha})`;
      ctx.lineWidth=p.strokeWeight*0.6;
      if(isAcc){glow(ctx,"rgba(237,115,22,0.4)",10*p.glowAmount);}
      ctx.stroke();noGlow(ctx);
    }
  }}
  np.forEach(function(n,i){
    const r=p.strokeWeight*1.5,isAcc=i%4===0;
    ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2);
    ctx.fillStyle=isAcc?`rgba(255,160,60,${p.accentOpacity+0.12})`:`rgba(160,100,255,${p.patternOpacity*3})`;
    if(isAcc){glow(ctx,"rgba(237,115,22,0.5)",14*p.glowAmount);}
    ctx.fill();noGlow(ctx);
  });
}

/* ══ HEX GRID ══ */
export function drawHexGrid(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.fillStyle=BG; ctx.fillRect(0,0,W,H);
  const cols=Math.max(2,Math.round(p.density*0.6));
  const size=W/cols/1.8, dx=size*Math.sqrt(3), dy=size*1.5;
  const scrollY=(t*p.speed*22)%dy, waveX=Math.sin(t*0.5)*size*0.6;
  for(let row=-2;row<Math.ceil(H/dy)+2;row++){
    for(let col=-1;col<Math.ceil(W/dx)+1;col++){
      const offset=row%2===0?0:dx*0.5;
      const cx=col*dx+offset+waveX, cy=row*dy-scrollY;
      const animSize=size*(0.85+Math.sin(t*1.1+col*0.9+row*0.6)*0.15);
      const isAcc=hash2(col*1.7,row*3.1)>0.92;
      const pulse=0.5+Math.abs(Math.sin(t*0.8+col*0.5+row*0.4))*0.8;
      ctx.beginPath();
      for(let k=0;k<6;k++){const ang=(Math.PI/3)*k-Math.PI/6;if(k===0){ctx.moveTo(cx+animSize*Math.cos(ang),cy+animSize*Math.sin(ang));}else{ctx.lineTo(cx+animSize*Math.cos(ang),cy+animSize*Math.sin(ang));}}
      ctx.closePath();
      ctx.strokeStyle=isAcc?`rgba(237,115,22,${p.accentOpacity+0.08})`:`rgba(120,60,200,${p.patternOpacity*pulse*2})`;
      ctx.lineWidth=p.strokeWeight*0.7;
      if(isAcc){glow(ctx,"rgba(237,115,22,0.4)",16*p.glowAmount);}
      ctx.stroke();noGlow(ctx);
    }
  }
}

/* ══ GLASS GRID (canvas base only) ══ */
export function drawGlassGrid(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  drawMeshGradient(ctx, W, H, t, p);
}

/* ══ VMC ARROWS — chevrons › que pulsan, derivan y se enlazan ══
   Concepto: marca de agua sutil sobre vault. Cuando dos flechas
   se acercan, se "cierran" (subasta cerrada) con un destello naranja.
   Speed=0 → estático. Speed alto → más eventos de cierre.
══════════════════════════════════════════════════════════════ */

type ArrowState = "free" | "seeking" | "locking" | "locked" | "fading";

interface Arrow {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  angle: number;
  alpha: number;
  alphaPulse: number;
  pulseSpeed: number;
  pulseOffset: number;
  state: ArrowState;
  partnerId: number;   /* -1 = sin pareja */
  lockTimer: number;
  lockFlash: number;   /* 0-1 naranja flash */
  isOrange: boolean;   /* acento naranja muy sutil */
}

const arrowPool: Arrow[] = [];

function spawnArrow(W: number, H: number, mirrored?: boolean): Arrow {
  const size = 18 + Math.random() * 55;
  const isOrange = Math.random() > 0.88;
  /* mirrored=true → flecha ‹ (apuntando izquierda) que busca pareja › */
  const angle = mirrored ? Math.PI : 0;
  return {
    x:          Math.random() * W,
    y:          Math.random() * H,
    vx:         (Math.random() - 0.5) * 0.15,
    vy:         (Math.random() - 0.5) * 0.12,
    size,
    angle,
    alpha:      0,
    alphaPulse: 0.04 + Math.random() * 0.07,
    pulseSpeed: 0.003 + Math.random() * 0.008,
    pulseOffset: Math.random() * Math.PI * 2,
    state:      "free",
    partnerId:  -1,
    lockTimer:  0,
    lockFlash:  0,
    isOrange,
  };
}

/* Proporciones exactas del isotipo VMC — viewBox 0 0 10 14 escalado */
function drawChevronShape(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  size: number, angle: number,
  color: string, lineW: number
): void {
  /* Escalar path viewBox 10×14 al size deseado */
  const sw = size / 10;
  const sh = size / 14;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  /* M2 2 L8 7 L2 12 — isotipo exacto, escalado */
  ctx.moveTo((2 - 5) * sw, (2  - 7) * sh);
  ctx.lineTo((8 - 5) * sw, (7  - 7) * sh);
  ctx.lineTo((2 - 5) * sw, (12 - 7) * sh);
  ctx.strokeStyle = color;
  ctx.lineWidth   = lineW;
  ctx.lineCap     = "round";
  ctx.lineJoin    = "round";
  ctx.stroke();
  ctx.restore();
}

export function drawVmcArrows(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  /* Fondo siempre #2E0F70 */
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  /* Pool: mitad › y mitad ‹ para que se busquen */
  const target = Math.max(8, Math.round(p.density * 2.5));
  while (arrowPool.length < target) {
    const mirrored = arrowPool.length % 2 === 1;
    arrowPool.push(spawnArrow(W, H, mirrored));
  }
  if (arrowPool.length > target)    { arrowPool.length = target; }

  const speed      = p.speed * 0.6;
  const connectDist = Math.min(W, H) * 0.28;
  const lockDist    = Math.min(W, H) * 0.04;
  const baseStroke  = Math.max(0.8, p.strokeWeight * 0.7);

  /* ── Update ── */
  arrowPool.forEach(function updateArrow(a, i) {
    /* Fade-in inicial */
    const targetAlpha = a.alphaPulse * (0.5 + 0.5 * Math.sin(t * a.pulseSpeed * 60 + a.pulseOffset));
    a.alpha += (targetAlpha - a.alpha) * 0.04;

    if (a.state === "free") {
      a.x += a.vx * speed;
      a.y += a.vy * speed;
      /* Wrap suave */
      if (a.x < -a.size) { a.x = W + a.size; }
      if (a.x > W + a.size) { a.x = -a.size; }
      if (a.y < -a.size) { a.y = H + a.size; }
      if (a.y > H + a.size) { a.y = -a.size; }

      /* Buscar pareja opuesta (› busca ‹, ‹ busca ›) */
      if (speed > 0.01 && a.partnerId === -1) {
        const isRight = Math.abs(a.angle) < 0.5;  /* › */
        for (let j = i + 1; j < arrowPool.length; j++) {
          const b = arrowPool[j];
          if (b.state !== "free" || b.partnerId !== -1) { continue; }
          const bIsRight = Math.abs(b.angle) < 0.5;
          /* Solo se emparejan opuestas: › con ‹ */
          if (isRight === bIsRight) { continue; }
          const dx = b.x - a.x, dy = b.y - a.y;
          if (Math.sqrt(dx*dx + dy*dy) < connectDist * (0.4 + Math.random() * 0.4)) {
            a.partnerId = j; b.partnerId = i;
            a.state = "seeking"; b.state = "seeking";
            break;
          }
        }
      }
    }

    if (a.state === "seeking") {
      const partnerId = a.partnerId;
      if (partnerId < 0 || partnerId >= arrowPool.length) { a.state = "free"; a.partnerId = -1; return; }
      const partner = arrowPool[partnerId];
      /* Acercarse lentamente */
      const dx = partner.x - a.x, dy = partner.y - a.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < lockDist) {
        a.state = "locking"; a.lockTimer = 40;
      } else {
        const pull = 0.006 * speed;
        a.x += (dx / dist) * pull * a.size;
        a.y += (dy / dist) * pull * a.size;
      }
    }

    if (a.state === "locking") {
      a.lockTimer -= 1;
      a.lockFlash  = Math.min(1, a.lockFlash + 0.08);
      if (a.lockTimer <= 0) {
        a.state = "locked";
        a.lockTimer = 30 + Math.random() * 40;
      }
    }

    if (a.state === "locked") {
      a.lockFlash  = Math.max(0, a.lockFlash - 0.04);
      a.lockTimer -= 1;
      if (a.lockTimer <= 0) { a.state = "fading"; }
    }

    if (a.state === "fading") {
      a.alpha -= 0.008;
      if (a.alpha <= 0) {
        /* Respawn manteniendo paridad › / ‹ */
        const mirrored = i % 2 === 1;
        arrowPool[i] = spawnArrow(W, H, mirrored);
      }
    }
  });

  /* ── Draw ── */
  arrowPool.forEach(function drawArrow(a) {
    if (a.alpha <= 0.003) { return; }

    const isLocking = a.state === "locking" || (a.state === "locked" && a.lockFlash > 0.01);

    /* strokeWidth proporcional — igual que DqIsotipo: 2.8 en viewBox 10×14 */
    const strokeW = baseStroke * Math.max(0.8, a.size * 0.18);

    if (isLocking && a.lockFlash > 0.01) {
      /* Sellado — naranja brillante, escala sutil hacia afuera */
      const flashAlpha = a.lockFlash * Math.max(0.18, p.accentOpacity + 0.10);
      const scale = 1 + a.lockFlash * 0.12;
      ctx.save();
      ctx.shadowColor = `rgba(237,137,54,${a.lockFlash * Math.max(0.4, p.glowAmount * 0.30)})`;
      ctx.shadowBlur   = a.size * 2.0 * a.lockFlash;
      drawChevronShape(ctx, a.x, a.y, a.size * scale, a.angle,
        `rgba(237,137,54,${flashAlpha})`, strokeW * 1.8);
      /* Punto de contacto — pequeño círculo naranja en el vértice de la flecha */
      if (a.lockFlash > 0.3) {
        ctx.beginPath();
        ctx.arc(a.x + Math.cos(a.angle) * a.size * 0.38 * scale,
                a.y + Math.sin(a.angle) * a.size * 0.1  * scale,
                a.size * 0.08 * a.lockFlash, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,100,${a.lockFlash * 0.7})`;
        ctx.fill();
      }
      ctx.restore();
    } else {
      /* Ghost — lavanda muy sutil, igual que las flechas inactivas del DQB */
      /* Sobre #2E0F70: lavanda y naranja dan buen contraste */
      const ghostA = a.alpha * Math.max(0.04, p.patternOpacity * 1.5);
      const baseColor = a.isOrange
        ? ORANGE(a.alpha * Math.max(0.06, p.accentOpacity))
        : LAVENDER(ghostA);

      drawChevronShape(ctx, a.x, a.y, a.size, a.angle, baseColor, strokeW);
    }
  });

  /* ── Línea de enlace entre seeking pairs ── */
  arrowPool.forEach(function drawLink(a, i) {
    if (a.state !== "seeking" || a.partnerId <= i) { return; }
    const b = arrowPool[a.partnerId];
    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > connectDist) { return; }
    const linkAlpha = (1 - dist/connectDist) * a.alpha * 0.4 * p.patternOpacity * 5;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(190,170,255,${linkAlpha})`;
    ctx.lineWidth   = 0.5;
    ctx.setLineDash([4, 8]);
    ctx.stroke();
    ctx.setLineDash([]);
  });
}

/* ════════════════════════════════════════════════════════════════════
   ARROW VARIANTS — pensamiento de animador
   Easing: ease = t*t*(3-2*t)  |  easeIn = t*t  |  easeOut = t*(2-t)
════════════════════════════════════════════════════════════════════ */

function ease(t: number): number { return t * t * (3 - 2 * t); }
function easeOut(t: number): number { return 1 - (1 - t) * (1 - t); }

/* ── Chevron helper compartido ── */
function chevron(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, size: number, angle: number,
  color: string, lw: number, alpha: number
): void {
  if (alpha < 0.005) { return; }
  ctx.globalAlpha = alpha;
  const sw = size / 10, sh = size / 14;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo((2-5)*sw, (2 -7)*sh);
  ctx.lineTo((8-5)*sw, (7 -7)*sh);
  ctx.lineTo((2-5)*sw, (12-7)*sh);
  ctx.strokeStyle = color;
  ctx.lineWidth   = lw;
  ctx.lineCap     = "round";
  ctx.lineJoin    = "round";
  ctx.stroke();
  ctx.restore();
  ctx.globalAlpha = 1;
}

/* ════════════════════════════════════════════
   VARIANT 1 — ARROW PULSE
   Historia: "El martillo cae" — un pulso de
   flechas converge desde todos lados hacia un
   punto central, se sella con naranja, y la
   onda se disipa. Como una puja ganada.
   Timing: ease-in hacia el centro, overshoot,
   fade-out suave. Stagger radial.
════════════════════════════════════════════ */
interface PulseRing { phase: number; delay: number; count: number; radius: number; }
const pulseRings: PulseRing[] = [];

export function drawArrowPulse(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);

  const cx = W * 0.5, cy = H * 0.5;
  const maxR = Math.min(W, H) * 0.45 * (p.scaleX * 0.15 + 0.5);
  const ringCount = Math.max(2, Math.round(p.density * 0.4));

  /* Inicializar rings si es necesario */
  while (pulseRings.length < ringCount) {
    pulseRings.push({
      phase:  pulseRings.length / ringCount,
      delay:  pulseRings.length * 0.28,
      count:  6 + pulseRings.length * 2,
      radius: maxR * (0.4 + (pulseRings.length / ringCount) * 0.6),
    });
  }
  if (pulseRings.length > ringCount) { pulseRings.length = ringCount; }

  const cycleSpeed = p.speed * 0.18;
  const globalPhase = (t * cycleSpeed) % 1;

  pulseRings.forEach(function drawRing(ring, ri) {
    /* Fase local con offset por ring — stagger */
    let localPhase = (globalPhase + ring.delay * cycleSpeed * 0.5) % 1;

    /* Antes de moverse: anticipación (0→0.15 = quiet) */
    /* Movimiento: ease-in hacia centro (0.15→0.75) */
    /* Overshoot + flash: (0.75→0.85) */
    /* Fade out: (0.85→1.0) */
    let distFrac = 0;
    let flashAlpha = 0;
    let arrowAlpha = 0;

    if (localPhase < 0.15) {
      /* Quieto — aparece gradualmente */
      arrowAlpha = easeOut(localPhase / 0.15) * p.patternOpacity * 1.5;
      distFrac = 1;
    } else if (localPhase < 0.75) {
      /* Converge hacia el centro con ease-in */
      const progress = (localPhase - 0.15) / 0.60;
      distFrac = 1 - ease(progress);
      arrowAlpha = (p.patternOpacity * 1.5) + progress * p.accentOpacity;
    } else if (localPhase < 0.88) {
      /* Overshoot + flash naranja */
      const flashP = (localPhase - 0.75) / 0.13;
      distFrac = easeOut(flashP) * 0.08;  /* pequeño overshoot */
      flashAlpha = Math.sin(flashP * Math.PI);
      arrowAlpha = (1 - flashP) * (p.patternOpacity + p.accentOpacity);
    } else {
      /* Fade out */
      arrowAlpha = (1 - (localPhase - 0.88) / 0.12) * p.patternOpacity * 0.5;
      distFrac = 0;
    }

    const currentR = ring.radius * distFrac;

    /* Dibujar flechas en el ring */
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2;
      /* Las flechas apuntan HACIA el centro */
      const arrowAngle = angle + Math.PI;
      const ax = cx + Math.cos(angle) * currentR;
      const ay = cy + Math.sin(angle) * currentR;
      const size = 14 + ri * 6;

      if (flashAlpha > 0.01) {
        /* Flash naranja en convergencia */
        ctx.save();
        ctx.shadowColor = ORANGE(flashAlpha * 0.6);
        ctx.shadowBlur  = size * 2 * flashAlpha;
        chevron(ctx, ax, ay, size, arrowAngle,
          ORANGE(flashAlpha * Math.max(0.3, p.accentOpacity * 2 + 0.1)),
          Math.max(0.8, size * 0.16), flashAlpha);
        ctx.restore(); ctx.shadowBlur = 0;
      } else {
        chevron(ctx, ax, ay, size, arrowAngle, LAVENDER(1), Math.max(0.6, size * 0.14), arrowAlpha);
      }
    }

    /* Glow central al momento de sellado */
    if (flashAlpha > 0.05) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.25 * flashAlpha);
      g.addColorStop(0, ORANGE(flashAlpha * Math.max(0.15, p.accentOpacity + 0.05)));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
  });
}

/* ════════════════════════════════════════════
   VARIANT 2 — ARROW SIGNAL
   Historia: "La puja viaja" — una ola naranja
   recorre el campo de flechas de izquierda a
   derecha, como un dato transmitiéndose.
   Cada flecha se ilumina en su momento y
   luego vuelve al reposo. Scanning effect.
════════════════════════════════════════════ */
export function drawArrowSignal(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);

  const cols = Math.max(4, Math.round(p.density * 0.8));
  const rows = Math.max(3, Math.round(cols * (H / W) * 0.7));
  const cw = W / cols, ch = H / rows;
  const size = Math.min(cw, ch) * 0.32;
  const lw = Math.max(0.8, size * 0.15);

  /* Signal position: 0→1 traverses left to right, then wraps */
  const signalX = ((t * p.speed * 0.25) % 1.6) - 0.3;  /* -0.3 a 1.3 */
  const signalWidth = 0.12 + p.strokeWeight * 0.02;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = (col + 0.5) * cw;
      const y = (row + 0.5) * ch;

      /* Stagger vertical: rows ligeramente desfasadas */
      const rowOffset = (row / rows) * 0.08;
      const arrowFrac = col / cols;

      /* Distancia del signal al arrow — con offset por row */
      const dist = Math.abs((arrowFrac + rowOffset) - signalX);
      const normalDist = dist / signalWidth;

      /* Bell curve de iluminación — suave, no lineal */
      const signal = Math.max(0, 1 - normalDist * normalDist);

      /* Base: lavanda muy sutil, todos visibles */
      const baseAlpha = p.patternOpacity * 0.8;

      /* Señal: naranja vibrante cuando pasa */
      const signalAlpha = signal * Math.max(0.25, p.accentOpacity + 0.12);
      const mixColor = signal > 0.15 ? ORANGE(signalAlpha) : LAVENDER(baseAlpha);

      if (signal > 0.05) {
        ctx.save();
        ctx.shadowColor = ORANGE(signal * 0.4);
        ctx.shadowBlur  = size * 1.5 * signal;
      }
      chevron(ctx, x, y, size, 0, mixColor, lw, baseAlpha + signal * 0.6);
      if (signal > 0.05) { ctx.restore(); ctx.shadowBlur = 0; }
    }
  }

  /* Trail: estela de luz horizontal donde viaja la señal */
  const trailX = signalX * W;
  const trailG = ctx.createLinearGradient(trailX - W*0.15, 0, trailX + W*0.05, 0);
  trailG.addColorStop(0, "rgba(0,0,0,0)");
  trailG.addColorStop(0.7, ORANGE(p.glowAmount * 0.015));
  trailG.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = trailG; ctx.fillRect(0, 0, W, H);
}

/* ════════════════════════════════════════════
   VARIANT 3 — ARROW ORBIT
   Historia: "Postores girando" — flechas en
   órbita a distintos radios. Cuando dos se
   alinean radialmente, se atraen brevemente y
   hacen contacto. Como planetas colisionando.
   Física: velocidad angular inversamente prop.
   al radio (como órbitas kepleranas).
════════════════════════════════════════════ */
export function drawArrowOrbit(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);

  const cx = W * 0.5, cy = H * 0.5;
  const orbitCount = Math.max(2, Math.round(p.density * 0.35));
  const maxR = Math.min(W, H) * 0.42 * (p.scaleX * 0.15 + 0.5);

  /* Dibujar órbitas guía — muy sutiles */
  for (let o = 0; o < orbitCount; o++) {
    const r = maxR * ((o + 1) / orbitCount);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = LAVENDER(p.patternOpacity * 0.3);
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 12]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  /* Arrows por órbita */
  const arrowsPerOrbit: { x:number; y:number; angle:number; r:number; speed:number }[][] = [];

  for (let o = 0; o < orbitCount; o++) {
    const r = maxR * ((o + 1) / orbitCount);
    /* Velocidad kepleriana: más rápido en órbitas interiores */
    const speed = p.speed * 0.08 * (1 / Math.sqrt((o + 1) / orbitCount));
    const arrowCount = 3 + o * 2;
    const orbArrows: { x:number; y:number; angle:number; r:number; speed:number }[] = [];

    for (let i = 0; i < arrowCount; i++) {
      const baseAngle = (i / arrowCount) * Math.PI * 2;
      const currentAngle = baseAngle + t * speed;
      const x = cx + Math.cos(currentAngle) * r;
      const y = cy + Math.sin(currentAngle) * r;
      /* Flecha apunta tangencialmente en dir de órbita */
      const tangent = currentAngle + Math.PI / 2;
      orbArrows.push({ x, y, angle: tangent, r, speed });
    }
    arrowsPerOrbit.push(orbArrows);
  }

  /* Detectar alineación entre órbitas adyacentes → flash */
  for (let o = 0; o < orbitCount - 1; o++) {
    for (let i = 0; i < arrowsPerOrbit[o].length; i++) {
      for (let j = 0; j < arrowsPerOrbit[o+1].length; j++) {
        const a = arrowsPerOrbit[o][i];
        const b = arrowsPerOrbit[o+1][j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const closeness = Math.max(0, 1 - dist / (maxR * 0.2));
        if (closeness > 0.1) {
          /* Línea de atracción entre ellos */
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = ORANGE(closeness * Math.max(0.12, p.accentOpacity));
          ctx.lineWidth = closeness * 2;
          ctx.stroke();
          /* Glow en ambos */
          ctx.save();
          ctx.shadowColor = ORANGE(closeness * 0.4);
          ctx.shadowBlur  = 20 * closeness * p.glowAmount;
          chevron(ctx, a.x, a.y, 18, a.angle, ORANGE(closeness * 0.6 + p.accentOpacity), 2, closeness);
          chevron(ctx, b.x, b.y, 18, b.angle, ORANGE(closeness * 0.6 + p.accentOpacity), 2, closeness);
          ctx.restore(); ctx.shadowBlur = 0;
        }
      }
    }
  }

  /* Dibujar todas las flechas */
  arrowsPerOrbit.forEach(function drawOrbit(orbit, oi) {
    const size = 12 + oi * 5;
    orbit.forEach(function drawOrbArrow(a) {
      chevron(ctx, a.x, a.y, size, a.angle, LAVENDER(1),
        Math.max(0.6, size * 0.13), p.patternOpacity * 1.2);
    });
  });
}

/* ════════════════════════════════════════════
   VARIANT 4 — ARROW BREATHE
   Historia: "El mercado respira" — campo
   estático de flechas que respiran colectiva-
   mente. Ola lenta de opacidad por filas.
   Ocasionalmente una flecha "despierta"
   (naranja) y busca su par antes de dormir.
   Para usar como fondo casi-estático.
   Speed=0 → respiración mínima, cero movim.
════════════════════════════════════════════ */
interface AwakeArrow { col: number; row: number; life: number; maxLife: number; x: number; y: number; targetX: number; targetY: number; }
const awakePool: AwakeArrow[] = [];

export function drawArrowBreathe(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);

  const cols = Math.max(5, Math.round(p.density * 0.9));
  const rows = Math.max(4, Math.round(cols * (H / W) * 0.8));
  const cw = W / cols, ch = H / rows;
  const size = Math.min(cw, ch) * 0.28;
  const lw = Math.max(0.6, size * 0.14);

  /* Breath cycle — ola lenta por fila */
  const breathFreq = 0.4 + p.speed * 0.3;
  const waveSpeed  = 0.6;

  /* Despertar flechas ocasionalmente */
  if (p.speed > 0.05 && Math.random() < p.speed * 0.004 && awakePool.length < 3) {
    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);
    awakePool.push({
      col, row,
      life: 0, maxLife: 120 + Math.random() * 80,
      x: (col + 0.5) * cw, y: (row + 0.5) * ch,
      targetX: (Math.floor(Math.random() * cols) + 0.5) * cw,
      targetY: (Math.floor(Math.random() * rows) + 0.5) * ch,
    });
  }

  /* Actualizar despiertas */
  for (let ai = awakePool.length - 1; ai >= 0; ai--) {
    const aw = awakePool[ai];
    aw.life += 1;
    /* Ease-out hacia target */
    const progress = easeOut(Math.min(1, aw.life / (aw.maxLife * 0.6)));
    const cx2 = aw.x + (aw.targetX - aw.x) * progress;
    const cy2 = aw.y + (aw.targetY - aw.y) * progress;
    const lifeAlpha = Math.sin((aw.life / aw.maxLife) * Math.PI);

    ctx.save();
    ctx.shadowColor = ORANGE(lifeAlpha * 0.4);
    ctx.shadowBlur  = size * 2 * lifeAlpha * p.glowAmount;
    chevron(ctx, cx2, cy2, size * (1 + lifeAlpha * 0.15), 0,
      ORANGE(1), lw * 1.5, lifeAlpha * Math.max(0.2, p.accentOpacity + 0.1));
    ctx.restore(); ctx.shadowBlur = 0;

    if (aw.life >= aw.maxLife) { awakePool.splice(ai, 1); }
  }

  /* Grid base — breathing concentrado en los costados, void central */
  const cx = W / 2;
  const voidR = cx * 0.40; /* 40% del ancho = zona vacía en el medio */

  /* Despertar solo en los costados */
  if (p.speed > 0.05 && Math.random() < p.speed * 0.004 && awakePool.length < 3) {
    const side = Math.random() > 0.5 ? 1 : 0; /* 0=izq, 1=der */
    const col = side === 0
      ? Math.floor(Math.random() * cols * 0.3)
      : Math.floor(cols * 0.7 + Math.random() * cols * 0.3);
    const row = Math.floor(Math.random() * rows);
    awakePool.push({
      col, row,
      life: 0, maxLife: 120 + Math.random() * 80,
      x: (col + 0.5) * cw, y: (row + 0.5) * ch,
      targetX: (Math.floor(Math.random() * cols * 0.3 + (side === 1 ? cols * 0.7 : 0)) + 0.5) * cw,
      targetY: (Math.floor(Math.random() * rows) + 0.5) * ch,
    });
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = (col + 0.5) * cw, y = (row + 0.5) * ch;

      /* Fade lateral: 0 en el centro, 1 en los bordes */
      const distFromCenter = Math.abs(x - cx);
      const edgeFrac = Math.max(0, (distFromCenter - voidR) / (cx - voidR));
      if (edgeFrac < 0.05) { continue; } /* void central */

      const waveOffset = (row / rows) * Math.PI * 2 * waveSpeed;
      const breath = (Math.sin(t * breathFreq + waveOffset) + 1) * 0.5;
      const alpha = (0.30 + breath * 0.70) * p.patternOpacity * 1.4 * edgeFrac;
      const pulsedSize = size * (0.92 + breath * 0.08);
      chevron(ctx, x, y, pulsedSize, 0, LAVENDER(1), lw, alpha);
    }
  }
}

/* ══ MASTER DRAW ══ */
export function drawAll(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, p: BgParams): void {
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  if (p.geometry === "vmcarrows")     { drawVmcArrows(ctx,W,H,t,p); return; }
  if (p.geometry === "arrowpulse")   { drawArrowPulse(ctx,W,H,t,p); return; }
  if (p.geometry === "arrowsignal")  { drawArrowSignal(ctx,W,H,t,p); return; }
  if (p.geometry === "arroworbit")   { drawArrowOrbit(ctx,W,H,t,p); return; }
  if (p.geometry === "arrowbreathe") { drawArrowBreathe(ctx,W,H,t,p); return; }
  if (p.geometry === "meshgradient")  { drawMeshGradient(ctx,W,H,t,p); return; }
  if (p.geometry === "lightsweep")    { drawLightSweep(ctx,W,H,t,p); return; }
  if (p.geometry === "halftone")      { drawHalftone(ctx,W,H,t,p); return; }
  if (p.geometry === "glassgrid")     { drawGlassGrid(ctx,W,H,t,p); return; }
  if (p.geometry === "ribbons")       { ctx.fillStyle=BG; ctx.fillRect(0,0,W,H); drawRibbons(ctx,W,H,t,p); return; }
  if (p.geometry === "aurora")        { drawAurora(ctx,W,H,t,p); return; }
  if (p.geometry === "vortex")        { drawVortex(ctx,W,H,t,p); return; }
  if (p.geometry === "starfield")     { ctx.fillStyle=BG; ctx.fillRect(0,0,W,H); drawStarfield(ctx,W,H,t,p); return; }
  if (p.geometry === "plasma")        { drawPlasma(ctx,W,H,t,p); return; }
  if (p.geometry === "constellation") { ctx.fillStyle=BG; ctx.fillRect(0,0,W,H); drawConstellation(ctx,W,H,t,p); return; }
  if (p.geometry === "hexgrid")       { drawHexGrid(ctx,W,H,t,p); return; }
}
