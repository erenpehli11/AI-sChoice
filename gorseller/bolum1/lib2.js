// ============ Bölüm 2 karakterleri ============
const SKIN_E = 'url(#skinE)', SKIN_D = 'url(#skinD)', SKIN_F = 'url(#skinF)';
const DEFS2 = `<defs>
  <linearGradient id="skinE" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dcae8a"/><stop offset="1" stop-color="#b3815f"/></linearGradient>
  <linearGradient id="skinD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cf9a74"/><stop offset="1" stop-color="#a87352"/></linearGradient>
  <linearGradient id="skinF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d3a07c"/><stop offset="1" stop-color="#aa7a5a"/></linearGradient>
  <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c6a7a"/><stop offset=".55" stop-color="#d79a72"/><stop offset="1" stop-color="#f1c48a"/></linearGradient>
  <linearGradient id="dirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9946a"/><stop offset="1" stop-color="#94704d"/></linearGradient>
  <linearGradient id="tee" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2dfd5"/><stop offset="1" stop-color="#c3bfb2"/></linearGradient>
  <linearGradient id="maroon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a3c3a"/><stop offset="1" stop-color="#682a29"/></linearGradient>
  <linearGradient id="kahve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3f36"/><stop offset="1" stop-color="#2c2520"/></linearGradient>
  <radialGradient id="dustG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e6cfa8" stop-opacity=".95"/><stop offset="1" stop-color="#e6cfa8" stop-opacity="0"/></radialGradient>
  <pattern id="buzz" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#2a2420" opacity=".7"/><circle cx="6" cy="6" r="1.4" fill="#2a2420" opacity=".7"/></pattern>
  <pattern id="beard" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#141110" opacity=".8"/><circle cx="5.5" cy="5" r="1.3" fill="#3a332e" opacity=".8"/></pattern>
</defs>`;

