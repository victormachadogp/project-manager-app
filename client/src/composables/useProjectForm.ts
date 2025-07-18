import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import type { Project, ProjectFormData, ProjectFormErrors } from '../types/project'

export function useProjectForm() {
  const route = useRoute()
  const router = useRouter()
  const store = useProjectStore()

  const isEditing = ref(false)
  const loading = ref(false)
  const hasAttemptedSubmit = ref(false)
  const form = ref<ProjectFormData>({
    name: '',
    client: '',
    startDate: '',
    endDate: '',
    coverImage: '',
  })
  const errors = ref<ProjectFormErrors>({})

  const isFormValid = computed(() => {
    const nameWords = form.value.name.trim().split(/\s+/)
    const hasValidName = nameWords.length >= 2
    const hasValidClient = form.value.client.trim() !== ''
    const hasValidStartDate = form.value.startDate !== ''
    const hasValidEndDate = form.value.endDate !== ''
    const hasValidDateRange =
      !form.value.startDate ||
      !form.value.endDate ||
      new Date(form.value.startDate) <= new Date(form.value.endDate)

    return (
      hasValidName && hasValidClient && hasValidStartDate && hasValidEndDate && hasValidDateRange
    )
  })

  function validateForm(): boolean {
    errors.value = {}

    // Validação do nome do projeto (pelo menos duas palavras)
    const nameWords = form.value.name.trim().split(/\s+/)
    if (nameWords.length < 2) {
      errors.value.name = 'Por favor, digite ao menos duas palavras'
    }

    // Validação do cliente (pelo menos uma palavra)
    if (!form.value.client.trim()) {
      errors.value.client = 'Por favor, digite ao menos uma palavra'
    }

    // Validação da data de início
    if (!form.value.startDate) {
      errors.value.startDate = 'Selecione uma data válida'
    }

    // Validação da data final
    if (!form.value.endDate) {
      errors.value.endDate = 'Selecione uma data válida'
    }

    // Validação adicional para datas
    if (
      form.value.startDate &&
      form.value.endDate &&
      new Date(form.value.startDate) > new Date(form.value.endDate)
    ) {
      errors.value.endDate = 'Data final deve ser posterior à data de início'
    }

    return Object.keys(errors.value).length === 0
  }

  async function handleSubmit() {
    hasAttemptedSubmit.value = true
    validateForm()
    if (Object.keys(errors.value).length > 0) return

    loading.value = true
    try {
      if (isEditing.value) {
        const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

        await store.updateProject({
          id,
          ...form.value,
          isFavorite: false,
          createdAt: new Date().toISOString(),
        } as Project)
      } else {
        await store.createProject(form.value)
      }
      router.push('/')
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      loading.value = false
    }
  }

  async function loadProject() {
    const projectId = route.params.id
    if (!projectId) return

    const id = typeof projectId === 'string' ? projectId : projectId[0]
    if (!id) return

    try {
      const projectData = await store.fetchProjectById(id)

      if (projectData) {
        form.value.name = projectData.name
        form.value.client = projectData.client
        form.value.startDate = projectData.startDate
        form.value.endDate = projectData.endDate
        form.value.coverImage = projectData.coverImage

        errors.value.name = ''
        errors.value.client = ''
        errors.value.startDate = ''
        errors.value.endDate = ''
      }
    } catch (error) {
      console.error('Erro ao carregar o projeto:', error)
    } finally {
      loading.value = false
    }
  }

  // Watchers para limpar erros dinamicamente quando campos ficam válidos
  watch(() => form.value.name, (newName) => {
    if (hasAttemptedSubmit.value) {
      const nameWords = newName.trim().split(/\s+/)
      if (nameWords.length >= 2) {
        errors.value.name = ''
      }
    }
  })

  watch(() => form.value.client, (newClient) => {
    if (hasAttemptedSubmit.value) {
      if (newClient.trim() !== '') {
        errors.value.client = ''
      }
    }
  })

  watch(() => form.value.startDate, (newStartDate) => {
    if (hasAttemptedSubmit.value) {
      if (newStartDate !== '') {
        errors.value.startDate = ''
      }
    }
  })

  watch(() => form.value.endDate, (newEndDate) => {
    if (hasAttemptedSubmit.value) {
      if (newEndDate !== '') {
        errors.value.endDate = ''
        // Verificar se a data final ainda é válida em relação à data inicial
        if (form.value.startDate && new Date(form.value.startDate) > new Date(newEndDate)) {
          errors.value.endDate = 'Data final deve ser posterior à data de início'
        }
      }
    }
  })

  // Watcher para verificar se a data inicial mudou e pode afetar a validação da data final
  watch(() => form.value.startDate, (newStartDate) => {
    if (hasAttemptedSubmit.value && form.value.endDate && newStartDate) {
      if (new Date(newStartDate) <= new Date(form.value.endDate)) {
        errors.value.endDate = ''
      }
    }
  })

  return {
    form,
    errors,
    isEditing,
    loading,
    hasAttemptedSubmit,
    isFormValid,
    handleSubmit,
    loadProject,
  }
}
