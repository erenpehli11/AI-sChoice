// ===================== BÖLÜM 1 — sahneler =====================
const IMG_OFFICE = '../mekanlar/mekan-kerem-odasi.png';
const IMG_HOME = '../mekanlar/mekan-ev.png';
const W = 1080, H = 1920;

// ---------- shared pieces ----------
function rain(t, amt, seed = 7) {
  if (amt <= 0) return '';
  const r = rng(seed); let s = '';
  const n = Math.round(240 * amt);
  for (let i = 0; i < n; i++) {
    const x0 = r() * 1200 - 60, sp = 1500 + r() * 700, ph = r();
    const y = ((ph + t * sp / 1920) % 1) * 2100 - 100, x = x0 - y * .12, l = 40 + r() * 40;
    s += `<line x1="${x}" y1="${y}" x2="${x - l * .12}" y2="${y + l}"/>`;
  }
  return `<g stroke="#e8ecee" stroke-width="2.2" opacity="${.35 * Math.min(1, amt * 1.4)}">${s}</g>`;
}
function chimneys(list, smokeT, col = '#6e7473', smoke = '#a9a9a2', base = 1200) {
  const r = rng(13); let s = '';
  for (const c of list) {
    let sm = '';
    for (let i = 0; i < 9; i++) {
      const drift = ((smokeT * 18 + i * 40) % 360);
      sm += `<circle cx="${c.x + c.w / 2 + drift * .9 + r() * 10}" cy="${c.top - 20 - drift * .6}" r="${26 + drift * .14}"/>`;
    }
    s += `<g fill="${smoke}" opacity=".85" ${S(3)}>${sm}</g><g fill="${smoke}" opacity=".85">${sm}</g>`;
  }
  for (const c of list) {
    s += `<rect x="${c.x}" y="${c.top}" width="${c.w}" height="${base - c.top}" fill="${col}" ${S(4)}/>`;
    s += `<rect x="${c.x - 6}" y="${c.top - 14}" width="${c.w + 12}" height="16" fill="#555b5a" ${S(3)}/>`;
    s += `<rect x="${c.x}" y="${c.top + 36}" width="${c.w}" height="22" fill="#8f6a58" ${S(3)}/>`;
  }
  return s;
}
function crest(x, y, r, op = 1) {
  return `<g opacity="${op}"><circle cx="${x}" cy="${y}" r="${r}" fill="${ORANGE}" ${S(5)}/><circle cx="${x}" cy="${y}" r="${r * .8}" fill="none" stroke="${INK}" stroke-width="${r * .08}"/>
    <path d="M${x - r * .34} ${y + r * .28} Q${x} ${y - r * .7} ${x + r * .34} ${y + r * .28} Q${x} ${y + r * .1} ${x - r * .34} ${y + r * .28}Z" fill="${INK}"/>
    <text x="${x}" y="${y + r * .66}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="${r * .24}" fill="${INK}">1953</text></g>`;
}
const camT = (cx, cy, z, dx = 0, dy = 0) => `translate(${cx + dx} ${cy + dy}) scale(${z}) translate(${-cx} ${-cy})`;

// ---------- Yusuf: walking side view (facing right), origin = hip ----------
function yusufWalk(p, limp = 1, o = {}) {
  const TAU = Math.PI * 2;
  const pw = p + 0.06 * limp * Math.sin(TAU * p); // shorter stance on left (near) leg
  const L1 = 225, L2 = 215;
  const legs = (a, k) => {
    const kx = Math.sin(a) * L1, ky = Math.cos(a) * L1;
    const ax = kx + Math.sin(a - k) * L2, ay = ky + Math.cos(a - k) * L2;
    return { kx, ky, ax, ay, fa: a - k };
  };
  const aN = 0.40 * Math.sin(TAU * pw), aF = 0.40 * Math.sin(TAU * pw + Math.PI);
  const swingN = Math.max(0, Math.cos(TAU * pw)), swingF = Math.max(0, Math.cos(TAU * pw + Math.PI));
  const kN = (0.06 + 0.22 * swingN) * (limp ? 1 : 2.4), kF = 0.10 + 0.62 * swingF;
  const bob = -7 * Math.cos(2 * TAU * pw) + limp * 9 * Math.max(0, -Math.cos(TAU * pw));
  const lean = limp * 1.6 * Math.max(0, -Math.cos(TAU * pw));
  const N = legs(aN, kN), F = legs(aF, kF);
  const shoe = (l, col) => `<g transform="translate(${l.ax} ${l.ay}) rotate(${-l.fa * 40})"><path d="M-26 -8 Q-24 -28 10 -24 L48 -14 Q66 -6 60 10 L-28 12Z" fill="${col}" ${S(4)}/></g>`;
  let s = `<g transform="translate(0 ${bob})">`;
  // far leg (darker)
  s += limb(`M0 -8 L${F.kx} ${F.ky} L${F.ax} ${F.ay}`, 58, '#23272d') + shoe(F, '#121315');
  // far arm (hand in pocket, slight swing)
  s += `<g transform="rotate(${lean})">`;
  s += limb(`M-6 -420 L${-18 + 6 * Math.sin(TAU * pw)} -250 L18 -98`, 48, '#1e2a38');
  // torso (jacket)
  s += `<path d="M-74 10 L72 10 L84 -372 Q76 -462 14 -472 L-40 -462 Q-92 -424 -84 -300Z" fill="url(#jacket)" ${S(6)}/>`;
  s += `<path d="M14 -472 L40 -400 L74 -380" ${LN(4, '#1b2430')}/><path d="M-60 -60 L66 -60" ${LN(4, '#1b2430', .6)}/>`;
  // neck + head (profile)
  s += `<path d="M4 -462 L16 -512 L58 -512 L64 -458Z" fill="#c39270" ${S(5)}/>`;
  s += `<path d="M-20 -480 Q20 -500 70 -470 L60 -440 Q20 -462 -14 -450Z" fill="url(#sweater)" ${S(4)}/>`;
  s += `<g transform="translate(36 -610) rotate(${o.headTilt || 0})">${yusufProfile(o)}</g>`;
  // near arm (hand in pocket)
  s += limb(`M18 -416 L${34 - 8 * Math.sin(TAU * pw)} -250 L52 -96`, 50, '#2c3a4c');
  s += `<path d="M20 -110 L84 -110 L80 -84 L24 -86Z" fill="#1b2430" ${S(3)}/>`; // pocket edge
  s += `</g>`;
  // near leg (left, braced knee, stiffer)
  s += limb(`M10 -8 L${N.kx + 10} ${N.ky} L${N.ax + 10} ${N.ay}`, 62, '#2e333a') + shoe({ ax: N.ax + 10, ay: N.ay, fa: N.fa }, '#17181a');
  s += `</g>`;
  return s;
}
// profile head facing right, origin head centre
function yusufProfile(o = {}) {
  const grim = o.grim || 0;
  let s = '';
  s += `<path d="M-84 -30 C-90 -112 -22 -142 30 -138 C82 -134 104 -98 106 -52 L108 -22 L128 16 L108 26 C112 44 106 60 98 66 C100 86 88 106 64 114 C38 122 8 118 -22 102 C-52 86 -74 50 -84 -30Z" fill="${SKIN_Y}" ${S(6)}/>`;
  s += `<path d="M-30 40 C-20 90 20 116 64 114 C88 106 100 86 98 66 C80 80 50 84 20 76 C-4 70 -20 56 -30 40Z" fill="#9a938a" opacity=".55"/><path d="M-30 40 C-20 90 20 116 64 114 C88 106 100 86 98 66 C80 80 50 84 20 76 C-4 70 -20 56 -30 40Z" fill="url(#stub)"/>`;
  s += `<path d="M-88 -22 C-96 -116 -22 -150 36 -142 C84 -136 104 -104 104 -72 C84 -86 44 -94 14 -88 C-16 -82 -36 -54 -42 -14 L-60 30 C-80 20 -88 0 -88 -22Z" fill="#57524c" ${S(6)}/>`;
  s += `<path d="M-60 -110 q30 -20 70 -16 M-74 -80 q20 -24 50 -30 M10 -132 q40 -2 70 22 M-50 -40 q2 -20 14 -36" ${LN(3.5, '#a8a096')}/>`;
  s += `<path d="M-46 -20 C-40 -40 -30 -48 -20 -50 L-22 -10Z" fill="#aaa399"/>`; // grey temple
  s += `<ellipse cx="-24" cy="10" rx="18" ry="28" fill="${SKIN_Y}" ${S(4)}/><path d="M-30 0 q8 10 0 20" ${LN(3, INK, .6)}/>`;
  s += `<path d="M54 ${-52 - grim * 4} Q76 ${-62 + grim * 4} 98 -54" ${LN(9, '#3a3531')}/>`;
  s += `<path d="M66 -26 Q80 -34 94 -26 Q80 -20 66 -26Z" fill="#f4f0e8" ${S(3)}/><circle cx="86" cy="-26" r="5" fill="#2a1f18"/>`;
  s += `<path d="M64 -30 Q80 -40 96 -30" ${LN(5)}/><path d="M70 -8 Q82 -4 92 -10" ${LN(2.5, INK, .5)}/>`;
  s += `<path d="M78 76 Q92 ${74 + grim * 6} 100 ${70 + grim * 4}" ${LN(4.5)}/>`;
  return s;
}
// Yusuf back view standing, origin = hip
function yusufBack() {
  let s = '';
  s += limb('M-40 0 L-46 220 L-50 430', 64, '#2e333a') + limb('M40 0 L48 220 L52 430', 64, '#2e333a');
  s += `<path d="M-90 450 q20 -26 60 -16 l4 22 h-66Z M30 446 q40 -10 60 16 h-62Z" fill="#121315" ${S(4)}/>`;
  s += `<path d="M-160 20 L160 20 L170 -380 Q140 -470 60 -480 L-60 -480 Q-140 -470 -170 -380Z" fill="url(#jacket)" ${S(6)}/>`;
  s += `<path d="M0 -470 L0 20" ${LN(3, '#1b2430', .7)}/><path d="M-60 -480 Q0 -500 60 -480 L50 -450 Q0 -468 -50 -450Z" fill="#2c3a4c" ${S(4)}/>`;
  s += limb('M-150 -400 L-176 -220 L-160 -70', 52, '#2c3a4c') + limb('M150 -400 L176 -220 L160 -70', 52, '#2c3a4c');
  s += `<path d="M-34 -470 L-30 -520 L30 -520 L34 -470Z" fill="#c39270" ${S(5)}/>`;
  s += `<ellipse cx="-96" cy="-600" rx="18" ry="30" fill="${SKIN_Y}" ${S(4)}/><ellipse cx="96" cy="-600" rx="18" ry="30" fill="${SKIN_Y}" ${S(4)}/>`;
  s += `<path d="M-100 -610 C-104 -700 -50 -740 0 -740 C50 -740 104 -700 100 -610 C98 -560 70 -520 0 -514 C-70 -520 -98 -560 -100 -610Z" fill="#57524c" ${S(6)}/>`;
  s += `<path d="M-60 -560 Q0 -540 60 -560 M-80 -620 q20 -40 60 -60 M20 -690 q40 6 60 40 M-30 -600 q30 -20 70 -10" ${LN(3.5, '#a8a096')}/>`;
  s += `<path d="M-96 -590 C-98 -560 -80 -530 -60 -520 L-70 -600Z M96 -590 C98 -560 80 -530 60 -520 L70 -600Z" fill="#aaa399"/>`;
  return s;
}
// small generic standing figure helpers
function bodyStand(col, legCol = '#33363b', w = 150) {
  let s = '';
  s += limb(`M-30 0 L-34 200 L-36 380`, 52, legCol) + limb(`M30 0 L34 200 L36 380`, 52, legCol);
  s += `<path d="M-70 396 q14 -22 50 -14 v20 h-52Z M20 382 q36 -8 50 14 h-50Z" fill="#141516" ${S(4)}/>`;
  s += `<path d="M${-w / 2 - 10} 20 L${w / 2 + 10} 20 L${w / 2 + 16} -360 Q${w / 2} -430 40 -440 L-40 -440 Q${-w / 2} -430 ${-w / 2 - 16} -360Z" fill="${col}" ${S(6)}/>`;
  s += `<path d="M-30 -440 L-30 -490 L30 -490 L30 -440Z" fill="#c9946f" ${S(4)}/>`;
  return s;
}

