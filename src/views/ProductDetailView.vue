<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '@/types/Product'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchProduct = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    if (!res.ok) throw new Error(`Failed to fetch product (HTTP ${res.status})`)
    product.value = (await res.json()) as Product
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error loading product'
  } finally {
    loading.value = false
  }
}

const addAndGoToCart = async () => {
  if (!product.value) return
  cart.addToCart(product.value)
  await router.push('/cart')
}

onMounted(fetchProduct)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-600">Error: {{ error }}</div>

    <div v-else-if="product" class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-64 object-cover rounded" />

      <h1 class="text-2xl font-bold mt-4">{{ product.title }}</h1>
      <p class="text-gray-600 mt-2">{{ product.description }}</p>

      <div class="mt-4 text-xl font-semibold">${{ product.price }}</div>

      <button
        class="mt-4 px-4 py-2 rounded bg-black text-white hover:opacity-90"
        @click="addAndGoToCart"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>