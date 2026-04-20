<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '@/composables/useProducts'
import ProductCard from '@/components/ProductCard.vue'


const { loading, error, search, selectedCategory, categories, filteredProducts, fetchProducts } =
  useProducts()

onMounted(fetchProducts)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-6xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Explore Our Products</h1>

      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="w-full sm:w-2/3 px-3 py-2 rounded border bg-white text-black
       dark:bg-gray-800 dark:text-white dark:border-gray-700
       placeholder:text-gray-400 dark:placeholder:text-gray-400"
        />

        <select v-model="selectedCategory" class="w-full sm:w-1/3 px-3 py-2 rounded border bg-white text-black
       dark:bg-gray-800 dark:text-white dark:border-gray-700">
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <p v-if="loading" class="text-gray-600">Loading products...</p>
      <p v-else-if="error" class="text-red-600">Error: {{ error }}</p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard
            v-for="p in filteredProducts"
            :key="p.id"
            :product="p"
        />
      </div>
    </div>
  </div>
</template>