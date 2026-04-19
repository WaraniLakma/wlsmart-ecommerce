<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Cart</h1>

      <p v-if="cart.items.length === 0" class="text-gray-600">Your cart is empty.</p>

      <div v-else class="bg-white rounded-lg shadow p-4 space-y-4">
        <div
          v-for="item in cart.items"
          :key="item.product.id"
          class="flex gap-4 items-center border-b pb-4 last:border-b-0 last:pb-0"
        >
          <img :src="item.product.thumbnail" class="w-20 h-20 object-cover rounded" />

          <div class="flex-1">
            <p class="font-semibold">{{ item.product.title }}</p>
            <p class="text-sm text-gray-500">${{ item.product.price }} each</p>
          </div>

          <div class="flex items-center gap-2">
            <button class="px-3 py-1 border rounded" @click="cart.decreaseQty(item.product.id)">-</button>
            <span class="w-8 text-center">{{ item.qty }}</span>
            <button class="px-3 py-1 border rounded" @click="cart.increaseQty(item.product.id)">+</button>
          </div>

          <button class="text-red-600 hover:underline" @click="cart.removeFromCart(item.product.id)">
            Remove
          </button>
        </div>

        <div class="flex items-center justify-between pt-4">
          <p class="font-bold">Total: ${{ cart.totalPrice.toFixed(2) }}</p>
          <button class="px-4 py-2 rounded bg-red-600 text-white" @click="cart.clearCart()">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>