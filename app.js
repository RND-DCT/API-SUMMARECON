const express = require('express');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');
const { wss } = require('./services/socketWeb');
require('./controllers/controllerTransaction');
require('./testDatabase');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});