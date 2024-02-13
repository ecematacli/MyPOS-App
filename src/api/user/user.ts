import { api } from '../api-client'
import { User } from './types'

export const fetchUser = async (): Promise<User | undefined> => {
  try {
    const { data } = await api.get('/account')
    return data
  } catch (e) {
    console.log(e)
    return
  }
}
