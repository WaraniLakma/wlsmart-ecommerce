import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Product } from '@/types/Product'

export interface CartItem {
  product: Product
  qty: number
}

const STORAGE_KEY = 'cart-v1'

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadCart())

  watch(
    items,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true }
  )

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty * i.product.price, 0)
  )

  const addToCart = (product: Product) => {
    const found = items.value.find(i => i.product.id === product.id)
    if (found) found.qty += 1
    else items.value.push({ product, qty: 1 })
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter(i => i.product.id !== productId)
  }

  const increaseQty = (productId: number) => {
    const found = items.value.find(i => i.product.id === productId)
    if (found) found.qty += 1
  }

  const decreaseQty = (productId: number) => {
    const found = items.value.find(i => i.product.id === productId)
    if (!found) return
    found.qty -= 1
    if (found.qty <= 0) removeFromCart(productId)
  }

  const clearCart = () => {
    items.value = []
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }
})
