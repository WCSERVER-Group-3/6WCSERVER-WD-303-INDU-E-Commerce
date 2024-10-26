<template>
    <div class="user-orders-page">
      <OrdersList />
    </div>
  </template>
  
  <script>
  import OrdersList from '../components/OrdersList'; 
  
  export default {
    components: {
      OrdersList,
    },
  };
  </script>
  
  <style scoped>
  .user-orders-page {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  </style>
  