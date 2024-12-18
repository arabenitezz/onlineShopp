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


// Route to manually update the order status
router.get('/edit-status/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        
        // Validate the order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send('Invalid order ID');
        }
        
        // Find the order
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).send('Order not found');
        }
        
        // Render a page to edit the order status
        res.render('editar_estado', { order });
    } catch (error) {
        console.error('Error loading order status edit page:', error);
        res.status(500).send('Error loading order status edit page');
    }
});

// Route to save the updated order status
router.post('/update-status/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        
        // Validate the order ID
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send('Invalid order ID');
        }
        
        // Update the order
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { status }, 
            { new: true }
        );
        
        if (!updatedOrder) {
            return res.status(404).send('Order not found');
        }
        
        // Redirect back to the orders management page
        res.redirect('/orders');
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send('Error updating order status');
    }
});


module.exports = router;