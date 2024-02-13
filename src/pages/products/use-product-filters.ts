import { useState, useReducer, useEffect } from 'react'

const initialState = {
  searchQuery: '',
  category: '',
  brand: '',
}

export const useProductsFilters = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])
  // const [filterInputs, setFilterInputs] = useReducer(
  //   (state: Filters, newState: Filters) => ({
  //     ...state,
  //     ...newState,
  //   }),
  //   initialState
  // )
  // const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({})

  // // Input change handler function
  // const handleInputChange = ({
  //   target: { value, name },
  // }: React.ChangeEvent<HTMLInputElement>) => {
  //   const fieldName = name
  //   const newValue = value

  //   setFilterInputs({ ...filterInputs, [fieldName]: newValue })
  // }

  // // Filter functionality handlers
  // const handleApplyFilterClick = () => {
  //   setTimeout(() => {
  //     setAppliedFilters(filterInputs)
  //   }, 1000)
  //   setPage(1)

  //   fetchProducts(
  //     1,
  //     rowsPerPage,
  //     findMatchedFields(categories, filterInputs.category).id,
  //     findMatchedFields(brands, filterInputs.brand).id,
  //     filterInputs.searchQuery
  //   )
  // }

  // const handleDelete = (key: string) => {
  //   const {
  //     [key as keyof AppliedFilters]: toBeRemoved,
  //     ...otherKeys
  //   } = appliedFilters
  //   setAppliedFilters(otherKeys)
  //   setPage(1)
  //   setFilterInputs({ ...filterInputs, [key]: '' })
  // }

  // const clearAllFilters = () => {
  //   setAppliedFilters({})
  //   setPage(1)
  //   setFilterInputs(initialState)
  //   fetchProducts(1, rowsPerPage)
  // }

  // const cancelClick = () => {
  //   setTimeout(() => {
  //     setAppliedFilters({})
  //     setFilterInputs(initialState)
  //   }, 1000)
  // }

  return {
    searchQuery,
    setSearchQuery,
    setDebouncedSearchQuery,
    debouncedSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
  }
}
