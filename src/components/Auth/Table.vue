<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MainTable',
})

defineProps({
  headerTable: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true,
  },
  prodi: {
    type: Array,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 5
  },
  totalPages: {
    type: Number,
  }
})

const emit = defineEmits(['selectedProdi', 'exportToExcel', 'searchTerm'])

const selectedProdi = ref('')
const searchTerm = ref('')

const handleSelectedProdiChange = () => {
  emit('selectedProdi', selectedProdi.value)
}

const handleSearchTermChange = () => {
  emit('searchTerm', searchTerm.value)
}

const exportToExcel = () => {
  emit('exportToExcel')
}
</script>

<template>
  <div class="px-5">
    <div class="flex justify-between items-center my-2">
      <div class="flex items-center justify-between gap-3">
        <select
          v-model="selectedProdi"
          @change="handleSelectedProdiChange"
          class="w-full min-w-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397A3F] bg-gray-200"
        >
          <option value="">Semua Program Studi</option>
          <option v-for="item in prodi" :key="item.id" :value="item.name">
            {{ item.name }}
          </option>
        </select>
        <input
          id="search"
          type="text"
          v-model="searchTerm"
          @input="handleSearchTermChange"
          placeholder="Cari Mahasiswa..."
          class="h-fit p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397A3F] bg-gray-200"
        />
      </div>
      <div class="flex gap-2">
        <button
          @click="exportToExcel"
          class="flex items-center gap-2 py-2 px-4 rounded-lg bg-[#397A3F] text-white"
        >
          <i class="pi pi-file-excel"></i> Export Excel
        </button>
      </div>
    </div>
    <table class="w-full border-collapse">
      <thead>
      <tr class="bg-gray-200 text-left">
        <th v-for="header in headerTable" :key="header.field" class="border p-2">{{header.label}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="data.length === 0">
        <td colspan="8" class="border p-2 text-center">No data available</td>
      </tr>
      <tr
        v-for="(item, index) in data"
        :key="item.id"
        class="odd:bg-white even:bg-gray-100"
      >
        <td class="border p-2">{{ (currentPage - 1) * perPage + index + 1 }}</td>
        <td class="border p-2">{{ item.name }}</td>
        <td class="border p-2">{{ item.nim }}</td>
        <td class="border p-2">{{ item.prodi }}</td>
        <td class="border p-2">{{ item.Judul }}</td>
        <td class="border p-2">{{ item.pbb1 }}</td>
        <td class="border p-2">{{ item.pbb2 }}</td>
        <td class="border p-2">{{ item.status }}</td>
      </tr>
      </tbody>
    </table>
    <div class="flex justify-end gap-2 items-center mt-4">
      <button
        @click="$emit('changePage', currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-[#397A3F] text-white rounded-lg disabled:bg-gray-300"
      >
        Previous
      </button>
      <span class="px-4 py-2 bg-gray-200 rounded-lg"
      >Page {{ currentPage }} of {{ totalPages }}</span
      >
      <button
        @click="$emit('changePage', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-[#397A3F] text-white rounded-lg disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
