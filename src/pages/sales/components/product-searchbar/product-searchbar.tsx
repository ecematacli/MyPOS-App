import React, { useContext } from 'react'

import api from '../../../../api/api-client'
import { SearchBarContainer } from './styles'
import { Product } from '../../../../redux/products/types'
import { InputAutoSuggest } from '../../../../common/components/input-auto-suggest/input-auto-suggest'
import { NotificationsContext } from '../../../../contexts/notifications-context'

interface SearchBarProps {
  addProduct: (product: Product) => void
}

export const ProductSearchBar: React.FC<SearchBarProps> = ({ addProduct }) => {
  const { addNotification } = useContext(NotificationsContext)

  const fetchProducts = async (query: string): Promise<Product[]> => {
    try {
      const { data } = await api.get(`/products/search/?q=${query}`)
      return data
    } catch (e) {
      const errMessage = e?.response?.data || 'Unable to search with the query'
      addNotification(errMessage, 'error')
      return []
    }
  }

  return (
    <SearchBarContainer>
      <InputAutoSuggest
        selectOption={addProduct}
        isQuickScanMode
        loadOptions={fetchProducts}
      />
    </SearchBarContainer>
  )
}
