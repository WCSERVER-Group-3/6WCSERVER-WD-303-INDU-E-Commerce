<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="signup-card">
        <h3 class="text-center mb-4">Create an Account at <span class="brand-name">INDÛ</span></h3>
        <form @submit.prevent="signup">
          <div class="form-group mb-3">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
              required
              placeholder="Enter your username"
            />
          </div>
          <div class="form-group mb-3">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
              placeholder="Enter your email"
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
          <button type="submit" class="btn btn-primary w-100">Sign Up</button>
        </form>
        <p class="text-center mt-3">
          Already have an account? <router-link to="/login" class="login-link">Login</router-link>
        </p>
        <p v-if="errorMessage" class="text-center text-danger mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async signup() {
      if (this.username && this.email && this.password) {
        try {
          await axios.post('/auth/signup', {
            username: this.username,
            email: this.email,
            password: this.password
          });

          this.username = '';
          this.email = '';
          this.password = '';
          this.errorMessage = '';
          this.$router.push('/login');
        } catch (error) {
          this.errorMessage = error.response.data || 'Error during signup.';
        }
      } else {
        this.errorMessage = 'Please fill in all fields.';
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

.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/products-heading.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
}



.signup-card {
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

label
{
  margin-right: 0.5em;
  font-weight: 300;
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

.login-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  color: #5767da;
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
