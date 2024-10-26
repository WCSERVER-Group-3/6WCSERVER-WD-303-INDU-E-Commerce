<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <ProductsList 
      :products="cartItems" 
      v-on:remove-from-cart="deleteItemFromCart($event)"
      v-on:update-quantity="updateQuantity($event)" 
    />
    
    <h3 id="total-price">Total: ₱ {{ totalPrice }}</h3>

    <p v-if="checkoutClicked && isCartEmpty" id="empty-cart-message">No items in the cart.</p>
    
    <button 
      id="checkout-button" 
      @click="handleCheckoutClick"
      :disabled="isCartEmpty"
    >
      Proceed to Checkout
    </button>

    <ConfirmationModal 
      :visible="showCheckoutModal" 
      title="Confirm Checkout"
      message="Are you sure you want to proceed with this purchase?"
      confirmButtonText="Checkout"
      cancelButtonText="Cancel"
      @confirm="proceedToCheckout"
      @cancel="showCheckoutModal = false" 
    />
  </div>
</template>

<script>
import axios from 'axios';
import ProductsList from '../components/ProductsList.vue';
import ConfirmationModal from '../components/ConfirmationModal.vue'; 

export default {
  name: 'CartPage',
  components: {
    ProductsList,
    ConfirmationModal 
  },
  data() {
    return {
      cartItems: [],
      showCheckoutModal: false,
      userId: null,
      checkoutClicked: false,  // New property to track checkout button clicks
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0).toFixed(2);
    },
    isCartEmpty() {
      return this.cartItems.length === 0;
    }
  },
  methods: {
    async fetchUserId() {
      try {
        const response = await axios.get('/auth/api/users/me');
        this.userId = response.data.userId;
        console.log('Current User ID:', this.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    },
    async deleteItemFromCart(productId) {
      const result = await axios.delete(`/api/users/${this.userId}/cart/${productId}`);
      this.cartItems = result.data;
    },
    handleCheckoutClick() {
      this.checkoutClicked = true;  // Set to true when checkout button is clicked
      if (!this.isCartEmpty) {
        this.showCheckoutModal = true;
      }
    },
    async proceedToCheckout() {
      if (!this.userId) {
        this.$router.push('/login');
        return;
      }

      try {
        await axios.post(`/api/users/${this.userId}/checkout`);
        this.$router.push('/orders');
        this.cartItems = [];
      } catch (error) {
        console.error('Error during checkout:', error);
      }
      this.showCheckoutModal = false; 
    },
    updateQuantity({ id, quantity }) {
      const item = this.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    }
  },
  async created() {
    await this.fetchUserId();
    const result = await axios.get(`/api/users/${this.userId}/cart`);
    this.cartItems = result.data;
  }
};
</script>

<style scoped>
h1 {
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}
#total-price {
  padding: 16px;
  text-align: right;
}
#checkout-button {
  width: 100%;
}
#empty-cart-message {
  color: red;
}
.product-container {
  align-content: center;
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}
.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}
.details-wrap {
  padding: 0 16px;
  flex: 3;
}
.remove-button {
  flex: 1;
  margin: auto;
}
</style>
