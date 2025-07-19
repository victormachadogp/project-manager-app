<template>
  <ModalBase
    title="Excluir Projeto"
    :icon="IconWarning"
    icon-color="#ff0000"
    @confirm="$emit('confirm')"
    @cancel="$emit('cancel')"
  >
    <p class="text-sm leading-relaxed text-gray-500">
      Tem certeza que deseja excluir o projeto "{{ project?.name }}"?
    </p>

    <template #description>
      <p class="text-sm text-[#717171]">
        Esta ação não pode ser desfeita. Todos os dados do projeto serão permanentemente removidos.
      </p>
    </template>
  </ModalBase>
</template>

<script setup lang="ts">
import ModalBase from './ModalBase.vue'
import IconWarning from './icons/IconWarning.vue'
import type { Project } from '../types/project'

defineProps<{
  project: Project | null
}>()

defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()
</script>
