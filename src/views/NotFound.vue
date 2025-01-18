<script setup>
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center min-h-96">
    <h1 class="text-3xl font-bold">Halaman tidak ditemukan... :(</h1>
    <RouterLink
      active-class="bg-[#397A3F] text-white"
      class="flex flex-row items-center justify-center text-[#397A3F] gap-2 px-4 rounded-lg hover:bg-[#397A3F] hover:text-white"
      to="/"
      >
      <p>
        Kembali ke halaman utama
      </p>
      <i class="pi pi-arrow-right"></i>
    </RouterLink>
  </div>
</template>

<style scoped></style>
