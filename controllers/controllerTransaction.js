const db = require('../services/databaseService');
const { broadcast } = require('../services/socketweb');
const { sendToExternalAPI } = require('../services/apiExternal');

db.on('notification', async (msg) => {
    console.log("📩 Notifikasi dari PostgreSQL diterima:", msg.payload);

    const transactionData = JSON.parse(msg.payload);
    const lastName = transactionData.last_name;
    const createTime = transactionData.create_time;

    if (lastName && createTime) {
        broadcast(transactionData);
        await sendToExternalAPI(lastName, createTime);
    } else {
        console.warn("⚠ Data tidak valid: last_name atau create_time kosong.");
    }
});