<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <!-- <TheHeader /> -->
  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  background-color: #f6f6f7;
  font-family: 'Encode Sans Expanded', sans-serif;
}
</style>
