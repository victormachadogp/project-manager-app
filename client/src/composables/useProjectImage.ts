import { ref, watch } from 'vue'
import { imageApi } from '../services/imageApi'
import type { ApiError } from '../types/error'

export function useProjectImage(form: { value: { coverImage: string } }) {
  const imagePreview = ref<string>(
    form.value.coverImage ? `http://localhost:3001${form.value.coverImage}` : ''
  )
  const error = ref<string | null>(null)
  const pendingImageToDelete = ref<string | null>(null)
  const originalImage = ref<string>(form.value.coverImage)

  watch(
    () => form.value.coverImage,
    (newValue) => {
      imagePreview.value = newValue ? `http://localhost:3001${newValue}` : ''
    },
  )

  async function handleImageUpload(event: Event) {
    error.value = null
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0]

      if (!file.type.match(/image\/(jpeg|png)/)) {
        error.value = 'Por favor, selecione apenas imagens JPG ou PNG'
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        error.value = 'A imagem deve ter no máximo 5MB'
        return
      }

      try {
        const imagePath = await imageApi.upload(file)
        imagePreview.value = `http://localhost:3001${imagePath}`
        form.value.coverImage = imagePath
      } catch (err) {
        const apiError = err as ApiError
        error.value = apiError.message || 'Erro ao fazer upload da imagem. Tente novamente.'
      }
    }
  }

  function removeImage() {
    error.value = null
    if (form.value.coverImage) {
      pendingImageToDelete.value = form.value.coverImage
      imagePreview.value = ''
      form.value.coverImage = ''

      const fileInput = document.getElementById('coverImage') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
    }
  }

  async function deleteImageFromServer(imagePath: string) {
    try {
      await imageApi.delete(imagePath)
    } catch (err) {
      console.error('Erro ao deletar imagem do servidor:', err)
    }
  }

  function resetPendingChanges() {
    if (pendingImageToDelete.value) {
      imagePreview.value = pendingImageToDelete.value ? `http://localhost:3001${pendingImageToDelete.value}` : ''
      form.value.coverImage = pendingImageToDelete.value
      pendingImageToDelete.value = null
    }
  }

  return {
    imagePreview,
    error,
    handleImageUpload,
    removeImage,
    deleteImageFromServer,
    resetPendingChanges,
    pendingImageToDelete,
    originalImage,
  }
}
