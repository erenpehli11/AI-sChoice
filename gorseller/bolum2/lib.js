// ============ Ortak kütüphane: yardımcılar, eller, karakterler ============
const INK = '#2a2420';
const ORANGE = '#D9652A';
const S = (w = 5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const LN = (w = 4, c = INK, op = 1) => `stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"`;
const limb = (d, w, col, ow = 7) => `<path d="${d}" stroke="${INK}" stroke-width="${w + ow}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const C = (x) => Math.max(0, Math.min(1, x));
const E = (x) => { x = C(x); return x * x * (3 - 2 * x); };
const lerp = (a, b, t) => a + (b - a) * t;
function rng(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
const poly = (pts) => pts.map(p => p.join(',')).join(' ');
const pts2d = (arr) => 'M' + arr.map(p => p.join(' ')).join(' L');

const SKIN_Y = 'url(#skinY)', SKIN_K = 'url(#skinK)', SKIN_O = 'url(#skinO)';

// ---------- FINGER: segments with ink outline + nail at tip ----------
function finger(points, w, skin, nail = true) {
  points = points.map((q, i) => i === points.length - 1 ? [q[0] + .7, q[1] + .7] : q);
  const d = pts2d(points);
  let s = limb(d, w, skin, 6);
  // knuckle creases
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i], [px, py] = points[i - 1];
    const ang = Math.atan2(y - py, x - px) + Math.PI / 2;
    const dx = Math.cos(ang) * w * .32, dy = Math.sin(ang) * w * .32;
    s += `<path d="M${x - dx} ${y - dy} L${x + dx} ${y + dy}" ${LN(2.2, '#9a6a4e', .7)}/>`;
  }
  if (nail) {
    const n = points.length; const [x, y] = points[n - 1], [px, py] = points[n - 2];
    const a = Math.atan2(y - py, x - px);
    const nx = x - Math.cos(a) * w * .28, ny = y - Math.sin(a) * w * .28;
    s += `<ellipse cx="${nx}" cy="${ny}" rx="${w * .3}" ry="${w * .22}" transform="rotate(${a * 180 / Math.PI} ${nx} ${ny})" fill="#f3d9c6" opacity=".9"/>`;
  }
  return s;
}

// ---------- HANDS ----------
// pen grip: pen vertical, nib at (0,0), barrel up to (0,-330). Right hand, seen from above.
function handPen(skin, sleeve = 'url(#suit)', cuff = '#f6f4ee', link = '#c9a24a') {
  let s = '';
  // forearm + cuff to the upper-right
  s += `<path d="M120 -280 C280 -500 470 -760 560 -940 L900 -720 C720 -560 500 -330 300 -100Z" fill="${sleeve}" ${S(5)}/>`;
  if (sleeve !== '#000') s += `<path d="M260 -360 L560 -740 M330 -300 L640 -680 M200 -330 Q240 -300 300 -250" ${LN(3, '#555a66', .7)}/>`;
  s += `<path d="M120 -280 L300 -100 L262 -62 L82 -242Z" fill="${cuff}" ${S(5)}/>`;
  s += `<circle cx="214" cy="-128" r="10" fill="${link}" ${S(3)}/>`;
  // palm (back of hand)
  s += `<path d="M30 -118 C42 -196 118 -236 182 -206 C228 -182 236 -116 198 -70 C168 -36 112 -34 82 -52 C58 -66 36 -88 30 -118Z" fill="${skin}" ${S(5)}/>`;
  // ring + pinky curled under
  s += finger([[196, -122], [168, -78], [128, -58]], 24, skin, false);
  s += finger([[200, -88], [176, -54], [148, -44]], 20, skin, false);
  // middle finger supporting below-right of pen
  s += finger([[168, -156], [112, -104], [52, -70], [22, -50]], 27, skin);
  // pen
  s += `<path d="M-10 -34 L10 -34 L14 -330 L-14 -330Z" fill="url(#barrel)" ${S(4)}/>`;
  s += `<rect x="-15" y="-170" width="30" height="16" fill="#c9a24a" ${S(3)}/>`;
  s += `<path d="M-10 -34 L0 0 L10 -34Z" fill="#c9a24a" ${S(3)}/><line x1="0" y1="-28" x2="0" y2="-6" ${LN(2)}/>`;
  // index finger over the pen
  s += finger([[124, -196], [70, -150], [24, -104], [8, -74]], 28, skin);
  // thumb pressing from the left
  s += finger([[48, -156], [4, -132], [-16, -100], [-18, -78]], 30, skin);
  // back-of-hand tendons
  s += `<path d="M110 -180 q20 30 30 60 M140 -190 q24 26 36 54" ${LN(2.5, '#a5765a', .6)}/>`;
  return s;
}

// grab from above (phone / jacket): fingers curled downward. Origin = grip point.
function handGrab(skin, sleeve) {
  let s = '';
  s += `<path d="M-70 -520 L120 -520 L110 -150 L-80 -170Z" fill="${sleeve}" ${S(6)}/>`;
  s += `<path d="M-84 -178 L114 -158 L108 -112 L-88 -132Z" fill="${sleeve}" ${S(5)}/>`;
  s += `<path d="M-80 -130 C-96 -60 -70 -10 0 -4 C70 2 110 -40 106 -116Z" fill="${skin}" ${S(5)}/>`;
  // four fingers curling down over the object edge
  s += finger([[-60, -40], [-66, 10], [-56, 46]], 30, skin);
  s += finger([[-22, -30], [-24, 26], [-16, 66]], 32, skin);
  s += finger([[18, -28], [20, 26], [24, 62]], 31, skin);
  s += finger([[56, -36], [62, 10], [62, 42]], 27, skin);
  // thumb on the near side
  s += finger([[-84, -96], [-112, -40], [-108, 6]], 32, skin);
  s += `<path d="M-40 -96 q30 -10 60 0 M-30 -70 q28 -6 50 2" ${LN(2.5, '#a5765a', .55)}/>`;
  return s;
}

// fist holding something horizontal (scarf), knuckles to viewer. Origin at fist centre.
function handFist(skin) {
  let s = '';
  s += `<path d="M-46 -40 C-40 -64 40 -66 50 -38 L52 30 C40 56 -40 58 -50 30Z" fill="${skin}" ${S(5)}/>`;
  for (let i = 0; i < 4; i++) s += `<path d="M-40 ${-30 + i * 18} q42 -8 86 0" ${LN(2.5, '#9a6a4e', .8)}/>`;
  s += `<path d="M-50 -10 C-74 -10 -78 24 -52 30" fill="${skin}" ${S(5)}/>`;
  return s;
}

// hand holding phone at ear (phone back visible). Origin = phone centre.
function handPhoneEar(skin, phoneCol = '#15181b') {
  let s = '';
  s += `<rect x="-40" y="-90" width="80" height="170" rx="16" fill="${phoneCol}" ${S(4)}/>`;
  s += `<circle cx="-14" cy="-66" r="8" fill="#2c3136" ${S(2)}/>`;
  s += finger([[34, -40], [10, -46], [-22, -40]], 22, skin);
  s += finger([[36, -12], [8, -16], [-26, -10]], 23, skin);
  s += finger([[36, 16], [8, 14], [-24, 20]], 22, skin);
  s += finger([[32, 42], [8, 44], [-16, 48]], 19, skin);
  s += `<path d="M30 -60 C70 -50 80 40 60 90 L40 150 L100 160 L120 60 C120 0 90 -60 50 -70Z" fill="${skin}" ${S(5)}/>`;
  return s;
}

// two fingers raised ("İki"). Origin at wrist.
function handTwo(skin, sleeve) {
  let s = '';
  s += `<path d="M-40 60 L40 60 L46 160 L-46 160Z" fill="${sleeve}" ${S(5)}/>`;
  s += finger([[-14, -10], [-24, -70], [-30, -112]], 22, skin);
  s += finger([[10, -12], [16, -72], [20, -116]], 22, skin);
  s += `<path d="M-36 -16 C-40 30 -30 62 0 64 C34 62 42 30 38 -14 C30 -26 -26 -28 -36 -16Z" fill="${skin}" ${S(5)}/>`;
  s += finger([[26, -6], [30, 14], [16, 22]], 18, skin, false);
  s += finger([[-30, 4], [-48, -18], [-34, -34]], 22, skin);
  return s;
}

// ---------- YUSUF: front head (origin = head centre), ~200 wide ----------
// o: { look: -1..1 (down..up), mouth: 0..1 open, nod: px, blink: 0..1, wet: 0..1 }
function yusufHead(o = {}) {
  const young = !!o.young;
  const look = o.look || 0, mouth = o.mouth || 0, blink = o.blink || 0, wet = o.wet || 0;
  let s = '';
  s += `<ellipse cx="-100" cy="10" rx="20" ry="36" fill="${SKIN_Y}" ${S(5)}/><ellipse cx="100" cy="10" rx="20" ry="36" fill="${SKIN_Y}" ${S(5)}/>`;
  s += `<path d="M0 -128 C82 -128 104 -62 102 8 C100 84 72 140 0 156 C-72 140 -100 84 -102 8 C-104 -62 -82 -128 0 -128Z" fill="${SKIN_Y}" ${S(6)}/>`;
  if (!young) {
  s += `<path d="M-96 34 C-90 110 -50 150 0 158 C50 150 90 110 96 34 C84 80 60 98 0 100 C-60 98 -84 80 -96 34Z" fill="#9a938a" opacity=".55"/>`;
  s += `<path d="M-96 34 C-90 110 -50 150 0 158 C50 150 90 110 96 34 C84 80 60 98 0 100 C-60 98 -84 80 -96 34Z" fill="url(#stub)"/>`;
  s += `<path d="M-46 84 Q0 66 46 84 Q0 78 -46 84Z" fill="#7d766d" opacity=".85" ${LN(2)}/>`; }
  // hair: defined salt & pepper, soft uneven hairline
  s += `<path d="M-106 8 C-116 -104 -52 -150 4 -150 C72 -150 120 -106 106 8 C100 -44 86 -74 60 -84 C40 -90 30 -82 14 -90 C0 -96 -14 -86 -30 -92 C-44 -96 -54 -88 -60 -84 C-86 -74 -100 -44 -106 8Z" fill="${young ? '#231e1b' : '#57524c'}" ${S(6)}/>`;
  if (!young) {
  s += `<path d="M-104 4 C-104 -30 -96 -52 -82 -66 L-80 4Z M104 4 C104 -30 96 -52 82 -66 L80 4Z" fill="#aaa399"/>`;
  s += `<path d="M-60 -130 q30 -14 60 -10 M-30 -112 q40 -14 80 -2 M20 -138 q30 -2 54 14 M-84 -100 q16 -24 40 -30 M60 -124 q20 8 30 30 M-20 -100 q20 -10 44 -4 M-74 -78 q10 -14 26 -16 M48 -102 q14 6 22 18" ${LN(3.5, '#a8a096', .95)}/>`;
  s += `<path d="M-40 -140 q20 -6 34 -2 M30 -142 q16 2 26 10 M-92 -60 q4 -20 16 -34 M92 -60 q-4 -20 -16 -34" ${LN(3, '#2e2a26', .8)}/>`; }
  // brows: inner raised (melancholy)
  const by = look * -3;
  s += `<path d="M-76 ${-20 + by} Q-50 ${-38 + by} -18 ${-36 + by}" ${LN(10, '#3a3531')}/><path d="M76 ${-20 + by} Q50 ${-38 + by} 18 ${-36 + by}" ${LN(10, '#3a3531')}/>`;
  // eyes
  const py = 5 + (look < 0 ? -look * 7 : -look * 4);
  for (const x of [-46, 46]) {
    const lid = Math.max(blink, look < 0 ? -look * .55 : 0);
    s += `<path d="M${x - 26} 6 Q${x} -10 ${x + 26} 6 Q${x} 18 ${x - 26} 6Z" fill="#f4f0e8" ${S(3)}/>`;
    s += `<circle cx="${x}" cy="${py}" r="9" fill="#5b4a3a"/><circle cx="${x}" cy="${py}" r="4" fill="#1a1412"/><circle cx="${x + 3}" cy="${py - 3}" r="2.6" fill="#e9f2f6"/>`;
    if (lid > 0) s += `<path d="M${x - 27} 6 Q${x} -11 ${x + 27} 6 L${x + 27} ${6 + lid * 2} Q${x} ${-11 + lid * 28} ${x - 27} ${6 + lid * 2}Z" fill="${SKIN_Y}"/>`;
    s += `<path d="M${x - 28} ${2 + lid * 10} Q${x} ${-14 + lid * 26} ${x + 28} ${4 + lid * 10}" ${LN(6)}/>`;
    s += `<path d="M${x - 18} 26 Q${x} 34 ${x + 18} 26" ${LN(2.5, INK, .55)}/>`;
    if (wet > 0) s += `<path d="M${x - 16} 14 Q${x} 20 ${x + 16} 14" ${LN(3, '#e8f4fa', wet)}/><circle cx="${x - 8}" cy="${py - 4}" r="3.5" fill="#fff" opacity="${wet}"/>`;
  }
  // nose
  s += `<path d="M2 -6 C6 26 22 50 14 62 C6 70 -10 68 -16 60" ${LN(5)}/><path d="M-22 58 q-8 4 -6 10 M24 56 q8 4 6 10" ${LN(3, INK, .6)}/>`;
  if (!young) s += `<path d="M-40 -64 Q0 -74 40 -64 M-30 -50 Q0 -58 30 -50" ${LN(2.5, INK, .35)}/>`;
  // mouth
  if (young) s += `<path d="M-40 96 Q0 86 40 96 Q34 150 0 154 Q-34 150 -40 96Z" fill="#5a2e26" ${S(5)}/><path d="M-30 98 Q0 92 30 98 L28 108 Q0 102 -28 108Z" fill="#f4f0e8"/>`;
  else if (mouth > 0.05) s += `<path d="M-26 110 Q0 ${104} 26 111 Q0 ${110 + mouth * 22} -26 110Z" fill="#5a2e26" ${S(4)}/>`;
  else s += `<path d="M-30 112 Q0 106 30 113" ${LN(5)}/>`;
  s += `<path d="M-32 114 l-6 6 M32 115 l6 6" ${LN(3, INK, .7)}/>`;
  return s;
}

// Yusuf torso at home (grey sweater) — origin head centre; body below
function yusufBodyHome() {
  let s = '';
  s += `<path d="M-230 520 C-240 330 -190 230 -60 200 L60 200 C190 230 240 330 230 520 Z" fill="url(#sweater)" ${S(6)}/>`;
  s += `<path d="M-50 202 Q0 236 50 202 L44 186 Q0 214 -44 186Z" fill="#e3ddd0" ${S(4)}/>`;
  s += `<path d="M-60 200 Q0 250 60 200" ${LN(5)}/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${-180 + i * 70} 300 q10 60 0 200" ${LN(2.5, '#3d443f', .5)}/>`;
  s += `<path d="M-46 110 L-48 205 Q0 232 48 205 L46 110Z" fill="#c39270" ${S(5)}/>`;
  return s;
}
// Yusuf outdoor (navy jacket over sweater)
function yusufBodyOut() {
  let s = '';
  s += `<path d="M-240 560 C-250 330 -200 230 -60 200 L60 200 C200 230 250 330 240 560 Z" fill="url(#jacket)" ${S(6)}/>`;
  s += `<path d="M-60 200 L-20 380 L0 560 L20 380 L60 200 Q0 236 -60 200Z" fill="url(#sweater)" ${S(4)}/>`;
  s += `<path d="M-60 200 L-110 300 L-40 330 Z M60 200 L110 300 L40 330Z" fill="#2c3a4c" ${S(5)}/>`; // lapels
  s += `<path d="M-46 110 L-48 205 Q0 232 48 205 L46 110Z" fill="#c39270" ${S(5)}/>`;
  s += `<path d="M-150 420 l50 0 M100 420 l50 0" ${LN(4, '#1b2430')}/>`; // pockets
  return s;
}

