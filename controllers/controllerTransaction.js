const express = require('express');

const getTransactionStatus = (req, res) => {
    res.status(200).json({ message: "API transaksi aktif!" });
};

module.exports = { getTransactionStatus };
