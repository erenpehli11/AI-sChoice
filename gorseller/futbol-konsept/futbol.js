// ============ Futbol sahnesi konseptleri — Emir'in golü ============
// (eller kadraj dışı / silüet — kullanıcı kuralı)
const D2R = Math.PI / 180;

// ---------- poseable side-view body (facing right), origin = hip ----------
// p: { lean, nh, nk, fh, fk, ns, ne, fs, fe } degrees ; o: colours
function pose(p, o = {}) {
  const L1 = 230, L2 = 222, TOR = 330, UA = 150, FA = 140;
  const lean = p.lean * D2R;
  const neck = [Math.sin(lean) * TOR, -Math.cos(lean) * TOR];
  const sh = [neck[0] - Math.sin(lean) * 34, neck[1] + Math.cos(lean) * 34];
  const leg = (h, k) => { h *= D2R; k *= D2R; const kn = [Math.sin(h) * L1, Math.cos(h) * L1]; const an = [kn[0] + Math.sin(h - k) * L2, kn[1] + Math.cos(h - k) * L2]; return { kn, an, d: [Math.sin(h - k), Math.cos(h - k)] }; };
  const arm = (s, e) => { s = (s + p.lean) * D2R; e *= D2R; const el = [sh[0] + Math.sin(s) * UA, sh[1] + Math.cos(s) * UA]; const wr = [el[0] + Math.sin(s + e) * FA, el[1] + Math.cos(s + e) * FA]; return { el, wr }; };
  const N = leg(p.nh, p.nk), F = leg(p.fh, p.fk), AN = arm(p.ns, p.ne), AF = arm(p.fs, p.fe);
  const shoe = (l, col) => { const fx = l.d[1], fy = -l.d[0]; const a = Math.atan2(fy, fx) * 180 / Math.PI; return `<g transform="translate(${l.an[0]} ${l.an[1]}) rotate(${a})"><path d="M-34 -14 Q-30 -36 10 -32 L62 -20 Q86 -10 78 10 L-36 14Z" fill="${col}" ${S(5)}/><path d="M-30 8 H76" ${LN(4, '#bdb6a6')}/></g>`; };
  const sil = o.sil; const c = (x) => sil ? sil : x;
  let s = '';
  s += limb(`M0 0 L${F.kn[0]} ${F.kn[1]} L${F.an[0]} ${F.an[1]}`, 64, c(o.pantsF || '#22293b'), sil ? 0 : 7) + shoe(F, c('#d8d2c2'));
  s += limb(`M${sh[0]} ${sh[1]} L${AF.el[0]} ${AF.el[1]} L${AF.wr[0]} ${AF.wr[1]}`, 44, c(o.shirtF || '#bdb9ac'), sil ? 0 : 7) + `<circle cx="${AF.wr[0]}" cy="${AF.wr[1]}" r="22" fill="${c(o.skinF || '#a87352')}" ${sil ? '' : S(4)}/>`;
  // torso
  const pr = [Math.cos(lean), Math.sin(lean)];
  const tpts = [[-pr[0] * 62, -pr[1] * 62 + 12], [pr[0] * 62, pr[1] * 62 + 12], [neck[0] + pr[0] * 70, neck[1] + pr[1] * 70 + 30], [neck[0] - pr[0] * 66, neck[1] - pr[1] * 66 + 30]];
  s += `<path d="M${tpts[0][0]} ${tpts[0][1]} L${tpts[1][0]} ${tpts[1][1]} Q${(tpts[1][0] + tpts[2][0]) / 2 + pr[0] * 14} ${(tpts[1][1] + tpts[2][1]) / 2} ${tpts[2][0]} ${tpts[2][1]} Q${neck[0]} ${neck[1] - 10} ${tpts[3][0]} ${tpts[3][1]} Q${(tpts[3][0] + tpts[0][0]) / 2 - pr[0] * 14} ${(tpts[3][1] + tpts[0][1]) / 2} ${tpts[0][0]} ${tpts[0][1]}Z" fill="${c(o.shirt || 'url(#tee)')}" ${sil ? '' : S(6)}/>`;
  if (o.num && !sil) { const mx = neck[0] * .45, my = neck[1] * .5; s += `<text x="${mx}" y="${my}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="90" fill="${ORANGE}" opacity=".6" transform="rotate(${p.lean} ${mx} ${my})">${o.num}</text>`; }
  if (o.rim) s += `<path d="M${tpts[1][0]} ${tpts[1][1]} L${tpts[2][0]} ${tpts[2][1]}" ${LN(6, o.rim, .9)}/>`;
  // head
  s += `<g transform="translate(${neck[0] + Math.sin(lean) * 70} ${neck[1] - Math.cos(lean) * 70 - 20}) rotate(${p.lean * .6 + (p.head || 0)}) scale(.95)">${sil ? `<ellipse cx="10" cy="0" rx="96" ry="112" fill="${sil}"/>${o.curly ? curls([[-60, -60, 34], [-20, -100, 36], [24, -104, 34], [62, -80, 28], [-80, -16, 26]], sil) : ''}` : (o.head || '')}</g>`;
  s += limb(`M0 0 L${N.kn[0]} ${N.kn[1]} L${N.an[0]} ${N.an[1]}`, 68, c(o.pants || '#2f3a52'), sil ? 0 : 7) + shoe(N, c('#efe9da'));
  if (!sil) s += `<path d="M${-6} 6 L${N.kn[0] - 6} ${N.kn[1]} L${N.an[0] - 6} ${N.an[1]}" ${LN(5, '#d8dbe2', .85)}/>`;
  s += limb(`M${sh[0]} ${sh[1]} L${AN.el[0]} ${AN.el[1]} L${AN.wr[0]} ${AN.wr[1]}`, 46, c(o.shirt2 || '#d8d5cb'), sil ? 0 : 7) + `<circle cx="${AN.wr[0]}" cy="${AN.wr[1]}" r="23" fill="${c(o.skin || '#c99a76')}" ${sil ? '' : S(4)}/>`;
  // lowest foot
  return { svg: s, low: Math.max(N.an[1], F.an[1]), N, F };
}
const EMIR_O = () => ({ curly: 1, num: '10', head: profileHead(SKIN_E, emirHair, false) });
const DEF_O = () => ({ shirt: 'url(#maroon)', shirt2: '#7a3a3a', shirtF: '#5a2a28', pants: '#2a2622', pantsF: '#1c1916', skin: '#b07a58', skinF: '#8a5a40', head: profileHead(SKIN_D, defHair, false) });
const P_SHOOT = { lean: -14, nh: 78, nk: 8, fh: -10, fk: 18, ns: -55, ne: 25, fs: 110, fe: -30, head: -6 };
const P_DRIB = { lean: 20, nh: 28, nk: 46, fh: -34, fk: 70, ns: -25, ne: 40, fs: 50, fe: 30 };
const P_RECV = { lean: 6, nh: 38, nk: 62, fh: -6, fk: 12, ns: -20, ne: 30, fs: 30, fe: 20 };
const P_FALL = { lean: -60, nh: 60, nk: 30, fh: 100, fk: 40, ns: 150, ne: 20, fs: 120, fe: 30, head: -20 };
function figure(p, o, x, groundY, sc = 1, flip = false, extra = '') {
  const r = pose(p, o); const y = groundY - (r.low + 18) * sc;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -sc : sc} ${sc}) ${extra}">${r.svg}</g>`;
}
function speedLines(cx, cy, n, r0, col = '#fff', op = .5, seed = 3) {
  const r = rng(seed); let s = '';
  for (let i = 0; i < n; i++) { const a = r() * Math.PI * 2, r1 = r0 + r() * 200, l = 300 + r() * 600; s += `<path d="M${cx + Math.cos(a) * r1} ${cy + Math.sin(a) * r1} L${cx + Math.cos(a) * (r1 + l)} ${cy + Math.sin(a) * (r1 + l)}" stroke="${col}" stroke-width="${3 + r() * 8}" stroke-linecap="round" opacity="${op}"/>`; }
  return s;
}
function hLines(y0, y1, n, col = '#fff', op = .35, seed = 5) { const r = rng(seed); let s = ''; for (let i = 0; i < n; i++) { const y = y0 + r() * (y1 - y0), x = r() * 1080, l = 200 + r() * 500; s += `<path d="M${x} ${y} h${-l}" stroke="${col}" stroke-width="${3 + r() * 6}" stroke-linecap="round" opacity="${op}"/>`; } return s; }
function ballSVG(x, y, r = 34, rot = 0) { return `<g transform="translate(${x} ${y}) rotate(${rot})"><circle r="${r}" fill="#f3f1ea" ${S(5)}/><path d="M0 ${-r * .45} l${r * .42} ${r * .3} l${-r * .16} ${r * .5} h${-r * .52} l${-r * .16} ${-r * .5}Z" fill="${INK}"/><path d="M${-r * .9} ${-r * .2} l${r * .3} ${r * .1} M${r * .9} ${-r * .2} l${-r * .3} ${r * .1} M${-r * .3} ${r * .9} l${r * .1} ${-r * .3}" ${LN(3)}/></g>`; }
function dustPuff(x, y, s0, op = .9, seed = 8) { const r = rng(seed); let s = ''; for (let i = 0; i < 9; i++) s += `<circle cx="${x + (r() - .5) * s0 * 2}" cy="${y - r() * s0 * .7}" r="${s0 * (.3 + r() * .5)}"/>`; return `<g fill="#e3cba4" opacity="${op}" ${S(3)}>${s}</g><g fill="#e3cba4" opacity="${op}">${s}</g>`; }

