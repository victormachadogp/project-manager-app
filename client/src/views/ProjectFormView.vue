<template>
  <div class="max-w-[1860px] mx-auto my-10">
    <ProjectFormHeader :is-editing="isEditing" />

    <form @submit.prevent="handleSubmit" class="border border-[#DCDCDC] p-10 mx-5 rounded">
      <div class="max-w-2xl mx-auto flex flex-col justify-center">
        <BaseInput
          id="name"
          label="Nome do projeto"
          v-model="form.name"
          :required="true"
          :error="errors.name"
        />

        <BaseInput
          id="client"
          label="Cliente"
          v-model="form.client"
          :required="true"
          :error="errors.client"
        />

        <div class="grid gap-6 mb-6 md:grid-cols-2">
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
          class="text-white py-2 rounded-full mt-10 transition-colors duration-200 h-13 text-xl"
          :class="
            hasAttemptedSubmit && !isFormValid
              ? 'bg-[#B2A8FF] cursor-not-allowed'
              : 'bg-[#695CCD] hover:bg-[#5648B0] cursor-pointer'
          "
          :disabled="hasAttemptedSubmit && !isFormValid"
          type="submit"
        >
          {{ loading ? 'Salvando...' : 'Salvar projeto' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProjectFormHeader from '../components/ProjectFormHeader.vue'
import ProjectImageUpload from '../components/ProjectImageUpload.vue'
import BaseInput from '../components/BaseInput.vue'
import IconStartDate from '../components/icons/IconStartDate.vue'
import IconEndDate from '../components/icons/IconEndDate.vue'
import { useProjectForm } from '../composables/useProjectForm'
import { useProjectImage } from '../composables/useProjectImage'

const route = useRoute()
const {
  form,
  isEditing,
  loading,
  errors,
  hasAttemptedSubmit,
  isFormValid,
  handleSubmit,
  loadProject,
} = useProjectForm()
const { imagePreview, handleImageUpload, removeImage } = useProjectImage(form)

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
