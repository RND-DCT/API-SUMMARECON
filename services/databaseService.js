const { Client } = require('pg');
require('dotenv').config();

// Koneksi ke PostgreSQL
const db = new Client({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5442,
    database: process.env.DB_NAME || 'biosecurity-boot',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'ZKTeco##123'
});

db.connect()
    .then(() => {
        console.log("✅ Koneksi ke PostgreSQL berhasil!");
        db.query("LISTEN new_transaction"); // Dengarkan event dari PostgreSQL
    })
    .catch(err => console.error("❌ Gagal konek ke PostgreSQL:", err));

module.exports = db;