// =============================== SHOTS ===============================
// S1 — İmza
let SIG = null;
function initSig() {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg'); const p = document.createElementNS(ns, 'path');
  p.setAttribute('d', 'M572 1222 C580 1160 626 1160 618 1214 C614 1246 592 1236 604 1206 C616 1176 650 1184 656 1214 C662 1236 676 1196 692 1188 C708 1180 714 1220 730 1210 C746 1200 752 1170 774 1184 C790 1196 782 1222 806 1212 C826 1202 838 1180 860 1196');
  svg.appendChild(p); document.body.appendChild(svg);
  const L = p.getTotalLength(); const pts = [];
  for (let i = 0; i <= 400; i++) { const q = p.getPointAtLength(L * i / 400); pts.push([q.x, q.y]); }
  SIG = { d: p.getAttribute('d'), L, pts }; svg.remove();
}
function shot1(u) { // 0..6.6
  if (!SIG) initSig();
  const z = 1 + .10 * E(u / 6.6);
  const p = E(C((u - 1.2) / 1.9));
  const tip = SIG.pts[Math.round(p * 400)];
  let lift = u < 1.2 ? 1 - E((u - .3) / .9) : (u < 3.1 ? 0 : E((u - 3.1) / .5));
  const hx = tip[0] + 80 * lift, hy = tip[1] - 130 * lift, sc = 1 + .07 * lift;
  const jit = (u > 1.2 && u < 3.1) ? Math.sin(u * 60) * 1.4 : 0;
  let s = `<g transform="${camT(540, 1000, z, -30 * E(u / 6.6), -40 * E(u / 6.6))}">`;
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="url(#walnut)"/>`;
  s += `<g ${LN(3, '#2e1c10', .5)}><path d="M-200 300 Q300 280 1280 340"/><path d="M-200 760 Q500 720 1280 800"/><path d="M-200 1500 Q400 1460 1280 1540"/><path d="M-200 1850 Q600 1800 1280 1880"/></g>`;
  s += `<g transform="rotate(-6 540 1000)"><rect x="90" y="430" width="900" height="1180" rx="18" fill="#2a1e1a" stroke="#1a120e" stroke-width="6"/><rect x="110" y="450" width="860" height="1140" rx="12" fill="none" stroke="#7a5a3c" stroke-width="3" stroke-dasharray="10 8" opacity=".6"/></g>`;
  s += `<g transform="translate(40 230)"><ellipse cx="80" cy="110" rx="120" ry="40" fill="#000" opacity=".35" filter="url(#blur)"/><ellipse cx="80" cy="80" rx="120" ry="44" fill="#fbf7ee" ${S(4)}/><ellipse cx="80" cy="66" rx="64" ry="22" fill="#fbf7ee" ${S(4)}/><ellipse cx="80" cy="64" rx="52" ry="16" fill="#3b2216"/></g>`;
  s += `<g transform="rotate(-6 540 1000)">`;
  s += `<rect x="174" y="538" width="760" height="1000" fill="#000" opacity=".35" filter="url(#blur)"/>`;
  s += `<rect x="160" y="520" width="760" height="1000" fill="url(#paper)" ${S(4)}/>`;
  s += crest(540, 612, 40);
  s += `<text x="540" y="694" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="4" fill="${INK}">DEVİR SÖZLEŞMESİ</text>`;
  s += `<text x="540" y="728" text-anchor="middle" font-family="Inter" font-weight="600" font-size="20" letter-spacing="3" fill="#6b625a">KARAOCAK DEMİRSPOR</text>`;
  s += `<line x1="230" y1="752" x2="850" y2="752" ${LN(2)}/>`;
  s += `<g fill="#b9b1a2">${[[790, 600], [818, 560], [846, 610], [874, 420], [920, 590], [948, 600], [976, 500], [1022, 610], [1050, 380], [1330, 610], [1358, 480]].map(([y, w]) => `<rect x="230" y="${y}" width="${w}" height="10" rx="5"/>`).join('')}</g>`;
  s += `<text x="230" y="1150" font-family="Inter" font-weight="700" font-size="22" fill="${INK}">Devreden</text><text x="560" y="1150" font-family="Inter" font-weight="700" font-size="22" fill="${INK}">Devralan</text>`;
  s += `<path d="M232 1214 q30 -40 60 -6 q20 18 46 -10 q20 -16 40 4" stroke="#3a4c7a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"/>`;
  s += `<line x1="230" y1="1240" x2="480" y2="1240" ${LN(2)}/><line x1="560" y1="1240" x2="850" y2="1240" ${LN(2)}/>`;
  s += `<text x="560" y="1272" font-family="Inter" font-weight="600" font-size="18" fill="#6b625a">K. SEZER</text>`;
  s += `<path d="${SIG.d}" stroke="#1d2a52" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${SIG.L}" stroke-dashoffset="${SIG.L * (1 - p)}"/>`;
  s += `<g transform="translate(${hx + 40 + 60 * lift} ${hy + 50 + 90 * lift}) scale(${sc}) rotate(-38)" opacity="${.3 - .12 * lift}" filter="url(#blur)">${hPenV2('#000', '#000', '#000')}</g>`;
  s += `<g transform="translate(${hx + jit} ${hy}) scale(${sc}) rotate(-38)">${hPenV2(SKIN_K, 'url(#suit)')}</g>`;
  s += `</g></g>`;
  s += `<rect width="1080" height="1920" fill="url(#lamp)"/>`;
  return s;
}

