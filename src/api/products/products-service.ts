import { api } from 'api/api-client'

export interface IFetchProductsParams {
  page?: number
  categoryId?: number
  brandId?: number
  searchQuery?: string
  rowsPerPage?: number
}

export const fetchProducts = async ({
  page = 1,
  rowsPerPage = 50,
  categoryId,
  brandId,
  searchQuery,
}: IFetchProductsParams = {}) => {
  console.log({ page })
  const params = new URLSearchParams({
    page: page.toString(),
    rowsPerPage: rowsPerPage.toString(),
    ...(categoryId && { categoryId: categoryId.toString() }),
    ...(brandId && { brandId: brandId.toString() }),
    ...(searchQuery && { query: searchQuery }),
  })

  const url = `/products?${params.toString()}`

  const response = await api.get(url)

  return {
    products: response.data?.products || [],
    count: response.data?.count,
  }
}
