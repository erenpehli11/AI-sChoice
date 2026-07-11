# Claude Design — Batch 2: Dönüşüm & İlk Sonuç (Android / Play Store)

> 5 adımlık planın 2. adımı. Batch 1 (giriş & onboarding) başarıyla tamamlandı.
> Bu batch: Teaser sonuç · Paywall · Sonuç hero (açık+koyu) · Paylaşım kartı (4 ekran).
> Prompt kendi kendine yeter; tüm marka kuralları + ekran metinleri gömülü.
> Örnek mevsim tüm ekranlarda: **Berrak Kış ❄️** (soğuk, yüksek kontrast, net renkler).

---

## ⬇️ AŞAĞIDAKİ METNİ CLAUDE DESIGN'A OLDUĞU GİBİ VER

---

Sen üst düzey bir **Android** ürün tasarımcısısın. **Yalnızca Google Play Store'da** yayınlanacak "Nüans" adlı kişisel renk analizi uygulamasının **dönüşüm & ilk sonuç akışındaki 4 yüksek-çözünürlüklü ekranını** tasarla. **Material Design 3** konvansiyonlarına uy. Bu, daha önce tasarlanan giriş/onboarding akışının DEVAMIDIR — aynı görsel dili, buton stilini, tipografi ve boşluk ritmini birebir sürdür. Metinler Türkçedir ve birebir kullanılacaktır.

### ÜRÜN (hatırlatma)
Nüans: kullanıcı selfie çeker, yapay zekâ ten alt-tonunu okuyup onu 12-mevsim renk sistemine yerleştirir ve yakışan giysi/makyaj/saç/takı renklerini verir. Slogan: "Sana yakışan renk, sende saklı." Kitle: 16-40 yaş, stil/güzellikle ilgilenen kadınlar, Türkiye öncelikli. Abonelik: RevenueCat + Google Play Billing (hard paywall). Premium ve güven veren hissetmeli.

### PLATFORM & FORMAT (Android)
- Android telefon, dikey. Modern çerçeve (punch-hole ön kamera), üstte Android durum çubuğu, altta jest navigasyon tutamağı. iOS öğesi KULLANMA.
- Material 3 yüzeyleri: uygun elevation/gölge, ripple, Material köşe yuvarlatmaları.
- Gerçekçi Android telefon çerçevesinde, yüksek çözünürlük. Açık tema birincil (Sonuç hero ayrıca koyu tema).

### MARKA HİSSİ — "Editöryal Güzellik Galerisi"
Arayüz renklerle YARIŞMAZ; nötr, sofistike, sakin zemin — renk paletleri "sanat eseri" gibi öne çıkar. Yüksek moda editoryali + Kore güzellik minimalizmi. Bol boşluk, ince çizgiler, yumuşak gölge, premium doku. KAÇIN: cıvıl gradyan, çocuksu renk, kalabalık arayüz, ucuz "AI app" görünümü.

