<template>
  <div
    class="flex justify-between items-center flex-col sm:flex-row mb-8 bg-white rounded-2xl overflow-hidden"
  >
    <div class="projects-header flex flex-col pb-4 gap-2 w-full p-8 md:p-12">
      <div class="max-w-2xl">
        <div class="flex items-end gap-2">
          <div class="flex items-center justify-center bg-[#9661f0] rounded-xl w-14 h-14 p-2">
            <IconFolder class="h-7 w-7 text-primary-foreground text-white" />
          </div>
          <h3 class="text-[#0a0a0b] text-4xl md:text-5xl font-bold">Projetos</h3>
          <span class="text-[#71717a] text-2xl md:text-2xl font-bold">({{ projectCount }})</span>
        </div>

        <div>
          <p class="text-lg text-[#71717a]">
            Gerencie seus projetos de forma inteligente e acompanhe o progresso da sua equipe em
            tempo real.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconFolder from '@/components/icons/IconFolder.vue'

interface Props {
  projectCount: number
}

defineProps<Props>()
</script>

<style scoped>
.projects-header {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.94), rgb(255 255 255 / 52%)),
    url(/src/assets/background-projects.jpeg);
  background-size: cover;
  background-position: center center;
  background-repeat: multiply;
}
</style>