// ---------- KEREM: front head ----------
// o: { smile: 0..1, mouth: 0..1 (talk), brow: 0..1 (raised) }
function keremHead(o = {}) {
  const sm = o.smile == null ? 1 : o.smile, mouth = o.mouth || 0, br = o.brow || 0;
  let s = '';
  s += `<ellipse cx="-98" cy="12" rx="18" ry="34" fill="${SKIN_K}" ${S(5)}/><ellipse cx="98" cy="12" rx="18" ry="34" fill="${SKIN_K}" ${S(5)}/>`;
  s += `<path d="M0 -132 C84 -132 102 -64 100 6 C98 70 92 118 50 146 Q0 166 -50 146 C-92 118 -98 70 -100 6 C-102 -64 -84 -132 0 -132Z" fill="${SKIN_K}" ${S(6)}/>`;
  s += `<path d="M-92 60 C-80 120 -50 150 0 158 C50 150 80 120 92 60 C80 100 50 118 0 120 C-50 118 -80 100 -92 60Z" fill="#8a7a6c" opacity=".18"/>`; // clean shave shadow
  // hair: swept back, mostly white with grey
  s += `<path d="M-104 -4 C-114 -118 -40 -168 12 -166 C86 -164 122 -110 104 -4 C100 -60 82 -92 50 -100 C10 -110 -30 -108 -62 -94 C-88 -80 -100 -50 -104 -4Z" fill="#1f1b19" ${S(6)}/>`;
  s += `<path d="M-80 -110 Q-10 -150 70 -126 M-70 -92 Q0 -128 84 -104 M-60 -130 Q10 -162 60 -150 M-96 -40 q6 -40 26 -60 M96 -40 q-6 -40 -26 -60" ${LN(3.5, '#4f4844', .9)}/>`;
  s += `<path d="M-100 -4 C-102 -30 -96 -52 -84 -66 L-82 -4Z M100 -4 C102 -30 96 -52 84 -66 L82 -4Z" fill="#2c2724"/>`;
  // brows: confident; one lifts with smile
  s += `<path d="M-76 ${-28 - br * 4} Q-48 ${-36 - br * 6} -18 ${-30 - br * 2}" ${LN(9, '#1f1b19')}/>`;
  s += `<path d="M18 ${-30 - sm * 8} Q48 ${-44 - sm * 10} 76 ${-32 - sm * 6}" ${LN(9, '#1f1b19')}/>`;
  // eyes — narrow, sharp
  for (const x of [-44, 44]) {
    const sq = sm * .35;
    s += `<path d="M${x - 24} 4 Q${x} ${-10 + sq * 6} ${x + 24} 4 Q${x} ${14 - sq * 6} ${x - 24} 4Z" fill="#f4f0e8" ${S(3)}/>`;
    s += `<circle cx="${x + 3}" cy="4" r="8" fill="#3a2a20"/><circle cx="${x + 3}" cy="4" r="3.6" fill="#120c0a"/><circle cx="${x + 6}" cy="1" r="2.4" fill="#fff"/>`;
    s += `<path d="M${x - 26} 2 Q${x} ${-12 + sq * 6} ${x + 26} 2" ${LN(5)}/>`;
    if (sm > .3) s += `<path d="M${x + (x > 0 ? 30 : -30)} 0 l${x > 0 ? 10 : -10} -6 M${x + (x > 0 ? 30 : -30)} 8 l${x > 0 ? 10 : -10} 4" ${LN(2, INK, sm * .6)}/>`;
  }
  s += `<path d="M4 -4 C8 24 20 46 12 58 C4 66 -10 64 -14 56" ${LN(5)}/>`;
  // mouth: smirk <-> flat ; talking opens
  const y0 = 104;
  if (mouth > .05) {
    s += `<path d="M-34 ${y0 - sm * 4} Q0 ${y0 + 6 * sm} 38 ${y0 - sm * 14} Q4 ${y0 + 14 + mouth * 26} -34 ${y0 - sm * 4}Z" fill="#5a2e26" ${S(4)}/>`;
    s += `<path d="M-24 ${y0 - sm * 2} Q2 ${y0 + 6 * sm} 28 ${y0 - sm * 10}" stroke="#f4f0e8" stroke-width="7" fill="none" opacity="${C(mouth * 2)}"/>`;
  } else if (sm > .5) {
    s += `<path d="M-34 ${y0 - 4} Q0 ${y0 + 10 * sm} 40 ${y0 - 16 * sm} Q6 ${y0 + 22 * sm} -34 ${y0 - 4}Z" fill="#f4f0e8" ${S(4)}/>`;
  } else {
    s += `<path d="M-32 ${y0} Q0 ${y0 + 4 * sm} 34 ${y0 - 8 * sm}" ${LN(5)}/>`;
  }
  return s;
}
function keremBody() {
  let s = '';
  s += `<path d="M-240 560 C-250 330 -200 232 -62 204 L62 204 C200 232 250 330 240 560 Z" fill="url(#suit)" ${S(6)}/>`;
  s += `<path d="M-58 204 L0 360 L58 204 Q0 236 -58 204Z" fill="#f6f4ee" ${S(4)}/>`;
  s += `<path d="M-58 204 L-30 250 L0 230 Z M58 204 L30 250 L0 230Z" fill="#f6f4ee" ${S(4)}/>`; // collar points
  s += `<path d="M-62 204 L-120 330 L-20 420 L0 360 Z M62 204 L120 330 L20 420 L0 360Z" fill="#23252c" ${S(5)}/>`; // lapels
  s += `<path d="M96 300 l44 -6 l2 14 l-44 6Z" fill="${ORANGE}" ${S(2)}/>`; // pocket square
  s += `<path d="M-46 112 L-48 208 Q0 236 48 208 L46 112Z" fill="#cc9c78" ${S(5)}/>`;
  return s;
}

