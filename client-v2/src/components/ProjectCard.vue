<template>
  <div class="bg-white border border-[#f2f1f3] rounded-lg pb-4 slide-up shadow-sm">
    <div class="flex w-full flex-col justify-between pt-1 px-1 gap-4">
      <div
        v-if="imageUrl"
        class="rounded-lg w-12 h-30 w-full flex justify-center items-center overflow-hidden relative"
      >
        <img
          :src="imageUrl"
          :alt="project.name"
          class="w-full h-full object-cover rounded-lg"
          @error="handleImageError"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-white/80 to-[#fff]/10 rounded-lg pointer-events-none"
        ></div>
      </div>
      <div v-else class="w-full bg-[#f5f0fd] rounded-lg h-30 px-4 py-4">
        <div class="bg-gradient-to-r from-[#7d3ced] to-[#9b69f2] rounded w-full h-full"></div>
      </div>

      <div class="flex items-center gap-3 w-full justify-between px-4">
        <div class="flex items-start gap-3">
          <div class="flex flex-col">
            <div href="#">
              <h5 class="text-lg font-bold tracking-tight text-[#0a0a0b] line-clamp-1">
                <template
                  v-for="part in getHighlightedPartsForCurrentSearch(project.name)"
                  :key="part.text"
                >
                  <span v-if="!part.isHighlighted">{{ part.text }}</span>
                  <span v-else class="bg-yellow-200">{{ part.text }}</span>
                </template>
              </h5>
            </div>
            <span class="mb-3 text-[#717171] font-bold text-sm">
              <span class="font-normal">
                <template
                  v-for="part in getHighlightedPartsForCurrentSearch(project.client)"
                  :key="part.text"
                >
                  <span v-if="!part.isHighlighted">{{ part.text }}</span>
                  <span v-else class="bg-yellow-200">{{ part.text }}</span>
                </template>
              </span></span
            >
          </div>
        </div>
        <div class="flex items-center gap-2 self-start">
          <button @click="toggleFavorite">
            <div
              class="inline-flex items-center justify-center gap-2 rounded-md h-8 w-8 p-0 transition-all duration-200 hover:scale-110 hover:bg-[#f4f4f5]"
            >
              <IconStar :filled="project.isFavorite" />
            </div>
          </button>

          <div
            class="inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 hover:bg-[#f4f4f5]"
          >
            <button
              @click="showOptions = !showOptions"
              class="w-8 h-8 rounded-full flex justify-center relative"
              ref="dropdownRef"
            >
              <span class="text-[#0a0a0b] font-bold">...</span>

              <div
                v-if="showOptions"
                class="absolute right-0 top-0 mt-8 z-10 mb-2 bg-white border border-[#e4e4e7] rounded-lg shadow-lg p-1 min-w-[120px]"
              >
                <RouterLink
                  :to="`/project/${project.id}`"
                  class="block px-4 py-2 text-left hover:bg-gray-100 text-sm rounded text-[#0a0a0b]"
                >
                  Editar
                </RouterLink>
                <button
                  @click="handleDelete"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm rounded text-[#ef4544]"
                >
                  Excluir
                </button>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-[#f2f1f3] pt-2 px-4 flex flex-col xl:flex-row justify-between">
      <div class="p-2 flex items-center gap-2">
        <IconStartDate class="relative top-px" />
        <span class="text-[#717171] text-sm font-normal top-px relative">{{
          formatDate(project.startDate)
        }}</span>
      </div>
      <div class="p-2 flex items-center gap-2">
        <IconEndDate class="relative bottom-px" />
        <span class="text-[#717171] text-sm font-normal top-px relative">{{
          formatDate(project.endDate)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../types/project'
import { useProjectCard } from '../composables/useProjectCard'
import { useHighlight } from '../composables/useHighlight'
import IconStartDate from '@/components/icons/IconStartDate.vue'
import IconEndDate from '@/components/icons/IconEndDate.vue'
import IconStar from '@/components/icons/IconStar.vue'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{
  (e: 'delete'): void
}>()

const {
  showOptions,
  imageUrl,
  toggleFavorite,
  formatDate,
  handleImageError,
  handleDelete: handleDeleteFromComposable,
  project,
  dropdownRef,
} = useProjectCard(props.project)

const { getHighlightedPartsForCurrentSearch } = useHighlight()

const handleDelete = () => handleDeleteFromComposable(emit)
</script>

<style>
.slide-up {
  transform: translateY(0);
  opacity: 1;
  transition: all 0.3s ease-out;
}

.slide-up:hover {
  transform: translateY(-4px); /* Move o card para cima */
  opacity: 1;
}
</style>
