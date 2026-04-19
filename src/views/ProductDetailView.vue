<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/types/Product'

const route = useRoute()
const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchProduct = async () => {
  loading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    if (!res.ok) throw new Error('Failed to fetch product')
    product.value = await res.json()
  } catch (e) {
    error.value = 'Error loading product'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProduct)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else-if="product" class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <img :src="product.thumbnail" class="w-full h-64 object-cover rounded" />

      <h1 class="text-2xl font-bold mt-4">{{ product.title }}</h1>
      <p class="text-gray-600 mt-2">{{ product.description }}</p>

      <div class="mt-4 text-xl font-semibold">
        ${{ product.price }}
      </div>
    </div>
  </div>
</template>