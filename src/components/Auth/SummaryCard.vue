<script setup>
const props = defineProps({
  lengthData: {
    type: Number,
    default: 0
  },
  cardName: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  selectedStatus: {
    type: String,
  }
})

const emit = defineEmits(['toggleFilter'])

const toggleFilter = (status) => {
  emit('toggleFilter', status)
}

const isActive = (status) => {
  return props.selectedStatus === status
}
</script>

<template>
  <div @click="toggleFilter(status)" :class="['summary-card', { 'active': isActive(status) }]" class="bg-[#397A3F] shadow-md rounded-lg p-4 flex justify-between items-center min-w-full cursor-pointer">
    <div class="flex flex-col gap-2">
      <p class="text-3xl font-bold text-white">{{ lengthData }}</p>
      <h2 class="text-lg font-semibold text-white">{{cardName}}</h2>
    </div>
    <i class="pi pi-arrow-circle-right text-4xl text-white"></i>
  </div>
</template>

<style scoped>
.summary-card.active {
  background-color: #3eb049;
}
</style>
