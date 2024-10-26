
import mongoose from 'mongoose';


const validatePrice = (value) => {
    const regex = /^\d+(\.\d{2})?$/; 
    return regex.test(value);
};

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
        validate: {
            validator: validatePrice,
            message: 'Price must be a valid number ending with two decimal places.',
        },
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    averageRating: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
