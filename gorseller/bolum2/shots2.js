// ===================== BÖLÜM 2 — sahneler =====================
const IMG_CORR = '../mekanlar/mekan-koridor.png';
const IMG_OFF = '../mekanlar/mekan-kerem-odasi.png';
const IMG_STAD = '../mekanlar/mekan-stadyum.png';
const bg = (id, x, y, w, extra = '') => `<use href="#${id}" transform="translate(${x} ${y}) scale(${w / 1080})" ${extra}/>`;
const NETP = `<defs><pattern id="netP" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M0 0 L22 22 M22 0 L0 22" stroke="#eeece5" stroke-width="2.2" opacity=".85"/></pattern></defs>`;
const talk = (u, a, b, sp = 18) => (u > a && u < b) ? Math.max(0, Math.sin((u - a) * sp)) * .8 : 0;

// --- generic full standing figure: head at origin; torso fn draws to ~y 560; legs to ~1240
function legsStand(col, shoe = '#141516') {
  return limb('M-70 520 L-78 880 L-82 1200', 92, col) + limb('M70 520 L78 880 L82 1200', 92, col) +
    `<path d="M-150 1230 q20 -34 70 -26 l10 28 h-80Z M70 1206 q60 -8 80 24 h-80Z" fill="${shoe}" ${S(5)}/>`;
}
function pointHand(skin) { // fist + index finger pointing left
  return handFist(skin) + finger([[-40, -20], [-90, -26], [-130, -24]], 22, skin);
}

