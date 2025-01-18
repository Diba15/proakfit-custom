<script setup>
import CustomNavbar from '@/components/LP/Navbar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const showNavbar = computed(() => {
  return route.name !== 'auth-dashboard'
})
</script>

<template>
  <header v-if="showNavbar" class="relative z-10">
    <CustomNavbar />
  </header>
  <main>
    <div class="flex justify-center items-center">
      <img src="/images/FIT-1_new.png" alt="" class="min-w-[90vw] max-h-[80vh] rounded-xl">
    </div>
  </main>
</template>
