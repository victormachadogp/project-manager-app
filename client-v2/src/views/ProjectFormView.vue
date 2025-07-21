<template>
  <div class="h-screen mx-auto">
    <ProjectFormHeader :is-editing="isEditing" @back="handleBack" />

    <form
      @submit.prevent="handleSubmit()"
      class="border border-[#efeef2] p-10 mx-auto rounded bg-[#fbf9fc] max-w-2xl"
    >
      <div class="max-w-2xl mx-auto flex flex-col justify-center">
        <BaseInput
          id="name"
          label="Nome do Projeto"
          placeholder="Digite o nome do projeto"
          v-model="form.name"
          :required="true"
          :error="errors.name"
        />

        <BaseInput
          id="client"
          label="Cliente"
          placeholder="Digite o nome do cliente"
          v-model="form.client"
          :required="true"
          :error="errors.client"
        />

        <div class="grid gap-6 mb-2 md:grid-cols-2">
          <div>
            <BaseInput
              id="startDate"
              label="Data de Início"
              type="date"
              v-model="form.startDate"
              :required="true"
              :error="errors.startDate"
              :icon="IconStartDate"
              input-class="[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>
          <div>
            <BaseInput
              id="endDate"
              label="Data Final"
              type="date"
              v-model="form.endDate"
              :required="true"
              :error="errors.endDate"
              :icon="IconEndDate"
              input-class="[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>
        </div>

        <ProjectImageUpload
          :image-preview="imagePreview"
          @upload="(event) => handleImageUpload(event)"
          @remove="removeImage"
        />

        <button
          class="flex justify-center items-center gap-2 text-white h-12 rounded-md mt-10 transition-colors duration-200 text-sm font-semibold shadow-lg"
          :class="
            hasAttemptedSubmit && !isFormValid
              ? 'bg-[#7d3ced]/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#7d3ced] to-[#9b69f2] cursor-pointer'
          "
          :disabled="hasAttemptedSubmit && !isFormValid"
          type="submit"
        >
          <IconSave />
          {{ loading ? 'Salvando...' : 'Salvar Projeto' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectFormHeader from '../components/ProjectFormHeader.vue'
import ProjectImageUpload from '../components/ProjectImageUpload.vue'
import BaseInput from '../components/BaseInput.vue'
import IconStartDate from '../components/icons/IconStartDate.vue'
import IconEndDate from '../components/icons/IconEndDate.vue'
import { useProjectForm } from '../composables/useProjectForm'
import { useProjectImage } from '../composables/useProjectImage'
import IconSave from '@/components/icons/IconSave.vue'

const route = useRoute()
const router = useRouter()
const {
  form,
  isEditing,
  loading,
  errors,
  hasAttemptedSubmit,
  isFormValid,
  handleSubmit: originalHandleSubmit,
  loadProject,
} = useProjectForm()

const handleSubmit = () => {
  return originalHandleSubmit({ pendingImageToDelete, deleteImageFromServer })
}

const handleBack = () => {
  resetPendingChanges()
  router.push('/')
}
const { imagePreview, handleImageUpload, removeImage, pendingImageToDelete, deleteImageFromServer, resetPendingChanges } = useProjectImage(form)

onMounted(async () => {
  await loadProject()
})

watch(
  () => route.params.id,
  async (newId) => {
    isEditing.value = !!newId
    if (newId) {
      await loadProject()
    }
  },
  { immediate: true },
)
</script>
