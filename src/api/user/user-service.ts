import { User } from 'types/user'
import { api } from '../api-client'

export const fetchUser = async (): Promise<User | undefined> => {
  const { data } = await api.get('/account')
  return data
}
