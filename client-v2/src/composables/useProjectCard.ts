import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Project } from '../types/project'
import { useProjectStore } from '../stores/projectStore'
import defaultBackground from '../assets/default-background.png'

export function useProjectCard(initialProject: Project) {
  const store = useProjectStore()
  const showOptions = ref(false)
  const project = ref({ ...initialProject })
  const dropdownRef = ref<HTMLElement | null>(null)

  const imageUrl = computed(() => {
    if (!project.value.coverImage) return null
    return `http://localhost:3001${project.value.coverImage}`
  })

  async function toggleFavorite() {
    const updatedProject = {
      ...project.value,
      isFavorite: !project.value.isFavorite,
    }

    // Atualiza o estado local imediatamente
    project.value = updatedProject

    try {
      // Atualiza no store
      await store.updateProject(updatedProject)
    } catch (error) {
      project.value = { ...initialProject }
      console.error('Erro ao atualizar favorito:', error)
    }
  }

  function formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    const localDate = new Date(date + 'T00:00:00')
    return localDate.toLocaleDateString('pt-BR', options)
  }

  function handleDelete(emit: (event: 'delete') => void) {
    showOptions.value = false
    emit('delete')
  }

  function handleImageError(event: Event) {
    const target = event.target as HTMLElement
    target.style.backgroundImage = `url(${defaultBackground})`
  }

  const handleClickOutside = (event: Event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      showOptions.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    showOptions,
    defaultBackground,
    imageUrl,
    toggleFavorite,
    formatDate,
    handleDelete,
    handleImageError,
    project, // Exporta o ref do projeto
    dropdownRef, // Exporta a ref do dropdown
  }
}
