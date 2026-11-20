# OCAK Bölüm 1 — VO yerleşimi + sentetik ambiyans/SFX + yumuşak pad müzik + ağız zarfı (env1.js)
import numpy as np, subprocess, wave, json, sys, os
SR = 48000; FPS = 30
TOTAL = 76.2
VO = sys.argv[1]  # dir with trimmed wavs
OUT = sys.argv[2]
n = int(SR * TOTAL); T = np.arange(n) / SR
rng = np.random.default_rng(11)

# (clip, start, who)
PLACE = [
    ('n1', 0.25, 'n'), ('k1', 6.75, 'kerem'), ('n2', 9.35, 'n'),
    ('y1', 15.0, 'yusuf'), ('y2', 18.25, 'yusufOff'), ('n3', 22.5, 'n'),
    ('k2', 27.8, 'kerem'), ('y3', 31.25, 'yusuf'), ('k3', 34.0, 'kerem'), ('k4', 36.75, 'kerem'),
    ('n4', 42.45, 'n'), ('n5', 48.2, 'n'), ('m1', 55.3, 'malz'), ('r1', 56.9, 'memur'),
    ('n6', 60.6, 'n'), ('n7', 66.5, 'n'),
]

def load(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float64) / 32768

vo = np.zeros(n); envs = {}; spans = []
nf = int(TOTAL * FPS) + 1
for name, st, who in PLACE:
    x = load(os.path.join(VO, name + '.wav'))
    x = x / max(1e-6, np.sqrt(np.mean(x[np.abs(x) > .01] ** 2))) * 0.16  # loudness-match lines
    a = int(st * SR); vo[a:a + len(x)] += x[: n - a]
    spans.append([name, round(st, 3), round(st + len(x) / SR, 3), who])
    e = envs.setdefault(who, np.zeros(nf))
    hop = SR // FPS
    for i in range(len(x) // hop):
        r = np.sqrt(np.mean(x[i * hop:(i + 1) * hop] ** 2))
        f = int(round(st * FPS)) + i
        if f < nf: e[f] = r
for k, e in envs.items():
    p = np.percentile(e[e > 0], 90) if np.any(e > 0) else 1
    e = np.clip(e / p, 0, 1); e = np.where(e < .12, 0, e)
    e = np.convolve(e, [.25, .5, .25], 'same')
    envs[k] = [round(float(v), 2) for v in e]
with open(os.path.join(os.path.dirname(OUT), 'env1.js'), 'w') as f:
    f.write('const ENV1=' + json.dumps({k: v for k, v in envs.items()}) + ';\n')
    f.write('const VO_SPANS=' + json.dumps(spans) + ';\n')
    f.write('function talk(who,t){const e=ENV1[who];if(!e)return 0;const i=Math.round(t*30);return e[i]||0;}\n')
    f.write('function speaking(who,t){for(const s of VO_SPANS)if(s[3]===who&&t>=s[1]-.1&&t<=s[2]+.1)return true;return false;}\n')

# ---------------- helpers ----------------
def lp(x, w):
    w = max(1, int(w)); return np.convolve(x, np.ones(w) / w, 'same')
def band(m, lo, hi):
    x = rng.standard_normal(m); return lp(x, hi) - lp(x, lo)
def seg(a, b):
    return int(a * SR), int(b * SR)
def ramp(m, fi, fo):
    e = np.ones(m); fi = int(fi * SR); fo = int(fo * SR)
    if fi: e[:fi] = np.linspace(0, 1, fi)
    if fo: e[-fo:] = np.linspace(1, 0, fo)
    return e
amb = np.zeros(n); sfx = np.zeros(n)
def add(buf, t0, x):
    a = int(t0 * SR); b = min(n, a + len(x)); buf[a:b] += x[: b - a]

# 1) basın odası (0–12.9): oda tonu + kalabalık mırıltı
a, b = seg(0, 12.9); m = b - a
murmur = band(m, 600, 30) * (0.6 + 0.4 * lp(rng.standard_normal(m), 4000) * 8)
amb[a:b] += (0.05 * murmur + 0.01 * np.sin(2 * np.pi * 55 * T[a:b])) * ramp(m, .3, .6)
# kalem çizimi
pa, pb = 1.16, 3.0; mm = int((pb - pa) * SR); tt = np.arange(mm) / SR
add(sfx, pa, 0.12 * band(mm, 40, 4) * (0.55 + 0.45 * np.abs(np.sin(2 * np.pi * 3.2 * tt))) * ramp(mm, .05, .08))
# deklanşörler
for ft in [3.7, 4.55, 5.4, 7.2, 7.8, 8.5, 9.2, 9.8, 10.4]:
    for off, amp in [(0, .5), (.045, .35)]:
        mm = int(.03 * SR); add(sfx, ft + off, amp * band(mm, 20, 2) * np.exp(-np.arange(mm) / (.006 * SR)))
# alkış "bağıracak" sonrası
a2 = 9.0; mm = int(2.4 * SR)
cl = np.zeros(mm)
for _ in range(260):
    p = rng.integers(0, mm - 800); cl[p:p + 600] += band(600, 12, 2) * np.exp(-np.arange(600) / 90) * rng.uniform(.3, 1)
add(sfx, a2, 0.22 * cl * ramp(mm, .3, 1.2))

# 2) ev (12.9–27.6): saat tik-tak + TV maç uğultusu + gol kükremesi
a, b = seg(12.9, 27.6); m = b - a
amb[a:b] += 0.006 * band(m, 400, 60) * ramp(m, .2, .3)
for tk in np.arange(13.0, 27.4, 1.0):
    mm = int(.012 * SR); add(sfx, tk, 0.06 * band(mm, 10, 1) * np.exp(-np.arange(mm) / 120))
a, b = seg(14.9, 22.3); m = b - a; tt = np.arange(m) / SR
crowd = band(m, 300, 8) * (0.7 + 0.3 * np.sin(2 * np.pi * .4 * tt))
roar = np.where(tt > 19.81 - 14.9, np.exp(-(tt - (19.81 - 14.9)) / 1.3), 0) * 4
amb[a:b] += 0.03 * crowd * (1 + roar) * ramp(m, .25, .5)
# telefon titreşimi (shot4b 25.6–27.1)
for k in range(6):
    t0 = 25.6 + k * .5; mm = int(.25 * SR); tt = np.arange(mm) / SR
    add(sfx, t0, 0.12 * np.sign(np.sin(2 * np.pi * 150 * tt)) * lp(np.ones(mm), 1) * ramp(mm, .01, .02) * (0.6 + .4 * np.sin(2 * np.pi * 12 * tt)))

# 3) telefon görüşmesi (27.6–39.5): hat hışırtısı
a, b = seg(27.6, 39.5); m = b - a
amb[a:b] += 0.006 * band(m, 30, 3) * ramp(m, .1, .2)
# mesaj bildirimi (shot4c2 39.5)
for f0, t0 in [(1318, 39.55), (1760, 39.68)]:
    mm = int(.16 * SR); tt = np.arange(mm) / SR; add(sfx, t0, 0.08 * np.sin(2 * np.pi * f0 * tt) * np.exp(-tt / .05))
# ceket hışırtısı (shot4d)
mm = int(.7 * SR); add(sfx, 40.5, 0.06 * band(mm, 60, 6) * ramp(mm, .15, .4))

# 4) şehir (42.3–51.6): rüzgar + fabrika uğultusu + düdük + topal adım
a, b = seg(42.3, 51.6); m = b - a; tt = np.arange(m) / SR
amb[a:b] += (0.04 * band(m, 3000, 200) * (0.7 + 0.3 * np.sin(2 * np.pi * .13 * tt)) + 0.012 * np.sin(2 * np.pi * 48 * tt)) * ramp(m, .4, .5)
mm = int(2.2 * SR); tt = np.arange(mm) / SR
add(sfx, 42.7, 0.05 * (np.sin(2 * np.pi * 370 * tt) + .5 * np.sin(2 * np.pi * 555 * tt)) * ramp(mm, .25, 1.0))
for st in np.arange(48.3, 51.5, .62):
    for j, amp in enumerate([.22, .1]):
        mm = int(.05 * SR); add(sfx, st + j * .31, amp * band(mm, 40, 4) * np.exp(-np.arange(mm) / 500))

# 5) kapı / haciz (51.6–66.2): çekici motor + zincir
a, b = seg(51.6, 66.2); m = b - a; tt = np.arange(m) / SR
eng = lp(np.sin(2 * np.pi * 31 * tt) + .4 * np.sign(np.sin(2 * np.pi * 15.5 * tt)), 40) + .3 * band(m, 400, 30)
rec = np.where(T[a:b] > 61.0, np.exp(-(T[a:b] - 61.0) / 2.2), 1)
amb[a:b] += 0.035 * eng * rec * ramp(m, .6, .8) + 0.02 * band(m, 3000, 200) * ramp(m, .5, .5)
for ct in [52.2, 52.5, 52.75, 53.9, 54.2, 58.9, 59.3]:
    mm = int(.18 * SR); tt = np.arange(mm) / SR
    add(sfx, ct, 0.07 * (np.sin(2 * np.pi * 2900 * tt) + .7 * np.sin(2 * np.pi * 4100 * tt)) * np.exp(-tt / .04))
# tepsi/bardak şıkırtısı
for ct in [55.1, 56.8]:
    mm = int(.12 * SR); tt = np.arange(mm) / SR; add(sfx, ct, 0.05 * np.sin(2 * np.pi * 3500 * tt) * np.exp(-tt / .03))

# 6) yağmur final (66.2–73.4)
a, b = seg(63.8, 73.6); m = b - a
rn = band(m, 60, 2) * 0.9
for _ in range(900):
    p = rng.integers(0, m - 400); rn[p:p + 300] += band(300, 8, 1) * np.exp(-np.arange(300) / 40) * rng.uniform(.5, 2)
amb[a:b] += 0.05 * rn * ramp(m, 2.0, .5)
# başlık vuruşu
mm = int(2.6 * SR); tt = np.arange(mm) / SR
add(sfx, 73.42, 0.35 * np.sin(2 * np.pi * (52 - 10 * tt) * tt) * np.exp(-tt / .7) + 0.05 * band(mm, 200, 10) * np.exp(-tt / .3))

# ---------------- müzik: yumuşak pad (Am–F–C–G), sonda açılır ----------------
mus = np.zeros(n)
chords = [[220, 261.63, 329.63], [174.61, 220, 261.63], [196, 261.63, 329.63], [196, 246.94, 293.66]]
CL = 4.0
for i in range(int(TOTAL / CL) + 1):
    t0 = i * CL; a = int(t0 * SR); b = min(n, int((t0 + CL + 1.5) * SR))
    if a >= n: break
    tt = np.arange(b - a) / SR
    env = np.minimum(1, tt / 1.2) * np.exp(-np.maximum(0, tt - CL) / .6)
    s = np.zeros(b - a)
    for f0 in chords[i % 4]:
        for det in (-.6, .6):
            s += np.sin(2 * np.pi * (f0 + det) * tt) * .33
        s += .12 * np.sin(2 * np.pi * f0 * 2 * tt)
    s += .5 * np.sin(2 * np.pi * chords[i % 4][0] / 2 * tt)
    mus[a:b] += s * env
mus = lp(mus, 6)
mlev = np.interp(T, [0, 3, 12.9, 14.9, 22, 27.6, 39.5, 42.3, 51.6, 60, 66.2, 72.8, 73.4, 76.2],
                    [0, .5, .5, .25, .25, .35, .35, .55, .45, .45, .8, 1, .0, 0])
mus *= mlev * 0.018

# ducking: ambiyans/müzik VO altında iner
voenv = lp(np.abs(vo), int(.12 * SR)); voenv = np.clip(voenv / .05, 0, 1)
duck = 1 - .45 * voenv
mix = vo + (amb + mus) * duck + sfx * (1 - .25 * voenv)
mix *= ramp(n, .05, .6)
peak = np.abs(mix).max(); mix = mix / peak * .89
st = np.stack([mix, mix], 1)
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
print('ok', json.dumps(spans))
