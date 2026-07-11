# Claude Design — Batch 4: Ana Kullanım (Android / Play Store)

> 5 adımlık planın 4. adımı. Batch 1-3 tamamlandı.
> Bu batch: analiz sonrası kalıcı uygulama — 4 üst düzey hedef.
> Paletim (ana ekran) · Paletinle alışveriş · Geçmiş · Ayarlar & abonelik.
> **Bu batch'te uygulama-seviyesi Material bottom navigation bar İLK KEZ devreye girer.**
> (Sonuç bölümlerinin üst sekmeleri ayrı bir şeydi; bu, uygulamanın ana menüsüdür.)
> Örnek mevsim: **Berrak Kış ❄️**. Dolu örnek içerik, AI'nın kullanıcıya göre ürettiğinin yerine geçer.

---

## ⬇️ AŞAĞIDAKİ METNİ CLAUDE DESIGN'A OLDUĞU GİBİ VER

---

Sen üst düzey bir **Android** ürün tasarımcısısın. **Yalnızca Google Play Store'da** yayınlanacak "Nüans" kişisel renk analizi uygulamasının **ana kullanım akışındaki 4 yüksek-çözünürlüklü ekranını** tasarla. **Material Design 3** konvansiyonlarına uy. Bu ekranlar, analiz sonrası kullanıcının uygulamada kaldığı kalıcı bölümlerdir. Daha önceki batch'lerle aynı görsel dili, buton stilini, tipografi ve boşluk ritmini birebir sürdür. Metinler Türkçedir ve birebir kullanılacaktır.

### ÜRÜN (hatırlatma)
Nüans: kullanıcı selfie çeker, AI ten alt-tonunu okuyup 12-mevsim sistemine yerleştirir ve yakışan giysi/makyaj/saç/takı renklerini verir. Kitle: 16-40 yaş, stil/güzellikle ilgilenen kadınlar, Türkiye öncelikli. Premium, güven veren his.

### PLATFORM & FORMAT (Android)
- Android telefon, dikey. Modern çerçeve (punch-hole), üstte Android durum çubuğu, altta jest tutamağı. iOS öğesi KULLANMA.
- Material 3 yüzeyleri: elevation/gölge, ripple, Material köşeler. Gerçekçi Android çerçevesi, yüksek çözünürlük. **Açık tema.**

### 🔑 UYGULAMA-SEVİYESİ NAVİGASYON (bu batch'in ana yeniliği)
4 ekranın hepsinin altında **Material 3 bottom navigation bar (NavigationBar)** bulunur — 4 hedef, her biri ikon + etiket:
- **Paletim** (palet/ev ikonu)
- **Alışveriş** (alışveriş çantası ikonu)
- **Geçmiş** (saat/geçmiş ikonu)
- **Ayarlar** (dişli ikonu)
O ekranın hedefi AKTİF: Material 3 aktif gösterge hapı (pill) şampanya altını `#C9A66B` tonunda, aktif ikon+etiket vurgulu; diğerleri nötr taş rengi. Bu alt çubuk, sonuç ekranlarındaki üst sekmelerden FARKLIDIR ve sadece bu üst düzey hedefler için kullanılır.

### MARKA HİSSİ — "Editöryal Güzellik Galerisi"
Arayüz renklerle YARIŞMAZ; nötr, sofistike zemin — renkler öne çıkar. Bol boşluk, ince çizgiler, yumuşak gölge, premium doku. KAÇIN: cıvıl gradyan, çocuksu renk, kalabalık arayüz, ucuz "AI app" görünümü.

### RENK PALETİ (harfiyen)
- Zemin: sıcak krem `#F7F3EE` · Kart/yüzey: `#FFFFFF` / `#FBF8F4`
- Ana metin: antrasit-kahve `#2A2622` · İkincil metin: taş `#8A8178`
- **Vurgu (primary): şampanya altını `#C9A66B`** · altın üstü metin: `#2A2622`
- İkincil vurgu (az): tozlu gül `#C98A86` · Ayraç: kum `#E8E1D8`
- **Berrak Kış swatch'ları:** safir, buz beyazı, siyah, fuşya, zümrüt, buz pembesi, kraliyet moru (soğuk-canlı).

### TİPOGRAFİ
- Başlık: zarif serif (Playfair Display / Fraunces hissi). · Gövde & arayüz: temiz sans (Inter / Roboto hissi).

### BİLEŞEN STİLİ
- Kartlar: Material elevated/filled, yumuşak köşe, hafif gölge. · Buton: filled (altın) / outlined (kum kenarlık).
- Liste satırları: Material list item, ikon + metin + sağda chevron/toggle.
- Filtre chip'leri: Material filter chip; seçili = altın.
- Swatch: yuvarlak/yuvarlatılmış kare, hex yok.

