// server.js
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session'; // Import session middleware
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userAuth from './routes/userAuth.js';

const app = express();


app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../assets')));


app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', userAuth);


app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
