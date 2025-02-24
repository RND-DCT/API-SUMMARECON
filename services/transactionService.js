const db = require('../config/config');
const { broadcast } = require('./webSocket');
const { sendToExternalAPI } = require('./apiExternal');

db.on('notification', async (msg) => {
    console.log("📩 Notifikasi dari PostgreSQL diterima:", msg.payload);

    try {
        const transactionData = JSON.parse(msg.payload);
        const { last_name, create_time } = transactionData;

        if (!last_name || !create_time) {
            console.warn("⚠ Data tidak valid: last_name atau create_time kosong.");
            return;
        }

        broadcast(transactionData);
        await sendToExternalAPI(last_name, create_time);
    } catch (error) {
        console.error("❌ Error dalam pemrosesan transaksi:", error.message);
    }
});

