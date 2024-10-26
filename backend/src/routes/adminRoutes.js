import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
import session from 'express-session';
import Product from '../models/Product'; // Import the Product model
import Admin from '../models/Admin'; // Import the Admin model
import cors from 'cors';


const router = express.Router();
const mongoUrl = 'mongodb://localhost:27017/vue-db'; 

router.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));


router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


const connectDB = async () => {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
};



// Route to login as admin
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    try {
        const matchAccount = await Admin.findOne({ username }); // Use Admin model
        if (!matchAccount) {
            return res.status(404).send('Invalid username or password.');
        }
       
        const validatePassword = await bcrypt.compare(password, matchAccount.password);
        if (!validatePassword) {
            return res.status(404).send('Invalid username or password.');
        }

        req.session.admin = {
            id: matchAccount._id
        };
        console.log(`ADMIN ${req.session.admin.id}`);

        res.status(200).send('Now logged in as administrator.');

    } catch (error) {
        res.status(500).send(`Error encountered in logging administrator. ${error}`);
    }
});

// Route to logout as admin
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) 
        {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Route to verify admin login status
router.get('/admin-login-status', (req, res) => {
    if (req.session.admin) 
    {
        res.status(200).json({ isAdminLoggedIn: true });
    } 
    else 
    {
        res.status(200).json({ isAdminLoggedIn: false });
    }
});

// Route to get all products
router.get('/all-products', async (req, res) => {
    try 
    {
        const products = await Product.find({});
        res.status(200).json(products);
    } 
    catch (error) 
    {
        res.status(500).json({ message: `Error fetching products: ${error.message}` });
    }
});

// Route to get a product by ID
router.get('/products/:productId', async (req, res) => {
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
            res.status(404).json('Product not found.');
        }
    } 
    catch (error) 
    {
        res.status(500).json({ message: `Error fetching product: ${error.message}` });
    }
});

// Route to delete a product
router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try 
    {
        const result = await Product.deleteOne({ id: productId });
        if (result.deletedCount === 1) 
        {
            res.status(200).json({ message: 'Product deleted successfully.' });
        } 
        else 
        {
            res.status(404).json({ message: 'Product not found.' });
        }
    } 
    catch (error) 
    {
        res.status(500).json({ message: `Error deleting product: ${error.message}` });
    }
});

// Route to update a product
router.patch('/products/:id', async (req, res) => {
    const productId = req.params.id; 
    console.log(`Sent id: ${productId}`);
    const updateFields = req.body; 

    try 
    {
       
        if (updateFields.name) 
        {
            const existingProduct = await Product.findOne({ name: updateFields.name });
            if (existingProduct && existingProduct.id !== productId) 
            {
                return res.status(409).json('A product with this name already exists.');
            }
        }

        const existingProduct = await Product.findOne({ id: productId });
        if (!existingProduct) 
        {
            console.log(`No product found with ID: ${productId}.`);
            return res.status(404).json({ message: 'Product not found.' });
        }

        
        Object.assign(existingProduct, updateFields); 
        await existingProduct.save(); 

        res.status(200).json({ message: 'Product updated successfully.', updatedProduct: existingProduct });
    } 
    catch (error) 
    {
        console.error(`Error updating product: ${error.message}`);
        res.status(500).json({ message: `Error updating product: ${error.message}` });
    }
});

//route to retrieve logged in admin info for status verification
router.get('/admin-info', (req, res) => {
    if (req.session.admin) 
    {
        res.status(200).json({ adminId: req.session.admin.id });
    } 
    else 
    {
        res.status(401).json({ message: 'Not authenticated' });
    }
});


connectDB().then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

export default router;
