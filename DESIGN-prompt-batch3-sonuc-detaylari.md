# Claude Design — Batch 3: Sonuç Detayları (Android / Play Store)

> 5 adımlık planın 3. adımı. Batch 1 (giriş) ve Batch 2 (dönüşüm & sonuç hero) tamamlandı.
> Bu batch: sonucun 5 detay bölümü — hero'daki üst yapışkan sekmelerin içerikleri.
> Alt-ton & Kontrast · Kişisel palet · Makyaj tonları · Saç & Takı · Kombin & Yüz şekli.
> Örnek mevsim tüm ekranlarda: **Berrak Kış ❄️** (soğuk, yüksek kontrast).
> Aşağıdaki dolu örnek metinler, gerçekte AI'nın kullanıcıya göre ürettiği içeriğin yerine geçer.

---

## ⬇️ AŞAĞIDAKİ METNİ CLAUDE DESIGN'A OLDUĞU GİBİ VER

---

Sen üst düzey bir **Android** ürün tasarımcısısın. **Yalnızca Google Play Store'da** yayınlanacak "Nüans" kişisel renk analizi uygulamasının **sonuç detay ekranlarındaki 5 yüksek-çözünürlüklü ekranını** tasarla. **Material Design 3** konvansiyonlarına uy. Bu ekranlar, daha önce tasarlanan **Sonuç hero** ekranının DEVAMIDIR: sonuç tek uzun kaydırılabilir sayfadır ve bölümler arasında **üstteki yapışkan sekme şeridiyle** gezilir. Her ekran, o bölümün sekmesi aktifken görünen içeriktir. Aynı görsel dili, buton stilini, tipografi ve boşluk ritmini birebir sürdür. Metinler Türkçedir ve birebir kullanılacaktır.

### ÜRÜN (hatırlatma)
Nüans: kullanıcı selfie çeker, AI ten alt-tonunu okuyup 12-mevsim sistemine yerleştirir ve yakışan giysi/makyaj/saç/takı renklerini verir. Kitle: 16-40 yaş, stil/güzellikle ilgilenen kadınlar, Türkiye öncelikli. Premium, güven veren his.

### PLATFORM & FORMAT (Android)
- Android telefon, dikey. Modern çerçeve (punch-hole), üstte Android durum çubuğu, altta jest tutamağı. iOS öğesi KULLANMA.
- Material 3 yüzeyleri: elevation/gölge, ripple, Material köşeler. Gerçekçi Android çerçevesi, yüksek çözünürlük. **Açık tema.**

### HER EKRANIN ORTAK İSKELETİ (önemli — 5 ekranda da aynı)
1. **Kompakt üst app bar:** solda geri oku, ortada/solda küçük "Berrak Kış ❄️", sağda paylaş ikonu.
2. **Yapışkan ÜST SEKME şeridi** (Material scrollable TabRow): "Alt-ton · Palet · Makyaj · Saç & Takı · Kombin". O ekranın sekmesi AKTİF (şampanya altını + altında ince altın gösterge çizgisi), diğerleri nötr.
3. **Bölüm içeriği** (aşağıda her ekran için).
- **Ekranın en altına bottom navigation bar KOYMA.** Alt bölge temiz (yalnızca jest tutamağı). Uygulama-seviyesi navigasyon sonraki batch'e aittir.

### MARKA HİSSİ — "Editöryal Güzellik Galerisi"
Arayüz renklerle YARIŞMAZ; nötr, sofistike zemin — renkler öne çıkar. Bol boşluk, ince çizgiler, yumuşak gölge, premium doku. KAÇIN: cıvıl gradyan, çocuksu renk, kalabalık arayüz, ucuz "AI app" görünümü.

### RENK PALETİ (harfiyen)
- Zemin: sıcak krem `#F7F3EE` · Kart/yüzey: `#FFFFFF` / `#FBF8F4`
- Ana metin: antrasit-kahve `#2A2622` · İkincil metin: taş `#8A8178`
- **Vurgu (primary): şampanya altını `#C9A66B`** · altın üstü metin: `#2A2622`
- İkincil vurgu (az): tozlu gül `#C98A86` · Ayraç: kum `#E8E1D8`
- **Berrak Kış renk swatch'ları:** safir mavi, buz beyazı, gerçek siyah, fuşya, zümrüt, buz pembesi, kraliyet moru (soğuk-canlı). "Kaçın" tonları: hardal, kiremit, haki, somon, deve tüyü (sıcak-donuk).

### TİPOGRAFİ
- Başlık: zarif serif (Playfair Display / Fraunces hissi). · Gövde & arayüz: temiz sans (Inter / Roboto hissi).

