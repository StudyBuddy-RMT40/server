const { MongoClient } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";

const dataToSeed = [
  { groupBy: "highschool", name: "Matematika" },
  { groupBy: "highschool", name: "Fisika" },
  { groupBy: "highschool", name: "Kimia" },
  { groupBy: "highschool", name: "Biologi" },
  { groupBy: "highschool", name: "Bahasa Inggris" },
  { groupBy: "highschool", name: "Bahasa Indonesia" },
  { groupBy: "highschool", name: "Sejarah" },
  { groupBy: "highschool", name: "Ekonomi" },
  { groupBy: "highschool", name: "Bahasa Asing" },
  { groupBy: "highschool", name: "Ilmu Komputer" },
  { groupBy: "highschool", name: "Teknik" },
  { groupBy: "highschool", name: "Ilmu Sosial" },
  { groupBy: "university", name: "Penulisan Tesis" },
  { groupBy: "university", name: "Riset dan Analisis Data" },
  { groupBy: "university", name: "Pengembangan Perangkat Lunak" },
  { groupBy: "university", name: "Studi Kasus Bisnis" },
  { groupBy: "university", name: "Analisis Keuangan" },
  { groupBy: "university", name: "Desain Arsitektur" },
  { groupBy: "university", name: "Proyek Teknik" },
  { groupBy: "university", name: "Perencanaan Bisnis" },
  { groupBy: "university", name: "Pemasaran dan Strategi Penjualan" },
  { groupBy: "university", name: "Analisis Pasar" },
  { groupBy: "university", name: "Manajemen Proyek" },
  { groupBy: "university", name: "Pengembangan Produk" },
  { groupBy: "university", name: "Manajemen Keuangan" },
  { groupBy: "public", name: "Konsultasi Startup" },
  { groupBy: "public", name: "Kewirausahaan Sosial" },
  { groupBy: "public", name: "Pengembangan Bisnis UMKM" },
  { groupBy: "public", name: "Strategi Pemasaran UMKM" },
  { groupBy: "public", name: "Manajemen Keuangan UMKM" },
  { groupBy: "public", name: "Peningkatan Efisiensi Operasional UMKM" },
  { groupBy: "public", name: "Pelatihan Keterampilan Kerja" },
  { groupBy: "public", name: "Pendampingan Pemilik UMKM" },
  { groupBy: "public", name: "Pengembangan Aplikasi Mobile" },
  { groupBy: "public", name: "Desain Grafis" },
  { groupBy: "public", name: "Fotografi" },
  { groupBy: "public", name: "Seni dan Kreativitas" },
  { groupBy: "public", name: "Penulisan Kreatif" },
  { groupBy: "public", name: "Proyek Kesehatan Masyarakat" },
  { groupBy: "public", name: "Proyek Lingkungan" },
  { groupBy: "public", name: "Proyek Sosial dan Kemanusiaan" },
  { groupBy: "public", name: "Pengembangan Perangkat Lunak" },
  { groupBy: "public", name: "Pengembangan Aplikasi Web" },
  { groupBy: "public", name: "Keamanan Cyber" },
  { groupBy: "public", name: "Pengembangan Aplikasi Mobile" },
  { groupBy: "public", name: "Pengembangan Game" },
  { groupBy: "public", name: "Pembuatan Situs Web" },
  { groupBy: "public", name: "Desain UI/UX" },
  { groupBy: "public", name: "Desain Grafis" },
  { groupBy: "public", name: "Seni Lukis" },
  { groupBy: "public", name: "Seni Rupa" },
  { groupBy: "public", name: "Fotografi" },
  { groupBy: "public", name: "Desain Mode" },
  { groupBy: "public", name: "Seni Pertunjukan" },
  { groupBy: "public", name: "Seni Musik" },
  { groupBy: "public", name: "Penulisan Kreatif" },
  { groupBy: "public", name: "Gizi dan Diet" },
  { groupBy: "public", name: "Kebugaran dan Olahraga" },
  { groupBy: "public", name: "Kesehatan Mental" },
  { groupBy: "public", name: "Konseling" },
  { groupBy: "public", name: "Pengelolaan Stres" },
  { groupBy: "public", name: "Pengembangan Keterampilan Kepribadian" },
  { groupBy: "public", name: "Lainnya" }
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