// ---------- MALZEMECİ (old kit-man): front-3/4 head, origin head centre ----------
function malzemeciHead(o = {}) {
  const mouth = o.mouth || 0;
  let s = '';
  s += `<ellipse cx="-92" cy="16" rx="18" ry="30" fill="${SKIN_O}" ${S(5)}/><ellipse cx="92" cy="16" rx="18" ry="30" fill="${SKIN_O}" ${S(5)}/>`;
  s += `<path d="M0 -118 C78 -118 96 -54 94 10 C92 78 66 130 0 142 C-66 130 -92 78 -94 10 C-96 -54 -78 -118 0 -118Z" fill="${SKIN_O}" ${S(6)}/>`;
  for (const sx of [-1, 1]) { let c = ''; for (const [x, y, r] of [[86, -40, 18], [96, -16, 16], [92, 10, 14], [74, -60, 14]]) c += `<circle cx="${sx * x}" cy="${y}" r="${r}"/>`; s += `<g fill="#eceae4" ${S(3)}>${c}</g><g fill="#eceae4">${c.replace(/r="(\d+)"/g, (m, v) => `r="${v - 3}"`)}</g>`; }
  s += `<path d="M-30 -110 q30 -10 60 0" ${LN(3, '#fff', .5)}/>`; // shine
  s += `<path d="M-70 -24 Q-46 -36 -20 -30 M70 -24 Q46 -36 20 -30" ${LN(8, '#eceae4')}/>`;
  for (const x of [-42, 42]) { s += `<path d="M${x - 18} 4 Q${x} -6 ${x + 18} 4" ${LN(5)}/><circle cx="${x}" cy="8" r="6" fill="#2a2420"/>`; s += `<path d="M${x - 20} 22 q20 8 40 0 M${x - 26} -2 l-8 -4" ${LN(2, INK, .45)}/>`; }
  s += `<rect x="-72" y="-12" width="58" height="40" rx="14" fill="none" ${LN(4, '#6b5a3c')}/><rect x="14" y="-12" width="58" height="40" rx="14" fill="none" ${LN(4, '#6b5a3c')}/><path d="M-14 4 h28" ${LN(4, '#6b5a3c')}/>`;
  s += `<path d="M2 -2 C8 26 20 44 10 56 C2 62 -10 60 -12 52" ${LN(5)}/>`;
  s += `<path d="M-48 70 C-30 58 -10 62 0 70 C10 62 30 58 48 70 C40 92 20 92 0 84 C-20 92 -40 92 -48 70Z" fill="#eceae4" ${S(4)}/>`; // white moustache
  if (mouth > .05) s += `<ellipse cx="0" cy="${100}" rx="16" ry="${4 + mouth * 10}" fill="#5a2e26" ${S(3)}/>`;
  else s += `<path d="M-18 100 Q0 106 18 100" ${LN(4)}/>`;
  s += `<path d="M-60 -60 Q0 -70 60 -60 M-50 -46 Q0 -54 50 -46" ${LN(2.5, INK, .35)}/>`;
  return s;
}

