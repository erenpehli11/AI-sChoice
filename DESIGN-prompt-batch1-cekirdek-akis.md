# Claude Design Prompt — Nüans · Batch 1: Çekirdek Akış (11 ekran)

> Bu, adım-adım tasarımın **1. partisidir**: onboarding → quiz → analiz → paywall → sonuç → paylaşım.
> Prompt tamamen kendi kendine yeter; tüm marka kararları ve ekran metinleri içine gömülüdür.
> (Batch 2 daha sonra: sonuç detay ekranları + ana kullanım ekranları.)

---

## ⬇️ AŞAĞIDAKİ METNİ CLAUDE DESIGN'A OLDUĞU GİBİ VER

---

Sen üst düzey bir mobil ürün tasarımcısısın. iOS-öncelikli bir uygulamanın **çekirdek akışındaki 11 yüksek-çözünürlüklü ekranını** tasarla. Aşağıdaki tüm marka kuralları ve ekran metinleri bağlayıcıdır; harfiyen uygula. Metinler Türkçedir ve birebir kullanılacaktır.

### ÜRÜN
- **Ad:** Nüans
- **Ne:** Kişisel renk analizi uygulaması. Kullanıcı bir selfie çeker; yapay zekâ ten alt-tonunu okuyup onu 12-mevsim renk sistemine (İlkbahar/Yaz/Sonbahar/Kış ve alt-tipleri) yerleştirir ve ona yakışan giysi/makyaj/saç/takı renklerini verir.
- **Slogan:** "Sana yakışan renk, sende saklı."
- **Kitle:** Ağırlıkla 16-40 yaş, stil ve güzellikle ilgilenen kadınlar (ikincil: erkek). Türkiye öncelikli, global.
- **Abonelik:** RevenueCat (hard paywall). Uygulama premium ve güven veren hissetmeli.

### PLATFORM & FORMAT
- iPhone (modern, çentikli/dynamic island), dikey. Güvenli alanlara saygı göster.
- Her ekranı gerçekçi iPhone çerçevesinde, yüksek çözünürlükte sun.
- **Açık tema birincil.** Ayrıca "Sonuç ana ekran" (ekran 10) için bir de koyu tema varyantı ver.

### MARKA HİSSİ — "Editöryal Güzellik Galerisi"
Uygulama renk *hakkında* olduğu için arayüz renklerle YARIŞMAMALI. Zemin nötr, sofistike ve sakin; kullanıcının renk paletleri ekranda "sanat eseri" gibi öne çıkar (galeri duvarı mantığı). Referans his: yüksek moda editoryali + Kore güzellik uygulamalarının minimalizmi. Bol beyaz alan, ince çizgiler, yumuşak gölgeler, premium doku. **KAÇIN:** cıvıl cıvıl gradyanlar, çocuksu renkler, kalabalık arayüz, ucuz "AI app" görünümü, stok illüstrasyon.

### RENK PALETİ (harfiyen kullan)
**Açık tema:**
- Zemin: sıcak krem `#F7F3EE`
- Kart/yüzey: `#FFFFFF` ve `#FBF8F4`
- Ana metin (ink): derin antrasit-kahve `#2A2622`
- İkincil metin: yumuşak taş `#8A8178`
- **Vurgu (accent): şampanya altını `#C9A66B`** (ana butonlar, vurgular)
- İkincil vurgu (az kullan): tozlu gül `#C98A86`
- Çizgi/ayraç: açık kum `#E8E1D8`

**Koyu tema (sadece ekran 10 varyantı):**
- Zemin: sıcak siyah-kahve `#1A1613` · Yüzey: espresso `#241F1B` · Metin: krem `#F2ECE3` · Vurgu: `#C9A66B`

**Mevsim rozet renkleri** (sonuç ekranlarında): İlkbahar 🌸 sıcak yeşil-mercan, Yaz 🌊 serin mavi-lavanta, Sonbahar 🍂 toprak-hardal, Kış ❄️ safir-berrak. Bu batch'te örnek mevsim = **Berrak Kış ❄️** (soğuk, yüksek kontrast, net renkler).

