// Mekân çizimleri: soyunma odası, stadyum, Yusuf'un evi — A+C stili (net kontur + yumuşak hacim)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const OUT = __dirname;

const INK = '#2a2420';
const O = (w = 4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const L = (w = 3, c = INK, op = 1) => `stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"`;
const ORANGE = '#D9652A';
function rng(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
const poly = (pts) => pts.map(p => p.join(',')).join(' ');
const lerp = (a, b, t) => a + (b - a) * t;

function defs() {
  return `<defs>
    <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
    <linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6ecd2" stop-opacity=".55"/><stop offset="1" stop-color="#f6ecd2" stop-opacity=".05"/></linearGradient>
    <radialGradient id="pool" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f3e6c6" stop-opacity=".55"/><stop offset="1" stop-color="#f3e6c6" stop-opacity="0"/></radialGradient>
    <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
    <radialGradient id="tvglow" cx=".5" cy="1.1" r=".9"><stop offset="0" stop-color="#9cc3d8" stop-opacity=".45"/><stop offset="1" stop-color="#9cc3d8" stop-opacity="0"/></radialGradient>
    <radialGradient id="lampglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f5c97e" stop-opacity=".6"/><stop offset="1" stop-color="#f5c97e" stop-opacity="0"/></radialGradient>
    <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e9493"/><stop offset="1" stop-color="#c9c8c0"/></linearGradient>
    <linearGradient id="grassG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d8c63"/><stop offset="1" stop-color="#6f7049"/></linearGradient>
    <pattern id="netP" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 0 L18 18 M18 0 L0 18" stroke="#e8e6df" stroke-width="1.6" opacity=".8"/></pattern>
    <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="soft2"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>`;
}

/* ============================== 1. SOYUNMA ODASI ============================== */
function locker() {
  let s = defs();
  const VP = [540, 820];
  // surfaces
  s += `<polygon points="${poly([[0, 0], [1080, 0], [920, 380], [160, 380]])}" fill="#3e403e" ${O()}/>`; // ceiling
  s += `<polygon points="${poly([[0, 0], [160, 380], [160, 1250], [0, 1650]])}" fill="#5d625e" ${O()}/>`; // left wall
  s += `<polygon points="${poly([[1080, 0], [920, 380], [920, 1250], [1080, 1650]])}" fill="#555a57" ${O()}/>`; // right wall
  s += `<rect x="160" y="380" width="760" height="870" fill="#6c716c" ${O()}/>`; // back wall
  s += `<polygon points="${poly([[0, 1650], [160, 1250], [920, 1250], [1080, 1650], [1080, 1920], [0, 1920]])}" fill="#57534c" ${O()}/>`; // floor
  // wall lower paint band (old two-tone institutional paint)
  s += `<rect x="160" y="1010" width="760" height="240" fill="#4f6a66" opacity=".55"/><line x1="160" y1="1010" x2="920" y2="1010" ${L(3)}/>`;
  s += `<polygon points="${poly([[0, 1180], [160, 1010], [160, 1250], [0, 1650]])}" fill="#4f6a66" opacity=".5"/>`;
  s += `<polygon points="${poly([[1080, 1180], [920, 1010], [920, 1250], [1080, 1650]])}" fill="#4f6a66" opacity=".5"/>`;
  // peeling patches
  const r = rng(11);
  for (let i = 0; i < 9; i++) {
    const x = 190 + r() * 690, y = 420 + r() * 560, w = 30 + r() * 60, h = 14 + r() * 30;
    s += `<path d="M${x} ${y} q${w * .3} ${-h * .4} ${w * .6} 0 q${w * .2} ${h * .5} ${w * .4} ${h * .2} q${-w * .3} ${h * .8} ${-w * .7} ${h * .5} q${-w * .4} ${-h * .2} ${-w * .3} ${-h * .7}Z" fill="#8c8f88" opacity=".7" ${L(1.5, INK, .4)}/>`;
  }
  // floor tiles converging to VP
  for (let x = 160; x <= 920; x += 76) {
    const t = (1920 - VP[1]) / (1250 - VP[1]);
    const bx = VP[0] + (x - VP[0]) * t;
    s += `<line x1="${x}" y1="1250" x2="${bx}" y2="1920" ${L(2, '#2a2420', .35)}/>`;
  }
  for (const y of [1290, 1345, 1420, 1520, 1650, 1820]) s += `<line x1="0" y1="${y}" x2="1080" y2="${y}" ${L(2, '#2a2420', .3)}/>`;
  s += `<polygon points="${poly([[0, 1650], [160, 1250], [920, 1250], [1080, 1650], [1080, 1920], [0, 1920]])}" fill="none" ${O()}/>`;

  // faded crest painted on back wall
  s += `<g opacity=".5"><circle cx="540" cy="600" r="112" fill="${ORANGE}" ${O(5)}/><circle cx="540" cy="600" r="90" fill="none" stroke="${INK}" stroke-width="6"/>
        <path d="M505 630 Q540 530 575 630 Q540 605 505 630Z" fill="${INK}"/>
        <text x="540" y="672" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" fill="${INK}">1953</text></g>`;
  s += `<text x="540" y="756" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="6" fill="${INK}" opacity=".45">KARAOCAK DEMİRSPOR</text>`;
  // chalkboard
  s += `<rect x="350" y="800" width="380" height="190" rx="6" fill="#2f3a35" ${O(5)}/><rect x="350" y="800" width="380" height="190" rx="6" fill="none" stroke="#7a5a3c" stroke-width="10"/>`;
  s += `<g ${L(3, '#d9d6cc', .45)}><circle cx="420" cy="860" r="12"/><circle cx="470" cy="920" r="12"/><path d="M500 870 l14 14 M514 870 l-14 14"/><path d="M430 870 Q520 830 600 880"/><path d="M590 872 l12 9 l-14 4"/><path d="M620 930 h70"/><circle cx="660" cy="860" r="12"/></g>`;
  // high window + light shaft
  s += `<rect x="760" y="420" width="130" height="80" fill="#e9e3d0" ${O(5)}/><line x1="825" y1="420" x2="825" y2="500" ${L(5)}/><line x1="760" y1="460" x2="890" y2="460" ${L(4)}/>`;
  s += `<polygon points="${poly([[760, 500], [890, 500], [700, 1700], [380, 1640]])}" fill="url(#shaft)"/>`;
  s += `<ellipse cx="540" cy="1660" rx="260" ry="80" fill="url(#pool)"/>`;
  // dead bulb
  s += `<line x1="540" y1="0" x2="540" y2="250" ${L(3)}/><path d="M524 250 h32 v14 h-32Z" fill="#555" ${O(3)}/><circle cx="540" cy="284" r="22" fill="#bdbab0" opacity=".85" ${O(3)}/>`;

  // left wall: hooks + jerseys + bench
  const lw = (t, f) => { const x = 160 * t, yt = 380 * t, yb = 1650 - 400 * t; return [x, yt + f * (yb - yt)]; };
  s += `<line x1="${lw(0.02, .42)[0]}" y1="${lw(0.02, .42)[1]}" x2="${lw(.98, .42)[0]}" y2="${lw(.98, .42)[1]}" ${L(5, '#7a5a3c')}/>`;
  const jerseyCols = [['#c86a3a', '#2a2420'], ['#9aa1a3', '#6b7274'], ['#3f5f86', '#2c4462'], ['#e6e1d4', '#b8b2a4'], ['#c86a3a', '#2a2420']];
  [0.1, 0.3, 0.5, 0.67, 0.83].forEach((t, i) => {
    const [x, y] = lw(t, .42); const sc = 1.15 - 0.75 * t;
    const [c1, c2] = jerseyCols[i];
    s += `<g transform="translate(${x + 8} ${y}) scale(${sc * 1.6} ${sc * 1.75}) skewY(${-24 + t * 10})">
      <path d="M-34 6 L-12 0 Q0 10 12 0 L34 6 L46 34 L30 40 L28 110 L-28 110 L-30 40 L-46 34Z" fill="${c1}" ${O(4)}/>
      ${i % 2 === 0 ? `<rect x="-28" y="54" width="56" height="12" fill="${c2}"/>` : ''}
      <text x="0" y="94" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="${c2}" opacity=".7">${[4, 7, 11, 1, 8][i]}</text></g>`;
  });
  // bench (left)
  const b0 = lw(0.05, .78), b1 = lw(0.95, .78);
  const f0 = [b0[0] + 95, b0[1] + 40], f1 = [b1[0] + 30, b1[1] + 12];
  s += `<polygon points="${poly([b0, b1, f1, f0])}" fill="#8a6a4a" ${O(4)}/>`;
  s += `<polygon points="${poly([f0, f1, [f1[0], f1[1] + 14], [f0[0], f0[1] + 30]])}" fill="#6b5038" ${O(3)}/>`;
  for (const t of [0.15, 0.5, 0.85]) { const p = [lerp(f0[0], f1[0], t), lerp(f0[1], f1[1], t)]; s += `<line x1="${p[0]}" y1="${p[1] + 20}" x2="${p[0] - 4}" y2="${p[1] + 120 - t * 60}" ${L(6, '#4b3a28')}/>`; }
  // a towel on bench
  s += `<path d="M${f0[0] + 40} ${f0[1] - 18} q40 -10 70 -14 l6 46 q-36 4 -70 14Z" fill="#d9d2c2" ${O(3)}/>`;

  // right wall: lockers
  const rw = (t, f) => { const x = 1080 - 160 * t, yt = 380 * t, yb = 1650 - 400 * t; return [x, yt + f * (yb - yt)]; };
  const ts = [0.05, 0.22, 0.38, 0.52, 0.65, 0.77, 0.88];
  for (let i = 0; i < ts.length - 1; i++) {
    const a = ts[i], b = ts[i + 1];
    const q = [rw(a, .28), rw(b, .28), rw(b, .92), rw(a, .92)];
    const open = i === 1;
    s += `<polygon points="${poly(q)}" fill="${open ? '#2d302f' : (i % 2 ? '#748084' : '#6a767a')}" ${O(4)}/>`;
    if (!open) {
      for (let k = 0; k < 4; k++) { const f = .34 + k * .03; const p1 = rw(a + (b - a) * .25, f), p2 = rw(a + (b - a) * .75, f); s += `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" ${L(2.5)}/>`; }
      const h = rw(a + (b - a) * .78, .6); s += `<rect x="${h[0] - 4}" y="${h[1] - 10}" width="8" height="20" fill="#3a3f40"/>`;
    } else {
      // door hanging open toward viewer
      const hinge1 = rw(a, .28), hinge2 = rw(a, .92);
      s += `<polygon points="${poly([hinge1, [hinge1[0] - 120, hinge1[1] + 18], [hinge2[0] - 120, hinge2[1] + 6], hinge2])}" fill="#7d898d" ${O(4)}/>`;
      s += `<path d="M${hinge1[0] - 90} ${hinge1[1] + 60} l-10 26 l18 10" ${L(2.5)}/>`; // dent
    }
  }
  // dent lines on lockers
  s += `<path d="M1010 760 q14 18 -4 40" ${L(3, INK, .6)}/>`;

  // drip + bucket
  s += `<path d="M300 380 q-6 14 0 22 q6 -8 0 -22Z" fill="#9fb4b8" opacity=".9"/><line x1="300" y1="430" x2="300" y2="1380" stroke="#9fb4b8" stroke-width="2" stroke-dasharray="4 70" opacity=".7"/>`;
  s += `<path d="M252 1400 L348 1400 L338 1500 L262 1500Z" fill="#8a9396" ${O(4)}/><ellipse cx="300" cy="1400" rx="48" ry="12" fill="#3e4648" ${O(4)}/><ellipse cx="300" cy="1402" rx="36" ry="7" fill="#9fb4b8" opacity=".8"/>`;
  s += `<path d="M256 1400 Q300 1340 344 1400" ${L(3)}/>`;

  // Yusuf's supplies on the floor in the light
  const can = (x, y, w, h, label) => `<g><rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="#b9bdbd" ${O(4)}/>
      <rect x="${x - w / 2}" y="${y - h * .65}" width="${w}" height="${h * .35}" fill="${label}"/>
      <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="none" ${O(4)}/>
      <ellipse cx="${x}" cy="${y - h}" rx="${w / 2}" ry="${w * .16}" fill="#d6d9d8" ${O(4)}/>
      <ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${w * .16}" fill="none" ${O(4)}/>
      <path d="M${x - w / 2 + 6} ${y - h} Q${x} ${y - h - w * .7} ${x + w / 2 - 6} ${y - h}" ${L(3)}/></g>`;
  s += `<ellipse cx="560" cy="1712" rx="240" ry="34" fill="#000" opacity=".25" filter="url(#soft)"/>`;
  s += can(470, 1700, 110, 130, ORANGE) + can(590, 1716, 96, 110, '#e6e1d4');
  // cable coil
  s += `<g ${L(7, '#1f1f1f')}><ellipse cx="700" cy="1690" rx="60" ry="24"/><ellipse cx="700" cy="1684" rx="48" ry="18"/><ellipse cx="700" cy="1678" rx="36" ry="13"/></g>`;
  // plastic bag
  s += `<path d="M330 1720 q-20 -90 30 -120 q10 -30 22 0 q18 -24 26 2 q40 30 20 118 Z" fill="#ece8dd" ${O(4)}/><path d="M350 1640 q30 30 60 0" ${L(2, INK, .4)}/>`;
  // brushes
  s += `<g transform="rotate(-18 760 1740)"><rect x="740" y="1700" width="16" height="70" rx="4" fill="#8a6a4a" ${O(3)}/><rect x="732" y="1680" width="32" height="26" fill="#d0c9b6" ${O(3)}/></g>`;

  // darkness overlay (no electricity) + vignette
  s += `<rect width="1080" height="1920" fill="#0e1214" opacity=".28"/>`;
  s += `<polygon points="${poly([[760, 500], [890, 500], [700, 1700], [380, 1640]])}" fill="url(#shaft)" opacity=".6"/>`;
  s += `<rect width="1080" height="1920" fill="url(#vig)"/>`;
  return s;
}

/* ============================== 2. STADYUM ============================== */
function stadium() {
  let s = defs();
  const r = rng(5);
  s += `<rect width="1080" height="1100" fill="url(#skyG)"/>`;
  // smoke + chimneys behind
  const chim = [{ x: 80, w: 56, top: 300 }, { x: 290, w: 40, top: 420 }, { x: 760, w: 64, top: 250 }];
  for (const c of chim) {
    let sm = ''; for (let i = 0; i < 8; i++) sm += `<circle cx="${c.x + c.w / 2 + i * 40 + r() * 16}" cy="${c.top - 30 - i * 26}" r="${30 + i * 11}"/>`;
    s += `<g fill="#b7b6ae" opacity=".9" ${O(3)}>${sm}</g><g fill="#b7b6ae">${sm}</g>`;
  }
  for (const c of chim) {
    s += `<rect x="${c.x}" y="${c.top}" width="${c.w}" height="${700 - c.top}" fill="#6e7473" ${O(4)}/>`;
    s += `<rect x="${c.x}" y="${c.top + 34}" width="${c.w}" height="22" fill="#8f6a58" ${O(3)}/><rect x="${c.x - 5}" y="${c.top - 12}" width="${c.w + 10}" height="14" fill="#555b5a" ${O(3)}/>`;
  }
  // distant factory roofline
  let saw = 'M0 760 L0 640'; for (let x = 0; x < 1080; x += 110) saw += ` L${x + 80} 580 L${x + 80} 640 L${x + 110} 640`; saw += ' L1080 760Z';
  s += `<path d="${saw}" fill="#8b918f" ${O(4)}/>`;

  // floodlight tower (right)
  const cx = 940, b = 1000, t = 330;
  let d = `M${cx - 40} ${b} L${cx - 12} ${t} M${cx + 40} ${b} L${cx + 12} ${t}`;
  for (let y = t, k = 0; y < b; y += 56, k++) { const w1 = 12 + (y - t) / (b - t) * 28, y2 = y + 56, w2 = 12 + (y2 - t) / (b - t) * 28; d += k % 2 ? ` M${cx - w1} ${y} L${cx + w2} ${y2}` : ` M${cx + w1} ${y} L${cx - w2} ${y2}`; }
  s += `<path d="${d}" stroke="#4a4f4f" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="${cx - 80}" y="${t - 80}" width="160" height="84" rx="5" fill="#4a4f4f" ${O(4)}/>`;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) s += `<circle cx="${cx - 54 + i * 36}" cy="${t - 56 + j * 36}" r="13" fill="#c9c8c0" opacity=".6" ${O(2)}/>`;

  // tribune: stepped concrete
  s += `<polygon points="${poly([[0, 700], [1080, 700], [1080, 1000], [0, 1000]])}" fill="#9a9a94" ${O(4)}/>`;
  // roof over center
  s += `<polygon points="${poly([[180, 640], [900, 640], [940, 690], [140, 690]])}" fill="#6d7272" ${O(4)}/>`;
  for (const x of [200, 380, 560, 740, 880]) s += `<line x1="${x}" y1="690" x2="${x}" y2="760" ${L(6, '#7a4e36')}/>`;
  // seat rows
  for (let row = 0; row < 6; row++) {
    const y = 720 + row * 40;
    s += `<line x1="0" y1="${y + 28}" x2="1080" y2="${y + 28}" ${L(3, INK, .55)}/>`;
    for (let x = 14; x < 1080; x += 34) {
      if (r() < 0.16) continue; // missing seat
      const broken = r() < 0.1;
      const col = r() < 0.45 ? '#c9875e' : '#b9b8b1';
      s += broken ? `<path d="M${x} ${y + 26} l12 -10 l8 10Z" fill="${col}" ${O(2)}/>` : `<rect x="${x}" y="${y + 8}" width="22" height="18" rx="3" fill="${col}" ${O(2)}/>`;
    }
  }
  // fascia + faded letters with missing ones
  s += `<rect x="0" y="960" width="1080" height="44" fill="#d6d3c8" ${O(4)}/>`;
  const txt = 'KARAOCAK DEM RSPOR';
  s += `<text x="540" y="994" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="10" fill="${ORANGE}" opacity=".6">${txt}</text>`;

  // pitch
  s += `<polygon points="${poly([[0, 1004], [1080, 1004], [1080, 1920], [0, 1920]])}" fill="url(#grassG)"/>`;
  for (let i = 0; i < 26; i++) { // dirt patches
    const x = r() * 1080, y = 1030 + r() * 880, w = 40 + r() * 160 * (y / 1400), h = w * .28;
    s += `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="#9b8564" opacity=".75"/>`;
  }
  for (let i = 0; i < 140; i++) { const x = r() * 1080, y = 1010 + r() * 900, h = 6 + (y - 1000) / 60; s += `<path d="M${x} ${y} l${-2} ${-h} M${x + 3} ${y} l2 ${-h * .8}" ${L(1.6, '#5e6040', .6)}/>`; }
  // faded lines: penalty box in perspective (left side)
  s += `<g ${L(5, '#e8e5d8', .55)}><path d="M-20 1060 L560 1060"/><path d="M560 1060 L700 1300"/><path d="M700 1300 L-20 1300"/><path d="M60 1060 Q300 1190 520 1060" stroke-dasharray="20 18"/></g>`;
  // goal with net (left)
  s += `<polygon points="${poly([[140, 890], [470, 890], [430, 840], [180, 840]])}" fill="url(#netP)" ${L(2, '#e8e6df', .6)}/>`;
  s += `<polygon points="${poly([[180, 840], [140, 890], [140, 1050], [180, 1000]])}" fill="url(#netP)"/>`;
  s += `<polygon points="${poly([[430, 840], [470, 890], [470, 1050], [430, 1000]])}" fill="url(#netP)"/>`;
  s += `<rect x="180" y="840" width="250" height="160" fill="url(#netP)" opacity=".7"/>`;
  s += `<path d="M140 1050 L140 890 L470 890 L470 1050" stroke="#f1efe8" stroke-width="12" fill="none" stroke-linejoin="round"/><path d="M140 1050 L140 890 L470 890 L470 1050" ${L(2.5)}/>`;

  // rusty dugout (foreground right)
  s += `<ellipse cx="820" cy="1795" rx="270" ry="30" fill="#000" opacity=".3" filter="url(#soft)"/>`;
  s += `<path d="M560 1790 L560 1380 Q820 1250 1080 1330 L1080 1790" fill="none" stroke="#7a4b33" stroke-width="16" stroke-linejoin="round"/>`;
  s += `<path d="M560 1790 L560 1380 Q820 1250 1080 1330 L1080 1790" ${L(3)}/>`;
  s += `<path d="M560 1380 Q820 1250 1080 1330 L1080 1600 Q820 1540 560 1610Z" fill="#c9d6d6" opacity=".35" ${L(3)}/>`; // plexi shell
  s += `<path d="M700 1340 l40 60 l-20 40 M900 1310 l-30 70" ${L(2.5, INK, .7)}/>`; // cracks
  s += `<path d="M600 1400 q40 -30 60 10 M980 1360 q30 -10 50 20" ${L(6, '#8a5a3c', .55)}/>`; // rust streaks
  // seats in dugout
  for (let i = 0; i < 6; i++) {
    const x = 600 + i * 78; const col = i === 3 ? '#b9b8b1' : '#c9875e';
    s += `<path d="M${x} 1700 h60 v-70 q-30 -14 -60 0Z" fill="${col}" ${O(3)}/><rect x="${x - 4}" y="1700" width="68" height="16" fill="${col}" ${O(3)}/>`;
    s += `<line x1="${x + 30}" y1="1716" x2="${x + 30}" y2="1790" ${L(6, '#4b4f4f')}/>`;
  }
  s += `<rect x="550" y="1785" width="540" height="14" fill="#5b4535" ${O(3)}/>`;
  s += `<rect width="1080" height="1920" fill="url(#vig)" opacity=".7"/>`;
  return s;
}

/* ============================== 3. YUSUF'UN EVİ ============================== */
function home() {
  let s = defs();
  // walls & floor
  s += `<rect width="1080" height="1260" fill="#7f877d"/>`;
  s += `<rect y="1260" width="1080" height="660" fill="#6b5240"/>`;
  for (let y = 1290; y < 1920; y += 52) s += `<line x1="0" y1="${y}" x2="1080" y2="${y}" ${L(2, '#3d2c20', .4)}/>`;
  s += `<rect x="0" y="1236" width="1080" height="26" fill="#5f4a3a" ${O(3)}/>`; // skirting
  // wallpaper faint pattern
  for (let x = 40; x < 1080; x += 90) for (let y = 60; y < 1220; y += 110) s += `<path d="M${x} ${y} q10 -14 20 0 q-10 14 -20 0Z" fill="#6e766c" opacity=".55"/>`;
  // damp stain
  s += `<path d="M880 40 q60 40 40 120 q-30 60 -90 30 q-50 -40 -20 -100 q30 -40 70 -50Z" fill="#6c7166" opacity=".6"/>`;

  // window with grey city
  s += `<rect x="80" y="300" width="400" height="520" fill="url(#skyG)" ${O(6)}/>`;
  const r = rng(3);
  for (let i = 0; i < 6; i++) { const x = 90 + i * 66, h = 120 + r() * 160; s += `<rect x="${x}" y="${820 - h}" width="58" height="${h}" fill="#7b8180" ${O(3)}/>`; for (let k = 0; k < 4; k++) s += `<rect x="${x + 10}" y="${830 - h + k * 34}" width="12" height="16" fill="#5d6362"/><rect x="${x + 34}" y="${830 - h + k * 34}" width="12" height="16" fill="#5d6362"/>`; }
  s += `<rect x="330" y="360" width="34" height="300" fill="#646a69" ${O(3)}/><rect x="330" y="400" width="34" height="18" fill="#8f6a58"/>`;
  s += `<g fill="#aeada5" ${O(2)}><circle cx="360" cy="340" r="24"/><circle cx="390" cy="318" r="30"/><circle cx="430" cy="300" r="36"/></g><g fill="#aeada5"><circle cx="360" cy="340" r="22"/><circle cx="390" cy="318" r="28"/><circle cx="430" cy="300" r="34"/></g>`;
  s += `<line x1="280" y1="300" x2="280" y2="820" ${L(7)}/><line x1="80" y1="560" x2="480" y2="560" ${L(6)}/>`;
  s += `<rect x="60" y="820" width="440" height="26" fill="#cfc8b8" ${O(4)}/>`; // sill
  // curtains
  s += `<path d="M50 270 L180 270 Q150 560 200 860 L50 860Z" fill="#8d6e5a" ${O(4)}/><path d="M380 270 L510 270 L510 860 L400 860 Q440 560 380 270Z" fill="#8d6e5a" ${O(4)}/>`;
  s += `<path d="M90 300 q20 260 0 540 M140 300 q10 280 20 540 M470 300 q-20 260 0 540" ${L(2.5, INK, .45)}/>`;
  s += `<rect x="30" y="252" width="500" height="20" rx="8" fill="#4b3a2c" ${O(3)}/>`;

  // framed goal photo
  s += `<rect x="640" y="360" width="290" height="230" fill="#7a5a3c" ${O(5)}/><rect x="662" y="382" width="246" height="186" fill="#cfc8b4"/>`;
  s += `<g transform="translate(785 560)">
      <rect x="-123" y="-80" width="246" height="80" fill="#8d8c63"/>
      <path d="M-18 -150 L18 -150 L24 -70 L-24 -70Z" fill="${ORANGE}" ${O(3)}/><rect x="-24" y="-118" width="48" height="12" fill="${INK}"/>
      <path d="M-18 -146 L-56 -196 M18 -146 L56 -196" stroke="${ORANGE}" stroke-width="16" stroke-linecap="round"/><path d="M-18 -146 L-56 -196 M18 -146 L56 -196" ${L(3)}/>
      <circle cx="0" cy="-168" r="16" fill="#d6a586" ${O(3)}/><path d="M-16 -172 q16 -18 32 0" fill="#3b3430"/>
      <path d="M-20 -70 L-28 -6 M20 -70 L30 -6" stroke="#f1efe8" stroke-width="12" stroke-linecap="round"/>
      <circle cx="-90" cy="-30" r="12" fill="#f1efe8" ${O(2)}/></g>`;
  s += `<rect x="662" y="382" width="246" height="186" fill="#f3e3c0" opacity=".18"/>`;
  s += `<path d="M640 360 l290 230" ${L(2, '#ffffff', .25)}/>`;
  // shelf with dusty trophy
  s += `<rect x="640" y="660" width="290" height="16" fill="#6b5038" ${O(3)}/>`;
  s += `<path d="M720 660 v-14 h40 v14 M732 646 v-30 h16 v30 M716 616 q24 -60 48 0 q-24 16 -48 0Z" fill="#b79a54" ${O(3)}/>`;
  s += `<rect x="820" y="600" width="70" height="60" fill="#9a8d7a" ${O(3)}/><rect x="828" y="608" width="54" height="10" fill="#7a6d5a"/>`;

  // floor lamp (left), dim
  s += `<circle cx="150" cy="980" r="230" fill="url(#lampglow)"/>`;
  s += `<line x1="150" y1="1000" x2="150" y2="1520" ${L(7)}/><ellipse cx="150" cy="1520" rx="50" ry="12" fill="#3a3330" ${O(3)}/>`;
  s += `<path d="M90 1000 L210 1000 L180 920 L120 920Z" fill="#e9d9b2" ${O(4)}/>`;

  // sofa
  s += `<ellipse cx="560" cy="1560" rx="430" ry="40" fill="#000" opacity=".3" filter="url(#soft)"/>`;
  s += `<path d="M210 1170 Q220 1110 300 1110 L820 1110 Q900 1110 910 1170 L910 1420 L210 1420Z" fill="#7a5b44" ${O(5)}/>`; // back
  s += `<path d="M270 1180 q10 -40 60 -40 h180 q40 0 46 40 v120 h-286Z" fill="#8a6a50" ${O(4)}/><path d="M574 1180 q10 -40 60 -40 h180 q40 0 46 40 v120 h-286Z" fill="#86664c" ${O(4)}/>`; // cushions
  s += `<path d="M620 1150 q60 40 160 10" ${L(2.5, INK, .5)}/>`; // sag
  s += `<path d="M150 1260 q0 -50 60 -50 h40 q40 0 40 50 v270 h-140Z" fill="#6f523d" ${O(5)}/><path d="M830 1260 q0 -50 40 -50 h40 q60 0 60 50 v270 h-140Z" fill="#6f523d" ${O(5)}/>`; // arms
  s += `<rect x="250" y="1300" width="620" height="120" rx="14" fill="#8f6e53" ${O(5)}/>`; // seat
  s += `<rect x="230" y="1420" width="660" height="110" fill="#6a4e3a" ${O(5)}/>`;
  s += `<path d="M300 1150 q80 -10 140 40 q-20 80 -110 140 q-40 -60 -30 -180Z" fill="#a39079" opacity=".9" ${O(3)}/><path d="M318 1200 q50 0 90 30" ${L(2, INK, .4)}/>`; // throw blanket
  // knee brace on armrest
  s += `<g transform="rotate(-8 900 1220)"><rect x="852" y="1188" width="96" height="58" rx="18" fill="#2f3438" ${O(4)}/><circle cx="900" cy="1217" r="16" fill="#1e2124" ${O(3)}/><rect x="858" y="1196" width="84" height="8" fill="#555c61"/><rect x="858" y="1230" width="84" height="8" fill="#555c61"/></g>`;
  // TV glow from viewer side
  s += `<rect x="150" y="1080" width="820" height="480" fill="url(#tvglow)"/>`;

  // coffee table
  s += `<polygon points="${poly([[250, 1610], [830, 1610], [880, 1680], [200, 1680]])}" fill="#7a5a3c" ${O(5)}/><rect x="200" y="1680" width="680" height="26" fill="#5f4530" ${O(4)}/>`;
  s += `<line x1="230" y1="1706" x2="230" y2="1880" ${L(10, '#4b3a2a')}/><line x1="850" y1="1706" x2="850" y2="1880" ${L(10, '#4b3a2a')}/>`;
  // unopened bills
  const env = (x, y, rot, red) => `<g transform="rotate(${rot} ${x} ${y})"><rect x="${x - 60}" y="${y - 34}" width="120" height="68" fill="#efe9dc" ${O(3)}/><path d="M${x - 60} ${y - 34} L${x} ${y + 4} L${x + 60} ${y - 34}" ${L(2.5)}/>${red ? `<rect x="${x + 10}" y="${y + 10}" width="42" height="16" fill="none" stroke="#b8452b" stroke-width="3"/>` : ''}</g>`;
  s += env(360, 1640, -8, true) + env(420, 1630, 6, false) + env(380, 1652, 14, true);
  // tea glass
  s += `<path d="M560 1650 l-8 -50 h40 l-8 50Z" fill="#b5642f" opacity=".85" ${O(3)}/><ellipse cx="572" cy="1656" rx="30" ry="8" fill="#d7d2c4" ${O(3)}/>`;
  // phone with "Kero" call
  s += `<g transform="rotate(-10 700 1640)"><rect x="660" y="1598" width="84" height="150" rx="12" fill="#1c1f22" ${O(3)}/><rect x="668" y="1610" width="68" height="124" rx="6" fill="#cfe2ea"/>
       <text x="702" y="1650" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" fill="#1c1f22">Kero</text>
       <circle cx="684" cy="1706" r="10" fill="#4caf6a"/><circle cx="720" cy="1706" r="10" fill="#d0503c"/></g>`;
  s += `<circle cx="700" cy="1650" r="120" fill="#cfe2ea" opacity=".12" filter="url(#soft2)"/>`;
  // rug
  s += `<ellipse cx="540" cy="1840" rx="480" ry="70" fill="#8a4f3c" opacity=".55"/><ellipse cx="540" cy="1840" rx="420" ry="50" fill="none" stroke="#c9875e" stroke-width="4" opacity=".5"/>`;
  s += `<rect width="1080" height="1920" fill="#0e1214" opacity=".18"/><rect width="1080" height="1920" fill="url(#vig)"/>`;
  return s;
}

const SCENES = [['soyunma', 'Soyunma Odası', locker], ['stadyum', 'Stadyum', stadium], ['ev', 'Yusuf\'un Evi', home]];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
  const files = [];
  for (const [key, , fn] of SCENES) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="540" height="960">${fn()}</svg>`;
    await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
    await page.waitForTimeout(250);
    const f = path.join(OUT, `mekan-${key}.png`);
    await page.screenshot({ path: f });
    files.push([key, f]);
  }
  const cmp = await browser.newPage({ viewport: { width: 1200, height: 735 }, deviceScaleFactor: 2 });
  const cards = files.map(([k, f], i) => `<figure><img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}"><figcaption>${SCENES[i][1]}</figcaption></figure>`).join('');
  await cmp.setContent(`<html><body style="margin:0;background:#1a1816;font-family:Inter;color:#efe8dc;display:flex;gap:28px;justify-content:center;padding:28px 24px">
    <style>figure{margin:0;width:360px}img{width:360px;height:640px;border-radius:14px;display:block}figcaption{margin-top:14px;font-weight:700;font-size:20px;text-align:center}</style>${cards}</body></html>`);
  await cmp.waitForTimeout(250);
  await cmp.screenshot({ path: path.join(OUT, 'mekan-karsilastirma.png') });
  await browser.close();
  console.log('ok');
})();