// S1a — corridor walk (back view, toward the BAŞKAN door)
function e2s1a(u) {
  const k = E(u / 4.5);
  const sc = lerp(.72, .44, k), fy = lerp(1900, 1490, k);
  const bob = Math.abs(Math.sin(u * 4.2)) * 10 * sc, sway = Math.sin(u * 4.2) * 1.6;
  let s = `<g transform="${camT(540, 1000, 1 + .03 * k)}">${bg('BG_CORR', 0, 0, 1080)}`;
  s += `<g transform="translate(${540 - 20 * k} ${fy - 430 * sc - bob}) scale(${sc}) rotate(${sway})">${yusufBack()}</g></g>`;
  if (u < 2.8) s += `<g opacity="${Math.min(C(u / .3), C((2.8 - u) / .3))}"><rect x="60" y="150" width="10" height="50" fill="${ORANGE}"/><text x="86" y="192" font-family="Inter" font-weight="900" font-size="42" letter-spacing="8" fill="#efe8dc" stroke="#000" stroke-width="6" paint-order="stroke">BÖLÜM 2</text></g>`;
  return s;
}
// S1b — insert: shiny coffee machine (Yusuf's glance)
function e2s1b(u) {
  let s = `<g transform="${camT(540, 900, 1 + .06 * E(u / 1.1))}"><rect width="1080" height="1920" fill="url(#officeWall)"/><rect y="1240" width="1080" height="680" fill="url(#walnut)"/>`;
  s += `<circle cx="540" cy="900" r="620" fill="url(#warm)" opacity=".8"/>`;
  s += `<rect x="250" y="480" width="580" height="760" rx="36" fill="url(#chrome)" ${S(7)}/>`;
  s += `<rect x="300" y="560" width="480" height="140" rx="16" fill="#2b2f33" ${S(4)}/><circle cx="360" cy="630" r="18" fill="#ff9a3c"/><rect x="420" y="606" width="300" height="40" rx="8" fill="#1a1d20"/>`;
  s += `<rect x="400" y="820" width="280" height="70" rx="14" fill="#3a3f43" ${S(4)}/><path d="M470 890 v70 M610 890 v70" ${LN(12, '#3a3f43')}/>`;
  s += `<path d="M300 520 L330 1200" ${LN(10, '#ffffff', .45)}/><path d="M760 520 L740 1200" ${LN(6, '#ffffff', .25)}/>`;
  for (const x of [400, 680]) s += `<path d="M${x - 70} 1180 h140 v70 q0 40 -70 40 q-70 0 -70 -40Z" fill="#fbf7ee" ${S(5)}/><ellipse cx="${x}" cy="1300" rx="110" ry="24" fill="#fbf7ee" ${S(5)}/><path d="M${x - 16} 1160 q-14 -30 8 -56 M${x + 16} 1160 q-14 -30 8 -56" ${LN(5, '#fff', .8)}/>`;
  s += `</g>`;
  return s;
}
// S1c — office two-shot: Kerem offers coffee, Yusuf over-shoulder
function e2s1c(u) {
  const kM = talk(u, .2, 1.6) + talk(u, 3.9, 7.0);
  const wave = E((u - 3.9) / .4) * (1 - E((u - 6.6) / .4));
  let s = `<g transform="${camT(540, 900, 1.02 + .04 * E(u / 7.4))}">${bg('BG_OFF', -160, -260, 1400)}<rect width="1080" height="1920" fill="#ffd590" opacity=".06"/>`;
  s += `<g transform="translate(700 700) scale(1.3)">${keremBody()}`;
  s += limb('M-190 300 L-280 470 L-330 440', 66, '#30333b');
  s += `<g transform="translate(-370 420) scale(-1 1)">${handCup(SKIN_K, 'url(#suit)')}</g>`;
  s += limb(`M190 300 L${250 + 30 * wave} ${460 - 120 * wave} L${230 + 40 * wave} ${560 - 330 * wave}`, 66, '#30333b');
  s += wave > .05 ? `<g transform="translate(${230 + 40 * wave} ${560 - 330 * wave}) rotate(${20 + Math.sin(u * 10) * 12 * wave})">${handOpen(SKIN_K, 'url(#suit)')}</g>` : `<g transform="translate(230 566)">${handFist(SKIN_K)}</g>`;
  s += keremHead({ smile: u > 3.9 ? .8 : 1, mouth: kM, brow: .4 }) + `</g>`;
  s += `<g transform="translate(250 2260) scale(1.45)">${yusufBack()}</g></g>`;
  return s;
}
// S2a — on the pitch: Kerem remembers, Yusuf hands in pockets
function e2s2a(u) {
  const kM = talk(u, .3, 2.5) + talk(u, 2.8, 5.7) + talk(u, 6.0, 8.1);
  const sweep = Math.sin(u * 1.4) * 6;
  let s = `<g transform="${camT(540, 1200, 1.04 + .04 * E(u / 8.5))}">${bg('BG_STAD', 0, 0, 1080)}`;
  // Yusuf (right), hands in pockets
  s += `<g transform="translate(720 820) scale(.6)">${legsStand('#2e333a')}${yusufBodyOut()}${limb('M-200 300 L-230 460 L-150 520', 64, '#2c3a4c')}${limb('M200 300 L230 460 L150 520', 64, '#2c3a4c')}${yusufHead({ look: -.2 })}</g>`;
  // Kerem (left), pointing toward the box
  s += `<g transform="translate(330 800) scale(.62)">${legsStand('#23252c')}${keremBody()}${limb('M190 300 L220 470 L170 560', 66, '#30333b')}<g transform="translate(170 566)">${handFist(SKIN_K)}</g>`;
  s += limb(`M-190 300 L-330 ${250 + sweep} L-430 ${190 + sweep}`, 66, '#30333b') + `<g transform="translate(-440 ${186 + sweep})">${pointHand(SKIN_K)}</g>`;
  s += keremHead({ smile: 1, mouth: kM, brow: .6 }) + `</g></g>`;
  return s;
}
// S2b — Yusuf close (outside)
function e2s2b(u) {
  let s = `<g transform="${camT(540, 900, 1.03 + .03 * E(u / 3))}">${bg('BG_STAD', -540, -900, 2160, 'opacity=".9"')}<rect width="1080" height="1920" fill="#c3c3bb" opacity=".35"/>`;
  s += `<g transform="translate(540 860) scale(2.3)">${yusufBodyOut()}${yusufHead({ look: -.15, mouth: talk(u, .2, 2.6, 16) })}</g></g>`;
  return s;
}
// S2c — the rusty dugout: "O zaman gel… buradan izle."
function e2s2c(u) {
  const reach = E((u - .2) / .5);
  let s = `<g transform="${camT(700, 1500, 1.0 + .05 * E(u / 3.5))}">${bg('BG_STAD', -700, -1500, 2160)}`;
  s += `<g transform="translate(250 900) scale(.95)">${keremBody()}${limb('M-190 300 L-230 470 L-170 560', 66, '#30333b')}<g transform="translate(-170 566)">${handFist(SKIN_K)}</g>`;
  s += limb(`M190 300 L${300 + 60 * reach} ${420 + 30 * reach} L${360 + 140 * reach} ${520 - 40 * reach}`, 66, '#30333b');
  s += `<g transform="translate(${360 + 140 * reach} ${520 - 40 * reach}) rotate(${70 - 20 * reach})">${handOpen(SKIN_K, 'url(#suit)')}</g>`;
  s += keremHead({ smile: u > 2.6 ? 1 : .85, mouth: talk(u, .2, 2.4, 16), brow: u > 2.6 ? 1 : .3 }) + `</g></g>`;
  return s;
}
// S3 — transition: club goal (net) -> neighbourhood goal (no net)
function duskBack(t, kids = 'sit', cheer = 0) {
  const noKids = kids === 'none';
  const r = rng(21);
  let s = `<rect width="1080" height="1300" fill="url(#dusk)"/><circle cx="820" cy="980" r="120" fill="#f8d79c" opacity=".9"/><circle cx="820" cy="980" r="260" fill="#f8d79c" opacity=".25" filter="url(#blur2)"/>`;
  for (let i = 0; i < 12; i++) { const x = i * 92 - 10, h = 160 + r() * 220; s += `<rect x="${x}" y="${1060 - h}" width="96" height="${h}" fill="${i % 2 ? '#6b6470' : '#5f5966'}" ${S(3)}/>`; for (let k = 0; k < 5; k++) for (let j = 0; j < 2; j++) if (r() > .45) s += `<rect x="${x + 18 + j * 40}" y="${1080 - h + k * 40}" width="18" height="20" fill="${r() > .5 ? '#f2c77c' : '#4d4855'}"/>`; }
  s += `<rect x="0" y="1060" width="1080" height="160" fill="#a7967f" ${S(4)}/>`;
  for (let y = 1080; y < 1220; y += 30) for (let x = (y / 30 % 2) * 30; x < 1080; x += 60) s += `<rect x="${x}" y="${y}" width="60" height="30" fill="none" stroke="#8b7a64" stroke-width="2"/>`;
  if (!noKids) s += `<text x="230" y="1170" font-family="Inter" font-weight="800" font-size="54" fill="${ORANGE}" opacity=".7" transform="rotate(-4 230 1170)">OCAK</text>`;
  const kid = (x, col, cap, i) => { const arm = cheer * (20 + Math.sin(t * 12 + i) * 10); return `<g transform="translate(${x} 1060)"><path d="M-22 0 v-56 q22 -18 44 0 v56Z" fill="${col}" ${S(3)}/>${cheer ? `<path d="M-18 -50 l-16 ${-30 - arm} M18 -50 l16 ${-30 - arm}" ${LN(8, col)}/>` : ''}<circle cx="0" cy="-74" r="18" fill="#c9946f" ${S(3)}/>${cap ? `<path d="M-18 -80 q18 -24 36 0 h10 v6 h-46Z" fill="${cap}" ${S(2)}/>` : `<path d="M-18 -80 q18 -22 36 0Z" fill="#2a2420"/>`}<path d="M-14 0 l-6 40 M14 0 l4 40" ${LN(8, '#3b4250')}/></g>`; };
  if (!noKids) s += kid(120, '#5b6f8a', null, 0) + kid(200, '#8a5b5b', null, 1) + kid(560, '#4f6a66', ORANGE, 2) + kid(640, '#8a7a5b', null, 3);
  s += `<rect y="1220" width="1080" height="700" fill="url(#dirt)"/>`;
  const r2 = rng(5); for (let i = 0; i < 40; i++) s += `<ellipse cx="${r2() * 1080}" cy="${1240 + r2() * 680}" rx="${10 + r2() * 40}" ry="${3 + r2() * 6}" fill="#7f5f40" opacity=".45"/>`;
  return s;
}
function e2s3(u, t) {
  let s = NETP;
  if (u < 1.5) {
    const z = 1 + .12 * E(u / 1.5);
    s += `<g transform="${camT(540, 900, z)}"><rect width="1080" height="1920" fill="url(#skyGrey)"/><rect y="1100" width="1080" height="820" fill="url(#pitch)"/><rect y="1100" width="1080" height="820" fill="#8d8c63" opacity=".6"/>`;
    s += `<rect x="180" y="640" width="720" height="470" fill="url(#netP)"/><path d="M180 1110 L180 640 L900 640 L900 1110" stroke="#f3f1ea" stroke-width="30" fill="none" stroke-linejoin="round"/><path d="M180 1110 L180 640 L900 640 L900 1110" ${LN(4)}/>`;
    s += `<path d="M0 1110 H1080" ${LN(6, '#e8e5d8', .6)}/></g>`;
  } else {
    s += `<g transform="${camT(540, 900, 1.12)}">${duskBack(t)}<path d="M180 1240 L180 760 L900 760 L900 1240" stroke="#8a5a3c" stroke-width="30" fill="none" stroke-linejoin="round"/><path d="M180 1240 L180 760 L900 760 L900 1240" ${LN(4)}/><path d="M200 800 q8 60 -4 120 M880 820 q-8 80 4 160" ${LN(8, '#b5703f', .7)}/></g>`;
  }
  return s;
}
// S4a — Emir beats three, scores into the net-less goal
function e2s4a(u, t) {
  const pan = -E(u / 7) * 160;
  const ex = lerp(120, 820, E(u / 5.8));
  let s = `<g transform="translate(${pan} 0)">${duskBack(t, 'sit', u > 6.0 ? 1 : 0)}<g transform="translate(1080 0)">${duskBack(t + 1, 'none', 0)}</g>`;
  s += `<path d="M1000 1520 L1000 1250 L1180 1210 L1180 1480" stroke="#8a5a3c" stroke-width="16" fill="none" stroke-linejoin="round"/><path d="M1000 1520 L1000 1250 L1180 1210 L1180 1480" ${LN(3)}/>`;
  const items = [];
  // teammate: far back, free, waving
  items.push([1330, `<g transform="translate(${ex - 300} 1330) scale(.7)">${runner(u * 1.4, { shirt: '#5b6f8a', shirtF: '#465670', pants: '#2b2f38', skin: '#c08a66', speed: .6 })}</g>`]);
  const def = (x0, y0, sc, beatT, col, fall) => {
    const lunge = E((u - beatT + .5) / .5) * 40;
    const dx = x0 - lunge;
    const fr = fall ? E((u - beatT) / .6) : 0;
    const spd = u < beatT ? .45 : .9;
    return [y0, `<g transform="translate(${dx} ${y0}) rotate(${-fr * 75} 0 210) scale(${-sc} ${sc})">${runner(u * (u < beatT ? .9 : 1.6), { shirt: col, shirtF: '#5a2a28', pants: '#2a2622', skin: fall ? '#b07a58' : '#c9946f', speed: spd, lean: -6 })}</g>`];
  };
  items.push(def(330, 1440, .85, 1.3, '#7a3a3a', 0));
  items.push(def(560, 1610, 1.1, 2.8, '#7a3a3a', 0));
  items.push(def(760, 1560, 1.3, 4.4, '#8a3c3a', 1));
  // Emir (mid depth)
  items.push([1520, `<g transform="translate(${ex} 1520) scale(1.12)">${runner(u * 1.6, { curly: 1, num: '10', skin: '#c99a76', shirt: '#e2dfd5', shirtF: '#c3bfb2', pants: '#2f3a52', speed: u < 5.8 ? 1 : .4 })}</g>`]);
  items.sort((a, b) => a[0] - b[0]);
  for (const [, g] of items) s += g;
  if (u > 4.5) s += `<g fill="url(#dustG)"><circle cx="${700}" cy="1760" r="${60 + 90 * E((u - 4.5) / .8)}"/><circle cx="${800}" cy="1780" r="${40 + 80 * E((u - 4.6) / .8)}"/></g>`;
  let bx, by;
  if (u < 5.8) { bx = ex + 90 + Math.sin(u * 9) * 10; by = 1740 - Math.abs(Math.sin(u * 9)) * 16; }
  else if (u < 6.25) { const k = (u - 5.8) / .45; bx = lerp(ex + 90, 1260, k); by = lerp(1740, 1380, k) - Math.sin(k * Math.PI) * 80; }
  else { const k = C((u - 6.25) / .6); bx = lerp(1260, 1200, k); by = lerp(1380, 1700, E(k)); }
  s += `<circle cx="${bx}" cy="${by}" r="24" fill="#f3f1ea" ${S(4)}/><path d="M${bx - 8} ${by - 6} l10 -6 l8 8 l-6 10 h-10Z" fill="${INK}"/>`;
  if (u > 6.2 && u < 6.6) s += `<g ${LN(5, '#fff', .9)}><path d="M1280 1340 l30 -20 M1290 1380 l40 0 M1280 1420 l30 20"/></g>`;
  s += `</g>`;
  return s;
}
function duskClose(t, blur = true) { return `<g opacity=".85"><g transform="translate(-540 -1000) scale(2)">${duskBack(t)}</g></g><rect width="1080" height="1920" fill="#f1c48a" opacity=".18"/>`; }
function e2s4b(u, t) { // teammate shouts
  let s = `<g transform="${camT(540, 900, 1.03)}">${duskClose(t)}<g transform="translate(540 900) scale(2.2)"><path d="M-210 560 C-220 330 -170 232 -54 204 L54 204 C170 232 220 330 210 560Z" fill="#5b6f8a" ${S(6)}/><path d="M-40 112 L-42 208 Q0 232 42 208 L40 112Z" fill="#aa7a5a" ${S(5)}/>${limb(`M180 290 L260 120 L${240 + Math.sin(u * 14) * 20} -40`, 50, '#5b6f8a')}<g transform="translate(${240 + Math.sin(u * 14) * 20} -60)">${handOpen(SKIN_F, '#5b6f8a')}</g>${mateHead({ mouth: talk(u, .1, 1.5, 14) + .2 })}</g></g>`;
  return s;
}
function e2s4c(u, t) { // Emir cocky line
  return `<g transform="${camT(540, 900, 1.03 + .03 * E(u / 2.2))}">${duskClose(t)}<g transform="translate(540 880) scale(2.5)">${emirBody()}${emirHead({ smirk: 1, mouth: talk(u, .1, 2.0, 17) })}</g></g>`;
}
function e2s4d(u, t) { // Emir walks back, narrator
  const sc = lerp(1.2, 1.5, E(u / 3.6)), bob = Math.abs(Math.sin(u * 5)) * 8;
  return `<g transform="${camT(540, 1000, 1)}">${duskBack(t, 'sit', .6)}<g transform="translate(540 ${820 - bob}) scale(${sc})">${limb('M-70 520 L-78 880 L-82 1200', 92, '#2f3a52')}${limb('M70 520 L78 880 L82 1200', 92, '#2f3a52')}${emirBody()}${limb('M-180 290 L-220 450 L-170 560', 54, '#c3bfb2')}${limb('M180 290 L220 450 L170 560', 54, '#c3bfb2')}<g transform="translate(-170 566)">${handFist(SKIN_E)}</g><g transform="translate(170 566)">${handFist(SKIN_E)}</g>${emirHead({ smirk: .9 })}</g></g>`;
}
// S5a — defender rises from the dust: the jab
function e2s5a(u, t) {
  const rise = E(u / 1.2);
  return `<g transform="${camT(540, 900, 1.02 + .04 * E(u / 4))}">${duskClose(t)}<g fill="url(#dustG)" opacity="${1 - rise * .6}"><circle cx="300" cy="1700" r="300"/><circle cx="800" cy="1760" r="260"/></g><g transform="translate(540 ${lerp(1250, 900, rise)}) scale(2.2)">${defBody(1)}${defHead({ smirk: 1, mouth: talk(u, .3, 3.4, 15) })}</g></g>`;
}
// S5b — Emir freezes
function e2s5b(u, t) {
  const an = E((u - .3) / .8);
  return `<g transform="${camT(540, 820, 1.06 + .1 * E(u / 1.6))}">${duskClose(t)}<rect width="1080" height="1920" fill="#3a2a2a" opacity="${.15 * an}"/><g transform="translate(540 880) scale(2.6)">${emirBody()}${emirHead({ smirk: 1 - an, anger: an })}</g></g>`;
}
// S5c — the left hook (side view two-shot)
function profileHead(skin, hairFn, flip) {
  let s = `<path d="M-84 -30 C-90 -112 -22 -142 30 -138 C82 -134 104 -98 106 -52 L108 -22 L124 14 L106 22 C110 42 104 58 96 64 C98 84 86 104 64 112 C38 120 8 116 -22 100 C-52 84 -74 50 -84 -30Z" fill="${skin}" ${S(6)}/>`;
  s += `<ellipse cx="-22" cy="10" rx="18" ry="28" fill="${skin}" ${S(4)}/><path d="M60 -50 L98 -40" ${LN(9, '#141110')}/><path d="M68 -26 Q80 -32 94 -24 Q80 -20 68 -26Z" fill="#f4f0e8" ${S(3)}/><circle cx="86" cy="-26" r="5" fill="#1a1412"/><path d="M80 78 Q92 76 100 72" ${LN(4.5)}/>`;
  s += hairFn();
  return flip ? `<g transform="scale(-1 1)">${s}</g>` : s;
}
const emirHair = () => curls([[-70, -60, 30], [-40, -100, 32], [0, -124, 32], [40, -120, 28], [70, -96, 24], [-84, -16, 22], [-56, -30, 22], [-20, -70, 24], [20, -84, 22]]);
const defHair = () => `<path d="M-86 -10 C-92 -110 -20 -140 30 -136 C80 -132 102 -100 104 -70 C70 -90 20 -96 -10 -86 C-40 -76 -60 -40 -66 0Z" fill="url(#buzz)"/>`;
function e2s5c(u, t) {
  const wind = E(u / .45), strike = E((u - .45) / .22), hit = u > .67;
  const snap = hit ? E((u - .67) / .25) * (1 - E((u - 1.3) / .8) * .5) : 0;
  const dust = E((u - 1.2) / 1.2);
  let s = `<g transform="${camT(540, 1000, 1.05 + (hit && u < .9 ? .04 : 0))} translate(${hit && u < .85 ? Math.sin(u * 120) * 8 : 0} 0)">${duskClose(t)}`;
  // defender (right, facing left)
  s += `<g transform="translate(780 ${980 + snap * 20}) rotate(${-snap * 14})"><path d="M-160 700 C-180 400 -120 260 -10 230 L90 240 C200 270 240 420 240 700Z" fill="url(#maroon)" ${S(6)}/><path d="M-20 160 L-24 250 L40 250 L36 160Z" fill="#a87352" ${S(5)}/>`;
  s += `<g transform="translate(0 40) rotate(${-snap * 18}) scale(1.3)">${profileHead(SKIN_D, defHair, true)}</g>${limb('M-40 320 L-120 460 L-80 560', 70, '#7a3a3a')}</g>`;
  // Emir (left, facing right) — left hook with the near (left) arm
  s += `<g transform="translate(300 1000)"><path d="M-200 700 C-220 400 -160 260 -40 240 L60 230 C170 260 210 400 200 700Z" fill="url(#tee)" ${S(6)}/><path d="M-20 160 L-24 250 L40 250 L36 160Z" fill="#b3815f" ${S(5)}/>`;
  s += `<g transform="translate(10 40) scale(1.25)">${profileHead(SKIN_E, emirHair, false)}</g>`;
  const fx = lerp(lerp(60, -60, wind), 420, strike), fy = lerp(lerp(380, 300, wind), 70, strike);
  const elx = lerp(lerp(-40, -120, wind), 220, strike), ely = lerp(480, 140 + 60 * (1 - strike), strike);
  s += limb(`M40 300 L${elx} ${ely} L${fx} ${fy}`, 74, '#c3bfb2') + `<g transform="translate(${fx + 20} ${fy}) rotate(-90)">${handFist(SKIN_E)}</g></g>`;
  if (hit && u < 1.0) s += `<g transform="translate(720 1060)" opacity="${1 - E((u - .67) / .33)}"><path d="M0 -80 L20 -20 L80 -30 L30 10 L60 70 L0 30 L-60 70 L-30 10 L-80 -30 L-20 -20Z" fill="#fff" ${S(4)}/></g>`;
  // dust/chaos
  if (dust > 0) {
    s += `<g fill="url(#dustG)" opacity="${dust}"><circle cx="300" cy="1300" r="${300 + 300 * dust}"/><circle cx="800" cy="1200" r="${260 + 300 * dust}"/><circle cx="540" cy="1600" r="${380 + 200 * dust}"/></g>`;
    for (let i = 0; i < 4; i++) { const x = 150 + i * 260 + Math.sin(t * 6 + i) * 20; s += `<g opacity="${.6 * dust}" transform="translate(${x} 1500) scale(.9)"><circle cx="0" cy="-330" r="44" fill="#5a4636"/><path d="M-50 -280 L50 -280 L60 0 L-60 0Z" fill="#5a4636"/>${limb(`M-40 -260 L${-100 + Math.sin(t * 10 + i) * 30} -360`, 26, '#5a4636', 0)}</g>`; }
  }
  return s + `</g>`;
}
// S5d — little brother watching, doesn't close his eyes
function e2s5d(u, t) {
  return `<g transform="${camT(540, 900, 1.04 + .06 * E(u / 2))}"><rect width="1080" height="1920" fill="url(#dusk)"/><g fill="url(#dustG)" opacity=".8"><circle cx="300" cy="1500" r="420"/><circle cx="850" cy="1600" r="380"/></g>
    <rect x="0" y="1280" width="1080" height="640" fill="#a7967f" ${S(5)}/>${[0, 1, 2, 3].map(i => `<rect x="${i * 300 - 40}" y="1330" width="300" height="80" fill="none" stroke="#8b7a64" stroke-width="3"/>`).join('')}
    <g transform="translate(540 940) scale(2.6)"><path d="M-150 400 C-160 260 -120 180 -40 160 L40 160 C120 180 160 260 150 400Z" fill="#4f6a66" ${S(6)}/><path d="M-30 90 L-32 165 Q0 182 32 165 L30 90Z" fill="#b3815f" ${S(5)}/>${kidHead()}</g></g>`;
}
// S6 — kahvehane: the coupon
function e2s6(u, t) {
  const cr = E((u - .6) / 1.4), drop = E((u - 2.2) / .4);
  let s = `<g transform="${camT(540, 1000, 1.03 + .07 * E(u / 6))}"><rect width="1080" height="1920" fill="#3a332c"/>`;
  s += `<rect x="60" y="160" width="420" height="270" rx="10" fill="#0e1012" ${S(5)}/><rect x="80" y="180" width="380" height="230" fill="#1e3a5c"/>`;
  for (let i = 0; i < 5; i++) s += `<rect x="96" y="${196 + i * 42}" width="348" height="32" fill="${i === 4 ? '#7a2f22' : '#2c4f78'}"/><text x="110" y="${219 + i * 42}" font-family="Inter" font-weight="700" font-size="18" fill="#fff">${['ANK 2-1 KON', 'IZM 0-0 BUR', 'TRB 3-1 SAM', 'KAY 1-1 SVS', 'BES 0-1 ADN'][i]}</text>`;
  s += `<rect x="60" y="160" width="420" height="270" fill="#9cc3d8" opacity=".06"/><circle cx="270" cy="300" r="320" fill="#6f9ab3" opacity=".12" filter="url(#blur2)"/>`;
  s += `<rect x="620" y="300" width="300" height="200" fill="#4a3f36" opacity=".6"/><circle cx="780" cy="520" r="90" fill="#22201d" opacity=".7"/><path d="M640 820 q140 -200 280 0Z" fill="#22201d" opacity=".7"/>`; // someone else, blurred
  // father
  s += `<g transform="translate(540 900) scale(2.0)"><path d="M-230 560 C-240 330 -190 232 -60 204 L60 204 C190 232 240 330 230 560Z" fill="url(#kahve)" ${S(6)}/><path d="M-46 120 L-48 208 Q0 232 48 208 L46 120Z" fill="#aa7a5a" ${S(5)}/>${fatherHead({ look: -.8 })}</g>`;
  // table
  s += `<polygon points="${poly([[0, 1380], [1080, 1380], [1080, 1920], [0, 1920]])}" fill="#5a4030" ${S(5)}/><path d="M0 1380 H1080" ${LN(8, '#7a5a40')}/>`;
  s += `<g transform="translate(860 1520)"><ellipse cx="0" cy="60" rx="90" ry="22" fill="#d7d2c4" ${S(4)}/><path d="M-34 50 l-10 -100 h88 l-10 100Z" fill="#b5642f" opacity=".85" ${S(4)}/></g>`;
  s += `<g transform="translate(${420 - drop * 40} ${1560 + drop * 40}) rotate(${drop * 10})">${handCoupon(SKIN_F, 'url(#kahve)', cr)}</g>`;
  if (drop > .5) s += `<g transform="translate(330 1700) rotate(30)"><ellipse cx="0" cy="0" rx="40" ry="30" fill="#e6e1d4" ${S(4)}/><path d="M-20 -10 l30 10 l-20 14" ${LN(2.5, '#9a9488')}/></g>`;
  return s + `</g>`;
}
function titleCard2(u) { return `<rect width="1080" height="1920" fill="#0b0b0c"/><g opacity="${E(u / .5)}"><rect x="420" y="890" width="10" height="70" fill="${ORANGE}"/><text x="450" y="948" font-family="Inter" font-weight="900" font-size="64" letter-spacing="10" fill="#efe8dc">BÖLÜM 2</text></g>`; }

