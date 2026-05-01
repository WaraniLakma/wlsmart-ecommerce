<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-4xl mx-auto">
      
      <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center py-24">
        <img
            src="/empty-cart.png"
            alt="Empty cart"
            class="w-48 h-auto mb-6"
        />

        <p class="text-2xl font-bold text-gray-700 dark:text-gray-200">
        Your cart is empty.
        </p>
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
        <div
          v-for="item in cart.items"
          :key="item.product.id"
          class="flex gap-4 items-center border-b dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
        >
          <img :src="item.product.thumbnail" class="w-20 h-20 object-cover rounded" />

          <div class="flex-1">
            <p class="font-semibold">{{ item.product.title }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-300">${{ item.product.price }} each</p>
          </div>

          <div class="flex items-center gap-2">
            <button class="px-3 py-1 border rounded dark:border-gray-700 dark:hover:bg-gray-700" @click="cart.decreaseQty(item.product.id)">-</button>
            <span class="w-8 text-center">{{ item.qty }}</span>
            <button class="px-3 py-1 border rounded" @click="cart.increaseQty(item.product.id)">+</button>
          </div>

          <button class="text-red-600 hover:underline" @click="cart.removeFromCart(item.product.id)">
            Remove
          </button>
        </div>

        <div class="flex items-center justify-between pt-4">
          <p class="font-bold text-black dark:text-white">Total: ${{ cart.totalPrice.toFixed(2) }}</p>
          <button class="px-4 py-2 rounded bg-red-600 text-white" @click="cart.clearCart()">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>