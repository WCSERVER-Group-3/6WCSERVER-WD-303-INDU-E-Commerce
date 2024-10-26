<template>
  <div class="orders-container">
    <h2 class="orders-banner">Your Order History</h2>
    <div v-if="orders.length === 0" class="no-orders">No orders found.</div>
    <div v-else>
      <div v-for="order in orders" :key="order._id" class="order-item">
        <h3>Order Date: {{ new Date(order.orderDate).toLocaleDateString() }}</h3>
        <div v-for="item in order.items" :key="item.productId" class="order-details">
          <img class="order-image" :src="item.imageUrl" alt="Product Image" />
          <div class="order-details-wrap">
            <h4>{{ item.name }}</h4>
            <p>₱ {{ item.price }}</p>
            <p>Quantity: {{ item.quantity }}</p>
          </div>
        </div>
        <h4 class="total-price">Total Price: ₱ {{ order.totalAmount.toFixed(2) }}</h4>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserOrders',
  data() {
    return {
      orders: [],
      userId: null,
    };
  },
  async created() {
    await this.fetchUserId();
    await this.fetchOrders();
  },
  methods: {
    async fetchUserId() {
      try {
        const response = await fetch('/auth/api/users/me');
        if (!response.ok) {
          throw new Error('Failed to fetch user ID');
        }
        const data = await response.json();
        this.userId = data.userId;
        console.log('Current User ID:', this.userId);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchOrders() {
      try {
        const response = await fetch(`/api/users/orders/${this.userId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        this.orders = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.total-price, h3 {
  font-size: 1.5em;
}
.orders-banner {
  font-size: 2em;
  color: red;
  text-align: center;
}
.orders-container {
  padding: 20px;
}
.no-orders {
  font-size: 16px;
  color: #888;
}
.order-item {
  border-bottom: 1px solid #ddd;
  padding: 16px 0;
}
.order-image {
  height: 100px;
  max-width: 100px;
}
.order-details {
  display: flex;
  padding: 8px 0;
  font-size: 24px;
}
.order-details-wrap {
  padding-left: 16px;
}
</style>
