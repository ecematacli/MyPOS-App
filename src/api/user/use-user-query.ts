import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { User } from 'types/user'
import { fetchUser } from './user-service'

export const USER_QUERY_KEY = 'user'

export const useUserQuery = ({
  shouldFetchData,
}: {
  shouldFetchData: boolean
}): UseQueryResult<User> => {
  return useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => fetchUser(),
    enabled: shouldFetchData,
  })
}
