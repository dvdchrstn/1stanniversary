# 🎉 Happy 1st Anniversary - Interactive Storytelling Website

Website anniversary interaktif yang elegan dengan konsep **interactive storytelling**, dibangun menggunakan HTML5, CSS3, dan Vanilla JavaScript dengan teknologi premium: **GSAP**, **Swiper.js**, dan **Web Audio API**.

---

## ✨ Fitur Utama

### 🎭 **Interactive Storytelling Experience**
- **Chapter-based Navigation**: Perjalanan cerita yang terbagi dalam 6 chapter (Opening, Timeline, Gallery, Letter, Future, Ending)
- **Cinematic Transitions**: Transisi halus antar chapter dengan GSAP ScrollTrigger
- **Progress Tracking**: Floating widget yang menampilkan progress chapter

### 🎨 **Visual Premium**
- **Polaroid Gallery**: Foto-foto tersusun seperti scrapbook fisik dengan rotasi acak
- **3D Love Letter**: Amplop yang bisa dibuka dengan animasi 3D realistis
- **Dynamic Weather Effects**: Partikel canvas (hearts, petals, stars, bokeh, confetti) yang berubah setiap chapter
- **Glassmorphism Design**: Kartu transparan dengan blur effect yang elegan
- **Cursor Trail & Glow**: Efek visual yang mengikuti gerakan mouse (desktop)

### 🎵 **Audio System**
- **Background Music**: Musik latar dengan kontrol Web Audio API
- **Audio Ducking**: Volume musik otomatis mengecil saat membaca surat
- **Sound Effects**: SFX untuk interaksi (klik, buka amplop, foto)
- **Floating Music Widget**: Kontrol musik yang selalu terlihat

### 🎁 **Easter Eggs**
- Ketik "LOVE" untuk membuka pesan rahasia
- Tahan tombol "Yes, Always" selama 3 detik untuk efek warna
- Double tap foto di galeri (mobile)

### 📱 **Fully Responsive**
- Optimized untuk Desktop, Tablet, dan Mobile
- Swiper carousel untuk mobile
- Touch gesture support

---

## 🚀 Cara Menggunakan

### 1. **Setup Awal**
Buka folder proyek:
```
D:\senggprojek\Anniversarry\
```

### 2. **Kustomisasi Konten**
Edit file `js/config.js` untuk mengubah:

#### **Tanggal Penting**
```javascript
dates: {
  startDate: '2025-07-10T00:00:00',  // Tanggal jadian
  nextAnniversary: '2026-07-10T00:00:00'  // Anniversary berikutnya
}
```

#### **Teks & Judul**
```javascript
texts: {
  openingTitle: 'Happy 1st Anniversary ❤️',
  heroTitle: 'One Whole Year With You',
  // ... dan lainnya
}
```

#### **Timeline (Momen Penting)**
```javascript
timeline: [
  { 
    date: '2025-07-10', 
    title: 'First Hello', 
    description: 'The day our story quietly began.',
    image: 'assets/images/timeline-1.jpg' 
  },
  // Tambahkan momen lainnya
]
```

#### **Galeri Foto**
```javascript
gallery: [
  { 
    src: 'assets/images/gallery-1.jpg', 
    caption: 'A smile I will always remember.', 
    date: '2025-07-18' 
  },
  // Tambahkan foto lainnya
]
```

#### **Surat Cinta**
```javascript
loveLetter: {
  title: 'A Letter For You',
  body: 'My love,\n\nThis year with you has been...'
}
```

#### **Reasons I Love You**
```javascript
reasons: [
  'You make me smile without trying.',
  'You are gentle even when the world feels heavy.',
  // Minimal 20 alasan
]
```

#### **Our Future**
```javascript
future: [
  'Travel together to places we have never seen.',
  'Build a home filled with peace and laughter.',
  // Tambahkan impian lainnya
]
```

#### **Musik & Sound Effects**
```javascript
music: {
  title: 'Our Song',
  artist: 'Forever Mix',
  src: 'assets/audio/our-song.mp3',
  volume: 0.7,
  sfx: {
    click: 'assets/audio/click.mp3',
    open: 'assets/audio/open.mp3',
    photo: 'assets/audio/photo.mp3'
  }
}
```

### 3. **Tambahkan Foto & Musik**
- Letakkan foto di folder `assets/images/`
- Letakkan file musik/audio di folder `assets/audio/`
- Pastikan nama file sesuai dengan yang ada di `config.js`

### 4. **Buka Website**
Buka file `index.html` di browser modern (Chrome, Firefox, Edge, Safari)

---

## 🎨 Struktur Warna (Hijau Toska + Emas)

```css
--primary: #2ec4b6        /* Hijau Toska */
--primary-deep: #0f766e   /* Toska Gelap */
--primary-soft: #dffcf8   /* Toska Muda */
--accent: #d8b46a         /* Emas */
```

---

## 📁 Struktur Folder

```
Anniversarry/
├── index.html              # File HTML utama
├── css/
│   ├── variables.css       # CSS Variables (Warna, Font, dll)
│   ├── layout.css          # Layout & Responsive
│   ├── components.css      # Widget & Komponen
│   └── cinematic.css       # Animasi & Efek
├── js/
│   ├── config.js           # ⭐ EDIT FILE INI untuk kustomisasi
│   ├── app.js              # Entry point aplikasi
│   ├── engine/
│   │   ├── audio-mixer.js  # Web Audio API controller
│   │   ├── canvas-fx.js    # Canvas weather effects
│   │   └── scroll-story.js # GSAP ScrollTrigger
│   └── components/
│       ├── gallery.js      # Polaroid gallery + modal
│       ├── letter.js       # 3D envelope animation
│       ├── easter-eggs.js  # Hidden features
│       └── data-populate.js # Dynamic content
└── assets/
    ├── images/             # Letakkan foto di sini
    └── audio/              # Letakkan musik di sini
```

---

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur semantik modern
- **CSS3** - Glassmorphism, Grid, Flexbox, Custom Properties
- **Vanilla JavaScript (ES6 Modules)** - Zero framework
- **GSAP 3.12** - Animasi 60fps premium
- **ScrollTrigger** - Scroll-based animations
- **Swiper.js 11** - Touch carousel
- **Web Audio API** - Advanced audio control
- **Canvas API** - Particle weather effects

---

## 📝 Tips Kustomisasi

### Mengganti Warna Tema
Edit file `css/variables.css`:
```css
:root {
  --primary: #FF6B9D;     /* Ganti dengan warna favoritmu */
  --accent: #FFC870;      /* Warna aksen */
}
```

### Menambah/Mengurangi Timeline
Edit array `timeline` di `js/config.js`, tambah atau hapus objek.

### Mengganti Font
Edit di `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=NamaFont&display=swap">
```

Lalu ubah di `css/variables.css`:
```css
body { font-family: 'NamaFont', sans-serif; }
```

---

## 🎯 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 💡 Troubleshooting

**Q: Musik tidak otomatis diputar?**  
A: Browser modern memblokir autoplay. Klik tombol "Play Our Song" yang muncul.

**Q: Foto tidak muncul?**  
A: Pastikan path file di `config.js` sesuai dengan nama file di folder `assets/images/`.

**Q: Animasi patah-patah?**  
A: Pastikan browser sudah update, tutup tab lain yang berat.

---

## 🎁 Dibuat dengan ❤️

Website ini dirancang sebagai hadiah digital premium untuk merayakan anniversary yang spesial. Setiap detail dirancang agar terasa personal, emosional, dan berkesan.

**Selamat Anniversary! 🎉**
