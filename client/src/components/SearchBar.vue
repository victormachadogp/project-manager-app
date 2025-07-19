<template>
  <div class="relative">
    <div
      class="px-3 bg-white flex items-center gap-3 py-1 h-[80px]"
      :class="{
        'border-x rounded-t-lg ': showRecentSearches && store.recentSearches.length > 0,
      }"
    >
      <IconSearch class="text-[#695CCD]" />
      <input
        ref="inputRef"
        v-model="searchInput"
        class="w-full py-2 !outline-none"
        placeholder="Digite o nome do projeto..."
        type="text"
        @focus="showRecentSearches = true"
        @blur="handleBlur"
      />
      <button @click="$emit('close')">
        <IconX class="size-6" />
      </button>
    </div>

    <div
      class="absolute w-full mt-[-3px] border shadow-lg z-50 bg-white"
      :class="{
        'rounded-b-lg border-t-[#F4F2FF]': showRecentSearches && store.recentSearches.length > 0,
        ' border-[#695CCD]': !(showRecentSearches && store.recentSearches.length > 0),
      }"
    >
      <div
        v-for="search in store.recentSearches"
        :key="search"
        class="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-[#F4F2FF] last:rounded-b-none last:border-b-0"
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
import { ref, onMounted, onUnmounted } from 'vue'
import IconClock from './icons/IconClock.vue'
import IconSearch from './icons/IconSearch.vue'
import IconX from './icons/IconX.vue'
import { useSearch } from '@/composables/useSearch'

const emit = defineEmits<{
  close: []
}>()

const searchBarRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()

const {
  searchInput,
  showRecentSearches,
  store,
  selectRecentSearch,
  removeRecentSearch,
  handleBlur,
} = useSearch()

const focusInput = () => {
  inputRef.value?.focus()
}

const handleClickOutside = (event: MouseEvent) => {
  if (searchBarRef.value && !searchBarRef.value.contains(event.target as Node)) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

defineExpose({
  focusInput,
})
</script>
