import { useReducer, useContext } from 'react'

import { AdditionalInputs, FormValues, ProductInputStateArgs } from './types'
import { NewProductData } from '../../hooks/types'
import { findMatchedFields } from '../../../../common/utils'
import { NotificationsContext } from '../../../../contexts/NotificationsContext'

export default ({ brands, categories, onClose, createProduct }: ProductInputStateArgs) => {
  const { addNotification } = useContext(NotificationsContext)
  const initialValues = {
    taxRate: '18',
    category: '',
    brand: '',
  }

  const [additionalInputs, setAdditionalInputs] = useReducer(
    (state: AdditionalInputs, newState: AdditionalInputs) => ({
      ...state,
      ...newState,
    }),
    initialValues
  )

  // Product input field handlers
  const handleInputChange = ({ target: { value, name } }) => {
    const fieldName = name
    const newValue = value

    setAdditionalInputs({ ...additionalInputs, [fieldName]: newValue })
  }

  const onAddProductClick = (inputValues: FormValues) => {
    let categoryId: string
    let brandId: string

    if (additionalInputs.category) {
      categoryId = findMatchedFields(categories, additionalInputs.category).id.toString()
    }

    if (additionalInputs.brand) {
      brandId = findMatchedFields(brands, additionalInputs.brand).id.toString()
    }

    const newProduct: NewProductData = {
      ...inputValues,
      price: parseFloat(inputValues.price),
      discountPrice: parseFloat(inputValues.discountPrice),
      taxRate: parseFloat(additionalInputs.taxRate),
      categoryId,
      brandId,
    }

    createProduct(newProduct, addNotification)
    setAdditionalInputs(initialValues)
    onClose()
  }

  return {
    handleInputChange,
    onAddProductClick,
    additionalInputs,
  }
}
