import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'

import { useTheme } from '@mui/material/styles'

import { ActionTypes, StoreState } from '../../redux/types'
import { Product } from '../../redux/products/types'
import { Category } from '../../redux/categories/types'
import { Brand } from '../../redux/brands/types'
import { fetchProducts } from '../../redux/products/productsActions'
import { fetchCategories } from '../../redux/categories/categoriesActions'
import { fetchBrands } from '../../redux/brands/brandsActions'
import { loadingSelector } from '../../redux/loading/loadingReducer'

import { useProductFilters } from './hooks/use-product-filters'
import { Loading } from '../../common/components/loading/loading'
import { CustomTable } from '../../common/components/tables/custom-table/custom-table'

import { ProductFilters } from '../product-details/product-filters-old/product-filters'
import { currencyFormatter, findMatchedFields } from '../../common/utils'
import { FilterInput } from './types'
import { PageContainer } from 'common/components/page-container/page-container'
import { GridItem } from './products-styles'
import { ProductsTable } from './components/products-table/products-table'
import { ProductDetailsPage } from '../product-details/product-details'
import { useCategoriesQuery } from 'api/categories/use-categories-query'
import { useProductsQuery } from 'api/products/use-products-query'
import { useBrandsQuery } from 'api/brands/use-brands-query'

interface ProductsProps {
  fetchProducts: (
    page: number,
    rowsPerPage: number,
    categoryId?: number,
    brandId?: number,
    searchQuery?: string
  ) => void
  fetchCategories: () => void
  fetchBrands: () => void
  products: { [id: string]: Product }
  count: number
  ids: number[]
  categories: Category[]
  brands: Brand[]
  isFetching: boolean
}

export const getFilterInputFields = (
  brands: Brand[],
  categories: Category[],
  filter: {
    searchQuery: string
    category: string
    brand: string
  }
): FilterInput[] => [
  {
    label: 'Search Query',
    fieldId: 'searchQuery',
    placeholder: 'Search by name, sku or barcode',
    value: filter.searchQuery,
  },
  {
    label: 'Category',
    fieldId: 'category',
    dropdown: true,
    dropdownItems: categories,
    value: filter.category,
  },
  {
    label: 'Brand',
    fieldId: 'brand',
    dropdown: true,
    dropdownItems: brands,
    value: filter.brand,
  },
]

export const ProductsPage: React.FC<ProductsProps> = ({
  fetchProducts,
  fetchCategories,
  fetchBrands,
  count,
  ids,
  isFetching,
}) => {
  const { data: productsData, isLoading } = useProductsQuery({ page: 1 })

  const theme = useTheme()

  const [selectedProductId, setSelectedProductId] = useState<
    null | Product['id']
  >(null)

  if (isLoading) {
    return <Loading />
  }

  if (!productsData) {
    return <React.Fragment />
  }

  // const filterStateArgs = {
  //   brands,
  //   categories,
  //   setPage,
  //   page,
  //   rowsPerPage,
  //   fetchProducts,
  // }

  // const {
  //   filterInputs,
  //   appliedFilters,
  //   cancelClick,
  //   clearAllFilters,
  //   handleInputChange,
  //   handleApplyFilterClick,
  //   handleDelete,
  // } = useProductFilters(filterStateArgs)

  // const FILTER_INPUT_FIELDS = getFilterInputFields(
  //   brands,
  //   categories,
  //   filterInputs
  // )

  // const handleChangePage = (
  //   _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   newPage: number
  // ) => {
  //   //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
  //   if (newPage + 1 < 0) return
  //   setPage(newPage + 1)

  //   fetchProducts(
  //     newPage + 1,
  //     rowsPerPage,
  //     findMatchedFields(categories, filterInputs.category).id,
  //     findMatchedFields(brands, filterInputs.brand).id,
  //     filterInputs.searchQuery
  //   )
  // }

  // useEffect(() => {
  //   fetchProducts(page, rowsPerPage)
  //   fetchCategories()
  //   fetchBrands()
  // }, [])

  return (
    <PageContainer
      sx={{
        padding: 0,
        height: '100%',
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(2),
        },
      }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid
          item
          xs={12}
          md={selectedProductId ? 6 : 12}
          pt={8}
          sx={{ height: '100%' }}>
          <ProductsTable
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
          />
        </Grid>
        {selectedProductId && (
          <GridItem item md={6} sx={{ height: '100%', overflowY: 'auto' }}>
            <ProductDetailsPage
              selectedProductId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
            />
          </GridItem>
        )}
      </Grid>
    </PageContainer>
  )
}
