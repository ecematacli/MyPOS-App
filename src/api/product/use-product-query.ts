import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Product } from 'types/products'

import { fetchProduct } from './product-service'

const PRODUCTS_QUERY_KEY = 'product'

export const useProductQuery = (id: number): UseQueryResult<Product> => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, id],
    queryFn: () => fetchProduct(id),
  })
}
