<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const backgroundImage = computed(() => {
  return route.name === 'login' ? 'url(/images/FIT-1_new.png)' : ''
})

const style = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}
</script>

<template>
  <div class="relative" :style="{ backgroundImage: backgroundImage, ...style }">
    <div v-if="route.name === 'login'" class="absolute inset-0 bg-white opacity-50"></div>

    <div class="min-h-svh relative z-10">
      <RouterView />
      <RouterView name="afterLogin" />
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
