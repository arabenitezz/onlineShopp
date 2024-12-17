const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {type: String, default: 'en proceso'}
}, { timestamps: true }); 

module.exports = mongoose.model('orders', OrderSchema);