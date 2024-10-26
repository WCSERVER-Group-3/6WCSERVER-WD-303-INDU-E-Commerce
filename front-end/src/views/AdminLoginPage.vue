<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h3 class="text-center mb-4"><span class="brand-name">Administrator Login</span></h3>
        <form @submit.prevent="login">
          <div class="form-group mb-3">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
              requireda
              placeholder="Enter your username"
            />
          </div>
          <div class="form-group mb-3">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <p v-if="errorMessage" class="text-center text-danger mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''  
    };
  },
  methods: {
    async login() {
      this.errorMessage = ''; 

      if (this.username && this.password) {
        try {
          const response = await axios.post('/admin/login', {
            username: this.username,
            password: this.password
          });

          if (response.status === 200) 
          {
            this.username = '';
            this.password = '';
            this.errorMessage = ''; 
            this.$router.push('/admin');  
          }
        } catch (error) {
          if (error.response) {
            this.errorMessage = error.response.data || 'An error occurred during login.';
          } else {
            this.errorMessage = 'Error during login: ' + error.message;
          }
        }
      } else {
        this.errorMessage = 'Please enter your username and password.'; 
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.text-danger {
  color: red;
  margin: 1.5em;
  font-weight: 700;
}

body {
  font-family: 'Poppins', sans-serif;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/products-heading.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.login-card {
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

.brand-name {
  color: #764ba2;
  font-weight: 700;
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

.signup-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.signup-link:hover {
  color: #5767da;
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
