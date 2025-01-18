<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['toggleSidebar'])

const toggleSidebar = () => {
  emit('toggleSidebar')
}

import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  router.push({ name: 'login' })
}
</script>

<template>
  <header>
    <div class="flex justify-between gap-10 py-4 px-8 items-center bg-white shadow-md z-20">
      <div class="flex gap-10 items-center justify-normal md:justify-between">
        <i
          id="menu"
          class="pi pi-bars font-bold text-2xl cursor-pointer"
          @click="toggleSidebar"
        ></i>
        <div class="flex gap-2 items-center">
          <img src="/images/icon.png" alt="" class="h-10 md:h-14" />
          <h1 class="text-lg md:text-2xl font-bold text-[#3EB049]">PROAKFIT</h1>
        </div>
      </div>

      <div class="gap-2 hidden md:flex">
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-outline rounded-btn items-center flex gap-2 text-sm text-gray-700 hover:bg-[#397A3F] hover:text-white hover:border-[#397A3F]"
          >
            <p class="font-semibold leading-none">Pilih Periode</p>
            <i class="pi pi-chevron-down"></i>
          </div>
          <ul
            tabindex="0"
            class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
          >
            <li><a>2024/2025</a></li>
            <li><a>2023/2024</a></li>
          </ul>
        </div>
        <div
          class="btn btn-outline rounded-btn items-center flex gap-2 text-sm text-gray-700 hover:bg-[#397A3F] hover:text-white hover:border-[#397A3F]"
        >
          <i class="pi pi-bell"></i>
        </div>
        <div @click="logout" class="btn btn-error rounded-btn items-center flex gap-2 text-sm">
          <i class="pi pi-sign-out"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
