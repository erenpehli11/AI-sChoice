// ============ Emir'in golü — karma dil, 10 plan (~9.2 sn) ============
const P_WIND = { lean: 4, nh: -42, nk: 74, fh: -4, fk: 14, ns: 34, ne: 30, fs: -66, fe: 20, head: 4 };
const P_CUT = { lean: 24, nh: 8, nk: 64, fh: -42, fk: 44, ns: -46, ne: 50, fs: 76, fe: 20 };
const D_LUNGE = { lean: 34, nh: 58, nk: 8, fh: -32, fk: 28, ns: 66, ne: 16, fs: -34, fe: 30, head: 6 };
const D_CHARGE = { lean: 22, nh: 34, nk: 52, fh: -32, fk: 62, ns: 44, ne: 60, fs: -44, fe: 40 };
const lerpPose = (a, b, k) => { const o = {}; for (const key in a) o[key] = lerp(a[key], b[key] == null ? a[key] : b[key], k); return o; };
const shake = (u, a, b, amp = 10) => (u > a && u < b) ? `translate(${Math.sin(u * 140) * amp * (1 - (u - a) / (b - a))} ${Math.cos(u * 120) * amp * .6 * (1 - (u - a) / (b - a))})` : '';
const ghost = (svg, n, dx, op = .22) => { let s = ''; for (let i = n; i >= 1; i--) s += `<g transform="translate(${-dx * i} 0)" opacity="${op / i}">${svg}</g>`; return s + svg; };
function panelIn(pts, content, k, dir) {
  const off = (1 - E(k)) * dir; const id = 'pi' + Math.round(Math.random() * 1e9);
  return `<g transform="translate(${off} 0)"><clipPath id="${id}"><polygon points="${poly(pts)}"/></clipPath><g clip-path="url(#${id})">${content}</g><polygon points="${poly(pts)}" fill="none" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/></g>`;
}
function sfx(txt, x, y, size, rot, k = 1) { const sc = .6 + .4 * E(k / .3); return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})" opacity="${C(k / .1)}"><text text-anchor="middle" font-family="Inter" font-weight="900" font-size="${size}" fill="#fff" stroke="${INK}" stroke-width="${size * .1}" paint-order="stroke" stroke-linejoin="round">${txt}</text></g>`; }
function sneaker(rot = 0, sc = 1) { return `<g transform="rotate(${rot}) scale(${sc})"><path d="M-170 -40 Q-160 -180 0 -170 L230 -116 Q350 -74 316 32 L-180 52Z" fill="#efe9da" ${S(8)}/><path d="M-180 30 H316" ${LN(12, '#bdb6a6')}/><path d="M-10 -160 L-50 -36 M56 -150 L16 -34 M120 -134 L82 -30" ${LN(6, '#8a8478')}/><path d="M-130 -70 q-30 40 20 54" ${LN(5, '#8a8478')}/><path d="M200 -100 q40 30 60 80" ${LN(4, '#b9b1a0', .7)}/></g>`; }
function bgBlurDusk(t) { return `<g filter="url(#blur)" opacity=".9">${duskBack(t)}</g>`; }