// S2a — Basın (wide)
function scarf(x1, y1, x2, y2, sag, t) {
  const n = 14; let s = ''; const th = 62;
  const P = (k) => { const x = lerp(x1, x2, k), y = lerp(y1, y2, k) + sag * 4 * k * (1 - k) + Math.sin(k * 9 + t * 6) * 5; return [x, y]; };
  for (let i = 0; i < n; i++) {
    const a = P(i / n), b = P((i + 1) / n);
    s += `<polygon points="${poly([[a[0], a[1] - th / 2], [b[0], b[1] - th / 2], [b[0], b[1] + th / 2], [a[0], a[1] + th / 2]])}" fill="${i % 2 ? INK : ORANGE}"/>`;
  }
  const pts = []; for (let i = 0; i <= n; i++) pts.push(P(i / n));
  s += `<path d="${pts2d(pts.map(p => [p[0], p[1] - th / 2]))}" ${LN(4)}/><path d="${pts2d(pts.map(p => [p[0], p[1] + th / 2]))}" ${LN(4)}/>`;
  const mid = P(.5); s += `<text x="${mid[0]}" y="${mid[1] + 11}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" letter-spacing="4" fill="#f4efe2">KARAOCAK</text>`;
  for (const [ex, ey, dir] of [[x1, y1, -1], [x2, y2, 1]]) for (let k = 0; k < 6; k++) s += `<line x1="${ex}" y1="${ey - 26 + k * 10}" x2="${ex + dir * 26}" y2="${ey - 24 + k * 10 + 6}" ${LN(3, ORANGE)}/>`;
  return s;
}
function shot2a(u) { // 0..4.8
  const z = 1 + .05 * E(u / 4.8);
  let s = `<g transform="${camT(540, 900, z)}">`;
  // hall
  s += `<rect width="1080" height="1920" fill="#3b3430"/>`;
  for (let x = 0; x < 1080; x += 135) s += `<rect x="${x + 8}" y="200" width="119" height="900" fill="#4a3f38" ${S(3)}/>`;
  s += `<rect x="0" y="1100" width="1080" height="820" fill="#2c2622"/>`;
  // old banner
  s += `<g transform="rotate(-1 540 420)"><rect x="160" y="250" width="760" height="340" fill="#d8cdb6" ${S(5)}/><path d="M160 250 L920 250" ${LN(10, '#8a7a5c')}/>`;
  s += crest(330, 420, 110, .85) + `<text x="660" y="400" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="${INK}" opacity=".8">KARAOCAK</text><text x="660" y="470" text-anchor="middle" font-family="Inter" font-weight="800" font-size="44" letter-spacing="6" fill="${ORANGE}" opacity=".8">DEMİRSPOR</text>`;
  s += `<path d="M300 260 l40 330 M700 255 l-30 335" ${LN(3, '#9a8f78', .6)}/></g>`;
  s += `<ellipse cx="540" cy="800" rx="460" ry="560" fill="#ffd590" opacity=".14" filter="url(#blur2)"/>`;
  // Kerem raises scarf
  const raise = E((u - .2) / .8);
  const lx = lerp(-150, -250, raise), ly = lerp(430, -250, raise), rx = -lx, ry = ly;
  s += `<g transform="translate(540 760) scale(1.25)">`;
  s += keremBody();
  s += limb(`M-180 300 L${(lx - 180) / 2 - 40 * raise} ${(ly + 300) / 2 + 30} L${lx} ${ly}`, 64, '#30333b');
  s += limb(`M180 300 L${(rx + 180) / 2 + 40 * raise} ${(ry + 300) / 2 + 30} L${rx} ${ry}`, 64, '#30333b');
  s += `<g transform="translate(0 ${-raise * 6})">${keremHead({ smile: 1, mouth: (u > .8 && u < 2.8) ? (.5 + .5 * Math.sin(u * 22)) * .8 : 0, brow: raise })}</g>`;
  s += scarf(lx - 30, ly - 40, rx + 30, ry - 40, lerp(40, 10, raise), u);
  s += `<g transform="translate(${lx} ${ly - 40}) scale(.75)">${hFist(SKIN_K)}</g><g transform="translate(${rx} ${ry - 40}) scale(-.75 .75)">${hFist(SKIN_K)}</g>`;
  s += `</g>`;
  // table + mics
  s += `<rect x="40" y="1300" width="1000" height="40" fill="#5a3a24" ${S(5)}/><rect x="60" y="1340" width="960" height="320" fill="#2f4a3a" ${S(5)}/>`;
  for (const [x, c] of [[400, '#c0392b'], [520, '#2a2420'], [650, '#2f5a9a']]) s += `<path d="M${x} 1300 L${x + 30} 1150" ${LN(6, '#1a1a1a')}/><rect x="${x + 14}" y="1110" width="40" height="56" rx="18" fill="#222" ${S(3)}/><rect x="${x + 12}" y="1150" width="44" height="24" fill="${c}" ${S(2)}/>`;
  s += `</g>`;
  // journalists foreground silhouettes + cameras
  const cams = [[150, 1720, 1], [420, 1800, 0], [760, 1700, 1], [980, 1820, 0]];
  for (const [x, y, cam] of cams) {
    s += `<path d="M${x - 170} 1920 C${x - 160} ${y + 60} ${x - 80} ${y + 10} ${x} ${y + 10} C${x + 80} ${y + 10} ${x + 160} ${y + 60} ${x + 170} 1920Z" fill="#141210"/><circle cx="${x}" cy="${y - 70}" r="74" fill="#141210"/>`;
    if (cam) s += `<rect x="${x - 70}" y="${y - 250}" width="140" height="90" rx="10" fill="#1d1d1f" ${S(4)}/><circle cx="${x}" cy="${y - 205}" r="30" fill="#0b0b0c" stroke="#555" stroke-width="5"/><rect x="${x + 30}" y="${y - 275}" width="40" height="24" fill="#2a2a2c"/>`;
  }
  return s;
}
function flashAmt(t, list) { let f = 0; for (const ft of list) { const d = t - ft; if (d >= 0 && d < .35) f = Math.max(f, .8 * Math.exp(-d * 14)); } return f; }

// S2b — Kerem close-up; phone buzz; smile drops half a second
function shot2b(u) { // 0..3.6
  const drop = u > 1.65 && u < 2.35 ? 1 - Math.min(E((u - 1.65) / .12), E((2.35 - u) / .2)) : 1;
  const smile = 1 - (1 - drop) * .95;
  const z = 1 + .05 * E(u / 3.6);
  let s = `<g transform="${camT(540, 900, z)}">`;
  s += `<rect width="1080" height="1920" fill="#3b3430"/><rect x="0" y="0" width="1080" height="1920" fill="#4a3f38" opacity=".6"/>`;
  s += `<rect x="-40" y="120" width="560" height="300" fill="#d8cdb6" opacity=".45" filter="url(#blur)"/>${crest(150, 270, 90, .35)}`;
  s += `<ellipse cx="540" cy="800" rx="520" ry="620" fill="#ffd590" opacity=".16" filter="url(#blur2)"/>`;
  s += `<g transform="translate(540 760) scale(2.3)">${keremBody()}<g transform="translate(0 ${(1 - drop) * 3})">${keremHead({ smile, brow: smile })}</g>`;
  // phone in inner pocket buzzing (his left chest = viewer right)
  const buzz = u > 1.4 && u < 2.6;
  if (buzz) {
    const j = Math.sin(u * 90) * 1.5;
    s += `<g transform="translate(${118 + j} 400)"><rect x="-30" y="-46" width="60" height="92" rx="10" fill="#9cc3d8" opacity=".25" filter="url(#blurS)"/><path d="M-44 -30 q-10 30 0 60 M44 -30 q10 30 0 60 M-56 -40 q-14 40 0 80 M56 -40 q14 40 0 80" ${LN(3, '#d9e6ec', .8)}/></g>`;
  }
  s += `</g></g>`;
  return s;
}

