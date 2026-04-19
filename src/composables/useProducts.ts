import { computed, ref } from 'vue'
import type { Product, ProductsResponse } from '@/types/Product'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const search = ref<string>('')
  const selectedCategory = ref<string>('all')

  const categories = computed(() => {
    const set = new Set(products.value.map(p => p.category))
    return ['all', ...Array.from(set).sort()]
  })

  const filteredProducts = computed(() => {
    const q = search.value.trim().toLowerCase()
    return products.value.filter(p => {
      const matchesSearch =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)

      const matchesCategory =
        selectedCategory.value === 'all' || p.category === selectedCategory.value

      return matchesSearch && matchesCategory
    })
  })

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: ProductsResponse = await res.json()
      products.value = data.products
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    search,
    selectedCategory,
    categories,
    filteredProducts,
    fetchProducts,
  }
}