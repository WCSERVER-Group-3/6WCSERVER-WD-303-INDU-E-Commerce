<template>
  <div class="admin-dashboard">
    <h2 id="header">Products List</h2>

   

    <div v-for="product in products" :key="product._id" class="product-container">
      <img class="product-image" :src="product.imageUrl" alt="Product Image" />
      
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>₱ {{ product.price }}</p>
      </div>

    
      <button 
        class="update-button"
        @click="redirectToUpdate(product.id)">
        Update Product
      </button>


      <button 
        class="remove-button"
        @click="confirmDelete(product.id)">
        Delete Product
      </button>
    </div>

    <!-- Confirmation Modal for deleting product -->
    <ConfirmationModal 
      :visible="isModalVisible" 
      :title="'Confirm Deletion'" 
      :message="'Are you sure you want to delete this product?'" 
      :confirmButtonText="'Delete'"
      :cancelButtonText="'Cancel'"
      @confirm="handleDeleteConfirmed" 
      @cancel="cancelDelete" 
    />
  </div>
</template>

<script>
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal.vue';

export default {
  name: 'AdminDashboard',
  components: {
    ConfirmationModal
  },
  data() {
    return {
      products: [], 
      isModalVisible: false, 
      productIdToDelete: null, 
      adminId: null 
    };
  },
  mounted() {
    this.fetchProducts(); 
    this.fetchAdminId(); 
  },
  methods: {
    async fetchAdminId() {
      try {
        const response = await axios.get('/admin/admin-info'); 
        this.adminId = response.data.adminId; 
        console.log(`Logged in admin ID: ${this.adminId}`); 
      } catch (error) {
        console.error('Error fetching admin info:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('/admin/all-products'); 
        this.products = response.data; 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    confirmDelete(productId) {
      this.productIdToDelete = productId; 
      this.isModalVisible = true; 
    },
    cancelDelete() {
      this.isModalVisible = false; 
      this.productIdToDelete = null; 
    },
    async handleDeleteConfirmed() {
      try {
        await axios.delete(`/admin/products/${this.productIdToDelete}`);
        
        this.products = this.products.filter(product => product.id !== this.productIdToDelete);

        this.isModalVisible = false;
        this.productIdToDelete = null;
      } catch (error) {
        console.error('Error deleting product:', error);
        this.isModalVisible = false; 
      }
    },
    redirectToUpdate(productId) {
      console.log(`redirect: id ${productId}`);
      this.$router.push({ path: `/update-product/${productId}` });
    }
  }
};
</script>

<style scoped>
#header
{
  text-align: center;
  margin-bottom: 2em;
}

.admin-dashboard {
  padding: 20px;
}

.product-container {
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

.update-button {
  flex: 1;
  margin: auto;
  background-color: green;
  color: white;
  border: none;
  padding: 10px;
  margin-right: 1em;
  cursor: pointer;
}

.remove-button {
  flex: 1;
  margin: auto;
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
