<template>
  <div class="product-container">
    <img class="product-image" :src="product.imageUrl" alt="Product Image" />
    
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>₱ {{ product.price }}</p>
      <p>Quantity: {{ product.quantity }}</p> <!-- Display product quantity -->
    </div>
    
    <button 
      class="remove-button"
      v-on:click="$emit('remove-from-cart', product.id)">
      Remove from cart
    </button>
    
  </div>
</template>

<script>
export default {
  name: 'ProductsListItem',
  props: ['product'], // The product object now includes 'quantity'
};
</script>

<style scoped>
.product-container {
  align-content: 'center';
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

