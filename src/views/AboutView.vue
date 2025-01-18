<script setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()

const userData = [{username: "Diba", name: "Dimas Bagas", role: "Admin", id: 1, email: "dimaabagas73@gmail.com", phone: "08123456789"}]

const showPasswordHandler = () => {
  showPassword.value = !showPassword.value

  if (showPassword.value) {
    document.getElementById('password').type = 'text'
  } else {
    document.getElementById('password').type = 'password'
  }
}

async function dummyLogin() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwic3ViIjoiVGVzdDEifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  localStorage.setItem('authToken', token)
  if (username.value !== '' && password.value !== '') {
    localStorage.setItem('userData', JSON.stringify(userData[0]))
    await router.push({ name: 'auth-dashboard' })
  } else {
    alert('Username dan Password Tidak Boleh Kosong!')
  }
}
</script>

<template>
  <div class="flex justify-between relative min-h-screen">
    <div
      class="flex flex-col gap-8 align-middle justify-center w-fit bg-white py-6 px-4 min-h-svh min-w-[600px] shadow-xl z-20"
    >
      <img src="/images/auth_icon.png" alt="" class="h-32 w-fit mx-auto" />
      <h1 class="text-center text-lg font-semibold text-black">Login</h1>
      <form @submit.prevent="dummyLogin" class="flex flex-col gap-6 items-center">
        <label
          class="input border-b-2 border-b-gray-300 flex items-center gap-2 w-full max-w-xs bg-white rounded-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
            />
          </svg>
          <input type="text" class="grow" placeholder="Username" v-model="username" />
        </label>
        <label
          class="input border-b-2 border-b-gray-300 flex items-center gap-2 max-w-xs w-full bg-white rounded-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input id="password" type="password" class="grow" placeholder="Masukkan Password" v-model="password" />
          <i v-if="showPassword" class="pi pi-eye cursor-pointer" @click="showPasswordHandler"></i>
          <i v-else class="pi pi-eye-slash cursor-pointer" @click="showPasswordHandler"></i>
        </label>
        <button
          class="bg-[#397A3F] text-white px-4 py-2 rounded-lg hover:bg-[#397A3F] hover:text-white"
        >
          Login
        </button>
      </form>
      <RouterLink to="create-password" class="mx-auto">Belum membuat Password?</RouterLink>
    </div>
    <nav class="flex gap-6 font-semibold text-gray-400 h-fit w-fit absolute top-10 right-5">
      <RouterLink active-class="text-[#397A3F]" class="" to="/">Home</RouterLink>
      <RouterLink active-class="bg-[#397A3F] text-white" class="border border-[#397A3F] px-4 rounded-lg hover:bg-[#397A3F] hover:text-white" to="login">Login</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
</style>
