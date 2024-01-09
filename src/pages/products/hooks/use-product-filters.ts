import { useState, useReducer } from 'react'

import { Category } from '../../../redux/categories/types'
import { Brand } from '../../../redux/brands/types'
import { Filters, AppliedFilters } from '../types'
import { findMatchedFields } from '../../../common/utils'

const initialState = {
  searchQuery: '',
  category: '',
  brand: '',
}

export interface Args {
  brands: Brand[]
  categories: Category[]
  setPage: (page: number) => void
  page: number
  rowsPerPage: number
  fetchProducts: (
    page: number,
    rowsPerPage: number,
    categoryId?: number,
    brandId?: number,
    searchQuery?: string
  ) => void
}

export const useProductFilters = (args: Args) => {
  const { brands, categories, setPage, rowsPerPage, fetchProducts } = args

  const [filterInputs, setFilterInputs] = useReducer(
    (state: Filters, newState: Filters) => ({
      ...state,
      ...newState,
    }),
    initialState
  )
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({})

  // Input change handler function
  const handleInputChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = name
    const newValue = value

    setFilterInputs({ ...filterInputs, [fieldName]: newValue })
  }

  // Filter functionality handlers
  const handleApplyFilterClick = () => {
    setTimeout(() => {
      setAppliedFilters(filterInputs)
    }, 1000)
    setPage(1)

    fetchProducts(
      1,
      rowsPerPage,
      findMatchedFields(categories, filterInputs.category).id,
      findMatchedFields(brands, filterInputs.brand).id,
      filterInputs.searchQuery
    )
  }

  const handleDelete = (key: string) => {
    const {
      [key as keyof AppliedFilters]: toBeRemoved,
      ...otherKeys
    } = appliedFilters
    setAppliedFilters(otherKeys)
    setPage(1)
    setFilterInputs({ ...filterInputs, [key]: '' })
  }

  const clearAllFilters = () => {
    setAppliedFilters({})
    setPage(1)
    setFilterInputs(initialState)
    fetchProducts(1, rowsPerPage)
  }

  const cancelClick = () => {
    setTimeout(() => {
      setAppliedFilters({})
      setFilterInputs(initialState)
    }, 1000)
  }

  return {
    filterInputs,
    appliedFilters,
    cancelClick,
    clearAllFilters,
    handleInputChange,
    handleApplyFilterClick,
    handleDelete,
  }
}
