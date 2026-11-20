// OCAK — "Bu hikâyeyi yıllar önce yazdım" kaydırmalı post (10 sayfa, 1080x1350)
const CW = 1080, CH = 1350, NS = 10;
const CREAM = '#efe8dc';
const bg = (inner, vb) => `<svg x="0" y="0" width="${CW}" height="${CH}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">${DEFS}${inner}</svg>`;
const panel = (inner, x, y, w, h, vb) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">${DEFS}${DEFS2}${inner}</svg>`;
const shade = (from, to, op = .85, col = '#0b0b0c') => {
  const id = 'sh' + Math.round(Math.random() * 1e9);
  return `<defs><linearGradient id="${id}" x1="0" y1="${from < to ? 0 : 1}" x2="0" y2="${from < to ? 1 : 0}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs><rect x="0" y="${Math.min(from, to)}" width="${CW}" height="${Math.abs(to - from)}" fill="url(#${id})"/>`;
};
const T = (x, y, lines, o = {}) => {
  const fs = o.fs || 58, lh = o.lh || fs * 1.22, fw = o.fw || 800, fill = o.fill || CREAM, anchor = o.anchor || 'start';
  return `<g font-family="Inter" font-weight="${fw}" font-size="${fs}" fill="${fill}" text-anchor="${anchor}" ${o.italic ? 'font-style="italic"' : ''} ${o.ls ? `letter-spacing="${o.ls}"` : ''}>` +
    lines.map((l, i) => `<text x="${x}" y="${y + i * lh}">${l}</text>`).join('') + `</g>`;
};
const hi = s => `<tspan fill="${ORANGE}">${s}</tspan>`;
function chrome(n, dark = true) {
  const c = dark ? CREAM : '#1b1b1d';
  let s = `<g font-family="Inter"><text x="64" y="92" font-weight="900" font-size="34" letter-spacing="7" fill="${c}">OCAK</text><rect x="64" y="104" width="112" height="5" fill="${ORANGE}"/>`;
  s += `<text x="${CW - 64}" y="92" text-anchor="end" font-weight="700" font-size="28" fill="${c}" opacity=".75">${n}/${NS}</text>`;
  if (n < NS) s += `<text x="${CW - 64}" y="${CH - 56}" text-anchor="end" font-weight="700" font-size="28" fill="${c}" opacity=".8">kaydır →</text>`;
  return s + `</g>`;
}
function grain() { return `<rect width="${CW}" height="${CH}" fill="url(#vig)" opacity=".35"/>`; }

