<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Notification from './components/Notification.vue'
import { inject, onMounted } from 'vue'

import { useAuthenticationStore } from './stores/Authentication'
import { storeToRefs } from 'pinia'
const authenticationStore = useAuthenticationStore()
const { flashMessage, error } = storeToRefs(authenticationStore)
</script>

<template>
  <div id="layout">
    <RouterView />
    <Notification
      v-if="flashMessage | error"
      :message="flashMessage"
      :error="error"
      class="mt-20"
    ></Notification>
  </div>
</template>

<style scoped></style>
