<template>
  <div class="flex flex-1 items-center gap-4 flex-col sm:flex-row">
    <SearchBar />
    <div class="flex items-center gap-4">
      <FavoriteToggle
        :model-value="showFavorites"
        @update:model-value="$emit('update:showFavorites', $event)"
      />

      <SortSelect
        :model-value="sortOption"
        @update:model-value="$emit('update:sortOption', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectSortOption } from '@/types/project'
import FavoriteToggle from './FavoriteToggle.vue'
import SortSelect from './SortSelect.vue'
import SearchBar from '../SearchBar.vue'

defineProps<{
  showFavorites: boolean
  sortOption: ProjectSortOption
}>()

defineEmits<{
  (e: 'update:showFavorites', value: boolean): void
  (e: 'update:sortOption', value: ProjectSortOption): void
}>()
</script>
