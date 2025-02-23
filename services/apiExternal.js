const axios = require('axios');

const queue = [];            // menampung request yang akan dikirim
let isProcessing = false;    // menandai apakah sedang mengirim data atau tidak

async function sendToExternalAPI(last_name, create_time, retries = Infinity, delay = 5000) {
    return new Promise((resolve, reject) => {
        queue.push({ last_name, create_time, retries, delay, resolve, reject });
        processQueue();
    });
}

async function processQueue() {
    if (isProcessing || queue.length === 0) {
        return;
    }

    isProcessing = true;
    const { last_name, create_time, retries, delay, resolve, reject } = queue.shift();

    try {
        const response = await sendRequest(last_name, create_time, retries, delay);
        resolve(response);
    } catch (error) {
        reject(error);
    } finally {
        isProcessing = false;
        processQueue(); // lanjut ke request berikutnya
    }
}

async function sendRequest(last_name, create_time, retries, delay) {
    const requestBody = {
        card_no: last_name,
        kd_cluster: "JSA",
        transaction_at: create_time
    };

    try {
        const response = await axios.post(
            'https://dev.satusummarecon.co.id/open-api/api/tapping-gate',
            requestBody,
            {
                headers: {
                    'app_key': '92dd5b76-1795-4c0b-89b3-04a5e3d014cb',
                    'Content-Type': 'application/json'
                },
                timeout: 5000
            }
        );

        console.log("✅ Data berhasil dikirim:", response.data);
        return response.data;

    } catch (error) {
        console.error("❌ Gagal mengirim data:", error.response?.data || error.message);

        if (retries > 0 && (!error.response || error.code === 'ECONNABORTED' || error.message.includes('network'))) {
            console.log(`🔄 Retry dalam ${delay / 1000} detik... (Percobaan tersisa: ${retries === Infinity ? '∞' : retries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return sendRequest(last_name, create_time, retries === Infinity ? Infinity : retries - 1, delay);
        }

        throw error;
    }
}

module.exports = { sendToExternalAPI };