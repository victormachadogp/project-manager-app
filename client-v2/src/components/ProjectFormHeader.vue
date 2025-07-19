<template>
  <div class="mb-5 pl-5 bg-[#fcfbfc] py-6 border-b border-[#efeef2] flex gap-8">
    <RouterLink to="/" class="text-sm text-[#09090B] flex items-center gap-2">
      <button class="flex gap-2 items-center px-3 rounded-md h-9 hover:bg-[#f4f4f5] cursor-pointer">
        <IconArrowLeft />
        Voltar
      </button>
    </RouterLink>
    <div>
      <h3 class="text-[#9b68f1] font-semibold text-2xl mt-2">
        {{ isEditing ? 'Editar Projeto' : 'Novo Projeto' }}
      </h3>
      <p class="text-[#71717a] mt-1">
        {{ isEditing ? '' : 'Crie um novo projeto para sua equipe' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconArrowLeft from './icons/IconArrowLeft.vue'

defineProps<{
  isEditing: boolean
}>()
</script>