// G1 — the trap: ball rolls in, sole stops it, dust
function g1(u, t) {
  const roll = E(u / .45), down = E((u - .35) / .2), hit = u > .55;
  let s = `<g transform="${shake(u, .55, .8, 12)}">${bgBlurDusk(t)}<rect y="1150" width="1080" height="770" fill="url(#dirt)"/>`;
  const r = rng(3); for (let i = 0; i < 70; i++) s += `<ellipse cx="${r() * 1080}" cy="${1180 + r() * 740}" rx="${10 + r() * 60}" ry="${4 + r() * 10}" fill="#7f5f40" opacity=".45"/>`;
  const bx = lerp(-160, 560, roll), by = 1470;
  s += `<ellipse cx="${bx + 20}" cy="${by + 120}" rx="140" ry="26" fill="#000" opacity=".25" filter="url(#blur)"/>`;
  if (!hit) s += hLines(by - 120, by + 120, 8, '#fff', .35, 4);
  s += ballSVG(bx, by, 120, roll * 300);
  s += `<g transform="translate(${560 + 40} ${lerp(820, 1330, down)})">${limb('M0 -900 L-10 -150', 210, '#2f3a52')}<path d="M-80 -880 L-90 -160" ${LN(12, '#d8dbe2', .85)}/>${sneaker(-12, 1)}</g>`;
  if (hit) s += dustPuff(420, 1560, 140 * (.6 + E((u - .55) / .4) * .6), .85, 2) + dustPuff(720, 1570, 110 * (.6 + E((u - .55) / .4) * .6), .8, 9);
  return s + `</g>`;
}
// G2 — eyes lock (top panel) + what he sees (bottom panel)
function g2(u, t) {
  let s = `<rect width="1080" height="1920" fill="#2a2420"/>`;
  const top = [[24, 24], [1056, 24], [1056, 860], [24, 980]], bot = [[24, 1020], [1056, 900], [1056, 1896], [24, 1896]];
  const eyes = `<rect width="1080" height="1920" fill="#e8b27c"/>${speedLines(540, 520, 70, 220, '#fff', .55, 5)}<g transform="translate(540 ${640 + u * 20}) scale(${4.4 + u * .3})">${emirHead({ anger: .7 })}</g>`;
  s += panelIn(top, eyes, u / .3, 1080);
  let pov = `<g transform="translate(-200 -260) scale(1.35)">${duskBack(t)}</g>`;
  pov += `<path d="M700 1560 L700 1200 L960 1150 L960 1510" stroke="#8a5a3c" stroke-width="22" fill="none" stroke-linejoin="round"/>`;
  pov += figure(D_CHARGE, DEF_O(), 820, 1580, .55, true) + figure(D_CHARGE, DEF_O(), 560, 1700, .75, true) + figure(D_CHARGE, DEF_O(), 300, 1900, 1.0, true);
  pov += `<rect width="1080" height="1920" fill="#3a2a2a" opacity=".12"/>`;
  s += panelIn(bot, pov, (u - .25) / .35, -1080);
  return s;
}
// G3 — cut past the first defender (motion smear)
function g3(u, t) {
  const k = E(u / 1);
  let s = `<rect width="1080" height="1920" fill="url(#dusk)"/><rect y="1200" width="1080" height="720" fill="url(#dirt)"/>` + hLines(600, 1800, 30, '#fff', .45, 12);
  s += figure(lerpPose(D_CHARGE, D_LUNGE, E(u / .5)), DEF_O(), lerp(860, 720, k), 1560, .82, true);
  const em = figure(lerpPose(P_DRIB, P_CUT, Math.sin(u * Math.PI)), EMIR_O(), lerp(260, 740, k), 1790, 1.08);
  s += ghost(em, 3, 60, .3);
  s += ballSVG(lerp(420, 930, k), 1740 - Math.abs(Math.sin(u * 10)) * 20, 34, u * 400);
  s += dustPuff(lerp(250, 700, k), 1800, 60, .7, 3);
  return `<g transform="${camT(540, 1400, 1.05)}">${s}</g>`;
}
// G4 — hop over the sliding tackle (low angle)
function g4(u, t) {
  const slide = E(u / .4), hop = Math.sin(C((u - .15) / .55) * Math.PI);
  let s = `${bgBlurDusk(t)}<rect y="1250" width="1080" height="670" fill="url(#dirt)"/>`;
  // sliding defender (from right), body low, leg extended
  s += `<g transform="translate(${lerp(1300, 560, slide)} 1600) rotate(-8)">`;
  s += limb('M0 0 L-260 30 L-470 60', 70, '#2a2622') + `<path d="M-500 40 q-10 -30 30 -40 l60 10 q20 20 0 40Z" fill="#141516" ${S(4)}/>`;
  s += `<path d="M-40 -60 C40 -110 220 -110 300 -60 L300 40 C220 70 40 70 -40 40Z" fill="url(#maroon)" ${S(6)}/>`;
  s += limb('M200 -60 L320 -170', 50, '#7a3a3a') + `<g transform="translate(360 -120) scale(-1.1 1.1)">${profileHead(SKIN_D, defHair, false)}</g>`;
  s += `</g>`;
  s += dustPuff(lerp(1100, 380, slide), 1680, 110, .85, 7) + dustPuff(lerp(1200, 520, slide), 1700, 80, .8, 2);
  // Emir's legs hopping over (from knees down) + ball scooped ahead
  const ly = 1280 - hop * 260;
  s += `<g transform="translate(470 ${ly})">${limb('M-60 -700 L-90 -120', 150, '#2f3a52')}${limb('M90 -700 L140 -150', 150, '#2f3a52')}<g transform="translate(-110 -60) rotate(-20) scale(.62)">${sneaker(0)}</g><g transform="translate(160 -100) rotate(12) scale(.62)">${sneaker(0)}</g></g>`;
  s += ballSVG(lerp(560, 860, C(u / .8)), 1500 - hop * 200, 60, u * 500);
  return s;
}
// G5 — the big defender: charge (top) -> beaten, falls (bottom)
function g5(u, t) {
  let s = `<rect width="1080" height="1920" fill="#2a2420"/>`;
  const top = [[24, 24], [1056, 24], [1056, 900], [24, 820]], bot = [[24, 860], [1056, 940], [1056, 1896], [24, 1896]];
  const face = `<rect width="1080" height="1920" fill="#c96f5a"/>${speedLines(540, 600, 80, 240, '#fff', .55, 21)}<g transform="translate(540 ${470 + u * 20}) scale(${2.8 + u * .25})">${defBody()}${defHead({ smirk: .2, mouth: .5 })}</g>`;
  s += panelIn(top, face, u / .3, -1080);
  const kf = E((u - .55) / .5);
  let act = `<rect width="1080" height="1920" fill="url(#dusk)"/><rect y="1300" width="1080" height="620" fill="url(#dirt)"/>` + hLines(1000, 1800, 26, '#fff', .45, 8);
  act += `<g transform="rotate(${-kf * 20} 420 1800)">${figure(lerpPose(D_LUNGE, P_FALL, kf), DEF_O(), 420, 1820, 1.15, true)}</g>`;
  act += dustPuff(360, 1860, 80 + 120 * kf, .85, 4);
  act += ghost(figure(P_CUT, EMIR_O(), lerp(520, 760, kf), 1840, 1.1), 2, 70, .3);
  act += ballSVG(lerp(700, 960, kf), 1790, 34);
  s += panelIn(bot, act, (u - .4) / .3, 1080);
  if (u > .7) s += sfx('VIIIN!', 760, 1260, 140, -6, u - .7);
  return s;
}
// G6 — thud: the big man hits the dust (detail)
function g6(u, t) {
  const k = E(u / .5);
  let s = `<g transform="${shake(u, .2, .6, 16)}"><rect width="1080" height="1920" fill="url(#dirt)"/>`;
  const r = rng(12); for (let i = 0; i < 90; i++) s += `<ellipse cx="${r() * 1080}" cy="${r() * 1920}" rx="${10 + r() * 60}" ry="${4 + r() * 10}" fill="#7f5f40" opacity=".45"/>`;
  const sh = '#3b2a1c';
  s += `<g opacity=".6" transform="translate(${560 - 140 * k} 900) rotate(${-25 - 45 * k}) scale(${1.1 - .1 * k})"><ellipse cx="0" cy="0" rx="150" ry="300" fill="${sh}"/><circle cx="0" cy="-400" r="110" fill="${sh}"/><path d="M-120 -180 L-360 -360 M120 -180 L330 -380" stroke="${sh}" stroke-width="90" stroke-linecap="round"/><path d="M-80 260 L-220 620 M80 260 L260 600" stroke="${sh}" stroke-width="110" stroke-linecap="round"/></g>`;
  if (u > .2) s += dustPuff(460, 1250, 260 * E((u - .2) / .5) + 60, .9, 6) + dustPuff(620, 1150, 160 * E((u - .25) / .5) + 40, .85, 11);
  s += ballSVG(lerp(760, 1180, E(u / .8)), 1520, 50, u * 600);
  if (u > .22) s += sfx('GÜP!', 300, 700, 150, -10, u - .22);
  return s + `</g>`;
}
// G7 — the brother's eyes widen
function g7(u, t) {
  const z = 1 + .12 * E(u / .7);
  let s = `<g transform="${camT(540, 900, z)}"><rect width="1080" height="1920" fill="url(#dusk)"/><g fill="url(#dustG)" opacity=".7"><circle cx="300" cy="1500" r="420"/></g><rect x="0" y="1300" width="1080" height="620" fill="#a7967f" ${S(5)}/>`;
  s += `<g transform="translate(180 1240) scale(1.4)" opacity=".85"><path d="M-130 260 C-140 150 -100 100 -30 90 L30 90 C100 100 140 150 130 260Z" fill="#5b6f8a" ${S(5)}/>${mateHead({})}</g>`;
  s += `<g transform="translate(560 960) scale(3)"><path d="M-150 400 C-160 260 -120 180 -40 160 L40 160 C120 180 160 260 150 400Z" fill="#4f6a66" ${S(6)}/>${kidHead()}`;
  const w = E(u / .3); s += `<g>${[-38, 38].map(x => `<circle cx="${x}" cy="30" r="${9 + 3 * w}" fill="#2b1d15"/><circle cx="${x + 3}" cy="26" r="3" fill="#fff"/>`).join('')}</g></g>`;
  return s + `</g>`;
}
// G8 — the strike: wind-up -> left foot through the ball
function g8(u, t) {
  const k = E((u - .35) / .2);
  const P = u < .35 ? lerpPose(P_DRIB, P_WIND, E(u / .35)) : lerpPose(P_WIND, P_SHOOT, k);
  let s = `<rect width="1080" height="1920" fill="#f1c48a"/>` + speedLines(760, 1330, 90, 160, '#fff', .55 + .2 * k, 9);
  s += figure(P, EMIR_O(), 360, 1830, 1.3);
  const contact = u > .52;
  const bk = E((u - .52) / .4);
  s += ballSVG(lerp(800, 1180, bk), lerp(1360, 1180, bk), 50, u * 800);
  if (contact) { for (let i = 0; i < 3; i++) s += `<circle cx="790" cy="1360" r="${60 + i * 50 + bk * 60}" fill="none" ${LN(7, '#fff', (.7 - i * .2) * (1 - bk))}/>`; s += `<g ${LN(10, '#fff', .9)}><path d="M${800 + bk * 300} 1290 h-200 M${810 + bk * 300} 1350 h-260 M${800 + bk * 300} 1410 h-180"/></g>`; }
  return `<g transform="${camT(600, 1300, 1 + .06 * E(u / 1))} ${shake(u, .52, .7, 10)}">${s}</g>`;
}
// G9 — impact flash, extreme close
function g9(u, t) {
  const f = 1 - E(u / .3);
  return `<g transform="${camT(700, 940, 1.08 - .08 * E(u / .4))}">${fFootStrike()}</g><rect width="1080" height="1920" fill="#fff" opacity="${.75 * f}"/>`;
}
// G10 — between the rusty posts, GÜM! into the wall, kids leap up
function g10(u, t) {
  const fly = E(u / .35), hit = u > .35, k = E((u - .35) / .4), cheer = u > .55 ? 1 : 0;
  let s = `<g transform="${hit && u < .7 ? shake(u, .35, .7, 14) : ''}"><rect width="1080" height="1920" fill="url(#dusk)"/>`;
  s += `<rect x="0" y="300" width="1080" height="1300" fill="#a7967f" ${S(5)}/>`;
  for (let y = 330; y < 1600; y += 70) for (let x = (y / 70 % 2) * 70; x < 1080; x += 140) s += `<rect x="${x}" y="${y}" width="140" height="70" fill="none" stroke="#8b7a64" stroke-width="4"/>`;
  s += `<text x="120" y="900" font-family="Inter" font-weight="900" font-size="220" fill="${ORANGE}" opacity=".75" transform="rotate(-5 120 900)">OCAK</text>`;
  // kids on top of the wall
  for (let i = 0; i < 4; i++) {
    const x = 170 + i * 250, jump = cheer ? Math.abs(Math.sin((u - .55) * 9 + i)) * 40 : 0, col = ['#5b6f8a', '#8a5b5b', '#4f6a66', '#8a7a5b'][i];
    s += `<g transform="translate(${x} ${300 - jump}) scale(1.6)"><path d="M-22 0 v-56 q22 -18 44 0 v56Z" fill="${col}" ${S(3)}/>${cheer ? `<path d="M-18 -50 l-22 -52 M18 -50 l22 -52" ${LN(10, col)}/>` : `<path d="M-18 -40 l-10 30 M18 -40 l10 30" ${LN(10, col)}/>`}<circle cx="0" cy="-74" r="18" fill="#c9946f" ${S(3)}/>${i === 2 ? `<path d="M-18 -80 q18 -24 36 0 h10 v6 h-46Z" fill="${ORANGE}" ${S(2)}/>` : `<path d="M-18 -80 q18 -22 36 0Z" fill="#2a2420"/>`}${cheer ? `<ellipse cx="0" cy="-64" rx="6" ry="${4 + jump * .05}" fill="#5a2e26"/>` : ''}</g>`;
  }
  s += `<rect y="1600" width="1080" height="320" fill="url(#dirt)"/>`;
  // rusty net-less posts in the foreground
  s += `<path d="M120 1920 L120 640 L960 640 L960 1920" stroke="#8a5a3c" stroke-width="46" fill="none" stroke-linejoin="round"/><path d="M120 1920 L120 640 L960 640 L960 1920" ${LN(5)}/><path d="M140 700 q12 90 -6 180 M940 760 q-12 120 6 240" ${LN(10, '#b5703f', .7)}/>`;
  if (!hit) { const bx = lerp(300, 560, fly), by = lerp(1850, 1000, fly), r = lerp(160, 110, fly); s += hLines(by - 80, by + 80, 6, '#fff', .4, 2) + ballSVG(bx, by, r, u * 900); }
  else {
    s += dustPuff(560, 1100, 150 * (.4 + k), .9, 13);
    for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, d = 230 * k; s += `<rect x="${560 + Math.cos(a) * d}" y="${1000 + Math.sin(a) * d}" width="24" height="14" fill="#8b7a64" ${S(2)} transform="rotate(${i * 40} ${560 + Math.cos(a) * d} ${1000 + Math.sin(a) * d})"/>`; }
    const sq = u < .5 ? 1 - E((u - .35) / .15) * .25 : .75 + .25 * E((u - .5) / .2);
    s += `<g transform="translate(${560 - (u - .35) * 60} ${1000 + E((u - .5) / .8) * 560}) scale(${2 - sq} ${sq})">${ballSVG(0, 0, 110)}</g>`;
    s += sfx('GÜM!', 820, 760, 170, 10, u - .35);
  }
  return s + `</g>`;
}
const GOAL_SHOTS = [[0, 1.0, g1], [1.0, 1.9, g2], [1.9, 2.9, g3], [2.9, 3.7, g4], [3.7, 4.9, g5], [4.9, 5.7, g6], [5.7, 6.4, g7], [6.4, 7.4, g8], [7.4, 7.8, g9], [7.8, 9.2, g10]];
function goalSeq(u, t) { for (const [a, b, fn] of GOAL_SHOTS) if (u >= a && u < b) return fn(u - a, t); return g10(1.4, t); }