### TİPOGRAFİ
- **Başlıklar:** zarif serif (Playfair Display / Fraunces / Canela hissi). Büyük, editoryal.
- **Gövde & arayüz:** temiz sans-serif (Inter / SF Pro hissi).
- Ritim: büyük serif başlık + küçük, ferah sans gövde.

### BİLEŞEN STİLİ
- Butonlar: dolgulu ana buton = şampanya altını zemin, koyu metin, yumuşak yuvarlatma (~14px radius), hafif gölge. İkincil buton = çizgili/şeffaf.
- Kartlar: yumuşak köşe, çok hafif gölge, kum rengi ince kenarlık.
- Renk örnekleri (swatch): yuvarlak veya yuvarlatılmış kare, hex olmadan, temiz dizilim.
- İlerleme göstergesi: quiz için üstte ince adım çubuğu.

### SES / TON
Sıcak, kişisel, güven veren danışman. "Sen" hitabı. Abartısız.

---

## TASARLANACAK 11 EKRAN (metinler birebir)

**Ekran 1 — Splash**
Ortada "Nüans" logo-tipi (serif). Altında ince: "Sana yakışan renk, sende saklı." Sakin, bol boşluk, krem zemin. İsteğe bağlı ince altın çizgi/monogram.

**Ekran 2 — Onboarding (3 slide, tek ekran / pager)**
Alt kısımda 3 nokta göstergesi ve "Başla" butonu. Üstte büyük görsel/soyut renk kompozisyonu alanı. Üç slide içeriği:
- Slide 1 — Başlık: "Rengini keşfet" · Metin: "Bir selfie yeter. Yapay zekâ tenini okur, sana özel renk paletini çıkarır."
- Slide 2 — Başlık: "Sadece palet değil" · Metin: "Makyaj, saç, takı ve kombin renklerinde sana yakışanı öğren."
- Slide 3 — Başlık: "Bir daha yanlış renk alma" · Metin: "Paletini yanında taşı, alışverişte hep doğru rengi seç." · Buton: "Başla" · Alt link: "Zaten hesabım var"
(Üç slide'ı yan yana üç kare halinde göster.)

**Ekran 3 — Giriş**
Başlık: "Başlayalım" · Alt metin: "Sonuçların cihazında güvende kalır." · Ana buton (altın): "Apple ile devam et" (Apple logosu) · İkincil: "Misafir olarak devam et" · En altta küçük: "Devam ederek Kullanım Koşulları ve Gizlilik Politikası'nı kabul edersin."

**Ekran 4 — Quiz S1 (Stil)**
Üstte ince ilerleme çubuğu (1/2). Başlık: "Hangi stil sana daha yakın?" · Üç seçilebilir kart: "Kadın" · "Erkek" · "Farketmez". Altta pasif "Devam" butonu (seçince aktifleşir).

**Ekran 5 — Quiz S2 (Alt-ton ipucu)**
İlerleme (2/2). Başlık: "Bileğindeki damarlar hangi renge daha yakın?" · İpucu satırı: "Doğal ışıkta bakarsan daha net görürsün." · Üç seçenek kartı (küçük görsel ipuçlu): "Mavi / mor 💙" · "Yeşil 💚" · "Emin değilim". Buton: "Devam".

**Ekran 6 — Selfie rehberi**
Başlık: "İyi bir sonuç için" · Dört maddelik ikonlu liste:
"☀️ Doğal ışıkta çek (pencere önü ideal)" / "🧼 Makyajsız ol" / "💇 Saçını yüzünden geri topla" / "📸 Kameraya düz bak, gülümseme şart değil".
Ana buton (altın): "Selfie çek" · İkincil: "Galeriden seç". İyi/kötü örnek küçük görsel çifti eklenebilir.

**Ekran 7 — Analiz ediliyor**
Merkezde zarif, sakin bir animasyon hissi (dönen ince altın halka / açılan renk yelpazesi). Başlık: "Tenin okunuyor…" Altında sırayla beliren küçük satır: "Alt-tonun belirleniyor…". Minimal, premium, beklerken güven veren.

**Ekran 8 — Teaser sonuç**
Üst küçük: "Sonucun hazır!" · Büyük serif: "Sen bir Berrak Kış ❄️ çıktın". Altında BULANIK (blur'lu) renk paleti şeridi ve kilit ikonu. Alt metin: "Paletini ve tüm önerilerini görmek için kilidi aç." Ana buton (altın): "Sonucumu gör". Merak uyandıran, net blur kontrastı.

**Ekran 9 — Paywall (RevenueCat)**
Başlık: "Tüm renk dünyanı aç" · Alt başlık: "Sana özel paletin, makyaj, saç ve kombin önerilerin hazır." · Beş faydalı madde (altın tik ile):
"✓ Kişisel renk paletin — yakışanlar + kaçınılacaklar" / "✓ Makyaj, saç ve takı önerilerin" / "✓ Paletinle alışveriş" / "✓ Paylaşılabilir sonuç kartın" / "✓ Sınırsız yeniden analiz".
İki plan kartı:
- Öne çıkan (seçili, altın kenarlık): "Yıllık — ₺1.499/yıl" · rozet: "En avantajlı · 3 gün ücretsiz"
- İkincil: "Aylık — ₺249/ay"
Ana buton (altın, büyük): "Ücretsiz dene" · Altında küçük: "3 gün ücretsiz, sonra ₺1.499/yıl. İstediğin zaman iptal edebilirsin." · En altta küçük linkler: "Satın alımı geri yükle · Koşullar · Gizlilik".
(Not: fiyatlar örnek yer tutucudur; gerçekte RevenueCat lokalize gösterir.)

**Ekran 10 — Sonuç ana ekran (hero) — AÇIK + KOYU iki varyant**
Üstte büyük serif: "Sen: Berrak Kış ❄️" · Altında tek satır tanım: "Yüksek kontrast; canlı-soğuk renkler seni parlatır." · Altında tam, net renk paleti şeridi (8-10 swatch, Berrak Kış: safir, buz beyazı, siyah, fuşya, zümrüt gibi soğuk-canlı tonlar). İki buton: "Paylaş" (altın) ve "Detayları gör" (ikincil). Alt kısımda sekme başlıkları görünsün (pasif): "Alt-ton · Palet · Makyaj · Saç & Takı · Kombin". Bu ekran uygulamanın vitrinidir — en cilalı, en editoryal ekran olsun. Koyu tema varyantını da ver.

**Ekran 11 — Paylaşılabilir kart (share)**
Instagram Story oranında (9:16) dikey bir kart tasarla: üstte "Ben bir Berrak Kış ❄️", ortada şık renk paleti kompozisyonu, altta küçük "Sen hangi mevsimsin? · Nüans". Bu kart sosyal medyada paylaşılacak; markalı, estetik, imrendirici olsun. Kartın altında native paylaş sayfası başlığı: "Sonucunu paylaş" ve butonlar: "Instagram Story · Kaydet · Diğer".

---

## ÇIKTI BEKLENTİSİ
- 11 ekranın tümü, açık tema (ekran 10 ayrıca koyu tema). Yüksek sadakat, iPhone çerçeveli.
- Tüm metinler yukarıdaki Türkçe haliyle, birebir.
- Renk hex kodları ve tipografi hissi yukarıdaki kurallara sadık.
- Ekranlar tek bir tutarlı tasarım dili paylaşsın (aynı buton stili, boşluk ritmi, tipografi).
- Tutarlı bir bileşen kiti hissi ver (butonlar, kartlar, swatch'lar).

---

## Bizim kilitli kararlarımız (referans — hepsi yukarıya gömüldü)
Ad Nüans · slogan "Sana yakışan renk, sende saklı." · editöryal güzellik galerisi hissi · krem `#F7F3EE` + antrasit `#2A2622` + şampanya altını `#C9A66B` · serif başlık + sans gövde · 12-mevsim sistemi (örnek: Berrak Kış) · RevenueCat hard paywall (yıllık öne çıkan + 3 gün trial) · Türkçe-native ton · paylaşılabilir kart = büyüme motoru.