const SLIDES = [
  // 1 — kapak
  () => bg(shot8(4.5, 3.1), '0 520 1080 1350') + shade(0, 780, .97) + shade(CH, 1050, .7) +
    T(64, 250, ['Bu hikâyeyi', `${hi('yıllar önce')}`, 'yazdım.'], { fs: 104, fw: 900 }) +
    T(64, 590, ['Kimse yayınlamadı.', 'Şimdi ben yayınlıyorum.'], { fs: 44, fw: 600 }) + chrome(1),
  // 2 — şehir
  () => bg(shot5a(1.9, 44), '0 380 1080 1350') + shade(0, 700, .96) +
    T(64, 250, ['Gri bir sanayi şehri.'], { fs: 66 }) + T(64, 350, ['Batmak üzere olan', `bir ${hi('futbol kulübü')}.`], { fs: 66 }) + chrome(2),
  // 3 — karakterler
  () => {
    let s = `<rect width="${CW}" height="${CH}" fill="#16171a"/>`;
    s += T(64, 225, ['Üç insan.', 'Bir kulüp.'], { fs: 78, fw: 900 });
    const portrait = (bgFill, body) => `<rect width="1080" height="1920" fill="${bgFill}"/><rect x="0" y="1150" width="1080" height="770" fill="#000" opacity=".12"/><g transform="translate(540 880) scale(2.5)">${body}</g>`;
    const VB = '240 430 600 1040';
    const P = [
      [portrait('url(#skyGrey)', yusufBodyOut() + yusufHead({ look: .05 })), VB, 'YUSUF', ['Sakatlıktan sonra', 'hayattan çekilmiş', 'eski bir futbolcu.']],
      [portrait('#6b4e3a', keremBody() + keremHead({ smile: .7 })), VB, 'KEREM', ['Onu "sadece bir', 'kahve" için çağıran', 'çocukluk arkadaşı.']],
      [portrait('#8a5a4a', emirBody() + emirHead({ smirk: 1 })), VB, 'EMİR', ['Sol ayağıyla', 'mahallede kaybolan', '15 yaşında bir çocuk.']],
    ];
    P.forEach(([inner, vb, name, cap], i) => {
      const x = 64 + i * 326, y = 400, w = 300, h = 520;
      s += `<clipPath id="pc${i}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18"/></clipPath><g clip-path="url(#pc${i})">${panel(inner, x, y, w, h, vb)}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="none" stroke="${ORANGE}" stroke-width="4"/>`;
      s += T(x, y + h + 62, [name], { fs: 34, fw: 900, fill: ORANGE, ls: 5 }) + T(x, y + h + 112, cap, { fs: 27, fw: 600, lh: 36 });
    });
    return s + chrome(3);
  },
  // 4 — imza
  () => bg(shot1(2.2, 2.2), '0 140 1080 1350') + shade(0, 560, .6) + shade(0, 860, .97) + shade(CH, 980, .6) +
    T(64, 245, [`Adı ${hi('OCAK')}.`], { fs: 92, fw: 900 }) +
    T(64, 360, ['Karakterleri, şehri, kulübü,', 'ilk sahnesinden son cümlesine', `kadar her şeyi ${hi('ben yazdım.')}`], { fs: 48, fw: 700 }) + chrome(4),
  // 5 — kapılar
  () => {
    let s = `<rect width="${CW}" height="${CH}" fill="#1b1c1f"/>`;
    s += T(64, 240, ['Yıllarca kapı çaldım.'], { fs: 70, fw: 900 }) + T(64, 320, ['Dosyalar hazırladım, toplantılara girdim.', 'Çoğu cevap bile vermedi.'], { fs: 36, fw: 500, fill: '#bdb6aa' });
    const Q = [['"Güzel ama riskli."', -3, 520], ['"Futbol dizisi tutmaz."', 2.5, 720], ['"Tanınan bir isim lazım."', -1.5, 920]];
    Q.forEach(([q, r, y], i) => {
      s += `<g transform="translate(${i === 1 ? 600 : 470} ${y}) rotate(${r})"><rect x="-400" y="-78" width="800" height="140" rx="10" fill="#e9e2d4" stroke="${INK}" stroke-width="5"/>` +
        `<text x="-360" y="12" font-family="Inter" font-weight="800" font-style="italic" font-size="46" fill="${INK}">${q}</text>` +
        `<g transform="translate(300 -6) rotate(-14)"><rect x="-82" y="-36" width="164" height="72" rx="8" fill="none" stroke="#c0392b" stroke-width="6" opacity=".85"/><text x="0" y="16" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" letter-spacing="6" fill="#c0392b" opacity=".85">RET</text></g></g>`;
    });
    return s + grain() + chrome(5);
  },
  // 6 — klasör
  () => {
    let s = `<rect width="${CW}" height="${CH}" fill="#24221f"/>`;
    s += `<g transform="translate(540 560) rotate(-4)"><path d="M-330 -170 L-120 -170 L-80 -210 L330 -210 L330 220 L-330 220Z" fill="#b9915c" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>` +
      `<rect x="-310" y="-150" width="620" height="60" fill="#f4efe4" stroke="${INK}" stroke-width="4" transform="rotate(2)"/><path d="M-340 -120 L340 -120 L350 230 L-350 230Z" fill="#cda46c" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>` +
      `<rect x="-190" y="-30" width="380" height="120" fill="#f4efe4" stroke="${INK}" stroke-width="4"/><text x="0" y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" letter-spacing="10" fill="${INK}">OCAK</text><text x="0" y="68" text-anchor="middle" font-family="Inter" font-weight="600" font-size="24" letter-spacing="4" fill="${INK}">SENARYO · TASLAK</text>` +
      `<rect x="-350" y="-120" width="700" height="350" fill="#8d877a" opacity=".22"/></g>`;
    for (let i = 0; i < 70; i++) s += `<circle cx="${220 + (i * 137) % 640}" cy="${360 + (i * 89) % 420}" r="${1 + (i % 3)}" fill="#e8e0cf" opacity=".18"/>`;
    s += T(64, 940, ['Bir noktadan sonra', `${hi('sektöre yenik düştüm.')}`, 'Hikâye bir klasörde kaldı.'], { fs: 56, fw: 800 });
    s += T(64, 1170, ['Ama Yusuf, Kerem, Emir ve Ömer', 'kafamdan hiç çıkmadı.'], { fs: 34, fw: 500, fill: '#bdb6aa', italic: true });
    return s + chrome(6);
  },
  // 7 — şimdi
  () => bg(shot4c(5, 30), '0 120 1080 1350') + `<rect width="${CW}" height="${CH}" fill="#0b0b0c" opacity=".45"/>` + shade(CH, 560, .95) +
    T(64, 900, ['Şimdi bu diziyi kendi imkânlarımla,', `${hi('yapay zekâ araçlarıyla')} yayınlıyorum.`], { fs: 46, fw: 800 }) +
    T(64, 1050, ['Bu bir tercih değil, bir mecburiyet.', 'Yapım şirketim yok. Bütçem yok. Ekibim yok.', 'Elimde yazdığım hikâye ve anlatma inadı var.'], { fs: 32, fw: 500, fill: '#d6cfc3', lh: 44 }) + chrome(7),
  // 8 — sahiplik
  () => {
    let s = `<rect width="${CW}" height="${CH}" fill="${ORANGE}"/>`;
    s += `<g transform="translate(860 1120)" opacity=".2">${crest(0, 0, 210)}</g>`;
    s += T(64, 330, ['Senaryo,', 'karakterler', 've hikâye', 'bana aittir.'], { fs: 118, fw: 900, fill: '#1b1b1d', lh: 132 });
    s += T(64, 950, ['Yapay zekâ sadece fırçam.', 'Ben yazdım. Yıllar önce.'], { fs: 44, fw: 700, fill: '#1b1b1d', lh: 60 });
    return s + chrome(8, false);
  },
  // 9 — kusursuz değil
  () => bg(shot7b(2.2, 64.5), '0 470 1080 1350') + shade(CH, 760, .98) +
    T(64, 1010, ['Kusursuz olmayacak.'], { fs: 62, fw: 900 }) +
    T(64, 1090, ['Ama ilk kez, yıllardır anlatmak istediğim', `hikâyeyi ${hi('kimsenin iznini beklemeden')} anlatıyorum.`], { fs: 34, fw: 600, lh: 46 }) + chrome(9),
  // 10 — final
  () => {
    let s = `<rect width="${CW}" height="${CH}" fill="#0b0b0c"/>`;
    s += T(540, 300, ['Karaocak\'ta her şey griydi.'], { fs: 46, fw: 600, fill: '#9a978f', anchor: 'middle', italic: true });
    s += T(540, 370, [`Cumartesileri ${hi('turuncuya')} dönerdi.`], { fs: 46, fw: 600, anchor: 'middle', italic: true });
    s += `<g font-family="Inter" text-anchor="middle"><text x="540" y="640" font-weight="900" font-size="170" letter-spacing="20" fill="${CREAM}">OCAK</text><rect x="270" y="676" width="540" height="12" fill="${ORANGE}"/></g>${crest(540, 770, 52)}`;
    s += `<rect x="190" y="900" width="700" height="120" rx="60" fill="${ORANGE}"/>` + T(540, 980, ['CUMARTESİ BAŞLIYOR'], { fs: 50, fw: 900, fill: '#fff', anchor: 'middle', ls: 2 });
    s += T(540, 1110, ['İlk bölüm profildeki linkte.'], { fs: 34, fw: 600, anchor: 'middle', fill: '#d6cfc3' });
    s += T(540, 1170, ['İzle · Paylaş · Yaz'], { fs: 30, fw: 700, anchor: 'middle', fill: ORANGE, ls: 3 });
    return s + chrome(10);
  },
];
window.renderSlide = i => { document.getElementById('svg').innerHTML = SLIDES[i](); };
