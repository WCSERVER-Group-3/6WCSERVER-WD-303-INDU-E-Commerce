<template>
  <div class="navbar-container">
    <div :class="['nav-bar', { scrolled: isScrolled }]">
      <div id="nav-logo">
        <router-link to="/" id="home-link">
          <h1><i>INDÛ</i></h1>
        </router-link>
      </div>

      <div id="nav-links-cart">
        <div id="nav-links">
          <router-link to="/" class="nav-item">Home</router-link>
          <router-link to="/products" class="nav-item">Products</router-link>
          <router-link to="/orders" class="nav-item">Your Orders</router-link>
          <router-link to="/about" class="nav-item">About Us</router-link>
          <router-link to="/contact" class="nav-item">Contact Us</router-link>

          <router-link v-if="!userId" to="/login" class="nav-item">Login</router-link>
          <a v-if="userId" @click.prevent="logout" class="nav-item">Logout</a>
        </div>

        <div id="nav-cart">
          <router-link to="/cart" id="cart-link">
            <i class="fas fa-shopping-cart"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  data() {
    return {
      isScrolled: false,
      userId: null,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchUserId(); 

   
    this.$root.$on('userLoggedIn', this.fetchUserId);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    this.$root.$off('userLoggedIn', this.fetchUserId); 
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    async fetchUserId() {
      try {
        const response = await axios.get('/auth/api/users/me');
        if (response.status === 200) {
          this.userId = response.data.userId; 
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        this.userId = null; 
      }
    },
    async logout() {
      try {
        const response = await axios.post('/auth/logout', {}, { withCredentials: true });
        if (response.status === 200) {
          this.userId = null; 
          this.$router.push('/login'); 
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },
};
</script>

<style scoped>
.navbar-container {
  margin-bottom: 8em;
}
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 75px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
  z-index: 1000;
}
.nav-bar.scrolled {
  background-color: white;
  color: black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
#nav-logo h1 {
  font-family: 'Arial', sans-serif;
  color: inherit;
  font-size: 24px;
  margin: 0;
}
#home-link {
  text-decoration: none;
  color: inherit;
}
#nav-links-cart {
  display: flex;
  align-items: center;
  gap: 20px;
}
#nav-links {
  display: flex;
  gap: 20px;
}
.nav-item {
  font-size: 18px;
  color: inherit;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.nav-item:hover {
  background-color: #333;
  color: white;
}
#nav-cart {
  font-size: 24px;
  cursor: pointer;
}
body {
  padding-top: 75px;
}

.fa-shopping-cart
{
  color: red;
}

.fa-shopping-cart:hover
{
  color: white;  
}
</style>
