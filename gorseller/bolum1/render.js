const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const FPS=30, TOTAL=65.4;
(async()=>{const [a,b,dir]=[+process.argv[2],+process.argv[3],process.argv[4]];
fs.mkdirSync(path.join(__dirname,dir),{recursive:true});
const br=await chromium.launch();const p=await br.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});
await p.goto('file://'+path.join(__dirname,'bolum1.html'));await p.waitForTimeout(600);
for(let i=a;i<b;i++){await p.evaluate(t=>window.render(t),i/FPS);await p.screenshot({path:path.join(__dirname,dir,`f${String(i).padStart(5,'0')}.png`)});}
await br.close();console.log('done',a,b);})();
