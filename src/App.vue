<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white ">
    <NavBar />
    <RouterView />
  </div>
</template>
