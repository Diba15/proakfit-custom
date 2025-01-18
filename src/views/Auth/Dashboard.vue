<script setup>
import { ref, computed } from 'vue'
import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import SummaryCard from '@/components/Auth/SummaryCard.vue'
import MainTable from '@/components/Auth/Table.vue'

defineOptions({
  name: 'MainDashboard',
})

const headerTableMahasiswa = [
  {
    label: 'No',
    field: 'id',
  },
  {
    label: 'Nama',
    field: 'name',
  },
  {
    label: 'NIM',
    field: 'nim',
  },
  {
    label: 'Prodi',
    field: 'prodi',
  },
  {
    label: 'Judul',
    field: 'Judul',
  },
  {
    label: 'PBB 1',
    field: 'pbb1',
  },
  {
    label: 'PBB 2',
    field: 'pbb2',
  },
  {
    label: 'Status',
    field: 'status',
  },
]
const dataMahasiswa = [
  {
    id: 1,
    name: 'Dimas Bagas Saputro',
    nim: '6706192089',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran SPP',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Lulus',
  },
  {
    id: 2,
    name: 'Rafi Alfaridzi',
    nim: '6706192090',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Listrik',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Belum Lulus',
  },
  {
    id: 3,
    name: 'Rizky Wibowo',
    nim: '6706192091',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Air',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Belum Lulus',
  },
  {
    id: 4,
    name: 'Siti Nurhaliza',
    nim: '6706192092',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Gas',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Belum Lulus',
  },
  {
    id: 5,
    name: 'Indra Pratama',
    nim: '6706192093',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Internet',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Belum Lulus',
  },
  {
    id: 6,
    name: 'Ayu Lestari',
    nim: '6706192094',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Pajak',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Belum Lulus',
  },
  {
    id: 7,
    name: 'Bambang Harto',
    nim: '6706192095',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Parkir',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Belum Lulus',
  },
  {
    id: 8,
    name: 'Citra Dewi',
    nim: '6706192096',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Tiket',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Belum Lulus',
  },
  {
    id: 9,
    name: 'Dedi Prakoso',
    nim: '6706192097',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Sewa',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Lulus',
  },
  {
    id: 10,
    name: 'Eka Wulandari',
    nim: '6706192098',
    prodi: 'D3 Rekayasa Perangkat Lunak Aplikasi',
    Judul: 'Aplikasi Pembayaran Donasi',
    pbb1: 'Rizza Mandasari',
    pbb2: 'Hermawan',
    status: 'Belum Lulus',
  },
]

const prodi = [
  {
    id: 1,
    name: 'D3 Teknik Telekomunikasi',
  },
  {
    id: 2,
    name: 'D3 Rekayasa Perangkat Lunak Aplikasi',
  },
  {
    id: 3,
    name: 'D3 Sistem Informasi',
  },
  {
    id: 4,
    name: 'D3 Sistem Informasi Akuntansi',
  },
  {
    id: 5,
    name: 'D3 Teknologi Komputer',
  },
  {
    id: 6,
    name: 'D3 Digital Marketing',
  },
  {
    id: 7,
    name: 'D3 Hospitality & Culinary Art',
  },
  {
    id: 8,
    name: 'S1 Terapan Sistem Informasi Kota Cerdas',
  },
]

const searchTerm = ref('')
const selectedProdi = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5)

const filteredMahasiswa = computed(() => {
  return dataMahasiswa.filter((mahasiswa) => {
    const matchesSearchTerm =
      mahasiswa.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      mahasiswa.nim.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      mahasiswa.prodi.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      mahasiswa.Judul.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      mahasiswa.pbb1.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      mahasiswa.pbb2.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      mahasiswa.status.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesProdi = selectedProdi.value === '' || mahasiswa.prodi === selectedProdi.value
    const matchesStatus = selectedStatus.value === '' || mahasiswa.status === selectedStatus.value
    return matchesSearchTerm && matchesProdi && matchesStatus
  })
})

const paginatedMahasiswa = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMahasiswa.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredMahasiswa.value.length / itemsPerPage.value)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const exportToPDF = () => {
  const doc = new jsPDF()
  let y = 10
  doc.text('Data Mahasiswa', 10, y)
  y += 10
  paginatedMahasiswa.value.forEach((mahasiswa, index) => {
    doc.text(
      `${index + 1}. ${mahasiswa.name} - ${mahasiswa.nim} - ${mahasiswa.prodi} - ${mahasiswa.Judul} - ${mahasiswa.pbb1} - ${mahasiswa.pbb2} - ${mahasiswa.status}`,
      10,
      y,
    )
    y += 10
  })
  doc.save('data_mahasiswa.pdf')
}

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredMahasiswa.value)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Mahasiswa')
  XLSX.writeFile(workbook, 'data_mahasiswa.xlsx')
}

const toggleFilter = (status) => {
  selectedStatus.value = selectedStatus.value === status ? '' : status
}

const handleSelectedProdi = (prodi) => {
  selectedProdi.value = prodi
}

const handleSearchTerm = (term) => {
  searchTerm.value = term
}
</script>

<template>
  <main class="flex flex-col gap-2">
    <!--  Summary Card  -->
    <div class="flex gap-3 w-full items-center">
      <div class="flex gap-3 w-full items-center justify-between max-w-[350px]">
        <SummaryCard
          cardName="Total Mahasiswa"
          :length-data="dataMahasiswa.length"
          status=""
          @toggleFilter="toggleFilter"
          :selected-status="selectedStatus"
        />
        <SummaryCard
          cardName="Lulus"
          :length-data="dataMahasiswa.filter((m) => m.status === 'Lulus').length"
          status="Lulus"
          @toggleFilter="toggleFilter"
          :selected-status="selectedStatus"
        />
        <SummaryCard
          cardName="Belum Lulus"
          :length-data="dataMahasiswa.filter((m) => m.status === 'Belum Lulus').length"
          status="Belum Lulus"
          @toggleFilter="toggleFilter"
          :selected-status="selectedStatus"
        />
      </div>
    </div>
    <!-- Data Mahasiswa   -->
    <div
      id="dashboardDisplay"
      class="flex flex-col justify-center gap-3 overflow-y-scroll max-h-[600px]"
    >
      <h1 class="text-xl font-semibold text-gray-700 self-start">
        Data Mahasiswa {{ selectedStatus }}
      </h1>
      <div class="min-h-[0.8px] w-full bg-gray-300"></div>
      <MainTable
        :header-table="headerTableMahasiswa"
        :prodi="prodi"
        :data="paginatedMahasiswa"
        :current-page="currentPage"
        :per-page="itemsPerPage"
        :total-pages="totalPages"
        @selectedProdi="handleSelectedProdi"
        @exportToExcel="exportToExcel"
        @exportToPDF="exportToPDF"
        @searchTerm="handleSearchTerm"
        @changePage="changePage"
      />
    </div>
  </main>
</template>

<style scoped>
#dashboardDisplay::-webkit-scrollbar {
  display: none;
}

#dashboardDisplay {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
