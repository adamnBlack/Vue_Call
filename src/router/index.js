import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthenticationStore } from '../stores/Authentication'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard/Index.vue'),
      meta: { requiresAuth: true, title: 'Dashboard' },
      children: [
        {
          path: '/calls',
          name: 'Calls',
          component: () => import('../views/Dashboard/Calls.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Auth/LoginView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: () => import('../views/NotFound.vue'),
      props: true
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: () => import('../views/NetworkError.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const authenticationStore = useAuthenticationStore()
  const { isAuthenticated } = storeToRefs(authenticationStore)

  if (to.meta.requiresAuth && !isAuthenticated.value && to.name !== 'Login') {
    return { name: 'Login' }
  } else if (isAuthenticated.value && to.name === 'Login') {
    return { name: 'Dashboard' }
  }
})

export default router
