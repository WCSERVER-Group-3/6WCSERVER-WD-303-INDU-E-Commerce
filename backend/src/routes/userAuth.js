import express from 'express';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import mongoose from 'mongoose';
import User from '../models/User'; 

const router = express.Router();
const mongoUrl = 'mongodb://localhost:27017/vue-db';


mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } 
}));

// Helper function to generate auto-incrementing 3-digit IDs
const generateId = async () => {
    // Fetch the highest existing ID and increment it
    const lastUser = await User.findOne({}, { id: 1 }).sort({ id: -1 });
    const newId = lastUser ? parseInt(lastUser.id) + 1 : 100; 
    return newId.toString().padStart(3, '0'); 
};

// Route to signup a new user
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).send('Username or email already exists.');
        }

       
        const userId = await generateId();

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            id: userId,
            username,
            email,
            password: hashedPassword,
            cartItems: []
        });

        await newUser.save();
        res.status(201).send('Account created successfully.');
    } catch (error) {
        res.status(500).send(`Error encountered during signup. ${error}`);
    }
});

// Route to login as user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('Invalid username or password.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).send('Invalid username or password.');
        }

        req.session.user = {
            id: user.id, 
            username: user.username
        };
        console.log('User session created:', req.session.user); 

        res.status(200).send('Successful login.');
    } 
    catch (error) 
    {
        res.status(500).send(`Error encountered in logging in. ${error}`);
    }
});

// Route to log out the user
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Route to verify login status
router.get('/user-login-status', (req, res) => {
    console.log('Checking login status:', req.session.user); 
    if (req.session.user) {
        res.status(200).json({ isLoggedIn: true });
    } else {
        res.status(200).json({ isLoggedIn: false });
    }
});

// Route to get the currently logged-in user's ID
router.get('/api/users/me', (req, res) => {
    if (req.session.user) {
        console.log('Current user ID:', req.session.user.id); 
        res.status(200).json({ userId: req.session.user.id }); 
    } else {
        res.status(200).json({ error: 'User not logged in' }); 
    }
});

export default router;
