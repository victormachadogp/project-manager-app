<template>
  <div class="max-w-[346px] bg-white border border-[#DCDCDC] rounded-lg shadow pb-4">
    <ProjectImage
      :project="project"
      :imageUrl="imageUrl"
      :showOptions="showOptions"
      @toggleFavorite="toggleFavorite"
      @updateShowOptions="updateShowOptions"
      @handleImageError="handleImageError"
      @delete="handleDelete"
      ref="projectImageRef"
    />
    <ProjectInfo :project="project" />
    <ProjectDate :project="project" :formatDate="formatDate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Project } from '../types/project'
import { useProjectCard } from '../composables/useProjectCard'
import ProjectImage from './ProjectImage.vue'
import ProjectInfo from './ProjectInfo.vue'
import ProjectDate from './ProjectDate.vue'

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

const projectImageRef = ref()

const handleDelete = () => handleDeleteFromComposable(emit)
const updateShowOptions = (value: boolean) => {
  showOptions.value = value
}

onMounted(() => {
  if (projectImageRef.value?.dropdownButton) {
    dropdownRef.value = projectImageRef.value.dropdownButton
  }
})
</script>
