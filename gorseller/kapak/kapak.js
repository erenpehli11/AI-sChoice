const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.join(__dirname,'kapak.html'));await p.waitForTimeout(400);
for(const n of [1,2,3,4]){await p.evaluate(x=>renderCover(x),n);await p.waitForTimeout(60);await p.screenshot({path:path.join(__dirname,`kapak${n}.png`)});}
// grid mock
const g=await b.newPage({viewport:{width:600,height:1000},deviceScaleFactor:2});
const im=n=>'data:image/png;base64,'+fs.readFileSync(path.join(__dirname,`kapak${n}.png`)).toString('base64');
const tile=n=>n?`<div class="t" style="background-image:url(${im(n)})"></div>`:`<div class="t e"></div>`;
await g.setContent(`<html><body style="margin:0;background:#111;font-family:Inter;display:flex;justify-content:center;align-items:center;height:1000px">
<style>.ph{width:470px;height:930px;background:#000;border-radius:48px;padding:16px;box-sizing:border-box;border:3px solid #333}.sc{background:#fff;border-radius:34px;height:100%;overflow:hidden}
.hd{padding:26px 22px 10px;display:flex;gap:16px;align-items:center}.av{width:78px;height:78px;border-radius:50%;background:#1c1d1c;display:flex;align-items:center;justify-content:center}
.g{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;margin-top:14px}.t{aspect-ratio:3/4;background-size:cover;background-position:center}.e{background:#ddd}</style>
<div class="ph"><div class="sc"><div class="hd"><div class="av"><svg width="60" height="60" viewBox="-80 -130 160 160"><circle cx="0" cy="-46" r="58" fill="none" stroke="#D9652A" stroke-width="16"/><path d="M-24 -26 Q0 -96 24 -26 Q0 -40 -24 -26Z" fill="#D9652A"/></svg></div>
<div><div style="font-weight:800;font-size:22px">ocak.dizi</div><div style="font-size:15px;color:#555;margin-top:4px">Gri bir şehir. Bir futbol kulübü. Bir baba.</div></div></div>
<div style="display:flex;justify-content:space-around;font-size:15px;color:#222;padding:6px 0"><b>4 gönderi</b><span>Her gün yeni bölüm</span></div>
<div class="g">${tile(4)}${tile(3)}${tile(2)}${tile(1)}${tile(0)}${tile(0)}</div></div></div></body></html>`);
await g.waitForTimeout(300);await g.screenshot({path:path.join(__dirname,'kapak-izgara.png')});
console.log('errors',errs);await b.close();})();
