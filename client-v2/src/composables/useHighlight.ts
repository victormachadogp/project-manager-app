import { computed } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

export function useHighlight() {
  const store = useProjectStore()

  const highlightText = (text: string, query: string = '') => {
    if (!query || query.length < 3) return text
    
    const searchQuery = query.toLowerCase()
    const textLower = text.toLowerCase()
    const index = textLower.indexOf(searchQuery)
    
    if (index === -1) return text
    
    return text.substring(0, index) + 
           text.substring(index, index + query.length) + 
           text.substring(index + query.length)
  }

  const getHighlightedParts = (text: string, query: string = '') => {
    if (!query || query.length < 3) {
      return [{ text, isHighlighted: false }]
    }
    
    const searchQuery = query.toLowerCase()
    const textLower = text.toLowerCase()
    const index = textLower.indexOf(searchQuery)
    
    if (index === -1) {
      return [{ text, isHighlighted: false }]
    }
    
    const parts = []
    
    if (index > 0) {
      parts.push({ text: text.substring(0, index), isHighlighted: false })
    }
    
    parts.push({ 
      text: text.substring(index, index + query.length), 
      isHighlighted: true 
    })
    
    if (index + query.length < text.length) {
      parts.push({ 
        text: text.substring(index + query.length), 
        isHighlighted: false 
      })
    }
    
    return parts
  }

  const getHighlightedPartsForCurrentSearch = computed(() => {
    return (text: string) => getHighlightedParts(text, store.searchQuery)
  })

  return {
    highlightText,
    getHighlightedParts,
    getHighlightedPartsForCurrentSearch
  }
}