// S3a — Salon medium: Yusuf big on sofa
function homeWall() {
  let s = `<rect width="1080" height="1920" fill="url(#homeWall)"/>`;
  for (let x = 40; x < 1080; x += 90) for (let y = 60; y < 1300; y += 110) s += `<path d="M${x} ${y} q10 -14 20 0 q-10 14 -20 0Z" fill="#6e766c" opacity=".55"/>`;
  return s;
}
function sofaBack() {
  return `<path d="M60 1090 Q70 1000 170 1000 L910 1000 Q1010 1000 1020 1090 L1020 1460 L60 1460Z" fill="#7a5b44" ${S(6)}/>
    <path d="M130 1110 q14 -60 90 -60 h270 q60 0 70 60 v170 h-430Z" fill="#8a6a50" ${S(5)}/><path d="M580 1110 q14 -60 90 -60 h270 q60 0 70 60 v170 h-430Z" fill="#86664c" ${S(5)}/>`;
}
function sofaFront() {
  return `<path d="M0 1260 q0 -70 80 -70 h40 q60 0 60 70 v400 h-180Z" fill="#6f523d" ${S(6)}/><path d="M900 1260 q0 -70 60 -70 h40 q80 0 80 70 v400 h-180Z" fill="#6f523d" ${S(6)}/>
    <rect x="120" y="1420" width="840" height="200" rx="18" fill="#8f6e53" ${S(6)}/><rect x="90" y="1600" width="900" height="140" fill="#6a4e3a" ${S(6)}/>`;
}
function yusufSitting(o = {}) { // origin head centre, scale ~1
  let s = '';
  s += yusufBodyHome();
  // legs (thighs toward viewer, shins down)
  s += `<path d="M-160 500 L-20 500 L-30 640 L-170 640Z" fill="#2e333a" ${S(6)}/><path d="M20 500 L160 500 L170 640 L30 640Z" fill="#2e333a" ${S(6)}/>`;
  s += `<path d="M-160 640 L-44 640 L-52 1000 L-150 1000Z" fill="#2e333a" ${S(6)}/><path d="M44 640 L160 640 L150 1000 L52 1000Z" fill="#2e333a" ${S(6)}/>`;
  s += `<rect x="42" y="600" width="124" height="96" rx="28" fill="#1f2326" ${S(5)}/><circle cx="104" cy="648" r="24" fill="#121416" ${S(4)}/><rect x="50" y="612" width="108" height="8" fill="#3d4448"/><rect x="50" y="676" width="108" height="8" fill="#3d4448"/>`;
  // right arm (viewer left) resting on thigh; left arm (viewer right) hand rubbing knee brace
  const rub = o.rub || 0;
  s += limb(`M-200 300 L-230 440 L-130 560`, 70, '#5f6763');
  s += `<g transform="translate(-118 566) scale(.6)">${hFist(SKIN_Y)}</g>`;
  s += limb(`M200 300 L236 450 L${120 + rub * 12} ${600 + rub * 6}`, 70, '#5f6763');
  s += `<g transform="translate(${108 + rub * 10} ${612 + rub * 5}) scale(-.6 .6)">${hFist(SKIN_Y)}</g>`;
  s += `<g transform="translate(0 ${o.nod || 0})">${yusufHead(o)}</g>`;
  s += `<path d="M-230 520 C-240 330 -190 230 -60 200 L-46 110 C-80 120 -102 60 -102 8 C-104 -62 -82 -128 0 -128 L0 520Z" fill="#9cc3d8" opacity="${o.tv || .1}"/>`;
  return s;
}
function shot3a(u, t) { // 0..3.0
  const z = 1 + .06 * E(u / 3);
  let s = `<g transform="${camT(540, 1100, z)}">` + homeWall();
  // window edge left with grey city
  s += `<rect x="-20" y="260" width="250" height="560" fill="url(#skyGrey)" ${S(6)}/><rect x="20" y="520" width="60" height="300" fill="#7b8180" ${S(3)}/><rect x="110" y="420" width="34" height="400" fill="#646a69" ${S(3)}/><path d="M-20 260 L230 260 L230 820 L-20 820" ${LN(10, '#4b3a2c')}/>`;
  s += `<path d="M150 230 L270 230 Q240 520 290 880 L150 880Z" fill="#8d6e5a" ${S(4)}/>`;
  // frame on wall right
  s += `<g transform="translate(880 440) scale(.6)">${goalPhoto()}</g>`;
  s += `<circle cx="120" cy="1000" r="300" fill="url(#warm)" opacity=".7"/>`;
  s += sofaBack();
  s += `<g transform="translate(540 760) scale(.95)">${yusufSitting({ look: -0.7, rub: Math.sin(u * 5), tv: .12 + .05 * Math.sin(t * 9) })}</g>`;
  s += sofaFront();
  // coffee table foreground
  s += `<polygon points="${poly([[60, 1760], [1020, 1760], [1080, 1860], [0, 1860]])}" fill="#7a5a3c" ${S(6)}/><rect x="0" y="1860" width="1080" height="60" fill="#5f4530"/>`;
  s += `<g transform="rotate(-6 300 1790)"><rect x="200" y="1740" width="220" height="110" fill="#efe9dc" ${S(4)}/><path d="M200 1740 L310 1800 L420 1740" ${LN(3)}/></g><g transform="rotate(9 360 1800)"><rect x="300" y="1760" width="200" height="100" fill="#e6dfcf" ${S(4)}/><rect x="420" y="1820" width="70" height="26" fill="none" stroke="#b8452b" stroke-width="4"/></g>`;
  s += `<g transform="rotate(-10 760 1800)"><rect x="700" y="1740" width="110" height="200" rx="16" fill="#1c1f22" ${S(4)}/><rect x="710" y="1752" width="90" height="176" rx="8" fill="#22303d"/></g>`;
  s += `<path d="M900 1800 l-12 -70 h60 l-12 70Z" fill="#b5642f" opacity=".85" ${S(4)}/>`;
  s += `<rect width="1080" height="1920" fill="#9cc3d8" opacity="${.08 + .04 * Math.sin(t * 9)}"/></g>`;
  return s;
}
// S3b / S3d — Yusuf close-up
function closeYusuf(o, t, wetBg) {
  let s = homeWall();
  s += `<rect x="740" y="200" width="380" height="300" fill="#5d4530" opacity=".55" filter="url(#blur)"/><circle cx="160" cy="380" r="260" fill="#f5c97e" opacity=".14" filter="url(#blur2)"/>`;
  s += `<rect x="0" y="1300" width="1080" height="620" fill="#7a5b44" opacity=".8"/>`;
  s += `<g transform="translate(540 ${1000 + (o.nod || 0) * 2.6}) scale(2.6)">${yusufBodyHome()}<g transform="translate(0 ${o.nod || 0})">${yusufHead(o)}</g></g>`;
  s += `<rect width="1080" height="1920" fill="#9cc3d8" opacity="${o.tv || .1}"/>`;
  return s;
}
function shot3b(u, t) { // 0..2.4 eyes down, muttering
  const mouth = (u > .2 && u < 2.2) ? Math.max(0, Math.sin(u * 16)) * .55 : 0;
  return `<g transform="${camT(540, 900, 1 + .04 * E(u / 2.4))}">${closeYusuf({ look: -1, mouth, tv: .1 + .04 * Math.sin(t * 9) }, t)}</g>`;
}
// S3c — TV broadcast (play)
const PL = {
  CM: { c: '#3f6fc4', path: [[0, 440, 960], [2.0, 430, 940]] },
  LB: { c: '#3f6fc4', path: [[0, 240, 990], [1.6, 330, 880], [2.6, 420, 800], [5, 430, 790]] },
  LW: { c: '#3f6fc4', path: [[0, 200, 760], [2.6, 190, 730], [5, 200, 720]] },
  ST: { c: '#3f6fc4', path: [[0, 560, 820], [2.4, 520, 780], [3.0, 520, 720], [3.4, 530, 690], [5, 535, 680]] },
  RW: { c: '#3f6fc4', path: [[0, 760, 860], [5, 720, 800]] },
  D1: { c: '#f1efe8', path: [[0, 260, 820], [2.4, 210, 760], [5, 205, 745]] },
  D2: { c: '#f1efe8', path: [[0, 450, 760], [2.6, 470, 770], [3.4, 500, 735], [5, 505, 730]] },
  D3: { c: '#f1efe8', path: [[0, 620, 760], [3.0, 580, 740], [5, 575, 735]] },
  D4: { c: '#f1efe8', path: [[0, 780, 790], [5, 760, 780]] },
  GK: { c: '#f2c14e', path: [[0, 540, 655], [3.4, 560, 656], [3.6, 590, 650], [5, 592, 650]] }
};
function at(path, u) {
  if (u <= path[0][0]) return [path[0][1], path[0][2]];
  for (let i = 1; i < path.length; i++) if (u <= path[i][0]) { const [t0, x0, y0] = path[i - 1], [t1, x1, y1] = path[i]; const k = E((u - t0) / (t1 - t0)); return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k]; }
  const l = path[path.length - 1]; return [l[1], l[2]];
}
function ballPos(u) {
  const p = (k, uu) => at(PL[k].path, uu);
  const l2 = (a, b, k) => { k = C(k); return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; };
  if (u < 1.4) { const q = p('CM', u); return [q[0] + 10, q[1] - 6]; }
  if (u < 1.9) return l2(p('CM', 1.4), p('LB', 1.9), (u - 1.4) / .5);
  if (u < 2.6) { const q = p('LB', u); return [q[0] + 12, q[1] - 8]; }
  if (u < 3.1) return l2(p('LB', 2.6), p('ST', 3.1), (u - 2.6) / .5);
  if (u < 3.35) { const q = p('ST', u); return [q[0] + 8, q[1] - 10]; }
  if (u < 3.6) return l2(p('ST', 3.35), [575, 614], (u - 3.35) / .25);
  return [575, 614];
}
function shot3c(uu) { // 0..4.4 ; play time scaled so goal lands at ~3.5
  const u = uu * 1.03;
  const goal = u >= 3.6;
  let s = `<rect width="1080" height="1920" fill="#0b0f13"/><ellipse cx="540" cy="870" rx="640" ry="560" fill="#6f9ab3" opacity="${goal ? .34 : .22}" filter="url(#blur2)"/>`;
  s += `<rect x="60" y="540" width="960" height="660" rx="24" fill="#15171a" stroke="#000" stroke-width="6"/>`;
  s += `<clipPath id="scr"><rect x="90" y="570" width="900" height="600" rx="10"/></clipPath><g clip-path="url(#scr)">`;
  const zB = 1.32 + .08 * E(u / 5);
  s += `<g transform="translate(540 870) scale(${zB}) translate(-470 -800)">`;
  s += `<rect x="40" y="520" width="1000" height="700" fill="url(#pitch)"/><rect x="40" y="520" width="1000" height="700" fill="url(#stripes)"/>`;
  s += `<g ${LN(4, '#e9f0e6', .85)}><path d="M60 640 L1000 640"/><path d="M370 640 L360 790 L720 790 L710 640"/><path d="M460 640 L456 690 L624 690 L620 640"/><path d="M440 790 Q540 850 640 790"/></g>`;
  s += `<rect x="490" y="604" width="100" height="36" fill="#fff" opacity=".18"/><path d="${goal && u < 4.2 ? 'M490 640 L490 604 Q540 590 590 604 L590 640' : 'M490 640 L490 604 L590 604 L590 640'}" stroke="#fff" stroke-width="5" fill="none"/>`;
  for (const k in PL) { const [x, y] = at(PL[k].path, u); s += `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="14" rx="14" ry="5" fill="#000" opacity=".35"/><rect x="-9" y="-16" width="18" height="28" rx="8" fill="${PL[k].c}" stroke="#111" stroke-width="2"/><circle cx="0" cy="-22" r="7" fill="#c9946f" stroke="#111" stroke-width="2"/></g>`; }
  const [bx, by] = ballPos(u); s += `<circle cx="${bx}" cy="${by}" r="8" fill="#fff" stroke="#111" stroke-width="2"/>`;
  s += `</g>`;
  s += `<g font-family="Inter" font-weight="800"><rect x="110" y="590" width="300" height="44" rx="6" fill="#111" opacity=".85"/><rect x="110" y="590" width="10" height="44" fill="#3f6fc4"/><text x="134" y="621" font-size="24" fill="#fff">MAV ${goal ? 1 : 0} - 0 BEY</text><text x="340" y="621" font-size="22" fill="#cfd6dc">${u < 2.5 ? "67'" : "68'"}</text></g>`;
  if (goal) s += `<g opacity="${C((u - 3.65) / .15)}"><rect x="90" y="1070" width="900" height="90" fill="#3f6fc4"/><text x="540" y="1132" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" letter-spacing="12" fill="#fff">GOL</text></g>`;
  s += `<rect x="90" y="570" width="900" height="600" fill="#fff" opacity=".04"/></g>`;
  s += `<rect x="90" y="570" width="900" height="600" rx="10" fill="none" stroke="#000" stroke-width="4"/><circle cx="540" cy="1184" r="5" fill="#d0503c"/>`;
  // dim room edge: corner of sofa arm + knee brace at bottom (he is NOT looking at the screen)
  s += `<path d="M-20 1920 L-20 1500 Q120 1440 300 1480 L340 1920Z" fill="#2b211b"/><path d="M640 1920 Q680 1640 860 1600 Q1000 1580 1100 1640 L1100 1920Z" fill="#1a1d20"/><rect x="760" y="1650" width="180" height="120" rx="34" fill="#0f1113" stroke="#2c3236" stroke-width="5"/><circle cx="850" cy="1710" r="26" fill="#090a0b" stroke="#2c3236" stroke-width="4"/>`;
  return s;
}
function shot3d(u, t) { // 0..2.6 goal light, looks up a little, single nod, no smile
  const look = lerp(-1, .15, E((u - .1) / .5));
  const nod = u > 1.1 && u < 1.9 ? Math.sin((u - 1.1) / .8 * Math.PI) * 7 : 0;
  const tv = u < .9 ? .26 - u * .16 : .1;
  return `<g transform="${camT(540, 900, 1.04 + .03 * E(u / 2.6))}">${closeYusuf({ look, nod, tv: tv + .03 * Math.sin(t * 11) }, t)}</g>`;
}

