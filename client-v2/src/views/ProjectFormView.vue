<template>
  <div class="max-w-[1860px] mx-auto">
    <ProjectFormHeader :is-editing="isEditing" />

    <form
      @submit.prevent="handleSubmit"
      class="border border-[#efeef2] p-10 mx-auto rounded bg-[#fbf9fc] max-w-2xl"
    >
      <div class="max-w-2xl mx-auto flex flex-col justify-center">
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 font-semibold"
            :class="errors.name ? 'text-[#9F0000]' : 'text-[#09090B]'"
          >
            Nome do Projeto
            <span
              class="text-xs text-[#717171] font-light"
              :class="errors.name ? 'text-[#C40000]' : 'text-[#717171]'"
              >(Obrigatório)</span
            >
          </label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Digite o nome do projeto"
            class="bg-[#f6f6f8] text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-3"
            :class="
              errors.name
                ? 'border border-[#C40000]'
                : 'border border-gray-300 focus:border-blue-500'
            "
          />
          <span v-if="errors.name" class="text-sm text-[#C40000] mt-1">{{ errors.name }}</span>
        </div>

        <div class="mb-6">
          <label
            for="client"
            class="block mb-2 font-semibold"
            :class="errors.client ? 'text-[#9F0000]' : 'text-[#09090B]'"
          >
            Cliente
            <span
              class="text-xs text-[#717171] font-light"
              :class="errors.client ? 'text-[#C40000]' : 'text-[#717171]'"
              >(Obrigatório)</span
            >
          </label>
          <input
            v-model="form.client"
            type="text"
            id="client"
            placeholder="Digite o nome do cliente"
            class="bg-[#f6f6f8] text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-3"
            :class="
              errors.client
                ? 'border border-[#C40000]'
                : 'border border-gray-300 focus:border-blue-500'
            "
          />
          <span v-if="errors.client" class="text-sm text-[#C40000] mt-1">{{ errors.client }}</span>
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="startDate"
              class="block mb-2 font-semibold"
              :class="errors.startDate ? 'text-[#9F0000]' : 'text-[#09090B]'"
            >
              Data de Início
              <span
                class="text-xs text-[#717171] font-light"
                :class="errors.startDate ? 'text-[#C40000]' : 'text-[#717171]'"
                >(Obrigatório)</span
              >
            </label>
            <div class="relative">
              <input
                v-model="form.startDate"
                type="date"
                id="startDate"
                class="bg-[#f6f6f8] text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-3 pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                :class="
                  errors.startDate
                    ? 'border border-[#C40000]'
                    : 'border border-gray-300 focus:border-blue-500'
                "
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <IconStartDate />
              </div>
            </div>
            <span v-if="errors.startDate" class="text-sm text-[#C40000] mt-1">{{
              errors.startDate
            }}</span>
          </div>
          <div>
            <label
              for="endDate"
              class="block mb-2 font-semibold"
              :class="errors.endDate ? 'text-[#9F0000]' : 'text-[#09090B]'"
            >
              Data Final
              <span
                class="text-xs text-[#717171] font-light"
                :class="errors.endDate ? 'text-[#C40000]' : 'text-[#717171]'"
                >(Obrigatório)</span
              >
            </label>
            <div class="relative">
              <input
                v-model="form.endDate"
                type="date"
                id="endDate"
                class="bg-[#f6f6f8] text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-3 pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                :class="
                  errors.endDate
                    ? 'border border-[#C40000]'
                    : 'border border-gray-300 focus:border-blue-500'
                "
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <IconEndDate />
              </div>
            </div>
            <span v-if="errors.endDate" class="text-sm text-[#C40000] mt-1">{{
              errors.endDate
            }}</span>
          </div>
        </div>

        <ProjectImageUpload
          :image-preview="imagePreview"
          @upload="(event) => handleImageUpload(event)"
          @remove="removeImage"
        />

        <button
          class="text-white py-2 rounded-full mt-10 transition-colors duration-200"
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
