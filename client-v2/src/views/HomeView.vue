<template>
  <div>
    <main
      class="py-8 px-4 flex justify-center h-screen max-w-[1860px] mx-auto rounded custom-height"
    >
      <div
        v-if="projects.length === 0"
        class="flex items-center justify-center flex-col space-y-3 rounded"
      >
        <h3
          class="bg-clip-text text-transparent font-semibold text-4xl bg-gradient-to-r from-[#7d3ced] to-[#9b69f2]"
        >
          Gerenciador de Projetos
        </h3>
        <span class="text-[#717171] text-muted-foreground text-lg max-w-md mx-auto"
          >Organize e gerencie seus projetos de forma eficiente</span
        >
        <RouterLink
          to="/project"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border bg-background hover:text-accent-foreground h-11 rounded-md px-8 border-[#e4e4e7] bg-gradient-to-r from-[#7d3ced] to-[#9b69f2] text-white font-bold"
        >
          Criar Projeto
        </RouterLink>
      </div>

      <div class="w-full xl:container mx-auto px-4 2xl:px-20" v-else>
        <ProjectsHeader :project-count="filteredProjects.length" />

        <div
          class="flex justify-between items-center flex-col sm:flex-row p-4 bg-white border border-[#efeef2] rounded-lg mb-8"
        >
          <div class="flex gap-4 sm:flex-row flex-col w-full">
            <ProjectFilters v-model:showFavorites="showOnlyFavorites" v-model:sortOption="sortBy" />
            <RouterLink
              to="/project"
              class="bg-gradient-to-r from-[#7d3ced] to-[#9b69f2] text-white px-4 py-2 rounded-md self-center flex items-center gap-3 whitespace-nowrap text-sm"
            >
              <IconAdd />
              Novo Projeto
            </RouterLink>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pb-10">
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
import ProjectsHeader from '@/components/ProjectsHeader.vue'

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

<style scoped></style>