// ---------- MEMUR (bailiff) ----------
function memurHead(o = {}) {
  const mouth = o.mouth || 0;
  let s = '';
  s += `<ellipse cx="-94" cy="14" rx="18" ry="32" fill="${SKIN_K}" ${S(5)}/><ellipse cx="94" cy="14" rx="18" ry="32" fill="${SKIN_K}" ${S(5)}/>`;
  s += `<path d="M0 -122 C80 -122 98 -58 96 8 C94 80 70 132 0 146 C-70 132 -94 80 -96 8 C-98 -58 -80 -122 0 -122Z" fill="${SKIN_K}" ${S(6)}/>`;
  s += `<path d="M-98 -4 C-104 -100 -40 -140 8 -138 C70 -136 108 -100 98 -4 C90 -50 70 -70 40 -76 L-30 -82 C-70 -72 -92 -46 -98 -4Z" fill="#3a332e" ${S(5)}/>`; // side part
  s += `<path d="M-30 -82 C-10 -100 30 -110 60 -100" ${LN(3, '#6b625a')}/>`;
  s += `<path d="M-68 -22 L-20 -24 M20 -24 L68 -22" ${LN(7, '#3a332e')}/>`;
  for (const x of [-42, 42]) s += `<circle cx="${x}" cy="8" r="6" fill="#2a2420"/>`;
  s += `<rect x="-72" y="-14" width="58" height="42" rx="4" fill="#ffffff" opacity=".15" ${LN(5)}/><rect x="14" y="-14" width="58" height="42" rx="4" fill="#ffffff" opacity=".15" ${LN(5)}/><path d="M-14 0 h28" ${LN(5)}/>`;
  s += `<path d="M2 -2 C6 24 16 42 8 52 C2 58 -8 56 -10 50" ${LN(5)}/>`;
  if (mouth > .05) s += `<ellipse cx="0" cy="96" rx="14" ry="${4 + mouth * 9}" fill="#5a2e26" ${S(3)}/>`;
  else s += `<path d="M-20 96 L20 96" ${LN(4)}/>`;
  return s;
}

