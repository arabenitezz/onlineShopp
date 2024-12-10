// Importamos las librerías necesarias
const express = require('express');
const router = express.Router();
const Product = require('../models/products'); // Importamos el modelo de producto
const verifyToken = require('../middleware/verifyToken')

// Ruta principal para obtener todos los productos
router.get('/', verifyToken, async (req, res) => {
  try {
    // Obtenemos todos los productos ordenados por nombre
    const products = await Product.find().sort({ name: 1 });

    // Renderizamos la vista principal con la lista de productos
    res.render("index", {
      title: "Product Catalog",
      products: products
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: err.message });
  }
});

// Ruta para mostrar el formulario de agregar productos
router.get('/add', (req, res) => {
  res.render("add_product", { title: "Add Product" });
});

// Ruta para insertar un nuevo producto en la base de datos
router.post('/add', verifyToken, async (req, res) => {
  try {
    // Creamos un nuevo producto con los datos proporcionados
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image
    });

    // Guardamos el producto en la base de datos
    await product.save();

    console.log('Product added successfully');
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error });
  }
});

// Ruta para editar un producto existente
router.put('/edit/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  const { name, price, stock, image } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      req.session.message = 'Product not found';
      return res.status(404).json({ message: 'Product not found' });
    }

    // Actualizamos los campos del producto solo si están presentes en la solicitud
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (image !== undefined) product.image = image;

    await product.save();

    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('Error updating product:', err);
    req.session.message = 'Failed to update product';
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para eliminar un producto
router.delete('/delete/:id', verifyToken, async (req, res) => {
  const id = req.params.id;

  try {
    await Product.findByIdAndDelete(id);

    req.session.message = 'Product deleted successfully';
    return res.status(200).json({ message: req.session.message });
  } catch (error) {
    console.error('Error deleting product:', error);
    req.session.message = 'Failed to delete product';
    return res.status(500).json({ message: req.session.message });
  }
});

module.exports = router;
