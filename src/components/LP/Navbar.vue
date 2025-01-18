<script setup>
import { isAuthenticated as checkAuth } from '@/auth'

defineOptions({
  name: 'CustomNavbar'
})

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const isAuthenticated = ref(checkAuth());

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  isAuthenticated.value= false;
  router.push({ name: 'login' })
}
</script>

<template>
  <header>
    <div class="flex justify-between py-6 px-8 items-center">
      <img src="/images/home_icon.png" alt="" class="h-16">
      <nav v-if="isAuthenticated" class="flex gap-6 font-semibold text-gray-400">
        <RouterLink active-class="bg-[#397A3F] text-white" class="border border-[#397A3F] px-4 rounded-lg hover:bg-[#397A3F] hover:text-white" to="auth/dashboard">Dashboard</RouterLink>
        <RouterLink active-class="bg-[#397A3F] text-white" class="border border-[#397A3F] px-4 rounded-lg hover:bg-[#397A3F] hover:text-white" to="logout" @click="logout">Logout</RouterLink>
      </nav>
      <nav v-else class="flex gap-6 font-semibold text-gray-400">
        <RouterLink active-class="text-[#397A3F]" class="" to="/">Home</RouterLink>
        <RouterLink active-class="bg-[#397A3F] text-white" class="border border-[#397A3F] px-4 rounded-lg hover:bg-[#397A3F] hover:text-white" to="login">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>
