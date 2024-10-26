<template>
    <div class="admin-dashboard-page">
      <h1>Admin Dashboard</h1>
  
      <!-- Use the AdminDashboard component to display and manage products -->
      <AdminDashboard />
    </div>
  </template>
  
  <script>
  // Import the AdminDashboard component
  import AdminDashboard from '@/components/AdminDashboard.vue';
  
  export default {
    name: 'AdminDashboardPage',
    components: {
      AdminDashboard
    }
  };
  </script>
  
  <style scoped>
  .admin-dashboard-page {
    padding: 20px;
  }

  h1 {
    text-align: center;
  }
  </style>
  