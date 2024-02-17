import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ProductsData } from 'types/products'

import { fetchProducts, IFetchProductsParams } from './products-service'

export const PRODUCTS_QUERY_KEY = 'products'

export const useProductsQuery = (
  params: IFetchProductsParams = {}
): UseQueryResult<ProductsData> => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, params],
    queryFn: () => fetchProducts(params),
    keepPreviousData: true,
  })
}
