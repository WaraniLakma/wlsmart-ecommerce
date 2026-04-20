<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const cart = useCartStore()
</script>

<template>
  <header class="text-white" style="background-color: #9D00FF;">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center">
  <img src="/logo.png" alt="WLSMart" class="h-14 w-48" />
</RouterLink>

      <nav class="flex items-center gap-4">
        <RouterLink to="/" class="text-white hover:underline">Home</RouterLink>

        <RouterLink to="/cart" class="text-white hover:underline">
          Cart
          <span
            v-if="cart.totalItems > 0"
            class="ml-2 inline-flex items-center justify-center text-xs font-bold px-2 py-1 rounded-full bg-black text-white"
          >
            {{ cart.totalItems }}
          </span>
        </RouterLink>
        <RouterLink v-if="!auth.isLoggedIn" to="/login" class="hover:underline">
            Login
        </RouterLink>

        <button
            v-else
            class="px-3 py-1 rounded border hover:bg-gray-100"
            @click="auth.logout()"
        >
            Logout
        </button>
      </nav>
    </div>
  </header>
</template>