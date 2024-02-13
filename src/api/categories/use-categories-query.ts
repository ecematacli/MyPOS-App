import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Category } from 'types/categories'

import { fetchCategories } from './categories-service'

const CATEGORIES_QUERY_KEY = 'categories'

export const useCategoriesQuery = (): UseQueryResult<Category[]> => {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: () => fetchCategories(),
  })
}
