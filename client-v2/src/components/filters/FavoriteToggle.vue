<template>
  <button
    @click="toggleFavorite"
    :class="[
      'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-[#e4e4e7]',
      modelValue ? 'bg-purple-600 text-white' : 'bg-[#f6f6f8] text-gray-700 hover:bg-gray-200',
    ]"
  >
    <IconStar :filled="modelValue" :fill-color="modelValue ? 'white' : '#6b7280'" />
    Favoritos
  </button>
</template>

<script setup lang="ts">
import IconStar from '@/components/icons/IconStar.vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggleFavorite = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
