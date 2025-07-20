<template>
  <div class="border-t border-[#ECECEC] mx-3 pt-2">
    <div class="p-2 flex items-center gap-4">
      <IconStartDate />
      <span class="text-[#717171] font-normal top-px relative">{{
        formatDate(project.startDate)
      }}</span>
    </div>
    <div class="p-2 flex items-center gap-4">
      <IconEndDate />
      <span class="text-[#717171] font-normal top-px relative">{{
        formatDate(project.endDate)
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../types/project'
import IconStartDate from '@/components/icons/IconStartDate.vue'
import IconEndDate from '@/components/icons/IconEndDate.vue'

const props = defineProps<{
  project: Project
  formatDate: (date: string) => string
}>()
</script>