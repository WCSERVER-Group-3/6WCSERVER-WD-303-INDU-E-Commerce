<template>
    <div class="update-product-page">
      <div class="update-product-container">
        <div class="update-product-card">
          <h3 class="text-center mb-4">Update Product Details</h3>
          <form @submit.prevent="updateProduct">
            <div class="form-group mb-3">
              <label for="name">Product Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="product.name"
                required
                placeholder="Enter product name"
              />
            </div>
            <div class="form-group mb-3">
              <label for="price">Price</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model="product.price"
                required
                placeholder="Enter product price"
              />
            </div>
            <div class="form-group mb-3">
              <label for="imageUrl">Image URL</label>
              <input
                type="text"
                class="form-control"
                id="imageUrl"
                v-model="product.imageUrl"
                required
                placeholder="Enter product image URL"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Update</button>
          </form>
          <p class="text-center mt-3">
            <router-link to="/admin" class="back-link">Back to Admin Dashboard</router-link>
          </p>
          <p v-if="errorMessage" class="text-center text-danger mt-2">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        product: {
          name: '',
          price: '',
          imageUrl: '',
        },
        errorMessage: '',
      };
    },
    async created() {
      const productId = this.$route.params.id; // Get product ID from route
      try {
        console.log(productId);
        const response = await axios.get(`/admin/products/${productId}`); // Fetch product details
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
        this.errorMessage = 'Failed to load product details.';
      }
    },
    methods: {
      async updateProduct() {
        this.errorMessage = '';
        const productId = this.$route.params.id; // Get product ID from route
  
        try {
          console.log(productId);
          console.log(`this.product before deletion:`, this.product);
          delete this.product._id; // Remove _id field to prevent MongoDB error
          console.log(`this.product after deletion:`, this.product);
          
          await axios.patch(`/admin/products/${productId}`, this.product); // Send update request
          this.$router.push('/admin'); // Redirect after successful update
        } catch (error) {
          console.error('Error updating product:', error);
          this.errorMessage = error.response?.data || 'Failed to update product.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  
  .update-product-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/products-heading.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .update-product-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
  }
  
  .update-product-card {
    background: rgba(255, 255, 255, 0.85);
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  h3 {
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .form-control {
    border-radius: 50px;
    padding: 10px 15px;
    font-size: 1rem;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    transition: border-color 0.3s ease;
  }
  
  .form-control:focus {
    border-color: #667eea;
    outline: none;
  }
  
  .btn {
    background-color: #667eea;
    border: none;
    color: white;
    border-radius: 50px;
    padding: 12px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #5767da;
  }
  
  .back-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }
  
  .back-link:hover {
    color: #5767da;
  }
  
  .text-center {
    text-align: center;
  }
  
  .text-danger {
    color: red;
    margin: 1.5em;
    font-weight: 700;
  }
  </style>
  