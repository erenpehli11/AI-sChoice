# Renk Analizi App — Tam Proje Tanımı (Design öncesi)

> Bu belge ürünü baştan sona kelimelere döker: kimlik, kapsam, tema, renk paleti,
> tipografi, sloganlar ve **tam ekran listesi**. Bir sonraki adım: bu belgeden
> Claude Design için tasarım prompt'u üretmek.

---

## 1. Ürün tek cümlede

Kullanıcının bir selfie'siyle **kişisel renk mevsimini** (12-sezon sistemi) belirleyip;
ona yakışan giysi, makyaj, saç ve takı renklerini **paylaşılabilir bir kartla** sunan,
Türkçe-native ve Türk pazarına (Trendyol/yerel markalar) entegre bir mobil abonelik uygulaması.

- **Hedef kitle:** Türkiye + global; ağırlıklı 16-40 yaş, stil/güzellikle ilgilenen kadınlar (ikincil: erkek grooming).
- **Değer vaadi:** "Sana yakışan rengi 30 saniyede öğren, bir daha yanlış renk alma."
- **Platform:** **Yalnızca Android / Google Play Store.** Tasarım Material Design (Material 3) konvansiyonlarına uyar: alt navigasyon çubuğu, üst app bar + sistem geri davranışı, Google ile giriş, Play Billing. (iOS yok.) Önerilen stack: Flutter veya Jetpack Compose (Kotlin) + RevenueCat.
- **İş modeli:** Hard paywall, $9,99/ay + $39,99/yıl (Play'de ₺ lokalize), 5-9 gün trial, RevenueCat + Google Play Billing.
- **Büyüme:** Sıfır-reklam; paylaşılabilir sonuç kartı + tek Instagram/TikTok içerik hesabı + Türkçe ASO.

---

## 2. Ürünün kalbi — AI'nın response verdiği 9 alan (= uygulama kapsamı)

Her alan iki katman döndürür: **(a) kısa verdict** (paylaşılabilir) + **(b) Türkçe gerekçe/öneri**.

1. **Alt-ton** — Sıcak / Soğuk / Nötr (+ kısa gerekçe)
2. **Mevsim (12-sezon)** — İlkbahar/Yaz/Sonbahar/Kış + alt-tip (ör. "Berrak Kış")
3. **Kontrast seviyesi** — Yüksek / Orta / Düşük (ten-saç-göz)
4. **Kişisel palet** — 30-50 renk: yakışanlar + belirgin "kaçın" listesi
5. **Metal / takı** — Altın mı gümüş mü
6. **Makyaj tonları** — Ruj / fondöten alt-tonu / allık / far aileleri
7. **Saç rengi** — Yakışan tonlar + kaçınılacaklar
8. **Kombin & nötrler** — Senin nötrlerin + vurgu renkleri + kontrast önerisi
9. **Yüz şekli (bonus)** — Oval/kare/kalp + yakışan yaka/gözlük/saç kesimi

**Türk-pazarı farklılaştırması:** "Paletinle alışveriş" (Trendyol/LC Waikiki/Zara), yerel makyaj
markası eşleştirme (Flormar/Golden Rose/Note), doğal Türkçe danışman dili.

---

## 3. İsim

**Çalışma adı (önerilen): "Nüans"** — Türkçe'de "ince ton farkı" demek; zarif, kısa, hem
Türk hem global kulağa premium geliyor, renk temasına birebir oturuyor.

Alternatifler:
- **Tonum** — "benim tonum", sıcak/kişisel, %100 Türkçe
- **Colora** — global-friendly, app-store'da telaffuzu kolay
- **Mevsimin** — "senin mevsimin", konsepti doğrudan anlatır
- **Palet / Paletim** — sade ama jenerik olabilir

> Karar noktası: İsim son kullanıcı kararıdır; belge boyunca çalışma adı olarak **Nüans** kullanılır.

---

## 4. Marka teması & his (mood)

**Konsept: "Editöryal güzellik galerisi".** Uygulama renk *hakkında* olduğu için arayüzün
kendisi renkle yarışmamalı — nötr, sofistike, sakin bir zemin; renkli paletler "sanat eseri"
gibi öne çıkar (galeri duvarı mantığı). Referans hissi: yüksek moda editoryali + Kore güzellik
app'lerinin minimalizmi. Bol beyaz alan, ince çizgiler, yumuşak gölgeler, premium doku.

- **His sıfatları:** zarif, sakin, güven veren, "pahalı görünen", kişisel, sıcak.
- **KAÇINILACAK:** cıvıl cıvıl gradient'ler, çocuksu renkler, kalabalık UI, ucuz "AI app" görünümü.

---

## 5. Renk paleti (bir renk-analizi app'i için renk seçimi)

**İlke:** Marka rengi NÖTR + zarif olmalı ki kullanıcının mevsim paleti ekranda parlasın.
Sonuç ekranında UI, kullanıcının **mevsimine göre dinamik olarak** hafif tonlanabilir (v2).

### Açık tema (varsayılan)
| Rol | Renk | Hex |
|---|---|---|
| Zemin | Sıcak krem / kemik beyazı | `#F7F3EE` |
| Yüzey (kart) | Kırık beyaz | `#FFFFFF` / `#FBF8F4` |
| Ana metin (ink) | Derin antrasit-kahve | `#2A2622` |
| İkincil metin | Yumuşak taş | `#8A8178` |
| **Vurgu (accent)** | Şampanya altını | `#C9A66B` |
| İkincil vurgu | Tozlu gül (opsiyonel) | `#C98A86` |
| Çizgi/ayraç | Açık kum | `#E8E1D8` |

### Koyu tema
| Rol | Renk | Hex |
|---|---|---|
| Zemin | Sıcak siyah-kahve | `#1A1613` |
| Yüzey | Koyu espresso | `#241F1B` |
| Ana metin | Krem | `#F2ECE3` |
| Vurgu | Şampanya altını | `#C9A66B` |

**Neden şampanya altını accent:** güzellik/premium sektörüyle örtüşür, cinsiyet-nötr-premium,
altın/gümüş takı önerisiyle tematik uyum. Kesin kırmızı/mor gibi "AI app klişesi" tonlardan uzak.
Mevsim rozetleri kendi renklerini taşır (İlkbahar sıcak yeşil, Yaz serin mavi, Sonbahar toprak, Kış safir/berrak).

---

## 6. Tipografi

- **Başlık:** Zarif bir serif (editoryal his) — ör. Playfair Display / Fraunces / Canela benzeri.
- **Gövde & UI:** Temiz bir sans-serif — ör. Inter / SF Pro / General Sans.
- **Kontrast:** Büyük serif başlıklar ("Sen: Berrak Kış") + küçük, ferah sans gövde = premium editoryal ritim.

---

## 7. Sloganlar

**Ana slogan (öneri):** *"Sana yakışan renk, sende saklı."*

Alternatifler (Türkçe):
- "Doğru renk her şeyi değiştirir."
- "Rengini keşfet, tarzını bul."
- "Teninin dilini konuş."
- "Senin mevsimin hangisi?"

Play Store kısa açıklama (ASO odaklı): *"Kişisel renk analizi — mevsimini ve paletini keşfet"*

İngilizce (global): *"Find the colors made for you."* / *"Your season, decoded."*

---

## 8. TAM EKRAN LİSTESİ — MVP v1 (22 ekran)

### A. Açılış & Değer (3)
1. **Splash** — logo + slogan, kısa animasyon.
2. **Onboarding değer ekranı** — 3 kaydırmalı slide (pager): ne yapar, nasıl çalışır, örnek sonuç kartı.
3. **Başla / Giriş** — misafir devam veya "Google ile giriş"; KVKK/gizlilik onayı.

### B. Quiz & Çekim (5)
4. **Quiz giriş** — "3 soru, 30 saniye" güven mesajı.
5. **Quiz S1** — cinsiyet / stil tercihi.
6. **Quiz S2** — damar rengi (mavi/yeşil) = alt-ton ipucu.
7. **Selfie rehberi** — doğal ışık, makyajsız, saç açık talimatı + iyi/kötı örnek.
8. **Selfie çekim/yükleme** — kamera veya galeri.

### C. Analiz & Paywall (3)
9. **Analiz ediliyor** — zarif yükleme animasyonu ("tenin okunuyor…").
10. **Teaser sonuç** — mevsim AÇIK gösterilir, palet BULANIK (merak kancası).
11. **Paywall (hard)** — tam sonucu açmak için; $9,99/ay + $39,99/yıl, 5-9 gün trial, faydalar listesi.

### D. Sonuç — reveal + detay (7)
12. **Sonuç ana ekran** — "Sen: Berrak Kış ❄️" hero + palet şeridi (paylaşılabilir hero).
13. **Alt-ton & kontrast** — sıcak/soğuk + kontrast + Türkçe gerekçe.
14. **Kişisel palet** — yakışan renkler grid + "kaçın" listesi.
15. **Makyaj tonları** — ruj/fondöten/allık/far aileleri (+ yerel marka eşleştirme).
16. **Saç rengi & metal/takı** — yakışan saç tonları + altın/gümüş.
17. **Kombin & nötrler (+ yüz şekli)** — nötrlerin, vurgu renkleri, yüz şekli bonusu.
18. **Paylaşılabilir kart / Share** — dikey story kartı + paylaş sayfası.

### E. Ana kullanım (4)
19. **Ana ekran / Paletim** — analiz sonrası kalıcı dashboard; palet + hızlı erişim.
20. **Paletinle alışveriş** — Trendyol/Zara/LC Waikiki ürün önerileri (renk-eşleşmeli).
21. **Geçmiş / Yeniden analiz** — önceki sonuçlar + yeni analiz başlat.
22. **Ayarlar & Abonelik** — abonelik yönetimi, dil, gizlilik, destek.

### Yardımcı durumlar (ana sayıya dahil değil, tasarımda gerekli)
- Boş durum (henüz analiz yok), hata (ışık kötü/yüz bulunamadı), offline, yükleme iskeletleri, paywall-restore.

### v2+ (sonraki fazlar, şimdilik tasarlanmayacak)
- Arkadaş/uyum analizi (sosyal kanca), gardırop takibi, mevsimsel yeniden-analiz hatırlatması, İngilizce+Arapça lokalizasyon.

---

## 9. Ekran akış özeti

Splash → Onboarding → Giriş → Quiz(×2) → Selfie rehberi → Çekim → Analiz → Teaser → **Paywall** →
Sonuç hero → (detay sekmeleri 13-17) → Paylaş kartı → Ana ekran/Paletim → (alışveriş / geçmiş / ayarlar).

---

## 10. Sıradaki adım

Bu belge onaylanınca → Claude Design için **ekran-ekran tasarım prompt'u** hazırlanacak
(her ekran için amaç, içerik blokları, his, renk/tipografi referansı, durum varyantları).