### BİLEŞEN STİLİ
- Kartlar: Material elevated/filled, yumuşak köşe, hafif gölge. Bölümler kartlar/gruplar halinde.
- Swatch: yuvarlak/yuvarlatılmış kare, hex yazısı yok. · Etiket/rozet (chip): "Soğuk", "Yüksek" gibi değerler küçük altın/nötr chip.
- Buton: Material filled (altın) / outlined (kum kenarlık).

### TON
Sıcak, kişisel, danışman, "sen" hitabı, abartısız.

---

## TASARLANACAK 5 EKRAN (metinler birebir; örnek içerik Berrak Kış)

**Ekran 1 — Alt-ton & Kontrast** (aktif sekme: Alt-ton)
- Kart 1 — Başlık: "Alt-tonun" · büyük değer chip'i: "Soğuk" · gerekçe metni: "Damar ve ten kontrastın soğuk gösteriyor; mavi-esaslı tonlar tenini dengeliyor."
- Kart 2 — Başlık: "Kontrastın" · değer chip'i: "Yüksek" · öneri metni: "Ten, saç ve gözün arasında güçlü kontrast var. Kombinlerinde koyu-açık zıtlığını koru; soft geçişlerden kaçın."

**Ekran 2 — Kişisel palet** (aktif sekme: Palet)
- Başlık: "Senin renklerin" · alt not: "Bu tonlar tenini aydınlatır." · altında 8-10 swatch grid (safir, buz beyazı, siyah, fuşya, zümrüt, buz pembesi, kraliyet moru, gerçek kırmızı).
- Başlık: "Bunlardan kaçın" · alt not: "Bu tonlar seni soluk gösterebilir." · altında 5-6 sönük swatch (hardal, kiremit, haki, somon, deve tüyü).
- Alt buton (outlined): "Paleti kaydet".

**Ekran 3 — Makyaj tonları** (aktif sekme: Makyaj)
- Başlık: "Makyaj tonların"
- Dört alt-bölüm (her biri küçük renk çipleri + kısa metin):
  - "Ruj" — soğuk kırmızı, fuşya, berry · örnek eşleştirme satırı: "Öneri: Golden Rose Velvet Matte 22"
  - "Fondöten alt-tonu" — soğuk / nötr
  - "Allık" — soğuk pembe, gül kurusu
  - "Far" — gümüş, antrasit, lacivert
- Alt not (küçük, gri): "Öneriler tahmindir; en iyisi mağazada dene."

**Ekran 4 — Saç rengi & Takı** (aktif sekme: Saç & Takı)
- Başlık: "Saç rengin"
  - "Yakışanlar" satırı: koyu kahve, siyah, soğuk küllü tonlar (küçük swatch'lar)
  - "Kaçın" satırı: altın sarısı, bakır, sıcak balyaj (sönük swatch'lar)
- Başlık: "Takıların" · büyük değer: "Gümüş sana daha çok yakışır" · yanında altın/gümüş görsel ipucu · gerekçe: "Soğuk alt-tonunla gümüş ve platin, altından daha uyumlu."

**Ekran 5 — Kombin & Yüz şekli** (aktif sekme: Kombin)
- Başlık: "Nötrlerin" · metin: "Saf beyaz, gerçek siyah, gri ve lacivert senin nötrlerin. Krem ve bejden uzak dur." (küçük swatch dizisi)
- Başlık: "Vurgu renklerin" · metin: "Safir, fuşya ve zümrüt en güçlü vurgu renklerin." (swatch dizisi)
- Başlık: "Yüz şeklin" (küçük "bonus" rozeti) · değer: "Oval" · öneri: "Çoğu yaka ve gözlük sana yakışır; dengeni korumak için aşırı yuvarlak çerçevelerden kaçın."

---

## ÇIKTI BEKLENTİSİ
- 5 ekran, açık tema, Android çerçeveli, yüksek sadakat.
- Her ekranda kompakt üst app bar + aktif sekmeli yapışkan üst sekme şeridi + bölüm içeriği. Alt navigasyon çubuğu YOK.
- Tüm metinler yukarıdaki Türkçe haliyle birebir (örnek içerik dahil).
- Batch 1-2 ile AYNI tasarım dili: buton stili, tipografi, boşluk ritmi, renk tokenları, Material 3.
- Swatch'lar Berrak Kış soğuk-canlı tonlarını, "kaçın" bölümleri sıcak-donuk tonları yansıtsın.

---

## Bizim kilitli kararlarımız (referans)
Yalnızca Android/Play · Material 3 · Nüans · editöryal güzellik galerisi · krem `#F7F3EE` + antrasit `#2A2622` + şampanya altını `#C9A66B` · serif başlık + sans gövde · 12-mevsim (örnek Berrak Kış ❄️) · sonuç bölümleri = üst yapışkan sekmeler (bottom-nav DEĞİL) · Türkçe-native, danışman tonu · yerel makyaj markası eşleştirme farkımız.
