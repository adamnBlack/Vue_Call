import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '../config.js'
import router from '../router/index.js'

export const useAuthenticationStore = defineStore(
  'auth',
  () => {
    const user = ref({})
    const token = ref(0)
    const loading = ref(false)
    const isAuthenticated = ref(false)
    const flashMessage = ref('')

    function login(email, password) {
      loading.value = true
      axiosInstance
        .post(
          '/api/login',
          {
            email: email,
            password: password
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
        .then((res) => {
          isAuthenticated.value = true
          user.value = res.data.data
          token.value = res.data.token

          flashMessage.value = 'You are loged in succesfully..'

          setTimeout(() => {
            flashMessage.value = ''
          }, 3000)

          router.push({ name: 'Dashboard' })
        })
        .catch((error) => {
          console.log(error)
          isAuthenticated.value = false
          flashMessage.value = 'Invalid credential'

          setTimeout(() => {
            flashMessage.value = ''
          }, 3000)
        })
        .finally(() => {
          loading.value = false
        })
    }

    function logout() {
      user.value = {}
      token.value = 0
      isAuthenticated.value = false
      localStorage.removeItem('auth')
      router.push({ name: 'Login' })
    }

    return { user, token, login, logout, loading, isAuthenticated, flashMessage }
  },
  {
    persist: true
  }
)
