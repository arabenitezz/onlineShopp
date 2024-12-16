const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/orders');

// Route to show all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.render('orders_view', { 
            title: "Manage Orders", 
            orders: orders 
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).render('error', { 
            message: 'Error retrieving orders', 
            error: error 
        });
    }
});

// Route to delete an order
router.post('/delete/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send('Invalid order ID');
        }

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).send('Order not found');
        }

        res.redirect('/orders');
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).send('Error deleting order');
    }
});

module.exports = router;

  