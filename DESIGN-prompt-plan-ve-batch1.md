# Claude Design — Batch Planı + Batch 1 Prompt (Android / Play Store)

> **Platform: yalnızca Android / Google Play.** Tüm tasarım Material Design (Material 3)
> konvansiyonlarına uyar. iOS yok. Proje 5 adıma bölünmüştür; her adımın prompt'u
> tamamen kendi kendine yeter (marka kuralları + ekran metinleri gömülü).

---

## 📋 5 ADIMLIK BATCH PLANI (toplam 21 ekran + durumlar)

| Adım | İçerik | Ekranlar |
|---|---|---|
| **Batch 1 — Giriş & Onboarding** *(bu belge)* | Kullanıcıyı analize kadar getiren huni | Splash · Onboarding (3-slide) · Giriş · Quiz S1 · Quiz S2 · Selfie rehberi · Selfie çekim · Analiz ediliyor **(8 ekran)** |
| **Batch 2 — Dönüşüm & İlk Sonuç** | Aha anı + para + paylaşım | Teaser sonuç · Paywall · Sonuç hero (açık+koyu) · Paylaşım kartı **(4 ekran)** |
| **Batch 3 — Sonuç Detayları** | 9 analiz alanının detay ekranları | Alt-ton & kontrast · Kişisel palet · Makyaj tonları · Saç & takı · Kombin & yüz şekli **(5 ekran)** |
| **Batch 4 — Ana Kullanım** | Analiz sonrası kalıcı uygulama | Ana ekran/Paletim · Paletinle alışveriş · Geçmiş/yeniden analiz · Ayarlar & abonelik **(4 ekran)** |
| **Batch 5 — Durumlar & Bileşen Kiti** | Tutarlılık katmanı | Hata/boş/offline/iskelet durumları + Material bileşen kiti (buton, kart, alt-nav, chip, swatch) |

Her batch bittiğinde çıkan görsel dile göre bir sonraki batch prompt'u ayarlanır.

---

## ⬇️ BATCH 1 — AŞAĞIDAKİ METNİ CLAUDE DESIGN'A OLDUĞU GİBİ VER

---

Sen üst düzey bir **Android** ürün tasarımcısısın. **Yalnızca Google Play Store'da** yayınlanacak bir uygulamanın **giriş & onboarding akışındaki 8 yüksek-çözünürlüklü ekranını** tasarla. **Material Design 3 (Material You)** konvansiyonlarına uy. Tüm marka kuralları ve ekran metinleri bağlayıcıdır; harfiyen uygula. Metinler Türkçedir ve birebir kullanılacaktır.

### ÜRÜN
- **Ad:** Nüans
- **Ne:** Kişisel renk analizi uygulaması. Kullanıcı bir selfie çeker; yapay zekâ ten alt-tonunu okuyup onu 12-mevsim renk sistemine (İlkbahar/Yaz/Sonbahar/Kış ve alt-tipleri) yerleştirir ve ona yakışan giysi/makyaj/saç/takı renklerini verir.
- **Slogan:** "Sana yakışan renk, sende saklı."
- **Kitle:** Ağırlıkla 16-40 yaş, stil ve güzellikle ilgilenen kadınlar (ikincil: erkek). Türkiye öncelikli, global.
- **Abonelik:** RevenueCat + Google Play Billing (hard paywall). Uygulama premium ve güven veren hissetmeli.

### PLATFORM & FORMAT (Android)
- **Android telefon**, dikey. Modern Android çerçevesi (punch-hole ön kamera), üstte Android durum çubuğu (saat, pil, sinyal), altta **jest navigasyon çubuğu** (ince yatay tutamak) — iOS öğesi KULLANMA (çentik/dynamic island yok, iOS home indicator yok).
- **Material 3** yüzeyleri: uygun elevation/gölge, ripple dokunma efekti hissi, Material köşe yuvarlatmaları.
- Sistem geri davranışı Android'dir (üst app bar'da sol geri oku, çekirdek akışta gerektiğinde).
- Her ekranı gerçekçi Android telefon çerçevesinde, yüksek çözünürlükte sun.
- **Açık tema birincil.**

### MARKA HİSSİ — "Editöryal Güzellik Galerisi"
Uygulama renk *hakkında* olduğu için arayüz renklerle YARIŞMAMALI. Zemin nötr, sofistike ve sakin; renk paletleri ekranda "sanat eseri" gibi öne çıkar (galeri duvarı mantığı). Referans his: yüksek moda editoryali + Kore güzellik uygulamalarının minimalizmi. Bol beyaz alan, ince çizgiler, yumuşak gölgeler, premium doku. **KAÇIN:** cıvıl cıvıl gradyanlar, çocuksu renkler, kalabalık arayüz, ucuz "AI app" görünümü, stok illüstrasyon.

### RENK PALETİ (harfiyen kullan) — Material tema tokenları olarak
- Zemin (background/surface): sıcak krem `#F7F3EE`
- Kart/yüzey (surface-container): `#FFFFFF` ve `#FBF8F4`
- Ana metin (on-surface): derin antrasit-kahve `#2A2622`
- İkincil metin: yumuşak taş `#8A8178`
- **Vurgu (primary): şampanya altını `#C9A66B`** — ana butonlar, seçili durumlar, vurgular
- `on-primary` (altın üstü metin): koyu `#2A2622`
- İkincil vurgu (az kullan): tozlu gül `#C98A86`
- Çizgi/ayraç (outline): açık kum `#E8E1D8`

