// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated, startInactivityTimer, stopInactivityTimer } from '../auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/create-password',
    name: 'create-password',
    component: () => import('../views/CreatePassword.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth/AppAuth.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'auth-dashboard',
        component: () => import('../views/Auth/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' }) // Redirect to login page if not authenticated
    } else {
      startInactivityTimer(() => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        next({ name: 'login' })
      })
      next() // Proceed to the route if authenticated
    }
  } else {
    stopInactivityTimer()
    next() // Proceed to the route if it does not require authentication
  }
})

export default router