// S4 — phone
function phoneArt(mode, ringT) {
  let s = `<rect x="-200" y="-410" width="400" height="820" rx="52" fill="#15181b" stroke="#000" stroke-width="6"/>`;
  s += `<clipPath id="pc"><rect x="-190" y="-400" width="380" height="800" rx="44"/></clipPath><g clip-path="url(#pc)">`;
  if (mode === 'lock') {
    s += `<rect x="-190" y="-400" width="380" height="800" fill="url(#phoneScreen)"/>`;
    s += `<text x="0" y="-250" text-anchor="middle" font-family="Inter" font-weight="300" font-size="96" fill="#e9eef2">21:47</text><text x="0" y="-200" text-anchor="middle" font-family="Inter" font-weight="500" font-size="22" fill="#b9c4cc">Salı</text>`;
    s += `<rect x="-170" y="-130" width="340" height="110" rx="22" fill="#e9eef2" opacity=".93"/><circle cx="-128" cy="-75" r="24" fill="#4caf6a"/><text x="-92" y="-88" font-family="Inter" font-weight="800" font-size="26" fill="#14181c">Kero</text><text x="-92" y="-52" font-family="Inter" font-weight="500" font-size="22" fill="#4a535a">3 cevapsız arama</text>`;
    s += `<rect x="-170" y="-6" width="340" height="128" rx="22" fill="#e9eef2" opacity=".93"/><circle cx="-128" cy="44" r="24" fill="#3f6fc4"/><rect x="-140" y="34" width="24" height="18" rx="4" fill="#fff"/><text x="-92" y="30" font-family="Inter" font-weight="800" font-size="26" fill="#14181c">Ömer</text><text x="-92" y="66" font-family="Inter" font-weight="500" font-size="21" fill="#4a535a">Baba, cumartesi</text><text x="-92" y="94" font-family="Inter" font-weight="500" font-size="21" fill="#4a535a">geliyor musun?</text><circle cx="148" cy="20" r="8" fill="#3f6fc4"/>`;
  } else {
    s += `<rect x="-190" y="-400" width="380" height="800" fill="url(#callScreen)"/>`;
    for (const off of [0, .5]) { const ph = (ringT + off) % 1; s += `<circle cx="0" cy="-150" r="${80 + ph * 70}" fill="none" stroke="#bfe6c9" stroke-width="4" opacity="${1 - ph}"/>`; }
    s += `<circle cx="0" cy="-150" r="78" fill="#cfd6dc"/><text x="0" y="-122" text-anchor="middle" font-family="Inter" font-weight="800" font-size="78" fill="#2d4a3a">K</text><text x="0" y="-20" text-anchor="middle" font-family="Inter" font-weight="800" font-size="52" fill="#fff">Kero</text><text x="0" y="20" text-anchor="middle" font-family="Inter" font-weight="500" font-size="24" fill="#b9d6c2">arıyor…</text>`;
    s += `<circle cx="-100" cy="280" r="46" fill="#d0503c"/><path d="M-122 284 q22 -18 44 0" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="100" cy="280" r="46" fill="#4caf6a"/><path d="M80 270 q4 -8 10 -3 l6 8 q3 5 -3 8 q8 13 19 19 q3 -6 8 -3 l8 6 q5 5 -3 10 q-19 8 -45 -45Z" fill="#fff"/>`;
  }
  s += `</g><rect x="-60" y="-394" width="120" height="22" rx="11" fill="#000"/>`;
  return s;
}
function tableTop() {
  let s = `<rect x="-200" y="-200" width="1480" height="2320" fill="url(#tableWood)"/><g ${LN(3, '#3a2a1c', .45)}><path d="M-200 500 Q500 470 1280 540"/><path d="M-200 1300 Q600 1260 1280 1330"/><path d="M-200 1700 Q500 1660 1280 1720"/></g>`;
  s += `<g transform="rotate(-14 230 520)"><rect x="40" y="400" width="380" height="230" fill="#efe9dc" ${S(5)}/><path d="M40 400 L230 530 L420 400" ${LN(4)}/><rect x="270" y="560" width="120" height="42" fill="none" stroke="#b8452b" stroke-width="5"/><text x="330" y="590" text-anchor="middle" font-family="Inter" font-weight="800" font-size="18" fill="#b8452b">SON ÖDEME</text></g>`;
  s += `<g transform="rotate(10 160 1500)"><rect x="-40" y="1380" width="360" height="220" fill="#e6dfcf" ${S(5)}/><path d="M-40 1380 L140 1500 L320 1380" ${LN(4)}/></g>`;
  s += `<g transform="translate(900 470)"><ellipse cx="0" cy="70" rx="110" ry="34" fill="#d7d2c4" ${S(5)}/><ellipse cx="0" cy="0" rx="62" ry="22" fill="#b5642f" ${S(5)}/><ellipse cx="-14" cy="-4" rx="20" ry="5" fill="#fff" opacity=".35"/></g>`;
  return s;
}
function shot4a(u) { // 0..4.2
  const z = 1 + .08 * E(u / 4.2);
  return `<g transform="${camT(540, 960, z)}">${tableTop()}<g transform="translate(566 1034) rotate(-6)" opacity=".45" filter="url(#blur)"><rect x="-190" y="-400" width="380" height="800" rx="44" fill="#000"/></g><g transform="translate(540 1000) rotate(-6)">${phoneArt('lock', 0)}</g></g>`;
}
function shot4b(u) { // 0..3.0 — rings, hand grabs, lifts
  const z = 1.08;
  const buzz = u < 1.5 ? (Math.floor(u * 4) % 2 === 0 ? Math.sin(u * 140) * 5 : 0) : 0;
  const reach = E((u - 1.3) / .6), lift = E((u - 2.0) / .9);
  const px = 540 + buzz, py = 1000 - 1300 * lift, rot = -6 + buzz * .4;
  let s = `<g transform="${camT(540, 960, z)}">${tableTop()}`;
  s += `<g transform="translate(${566} ${1034}) rotate(-6)" opacity="${.45 * (1 - lift)}" filter="url(#blur)"><rect x="-190" y="-400" width="380" height="800" rx="44" fill="#000"/></g>`;
  s += `<g transform="translate(${px} ${py}) rotate(${rot})">${phoneArt('call', u)}`;
  if (u > 1.2) s += `<g transform="translate(0 ${-280 - 700 * (1 - reach)}) rotate(-90) scale(1.5)">${hGrip(SKIN_Y, 'url(#sweater)', 150)}</g>`;
  s += `</g></g>`;
  return s;
}
// S4c — split screen call
function shot4c(u, t) { // 0..10.6
  const talkK = (a, b) => (u > a && u < b) ? Math.max(0, Math.sin(u * 19)) * .8 : 0;
  const kM = talkK(.2, 2.9) + talkK(5.8, 7.6) + talkK(8.4, 10.3);
  const yM = talkK(3.2, 5.5);
  const kSpeak = kM > 0 || (u < 3 || (u > 5.7));
  let s = '';
  // TOP: Kerem in office
  s += `<clipPath id="top"><rect x="0" y="0" width="1080" height="950"/></clipPath><g clip-path="url(#top)">`;
  s += `<image href="${IMG_OFFICE}" x="-80" y="-330" width="1240" height="2204" preserveAspectRatio="none"/>`;
  s += `<g transform="translate(560 ${470 + Math.sin(t * 1.3) * 3}) scale(1.15) rotate(-4)">${keremBody()}<g>${keremHead({ smile: u > 7.8 && u < 8.6 ? .45 : .9, mouth: kM })}</g><g transform="translate(-160 46) rotate(-42)"><rect x="-40" y="-90" width="80" height="180" rx="14" fill="#15181b" ${S(4)}/><g transform="scale(-1 1)">${hGrip(SKIN_K, 'url(#suit)', 80)}</g></g></g>`;
  s += `<rect width="1080" height="950" fill="#000" opacity="${kSpeak ? 0 : .22}"/></g>`;
  // BOTTOM: Yusuf at home
  s += `<clipPath id="bot"><rect x="0" y="970" width="1080" height="950"/></clipPath><g clip-path="url(#bot)">`;
  s += `<image href="${IMG_HOME}" x="-200" y="250" width="1400" height="2489" preserveAspectRatio="none"/>`;
  s += `<rect x="0" y="970" width="1080" height="950" fill="#0e1214" opacity=".18"/>`;
  const yLook = u > 8.6 ? -0.6 : 0;
  s += `<g transform="translate(560 1300) scale(1.15)">${yusufBodyHome()}<g>${yusufHead({ look: yLook, mouth: yM, blink: (u > 6.1 && u < 6.25) ? 1 : 0 })}</g><g transform="translate(-160 46) rotate(-42)"><rect x="-40" y="-90" width="80" height="180" rx="14" fill="#15181b" ${S(4)}/><g transform="scale(-1 1)">${hGrip(SKIN_Y, 'url(#sweater)', 80)}</g></g></g>`;
  s += `<rect x="0" y="970" width="1080" height="950" fill="#000" opacity="${yM > 0 || (u > 3 && u < 5.7) ? 0 : .22}"/></g>`;
  s += `<rect x="0" y="950" width="1080" height="20" fill="#0b0b0c"/>`;
  return s;
}
// S4d — jacket off the hook, push into the photo
function goalPhoto() {
  let s = `<rect x="-230" y="-180" width="460" height="360" fill="#7a5a3c" ${S(6)}/><rect x="-200" y="-150" width="400" height="300" fill="#d4c8ad"/>`;
  s += `<clipPath id="ph"><rect x="-200" y="-150" width="400" height="300"/></clipPath><g clip-path="url(#ph)">`;
  s += `<rect x="-200" y="-150" width="400" height="140" fill="#a99c82"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${-200 + (i % 20) * 21 + (i > 19 ? 10 : 0)}" cy="${-120 + (i > 19 ? 34 : 0)}" r="9" fill="#8a7d66"/>`;
  s += `<rect x="-200" y="-10" width="400" height="160" fill="#8f8e66"/>`;
  s += `<g transform="translate(0 70) scale(.42)">`;
  s += limb('M-60 60 L-120 -170', 60, ORANGE) + limb('M60 60 L120 -170', 60, ORANGE);
  s += `<path d="M-90 80 L90 80 L80 340 L-80 340Z" fill="${ORANGE}" ${S(6)}/><rect x="-86" y="150" width="172" height="34" fill="${INK}"/><text x="0" y="280" text-anchor="middle" font-family="Inter" font-weight="900" font-size="80" fill="${INK}">7</text>`;
  s += `<g transform="translate(0 -80)">${yusufHead({ young: true })}</g></g>`;
  s += `<rect x="-200" y="-150" width="400" height="300" fill="#f0d9a8" opacity=".25"/></g>`;
  s += `<path d="M-200 -150 L200 150" ${LN(2, '#fff', .2)}/>`;
  return s;
}
function shot4c2(u) { // the unread message, once more
  let s = `<g transform="${camT(540, 960, 1.15 + .05 * E(u / .9))}"><rect width="1080" height="1920" fill="#5d4433"/><path d="M0 1200 Q540 1100 1080 1200 L1080 1920 L0 1920Z" fill="#6f523d"/>`;
  s += `<g transform="translate(540 980) rotate(8)"><rect x="-200" y="-410" width="400" height="820" rx="52" fill="#15181b" stroke="#000" stroke-width="6"/><rect x="-190" y="-400" width="380" height="800" rx="44" fill="url(#phoneScreen)"/>`;
  s += `<rect x="-170" y="-120" width="340" height="150" rx="22" fill="#e9eef2" opacity=".93"/><circle cx="-128" cy="-60" r="24" fill="#3f6fc4"/><text x="-92" y="-74" font-family="Inter" font-weight="800" font-size="28" fill="#14181c">Ömer</text><text x="-92" y="-38" font-family="Inter" font-weight="500" font-size="22" fill="#4a535a">Baba, cumartesi</text><text x="-92" y="-8" font-family="Inter" font-weight="500" font-size="22" fill="#4a535a">geliyor musun?</text><circle cx="148" cy="-96" r="9" fill="#3f6fc4"/>`;
  s += `<text x="0" y="90" text-anchor="middle" font-family="Inter" font-weight="700" font-size="24" fill="#9fb0bc">1 okunmamış mesaj</text></g></g>`;
  return s;
}
function shot4d(u) { // 0..3.2
  const grab = E((u - .2) / .5), pull = E((u - .8) / .7);
  const push = E((u - 1.4) / 1.8);
  let s = `<g transform="${camT(430, 820, 1 + push * .9)}">` + homeWall();
  s += `<g transform="translate(430 820) scale(1.6)">${goalPhoto()}</g>`;
  // hook + jacket
  s += `<rect x="830" y="560" width="90" height="26" rx="6" fill="#6b5038" ${S(4)}/><path d="M875 586 q0 30 -20 30" ${LN(7, '#8a8f93')}/>`;
  const jx = 875 + pull * 700, jy = 616 - pull * 120;
  s += `<g transform="translate(${jx} ${jy}) rotate(${pull * 14})"><path d="M-130 0 Q0 -30 130 0 L170 560 L-170 560Z" fill="url(#jacket)" ${S(6)}/><path d="M-40 -6 L0 120 L40 -6" ${LN(5, '#1b2430')}/><path d="M-110 300 h60 M50 300 h60" ${LN(4, '#1b2430')}/>`;
  if (u > .1) s += `<g transform="translate(30 ${-20 - 300 * (1 - grab)}) rotate(20) scale(1.1)">${handGrab(SKIN_Y, 'url(#sweater)')}</g>`;
  s += `</g></g>`;
  return s;
}

