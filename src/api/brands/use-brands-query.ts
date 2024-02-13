import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Category } from 'types/categories'

import { fetchBrands } from './brands-service'

const BRANDS_QUERY_KEY = 'brands'

export const useBrandsQuery = (): UseQueryResult<Category[]> => {
  return useQuery({
    queryKey: [BRANDS_QUERY_KEY],
    queryFn: () => fetchBrands(),
  })
}
