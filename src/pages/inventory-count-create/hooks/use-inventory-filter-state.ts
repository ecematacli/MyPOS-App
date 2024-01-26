import { useState, useReducer } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../../api/api-client'
import { findMatchedFields } from '../../../common/utils'
import { Brand } from '../../../redux/brands/types'
import { Category } from '../../../redux/categories/types'

export interface Filters {
  category: string
  brand: string
}

interface Batch {
  id: number
  status: string
  started: string
  finished: string | null
  name: string
  category: string
  brand: string
}

export const useInventoryFilterState = (
  brands: Brand[],
  categories: Category[],
  addNotification: (message: string, severity: string) => void
) => {
  const initialState = {
    category: '',
    brand: '',
  }
  const history = useHistory()

  const [startDate, handleStartDateChange] = useState<Date | null>(new Date())
  const [countName, setCountName] = useState('')
  const [dropdownInputs, setDropdownInputs] = useReducer(
    (state: Filters, newState: Filters) => ({
      ...state,
      ...newState,
    }),
    initialState
  )

  const handleDropdownInputChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = name
    const newValue = value

    setDropdownInputs({ ...dropdownInputs, [fieldName]: newValue })
  }

  const handleCountNameChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCountName(value)
  }

  // API Request
  const createCountBatch = async () => {
    try {
      const { category, brand } = dropdownInputs
      let categoryId: number
      let brandId: number

      if (brand) {
        brandId = findMatchedFields(brands, dropdownInputs.brand).id
      }
      if (category) {
        categoryId = findMatchedFields(categories, dropdownInputs.category).id
      }

      const response = await api.post('/inventory-count', {
        name: countName,
        categoryId,
        brandId,
      })

      const data: Batch = response.data

      history.push(`/inventory/inventory-count/${data.id}`)
    } catch (err) {
      addNotification(err.response.data + '!', 'error')
    }
  }

  return {
    startDate,
    handleStartDateChange,
    countName,
    handleCountNameChange,
    handleDropdownInputChange,
    dropdownInputs,
    createCountBatch,
  }
}
