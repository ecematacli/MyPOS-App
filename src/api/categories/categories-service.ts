import { api } from 'api/api-client'

export const fetchCategories = async () => {
  const response = await api.get('/categories')
  return response.data || []
}
