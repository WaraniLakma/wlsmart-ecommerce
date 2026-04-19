<script setup lang="ts">
import type { Product } from '@/types/Product'
import { RouterLink } from 'vue-router'

defineProps<{
  product: Product
}>()
</script>

<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="block bg-white rounded-lg shadow p-4 hover:shadow-md transition"
  >
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-40 object-cover rounded" />
    <h2 class="font-semibold mt-2">{{ product.title }}</h2>
    <p class="text-sm text-gray-500 line-clamp-2">{{ product.description }}</p>

    <div class="mt-2 flex items-center justify-between">
      <span class="font-bold">${{ product.price }}</span>
      <span class="text-sm text-gray-500">{{ product.category }}</span>
    </div>
  </RouterLink>
</template>