import { useState } from 'react'

import api from '../../../../../api'
import { BatchProduct } from '../types'
import { OptionsType } from 'react-select'

export const useBatchProductsSearchBarState = (batchId: string) => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<BatchProduct[]>([])
  const [productSearchLoading, setProductSearchLoading] = useState(false)
  const [productNotFound, setProductNotFound] = useState(false)

  const fetchBatchProducts = async (
    query: string,
    callback: (options: OptionsType<any>) => void
  ) => {
    try {
      setProductSearchLoading(true)
      const { data } = await api.get(
        `inventory-count/${batchId}/search-products?query=${query}`
      )
      setSearchResults(data)
      setProductNotFound(data.length === 0)
      setProductSearchLoading(false)
      setOpen(true)
      callback(data)
    } catch (e) {
      console.log('Error from batch products search bar hook', e)
      setProductSearchLoading(false)
      callback([])
    }
  }

  const handleQueryChange = (userQuery: string) => {
    setQuery(userQuery)
  }

  return {
    open,
    setOpen,
    searchResults,
    setSearchResults,
    productSearchLoading,
    setProductSearchLoading,
    query,
    setQuery,
    handleQueryChange,
    fetchBatchProducts,
    productNotFound,
  }
}