function curls(list, col = '#141110') {
  let c = ''; for (const [x, y, r] of list) c += `<circle cx="${x}" cy="${y}" r="${r}"/>`;
  return `<g fill="${col}" ${S(4)}>${c}</g><g fill="${col}">${c.replace(/r="(\d+)"/g, (m, v) => `r="${v - 4}"`)}</g><g ${LN(2.5, '#4a3f3a', .8)}>${list.slice(0, 6).map(([x, y, r]) => `<path d="M${x - r * .4} ${y - r * .3} q${r * .3} ${-r * .3} ${r * .6} 0"/>`).join('')}</g>`;
}
// ---------- EMİR (front), origin head centre ----------
// o: { smirk 0..1, anger 0..1, mouth 0..1 }
function emirHead(o = {}) {
  const sm = o.smirk || 0, an = o.anger || 0, mouth = o.mouth || 0;
  let s = '';
  s += `<ellipse cx="-90" cy="14" rx="16" ry="30" fill="${SKIN_E}" ${S(5)}/><ellipse cx="90" cy="14" rx="16" ry="30" fill="${SKIN_E}" ${S(5)}/>`;
  s += `<path d="M0 -120 C72 -120 92 -58 90 6 C88 74 62 124 0 136 C-62 124 -88 74 -90 6 C-92 -58 -72 -120 0 -120Z" fill="${SKIN_E}" ${S(6)}/>`;
  s += `<path d="M40 60 C60 70 74 86 70 104" ${LN(3, '#9a6a4e', .5)}/>`;
  // brows (intense)
  const t = 10 + an * 14;
  s += `<path d="M-72 ${-34 + an * 2} Q-46 ${-40 + t * .2} -18 ${-24 + an * 6}" ${LN(10, '#141110')}/><path d="M72 ${-34 + an * 2} Q46 ${-40 + t * .2} 18 ${-24 + an * 6}" ${LN(10, '#141110')}/>`;
  for (const x of [-42, 42]) {
    s += `<path d="M${x - 22} 2 Q${x} ${-10 + an * 4} ${x + 22} 2 Q${x} ${12 - an * 2} ${x - 22} 2Z" fill="#f4f0e8" ${S(3)}/>`;
    s += `<circle cx="${x}" cy="2" r="8" fill="#2b1d15"/><circle cx="${x}" cy="2" r="3.5" fill="#0b0705"/><circle cx="${x + 3}" cy="-1" r="2.3" fill="#fff"/>`;
    s += `<path d="M${x - 24} 0 Q${x} ${-12 + an * 6} ${x + 24} 0" ${LN(5)}/>`;
  }
  s += `<path d="M2 -6 C4 22 14 40 8 50 C2 56 -8 54 -12 48" ${LN(4.5)}/>`;
  // mouth
  if (mouth > .05) s += `<path d="M-26 ${92 - sm * 4} Q0 ${88} 28 ${90 - sm * 10} Q2 ${100 + mouth * 22} -26 ${92 - sm * 4}Z" fill="#5a2e26" ${S(4)}/>`;
  else if (an > .5) s += `<path d="M-24 96 Q0 90 24 96" ${LN(5)}/><path d="M-28 100 l-4 4 M28 100 l4 4" ${LN(3)}/>`;
  else s += `<path d="M-24 94 Q4 ${98 - sm * 2} 28 ${90 - sm * 12}" ${LN(5)}/>`;
  s += curls([[-84, -40, 26], [-64, -84, 32], [-26, -114, 34], [16, -120, 34], [56, -102, 32], [84, -60, 28], [-92, -6, 18], [92, -10, 18], [-40, -76, 28], [0, -86, 28], [38, -78, 28], [-70, -34, 22], [70, -36, 22], [-12, -62, 20], [22, -60, 20]]);
  return s;
}
function emirBody() { // faded tee + track jacket open
  let s = '';
  s += `<path d="M-210 520 C-220 320 -170 228 -54 200 L54 200 C170 228 220 320 210 520Z" fill="url(#tee)" ${S(6)}/>`;
  s += `<text x="0" y="400" text-anchor="middle" font-family="Inter" font-weight="900" font-size="120" fill="${ORANGE}" opacity=".55">10</text>`;
  s += `<path d="M-54 200 Q0 238 54 200" ${LN(5)}/><path d="M-40 110 L-42 205 Q0 228 42 205 L40 110Z" fill="#b3815f" ${S(5)}/>`;
  return s;
}
// ---------- IRI SAVUNMACI (front) ----------
function defHead(o = {}) {
  const sm = o.smirk || 0, mouth = o.mouth || 0, hit = o.hit || 0;
  let s = '';
  s += `<ellipse cx="-112" cy="18" rx="20" ry="32" fill="${SKIN_D}" ${S(5)}/><ellipse cx="112" cy="18" rx="20" ry="32" fill="${SKIN_D}" ${S(5)}/>`;
  s += `<path d="M0 -118 C96 -118 116 -50 114 20 C112 94 84 140 0 150 C-84 140 -112 94 -114 20 C-116 -50 -96 -118 0 -118Z" fill="${SKIN_D}" ${S(6)}/>`;
  s += `<path d="M-110 -10 C-112 -96 -50 -122 0 -122 C50 -122 112 -96 110 -10 C96 -60 60 -80 0 -82 C-60 -80 -96 -60 -110 -10Z" fill="url(#buzz)"/>`;
  s += `<path d="M-82 -30 L-22 -24 M82 -30 L22 -24" ${LN(13, '#2a2420')}/>`;
  for (const x of [-48, 48]) s += `<path d="M${x - 16} 2 Q${x} -6 ${x + 16} 2 Q${x} 8 ${x - 16} 2Z" fill="#f4f0e8" ${S(3)}/><circle cx="${x}" cy="2" r="5" fill="#1a1412"/>`;
  s += `<path d="M0 -4 C6 24 24 40 14 54 C4 62 -14 60 -20 50" ${LN(5)}/><path d="M-26 50 q-10 4 -6 12 M26 48 q10 4 6 12" ${LN(3, INK, .6)}/>`;
  s += `<path d="M-90 50 C-80 120 -40 146 0 150 C40 146 80 120 90 50 C70 96 40 108 0 108 C-40 108 -70 96 -90 50Z" fill="url(#buzz)" opacity=".6"/>`;
  if (mouth > .05) s += `<path d="M-38 96 Q0 ${92 - sm * 4} 40 ${88 - sm * 8} Q4 ${108 + mouth * 22} -38 96Z" fill="#5a2e26" ${S(4)}/><path d="M-26 96 h18 M6 94 h20" ${LN(6, '#f4f0e8')}/>`;
  else s += `<path d="M-38 98 Q4 ${104 - sm * 6} 40 ${88 - sm * 10}" ${LN(5)}/>`;
  if (hit) s += `<path d="M-120 -20 l-30 -20 M-124 10 l-40 0 M-118 40 l-32 20" ${LN(5, '#fff', hit)}/>`;
  return s;
}
function defBody(dusty = 0) {
  let s = `<path d="M-260 560 C-270 330 -210 230 -70 206 L70 206 C210 230 270 330 260 560Z" fill="url(#maroon)" ${S(6)}/>`;
  s += `<path d="M-60 206 Q0 240 60 206" ${LN(5)}/><path d="M-56 120 L-60 212 Q0 240 60 212 L56 120Z" fill="#a87352" ${S(5)}/>`;
  if (dusty) s += `<g fill="#d9bf98" opacity="${.7 * dusty}"><ellipse cx="-120" cy="400" rx="80" ry="40"/><ellipse cx="90" cy="460" rx="70" ry="30"/><ellipse cx="0" cy="300" rx="40" ry="20"/></g>`;
  return s;
}
// ---------- TAKIM ARKADAŞI (front) ----------
function mateHead(o = {}) {
  const mouth = o.mouth || 0;
  let s = `<ellipse cx="-92" cy="14" rx="16" ry="30" fill="${SKIN_F}" ${S(5)}/><ellipse cx="92" cy="14" rx="16" ry="30" fill="${SKIN_F}" ${S(5)}/>`;
  s += `<path d="M0 -118 C76 -118 94 -56 92 8 C90 76 62 126 0 136 C-62 126 -90 76 -92 8 C-94 -56 -76 -118 0 -118Z" fill="${SKIN_F}" ${S(6)}/>`;
  s += `<path d="M-96 0 C-104 -96 -40 -132 4 -130 C66 -128 104 -92 96 0 C90 -50 70 -74 30 -80 C10 -66 -30 -64 -60 -70 C-80 -60 -92 -36 -96 0Z" fill="#3a2a20" ${S(5)}/>`;
  s += `<path d="M-64 -30 Q-44 -44 -20 -34 M64 -30 Q44 -44 20 -34" ${LN(8, '#3a2a20')}/>`;
  for (const x of [-40, 40]) s += `<ellipse cx="${x}" cy="4" rx="16" ry="12" fill="#f4f0e8" ${S(3)}/><circle cx="${x}" cy="4" r="6" fill="#1a1412"/>`;
  s += `<path d="M2 -2 C6 22 14 38 8 48 C2 54 -8 52 -10 46" ${LN(4.5)}/>`;
  if (mouth > .05) s += `<ellipse cx="0" cy="96" rx="${22 + mouth * 6}" ry="${8 + mouth * 22}" fill="#5a2e26" ${S(4)}/>`;
  else s += `<path d="M-20 94 Q0 98 20 94" ${LN(4)}/>`;
  return s;
}
// ---------- KÜÇÜK KARDEŞ (front, ~10 yaş, turuncu şapka) ----------
function kidHead(o = {}) {
  let s = `<ellipse cx="-88" cy="20" rx="16" ry="26" fill="${SKIN_E}" ${S(5)}/><ellipse cx="88" cy="20" rx="16" ry="26" fill="${SKIN_E}" ${S(5)}/>`;
  s += `<path d="M0 -104 C70 -104 90 -46 88 16 C86 80 56 120 0 126 C-56 120 -86 80 -88 16 C-90 -46 -70 -104 0 -104Z" fill="${SKIN_E}" ${S(6)}/>`;
  s += `<path d="M-92 -10 C-96 -86 -50 -118 0 -118 C50 -118 96 -86 92 -10 Q0 -40 -92 -10Z" fill="${ORANGE}" ${S(6)}/>`;
  s += `<path d="M-60 -30 Q0 -52 120 -26 Q140 -16 120 -6 Q20 -26 -60 -14Z" fill="#c4561f" ${S(5)}/>`;
  s += `<circle cx="0" cy="-104" r="8" fill="#c4561f" ${S(3)}/><path d="M-90 -6 q-10 30 4 40 M90 -6 q10 30 -4 40" fill="#141110" ${LN(10, '#141110')}/>`;
  s += `<path d="M-60 6 Q-40 -2 -20 4 M60 6 Q40 -2 20 4" ${LN(6, '#141110')}/>`;
  for (const x of [-38, 38]) s += `<ellipse cx="${x}" cy="28" rx="17" ry="16" fill="#f4f0e8" ${S(3)}/><circle cx="${x}" cy="30" r="9" fill="#2b1d15"/><circle cx="${x + 3}" cy="26" r="3" fill="#fff"/>`;
  s += `<path d="M0 30 C4 50 10 62 4 68" ${LN(4)}/><path d="M-14 94 Q0 ${92} 14 94" ${LN(4)}/>`;
  s += `<ellipse cx="-58" cy="70" rx="14" ry="8" fill="#d97a5e" opacity=".25"/><ellipse cx="58" cy="70" rx="14" ry="8" fill="#d97a5e" opacity=".25"/>`;
  return s;
}
// ---------- BABA (front): siyah saç, sakal, vazgeçmiş ----------
function fatherHead(o = {}) {
  const look = o.look == null ? -.6 : o.look;
  let s = `<ellipse cx="-98" cy="14" rx="18" ry="32" fill="${SKIN_F}" ${S(5)}/><ellipse cx="98" cy="14" rx="18" ry="32" fill="${SKIN_F}" ${S(5)}/>`;
  s += `<path d="M0 -124 C80 -124 100 -60 98 8 C96 80 70 134 0 148 C-70 134 -96 80 -98 8 C-100 -60 -80 -124 0 -124Z" fill="${SKIN_F}" ${S(6)}/>`;
  // full black beard
  s += `<path d="M-96 20 C-96 110 -56 168 0 176 C56 168 96 110 96 20 C86 70 62 92 0 94 C-62 92 -86 70 -96 20Z" fill="#1d1916" ${S(5)}/>`;
  s += `<path d="M-96 20 C-96 110 -56 168 0 176 C56 168 96 110 96 20 C86 70 62 92 0 94 C-62 92 -86 70 -96 20Z" fill="url(#beard)" opacity=".6"/>`;
  s += `<path d="M-30 150 q10 10 22 4 M12 156 q14 6 24 -4" ${LN(3, '#6b625a', .8)}/>`;
  s += `<path d="M-44 84 Q0 70 44 84 Q20 100 0 92 Q-20 100 -44 84Z" fill="#1d1916" ${S(3)}/>`;
  s += `<path d="M-16 104 Q0 100 16 104" ${LN(4, '#6b3a30')}/>`;
  // messy black hair
  s += `<path d="M-104 4 C-118 -100 -56 -150 0 -150 C60 -150 118 -100 104 4 C100 -40 84 -66 60 -76 L40 -60 L20 -82 L-4 -62 L-26 -84 L-46 -64 L-60 -78 C-86 -66 -100 -40 -104 4Z" fill="#1d1916" ${S(6)}/>`;
  s += `<path d="M-60 -120 q30 -16 60 -8 M10 -130 q36 0 60 24" ${LN(3, '#4a4440', .8)}/>`;
  s += `<path d="M-74 -18 Q-48 -30 -20 -26 M74 -18 Q48 -30 20 -26" ${LN(9, '#1d1916')}/>`;
  for (const x of [-44, 44]) {
    s += `<path d="M${x - 22} 4 Q${x} -6 ${x + 22} 4 Q${x} 14 ${x - 22} 4Z" fill="#f0ebe2" ${S(3)}/><circle cx="${x}" cy="${6 - look * 4}" r="7" fill="#2b1d15"/>`;
    s += `<path d="M${x - 24} 6 Q${x} -2 ${x + 24} 6 L${x + 24} 0 Q${x} -12 ${x - 24} 0Z" fill="${SKIN_F}"/><path d="M${x - 24} 6 Q${x} -2 ${x + 24} 6" ${LN(5)}/>`;
    s += `<path d="M${x - 18} 22 Q${x} 30 ${x + 18} 22 M${x - 14} 30 Q${x} 36 ${x + 14} 30" ${LN(2.5, INK, .5)}/>`;
  }
  s += `<path d="M2 -6 C6 24 20 42 12 54 C4 60 -10 58 -14 52" ${LN(5)}/>`;
  return s;
}
// open palm (dismissive wave), origin at wrist, fingers up
function handOpen(skin, sleeve) {
  let s = `<path d="M-46 40 L46 40 L56 200 L-56 200Z" fill="${sleeve}" ${S(5)}/><rect x="-50" y="30" width="100" height="26" fill="#f6f4ee" ${S(4)}/>`;
  s += `<path d="M-44 30 C-50 -20 -40 -60 0 -62 C40 -60 52 -20 46 30Z" fill="${skin}" ${S(5)}/>`;
  s += finger([[-30, -50], [-36, -96], [-38, -128]], 20, skin) + finger([[-8, -58], [-8, -110], [-8, -144]], 21, skin) + finger([[14, -56], [18, -106], [20, -138]], 21, skin) + finger([[34, -44], [42, -84], [46, -110]], 18, skin);
  s += finger([[-44, 0], [-74, -26], [-88, -48]], 22, skin);
  return s;
}
// hand holding a small coffee cup from below/side; origin = cup centre
function handCup(skin, sleeve) {
  let s = `<path d="M60 40 L240 120 L210 200 L40 110Z" fill="${sleeve}" ${S(5)}/><path d="M40 110 L60 40 L82 48 L62 118Z" fill="#f6f4ee" ${S(4)}/>`;
  s += `<ellipse cx="0" cy="40" rx="70" ry="16" fill="#fbf7ee" ${S(4)}/>`;
  s += `<path d="M-36 -40 h72 v44 q0 26 -36 26 q-36 0 -36 -26Z" fill="#fbf7ee" ${S(4)}/><ellipse cx="0" cy="-40" rx="36" ry="9" fill="#3b2216" ${S(3)}/>`;
  s += `<path d="M36 -30 q22 4 18 22 q-4 10 -18 8" ${LN(4)}/>`;
  s += `<path d="M30 60 C60 60 90 70 100 90 L70 120 C50 104 30 90 20 80Z" fill="${skin}" ${S(5)}/>`;
  s += finger([[40, 54], [10, 52], [-30, 54]], 18, skin) + finger([[44, 70], [10, 70], [-24, 72]], 18, skin);
  s += finger([[56, 40], [36, 20], [40, -4]], 20, skin);
  s += `<path d="M-10 -64 q-8 -18 4 -30 M10 -64 q-8 -18 4 -30" ${LN(3, '#fff', .7)}/>`;
  return s;
}
// crumpling coupon hand (top-down-ish), origin centre
function handCoupon(skin, sleeve, crumple) {
  let s = `<path d="M60 -40 L320 -140 L360 -40 L90 60Z" fill="${sleeve}" ${S(5)}/>`;
  const w = 140 * (1 - crumple * .55), h = 190 * (1 - crumple * .6);
  s += `<g transform="rotate(${-8 + crumple * 30})"><path d="M${-w / 2} ${-h / 2} L${w / 2} ${-h / 2 + crumple * 10} L${w / 2 - crumple * 14} ${h / 2} L${-w / 2 + crumple * 10} ${h / 2 - crumple * 8}Z" fill="#f2eee2" ${S(4)}/>`;
  if (crumple < .5) s += `<g ${LN(2.5, '#7a7468')}>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${-w / 2 + 14} ${-h / 2 + 30 + i * 24} h${w * .6}"/>`).join('')}</g><path d="M${w / 2 - 30} ${h / 2 - 34} l20 20 M${w / 2 - 10} ${h / 2 - 34} l-20 20" ${LN(4, '#b8452b')}/>`;
  else s += `<path d="M${-w / 3} ${-h / 4} l${w / 2} ${h / 5} l${-w / 3} ${h / 3} M${w / 4} ${-h / 3} l${-w / 6} ${h / 2}" ${LN(2.5, '#9a9488')}/>`;
  s += `</g>`;
  s += `<path d="M20 -30 C80 -50 120 -20 110 30 C100 70 60 80 30 60Z" fill="${skin}" ${S(5)}/>`;
  s += finger([[40, -20], [0, -26 + crumple * 20], [-30 + crumple * 30, -14 + crumple * 24]], 22, skin) + finger([[50, 6], [6, 6 + crumple * 10], [-20 + crumple * 30, 14 + crumple * 10]], 22, skin) + finger([[50, 34], [10, 40], [-8 + crumple * 20, 46]], 20, skin);
  s += finger([[30, 54], [0, 70], [-26 + crumple * 24, 66 - crumple * 10]], 22, skin);
  return s;
}
// ---------- side-view runner (small), facing right, origin hip ----------
function runner(p, o = {}) {
  const TAU = Math.PI * 2, L1 = 110, L2 = 106, sp = o.speed == null ? 1 : o.speed;
  const legs = (a, k) => { const kx = Math.sin(a) * L1, ky = Math.cos(a) * L1; return { kx, ky, ax: kx + Math.sin(a - k) * L2, ay: ky + Math.cos(a - k) * L2 }; };
  const aN = .7 * sp * Math.sin(TAU * p), aF = .7 * sp * Math.sin(TAU * p + Math.PI);
  const kN = .3 + 1.1 * sp * Math.max(0, Math.cos(TAU * p)), kF = .3 + 1.1 * sp * Math.max(0, Math.cos(TAU * p + Math.PI));
  const bob = -8 * sp * Math.abs(Math.sin(TAU * p));
  const N = legs(aN, kN), F = legs(aF, kF);
  const lean = (o.lean == null ? 10 : o.lean) * sp;
  let s = `<g transform="translate(0 ${bob})">`;
  s += limb(`M0 0 L${F.kx} ${F.ky} L${F.ax} ${F.ay}`, 30, o.pantsF || '#20242c', 5) + `<ellipse cx="${F.ax + 12}" cy="${F.ay + 4}" rx="22" ry="10" fill="#e6e1d4" ${S(3)}/>`;
  s += `<g transform="rotate(${lean})">`;
  s += limb(`M0 -190 L${-30 * Math.sin(TAU * p) * sp - 6} -120 L${-40 * Math.sin(TAU * p) * sp + 20} -80`, 22, o.shirtF || '#a9a59a', 5);
  s += `<path d="M-38 10 L38 10 L44 -190 Q30 -230 0 -232 Q-36 -230 -46 -190Z" fill="${o.shirt || '#e2dfd5'}" ${S(5)}/>`;
  if (o.num) s += `<text x="0" y="-100" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" fill="${ORANGE}" opacity=".6">${o.num}</text>`;
  s += `<path d="M-10 -228 L-8 -250 L14 -250 L16 -228Z" fill="${o.skin || '#c08a66'}" ${S(3)}/>`;
  s += `<g transform="translate(8 -290)"><ellipse cx="0" cy="0" rx="40" ry="46" fill="${o.skin || '#c08a66'}" ${S(4)}/><path d="M34 -8 l14 10 l-12 6" fill="${o.skin || '#c08a66'}" ${S(3)}/><circle cx="20" cy="-8" r="4" fill="${INK}"/>`;
  if (o.curly) s += curls([[-30, -24, 18], [-10, -40, 20], [14, -40, 18], [30, -28, 14], [-36, 0, 14], [-20, -10, 14]]);
  else s += `<path d="M-42 4 C-46 -44 -10 -54 20 -48 C40 -44 46 -30 40 -22 C20 -30 -10 -24 -24 6Z" fill="${o.hair || '#2a2420'}" ${S(3)}/>`;
  s += `</g>`;
  s += limb(`M6 -186 L${30 * Math.sin(TAU * p) * sp + 20} -120 L${40 * Math.sin(TAU * p) * sp + 46} -86`, 24, o.shirt || '#e2dfd5', 5);
  s += `</g>`;
  s += limb(`M6 0 L${N.kx + 6} ${N.ky} L${N.ax + 6} ${N.ay}`, 32, o.pants || '#2f3a52', 5) + `<ellipse cx="${N.ax + 18}" cy="${N.ay + 4}" rx="24" ry="11" fill="#f0ece0" ${S(3)}/>`;
  s += `</g>`;
  return s;
}
