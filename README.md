# PWEB W6 - Form Registrasi dan Manajemen Data

Proyek ini adalah aplikasi web statis untuk tugas PWEB. Fitur utamanya meliputi registrasi mahasiswa dengan validasi, pencarian kode pos Indonesia berbasis dropdown bertingkat, dan katalog produk dengan filter kategori.

Identitas
Nama: Muhammad Farhan
NRP: 5054241018
Jurusan: Rekayasa Kecerdasan Artifisial
Kelas: Pemrograman Web

Tentang Web Ini
Website ini dibuat untuk melatih konsep dasar web: form handling, pengolahan data JSON, pemuatan data async, dan manipulasi DOM menggunakan JavaScript murni. Semua proses berjalan di sisi client tanpa backend.

Isi Website

1. Modul Registrasi Mahasiswa
   File: index.html

   Fitur utama:
   - Validasi NIM wajib 10 digit.
   - Autocomplete nama mahasiswa dari data JSON.
   - Autocomplete nama dosen.
   - Tabel hasil registrasi.
   - Hapus per data dan hapus semua.

2. Modul Pencarian Kode Pos
   File: index.html

   Fitur utama:
   - Dropdown bertingkat: Provinsi -> Kota -> Kecamatan.
   - Pencarian kode pos per wilayah.
   - Hasil tampil dalam tabel.

3. Modul Katalog Produk
   File: index.html

   Fitur utama:
   - Filter berjenjang: Tipe -> Merek -> Seri.
   - Tampilkan detail produk secara dinamis.
   - Mendukung beberapa tipe produk.

4. File CSS dan JavaScript
   File: css/style.css dan js/script.js

   File ini menyimpan tampilan dan logika utama, termasuk styling form, tabel, serta validasi input.

Struktur File
Pertemuan_6/PWEB_W5_FormRegistrasi/
├── index.html
├── css/
│ └── style.css
├── js/
│ └── script.js
├── data/
│ ├── mahasiswa.json
│ ├── dosen.json
│ ├── postal.json
│ └── products.json
└── README.md

Cara Kerja Web
Alur webnya sederhana:

1. Browser memuat index.html.
2. Data JSON diambil menggunakan Fetch API.
3. Pengguna mengisi form atau melakukan filter dropdown.
4. JavaScript memvalidasi input dan memperbarui tampilan DOM.

Detail Kode per File
index.html
Bagian penting:

- Tab navigasi untuk registrasi, kode pos, dan produk.
- Form input mahasiswa dan dosen.
- Dropdown bertingkat dan area hasil tabel.

css/style.css
Bagian penting:

- Layout, tipografi, dan responsif.
- Styling form, tabel, dan autocomplete.

js/script.js
Bagian penting:

- Load data JSON dengan Fetch API.
- Validasi input NIM.
- Logika autocomplete dan filter dropdown.
- Render data ke tabel dan kartu produk.

data/\*.json
Berisi data untuk autocomplete, kode pos, dan katalog produk.

Format Data
mahasiswa.json

```json
["Ahmad Fauzi", "Ahmad Rizki", "Aini Rahmawati"]
```

dosen.json

```json
["Dr. Budi Santoso", "Prof. Siti Nurhaliza", "Ir. Joko Susilo"]
```

postal.json

```json
{
  "Jawa Barat": {
    "Bandung": {
      "Bandung Tengah": [{ "kelurahan": "Cipaganti", "kodepos": "40131" }]
    }
  }
}
```

products.json

```json
{
  "laptop": {
    "merek": {
      "asus": {
        "label": "ASUS",
        "seri": {
          "ROG Zephyrus": {
            "products": [
              {
                "name": "ROG Zephyrus G14 2024",
                "price": "Rp 22.999.000",
                "icon": "",
                "spec": "..."
              }
            ]
          }
        }
      }
    }
  }
}
```

Teknologi yang Dipakai
HTML5 untuk struktur halaman.
CSS3 untuk styling.
JavaScript (Vanilla JS) untuk logika interaksi.
JSON untuk data.

Cara Menjalankan

1. Buka folder proyek PWEB_W5_FormRegistrasi.
2. Jalankan dengan server lokal agar fetch JSON tidak kena CORS.
3. Akses index.html melalui browser.
4. Akses Link Public : https://kuliahfarhan.github.io/PWEB_W5_FormRegistrasi/

Contoh server lokal:

```bash
python -m http.server 8000
```

Catatan
Karena proyek ini bersifat statis, tidak ada autentikasi server maupun database. Semua fitur bersifat simulasi untuk kebutuhan latihan.
