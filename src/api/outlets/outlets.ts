import { Outlet } from 'types/outlets'
import { api } from '../api-client'

export const fetchOutlets = async (): Promise<Outlet[]> => {
  try {
    const { data } = await api.get('/outlets')
    return data as Outlet[]
  } catch (e) {
    console.log(e)
    return []
  }
}
