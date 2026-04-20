<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const username = ref('emilys')
const password = ref('emilyspass')

const submit = async () => {
  await auth.login(username.value, password.value)
  if (auth.isLoggedIn) await router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-4">Login</h1>

      <label class="block mb-2 text-sm">Username</label>
      <input
        v-model="username"
        class="w-full px-3 py-2 rounded border bg-white text-black"
      />

      <label class="block mt-4 mb-2 text-sm">Password</label>
      <input
        v-model="password"
        type="password"
        class="w-full px-3 py-2 rounded border bg-white text-black"
      />

      <p v-if="auth.error" class="mt-3 text-red-600">{{ auth.error }}</p>

      <button
        class="mt-4 w-full px-4 py-2 rounded bg-black text-white hover:opacity-90 disabled:opacity-50"
        :disabled="auth.loading"
        @click="submit"
      >
        {{ auth.loading ? 'Logging in...' : 'Login' }}
      </button>

      <p class="mt-4 text-xs text-gray-500">
        (DummyJSON demo) Default filled credentials can be changed.
      </p>
    </div>
  </div>
</template>