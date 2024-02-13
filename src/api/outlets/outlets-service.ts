import { api } from 'api/api-client'

export const fetchOutlets = async () => {
  const response = await api.get('/outlets')
  return response.data || []
}
