<template>
  <div class="mb-6">
    <label
      :for="id"
      class="block mb-1 text-lg font-medium"
      :class="error ? 'text-[#9F0000]' : 'text-[#695CCD]'"
    >
      {{ label }}
      <span
        class="text-sm ml-1 text-[#717171] font-light"
        :class="error ? 'text-[#C40000]' : 'text-[#717171]'"
        >({{ required ? 'Obrigatório' : 'Opcional' }})</span
      >
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        class="bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
        :class="[
          error ? 'border border-[#C40000]' : 'border border-gray-300 focus:border-blue-500',
          icon ? 'pr-10' : '',
          inputClass,
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs"
      />
      <div
        v-if="icon"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <component :is="icon" />
      </div>
    </div>
    <span v-if="error" class="text-sm text-[#C40000] mt-1">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  id: string
  label: string
  modelValue: string
  type?: string
  required?: boolean
  error?: string
  icon?: Component
  inputClass?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  error: '',
  inputClass: '',
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

defineOptions({
  inheritAttrs: false,
})
</script>
