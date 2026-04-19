<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'

const { loading, error, search, selectedCategory, categories, filteredProducts, fetchProducts } =
  useProducts()

onMounted(fetchProducts)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">E-Commerce Store</h1>

      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="w-full sm:w-2/3 px-3 py-2 rounded border"
        />

        <select v-model="selectedCategory" class="w-full sm:w-1/3 px-3 py-2 rounded border">
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <p v-if="loading" class="text-gray-600">Loading products...</p>
      <p v-else-if="error" class="text-red-600">Error: {{ error }}</p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="p in filteredProducts"
          :key="p.id"
          class="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
        >
          <img :src="p.thumbnail" :alt="p.title" class="w-full h-40 object-cover rounded" />
          <h2 class="font-semibold mt-2">{{ p.title }}</h2>
          <p class="text-sm text-gray-500 line-clamp-2">{{ p.description }}</p>
          <div class="mt-2 flex items-center justify-between">
            <span class="font-bold">${{ p.price }}</span>
            <span class="text-sm text-gray-500">{{ p.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>