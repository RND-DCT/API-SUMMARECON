const express = require('express');
const { getTransactionStatus } = require('../controllers/controllerTransaction');
const router = express.Router();


router.get('/', getTransactionStatus);

module.exports = router;
