import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ProductsData } from 'types/products'

import { fetchProducts, IFetchProductsParams } from './products-service'

const PRODUCTS_QUERY_KEY = 'products'

export const useProductsQuery = ({
  page,
  searchQuery,
}: IFetchProductsParams): UseQueryResult<ProductsData> => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, page, searchQuery],
    queryFn: () => fetchProducts({ page, searchQuery }),
    keepPreviousData: true,
  })
}