// ---------- timeline ----------
const SHOTS2 = [
  [0.0, 4.5, e2s1a], [4.5, 5.6, e2s1b], [5.6, 13.0, e2s1c],
  [13.0, 21.5, e2s2a], [21.5, 24.5, e2s2b], [24.5, 28.0, e2s2c],
  [28.0, 31.0, e2s3], [31.0, 40.2, (u, t) => goalSeq(u, t)], [40.2, 41.8, e2s4b], [41.8, 44.0, e2s4c], [44.0, 47.6, e2s4d],
  [47.6, 51.6, e2s5a], [51.6, 53.2, e2s5b], [53.2, 56.0, e2s5c], [56.0, 58.0, e2s5d],
  [58.0, 64.0, e2s6], [64.0, 66.8, (u) => titleCard(u, 2, 'SOL KROŞE', 'DÜDÜK')]
];
const SUBS2 = [
  [5.8, 7.2, 'KEREM', 'Sade. Unutmadım.', ''],
  [7.5, 9.2, 'YUSUF', 'Otobüsü götürdüler, Kero.', ''],
  [9.5, 12.6, 'KEREM', 'Borçlar benden önce.', 'Ben temizliyorum.'],
  [13.3, 15.6, 'KEREM', 'Hatırlıyor musun?', 'Tam şurası.'],
  [15.8, 18.8, 'KEREM', 'Sen vurmuştun,', 'ben tribünde sevinmiştim.'],
  [19.0, 21.2, 'KEREM', 'Bütün şehir bağırmıştı.', ''],
  [21.7, 24.2, 'YUSUF', 'Ben artık sadece', 'izliyorum, Kero.'],
  [24.7, 27.0, 'KEREM', 'O zaman gel…', 'buradan izle.'],
  [40.3, 41.7, 'ARKADAŞI', 'Pas versene!', ''],
  [41.9, 43.8, 'EMİR', 'Verseydim gol olur muydu?', ''],
  [44.1, 45.9, '', 'Mahallede Emir Kılıç\'ı', 'herkes iki şeyle tanırdı.'],
  [46.0, 47.5, '', 'Sol ayağı…', 've sol kroşesi.'],
  [47.8, 51.1, 'SAVUNMACI', 'Babana sor bakalım,', 'bu hafta kaç kupon yattı?'],
  [58.2, 60.8, '', 'O akşam Emir\'in babası', 'yine kaybetti.'],
  [61.0, 63.4, '', 'Ama kaybettiği şey', 'para değildi.']
];
const END2 = 64.0, TOTAL2 = 66.8;

