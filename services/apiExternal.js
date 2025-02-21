const axios = require('axios');

async function sendToExternalAPI(last_name, create_time) {
    const requestBody = {
        card_no: last_name,
        kd_cluster: "JSA",
        transaction_at: create_time
    };

    try {
        const response = await axios.post('https://dev.satusummarecon.co.id/open-api/api/tapping-gate', requestBody, {
            headers: {
                'app_key': '92dd5b76-1795-4c0b-89b3-04a5e3d014cb',
                'Content-Type': 'application/json'
            }
        });
        console.log("✅ Data berhasil dikirim ke API eksternal:", response.data);
    } catch (error) {
        console.error("❌ Gagal mengirim data ke API eksternal:", error.response?.data || error.message);
    }
}

module.exports = { sendToExternalAPI };


// add retries feature 

// const axios = require('axios');

// async function sendToExternalAPI(last_name, create_time, retries = 3, delay = 5000) {
//     const requestBody = {
//         card_no: last_name,
//         kd_cluster: "JSA",
//         transaction_at: create_time
//     };

//     try {
//         const response = await axios.post('https://dev.satusummarecon.co.id/open-api/api/tapping-gate', requestBody, {
//             headers: {
//                 'app_key': '92dd5b76-1795-4c0b-89b3-04a5e3d014cb',
//                 'Content-Type': 'application/json'
//             },
//             timeout: 5000 // Timeout request dalam 5000ms
//         });

//         console.log("✅ Data berhasil dikirim ke API eksternal:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("❌ Gagal mengirim data ke API eksternal:", error.response?.data || error.message);

//         // Cek apakah error disebabkan oleh masalah jaringan atau timeout
//         if (retries > 0 && (!error.response || error.code === 'ECONNABORTED' || error.message.includes('network'))) {
//             console.log(`🔄 Mencoba kembali dalam ${delay / 1000} detik... (Sisa percobaan: ${retries})`);
//             await new Promise(resolve => setTimeout(resolve, delay));
//             return sendToExternalAPI(last_name, create_time, retries - 1, delay);
//         }

//         throw error; // Jika sudah mencapai batas retry, lempar error
//     }
// }

// module.exports = { sendToExternalAPI };

