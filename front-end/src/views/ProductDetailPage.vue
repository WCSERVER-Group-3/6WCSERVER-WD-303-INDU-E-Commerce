<template>
  <div id="page-wrap" v-if="product">
    <div class="product-container">
      <div id="img-wrap">
        <img v-bind:src="product.imageUrl" />
      </div>
      <div id="product-details">
        <h1>{{ product.name }}</h1>
        <h3 id="price">₱{{ product.price }}</h3>
        <p>Average rating {{ product.averageRating }}</p>

        <!-- Quantity input -->
        <label for="quantity">Quantity:</label>
        <input 
          type="number" 
          id="quantity" 
          v-model.number="quantity" 
          min="1" 
          @input="validateQuantity" 
        />
        
        <button 
          id="add-to-cart"
          v-on:click="addToCart"
        >Add to Cart</button>

        <h4>Description</h4>
        <p>{{ product.description }}</p>
      </div>
    </div>
    
    <!-- Modal for confirmation -->
    <transition name="modal">
      <div v-if="confirmAddToCart" class="modal-overlay" @click="closeModal">
        <div class="modal">
          <h2>Item Added to Cart!</h2>
          <p>{{ quantity }} item(s) have been successfully added to your cart.</p>
        </div>
      </div>
    </transition>
  </div>
  <NotFoundPage v-else />
</template>

<script>
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';

export default {
  name: 'ProductDetailPage',
  components: {
    NotFoundPage,
  },
  data() {
    return {
      product: {},
      quantity: 1, // Default quantity
      confirmAddToCart: false,
      userId: null, // To hold the logged-in user ID
    };
  },
  methods: {
    // Validate the quantity input
    validateQuantity() {
      if (this.quantity < 1) {
        this.quantity = 1;
      }
    },
    async addToCart() {
      // Check if userId is retrieved
      if (this.userId) {
        console.log('User ID retrieved:', this.userId);
        
        await axios.post(`/api/users/${this.userId}/cart`, {
          productId: this.$route.params.id,
          quantity: this.quantity, // Send quantity to the backend
        });
        
        this.confirmAddToCart = true;

        // Automatically close the modal after a delay
        setTimeout(() => {
          this.closeModal();
        }, 1000);
      } else {
        console.error('User ID not found. Redirecting to login.');
        this.$router.push('/login'); // Redirect to the login page
      }
    },
    closeModal() {
      this.confirmAddToCart = false;
    },
    async fetchCurrentUserId() {
      try {
        const response = await axios.get('/auth/api/users/me');
        this.userId = response.data.userId; // Set the user ID
        console.log('Current User ID:', this.userId); // Log the retrieved user ID
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    }
  },
  async created() {
    // Fetch the current user ID
    await this.fetchCurrentUserId();
    
    // Fetch product details
    const result = await axios.get(`/api/products/${this.$route.params.id}`);
    const product = result.data;
    this.product = product;
  }
};
</script>

<style scoped>
.product-container {
  padding: 2em;
}

#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
}

#img-wrap {
  text-align: center;
}

img {
  width: 400px;
}

#product-details {
  padding: 16px;
  position: relative;
}

#add-to-cart {
  width: 100%;
}

#price {
  position: absolute;
  top: 24px;
  right: 16px;
}

/* Quantity Input */
#quantity {
  display: block;
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end; 
  align-items: flex-end;    
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
  margin: 16px;
}

/* Transition Styles */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s ease;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>
