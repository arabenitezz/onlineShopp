const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('orders', OrderSchema);