// S5 — city & walk
function cityBack(scroll, t, sky = 'url(#skyGrey)') {
  let s = `<rect width="1080" height="1920" fill="${sky}"/>`;
  s += `<g transform="translate(${-scroll * .3} 0)">${chimneys([{ x: 120, w: 60, top: 380 }, { x: 420, w: 44, top: 520 }, { x: 860, w: 70, top: 330 }, { x: 1300, w: 50, top: 450 }], t, '#6e7473', '#a9a9a2', 1100)}`;
  let saw = 'M-100 1100 L-100 980'; for (let x = -100; x < 1600; x += 120) saw += ` L${x + 90} 910 L${x + 90} 980 L${x + 120} 980`; saw += ' L1600 1100Z';
  s += `<path d="${saw}" fill="#8b918f" ${S(4)}/>`;
  // factory whistle steam at 0.2-1.4s
  const st = C((t - .2) / 1.2);
  if (t > .2 && t < 2.2) s += `<g opacity="${1 - st * .6}" fill="#eeeee9">${[0, 1, 2, 3].map(i => `<circle cx="${560 + i * 26 * st}" cy="${905 - i * 40 * st}" r="${14 + 22 * st + i * 6}"/>`).join('')}</g><rect x="548" y="900" width="24" height="16" fill="#555" ${S(3)}/>`;
  s += `</g>`;
  s += `<g transform="translate(${-scroll * .6} 0)">`;
  const r = rng(31);
  for (let i = 0; i < 16; i++) { const x = i * 130 - 100, h = 280 + r() * 260; s += `<rect x="${x}" y="${1300 - h}" width="124" height="${h}" fill="${i % 2 ? '#7c8281' : '#727877'}" ${S(4)}/>`; for (let k = 0; k < 6; k++) for (let j = 0; j < 3; j++) s += `<rect x="${x + 14 + j * 36}" y="${1320 - h + k * 44}" width="20" height="24" fill="#5d6362"/>`; }
  s += `</g>`;
  return s;
}
function shot5a(u, t) { // 0..6.2 — wide: city, workers, mural, Yusuf walking
  let s = cityBack(u * 30, u);
  // street + wall with faded mural
  s += `<rect x="0" y="1300" width="1080" height="200" fill="#9a9a94" ${S(4)}/>`;
  s += `<rect x="560" y="1080" width="480" height="240" fill="#a7a49b" ${S(4)}/>`;
  s += crest(800, 1196, 96, .78) + `<path d="M620 1110 l30 200 M980 1100 l-20 220" ${LN(3, '#8e8b82', .7)}/>`;
  s += `<rect x="0" y="1500" width="1080" height="420" fill="#6f706c"/><rect x="0" y="1500" width="1080" height="18" fill="#8d8e89"/>`;
  for (let x = -40; x < 1100; x += 160) s += `<rect x="${x + ((u * 40) % 160)}" y="1690" width="90" height="12" fill="#c9c8c0" opacity=".5"/>`;
  // workers (silhouettes) walking left mid-distance
  for (let i = 0; i < 5; i++) { const x = 1000 - u * 70 - i * 95 + (i % 2) * 20, y = 1290 + (i % 2) * 14; s += `<g transform="translate(${x} ${y - 70}) scale(-.5 .5)">${runner(u * 1.1 + i * .23, { shirt: '#4e5459', shirtF: '#3f4549', pants: '#33373b', pantsF: '#2a2d30', skin: '#a98a74', hair: '#2a2d30', speed: .32, lean: 2 })}</g>`; }
  // Yusuf walking (medium), left to right
  const x = lerp(140, 640, u / 6.2);
  s += `<g transform="translate(${x} 1480) scale(.58)">${yusufWalk(u * .9, 1)}</g>`;
  s += rain(t, 0);
  return s;
}
function shot5b(u, t) { // 0..5.8 — tracking close-ish; knee
  const darken = E(u / 5.8);
  let s = cityBack(600 + u * 260, u + 3, 'url(#skyRain)');
  s += `<g transform="translate(${-(u * 520) % 260} 0)">`;
  for (let i = 0; i < 7; i++) s += `<rect x="${i * 260 - 40}" y="1100" width="250" height="560" fill="${i % 2 ? '#8b8e88' : '#82857f'}" ${S(4)}/><rect x="${i * 260}" y="1180" width="70" height="120" fill="#5d6362" ${S(3)}/><rect x="${i * 260 + 120}" y="1180" width="70" height="120" fill="#5d6362" ${S(3)}/>`;
  s += `</g><rect x="0" y="1660" width="1080" height="260" fill="#5f605c"/><rect x="0" y="1660" width="1080" height="16" fill="#7a7b76"/>`;
  s += `<g transform="translate(470 1450) scale(1.0)">${yusufWalk(u * .9, 1, { grim: u > 3.2 ? E((u - 3.2) / .4) : 0 })}</g>`;
  s += `<rect width="1080" height="1920" fill="#2a3035" opacity="${.18 * darken}"/>`;
  s += rain(t, C((u - 3.6) / 2) * .5);
  return s;
}

