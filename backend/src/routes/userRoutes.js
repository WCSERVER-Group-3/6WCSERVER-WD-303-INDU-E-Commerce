// routes/clientRoutes.js
import express from 'express';
import User from '../models/User'; 
import Product from '../models/Product'; 
import Order from '../models/Order'; 

const router = express.Router();

// Route to fetch all products
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});

// Route to fetch the user's cart
router.get('/api/users/:userId/cart', async (req, res) => {
    const { userId } = req.params;
    try 
    {
        const user = await User.findOne({ id: userId });
        if (!user) 
        {
            return res.status(404).json({ error: 'Could not find user!' });
        }

        const cartItems = user.cartItems;
        const productIds = cartItems.map(item => item.productId);
        const products = await Product.find({ id: { $in: productIds } });

        const cartWithDetails = products.map(product => {
            const cartItem = cartItems.find(item => item.productId === product.id);
            return {
                ...product.toObject(),
                quantity: cartItem.quantity
            };
        });

        res.status(200).json(cartWithDetails);
    } 
    catch (error) 
    {
        console.error('Error fetching user cart:', error);
        res.status(500).json({ error: 'An error occurred while fetching the cart.' });
    }
});

// Route to fetch a specific product
router.get('/api/products/:productId', async (req, res) => {
    const { productId } = req.params;
    try 
    {
        const product = await Product.findOne({ id: productId });
        if (product) 
        {
            res.status(200).json(product);
        } 
        else 
        {
            res.status(404).json({ error: 'Product not found.' });
        }
    } 
    catch (error) 
    {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'An error occurred while fetching the product.' });
    }
});

// Route for adding a cart item to the user's cart
router.post('/api/users/:userId/cart', async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    try 
    {
        const product = await Product.findOne({ id: productId });
        if (!product) 
        {
            return res.status(404).json({ error: 'Product not found' });
        }

        const user = await User.findOne({ id: userId });
        if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingCartItem = user.cartItems.find(item => item.productId === productId);

        if (existingCartItem) 
        {
            existingCartItem.quantity += quantity;
        } 
        else 
        {
            user.cartItems.push({
                productId,
                quantity,
                price: product.price,
                name: product.name,
                imageUrl: product.imageUrl
            });
        }

        await user.save();

        res.status(200).json(user.cartItems);
    } 
    catch (error) 
    {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding to cart' });
    }
});

// Route to delete a cart item
router.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    const { userId, productId } = req.params;

    try 
    {
        const user = await User.findOne({ id: userId });
        if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }

        user.cartItems = user.cartItems.filter(item => item.productId !== productId);
        await user.save();

        res.status(200).json(user.cartItems);
    } 
    catch (error) 
    {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: 'An error occurred while deleting cart item' });
    }
});

// Route for checkout
router.post('/api/users/:userId/checkout', async (req, res) => {
    const { userId } = req.params;

    try 
    {
        const user = await User.findOne({ id: userId });
        if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartItems = user.cartItems;
        if (cartItems.length === 0) 
        {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        const newOrder = new Order({
            userId: userId,
            items: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                imageUrl: item.imageUrl
            })),
            orderDate: new Date(),
            totalAmount
        });

        await newOrder.save();
        user.cartItems = [];
        await user.save();

        res.status(201).json({ message: 'Checkout successful', order: newOrder });
    } 
    catch (error) 
    {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'An error occurred during checkout' });
    }
});

// Route to fetch user orders
router.get('/api/users/orders/:userId', async (req, res) => {
    const { userId } = req.params;

    try 
    {
        const orders = await Order.find({ userId: userId });
        if (!orders.length) 
        {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json(orders);
    } 
    catch (error) 
    {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
});

export default router;
