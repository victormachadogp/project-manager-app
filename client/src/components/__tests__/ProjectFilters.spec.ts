import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectFilters from '@/components/filters/ProjectFilters.vue'

describe('ProjectFilters', () => {
  it('emite o evento update:showFavorites quando o toggle de favoritos é alterado', async () => {
    const wrapper = mount(ProjectFilters, {
      props: {
        showFavorites: false,
        sortOption: 'alphabetical',
      },
    })

    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.emitted('update:showFavorites')?.[0]).toEqual([true])
  })

  it('emite o evento update:sortOption quando a opção de ordenação é alterada', async () => {
    const wrapper = mount(ProjectFilters, {
      props: {
        showFavorites: false,
        sortOption: 'alphabetical',
      },
    })

    // Clica no botão para abrir o dropdown
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    
    // Encontra e clica na opção 'startDate' pelos botões do dropdown
    const buttons = wrapper.findAll('button')
    const startDateButton = buttons.find(button => 
      button.text().includes('Iniciados mais recentes')
    )
    
    if (startDateButton) {
      await startDateButton.trigger('click')
    }
    
    expect(wrapper.emitted('update:sortOption')?.[0]).toEqual(['startDate'])
  })
})
