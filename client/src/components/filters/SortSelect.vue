<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center justify-between whitespace-nowrap text-lg font-medium ring-offset-background text-[#717171] bg-white hover:bg-accent hover:text-accent-foreground h-10 px-3 gap-2 min-w-[296px]"
      :class="{
        'border-x border-t border-[#695CCD] rounded-t': isOpen,
        'border border-[#DCDCDC] rounded-md': !isOpen,
      }"
      type="button"
      :aria-expanded="isOpen"
    >
      {{ getSortLabel(modelValue) }}
      <IconChevronDown
        class="transition-transform duration-200 w-8 h-8 stroke-1 relative top-px text-[#695CCD]"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full left-0 w-full min-w-[296px] bg-white border border-[#695CCD] rounded-b-md shadow-lg z-50"
    >
      <div class="">
        <button
          v-for="option in sortOptions"
          :key="option.value"
          @click="selectOption(option.value)"
          class="w-full text-left px-3 py-2 text-normal hover:bg-gray-100 transition-colors h-13 border-b border-[#ECECEC] last:rounded-b-none last:border-b-0"
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
import IconChevronDown from '@/components/icons/IconChevronDown.vue'

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
