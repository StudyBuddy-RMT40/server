const { MongoClient } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";

const dataToSeed = [
  { name: "Matematika" },
  { name: "Fisika" },
  { name: "Kimia" },
  { name: "Biologi" },
  { name: "Bahasa Inggris" },
  { name: "Bahasa Indonesia" },
  { name: "Sejarah" },
  { name: "Ekonomi" },
  { name: "Bahasa Asing" },
  { name: "Ilmu Komputer" },
  { name: "Teknik" },
  { name: "Ilmu Sosial" },
  { name: "Penulisan Tesis" },
  { name: "Riset dan Analisis Data" },
  { name: "Pengembangan Perangkat Lunak" },
  { name: "Studi Kasus Bisnis" },
  { name: "Analisis Keuangan" },
  { name: "Desain Arsitektur" },
  { name: "Proyek Teknik" },
  { name: "Perencanaan Bisnis" },
  { name: "Pemasaran dan Strategi Penjualan" },
  { name: "Analisis Pasar" },
  { name: "Manajemen Proyek" },
  { name: "Pengembangan Produk" },
  { name: "Manajemen Keuangan" },
  { name: "Konsultasi Startup" },
  { name: "Kewirausahaan Sosial" },
  { name: "Pengembangan Bisnis UMKM" },
  { name: "Strategi Pemasaran UMKM" },
  { name: "Manajemen Keuangan UMKM" },
  { name: "Peningkatan Efisiensi Operasional UMKM" },
  { name: "Pelatihan Keterampilan Kerja" },
  { name: "Pendampingan Pemilik UMKM" },
  { name: "Pengembangan Aplikasi Mobile" },
  { name: "Desain Grafis" },
  { name: "Fotografi" },
  { name: "Seni dan Kreativitas" },
  { name: "Penulisan Kreatif" },
  { name: "Proyek Kesehatan Masyarakat" },
  { name: "Proyek Lingkungan" },
  { name: "Proyek Sosial dan Kemanusiaan" },
  { name: "Pengembangan Perangkat Lunak" },
  { name: "Pengembangan Aplikasi Web" },
  { name: "Keamanan Cyber" },
  { name: "Pengembangan Aplikasi Mobile" },
  { name: "Pengembangan Game" },
  { name: "Pembuatan Situs Web" },
  { name: "Desain UI/UX" },
  { name: "Desain Grafis" },
  { name: "Seni Lukis" },
  { name: "Seni Rupa" },
  { name: "Fotografi" },
  { name: "Desain Mode" },
  { name: "Seni Pertunjukan" },
  { name: "Seni Musik" },
  { name: "Penulisan Kreatif" },
  { name: "Gizi dan Diet" },
  { name: "Kebugaran dan Olahraga" },
  { name: "Kesehatan Mental" },
  { name: "Konseling" },
  { name: "Pengelolaan Stres" },
  { name: "Pengembangan Keterampilan Kepribadian" },
  { name: "Lainnya" }
];

async function seedData() {
  const db = client.db(dbName); 
  const collection = db.collection("categories");

  try {
    const result = await collection.insertMany(dataToSeed);
    console.log(`${result.insertedCount} documents inserted.`);
    await client.close();
  } catch (err) {
    console.error("Error inserting documents:", err);
  }
}

seedData();
