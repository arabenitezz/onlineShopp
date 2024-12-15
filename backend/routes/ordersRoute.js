const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/orders');



// Route to show all orders
router.get('/', async (req, res) => {
    try {
        // Fetch all orders, sorted by creation date
        const orders = await Order.find({}).sort({ createdAt: -1 });
  
        // Render the orders view
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

// Route to update order status
router.post('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { status: status }, 
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send('Order not found');
        }

        res.redirect('/orders');
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send('Error updating order status');
    }
});

// Route to delete an order
router.post('/delete/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndDelete(orderId);
        res.redirect('/orders');
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).send('Error deleting order');
    }
});

module.exports = router;
  