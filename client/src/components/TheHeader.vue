<template>
  <div class="bg-[#1C1930] shadow-custom">
    <div v-show="!showSearchBar" class="max-w-[1860px] mx-auto">
      <div class="flex justify-between items-center mx-5 sm:mx-12 max-h-[80px]">
        <div class="opacity-0"></div>
        <div class="flex items-center gap-2 text-white">
          <img class="my-4 sm:my-2 w-20 sm:w-18" src="../assets/logo-symbol.svg" alt="" />
          <p class="text-lg w-2/5">Gerenciador de Projetos</p>
        </div>
        <button @click="handleToggleSearchBar">
          <IconSearch class="text-white" />
        </button>
      </div>
    </div>

    <SearchBar ref="searchBarRef" v-show="showSearchBar" @close="toggleSearchBar" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import IconSearch from './icons/IconSearch.vue'
import SearchBar from './SearchBar.vue'
import { useSearch } from '@/composables/useSearch'

const searchBarRef = ref()
const { showSearchBar, toggleSearchBar, store } = useSearch()

const handleToggleSearchBar = async () => {
  const wasOpen = showSearchBar.value
  toggleSearchBar()
  
  if (!wasOpen && showSearchBar.value) {
    await nextTick()
    searchBarRef.value?.focusInput()
  }
}

onMounted(() => {
  store.loadRecentSearches()
})
</script>
