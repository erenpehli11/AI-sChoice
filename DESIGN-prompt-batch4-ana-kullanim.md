# Claude Design — Batch 4: Ana Kullanım (Android / Play Store) — REVİZE

> 5 adımlık planın 4. adımı. Batch 1-3 tamamlandı.
> Bu batch: analiz sonrası kalıcı uygulama — 3 üst düzey hedef.
> Paletim (ana ekran) · Geçmiş · Ayarlar & abonelik.
> **Alışveriş/Trendyol link ekranı kapsamdan çıkarıldı** → alt navigasyon 3 sekme.
> **Uygulama-seviyesi Material bottom navigation bar burada devreye girer** (sonuç üst sekmelerinden ayrı).
> Örnek mevsim: **Berrak Kış ❄️**. Dolu örnek içerik, AI'nın kullanıcıya göre ürettiğinin yerine geçer.

---

## ⬇️ AŞAĞIDAKİ METNİ CLAUDE DESIGN'A OLDUĞU GİBİ VER

---

Sen üst düzey bir **Android** ürün tasarımcısısın. **Yalnızca Google Play Store'da** yayınlanacak "Nüans" kişisel renk analizi uygulamasının **ana kullanım akışındaki 3 yüksek-çözünürlüklü ekranını** tasarla. **Material Design 3** konvansiyonlarına uy. Bu ekranlar, analiz sonrası kullanıcının uygulamada kaldığı kalıcı bölümlerdir. Daha önceki batch'lerle aynı görsel dili, buton stilini, tipografi ve boşluk ritmini birebir sürdür. Metinler Türkçedir ve birebir kullanılacaktır.

### ÜRÜN (hatırlatma)
Nüans: kullanıcı selfie çeker, AI ten alt-tonunu okuyup 12-mevsim sistemine yerleştirir ve yakışan giysi/makyaj/saç/takı renklerini verir. Kitle: 16-40 yaş, stil/güzellikle ilgilenen kadınlar, Türkiye öncelikli. Premium, güven veren his.

### PLATFORM & FORMAT (Android)
- Android telefon, dikey. Modern çerçeve (punch-hole), üstte Android durum çubuğu, altta jest tutamağı. iOS öğesi KULLANMA.
- Material 3 yüzeyleri: elevation/gölge, ripple, Material köşeler. Gerçekçi Android çerçevesi, yüksek çözünürlük. **Açık tema.**

### 🔑 UYGULAMA-SEVİYESİ NAVİGASYON
3 ekranın hepsinin altında **Material 3 bottom navigation bar (NavigationBar)** bulunur — **3 hedef**, her biri ikon + etiket:
- **Paletim** (palet/ev ikonu)
- **Geçmiş** (saat/geçmiş ikonu)
- **Ayarlar** (dişli ikonu)
O ekranın hedefi AKTİF: Material 3 aktif gösterge hapı (pill) şampanya altını `#C9A66B`, aktif ikon+etiket vurgulu; diğerleri nötr taş rengi. Bu alt çubuk, sonuç ekranlarındaki üst sekmelerden FARKLIDIR ve sadece bu üst düzey hedefler için kullanılır. (Alışveriş sekmesi YOK.)

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
- Swatch: yuvarlak/yuvarlatılmış kare, hex yok.

### TON
Sıcak, kişisel, danışman, "sen" hitabı, abartısız.

### GÖRSEL ZENGİNLİK (önemli — ekranlar boş durmasın)
Sırf metin + swatch bırakma. Şu editöryal öğelerle sıcaklık kat: ana ekranda üstte küçük, zarif bir mevsim-mood görseli/illüstrasyon alanı (Berrak Kış: soğuk, buzlu, kışlık his — soyut kumaş/drape ya da editoryal kadın portresi); kartlarda ince altın çizgi/monogram detayları; hızlı erişim kutucuklarında özel çizgi ikonlar. Görseller markanın nötr-editoryal hissiyle uyumlu, premium ve zarif olsun. (Ayrı bir "Assets" batch'inde bu ikon+görsel kiti detaylandırılacak; burada yer tutucu olarak zarif göster.)

---

## TASARLANACAK 3 EKRAN (metinler birebir; örnek içerik Berrak Kış)

**Ekran 1 — Paletim (ana ekran / dashboard)** — bottom nav: *Paletim* aktif
- Üstte selamlama (serif): "Merhaba 👋" · altında: "Senin mevsimin: Berrak Kış ❄️" · yanında/altında küçük palet önizleme şeridi (5-6 swatch).
- Üstte zarif bir mevsim-mood görseli/illüstrasyon şeridi (Berrak Kış hissi).
- Büyük öne çıkan kart: "Renk sonucun" — küçük palet + buton/ok "Sonucuma dön" (sonuç ekranını açar).
- Hızlı erişim kutucukları (grid, özel ikonlu): "Makyajım" · "Saç & Takı" · "Kombin" · "Yeniden analiz" (ilk üçü sonucun ilgili bölümüne atlar).
- En altta bottom navigation bar (Paletim aktif, altın). (Alışveriş promosyon kartı YOK.)

**Ekran 2 — Geçmiş** — bottom nav: *Geçmiş* aktif
- Başlık (serif): "Analizlerin".
- Geçmiş analiz kartları listesi: her kart mevsim + tarih + mini palet. Örnek: "Berrak Kış ❄️ · 10 Temmuz 2026" ve "Berrak Kış ❄️ · 18 Nisan 2026" (mini palet şeritleriyle).
- Belirgin ana buton veya FAB (altın): "Yeni analiz".
- En altta bottom navigation bar (Geçmiş aktif).

**Ekran 3 — Ayarlar & Abonelik** — bottom nav: *Ayarlar* aktif
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
- 3 ekran, açık tema, Android çerçeveli, yüksek sadakat.
- 3 ekranın hepsinde altta Material 3 bottom navigation bar (3 hedef: Paletim/Geçmiş/Ayarlar, doğru olan aktif + altın).
- Tüm metinler yukarıdaki Türkçe haliyle birebir. Alışveriş/Trendyol içeriği YOK.
- Batch 1-3 ile AYNI tasarım dili: buton stili, tipografi, boşluk ritmi, renk tokenları, Material 3.
- Ekranlar boş durmasın: mevsim-mood görseli, ince altın detaylar, özel ikonlarla sıcaklık kat.

---

## Bizim kilitli kararlarımız (referans)
Yalnızca Android/Play · Material 3 · Nüans · editöryal güzellik galerisi · krem `#F7F3EE` + antrasit `#2A2622` + şampanya altını `#C9A66B` · serif başlık + sans gövde · 12-mevsim (örnek Berrak Kış ❄️) · **uygulama alt navigasyonu = Paletim/Geçmiş/Ayarlar (3 sekme, alışveriş yok)** · Türkçe-native danışman tonu · RevenueCat + Google Play Billing abonelik.
