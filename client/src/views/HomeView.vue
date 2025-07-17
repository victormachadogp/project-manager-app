<template>
  <TheHeader />

  <ProjectFilters v-model:showFavorites="showOnlyFavorites" v-model:sortOption="sortBy" />

  <ProjectCard />
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectFilters from '@/components/filters/ProjectFilters.vue'
</script>
