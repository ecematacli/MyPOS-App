import { api } from 'api/api-client'
import { Product } from 'types/products'

export const fetchProduct = async (productId: number) => {
  const response = await api.get(`/products/${productId}`)

  return response?.data
}

export const editProduct = async (productId: number, updatedField: Product) => {
  const response = api.patch(`/products/${productId}/`, updatedField)
  console.log({ response })
}