// ---------- vehicles ----------
function bus(o = {}) { // side view, front at left; origin = bottom-left of body
  let s = '';
  s += `<path d="M26 -250 H560 Q590 -250 590 -220 V0 H0 V-220 Q0 -250 26 -250Z" fill="#e3e0d8" ${S(5)}/>`;
  s += `<rect x="0" y="-70" width="590" height="70" fill="#b9b6ae"/><rect x="0" y="-70" width="590" height="70" fill="none" ${S(5)}/>`;
  s += `<rect x="8" y="-224" width="56" height="130" rx="8" fill="#3a3f44" ${S(3)}/>`;
  for (let x = 80; x < 570; x += 96) s += `<rect x="${x}" y="-224" width="84" height="90" rx="6" fill="#3a3f44" ${S(3)}/>`;
  s += `<rect x="0" y="-118" width="590" height="32" fill="${ORANGE}"/><rect x="0" y="-86" width="590" height="8" fill="${INK}"/>`;
  s += `<text x="320" y="-36" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="4" fill="${INK}">KARAOCAK DEMİRSPOR</text>`;
  s += `<circle cx="60" cy="-150" r="0"/>`;
  for (const x of [130, 470]) s += `<path d="M${x - 56} 0 a56 56 0 0 1 112 0Z" fill="#2a2d30"/><circle cx="${x}" cy="10" r="50" fill="#15171a" ${S(4)}/><circle cx="${x}" cy="10" r="20" fill="#8a8f93" ${S(3)}/>`;
  return s;
}
