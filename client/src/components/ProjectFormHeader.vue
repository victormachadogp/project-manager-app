<template>
  <div class="mb-5 pl-5">
    <button @click="$emit('back')" class="text-sm text-[#695CCD] hover:underline flex items-center gap-2">
      <IconArrowLeft />
      Voltar
    </button>
    <h3 class="text-[#1F1283] font-semibold text-2xl mt-2">
      {{ isEditing ? 'Editar Projeto' : 'Novo Projeto' }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import IconArrowLeft from './icons/IconArrowLeft.vue'

defineProps<{
  isEditing: boolean
}>()

defineEmits<{
  (e: 'back'): void
}>()
</script>
