// Mekân çizimleri 2: Kerem'in odası, koridor, Emir top oynarken — A+C stili
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
// thick "limb" with ink outline: draw ink stroke under colored stroke
const limb = (d, w, col) => `<path d="${d}" stroke="${INK}" stroke-width="${w + 8}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

function defs() {
  return `<defs>
    <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
    <radialGradient id="warm" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd590" stop-opacity=".7"/><stop offset="1" stop-color="#ffd590" stop-opacity="0"/></radialGradient>
    <linearGradient id="warmWedge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".75"/><stop offset="1" stop-color="#ffcf7a" stop-opacity=".05"/></linearGradient>
    <linearGradient id="skyGrey" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e9493"/><stop offset="1" stop-color="#c9c8c0"/></linearGradient>
    <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c6a7a"/><stop offset=".55" stop-color="#d79a72"/><stop offset="1" stop-color="#f1c48a"/></linearGradient>
    <linearGradient id="dirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9946a"/><stop offset="1" stop-color="#94704d"/></linearGradient>
    <linearGradient id="officeWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe3c9"/><stop offset="1" stop-color="#ddcba6"/></linearGradient>
    <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8d9497"/><stop offset=".45" stop-color="#eef1f2"/><stop offset="1" stop-color="#7b8285"/></linearGradient>
    <linearGradient id="walnut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e4a30"/><stop offset="1" stop-color="#4a2f1e"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="soft2"><feGaussianBlur stdDeviation="16"/></filter>
  </defs>`;
}

/* ============================== 1. KEREM'İN ODASI ============================== */
function office() {
  let s = defs();
  s += `<rect width="1080" height="1920" fill="url(#officeWall)"/>`;
  // wainscot
  s += `<rect x="0" y="1060" width="1080" height="260" fill="#6e4a30" ${O(4)}/>`;
  for (let x = 30; x < 1080; x += 150) s += `<rect x="${x}" y="1090" width="120" height="200" rx="4" fill="none" stroke="#4a2f1e" stroke-width="4"/>`;
  s += `<rect x="0" y="1050" width="1080" height="18" fill="#8a603f" ${O(3)}/>`;
  // floor parquet
  s += `<rect y="1320" width="1080" height="600" fill="#9a6b45"/>`;
  for (let y = 1340; y < 1920; y += 44) for (let x = (y / 44 % 2) * 60; x < 1080; x += 120) s += `<rect x="${x}" y="${y}" width="120" height="44" fill="none" stroke="#7a5233" stroke-width="2"/>`;
  s += `<ellipse cx="540" cy="1760" rx="520" ry="120" fill="#7a2f22" opacity=".55"/><ellipse cx="540" cy="1760" rx="470" ry="96" fill="none" stroke="#d1a35d" stroke-width="5" opacity=".6"/>`;

  // big window overlooking the pitch
  s += `<clipPath id="win"><rect x="150" y="270" width="780" height="620"/></clipPath>`;
  s += `<rect x="150" y="270" width="780" height="620" fill="url(#skyGrey)" ${O(8)}/><g clip-path="url(#win)">`;
  const r = rng(9);
  // view: chimneys + tribune corner + dead pitch from above
  for (const c of [{ x: 230, w: 34, top: 330 }, { x: 760, w: 40, top: 300 }]) {
    s += `<g fill="#b7b6ae" ${O(2)}><circle cx="${c.x + 30}" cy="${c.top - 20}" r="24"/><circle cx="${c.x + 60}" cy="${c.top - 40}" r="30"/></g>`;
    s += `<rect x="${c.x}" y="${c.top}" width="${c.w}" height="${520 - c.top}" fill="#6e7473" ${O(3)}/>`;
  }
  s += `<polygon points="${poly([[150, 520], [930, 520], [930, 600], [150, 600]])}" fill="#9a9a94" ${O(3)}/>`;
  for (let x = 160; x < 930; x += 26) if (r() > .2) s += `<rect x="${x}" y="${535 + (x % 2) * 0}" width="16" height="12" fill="${r() < .45 ? '#c9875e' : '#b9b8b1'}"/>`;
  for (let x = 160; x < 930; x += 26) if (r() > .2) s += `<rect x="${x}" y="565" width="16" height="12" fill="${r() < .45 ? '#c9875e' : '#b9b8b1'}"/>`;
  s += `<polygon points="${poly([[150, 600], [930, 600], [930, 890], [150, 890]])}" fill="#8b8a61"/>`;
  for (let i = 0; i < 14; i++) s += `<ellipse cx="${160 + r() * 760}" cy="${620 + r() * 260}" rx="${30 + r() * 60}" ry="${10 + r() * 16}" fill="#9b8564" opacity=".8"/>`;
  s += `<path d="M150 760 L930 700 M540 600 Q600 760 540 890" ${L(4, '#e8e5d8', .5)}/></g>`;
  // window frame + blinds
  s += `<line x1="540" y1="270" x2="540" y2="890" ${L(10, '#4a2f1e')}/><line x1="150" y1="580" x2="930" y2="580" ${L(8, '#4a2f1e')}/>`;
  s += `<rect x="150" y="270" width="780" height="620" fill="none" stroke="#4a2f1e" stroke-width="16"/><rect x="150" y="270" width="780" height="620" fill="none" ${O(4)}/>`;
  s += `<rect x="150" y="270" width="780" height="110" fill="#e3d6b8" ${O(3)}/>`;
  for (let y = 286; y < 380; y += 16) s += `<line x1="150" y1="${y}" x2="930" y2="${y}" ${L(2, '#b9a982')}/>`;
  s += `<rect x="130" y="890" width="820" height="24" fill="#d8c9a6" ${O(3)}/>`;

  // framed scarf + photo on wall
  s += `<rect x="40" y="420" width="80" height="400" fill="#4a2f1e" ${O(4)}/><rect x="52" y="432" width="56" height="376" fill="#efe3c9"/>`;
  for (let i = 0; i < 8; i++) s += `<rect x="58" y="${440 + i * 46}" width="44" height="23" fill="${i % 2 ? INK : ORANGE}"/>`;
  s += `<rect x="960" y="430" width="90" height="120" fill="#b79a54" ${O(4)}/><rect x="970" y="442" width="70" height="96" fill="#c9bfa8"/><circle cx="1005" cy="478" r="14" fill="#9a8a70"/><rect x="988" y="496" width="34" height="34" fill="#4a4f55"/>`;

  // espresso cabinet (right) — shiny machine + two cups
  s += `<rect x="760" y="980" width="320" height="340" fill="url(#walnut)" ${O(5)}/>`;
  s += `<rect x="790" y="800" width="190" height="180" rx="12" fill="url(#chrome)" ${O(5)}/><rect x="810" y="830" width="150" height="40" rx="6" fill="#2b2f33"/><circle cx="830" cy="850" r="6" fill="#ff9a3c"/>`;
  s += `<rect x="845" y="900" width="80" height="22" rx="6" fill="#3a3f43" ${O(3)}/><path d="M870 922 v20 M900 922 v20" ${L(4, '#3a3f43')}/>`;
  s += `<rect x="1000" y="900" width="60" height="80" rx="6" fill="#c9bfa8" ${O(3)}/><path d="M1012 900 v-14 h36 v14" ${L(3)}/>`; // sugar jar
  const cup = (x, y) => `<path d="M${x - 24} ${y - 34} h48 v24 q0 14 -24 14 q-24 0 -24 -14Z" fill="#fbf7ee" ${O(3)}/><path d="M${x + 24} ${y - 28} q14 2 10 14 q-4 6 -10 4" ${L(3)}/><ellipse cx="${x}" cy="${y + 2}" rx="34" ry="8" fill="#fbf7ee" ${O(3)}/><path d="M${x - 8} ${y - 48} q-8 -16 4 -28 M${x + 8} ${y - 48} q-8 -16 4 -28" ${L(3, '#ffffff', .8)}/>`;
  s += cup(830, 975) + cup(950, 975);
  s += `<circle cx="885" cy="900" r="160" fill="url(#warm)" opacity=".5"/>`;

  // guest chairs (left), a dark coat draped on one
  const chair = (x) => `<path d="M${x} 1500 v-260 q0 -40 40 -40 h140 q40 0 40 40 v260Z" fill="#5a2e22" ${O(5)}/><rect x="${x - 20}" y="1460" width="260" height="80" rx="18" fill="#6b3a2b" ${O(5)}/><line x1="${x}" y1="1540" x2="${x}" y2="1620" ${L(10, '#3a2a20')}/><line x1="${x + 220}" y1="1540" x2="${x + 220}" y2="1620" ${L(10, '#3a2a20')}/>`;
  s += chair(40);
  s += `<path d="M60 1230 q60 -40 150 -10 l30 280 q-80 20 -170 0Z" fill="#26292d" ${O(4)}/><path d="M120 1240 l20 260" ${L(2.5, '#4a4f55')}/>`; // coat

  // big walnut desk (foreground)
  s += `<ellipse cx="620" cy="1800" rx="440" ry="40" fill="#000" opacity=".35" filter="url(#soft)"/>`;
  s += `<polygon points="${poly([[300, 1380], [1080, 1380], [1080, 1470], [240, 1470]])}" fill="#7a5236" ${O(5)}/>`;
  s += `<rect x="240" y="1470" width="840" height="320" fill="url(#walnut)" ${O(5)}/>`;
  for (let x = 300; x < 1080; x += 260) s += `<rect x="${x}" y="1510" width="210" height="240" rx="6" fill="none" stroke="#3a2416" stroke-width="5"/>`;
  // on desk: brass lamp, blotter, papers, pen, phone face-down
  s += `<circle cx="1000" cy="1290" r="190" fill="url(#warm)"/>`;
  s += `<path d="M1000 1395 v-120 l-40 -40" ${L(8, '#b58a3a')}/><path d="M920 1220 l90 -40 l20 60 l-90 40Z" fill="#2f5a3d" ${O(4)}/><ellipse cx="1000" cy="1398" rx="46" ry="10" fill="#b58a3a" ${O(3)}/>`;
  s += `<polygon points="${poly([[520, 1395], [780, 1395], [800, 1450], [500, 1450]])}" fill="#2f2420" ${O(3)}/>`;
  s += `<polygon points="${poly([[560, 1400], [700, 1392], [716, 1440], [570, 1446]])}" fill="#f4efe2" ${O(2)}/><g ${L(2, '#8a8478')}><path d="M580 1410 h100 M582 1420 h90 M584 1430 h70"/></g>`;
  s += `<path d="M640 1436 q30 -4 60 -18" ${L(2.5, '#26292d')}/>`; // signature
  s += `<g transform="rotate(-20 760 1420)"><rect x="720" y="1414" width="90" height="10" rx="4" fill="#1e1e1e" ${O(2)}/><rect x="800" y="1414" width="16" height="10" fill="#c9a24a"/></g>`; // fountain pen
  s += `<g transform="rotate(8 400 1420)"><rect x="350" y="1404" width="110" height="34" rx="8" fill="#1c1f22" ${O(3)}/><rect x="370" y="1410" width="20" height="10" rx="3" fill="#3a3f43"/></g>`; // phone face down
  s += `<path d="M880 1440 l-8 -40 h40 l-8 40Z" fill="#fbf7ee" ${O(2)}/>`; // small cup on desk

  s += `<rect width="1080" height="1920" fill="#ffcf7a" opacity=".06"/><rect width="1080" height="1920" fill="url(#vig)" opacity=".7"/>`;
  return s;
}

/* ============================== 2. KORİDOR ============================== */
function corridor() {
  let s = defs();
  const VP = [540, 860];
  // back opening (office door at end)
  const B = { x1: 400, x2: 680, y1: 620, y2: 1110 };
  s += `<polygon points="${poly([[0, 0], [1080, 0], [B.x2, B.y1], [B.x1, B.y1]])}" fill="#3f4240" ${O()}/>`; // ceiling
  s += `<polygon points="${poly([[0, 0], [B.x1, B.y1], [B.x1, B.y2], [0, 1920]])}" fill="#6a6f6a" ${O()}/>`; // left wall
  s += `<polygon points="${poly([[1080, 0], [B.x2, B.y1], [B.x2, B.y2], [1080, 1920]])}" fill="#626762" ${O()}/>`; // right wall
  s += `<polygon points="${poly([[0, 1920], [B.x1, B.y2], [B.x2, B.y2], [1080, 1920]])}" fill="#5c574d" ${O()}/>`; // floor
  // lower green paint band on walls
  const wallY = (t, f, side) => { // t: 0 front -> 1 back ; f: fraction from top
    const x = side === 'L' ? B.x1 * t : 1080 - (1080 - B.x2) * t;
    const yt = B.y1 * t, yb = 1920 - (1920 - B.y2) * t; return [x, yt + f * (yb - yt)];
  };
  for (const side of ['L', 'R']) {
    const a = wallY(0, .58, side), b = wallY(1, .58, side), c = wallY(1, 1, side), d = wallY(0, 1, side);
    s += `<polygon points="${poly([a, b, c, d])}" fill="#4f6a66" opacity=".55"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" ${L(3)}/>`;
  }
  // floor linoleum seams converging
  for (let x = B.x1; x <= B.x2; x += 56) { const t = (1920 - VP[1]) / (B.y2 - VP[1]); s += `<line x1="${x}" y1="${B.y2}" x2="${VP[0] + (x - VP[0]) * t}" y2="1920" ${L(2, INK, .3)}/>`; }
  s += `<path d="M300 1700 l60 -40 l30 30 l50 -20" ${L(3, INK, .5)}/>`; // crack

  // doors along walls
  const door = (side, t0, t1, label, col) => {
    const p = [wallY(t0, .3, side), wallY(t1, .3, side), wallY(t1, 1, side), wallY(t0, 1, side)];
    let d = `<polygon points="${poly(p)}" fill="${col}" ${O(4)}/>`;
    const k = wallY((t0 + t1) / 2, .55, side);
    d += `<circle cx="${k[0] + (side === 'L' ? 18 : -18)}" cy="${k[1]}" r="7" fill="#b58a3a" ${O(2)}/>`;
    const lp = wallY((t0 + t1) / 2, .37, side);
    d += `<text x="${lp[0]}" y="${lp[1]}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="${22 * (1 - t0 * .6)}" fill="#e9e3d0" opacity=".75" transform="skewY(${side === 'L' ? 18 : -18})" >${label}</text>`;
    return d;
  };
  s += door('L', 0.18, 0.42, '', '#6b5038');
  s += door('R', 0.28, 0.5, '', '#6b5038');
  // door signs (flat, readable)
  s += `<g transform="translate(150 920) skewY(32)"><rect x="-70" y="-26" width="140" height="44" fill="#d9d4c4" ${O(3)}/><text x="0" y="6" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" fill="${INK}">SOYUNMA</text></g>`;
  s += `<g transform="translate(860 960) skewY(-32)"><rect x="-70" y="-26" width="140" height="44" fill="#d9d4c4" ${O(3)}/><text x="0" y="6" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" fill="${INK}">MALZEME</text></g>`;
  // crooked old team photos
  const photo = (side, t, rot) => { const [x, y] = wallY(t, .2, side); const sc = 1 - t * .6; return `<g transform="translate(${x + (side === 'L' ? 30 : -30) * sc} ${y}) rotate(${rot}) scale(${sc})"><rect x="-60" y="-44" width="120" height="88" fill="#4a3a2a" ${O(3)}/><rect x="-50" y="-34" width="100" height="68" fill="#b9b2a0"/>${[...Array(6)].map((_, i) => `<circle cx="${-38 + i * 15}" cy="-6" r="6" fill="#6d665a"/>`).join('')}${[...Array(6)].map((_, i) => `<circle cx="${-38 + i * 15}" cy="14" r="6" fill="#6d665a"/>`).join('')}</g>`; };
  s += photo('L', 0.08, -6) + photo('L', 0.58, 4) + photo('R', 0.12, 5) + photo('R', 0.66, -3);
  // peeling patches
  const r = rng(4);
  for (let i = 0; i < 14; i++) { const side = i % 2 ? 'L' : 'R'; const [x, y] = wallY(r() * .9, .1 + r() * .45, side); const w = 20 + r() * 50; s += `<path d="M${x} ${y} q${w * .4} ${-w * .3} ${w * .8} 0 q${-w * .1} ${w * .5} ${-w * .5} ${w * .4}Z" fill="#8f938c" opacity=".75" ${L(1.5, INK, .35)}/>`; }
  // water stain on ceiling + drip + bucket
  s += `<ellipse cx="560" cy="300" rx="90" ry="34" fill="#55594f" opacity=".6"/><path d="M560 330 q-6 14 0 22 q6 -8 0 -22Z" fill="#9fb4b8"/>`;
  s += `<path d="M512 1360 L608 1360 L598 1460 L522 1460Z" fill="#8a9396" ${O(4)}/><ellipse cx="560" cy="1360" rx="48" ry="12" fill="#3e4648" ${O(4)}/><ellipse cx="560" cy="1362" rx="36" ry="7" fill="#9fb4b8" opacity=".8"/>`;
  // dead fluorescent fixtures
  for (const [y, w] of [[90, 380], [300, 220], [470, 130]]) s += `<rect x="${540 - w / 2}" y="${y}" width="${w}" height="${w * .07}" rx="6" fill="#bdbab0" ${O(3)}/>`;
  s += `<rect x="${540 - 110}" y="300" width="220" height="15" rx="6" fill="#efe9c9" opacity=".9"/>`; // one flickering

  // END DOOR: new, warm light spilling — Kerem's office
  s += `<rect x="${B.x1}" y="${B.y1}" width="${B.x2 - B.x1}" height="${B.y2 - B.y1}" fill="#6c716c" ${O(4)}/>`;
  s += `<rect x="455" y="760" width="170" height="350" fill="#ffd590" ${O(4)}/>`; // lit doorway
  s += `<polygon points="${poly([[625, 760], [700, 740], [700, 1130], [625, 1110]])}" fill="#7a4a2a" ${O(4)}/>`; // new door swung open
  s += `<rect x="470" y="720" width="140" height="28" fill="#c9a24a" ${O(3)}/><text x="540" y="741" text-anchor="middle" font-family="Inter" font-weight="800" font-size="18" fill="${INK}">BAŞKAN</text>`;
  s += `<polygon points="${poly([[455, 1110], [625, 1110], [780, 1920], [260, 1920]])}" fill="url(#warmWedge)"/>`;
  s += `<circle cx="540" cy="930" r="200" fill="url(#warm)"/>`;
  s += `<rect width="1080" height="1920" fill="#0e1214" opacity=".2"/><rect width="1080" height="1920" fill="url(#vig)"/>`;
  s += `<polygon points="${poly([[455, 1110], [625, 1110], [780, 1920], [260, 1920]])}" fill="url(#warmWedge)" opacity=".5"/>`;
  return s;
}

