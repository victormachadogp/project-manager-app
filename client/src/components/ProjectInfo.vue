<template>
  <div class="p-5">
    <a href="#">
      <h5 class="mb-2 text-xl font-bold tracking-tight text-[#1F1283]">
        <template
          v-for="part in getHighlightedPartsForCurrentSearch(project.name)"
          :key="part.text"
        >
          <span v-if="!part.isHighlighted">{{ part.text }}</span>
          <span v-else class="bg-yellow-200">{{ part.text }}</span>
        </template>
      </h5>
    </a>
    <span class="mb-3 text-[#717171] font-bold"
      >Cliente:
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
</template>

<script setup lang="ts">
import type { Project } from '../types/project'
import { useHighlight } from '../composables/useHighlight'

const props = defineProps<{
  project: Project
}>()

const { getHighlightedPartsForCurrentSearch } = useHighlight()
</script>