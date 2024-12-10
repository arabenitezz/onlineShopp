const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  orderos: [{ type: String, required: true }], // Lista de pedidos
  fecha: { type: Date, default: Date.now },      // Fecha predeterminada a la actual
});

module.exports = mongoose.model('Order', orderSchema);