function renderFrame2(t) {
  let body = '';
  for (const [a, b, fn] of SHOTS2) if (t >= a && t < b) { body = fn(t - a, t); break; }
  if (!body) body = titleCard(t - END2, 2, 'SOL KROŞE', 'DÜDÜK');
  let s = DEFS + DEFS2 + body;
  if (t < END2) s += `<rect width="1080" height="1920" fill="url(#vig)"/>`;
  if (t > END2 - .6 && t < END2) s += `<rect width="1080" height="1920" fill="#000" opacity="${E((t - (END2 - .6)) / .5)}"/>`;
  let sh = null; for (const x of SUBS2) if (t >= x[0] && t <= x[1]) sh = x;
  if (sh) {
    const o = Math.min(C((t - sh[0]) / .12), C((sh[1] - t) / .12));
    const one = !sh[4]; const y1 = one ? 1720 : 1680, y2 = 1750;
    s += `<g font-family="Inter" text-anchor="middle" opacity="${o}">`;
    if (sh[2]) s += `<text x="540" y="${y1 - 70}" font-weight="800" font-size="30" letter-spacing="6" fill="${ORANGE}" stroke="#000" stroke-width="6" paint-order="stroke">${sh[2]}</text>`;
    s += `<g font-weight="700" font-size="54" fill="#fff" stroke="#000" stroke-width="10" paint-order="stroke" stroke-linejoin="round"><text x="540" y="${y1}">${sh[3]}</text>${one ? '' : `<text x="540" y="${y2}">${sh[4]}</text>`}</g></g>`;
  }
  document.getElementById('svg').innerHTML = s;
}
window.render = renderFrame2;
