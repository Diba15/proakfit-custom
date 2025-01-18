<script setup>

import DashboardNavbar from '@/components/Auth/DashboardNavbar.vue'
import DashboardSidebar from '@/components/Auth/DashboardSidebar.vue'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const isSidebarVisible = ref(true)

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}

const breadcrumbs = ref([])
const router = useRouter()

const updateBreadcrumbs = (route) => {
  breadcrumbs.value = route.matched.map((match) => ({
    name: match.meta.breadcrumb || match.name,
    path: match.path,
  }))
}

watch(() => router.currentRoute.value, (newRoute) => {
  updateBreadcrumbs(newRoute)
})


const user = ref({ username: '', name: '', role: '', id: 0, email: '', phone: '' })

onMounted(() => {
  const storedUser = localStorage.getItem('userData')
  console.log(storedUser)
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
  updateBreadcrumbs(router.currentRoute.value)

  console.log(breadcrumbs.value)
})
</script>

<template>
  <!-- Auth Navbar -->
  <div class="relative">
    <DashboardNavbar @toggle-sidebar="toggleSidebar" />
  </div>

  <!-- Auth Content -->
  <div class="flex gap-10">
    <!--  Sidebar  -->
    <div :class="['sidebar', { 'sidebar-hidden': !isSidebarVisible }]">
      <DashboardSidebar v-if="isSidebarVisible" />
    </div>

    <!--    Main Content    -->
    <div class="w-full me-5 mt-5">

      <div>
        <h1 class="font-bold text-2xl text-gray-700">Dashboard</h1>
        <div class="breadcrumbs text-sm font-semibold">
          <ul>
            <li class="text-gray-700">{{ user.role }}</li>
            <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
              <RouterLink :to="breadcrumb.path">{{ breadcrumb.name }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div id="viewContent" class="bg-white p-4 rounded-xl w-full me-5 mt-5 max-h-[500px] overflow-y-scroll">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  max-width: 350px;
  transition:  opacity 0.3s ease;
  opacity: 1;
}

.sidebar-hidden {
  opacity: 0;
  overflow: hidden;
}

#viewContent::-webkit-scrollbar {
  display: none;
}

#viewContent {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
