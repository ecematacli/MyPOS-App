import React from 'react'

import api from '../../../../api'
import styles from './styles'
import { Product } from '../../../../redux/products/types'
import { NewProductData } from '../../hooks/types'
import { InputAutoSuggest } from '../../../../common/components/InputAutoSuggest'

interface SearchBarProps {
  addProduct: (product: Product) => void
}

const ProductSearchBar: React.FC<SearchBarProps> = ({ addProduct }) => {
  const classes = styles()

  const fetchProducts = async (query: string): Promise<Product[]> => {
    try {
      const { data } = await api.get(`/products/search/?q=${query}`)
      return data
    } catch (e) {
      return []
    }
  }

  return (
    <div className={classes.searchBarInput}>
      <InputAutoSuggest
        selectOption={addProduct}
        isQuickScanMode
        loadOptions={fetchProducts}
      />
    </div>
  )
}

export default ProductSearchBar
