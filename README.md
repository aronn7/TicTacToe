# Tic-Tac-Toe

Game Tic-Tac-Toe modern yang responsif, dibangun dengan React, TypeScript, Vite, Zustand, dan Vitest.

## Fitur

- Halaman utama dengan judul, tombol mulai, dan pengaturan suara
- Mode **Pemain vs Pemain** dan **Pemain vs Komputer**
- Tiga tingkat kesulitan AI: Mudah (acak), Sedang (menang/blokir), Sulit (Minimax)
- Deteksi kemenangan baris, kolom, diagonal, dan hasil seri
- Sorotan pada tiga kotak pemenang
- Modal hasil permainan dengan tombol "Main Lagi" dan "Kembali ke Menu"
- Papan skor X / O / Seri dengan tombol reset
- Efek suara (`click.mp3`, `win.mp3`, `draw.mp3`) yang dapat dimatikan, dengan penanganan error jika file belum tersedia
- Responsif untuk HP, tablet, dan desktop dengan dukungan keyboard dan aria-label
- Tema gelap gradasi biru-ungu dengan glassmorphism

## Menjalankan Aplikasi

```bash
npm install
npm run dev
```

Buka alamat localhost yang ditampilkan Vite (biasanya `http://localhost:5173`) di browser.

## Skrip Lainnya

```bash
npm run build     # build produksi (tsc -b && vite build)
npm run preview   # pratinjau hasil build
npm run test      # menjalankan Vitest (gunakan `npm run test -- --run` untuk sekali jalan)
```

## Catatan Suara

File `public/sounds/click.mp3`, `win.mp3`, dan `draw.mp3` berupa placeholder kosong. Aplikasi tetap berjalan tanpa suara; jika ingin suara aktif, ganti file tersebut dengan file MP3 asli dengan nama yang sama.

## Struktur

Lihat isi folder `src/` — logika game berada di `src/game/`, state di `src/store/gameStore.ts`, dan penghubung UI di `src/hooks/useTicTacToe.ts`.