// S6 — stadium gate
function gateScene(busLift, busX, t, opt = {}) {
  let s = `<rect width="1080" height="1920" fill="url(#skyGrey)"/>`;
  s += chimneys([{ x: 60, w: 56, top: 380 }, { x: 860, w: 64, top: 300 }], t, '#6e7473', '#a9a9a2', 1000);
  // floodlight
  s += `<path d="M640 1000 L668 470 M720 1000 L692 470" ${LN(9, '#4a4f4f')}/><rect x="600" y="400" width="160" height="80" rx="6" fill="#4a4f4f" ${S(4)}/>`;
  // wall + gate
  s += `<rect x="0" y="1000" width="1080" height="480" fill="#9a9994" ${S(5)}/><rect x="-10" y="986" width="1100" height="22" fill="#77766f" ${S(4)}/>`;
  for (let x = 135; x < 1080; x += 135) s += `<line x1="${x}" y1="1008" x2="${x}" y2="1480" ${LN(4, '#6c6b67')}/>`;
  const gx = 620;
  s += `<rect x="${gx + 50}" y="1080" width="300" height="400" fill="#33373b"/>`;
  for (let x = gx + 66; x <= gx + 334; x += 26) s += `<line x1="${x}" y1="1090" x2="${x}" y2="1480" ${LN(7, '#1e1f21')}/>`;
  s += `<rect x="${gx}" y="1040" width="52" height="440" fill="#77766f" ${S(5)}/><rect x="${gx + 348}" y="1040" width="52" height="440" fill="#77766f" ${S(5)}/>`;
  s += `<rect x="${gx + 10}" y="1050" width="380" height="44" fill="#1e1f21" ${S(4)}/><text x="${gx + 200}" y="1081" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" letter-spacing="5" fill="#e9e7e0">KARAOCAK DEMİRSPOR</text>`;
  s += crest(gx + 200, 980, 70);
  // ground
  s += `<rect x="0" y="1480" width="1080" height="440" fill="#6f706c"/><rect x="0" y="1480" width="1080" height="20" fill="#8d8e89"/>`;
  if (opt.oil) s += `<ellipse cx="300" cy="1640" rx="200" ry="30" fill="#2c2d2f" opacity=".6"/>`;
  // bus + tow truck
  if (busX !== null) {
    s += `<g transform="translate(${busX} 0)">`;
    s += `<g transform="translate(330 1560) scale(.8) rotate(${busLift} 560 0)">${bus()}<rect x="300" y="-218" width="60" height="76" fill="#fbf7ee" ${S(3)}/><rect x="308" y="-208" width="44" height="6" fill="#b8452b"/><circle cx="344" cy="-160" r="9" fill="none" stroke="#b8452b" stroke-width="3"/></g>`;
    s += `<g transform="translate(20 1560) scale(.8)"><rect x="0" y="-210" width="250" height="170" rx="14" fill="#e0b13a" ${S(5)}/><rect x="20" y="-190" width="110" height="80" rx="6" fill="#3a3f44" ${S(3)}/><rect x="0" y="-60" width="380" height="60" fill="#3b3e42" ${S(5)}/>`;
    s += `<path d="M270 -60 L390 ${-150 - busLift * 7}" ${LN(14, '#3b3e42')}/><path d="M390 ${-150 - busLift * 7} L392 ${-90 - busLift * 7}" ${LN(4, '#8a8f93')}/>`;
    const bl = (Math.floor(t * 3) % 2) ? '#ffb347' : '#8a5a20'; s += `<rect x="90" y="-232" width="50" height="22" rx="8" fill="${bl}" ${S(3)}/>`;
    for (const x of [70, 300]) s += `<circle cx="${x}" cy="10" r="46" fill="#15171a" ${S(4)}/><circle cx="${x}" cy="10" r="18" fill="#8a8f93" ${S(3)}/>`;
    s += `</g></g>`;
  }
  return s;
}
function smallKitman(walkP, tray = true) {
  let s = bodyStand('url(#cardigan)', '#4a4036', 140);
  s += `<g transform="translate(0 -580) scale(.92)">${malzemeciHead()}</g>`;
  if (tray) s += `<ellipse cx="60" cy="-250" rx="110" ry="22" fill="#c9c8c0" ${S(4)}/><path d="M30 -268 l-6 -40 h34 l-6 40Z M80 -268 l-6 -40 h34 l-6 40Z" fill="#b5642f" ${S(3)}/>`;
  return s;
}
function smallMemur() {
  let s = bodyStand('url(#grey)', '#3a3e43', 150);
  s += `<path d="M-10 -440 L0 -300 L10 -440Z" fill="#7a2f22"/><rect x="-120" y="-300" width="80" height="110" fill="#d8c79a" ${S(4)}/>`;
  s += `<g transform="translate(0 -580) scale(.92)">${memurHead()}</g>`;
  return s;
}
function shot6a(u, t) { // 0..5.6 wide
  const lift = E((u - .3) / 2) * 7;
  let s = `<g transform="${camT(540, 1300, 1 + .04 * E(u / 5.6))}">` + gateScene(lift, 0, t);
  s += `<g transform="translate(880 1560) scale(.42)">${smallMemur()}</g>`;
  const kx = lerp(1120, 990, E((u - 1) / 4)); s += `<g transform="translate(${kx} ${1560 + Math.sin(u * 7) * 3}) scale(-.4 .4)">${smallKitman(u)}</g>`;
  const yx = lerp(-160, 230, E(u / 3.4)); s += `<g transform="translate(${yx} ${1580 - 440 * .46}) scale(.46)">${yusufWalk(Math.min(u * .9, 2.5), 1)}</g>`;
  s += `</g>`;
  return s;
}
function shot6b(u, t) { // 0..4.0 two-shot
  const kM = (u > .3 && u < 1.6) ? Math.max(0, Math.sin(u * 18)) * .8 : 0;
  const mM = (u > 2.0 && u < 2.7) ? Math.max(0, Math.sin(u * 18)) * .8 : 0;
  let s = `<g transform="${camT(540, 1100, 1.02)}">`;
  s += `<g transform="translate(-300 -500) scale(1.55)">${gateScene(7, 0, t)}</g>`;
  s += `<rect width="1080" height="1920" fill="#c3c3bb" opacity=".25"/>`;
  // memur (left)
  s += `<g transform="translate(300 1220) scale(1.05)">`;
  s += `<path d="M-230 700 C-240 330 -190 232 -62 204 L62 204 C190 232 240 330 230 700Z" fill="url(#grey)" ${S(6)}/><path d="M-50 204 L0 330 L50 204Z" fill="#f2efe6" ${S(4)}/><path d="M-12 220 L0 400 L12 220Z" fill="#7a2f22" ${S(3)}/>`;
  s += `<path d="M-46 112 L-48 208 Q0 236 48 208 L46 112Z" fill="#cc9c78" ${S(5)}/>${memurHead({ mouth: mM })}`;
  s += `<rect x="-200" y="360" width="140" height="180" fill="#d8c79a" ${S(5)}/>`;
  if (u > 1.9) s += `<g transform="translate(150 ${lerp(560, 300, E((u - 1.9) / .3))})">${hTwoV2(SKIN_K, 'url(#grey)')}</g>`;
  s += `</g>`;
  // kit man (right) with tray
  s += `<g transform="translate(800 1260) scale(1.05)">`;
  s += `<path d="M-230 700 C-240 330 -190 232 -62 204 L62 204 C190 232 240 330 230 700Z" fill="url(#cardigan)" ${S(6)}/><path d="M-60 204 L0 320 L60 204Z" fill="#d9d2c2" ${S(4)}/>`;
  for (let i = 0; i < 4; i++) s += `<circle cx="0" cy="${360 + i * 70}" r="10" fill="#4a3a2a" ${S(2)}/>`;
  s += `<path d="M-46 112 L-48 208 Q0 236 48 208 L46 112Z" fill="#b9866a" ${S(5)}/>${malzemeciHead({ mouth: kM })}`;
  s += `<g transform="translate(-170 470)"><ellipse cx="0" cy="0" rx="200" ry="40" fill="#c9c8c0" ${S(5)}/>`;
  s += `<path d="M-110 -10 l-12 -96 h64 l-12 96Z" fill="#b5642f" opacity=".9" ${S(4)}/><ellipse cx="-90" cy="-4" rx="46" ry="12" fill="#e9e7e0" ${S(3)}/>`;
  s += `<path d="M30 -10 l-12 -96 h64 l-12 96Z" fill="#b5642f" opacity=".9" ${S(4)}/><ellipse cx="50" cy="-4" rx="46" ry="12" fill="#e9e7e0" ${S(3)}/>`;
  s += `<rect x="120" y="-50" width="60" height="44" rx="10" fill="#efe9dc" ${S(3)}/>`;
  for (const [dx, dy] of [[-150, 10], [150, 14]]) s += `<g transform="translate(${dx} ${dy}) scale(.8)">${finger([[0, 30], [0, -10], [20, -30]], 28, SKIN_O)}</g>`;
  s += `</g></g></g>`;
  return s;
}
function shot6c(u, t) { // 0..2.4 Yusuf frozen
  let s = `<g transform="${camT(540, 900, 1 + .05 * E(u / 2.4))}"><g opacity=".85"><g transform="translate(-200 -700) scale(1.6)">${gateScene(7, 0, t)}</g></g><rect width="1080" height="1920" fill="#c3c3bb" opacity=".35" />`;
  s += `<g transform="translate(540 860) scale(2.2)">${yusufBodyOut()}${yusufHead({ look: .1, blink: (u > 1.5 && u < 1.62) ? 1 : 0 })}</g></g>`;
  return s;
}
// S7 — bus away (rear view), Yusuf close
function busRear(sc) {
  let s = `<g transform="scale(${sc})">`;
  s += `<rect x="-280" y="-560" width="560" height="560" rx="30" fill="#e3e0d8" ${S(6)}/>`;
  s += `<rect x="-240" y="-520" width="480" height="230" rx="12" fill="#3a3f44" ${S(4)}/>`;
  // back seat row visible through rear window
  s += `<rect x="-220" y="-380" width="440" height="90" rx="14" fill="#7a3a2a" ${S(3)}/>${[-150, -50, 50, 150].map(x => `<rect x="${x - 40}" y="-430" width="80" height="80" rx="12" fill="#8a4a36" ${S(3)}/>`).join('')}`;
  s += `<rect x="-240" y="-520" width="480" height="230" rx="12" fill="#cfd6dc" opacity=".12"/>`;
  s += `<g transform="rotate(-4 120 -470)"><rect x="60" y="-500" width="130" height="50" rx="6" fill="${ORANGE}" opacity=".55"/><text x="125" y="-464" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" fill="#fff" opacity=".7">OCAK</text></g>`;
  s += `<rect x="-280" y="-250" width="560" height="40" fill="${ORANGE}"/><rect x="-280" y="-210" width="560" height="10" fill="${INK}"/>`;
  s += `<rect x="-250" y="-160" width="60" height="40" rx="6" fill="#b8452b" ${S(3)}/><rect x="190" y="-160" width="60" height="40" rx="6" fill="#b8452b" ${S(3)}/><rect x="-80" y="-130" width="160" height="50" fill="#efefe8" ${S(3)}/><text x="0" y="-94" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="${INK}">34 KD 53</text>`;
  s += `<rect x="-300" y="-40" width="600" height="50" rx="10" fill="#3b3e42" ${S(4)}/>`;
  s += `</g>`;
  return s;
}
function shot7a(u, t) { // 0..4.2
  const k = E(u / 4.2);
  let s = `<rect width="1080" height="1920" fill="url(#skyGrey)"/>`;
  s += chimneys([{ x: 120, w: 50, top: 560 }, { x: 880, w: 60, top: 520 }], t, '#6e7473', '#a9a9a2', 1100);
  s += `<polygon points="${poly([[0, 1100], [1080, 1100], [1080, 1920], [0, 1920]])}" fill="#6f706c"/>`;
  s += `<polygon points="${poly([[470, 1100], [610, 1100], [1080, 1920], [0, 1920]])}" fill="#5d5e5a"/>`;
  for (let i = 0; i < 6; i++) { const y = 1150 + i * 140 + ((u * 120) % 140); const w = (y - 1100) * .02 + 4; s += `<rect x="${540 - w}" y="${y}" width="${w * 2}" height="${w * 6}" fill="#c9c8c0" opacity=".6"/>`; }
  for (let i = 0; i < 6; i++) s += `<rect x="${i % 2 ? 760 : 60}" y="${700 + i * 40}" width="${260 - i * 30}" height="${420 - i * 40}" fill="#7c8281" ${S(3)}/>`;
  const sc = lerp(1.15, .32, k), y = lerp(1820, 1180, k);
  s += `<g transform="translate(540 ${y})">${busRear(sc)}</g>`;
  s += `<rect x="0" y="1100" width="1080" height="820" fill="#000" opacity=".08"/>`;
  return s;
}
function shot7b(u, t) { // 0..3.8 close, wet eyes
  const wet = E((u - .6) / 1.8) * .9;
  let s = `<rect width="1080" height="1920" fill="url(#skyGrey)"/><rect x="0" y="900" width="1080" height="1020" fill="#8a8984" opacity=".6" filter="url(#blur2)"/>`;
  s += `<g transform="${camT(540, 820, 1 + .05 * E(u / 3.8))}"><g transform="translate(540 820) scale(2.7)">${yusufBodyOut()}${yusufHead({ look: .05, wet, blink: (u > 2.8 && u < 2.95) ? 1 : 0 })}</g></g>`;
  return s;
}
// S8 — empty gate, Yusuf alone, rain begins
function shot8(u, t) { // 0..7.6
  const z = 1.18 - .16 * E(u / 7.6);
  let s = `<g transform="${camT(540, 1300, z)}">` + gateScene(0, null, t, { oil: true });
  s += `<g transform="translate(460 1640) scale(.78 ${.78 * (1 + .008 * Math.sin(u * 2.2))})">${yusufBack()}</g>`;
  for (let i = 0; i < 6; i++) { const ph = ((u * .9 + i * .37) % 1); s += `<ellipse cx="${300 + i * 90}" cy="${1720 + (i % 3) * 30}" rx="${10 + ph * 40}" ry="${3 + ph * 10}" fill="none" stroke="#c9ccc8" stroke-width="2" opacity="${.6 * (1 - ph) * C(u / 2)}"/>`; }
  s += `</g>`;
  s += rain(t, C(u / 3) * .85, 19);
  s += `<rect width="1080" height="1920" fill="#2a3035" opacity=".12"/>`;
  return s;
}
function titleCard(u, n = 1, name = 'BİR KAHVE', next = 'SOL KROŞE') {
  const o = E(u / .5), o2 = E((u - .6) / .5);
  return `<rect width="1080" height="1920" fill="#0b0b0c"/><g opacity="${o}" font-family="Inter" text-anchor="middle">
    <text x="540" y="820" font-weight="900" font-size="150" letter-spacing="18" fill="#efe8dc">OCAK</text><rect x="290" y="850" width="500" height="10" fill="${ORANGE}"/>${crest(540, 932, 50)}
    <text x="540" y="1100" font-weight="800" font-size="44" letter-spacing="10" fill="#efe8dc" opacity=".9">BÖLÜM ${n} · ${name}</text></g>
    <g opacity="${o2}" font-family="Inter" text-anchor="middle"><rect x="240" y="1220" width="600" height="110" rx="55" fill="${ORANGE}"/><text x="540" y="1292" font-weight="900" font-size="46" fill="#fff">Yarın: ${next}</text></g>`;
}


