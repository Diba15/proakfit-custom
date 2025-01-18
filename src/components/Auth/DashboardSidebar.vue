<script setup>
import { onMounted, ref } from 'vue'

const menu = [
  {
    label: 'Dashboard',
    icon: 'home',
    link: 'dashboard',
  },
  {
    label: 'Daftar Sidang',
    icon: 'clipboard',
    link: '/daftar-sidang',
  },
  {
    label: 'Revisi Sidang',
    icon: 'pencil',
    link: '/revisi-sidang',
  },
]

const user = ref({ username: '', name: '', role: '', id: 0, email: '', phone: '' })

onMounted(() => {
  const storedUser = localStorage.getItem('userData')
  console.log(storedUser)
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})
</script>

<template>
  <div class="flex flex-col gap-6 items-center min-w-[350px] min-h-svh bg-white p-4 text-[#55565B]">
    <div class="flex flex-col items-center gap-3 min-h-full">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt=""
          />
        </div>
      </div>

      <div class="flex flex-col items-center">
        <h1>{{ user.name }}</h1>
        <h1>{{ user.role }}</h1>
      </div>
    </div>

    <div class="flex flex-col gap-2 self-start w-full max-h-[800px]">
      <div v-for="item in menu" :key="item.label">
        <RouterLink
          :to="item.link"
          class="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-[#397A3F] hover:text-white min-w-full w-full"
          active-class="bg-[#397A3F] text-white"
        >
          <div class="flex items-center gap-4">
            <span class="text-2xl">
              <i :class="`pi pi-${item.icon}`"></i>
            </span>
            <span>{{ item.label }}</span>
          </div>
        </RouterLink>
        <hr />
      </div>
    </div>

    <h1
      class="text-[#397A3F] font-semibold  hover:bg-[#397A3F] py-2 px-4 hover:text-white cursor-pointer rounded-lg self-start w-full"
    >
      <i class="pi pi-book"></i> MANUAL PENGGUNA
    </h1>
  </div>
</template>

<style scoped></style>
