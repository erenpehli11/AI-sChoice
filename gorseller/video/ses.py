# Pen scratch + camera shutter clicks + low room tone, synthesized (no external audio)
import numpy as np, wave, sys
SR = 48000; DUR = 6.6
n = int(SR * DUR); t = np.arange(n) / SR
rng = np.random.default_rng(3)
out = np.zeros(n)

# room tone: very quiet low hum + filtered noise
hum = 0.012 * np.sin(2 * np.pi * 55 * t) + 0.006 * np.sin(2 * np.pi * 110 * t)
room = np.convolve(rng.standard_normal(n), np.ones(400) / 400, mode='same') * 0.05
out += hum + room

def bandnoise(m, lo_win, hi_win):
    x = rng.standard_normal(m)
    lo = np.convolve(x, np.ones(lo_win) / lo_win, mode='same')
    hi = np.convolve(x, np.ones(hi_win) / hi_win, mode='same')
    return hi - lo

# pen nib touching paper (1.2s) + scratching (1.2 - 3.1s)
a, b = int(1.2 * SR), int(3.1 * SR)
seg = bandnoise(b - a, 40, 4)
tt = np.arange(b - a) / SR
env = (0.55 + 0.45 * np.abs(np.sin(2 * np.pi * 3.2 * tt))) * np.minimum(1, tt / 0.05) * np.minimum(1, (tt[-1] - tt) / 0.08)
out[a:b] += 0.09 * seg * env

# camera shutters at flash times
for ft in [3.55, 4.25, 4.75, 5.55]:
    s = int(ft * SR)
    for off, amp in [(0, 0.5), (int(0.045 * SR), 0.35)]:
        m = int(0.03 * SR)
        click = bandnoise(m, 20, 2) * np.exp(-np.arange(m) / (0.006 * SR))
        out[s + off:s + off + m] += amp * click
    # flash whine/pop tail
    m = int(0.12 * SR)
    out[s:s + m] += 0.03 * np.sin(2 * np.pi * 2400 * np.arange(m) / SR) * np.exp(-np.arange(m) / (0.03 * SR))

# fade in/out
fade = int(0.15 * SR)
out[:fade] *= np.linspace(0, 1, fade); out[-fade:] *= np.linspace(1, 0, fade)
out = np.clip(out / max(1e-6, np.abs(out).max()) * 0.8, -1, 1)
pcm = (out * 32767).astype(np.int16)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('ok')
