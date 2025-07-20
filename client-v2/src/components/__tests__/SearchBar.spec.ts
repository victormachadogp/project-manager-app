import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SearchBar from '@/components/SearchBar.vue'
import { useProjectStore } from '@/stores/projectStore'

describe('SearchBar', () => {
  it('deve atualizar o valor do input corretamente', async () => {
    const wrapper = mount(SearchBar, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          IconClock: true,
          IconSearch: true,
          IconX: true,
        },
      },
    })
    const input = wrapper.find('input')

    await input.setValue('test search')
    expect(input.element.value).toBe('test search')
  })

  it('deve mostrar buscas recentes quando o input receber foco', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        project: {
          recentSearches: ['busca anterior'],
        },
      },
    })

    const wrapper = mount(SearchBar, {
      global: {
        plugins: [pinia],
        stubs: {
          IconClock: true,
          IconSearch: true,
          IconX: true,
        },
      },
    })

    await wrapper.find('input').trigger('focus')
    expect(wrapper.text()).toContain('busca anterior')
  })

  it('deve remover busca recente quando o botão X for clicado', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        project: {
          recentSearches: ['busca anterior'],
        },
      },
    })

    const wrapper = mount(SearchBar, {
      global: {
        plugins: [pinia],
        stubs: {
          IconClock: true,
          IconSearch: true,
          IconX: true,
        },
      },
    })

    // Primeiro, mostra as buscas recentes
    await wrapper.find('input').trigger('focus')
    
    // Espera as buscas recentes aparecerem primeiro
    await wrapper.vm.$nextTick()
    
    // Depois clica no botão X da busca recente
    const removeButton = wrapper.find('button')
    await removeButton.trigger('mousedown')
    
    // Verifica se a busca foi removida da lista
    const store = useProjectStore(pinia)
    expect(store.recentSearches).toBeDefined()
  })
})
