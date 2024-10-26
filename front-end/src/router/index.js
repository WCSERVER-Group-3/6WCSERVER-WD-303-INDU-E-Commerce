import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios'; // Import Axios
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import ContactPage from '../views/ContactPage.vue';
import ProductsPage from '../views/ProductsPage.vue';
import AdminLoginPage from '../views/AdminLoginPage.vue';
import SignPage from '../views/SignPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import CartPage from '../views/CartPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import OrdersPage from '../views/OrdersPage.vue';
import AdminDashboardPage from '../views/AdminDashboardPage.vue';
import UpdateProduct from '../components/UpdateProduct.vue';
import LoginPage from '../views/LoginPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage,
  },
  {
    path: '/adminLogin',
    name: 'Login',
    component: AdminLoginPage,
  },
  {
    path: '/sign',
    name: 'Sign',
    component: SignPage,
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/products', // redirect
    redirect: '/products',
  },
  {
    path: '*',
    component: NotFoundPage,
  },
  {
    path: '/orders',
    component: OrdersPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/admin',
    component: AdminDashboardPage,
    beforeEnter: async (to, from, next) => {
      try {
        const response = await axios.get('/admin/admin-login-status'); 
        if (response.data.isAdminLoggedIn) {
          next(); 
        } else {
          next('/adminLogin'); 
        }
      } catch (error) {
        next('/adminLogin');
      }
    },
  },
  {
    path: '/update-product/:id',
    name: 'UpdateProduct',
    component: UpdateProduct,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
