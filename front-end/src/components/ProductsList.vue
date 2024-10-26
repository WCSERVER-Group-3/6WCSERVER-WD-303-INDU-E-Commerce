<template>
    <div v-if="products.length > 0">
      <ProductsListItem
        v-for="product in products"
        v-on:remove-from-cart="$emit('remove-from-cart', product.id)"
        :key="product.id"
        :product="product"
      />  
    </div>
    <p v-else>No items found in the cart.</p>
  </template>
  
  <script>
  import ProductsListItem from './ProductsListItem.vue';
  
  export default {
    name: 'ProductsList',
    props: ['products'],
    components: {
      ProductsListItem,
    },
  };
  </script>
  