### TON
Sıcak, kişisel, danışman, "sen" hitabı, abartısız.

---

## TASARLANACAK 4 EKRAN (metinler birebir; örnek içerik Berrak Kış)

**Ekran 1 — Paletim (ana ekran / dashboard)** — bottom nav: *Paletim* aktif
- Üstte selamlama (serif): "Merhaba 👋" · altında: "Senin mevsimin: Berrak Kış ❄️" · yanında/altında küçük palet önizleme şeridi (5-6 swatch).
- Büyük öne çıkan kart: "Renk sonucun" — küçük palet + buton/ok "Sonucuma dön" (sonuç ekranını açar).
- Hızlı erişim kutucukları (grid, ikonlu): "Makyajım" · "Saç & Takı" · "Kombin" · "Yeniden analiz" (ilk üçü sonucun ilgili bölümüne atlar).
- Alt promosyon kartı: "Paletine uygun parçalar" + küçük "Alışverişe git" oku.
- En altta bottom navigation bar (Paletim aktif, altın).

**Ekran 2 — Paletinle alışveriş** — bottom nav: *Alışveriş* aktif
- Başlık (serif): "Paletine uygun parçalar" · alt satır: "Renklerine göre seçtik."
- Üstte yatay filtre chip'leri: "Üst" · "Alt" · "Elbise" · "Aksesuar".
- Ürün kartları grid'i (2 sütun): her kartta ürün görseli (yer tutucu), ürün adı, fiyat (₺), köşesinde paletle eşleşen küçük renk noktası ve küçük "Trendyol'da gör" bağlantısı. (Örnek: safir bir bluz, fuşya elbise, siyah blazer gibi Berrak Kış renklerinde parçalar.)
- Alt bilgi notu (küçük, gri): "Bağlantılar Trendyol, Zara gibi sitelere gider. Nüans satış yapmaz."
- En altta bottom navigation bar (Alışveriş aktif).

**Ekran 3 — Geçmiş** — bottom nav: *Geçmiş* aktif
- Başlık (serif): "Analizlerin".
- Geçmiş analiz kartları listesi: her kart mevsim + tarih + mini palet. Örnek: "Berrak Kış ❄️ · 10 Temmuz 2026" (mini palet şeridiyle). 1-2 kart göster.
- Belirgin ana buton (altın) veya FAB: "Yeni analiz".
- En altta bottom navigation bar (Geçmiş aktif).

**Ekran 4 — Ayarlar & Abonelik** — bottom nav: *Ayarlar* aktif
- Başlık (serif): "Ayarlar".
- Üstte abonelik durum kartı: "Aktif — Yıllık" · alt satır: "10 Temmuz 2027'de yenilenir" · sağda "Yönet" butonu (outlined). Kartta ince altın vurgu, premium his.
- Altında Material liste satırları (ikon + metin + sağda chevron/kontrol):
  - "Aboneliğim"
  - "Dil" (sağda "Türkçe")
  - "Bildirimler" (sağda Material switch, açık)
  - "Gizlilik Politikası"
  - "Kullanım Koşulları"
  - "Destek"
  - "Çıkış yap" (hafif kırmızımsı/uyarı tonu)
- En altta bottom navigation bar (Ayarlar aktif).

---

## ÇIKTI BEKLENTİSİ
- 4 ekran, açık tema, Android çerçeveli, yüksek sadakat.
- 4 ekranın hepsinde altta Material 3 bottom navigation bar (4 hedef, doğru olan aktif + altın).
- Tüm metinler yukarıdaki Türkçe haliyle birebir.
- Batch 1-3 ile AYNI tasarım dili: buton stili, tipografi, boşluk ritmi, renk tokenları, Material 3.
- Alışveriş ürünleri ve palet önizlemeleri Berrak Kış soğuk-canlı tonlarını yansıtsın.

---

## Bizim kilitli kararlarımız (referans)
Yalnızca Android/Play · Material 3 · Nüans · editöryal güzellik galerisi · krem `#F7F3EE` + antrasit `#2A2622` + şampanya altını `#C9A66B` · serif başlık + sans gövde · 12-mevsim (örnek Berrak Kış ❄️) · **uygulama alt navigasyonu = Paletim/Alışveriş/Geçmiş/Ayarlar (sonuç üst sekmelerinden ayrı)** · Türkçe-native danışman tonu · Trendyol/yerel alışveriş entegrasyonu farkımız · RevenueCat + Google Play Billing abonelik.
