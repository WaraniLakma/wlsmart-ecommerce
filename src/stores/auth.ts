import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { LoginResponse } from '@/types/Auth'

const STORAGE_KEY = 'auth-v1'

function loadAuth(): LoginResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as LoginResponse
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<LoginResponse | null>(loadAuth())
  const loading = ref(false)
  const error = ref<string | null>(null)

  watch(user, (val) => {
    if (val) localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    else localStorage.removeItem(STORAGE_KEY)
  }, { deep: true })

  const isLoggedIn = computed(() => !!user.value?.accessToken)

  const login = async (username: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) throw new Error('Invalid username or password')
      const data = (await res.json()) as LoginResponse
      user.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed'
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
  }

  return { user, loading, error, isLoggedIn, login, logout }
})