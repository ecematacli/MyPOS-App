import { api } from 'api/api-client'

export const fetchBrands = async () => {
  const response = await api.get('/brands')
  return response.data || []
}
