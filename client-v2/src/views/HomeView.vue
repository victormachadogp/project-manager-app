<template>
  <div>
    <main class="my-15 flex justify-center h-screen max-w-[1860px] rounded mx-10.5 custom-height">
      <div
        v-if="projects.length === 0"
        class="flex items-center justify-center flex-col space-y-3 rounded"
      >
        <h3 class="text-[#1F1283] font-semibold text-4xl">Gerenciador de Projetos</h3>
        <span class="text-[#717171] text-muted-foreground text-lg max-w-md mx-auto"
          >Organize e gerencie seus projetos de forma eficiente</span
        >
        <RouterLink
          to="/project"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border bg-background hover:text-accent-foreground h-11 rounded-md px-8 border-[#e4e4e7] bg-[#7c3bed] text-white font-bold"
        >
          Novo Projeto
        </RouterLink>
      </div>

      <div class="mx-0 sm:mx-10 w-full" v-else>
        <div class="flex justify-between items-center flex-col sm:flex-row">
          <div class="flex items-center pb-4 sm:pb-0 gap-2">
            <h3 class="text-[#1F1283] text-2xl">Projetos</h3>
            <span class="text-[#695CCD]al text-sm relative top-px"
              >({{ filteredProjects.length }})</span
            >
          </div>

          <div class="flex gap-4 sm:flex-row flex-col">
            <ProjectFilters v-model:showFavorites="showOnlyFavorites" v-model:sortOption="sortBy" />
            <RouterLink
              to="/project"
              class="bg-[#695CCD] text-white p-5 py-3 rounded-full self-center flex items-center gap-3 whitespace-nowrap"
            >
              <IconAdd />
              Novo Projeto
            </RouterLink>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5 mt-5">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            @delete="openDeleteModal(project)"
          />
        </div>
      </div>

      <DeleteProjectModal
        v-if="showDeleteModal"
        :project="projectToDelete"
        @confirm="handleDeleteProject"
        @cancel="closeDeleteModal"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import DeleteProjectModal from '@/components/DeleteProjectModal.vue'
import ProjectFilters from '@/components/filters/ProjectFilters.vue'
import { useProjects } from '@/composables/useProjects'
import IconAdd from '@/components/icons/IconAdd.vue'

const {
  projects,
  filteredProjects,
  showDeleteModal,
  projectToDelete,
  showOnlyFavorites,
  sortBy,
  handleDeleteProject,
  initializeProjects,
  openDeleteModal,
  closeDeleteModal,
} = useProjects()

onMounted(() => {
  initializeProjects()
})
</script>

<style scoped>
.custom-height {
  height: calc(100vh - 180px);
}
</style>
