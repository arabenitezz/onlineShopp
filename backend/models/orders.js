const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: Number, required: true }
}, { timestamps: true }); // This adds createdAt and updatedAt fields

module.exports = mongoose.model('orders', OrderSchema);