### TİPOGRAFİ
- **Başlıklar:** zarif serif (Playfair Display / Fraunces / Canela hissi). Büyük, editoryal. (Material'da özel display fontu olarak.)
- **Gövde & arayüz:** temiz sans-serif (Inter / Roboto / General Sans hissi).
- Ritim: büyük serif başlık + küçük, ferah sans gövde.

### BİLEŞEN STİLİ (Material 3 + markamız)
- Ana buton: Material **filled button**, şampanya altını zemin, koyu metin, tam-genişlik, yumuşak yuvarlatma, ripple.
- İkincil buton: **outlined/text button**, kum rengi kenarlık.
- Kartlar: Material `filled/elevated card`, yumuşak köşe, çok hafif gölge.
- Seçim kartları (quiz): seçilince altın kenarlık + hafif altın dolgu.
- İlerleme: quiz için üstte Material **linear progress** (ince adım çubuğu).
- Renk örnekleri (swatch): yuvarlak/yuvarlatılmış kare, hex yazısı olmadan, temiz dizilim.

### SES / TON
Sıcak, kişisel, güven veren danışman. "Sen" hitabı. Abartısız.

---

## TASARLANACAK 8 EKRAN (metinler birebir)

**Ekran 1 — Splash**
Ortada "Nüans" logo-tipi (serif). Altında ince: "Sana yakışan renk, sende saklı." Sakin, bol boşluk, krem zemin. İsteğe bağlı ince altın çizgi/monogram.

**Ekran 2 — Onboarding (3 slide, tek ekran / pager)**
Altta 3 nokta göstergesi + "Başla" butonu. Üstte büyük soyut renk kompozisyonu alanı. Üç slide:
- Slide 1 — Başlık: "Rengini keşfet" · Metin: "Bir selfie yeter. Yapay zekâ tenini okur, sana özel renk paletini çıkarır."
- Slide 2 — Başlık: "Sadece palet değil" · Metin: "Makyaj, saç, takı ve kombin renklerinde sana yakışanı öğren."
- Slide 3 — Başlık: "Bir daha yanlış renk alma" · Metin: "Paletini yanında taşı, alışverişte hep doğru rengi seç." · Buton: "Başla" · Alt link: "Zaten hesabım var"
(Üç slide'ı yan yana üç kare halinde göster.)

**Ekran 3 — Giriş**
Başlık: "Başlayalım" · Alt metin: "Sonuçların cihazında güvende kalır." · Ana buton (altın): "Google ile devam et" (Google logosu) · İkincil: "Misafir olarak devam et" · En altta küçük: "Devam ederek Kullanım Koşulları ve Gizlilik Politikası'nı kabul edersin."

**Ekran 4 — Quiz S1 (Stil)**
Üstte ince linear progress (1/2). Başlık: "Hangi stil sana daha yakın?" · Üç seçim kartı: "Kadın" · "Erkek" · "Farketmez". Altta pasif "Devam" butonu (seçince aktif + altın olur).

**Ekran 5 — Quiz S2 (Alt-ton ipucu)**
Progress (2/2). Başlık: "Bileğindeki damarlar hangi renge daha yakın?" · İpucu satırı: "Doğal ışıkta bakarsan daha net görürsün." · Üç seçim kartı (küçük görsel ipuçlu): "Mavi / mor 💙" · "Yeşil 💚" · "Emin değilim". Buton: "Devam".

**Ekran 6 — Selfie rehberi**
Başlık: "İyi bir sonuç için" · Dört ikonlu madde:
"☀️ Doğal ışıkta çek (pencere önü ideal)" / "🧼 Makyajsız ol" / "💇 Saçını yüzünden geri topla" / "📸 Kameraya düz bak, gülümseme şart değil".
Ana buton (altın): "Selfie çek" · İkincil: "Galeriden seç". İyi/kötü örnek küçük görsel çifti eklenebilir.

**Ekran 7 — Selfie çekim**
Android kamera arayüzü hissi: tam ekran kamera önizleme, ortada oval yüz hizalama rehberi, altta büyük deklanşör butonu ve galeri kısayolu. Üstte ince rehber: "Yüzünü çerçeveye ortala". Alt not: "Yüzün net ve iyi aydınlatılmış olsun."

**Ekran 8 — Analiz ediliyor**
Merkezde zarif, sakin animasyon hissi (dönen ince altın halka / açılan renk yelpazesi). Başlık: "Tenin okunuyor…" Altında sırayla beliren küçük satır: "Alt-tonun belirleniyor…". Minimal, premium, beklerken güven veren.

---

## ÇIKTI BEKLENTİSİ
- 8 ekranın tümü, açık tema, Android çerçeveli, yüksek sadakat.
- Tüm metinler yukarıdaki Türkçe haliyle, birebir.
- Renk hex kodları ve tipografi hissi yukarıdaki kurallara sadık; Material 3 yüzey/gölge/ripple dili.
- 8 ekran tek bir tutarlı tasarım dili paylaşsın (aynı buton stili, boşluk ritmi, tipografi).

---

## Bizim kilitli kararlarımız (referans — hepsi yukarıya gömüldü)
Yalnızca Android/Play · Material 3 · Ad Nüans · slogan "Sana yakışan renk, sende saklı." · editöryal güzellik galerisi hissi · krem `#F7F3EE` + antrasit `#2A2622` + şampanya altını `#C9A66B` · serif başlık + sans gövde · 12-mevsim sistemi · RevenueCat + Google Play Billing hard paywall · Türkçe-native ton · Google ile giriş.
