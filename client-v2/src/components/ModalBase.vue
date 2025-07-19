<template>
  <div
    id="default-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/80 bg-opacity-50 flex justify-center"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow flex flex-col items-center">
        <div class="p-4 md:p-5 space-y-4 flex flex-row items-center gap-4">
          <div
            v-if="icon"
            :class="[
              'w-12 h-12 rounded-full flex justify-center items-center',
              iconBackgroundClass,
            ]"
          >
            <component :is="icon" :style="{ color: iconColor }" />
          </div>
          <div class="text-left">
            <h3 class="text-lg font-semibold text-[#0a0a0b]">
              {{ title }}
            </h3>
            <slot></slot>
          </div>
        </div>
        <div v-if="$slots.description" class="px-4 md:px-5 pb-4">
          <slot name="description"></slot>
        </div>
        <div class="flex items-center p-4 md:p-5 rounded-b gap-4 w-full justify-end">
          <button
            v-if="showCancelButton"
            @click="$emit('cancel')"
            type="button"
            class="py-2.5 h-10 px-5 ms-3 text-sm font-medium text-[#71717a] font-medium focus:outline-none bg-white rounded-md border border-[#e4e4e7] focus:z-10 focus:ring-4 focus:ring-gray-100 cursor-pointer"
          >
            {{ cancelText }}
          </button>
          <button
            @click="$emit('confirm')"
            type="button"
            class="text-white h-10 bg-[#ef4544] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center cursor-pointer"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component } from 'vue'

interface Props {
  title: string
  icon?: Component
  iconBackgroundClass?: string
  iconColor?: string
  showCancelButton?: boolean
  cancelText?: string
  confirmText?: string
}

withDefaults(defineProps<Props>(), {
  showCancelButton: true,
  cancelText: 'Cancelar',
  confirmText: 'Excluir Projeto',
  iconBackgroundClass: 'bg-[#f6e7e8]',
  iconColor: '#000000',
})

defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()
</script>