// =============================== TIMELINE ===============================
const sp = (fn, k = 1, off = 0) => (u, t) => fn(u * k + off, t);
const SHOTS = [
  [0.0, 4.5, sp(shot1, 6.6 / 4.5)], [4.5, 8.3, sp(shot2a, 1.26)], [8.3, 10.5, sp(shot2b, 1, .9)],
  [10.5, 12.5, sp(shot3a)], [12.5, 14.4, sp(shot3b, 1.26)], [14.4, 17.8, sp(shot3c, 1.29)], [17.8, 19.6, sp(shot3d, 1.44)],
  [19.6, 22.4, sp(shot4a, 1.5)], [22.4, 24.4, sp(shot4b, 1.5)], [24.4, 33.4, sp(shot4c, 1.178)], [33.4, 34.2, sp(shot4c2)], [34.2, 36.2, sp(shot4d, 1.6)],
  [36.2, 40.2, sp(shot5a, 1.2)], [40.2, 43.2, sp(shot5b, 1, 2.8)],
  [43.2, 46.6, sp(shot6a, 1.2)], [46.6, 50.0, sp(shot6b)], [50.0, 51.6, sp(shot6c)],
  [51.6, 55.0, sp(shot7a, 1.235)], [55.0, 57.4, sp(shot7b, 1.3)], [57.4, 64.4, sp(shot8, 1.086)], [64.4, 67.2, (u) => titleCard(u)]
];
const FLASHES = [2.6, 3.2, 3.8, 5.3, 5.9, 6.6, 7.3, 7.9, 8.5];
const SUBS = [
  [0.20, 2.30, '', 'Bu şehirde bir kulübü', 'iki sebeple alırsın.'],
  [2.40, 3.30, '', 'Ya çok seversin…', ''],
  [3.40, 4.45, '', '…ya da başka', 'çaren yoktur.'],
  [4.90, 6.60, 'KEREM', 'Karaocak yeniden bağıracak!', ''],
  [6.80, 9.60, '', 'Kerem Sezer hangisi olduğunu', 'hiç söylemedi.'],
  [12.60, 14.30, 'YUSUF', 'Sol bek içeri kayacak…', ''],
  [15.60, 16.90, 'YUSUF', 'Bak. Bak.', ''],
  [19.80, 22.30, '', 'Yusuf Demirci o telefonu', 'üç kere açmadı.'],
  [24.57, 26.86, 'KEREM', 'Yusuf. Bir kahveme gel.', 'Sadece bir kahve.'],
  [27.12, 29.07, 'YUSUF', 'Kero…', 'Ben o işleri bıraktım.'],
  [29.32, 30.85, 'KEREM', 'Kahve diyorum oğlum.', 'Kahve.'],
  [31.53, 33.20, 'KEREM', 'Sen sade içerdin,', 'değil mi?'],
  [36.40, 38.00, '', 'Karaocak\'ta her şey griydi.', ''],
  [38.10, 40.10, '', 'Cumartesileri turuncuya dönerdi.', 'Eskiden.'],
  [40.40, 43.00, '', 'Sol dizi yağmurdan önce', 'hep sızlardı.'],
  [46.90, 48.20, 'MALZEMECİ', 'Şekerli mi?', ''],
  [48.60, 49.80, 'MEMUR', 'İki.', ''],
  [51.80, 54.80, '', 'O otobüsün en arka koltuğu', 'yıllarca onundu.'],
  [57.70, 60.20, '', 'Babam o gün oraya', 'bir kahve içmeye gitmişti.'],
  [60.40, 61.70, '', 'Kahveyi hiç içmedi.', ''],
  [61.90, 64.00, '', 'Ama bir daha da', 'oradan ayrılmadı.']
];
const CAPTIONS = [[10.6, 12.4, 'Birkaç hafta sonra.']];
const TOTAL = 67.2;
const END_T = 64.4;

function renderFrame(t) {
  let body = '';
  for (const [a, b, fn] of SHOTS) if (t >= a && t < b) { body = fn(t - a, t); break; }
  if (!body) body = titleCard(t - END_T);
  let s = DEFS + body;
  if (t < END_T) s += `<rect width="1080" height="1920" fill="url(#vig)"/>`;
  // flashes (press)
  const f = flashAmt(t, FLASHES); if (f > 0) s += `<rect width="1080" height="1920" fill="#fff" opacity="${f.toFixed(3)}"/>`;
  // fade to black before title
  if (t > END_T - .7 && t < END_T) s += `<rect width="1080" height="1920" fill="#000" opacity="${E((t - (END_T - .7)) / .6)}"/>`;
  // short dip between shots to soften hard cuts? (kept as hard cuts)
  for (const [a, b, txt] of CAPTIONS) if (t > a && t < b) { const o = Math.min(C((t - a) / .2), C((b - t) / .2)); s += `<g opacity="${o}"><rect x="60" y="150" width="420" height="68" rx="8" fill="#000" opacity=".55"/><text x="86" y="196" font-family="Inter" font-weight="700" font-style="italic" font-size="36" fill="#efe8dc">${txt}</text></g>`; }
  let sh = null; for (const x of SUBS) if (t >= x[0] && t <= x[1]) sh = x;
  if (sh) {
    const o = Math.min(C((t - sh[0]) / .12), C((sh[1] - t) / .12));
    const one = !sh[4]; const y1 = one ? 1720 : 1680, y2 = 1750;
    s += `<g font-family="Inter" text-anchor="middle" opacity="${o}">`;
    if (sh[2]) s += `<text x="540" y="${y1 - 70}" font-weight="800" font-size="30" letter-spacing="6" fill="${ORANGE}" stroke="#000" stroke-width="6" paint-order="stroke">${sh[2]}</text>`;
    s += `<g font-weight="700" font-size="54" fill="#fff" stroke="#000" stroke-width="10" paint-order="stroke" stroke-linejoin="round"><text x="540" y="${y1}">${sh[3]}</text>${one ? '' : `<text x="540" y="${y2}">${sh[4]}</text>`}</g></g>`;
  }
  document.getElementById('svg').innerHTML = s;
}
window.render = renderFrame;
