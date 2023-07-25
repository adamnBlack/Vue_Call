import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import axiosInstance from '../config.js'
import router from '../router/index.js'

import { useAuthenticationStore } from '../stores/Authentication'
const authenticationStore = useAuthenticationStore()
const { token, flashMessage } = storeToRefs(authenticationStore)

export const useCallsStore = defineStore('calls', () => {
  const calls = ref({})
  const loading = ref(false)
  function get_calls({page = 1, limit = 10, search = ""}) {
    loading.value = true
    axiosInstance
      .get('/api/call?page=' + page + '&limit=' + limit + '&call_id=' + search, {
        headers: {
          Authorization: 'Bearer ' + token.value
        }
      })
      .then((res) => {
        calls.value = res.data
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          authenticationStore.logout
        }
        if (error.response && error.response.status == 404) {
          router.push({
            name: '404Resource',
            params: { resource: 'calls' }
          })
        } else {
          router.push({ name: 'NetworkError' })
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
  function delete_call(callId) {
    loading.value = true
    axiosInstance
      .delete(`/api/call/${callId}`, {
        headers: {
          Authorization: 'Bearer ' + token.value,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        get_calls({});
        alert("The call deleted successfully.")
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          authenticationStore.logout
        }
        if (error.response && error.response.status == 404) {
          router.push({
            name: '404Resource',
            params: { resource: 'calls' }
          })
        } else {
          router.push({ name: 'NetworkError' })
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
  return { calls, loading, get_calls, delete_call }
})
