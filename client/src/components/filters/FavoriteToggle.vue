<template>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" :checked="modelValue" @change="onChange" class="sr-only peer" />
    <div
      class="relative w-12 h-6 bg-[#53525D] rounded-full peer peer-focus:ring-2 peer-focus:ring-yellow-300 peer-checked:after:translate-x-[25px] rtl:peer-checked:after:-translate-x-[30px] peer-checked:after:border-white after:content-[''] after:absolute after:top-1.5 after:start-1.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#FFB23D]"
    ></div>
    <span class="ms-3 text-sm font-medium text-[#717171]">Apenas favoritos</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement | null
  if (input) {
    emit('update:modelValue', input.checked)
  }
}
</script>
