// ============ El kütüphanesi v2: anatomik, sivrilen parmaklar ============
// tapered finger: chain of points + widths -> smooth outline with rounded tip
function taper(pts, ws, skin, o = {}) {
  const n = pts.length, L = [], R = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1]; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    const nx = -dy, ny = dx, w = ws[i] / 2;
    L.push([pts[i][0] + nx * w, pts[i][1] + ny * w]); R.push([pts[i][0] - nx * w, pts[i][1] - ny * w]);
  }
  const last = pts[n - 1], prev = pts[n - 2]; let tx = last[0] - prev[0], ty = last[1] - prev[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
  const tw = ws[n - 1] / 2, tip = [last[0] + tx * tw * 1.15, last[1] + ty * tw * 1.15];
  const sm = (arr) => { let d = ''; for (let i = 1; i < arr.length; i++) { const m = [(arr[i - 1][0] + arr[i][0]) / 2, (arr[i - 1][1] + arr[i][1]) / 2]; d += ` Q${arr[i - 1][0]} ${arr[i - 1][1]} ${m[0]} ${m[1]}`; } return d; };
  let d = `M${R[0][0]} ${R[0][1]} L${L[0][0]} ${L[0][1]}` + sm(L) + ` L${L[n - 1][0]} ${L[n - 1][1]} Q${tip[0] + (L[n - 1][0] - last[0]) * .9} ${tip[1] + (L[n - 1][1] - last[1]) * .9} ${tip[0]} ${tip[1]} Q${tip[0] + (R[n - 1][0] - last[0]) * .9} ${tip[1] + (R[n - 1][1] - last[1]) * .9} ${R[n - 1][0]} ${R[n - 1][1]}` + sm([...R].reverse()) + ` L${R[0][0]} ${R[0][1]}Z`;
  let s = `<path d="${d}" fill="${skin}" ${S(o.sw || 4)}/>`;
  // joint creases (short arcs across the finger)
  for (let i = 1; i < n - 1; i++) {
    const p = pts[i], w = ws[i] * .34; const a = pts[i - 1], b = pts[i + 1];
    let dx = b[0] - a[0], dy = b[1] - a[1]; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l; const nx = -dy, ny = dx;
    s += `<path d="M${p[0] + nx * w} ${p[1] + ny * w} Q${p[0] + dx * 4} ${p[1] + dy * 4} ${p[0] - nx * w} ${p[1] - ny * w}" ${LN(2.2, '#8f5f44', .75)}/>`;
  }
  if (o.nail !== false) {
    const nx = last[0] - tx * tw * .25, ny = last[1] - ty * tw * .25, ang = Math.atan2(ty, tx) * 180 / Math.PI;
    s += `<g transform="translate(${nx} ${ny}) rotate(${ang})"><path d="M${-tw * .9} ${-tw * .55} Q${tw * .7} ${-tw * .62} ${tw * .95} 0 Q${tw * .7} ${tw * .62} ${-tw * .9} ${tw * .55}Z" fill="#f4dccb" stroke="#b98a70" stroke-width="1.6"/></g>`;
  }
  return s;
}
// chain from base point, segment lengths, absolute angles (deg, 0 = up, + = clockwise)
function chain(base, lens, angs) { const p = [base]; let [x, y] = base; for (let i = 0; i < lens.length; i++) { const a = angs[i] * D2R; x += Math.sin(a) * lens[i]; y -= Math.cos(a) * lens[i]; p.push([x, y]); } return p; }
const FING = { // base offsets on knuckle line, segment lengths, base widths
  i: { b: [-42, -128], l: [52, 32, 25], w: 27 }, m: { b: [-13, -136], l: [58, 36, 27], w: 28 },
  r: { b: [16, -130], l: [54, 33, 25], w: 26 }, p: { b: [42, -114], l: [42, 26, 21], w: 22 }
};
function fingerOf(k, angs, skin, scale = 1, nail = true) {
  const f = FING[k]; const p = chain(f.b, f.l.map(v => v * scale), angs);
  return taper(p, [f.w, f.w * .92, f.w * .82, f.w * .72], skin, { nail });
}
// back of right hand, open & relaxed (fingers up). origin = wrist centre
function hOpenBack(skin, sleeve) {
  let s = sleeve ? `<path d="M-70 40 L70 40 L84 260 L-84 260Z" fill="${sleeve}" ${S(5)}/>` : '';
  s += fingerOf('p', [14, 18, 20], skin) + fingerOf('r', [5, 7, 9], skin) + fingerOf('m', [-1, 0, 1], skin) + fingerOf('i', [-9, -8, -6], skin);
  s += `<path d="M-58 20 C-66 -40 -62 -110 -46 -134 C-20 -146 30 -146 54 -120 C66 -80 64 -20 56 20 C30 40 -30 40 -58 20Z" fill="${skin}" ${S(5)}/>`;
  s += `<path d="M-40 -126 q8 -6 16 0 M-10 -134 q8 -6 16 0 M20 -128 q8 -6 16 0 M44 -112 q6 -5 12 0" ${LN(2.2, '#8f5f44', .7)}/>`;
  s += `<path d="M-30 -110 Q-20 -60 -24 -10 M-6 -116 Q0 -60 -2 -8 M18 -110 Q20 -60 16 -10" ${LN(2, '#b5835f', .45)}/>`;
  s += taper(chain([-54, -30], [44, 34], [-58, -40]), [34, 28, 22], skin);
  return s;
}
// open palm facing viewer (wave): mirrored back with palm lines, no nails
function hPalm(skin, sleeve) {
  let s = sleeve ? `<path d="M-70 40 L70 40 L84 260 L-84 260Z" fill="${sleeve}" ${S(5)}/><rect x="-74" y="30" width="148" height="30" fill="#f6f4ee" ${S(4)}/>` : '';
  s += fingerOf('p', [14, 18, 20], skin, 1, false) + fingerOf('r', [5, 7, 9], skin, 1, false) + fingerOf('m', [-1, 0, 1], skin, 1, false) + fingerOf('i', [-9, -8, -6], skin, 1, false);
  s += `<path d="M-58 20 C-66 -40 -62 -110 -46 -134 C-20 -146 30 -146 54 -120 C66 -80 64 -20 56 20 C30 40 -30 40 -58 20Z" fill="${skin}" ${S(5)}/>`;
  s += `<path d="M-48 -104 Q0 -88 50 -112 M-46 -74 Q-6 -56 28 -82 M-24 6 Q-40 -50 -20 -124" ${LN(2.5, '#9a6a4e', .7)}/><path d="M-58 -10 C-40 -30 -40 -70 -54 -86" fill="none" ${LN(2, '#9a6a4e', .4)}/>`;
  s += taper(chain([-54, -30], [44, 34], [-58, -40]), [34, 28, 22], skin, { nail: false });
  return `<g transform="scale(-1 1)">${s}</g>`;
}
// fist, knuckles to viewer (back-of-hand 3/4). origin = centre
function hFist(skin, sleeve) {
  let s = sleeve ? `<path d="M-64 50 L64 50 L76 230 L-76 230Z" fill="${sleeve}" ${S(5)}/>` : '';
  s += `<path d="M-62 40 C-70 -10 -66 -60 -50 -78 C-20 -92 34 -92 56 -70 C70 -30 66 10 60 40 C30 60 -30 60 -62 40Z" fill="${skin}" ${S(5)}/>`;
  // folded fingers: two rows of rounded segments
  for (const [x, w] of [[-38, 30], [-8, 31], [22, 30], [48, 24]]) {
    s += `<path d="M${x - w / 2} -78 Q${x} -100 ${x + w / 2} -78 L${x + w / 2 - 2} -30 Q${x} -20 ${x - w / 2 + 2} -30Z" fill="${skin}" ${S(4)}/>`;
    s += `<path d="M${x - w / 2 + 2} -30 Q${x} -16 ${x + w / 2 - 2} -30 L${x + w / 2 - 4} 4 Q${x} 14 ${x - w / 2 + 4} 4Z" fill="${skin}" ${S(4)}/>`;
    s += `<path d="M${x - 6} -84 q6 -4 12 0" ${LN(2, '#8f5f44', .7)}/>`;
  }
  s += `<path d="M-64 0 C-90 -6 -96 30 -70 44 C-40 56 -8 46 4 30 C10 20 0 12 -10 16 C-30 22 -46 20 -64 0Z" fill="${skin}" ${S(4)}/>`;
  s += `<path d="M-8 18 q6 -6 14 2" fill="#f4dccb" stroke="#b98a70" stroke-width="1.6"/>`;
  return s;
}
// pointing (index extended to the left), side view. origin = knuckles
function hPoint(skin, sleeve) {
  let s = sleeve ? `<path d="M60 -40 L260 -60 L270 70 L64 60Z" fill="${sleeve}" ${S(5)}/><path d="M60 -40 L84 -42 L90 62 L64 60Z" fill="#f6f4ee" ${S(4)}/>` : '';
  s += `<path d="M-30 -40 C-10 -64 50 -60 66 -36 L70 40 C40 66 -10 62 -30 40Z" fill="${skin}" ${S(5)}/>`;
  for (const [y, w] of [[-2, 26], [22, 24], [42, 20]]) s += `<path d="M-30 ${y - w / 2} C-58 ${y - w / 2} -60 ${y + w / 2} -30 ${y + w / 2}" fill="${skin}" ${S(4)}/>`;
  s += taper([[-20, -28], [-70, -30], [-106, -28], [-132, -26]], [26, 24, 21, 18], skin);
  s += taper([[10, -42], [-24, -58], [-54, -56]], [30, 26, 22], skin);
  return s;
}
// gripping a cylinder (cup / phone edge) from the side; origin = object centre, object width ow
function hGrip(skin, sleeve, ow = 80) {
  const R = ow / 2;
  let s = sleeve ? `<path d="M${R + 50} -40 L${R + 260} -70 L${R + 270} 70 L${R + 56} 60Z" fill="${sleeve}" ${S(5)}/>` : '';
  // palm heel behind the object edge
  s += `<path d="M${R - 10} -56 C${R + 30} -70 ${R + 72} -52 ${R + 74} -10 L${R + 72} 44 C${R + 50} 70 ${R + 8} 64 ${R - 10} 44Z" fill="${skin}" ${S(5)}/>`;
  // four fingers wrap across the front: bowed, shortening downwards (pinky shortest)
  const rows = [[-34, 25, 1.0], [-8, 26, .96], [17, 24, .86], [40, 20, .7]];
  for (const [y, w, l] of rows) {
    const x0 = R + 6, x3 = R - (ow + 24) * l;
    s += taper([[x0, y], [lerp(x0, x3, .38), y + 5], [lerp(x0, x3, .74), y + 8], [x3, y + 5]], [w, w * .95, w * .86, w * .76], skin);
    s += `<path d="M${lerp(x0, x3, .2)} ${y + w * .42} Q${lerp(x0, x3, .5)} ${y + w * .62} ${lerp(x0, x3, .85)} ${y + w * .5}" ${LN(2.5, '#9a6a4e', .45)}/>`;
  }
  // thumb over the top, pointing forward
  s += taper([[R + 26, -52], [R - 4, -70], [R - 36, -76], [R - 58, -72]], [32, 28, 24, 20], skin);
  return s;
}
// pen grip (pen pointing down-left), origin = nib
function hPenV2(skin, sleeve, cuff = '#f6f4ee') {
  let s = `<path d="M120 -200 C260 -360 400 -520 470 -640 L640 -520 C540 -400 380 -250 250 -110Z" fill="${sleeve}" ${S(5)}/>`;
  s += `<path d="M120 -200 L250 -110 L224 -78 L94 -168Z" fill="${cuff}" ${S(4)}/>`;
  // palm back
  s += `<path d="M40 -150 C60 -220 150 -240 210 -196 C240 -170 236 -110 200 -80 C170 -54 110 -54 80 -70 C56 -84 36 -110 40 -150Z" fill="${skin}" ${S(5)}/>`;
  // ring & pinky curled under (short)
  s += taper([[196, -96], [174, -64], [146, -54]], [24, 22, 18], skin, { nail: false }) + taper([[204, -124], [186, -92], [160, -80]], [22, 20, 16], skin, { nail: false });
  // middle finger under the pen
  s += taper([[160, -150], [110, -110], [62, -74], [34, -56]], [27, 25, 22, 19], skin);
  // pen
  s += `<path d="M-9 -34 L9 -34 L13 -300 L-13 -300Z" fill="url(#barrel)" ${S(4)}/><rect x="-14" y="-160" width="28" height="15" fill="#c9a24a" ${S(3)}/><path d="M-9 -34 L0 0 L9 -34Z" fill="#c9a24a" ${S(3)}/>`;
  // index on top of pen
  s += taper([[120, -196], [74, -150], [30, -104], [10, -78]], [28, 26, 23, 20], skin);
  // thumb from the left
  s += taper([[54, -170], [12, -140], [-12, -104], [-16, -84]], [32, 30, 26, 22], skin);
  s += `<path d="M130 -186 q22 30 30 56 M156 -194 q22 26 30 52" ${LN(2, '#b5835f', .5)}/>`;
  return s;
}
// hand resting on knee / table, side view relaxed (fingers draping). origin = wrist
function hRest(skin, sleeve) {
  let s = sleeve ? `<path d="M40 -40 L260 -50 L260 60 L40 50Z" fill="${sleeve}" ${S(5)}/>` : '';
  s += `<path d="M44 -36 C10 -50 -60 -44 -80 -20 L-84 30 C-60 46 0 46 44 40Z" fill="${skin}" ${S(5)}/>`;
  for (const [y, w, l] of [[-18, 24, 1], [4, 25, 1.05], [24, 23, 1], [40, 19, .85]]) s += taper([[-78, y], [-120 * l, y + 10], [-150 * l, y + 30], [-164 * l, y + 52]], [w, w * .94, w * .84, w * .72], skin);
  s += taper([[-40, -40], [-86, -52], [-116, -46]], [30, 26, 22], skin);
  return s;
}