/* ============================== 3. EMİR TOP OYNARKEN ============================== */
function emir() {
  let s = defs();
  const r = rng(21);
  s += `<rect width="1080" height="1300" fill="url(#dusk)"/>`;
  s += `<circle cx="820" cy="980" r="120" fill="#f8d79c" opacity=".9"/><circle cx="820" cy="980" r="260" fill="#f8d79c" opacity=".25" filter="url(#soft2)"/>`;
  // neighborhood skyline
  for (let i = 0; i < 12; i++) {
    const x = i * 92 - 10, h = 160 + r() * 220;
    s += `<rect x="${x}" y="${1060 - h}" width="96" height="${h}" fill="${i % 2 ? '#6b6470' : '#5f5966'}" ${O(3)}/>`;
    for (let k = 0; k < 5; k++) for (let j = 0; j < 2; j++) if (r() > .45) s += `<rect x="${x + 18 + j * 40}" y="${1080 - h + k * 40}" width="18" height="20" fill="${r() > .5 ? '#f2c77c' : '#4d4855'}"/>`;
  }
  s += `<rect x="300" y="620" width="30" height="300" fill="#56515e" ${O(3)}/><g fill="#9c8f94" opacity=".8"><circle cx="330" cy="600" r="24"/><circle cx="360" cy="576" r="30"/></g>`; // far chimney
  // mahalle wall with kids sitting on top
  s += `<rect x="0" y="1060" width="1080" height="160" fill="#a7967f" ${O(4)}/>`;
  for (let y = 1080; y < 1220; y += 30) for (let x = (y / 30 % 2) * 30; x < 1080; x += 60) s += `<rect x="${x}" y="${y}" width="60" height="30" fill="none" stroke="#8b7a64" stroke-width="2"/>`;
  s += `<text x="230" y="1170" font-family="Inter" font-weight="800" font-size="54" fill="${ORANGE}" opacity=".7" transform="rotate(-4 230 1170)">OCAK</text>`;
  const kid = (x, col, cap) => `<g transform="translate(${x} 1060)"><path d="M-22 0 v-56 q22 -18 44 0 v56Z" fill="${col}" ${O(3)}/><circle cx="0" cy="-74" r="18" fill="#c9946f" ${O(3)}/>${cap ? `<path d="M-18 -80 q18 -24 36 0 h10 v6 h-46Z" fill="${cap}" ${O(2)}/>` : `<path d="M-18 -80 q18 -22 36 0Z" fill="#2a2420"/>`}<path d="M-14 0 l-6 40 M14 0 l4 40" ${L(8, '#3b4250')}/></g>`;
  s += kid(120, '#5b6f8a', null) + kid(200, '#8a5b5b', null) + kid(560, '#4f6a66', ORANGE) + kid(640, '#8a7a5b', null);
  // little brother marker (orange cap) — subtle

  // dirt pitch
  s += `<rect y="1220" width="1080" height="700" fill="url(#dirt)"/>`;
  for (let i = 0; i < 40; i++) s += `<ellipse cx="${r() * 1080}" cy="${1240 + r() * 680}" rx="${10 + r() * 40}" ry="${3 + r() * 6}" fill="#7f5f40" opacity=".45"/>`;
  for (let i = 0; i < 30; i++) s += `<circle cx="${r() * 1080}" cy="${1240 + r() * 680}" r="${3 + r() * 5}" fill="#6e5038" opacity=".6"/>`; // pebbles
  // rusty net-less goal (right)
  s += `<path d="M760 1300 L760 1110 L1060 1110 L1060 1300" stroke="#8a5a3c" stroke-width="14" fill="none" stroke-linejoin="round"/><path d="M760 1300 L760 1110 L1060 1110 L1060 1300" ${L(3)}/>`;
  s += `<path d="M770 1130 q4 30 -2 60 M1050 1150 q-4 40 2 80" ${L(5, '#b5703f', .7)}/>`;
  // fallen defender (background left), in dust
  s += `<g transform="translate(230 1360)"><ellipse cx="0" cy="40" rx="120" ry="20" fill="#000" opacity=".2" filter="url(#soft)"/>
       ${limb('M-10 10 L-90 36', 34, '#3a3f4a')}${limb('M10 14 L70 40', 34, '#3a3f4a')}
       <path d="M-40 10 q-10 -80 40 -100 q50 10 40 100Z" fill="#7a3a3a" ${O(4)}/>${limb('M-30 -60 L-80 -10', 22, '#7a3a3a')}
       <circle cx="10" cy="-120" r="30" fill="#c08a66" ${O(4)}/><path d="M-18 -128 q28 -30 56 0Z" fill="#2a2420"/></g>`;
  s += `<g fill="#d9bf98" opacity=".6"><circle cx="160" cy="1400" r="40"/><circle cx="220" cy="1410" r="50"/><circle cx="300" cy="1400" r="34"/></g>`;

  // ===== EMİR dribbling (profile, facing right, left foot on ball) =====
  const SKIN = '#D1A07C', SKSH = '#B3815F', SHIRT = '#d9d6cc', SHIRTSH = '#b9b5a8', PANTS = '#2f3a52';
  let e = '';
  e += `<ellipse cx="40" cy="300" rx="190" ry="26" fill="#000" opacity=".28" filter="url(#soft)"/>`;
  // back leg (right leg) pushing off
  e += limb('M-10 0 L-60 150 L-130 260', 62, PANTS);
  e += `<path d="M-18 6 L-68 152 L-136 256" ${L(5, '#d8dbe2', .9)}/>`; // stripe
  e += `<path d="M-160 248 q20 -26 50 -10 l10 30 q-30 14 -64 6Z" fill="#e8e3d6" ${O(4)}/>`; // shoe
  // back arm
  e += limb('M0 -235 L-70 -170 L-100 -110', 34, SHIRTSH);
  e += `<circle cx="-102" cy="-104" r="17" fill="${SKSH}" ${O(4)}/>`;
  // torso (leaning forward)
  e += `<path d="M-50 10 L50 10 Q70 -110 92 -228 Q70 -282 20 -284 L-26 -272 Q-62 -230 -50 10Z" fill="${SHIRT}" ${O(5)}/>`;
  e += `<path d="M10 -150 Q40 -60 40 6 L50 10 Q70 -110 92 -228 Z" fill="${SHIRTSH}" opacity=".7"/>`;
  e += `<text x="10" y="-120" text-anchor="middle" font-family="Inter" font-weight="800" font-size="56" fill="${ORANGE}" opacity=".85" transform="rotate(8 10 -120)">10</text>`;
  // front leg (left leg) — touching the ball
  e += limb('M25 0 L95 130 L150 250', 62, PANTS);
  e += `<path d="M18 4 L88 132 L142 252" ${L(5, '#d8dbe2', .9)}/>`;
  e += `<path d="M130 236 q34 -10 64 6 q8 22 -6 32 q-40 6 -64 -8Z" fill="#e8e3d6" ${O(4)}/>`;
  // ball
  e += `<circle cx="232" cy="276" r="34" fill="#f3f1ea" ${O(4)}/><path d="M232 256 l14 10 l-6 16 h-16 l-6 -16Z" fill="${INK}"/><path d="M206 268 l10 4 M258 268 l-10 4 M224 304 l4 -10 M244 304 l-4 -10" ${L(3)}/>`;
  e += `<path d="M290 250 h50 M296 276 h60 M290 302 h44" ${L(4, '#fff', .7)}/>`; // motion
  // front arm (balance, forward-out)
  e += limb('M60 -236 L120 -186 L170 -206', 34, SHIRT);
  e += `<circle cx="176" cy="-208" r="17" fill="${SKIN}" ${O(4)}/>`;
  // neck + head (profile right, concentrated frown)
  e += `<path d="M14 -280 L18 -318 L54 -318 L60 -276Z" fill="${SKSH}" ${O(4)}/>`;
  e += `<path d="M0 -370 Q2 -420 50 -424 Q100 -424 104 -376 L112 -350 Q118 -340 106 -336 Q104 -312 84 -304 Q50 -296 22 -310 Q-2 -330 0 -370Z" fill="${SKIN}" ${O(5)}/>`;
  e += `<path d="M30 -320 Q60 -306 88 -310 Q70 -330 40 -332Z" fill="${SKSH}" opacity=".5"/>`;
  e += `<path d="M78 -372 L98 -366" ${L(6)}/>`; // brow, low and angled
  e += `<path d="M82 -356 q8 -4 14 0" ${L(4)}/><circle cx="90" cy="-354" r="3.5" fill="${INK}"/>`; // eye
  e += `<path d="M96 -330 q6 4 12 0" ${L(3.5)}/>`; // tight mouth
  e += `<ellipse cx="34" cy="-358" rx="11" ry="17" fill="${SKSH}" ${O(3)}/>`; // ear
  // curly hair
  let curls = '';
  for (const [x, y, rr] of [[0, -392, 26], [22, -420, 28], [52, -432, 28], [82, -424, 24], [100, -400, 18], [-8, -362, 18], [10, -372, 20], [36, -404, 20], [68, -410, 20]]) curls += `<circle cx="${x}" cy="${y}" r="${rr}"/>`;
  e += `<g fill="#141110" ${O(4)}>${curls}</g><g fill="#141110">${curls.replace(/r="(\d+)"/g, (m, v) => `r="${v - 4}"`)}</g>`;
  e += `<path d="M40 -430 q10 -8 20 0 M74 -428 q8 -6 16 2" ${L(3, '#4a3f3a')}/>`;
  // dust puffs at feet
  e += `<g fill="#e3cba4" opacity=".75"><circle cx="-150" cy="270" r="30"/><circle cx="-110" cy="282" r="22"/><circle cx="-190" cy="280" r="18"/><circle cx="170" cy="288" r="20"/></g>`;

  s += `<g transform="translate(400 1430) scale(1.05)">${e}</g>`;
  s += `<rect width="1080" height="1920" fill="#f1c48a" opacity=".07"/><rect width="1080" height="1920" fill="url(#vig)" opacity=".75"/>`;
  return s;
}

const SCENES = [['kerem-odasi', 'Kerem\'in Odası', office], ['koridor', 'Koridor', corridor], ['emir', 'Emir · Toprak Saha', emir]];

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
  await cmp.screenshot({ path: path.join(OUT, 'mekan2-karsilastirma.png') });
  await browser.close();
  console.log('ok');
})();
