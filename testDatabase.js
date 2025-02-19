const { Client } = require('pg');
require('dotenv').config(); // Pastikan .env sudah dikonfigurasi

// Konfigurasi koneksi database
const db = new Client({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5442,
    database: process.env.DB_NAME || 'biosecurity-boot',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'ZKTeco##123'
});

// Coba koneksi ke database
async function testConnection() {
    try {
        await db.connect();
        console.log("✅ Koneksi ke PostgreSQL BERHASIL!");

        // Coba query sederhana untuk memastikan koneksi berjalan
        const res = await db.query("SELECT NOW();");
        console.log("🕒 Waktu di database:", res.rows[0].now);

        await db.end(); // Tutup koneksi setelah tes selesai
    } catch (err) {
        console.error("❌ Gagal konek ke PostgreSQL:", err.message);
    }
}

// Jalankan tes koneksi
testConnection();
