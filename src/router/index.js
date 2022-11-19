import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import ClientView from '@/views/ClientView.vue'
import CartView from '@/views/CartView.vue'
import ConfirmationView from '@/views/ConfirmationView.vue'
import ClientManageView from '@/views/ClientManageView.vue'
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/client/:uid',
    name: 'client',
    component: ClientView,
    props: true
  },
  {
    path: '/cart',
    name:'cart',
    component: CartView
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: ConfirmationView
  },
  {
    path: '/client_manage/:uid',
    name: 'client_manage',
    component: ClientManageView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
