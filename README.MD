# 📊 Customer Insights

Customer Insights adalah aplikasi full-stack untuk menganalisis dan memvisualisasikan data pelanggan. Proyek ini terdiri dari frontend berbasis Next.js dan backend berbasis Express.js, yang digunakan untuk menampilkan data dari file CSV dalam bentuk tabel dan grafik interaktif.

🔗 **Live Demo**: [customer-insights-client.vercel.app](https://customer-insights-client.vercel.app)

---

## 🚀 Fitur

* Visualisasi data pelanggan (grafik & tabel)
* Pencarian dan filter data
* Pagination untuk menangani data besar
* API backend terstruktur dengan error handling
* Parsing file CSV secara otomatis

---

## 🧰 Teknologi

### Frontend

* Next.js
* React
* Tailwind CSS
* TypeScript

### Backend

* Node.js
* Express.js
* TypeScript
* csv-parser

---

## 📂 Dataset

Proyek ini menggunakan file CSV sebagai sumber data utama.

### 🔗 Download Dataset

Unduh dataset dari Google Drive:
👉 [Download dataset.csv](https://drive.google.com/drive/folders/1HVo8J2_3br3HznEu4hNNramlrY6ap1ad?usp=sharing)

### 📆 Cara Menambahkan Dataset

1. Buat folder `dataset` di dalam direktori `server`:

   ```
   server/dataset/
   ```
2. Letakkan file hasil unduhan dan ubah namanya menjadi:

   ```
   server/dataset/dataset.csv
   ```

---

## ⚙️ Cara Menjalankan

### 1. Kloning Proyek

```bash
git clone https://github.com/farismasud/customer-insights.git
cd customer-insights
```

### 2. Jalankan Backend

```bash
cd server
npm install
npm run dev
```

### 3. Jalankan Frontend

```bash
cd client
npm install
npm run dev
```

Akses aplikasi di: [http://localhost:3000](http://localhost:3000)

---

## 🥪 Testing

### Via Postman

* **Endpoint**:
  `GET /api/customers?page=1&limit=1000`
* **Contoh Response**:

  ```json
  {
    "data": [...],
    "page": 1,
    "limit": 1000,
    "total": 1001000,
    "totalPages": 1001
  }
  ```

## 🙌 Kontribusi

Kontribusi sangat diterima! Fork repositori ini dan buat pull request untuk perbaikan atau penambahan fitur.

---

## 📄 Lisensi

MIT License.
