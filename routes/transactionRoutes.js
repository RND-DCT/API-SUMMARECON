const express = require('express');
const router = express.Router();

// Contoh route yang bisa digunakan untuk pengujian
router.get('/', (req, res) => {
    res.send({ message: "API transaksi aktif!" });
});

module.exports = router;
