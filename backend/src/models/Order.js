// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            name: { type: String, required: true },
            imageUrl: { type: String, required: true }
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
