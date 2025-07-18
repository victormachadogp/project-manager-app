<template>
  <div>
    <div v-if="!imagePreview">
      <span class="text-[#09090B]">Capa do projeto</span>
      <div
        class="flex flex-col items-center space-y-4 border border-dotted border-[#717171] p-5 mt-2"
      >
        <div class="bg-[#f4f4f5] py-5 px-5 rounded-full flex items-center justify-center">
          <IconImage stroke="#71717a" />
        </div>
        <span class="text-[#0a0a0b] text-sm font-semibold">
          Clique para fazer upload ou arraste uma imagem</span
        >
        <span class="text-[#717171] text-xs">Formatos suportados: JPG, PNG, GIF (máx. 5MB)</span>
        <input
          type="file"
          id="coverImage"
          accept="image/jpeg, image/png"
          class="hidden"
          @change="$emit('upload', $event)"
        />
        <label
          for="coverImage"
          class="bg-[#f6f6f8] text-sm border border-[#e4e4e7] rounded px-8 py-2 text-[#19191c] cursor-pointer hover:bg-[#695CCD] hover:text-white transition-colors font-medium"
        >
          Selecionar Imagem
        </label>
      </div>
    </div>
    <div v-if="imagePreview" class="relative rounded overflow-hidden max-w-[702px] max-h-[395px]">
      <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover mb-4" />
      <button
        type="button"
        @click="$emit('remove')"
        class="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md m-3 hover:bg-gray-100 transition-colors"
      >
        <IconTrash class="text-[#695CCD]" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconImage from '@/components/icons/IconImage.vue'
import IconTrash from '@/components/icons/IconTrash.vue'

defineProps<{
  imagePreview: string
}>()

defineEmits<{
  (e: 'upload', event: Event): void
  (e: 'remove'): void
}>()
</script>
