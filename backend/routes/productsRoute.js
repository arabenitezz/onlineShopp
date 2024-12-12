const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const verifyToken = require('../middleware/verifyToken');



// Ruta principal para obtener todos los productos
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('dashboard', { 
      title: 'Admin Dashboard', 
      products: products 
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).render('error', { message: 'Error loading products' });
  }
});


// Ruta para mostrar el formulario de agregar productos
router.get('/add', (req, res) => {
  res.render("add_product", { title: "Add Product" });
});

// Ruta para insertar un nuevo producto en la base de datos
router.post('/add', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      image: req.body.image,
    });
    await product.save();
    const products = await Product.find({});
    res.render('dashboard', { products: products, message: 'Producto agregado exitosamente' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Error al agregar producto.');
  }
});


// Ruta para editar un producto existente
// Ruta para renderizar el formulario de edición
router.get('/edit/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).render('dashboard', {
        title: 'Admin Dashboard',
        error: 'Product not found',
      });
    }

    // Renderiza el formulario de edición con los datos del producto
    res.render('edit_product', {
      title: 'Edit Product',
      product,
    });
  } catch (err) {
    console.error('Error fetching product for edit:', err);
    res.status(500).render('dashboard', {
      title: 'Admin Dashboard',
      error: 'Error fetching product',
    });
  }
});

// Ruta para procesar la edición (POST)
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const { name, price, stock, image } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).render('dashboard', {
        title: 'Admin Dashboard',
        error: 'Product not found',
      });
    }

    // Actualizamos los campos del producto
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (image) product.image = image;

    await product.save();

    const products = await Product.find({});
    res.render('dashboard', { products: products, message: 'Producto editado exitosamente' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).render('dashboard', {
      title: 'Admin Dashboard',
      error: 'Error updating product',
    });
  }
});


// Ruta para eliminar un producto
router.post('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    const products = await Product.find({});
    res.render('dashboard', { products: products, message: 'Producto editado exitosamente' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.render('dashboard', { products: products, message: 'Producto editado exitosamente' });
  }
});


module.exports = router;