<script setup>
import { ref } from 'vue'

defineOptions({
  title: 'CreatePassword',
})

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const showPasswordHandler = () => {
  showPassword.value = !showPassword.value
  if (showPasswordConfirm.value) {
    showPasswordConfirm.value = false
  }

  if (showPassword.value) {
    document.getElementById('password').type = 'text'
  } else {
    document.getElementById('password').type = 'password'
  }
}

const showPasswordConfirmHandler = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
  if (showPassword.value) {
    showPassword.value = false
  }
  if (showPasswordConfirm.value) {
    document.getElementById('confirmPassword').type = 'text'
  } else {
    document.getElementById('confirmPassword').type = 'password'
  }
}

const generatePassword = () => {
  const length = 8
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  document.getElementById('password').value = password
}
</script>

<template>
  <div
    class="flex flex-col gap-8 align-middle mx-auto w-fit bg-white py-6 px-4 rounded-xl min-w-[500px] min-h-[500px] shadow-xl"
  >
    <img src="/images/auth_icon.png" alt="" class="h-32 w-fit mx-auto" />
    <h1 class="text-center text-lg font-semibold text-black">Buat Password</h1>
    <form action="" class="flex flex-col gap-6 items-center w-full form-control">
      <label class="input border-b-2 border-b-gray-300  flex items-center gap-2 w-full max-w-xs bg-white rounded-none">
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
        <input type="text" class="grow" placeholder="Username" />
      </label>
      <div class="flex gap-2 max-w-xs">
        <label class="input border-b-2 border-b-gray-300 rounded-none flex items-center gap-2 bg-white">
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
          <input id="password" type="password" class="grow" placeholder="Buat Password" />
          <i v-if="showPassword" class="pi pi-eye cursor-pointer" @click="showPasswordHandler"></i>
          <i v-else class="pi pi-eye-slash cursor-pointer" @click="showPasswordHandler"></i>
        </label>
        <button
          @click="generatePassword"
          type="button"
          class="bg-[#397A3F] max-w-xs text-white px-4 py-2 rounded-lg hover:bg-[#397A3F] hover:text-white"
        >
          <i class="pi pi-key"></i>
        </button>
      </div>
      <label class="input border-b-2 border-b-gray-300 rounded-none flex items-center gap-2 w-full max-w-xs bg-white">
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
        <input id="confirmPassword" type="password" class="grow" placeholder="Konfirmasi Password" />
        <i v-if="showPasswordConfirm" class="pi pi-eye cursor-pointer" @click="showPasswordConfirmHandler"></i>
        <i v-else class="pi pi-eye-slash cursor-pointer" @click="showPasswordConfirmHandler"></i>
      </label>
      <button
        class="bg-[#397A3F] text-white px-4 py-2 rounded-lg hover:bg-[#397A3F] hover:text-white"
      >
        Login
      </button>
    </form>
    <RouterLink to="login" class="mx-auto">Kembali Login</RouterLink>
  </div>
</template>

<style scoped></style>
