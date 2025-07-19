<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background border border-[#e4e4e7] text-[#717171] bg-[#f6f6f8] hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 gap-2"
      type="button"
      :aria-expanded="isOpen"
    >
      Ordenar: {{ getSortLabel(modelValue) }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-down h-4 w-4"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-50"
    >
      <div class="p-1">
        <button
          v-for="option in sortOptions"
          :key="option.value"
          @click="selectOption(option.value)"
          class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors rounded-sm"
          :class="{ 'bg-gray-50': modelValue === option.value }"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { ProjectSortOption } from '@/types/project'

defineProps<{
  modelValue: ProjectSortOption
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ProjectSortOption): void
}>()

const isOpen = ref(false)

const sortOptions = [
  { value: 'alphabetical' as ProjectSortOption, label: 'Ordem alfabética' },
  { value: 'startDate' as ProjectSortOption, label: 'Iniciados mais recentes' },
  { value: 'endDate' as ProjectSortOption, label: 'Prazo mais próximo' },
]

const getSortLabel = (value: ProjectSortOption): string => {
  const option = sortOptions.find((opt) => opt.value === value)
  return option?.label || 'Nome'
}

const selectOption = (value: ProjectSortOption) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