// ===================== FRAMES (1080x1920 each) =====================
function fDust(t = 0) { // detail: sneaker into dust, ball
  const k = E(t / 1.2);
  let s = `<rect width="1080" height="1920" fill="url(#dusk)"/><rect y="1000" width="1080" height="920" fill="url(#dirt)"/>`;
  s += `<g opacity=".5" filter="url(#blur)">${figure(P_DRIB, DEF_O(), 820, 1100, .55, true)}${figure(P_RECV, DEF_O(), 300, 1080, .45, true)}</g>`;
  const r = rng(4); for (let i = 0; i < 60; i++) s += `<ellipse cx="${r() * 1080}" cy="${1100 + r() * 820}" rx="${10 + r() * 50}" ry="${4 + r() * 8}" fill="#7f5f40" opacity=".45"/>`;
  // big sneaker + ankle (track pants)
  s += `<g transform="translate(${420 + k * 60} ${1420}) rotate(-8)">${limb('M60 -900 L40 -120', 200, '#2f3a52')}<path d="M-20 -880 L-34 -120" ${LN(10, '#d8dbe2', .85)}/>`;
  s += `<path d="M-160 -40 Q-150 -170 0 -160 L220 -110 Q330 -70 300 30 L-170 50Z" fill="#efe9da" ${S(8)}/><path d="M-170 30 H300" ${LN(10, '#bdb6a6')}/><path d="M0 -150 L-40 -30 M60 -140 L20 -30 M120 -126 L80 -26" ${LN(6, '#8a8478')}/><path d="M-120 -60 q-30 40 20 50" ${LN(5, '#8a8478')}/></g>`;
  s += dustPuff(330 + k * 60, 1480, 120, .85, 2) + dustPuff(700, 1500, 70, .7, 9);
  s += ballSVG(800 + k * 40, 1420, 110, k * 60);
  s += hLines(1250, 1650, 10, '#fff', .3);
  return s;
}
function fEyes() { // panel: Emir's eyes lock on
  let s = `<rect width="1080" height="1920" fill="#e8b27c"/>` + speedLines(540, 960, 70, 260, '#fff', .55);
  s += `<g transform="translate(540 1040) scale(4.6)">${emirHead({ anger: .6 })}</g>`;
  return s;
}
function fDribble(t = 0) { // panel/wide: past the big defender
  let s = `<rect width="1080" height="1920" fill="url(#dusk)"/><rect y="1180" width="1080" height="740" fill="url(#dirt)"/>` + hLines(700, 1700, 26, '#fff', .45, 11);
  s += figure(P_FALL, DEF_O(), 560 - t * 20, 1700, 1.05, true, `rotate(${-10 - t * 10})`);
  s += dustPuff(520, 1760, 130, .9, 4);
  s += figure(P_DRIB, EMIR_O(), 720 + t * 60, 1720, 1.0);
  s += ballSVG(920 + t * 70, 1680, 34);
  return s;
}
function fShadow(t = 0) { // detail: defender's shadow crashing onto dirt
  const k = E(t / 1);
  let s = `<rect width="1080" height="1920" fill="url(#dirt)"/>`;
  const r = rng(12); for (let i = 0; i < 80; i++) s += `<ellipse cx="${r() * 1080}" cy="${r() * 1920}" rx="${10 + r() * 60}" ry="${4 + r() * 10}" fill="#7f5f40" opacity=".45"/>`;
  const sh = '#3b2a1c';
  s += `<g opacity=".6" transform="translate(${520 - 140 * k} 1000) rotate(${-25 - 45 * k})">
    <ellipse cx="0" cy="0" rx="150" ry="300" fill="${sh}"/><circle cx="0" cy="-400" r="110" fill="${sh}"/>
    <path d="M-120 -180 L-360 -360 M120 -180 L330 -380" stroke="${sh}" stroke-width="90" stroke-linecap="round"/>
    <path d="M-80 260 L-220 620 M80 260 L260 600" stroke="${sh}" stroke-width="110" stroke-linecap="round"/></g>`;
  s += dustPuff(420, 1250, 220 * (.5 + k * .6), .85, 6);
  s += ballSVG(820 + 120 * k, 1500, 46);
  return s;
}
function fShot(t = 0) { // panel: the strike
  let s = `<rect width="1080" height="1920" fill="#f1c48a"/>` + speedLines(760, 1300, 80, 180, '#fff', .6, 9);
  s += figure(P_SHOOT, EMIR_O(), 380, 1820, 1.25);
  const k = E(t / .6); s += `<g ${LN(10, '#fff', .9)}><path d="M${720 + k * 240} 1270 h-180 M${730 + k * 240} 1330 h-220 M${720 + k * 240} 1390 h-160"/></g>`;
  s += ballSVG(800 + k * 260, 1330 - k * 120, 46);
  for (let i = 0; i < 3; i++) s += `<circle cx="760" cy="1340" r="${60 + i * 40}" fill="none" ${LN(6, '#fff', .6 - i * .18)}/>`;
  return s;
}
function fFootStrike() { // detail: instep meets ball
  let s = `<rect width="1080" height="1920" fill="#d79a72"/>` + speedLines(640, 1000, 60, 200, '#fff', .5, 21);
  s += `<g transform="translate(330 980) rotate(-24)">${limb('M-300 -600 L-40 -60', 210, '#2f3a52')}<path d="M-340 -560 L-90 -40" ${LN(12, '#d8dbe2', .85)}/><path d="M-200 -40 Q-190 -190 0 -180 L260 -120 Q380 -70 350 40 L-210 60Z" fill="#efe9da" ${S(9)}/><path d="M-210 36 H350" ${LN(12, '#bdb6a6')}/></g>`;
  s += ballSVG(760, 920, 170, 20);
  s += `<g transform="translate(650 930)"><path d="M0 -150 L36 -40 L150 -60 L60 20 L120 140 L0 70 L-120 140 L-60 20 L-150 -60 L-36 -40Z" fill="none" ${LN(10, '#fff', .85)}/></g>`;
  return s;
}
function fWall(t = 0, cheer = 0) { // detail: ball slams the wall
  const k = E(t / .5);
  let s = `<rect width="1080" height="1920" fill="url(#dusk)"/><rect x="0" y="300" width="1080" height="1300" fill="#a7967f" ${S(5)}/>`;
  for (let y = 330; y < 1600; y += 70) for (let x = (y / 70 % 2) * 70; x < 1080; x += 140) s += `<rect x="${x}" y="${y}" width="140" height="70" fill="none" stroke="#8b7a64" stroke-width="4"/>`;
  s += `<text x="120" y="900" font-family="Inter" font-weight="900" font-size="220" fill="${ORANGE}" opacity=".75" transform="rotate(-5 120 900)">OCAK</text>`;
  s += `<rect y="1600" width="1080" height="320" fill="url(#dirt)"/>`;
  if (cheer) { for (let i = 0; i < 4; i++) { const x = 160 + i * 250; s += `<g transform="translate(${x} 300) scale(1.6)"><path d="M-22 0 v-56 q22 -18 44 0 v56Z" fill="${['#5b6f8a', '#8a5b5b', '#4f6a66', '#8a7a5b'][i]}" ${S(3)}/><path d="M-18 -50 l-20 -50 M18 -50 l20 -50" ${LN(10, ['#5b6f8a', '#8a5b5b', '#4f6a66', '#8a7a5b'][i])}/><circle cx="0" cy="-74" r="18" fill="#c9946f" ${S(3)}/>${i === 2 ? `<path d="M-18 -80 q18 -24 36 0 h10 v6 h-46Z" fill="${ORANGE}" ${S(2)}/>` : `<path d="M-18 -80 q18 -22 36 0Z" fill="#2a2420"/>`}</g>`; } }
  s += dustPuff(560, 1100, 160 * (.4 + k), .9, 13);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; s += `<rect x="${560 + Math.cos(a) * 200 * k}" y="${1000 + Math.sin(a) * 200 * k}" width="22" height="14" fill="#8b7a64" ${S(2)} transform="rotate(${i * 40} ${560 + Math.cos(a) * 200 * k} ${1000 + Math.sin(a) * 200 * k})"/>`; }
  s += `<g transform="translate(560 1000) scale(${1.25 - .25 * k} ${.8 + .2 * k})">${ballSVG(0, 0, 110)}</g>`;
  s += `<text x="820" y="760" text-anchor="middle" font-family="Inter" font-weight="900" font-size="150" fill="#fff" stroke="${INK}" stroke-width="12" paint-order="stroke" transform="rotate(10 820 760)">GÜM!</text>`;
  return s;
}
function fKids(t = 0, phase = 0) { // reaction: kids on the wall
  let s = `<rect width="1080" height="1920" fill="url(#dusk)"/><rect y="1300" width="1080" height="620" fill="#a7967f" ${S(5)}/>`;
  const heads = [[180, '#5b6f8a', mateHead], [440, '#4f6a66', kidHead], [720, '#8a5b5b', mateHead], [960, '#8a7a5b', mateHead]];
  heads.forEach(([x, col, fn], i) => {
    const up = phase * 60;
    s += `<g transform="translate(${x} ${1080 - (i === 1 ? 0 : 0)}) scale(${i === 1 ? 1.7 : 1.25})"><path d="M-130 260 C-140 150 -100 100 -30 90 L30 90 C100 100 140 150 130 260Z" fill="${col}" ${S(5)}/>`;
    if (phase) s += limb(`M-90 130 L-140 ${-20 - up}`, 34, col) + limb(`M90 130 L140 ${-20 - up}`, 34, col);
    s += `${fn(i === 1 ? {} : { mouth: phase ? 1 : 0 })}</g>`;
  });
  return s;
}
function fBrother() { return `<rect width="1080" height="1920" fill="url(#dusk)"/><g fill="url(#dustG)" opacity=".7"><circle cx="300" cy="1500" r="420"/></g><rect x="0" y="1300" width="1080" height="620" fill="#a7967f" ${S(5)}/><g transform="translate(540 960) scale(3)"><path d="M-150 400 C-160 260 -120 180 -40 160 L40 160 C120 180 160 260 150 400Z" fill="#4f6a66" ${S(6)}/>${kidHead()}</g>`; }
function fMate() { return `<rect width="1080" height="1920" fill="url(#dusk)"/><g transform="translate(540 940) scale(2.6)"><path d="M-210 560 C-220 330 -170 232 -54 204 L54 204 C170 232 220 330 210 560Z" fill="#5b6f8a" ${S(6)}/>${mateHead({ mouth: 1 })}</g>`; }
function fTactic() { // chalkboard top-down
  let s = `<rect width="1080" height="1920" fill="#27342e"/><rect x="40" y="40" width="1000" height="1840" fill="none" stroke="#6b4e34" stroke-width="30"/>`;
  const ch = (d, c = '#e9e6dc', w = 6, op = .9, dash = '') => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${op}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`;
  s += `<text x="540" y="200" text-anchor="middle" font-family="Inter" font-weight="800" font-size="64" fill="#e9e6dc" opacity=".85" letter-spacing="4">EMİR · 3 ÇALIM</text>`;
  s += ch('M140 300 H940 V1760 H140 Z', '#e9e6dc', 6, .5) + ch('M420 300 V360 H660 V300', '#e9e6dc', 10, .9);
  s += `<text x="540" y="290" text-anchor="middle" font-family="Inter" font-weight="700" font-size="30" fill="#e9e6dc" opacity=".7">DUVAR</text>`;
  const X = (x, y) => ch(`M${x - 34} ${y - 34} L${x + 34} ${y + 34} M${x + 34} ${y - 34} L${x - 34} ${y + 34}`, '#e98a7a', 9);
  s += X(420, 1200) + X(640, 900) + X(480, 620);
  s += ch('M560 1640 C380 1500 300 1320 500 1180 C700 1060 760 960 600 860 C420 760 420 680 560 560', ORANGE, 9, .95, '4 22');
  s += ch('M560 560 L540 380', '#fff', 10) + ch('M520 410 L540 370 L566 408', '#fff', 10);
  s += `<circle cx="560" cy="1650" r="44" fill="none" stroke="${ORANGE}" stroke-width="9"/><text x="560" y="1666" text-anchor="middle" font-family="Inter" font-weight="900" font-size="42" fill="${ORANGE}">10</text>`;
  s += `<circle cx="860" cy="760" r="40" fill="none" stroke="#9cc3d8" stroke-width="8"/><text x="860" y="680" text-anchor="middle" font-family="Inter" font-weight="800" font-size="60" fill="#9cc3d8">?</text>`;
  s += ch('M820 720 Q700 640 600 600', '#9cc3d8', 5, .7, '10 16');
  s += `<text x="300" y="470" font-family="Inter" font-weight="900" font-size="90" fill="#fff" transform="rotate(-8 300 470)">GOL</text>`;
  s += `<g opacity=".08">${hLines(300, 1800, 40, '#fff', 1, 31)}</g>`;
  return s;
}
function fSilhouette() {
  const SIL = '#1c1216';
  let s = `<rect width="1080" height="1920" fill="url(#dusk)"/><circle cx="540" cy="1040" r="300" fill="#fbe0a8"/><circle cx="540" cy="1040" r="520" fill="#f8d79c" opacity=".35" filter="url(#blur2)"/>`;
  const r = rng(21); for (let i = 0; i < 12; i++) { const x = i * 92 - 10, h = 160 + r() * 260; s += `<rect x="${x}" y="${1180 - h}" width="96" height="${h}" fill="#3a2a34"/>`; }
  s += `<rect y="1180" width="1080" height="160" fill="${SIL}"/>`;
  for (let i = 0; i < 4; i++) s += `<g transform="translate(${120 + i * 90 + (i > 1 ? 380 : 0)} 1180)"><path d="M-22 0 v-56 q22 -18 44 0 v56Z" fill="${SIL}"/><circle cx="0" cy="-74" r="18" fill="${SIL}"/>${i === 2 ? `<path d="M-18 -80 q18 -24 36 0 h10 v6 h-46Z" fill="${ORANGE}"/>` : ''}</g>`;
  s += `<rect y="1340" width="1080" height="580" fill="#8a5a42"/><rect y="1340" width="1080" height="580" fill="#000" opacity=".25"/>`;
  s += `<path d="M880 1640 L880 1300 L1060 1260 L1060 1600" stroke="${SIL}" stroke-width="20" fill="none"/>`;
  s += figure(P_FALL, { sil: SIL }, 330, 1820, 1.0, true, 'rotate(-14)');
  s += figure(P_SHOOT, { sil: SIL, curly: 1, rim: ORANGE }, 560, 1840, 1.2);
  s += `<path d="M720 1500 Q860 1400 980 1380" stroke="#fff" stroke-width="6" fill="none" stroke-dasharray="4 18" opacity=".8"/><circle cx="990" cy="1378" r="20" fill="#fff"/>`;
  
  return s;
}
// comic page (concept 1)
function comicPage() {
  const P = [
    [[30, 30], [1050, 30], [1050, 520], [30, 600]],
    [[30, 640], [1050, 560], [1050, 1160], [30, 1220]],
    [[30, 1260], [560, 1230], [520, 1890], [30, 1890]],
    [[600, 1228], [1050, 1200], [1050, 1890], [560, 1890]]
  ];
  const fr = [[fEyes, 540, 600, .62, 0, -280], [() => fDribble(.5), 540, 880, .7, 0, 0], [fFootStrike, 280, 1560, .6, 0, 0], [() => fWall(.5), 810, 1560, .48, 0, 0]];
  let s = `<rect width="1080" height="1920" fill="#f4efe2"/>`;
  P.forEach((pp, i) => {
    const [fn, cx, cy, sc, dx, dy] = fr[i];
    s += `<clipPath id="cp${i}"><polygon points="${poly(pp)}"/></clipPath><g clip-path="url(#cp${i})"><g transform="translate(${cx - 540 * sc + dx} ${cy - 960 * sc + dy}) scale(${sc})">${fn()}</g></g><polygon points="${poly(pp)}" fill="none" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>`;
  });
  s += `<g font-family="Inter" font-weight="900"><text x="760" y="1120" text-anchor="middle" font-size="96" fill="#fff" stroke="${INK}" stroke-width="12" paint-order="stroke" transform="rotate(-6 760 1120)">VIIIN!</text></g>`;
  return s;
}

// ===================== BOARDS =====================
function board(title, sub, content) {
  return `<rect width="1080" height="1920" fill="#1a1816"/><rect x="40" y="56" width="12" height="64" fill="${ORANGE}"/>
  <text x="70" y="108" font-family="Inter" font-weight="900" font-size="56" fill="#efe8dc">${title}</text>
  <text x="70" y="160" font-family="Inter" font-weight="500" font-size="30" fill="#efe8dc" opacity=".7">${sub}</text>${content}`;
}
function mini(fnSvg, x, y, sc, label, n) {
  const w = 1080 * sc, h = 1920 * sc;
  return `<clipPath id="m${n}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18"/></clipPath><g clip-path="url(#m${n})"><g transform="translate(${x} ${y}) scale(${sc})">${fnSvg}</g></g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="none" stroke="#3a3632" stroke-width="3"/>
  <rect x="${x + 12}" y="${y + 12}" width="${Math.max(60, label.length * 15 + 40)}" height="44" rx="8" fill="#000" opacity=".6"/><text x="${x + 28}" y="${y + 43}" font-family="Inter" font-weight="800" font-size="24" fill="#efe8dc">${label}</text>`;
}
const BOARDS = {
  '1-panel': () => board('1 · Çizgi Roman Panelleri', 'Aynı ekranda 4 panel: göz → çalım → vuruş → duvar', mini(comicPage(), 96, 210, .82, 'Tek ekran', 1)),
  '2-detay': () => board('2 · Detay Çekimleri', 'Her biri tam ekran, art arda: ayak · gölge · vuruş · duvar',
    mini(fDust(.6), 50, 210, .43, '1 · Ayak ve top', 1) + mini(fShadow(.6), 566, 210, .43, '2 · Düşen gölge', 2) + mini(fFootStrike(), 50, 1060, .43, '3 · Vuruş', 3) + mini(fWall(.5), 566, 1060, .43, '4 · Duvar', 4)),
  '3-taktik': () => board('3 · Taktik Tahtası', 'Golün planı tebeşirle: 3 çalım, boştaki arkadaş, şut', mini(fTactic(), 96, 210, .82, 'Tek ekran', 1)),
  '4-siluet': () => board('4 · Silüet', 'Gün batımına karşı: sadece top, kenar ışığı ve şapka renkli', mini(fSilhouette(), 96, 210, .82, 'Tek ekran', 1)),
  '5-reaksiyon': () => board('5 · Reaksiyon', 'Golü değil, izleyenleri görüyoruz; top en sonda giriyor',
    mini(fKids(0, 0), 50, 210, .43, '1 · Bekleyiş', 1) + mini(fBrother(), 566, 210, .43, '2 · Kardeş', 2) + mini(fMate(), 50, 1060, .43, '3 · "Pas versene!"', 3) + mini(fWall(.5, 1), 566, 1060, .43, '4 · Top duvarda', 4)),
  '6-karma': () => board('6 · Karma Dil', 'Detay + panel + reaksiyon, 6 plan (~9 sn)',
    mini(fDust(.6), 40, 210, .3, '1 · Detay', 1) + mini(fDribble(.5), 378, 210, .3, '2 · Panel', 2) + mini(fShadow(.6), 716, 210, .3, '3 · Detay', 3) +
    mini(fBrother(), 40, 830, .3, '4 · Reaksiyon', 4) + mini(fShot(.3), 378, 830, .3, '5 · Panel', 5) + mini(fWall(.5, 1), 716, 830, .3, '6 · Detay + tepki', 6) +
    `<g font-family="Inter" fill="#efe8dc"><text x="40" y="1500" font-weight="800" font-size="34">Akış</text><text x="40" y="1556" font-weight="500" font-size="28" opacity=".8">Ayak toza basar → Emir savunmacıyı geçer → iri adamın</text><text x="40" y="1598" font-weight="500" font-size="28" opacity=".8">gölgesi yere çakılır → kardeşin gözleri → vuruş</text><text x="40" y="1640" font-weight="500" font-size="28" opacity=".8">(hız çizgileri) → GÜM! duvar, çocuklar ayağa kalkar.</text></g>`)
};
// karma video: 6 shots
const KARMA = [[0, 1.4, (u) => fDust(u)], [1.4, 3.0, (u) => fDribble(u * .6)], [3.0, 4.2, (u) => fShadow(u)], [4.2, 5.4, () => fBrother()], [5.4, 6.8, (u) => fShot(u)], [6.8, 9.0, (u) => fWall(u, u > .35 ? 1 : 0)]];
function renderKarma(t) {
  let body = ''; for (const [a, b, fn] of KARMA) if (t >= a && t < b) { const u = t - a; body = `<g transform="${camT(540, 960, 1 + .05 * u)}">${fn(u)}</g>`; break; }
  if (!body) body = KARMA[5][2](2.2);
  document.getElementById('svg').innerHTML = DEFS + DEFS2 + body + `<rect width="1080" height="1920" fill="url(#vig)"/>`;
}
function renderBoard(k) { document.getElementById('svg').innerHTML = DEFS + DEFS2 + BOARDS[k](); }
