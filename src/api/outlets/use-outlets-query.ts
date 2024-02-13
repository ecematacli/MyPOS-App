import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Outlet } from 'types/outlets'

import { fetchOutlets } from './outlets-service'

const OUTLETS_QUERY_KEY = 'outlets'

export const useOutletsQuery = (isEnabled = true): UseQueryResult<Outlet[]> => {
  return useQuery({
    queryKey: [OUTLETS_QUERY_KEY],
    queryFn: () => fetchOutlets(),
    enabled: isEnabled,
  })
}
