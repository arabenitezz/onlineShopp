const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const adminAuthRoutes = require('./routes/adminAuth');
const productRoutes = require('./routes/productsRoute');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/auth', adminAuthRoutes);
app.use('/products', productRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});