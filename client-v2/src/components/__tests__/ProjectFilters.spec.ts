import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ProjectFilters from '@/components/filters/ProjectFilters.vue'

describe('ProjectFilters', () => {
  it('emite o evento update:showFavorites quando o toggle de favoritos é alterado', async () => {
    const wrapper = mount(ProjectFilters, {
      props: {
        showFavorites: false,
        sortOption: 'alphabetical',
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          SearchBar: true,
          FavoriteToggle: true,
          SortSelect: true,
        },
      },
    })

    const favoriteToggle = wrapper.findComponent({ name: 'FavoriteToggle' })
    await favoriteToggle.vm.$emit('update:model-value', true)
    
    expect(wrapper.emitted('update:showFavorites')?.[0]).toEqual([true])
  })

  it('emite o evento update:sortOption quando a opção de ordenação é alterada', async () => {
    const wrapper = mount(ProjectFilters, {
      props: {
        showFavorites: false,
        sortOption: 'alphabetical',
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          SearchBar: true,
          FavoriteToggle: true,
          SortSelect: true,
        },
      },
    })

    const sortSelect = wrapper.findComponent({ name: 'SortSelect' })
    await sortSelect.vm.$emit('update:model-value', 'startDate')
    
    expect(wrapper.emitted('update:sortOption')?.[0]).toEqual(['startDate'])
  })
})
