const express = require('express');
const connectDB = require('./config/db');
const adminAuthRoutes = require('./routes/adminAuth');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

// Rutas
app.use('/', adminAuthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});