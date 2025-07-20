<template>
  <div class="relative min-w-0 flex-1">
    <div class="px-3 border border-[#e4e4e7] flex items-center gap-3 rounded-lg bg-[#f9f8f9]">
      <IconSearch class="text-[#71717a] w-4" />
      <input
        v-model="searchInput"
        class="w-full py-3 !outline-none h-10 text-sm"
        placeholder="Buscar projetos..."
        type="text"
        @focus="showRecentSearches = true"
        @blur="handleBlur"
      />
    </div>

    <div
      v-if="showRecentSearches && store.recentSearches.length > 0"
      class="absolute w-full mt-1 bg-white border border-[#DCDCDC] rounded-lg shadow-lg z-50"
    >
      <div
        v-for="search in store.recentSearches"
        :key="search"
        class="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer"
        @mousedown="selectRecentSearch(search)"
      >
        <div class="flex items-center gap-2">
          <IconClock />
          <span class="text-[#717171]">{{ search }}</span>
        </div>
        <button
          @mousedown.stop="removeRecentSearch(search)"
          class="text-gray-400 hover:text-gray-600"
        >
          <IconX class="size-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconClock from './icons/IconClock.vue'
import IconSearch from './icons/IconSearch.vue'
import IconX from './icons/IconX.vue'
import { useSearch } from '@/composables/useSearch'

const {
  searchInput,
  showRecentSearches,
  store,
  selectRecentSearch,
  removeRecentSearch,
  handleBlur,
} = useSearch()
</script>