### RENK PALETİ (harfiyen)
- Zemin: sıcak krem `#F7F3EE` · Kart/yüzey: `#FFFFFF` / `#FBF8F4`
- Ana metin: antrasit-kahve `#2A2622` · İkincil metin: taş `#8A8178`
- **Vurgu (primary): şampanya altını `#C9A66B`** · altın üstü metin: `#2A2622`
- İkincil vurgu (az): tozlu gül `#C98A86` · Ayraç: kum `#E8E1D8`
- **Koyu tema (sadece Sonuç hero varyantı):** zemin `#1A1613` · yüzey `#241F1B` · metin `#F2ECE3` · vurgu `#C9A66B`
- **Berrak Kış paleti (sonuç swatch'ları):** safir mavi, buz beyazı, gerçek siyah, fuşya, zümrüt yeşili, buz pembesi, kraliyet moru gibi **soğuk, canlı, yüksek-kontrast** tonlar.

### TİPOGRAFİ
- Başlık: zarif serif (Playfair Display / Fraunces hissi), büyük, editoryal.
- Gövde & arayüz: temiz sans (Inter / Roboto hissi).

### BİLEŞEN STİLİ
- Ana buton: Material filled, şampanya altını zemin + koyu metin, tam-genişlik, ripple.
- İkincil buton: outlined/text, kum kenarlık.
- Kartlar: Material elevated/filled card, yumuşak köşe, hafif gölge.
- Swatch: yuvarlak/yuvarlatılmış kare, hex yazısı yok, temiz dizilim.

### TON
Sıcak, kişisel, güven veren, "sen" hitabı, abartısız.

### NAVİGASYON KURALI (önemli)
Sonucun bölümleri (Alt-ton · Palet · Makyaj · Saç & Takı · Kombin) aynı içeriğin alt görünümleridir → **üstte yapışkan sekme şeridi (top tabs)** ile gezilir. **Bottom navigation bar KULLANILMAZ**; o, uygulamanın üst düzey hedefleri (Paletim/Alışveriş/Geçmiş/Ayarlar) için sonraki batch'e ayrılmıştır. Bu batch'teki hiçbir ekranda alt navigasyon çubuğu olmasın.

---

## TASARLANACAK 4 EKRAN (metinler birebir)

**Ekran 1 — Teaser sonuç**
Üstte küçük: "Sonucun hazır!" · Büyük serif başlık: "Sen bir Berrak Kış ❄️ çıktın". Hemen altında BULANIK (blur'lu) renk paleti şeridi ve üzerinde bir kilit ikonu. Alt metin: "Paletini ve tüm önerilerini görmek için kilidi aç." Altta ana buton (altın): "Sonucumu gör". Blur ile net başlık arasındaki kontrast merak uyandırsın; premium ve davetkâr olsun.

**Ekran 2 — Paywall (RevenueCat + Google Play Billing)**
Başlık (serif): "Tüm renk dünyanı aç" · Alt başlık: "Sana özel paletin, makyaj, saç ve kombin önerilerin hazır." · Beş faydalı madde (her birinde altın tik):
"✓ Kişisel renk paletin — yakışanlar + kaçınılacaklar"
"✓ Makyaj, saç ve takı önerilerin"
"✓ Kombin ve nötr renk rehberin"
"✓ Paylaşılabilir sonuç kartın"
"✓ Sınırsız yeniden analiz"
İki seçilebilir plan kartı (Material seçim kartı):
- Öne çıkan (SEÇİLİ, altın kenarlık + hafif altın dolgu): "Yıllık — ₺1.499/yıl" · üstünde küçük rozet: "En avantajlı · 3 gün ücretsiz"
- İkincil: "Aylık — ₺249/ay"
Altta büyük ana buton (altın): "Ücretsiz dene" · hemen altında küçük gri metin: "3 gün ücretsiz, sonra ₺1.499/yıl. İstediğin zaman iptal edebilirsin." · En altta küçük linkler: "Satın alımı geri yükle · Koşullar · Gizlilik".
(Not: fiyatlar örnek yer tutucudur; gerçekte Google Play lokalize gösterir. Ekranda ince "Google Play üzerinden faturalandırılır" hissi olabilir.)

**Ekran 3 — Sonuç ana ekran (hero) — AÇIK + KOYU iki varyant**
Sonuç ekranı TEK uzun kaydırılabilir sayfadır; bölümler arasında geçiş **üstteki yapışkan (sticky) sekme şeridiyle** olur — ASLA alttaki bottom navigation bar ile değil.
Yukarıdan aşağıya düzen:
- Büyük serif başlık: "Sen: Berrak Kış ❄️"
- Tek satır tanım: "Yüksek kontrast; canlı-soğuk renkler seni parlatır."
- **Yapışkan ÜST SEKME şeridi** (Material scrollable TabRow, 5 öğe kaydırılabilir): "Alt-ton · Palet · Makyaj · Saç & Takı · Kombin". Aktif sekme (ilk: Palet) altın renkte + altında ince altın gösterge çizgisi; diğerleri nötr. Bu şerit sayfa kaydıkça üstte sabit kalır.
- Aktif bölümün içeriği olarak TAM, net renk paleti şeridi (8-10 swatch, Berrak Kış soğuk-canlı tonları).
- Ana buton (altın): "Paylaş" · yanında ikincil: "Detayları gör" (aşağı, bölümlere kaydırır).
- **ÖNEMLİ:** Ekranın en altına HİÇBİR bottom navigation bar KOYMA. Alt bölge temiz kalsın (yalnızca Android jest tutamağı). Uygulama-seviyesi alt navigasyon (Paletim/Alışveriş/Geçmiş/Ayarlar) sonraki batch'e aittir ve burada görünmez.
Bu ekran uygulamanın vitrinidir — en cilalı, en editoryal ekran olsun. Hem açık hem koyu tema varyantını ver.

**Ekran 4 — Paylaşılabilir kart (share) — 9:16 dikey**
Instagram Story oranında (9:16) dikey, markalı bir paylaşım kartı tasarla: üstte "Ben bir Berrak Kış ❄️", ortada şık renk paleti kompozisyonu, altta küçük "Sen hangi mevsimsin? · Nüans". Sosyal medyada paylaşılacak; estetik, imrendirici, markalı olsun. Kartın altında Android paylaşım alt-sayfası (Material bottom sheet) göster: başlık "Sonucunu paylaş" ve seçenekler "Instagram Story · Kaydet · Diğer".

---

## ÇIKTI BEKLENTİSİ
- 4 ekran (Sonuç hero ayrıca koyu tema = toplam 5 görsel), Android çerçeveli, yüksek sadakat.
- Tüm metinler yukarıdaki Türkçe haliyle birebir.
- Batch 1 ile AYNI tasarım dili: aynı buton stili, tipografi, boşluk ritmi, renk tokenları, Material 3 dili.
- Renk swatch'ları Berrak Kış'ın soğuk-canlı tonlarını yansıtsın.

---

## Bizim kilitli kararlarımız (referans — hepsi yukarıya gömüldü)
Yalnızca Android/Play · Material 3 · Nüans · slogan "Sana yakışan renk, sende saklı." · editöryal güzellik galerisi · krem `#F7F3EE` + antrasit `#2A2622` + şampanya altını `#C9A66B` (+ koyu tema) · serif başlık + sans gövde · 12-mevsim (örnek Berrak Kış ❄️) · RevenueCat + Google Play Billing, yıllık öne çıkan + 3 gün trial · paylaşılabilir kart = büyüme motoru · **sonuç bölümleri = üst yapışkan sekmeler, bottom-nav DEĞİL**.
