import React, { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { TABLE_HEADS } from './table-heads-data'

import { currencyFormatter, findMatchedFields } from 'common/utils'
import { PageContainer } from 'common/components/page-container/page-container'

import {
  StyledTableBodyRow,
  StyledTableCell,
  StyledTablePagination,
  PaginationContainer,
} from './products-table-styles'
import { Product } from 'types/products'
import { Brand } from 'types/brands'
import { Category } from 'types/categories'
import { Loading } from 'common/components/loading/loading'
import { useProductsQuery } from 'api/products/use-products-query'
import { useCatalogInfo } from 'contexts/catalog-info-context'
import { Outlet } from 'types/outlets'
import { ENKA_OUTLET_ID, KOZA_OUTLET_ID } from 'constants/outlets'
import { useCategoriesQuery } from 'api/categories/use-categories-query'
import { useBrandsQuery } from 'api/brands/use-brands-query'
import { ProductsFilters } from '../product-filters/product-filters'
import { InputAutoSuggest } from 'common/components/input-auto-suggest/input-auto-suggest'
import { useProductsFilters } from 'pages/products/use-product-filters'
import { ProductsNotFound } from '../products-not-found/products-not-found'
import { useHistory } from 'react-router-dom'

interface IProductsTableProps {
  selectedProductId: number | null
  setSelectedProductId: React.Dispatch<React.SetStateAction<number | null>>
}

export const getFilterInputFields = (
  brands: Brand[],
  categories: Category[],
  filter: {
    searchQuery: string
    category: string
    brand: string
  }
) => [
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

export const ProductsTable: React.FC<IProductsTableProps> = ({
  selectedProductId,
  setSelectedProductId,
}) => {
  const history = useHistory()

  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedBrandId, setSelectedBrandId] = useState('')

  const { data: productsData, isLoading } = useProductsQuery({
    page,
    searchQuery: debouncedSearchQuery,
    categoryId: Number(selectedCategoryId),
    brandId: Number(selectedBrandId),
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  if (isLoading) {
    return <Loading />
  }

  if (!productsData) {
    return <React.Fragment />
  }

  const handleRowClick = (product: Product) => {
    setSelectedProductId(product.id)
  }

  const handleOpenInANewTabClick = (id: number) => {
    history.push(`inventory/products/${id}`)
  }

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return
    setPage(newPage + 1)
  }

  const getStoreQuantity = (product: Product, outletId: Outlet['id']) =>
    product.inventoryLevels.find(inventory => inventory.outletId === outletId)
      ?.qty

  const hasNoProducts = !isLoading && productsData.products.length === 0

  return (
    <Box display='flex' flexDirection='column' height='100%' pb='5px'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        p={'10px'}
        width='100%'>
        <ProductsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedBrandId={selectedBrandId}
          setSelectedBrandId={setSelectedBrandId}
        />

        {!hasNoProducts && (
          <StyledTablePagination
            rowsPerPageOptions={[]}
            count={productsData.count}
            rowsPerPage={50}
            page={page - 1}
            onPageChange={handleChangePage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} toplam ${count}`
            }
          />
        )}
      </Box>
      {hasNoProducts ? (
        <ProductsNotFound />
      ) : (
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 650 }}
            size={selectedProductId ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                {TABLE_HEADS.map(head => (
                  <StyledTableCell cellType='header' key={head.label}>
                    {head.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData.products.map(product => (
                <StyledTableBodyRow key={product.id}>
                  <StyledTableCell sx={{ width: '40px', padding: '10px' }}>
                    <OpenInNewIcon
                      fontSize='small'
                      onClick={() => handleOpenInANewTabClick(product.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => handleRowClick(product)}
                    component='th'
                    scope='row'>
                    {product.sku}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => handleRowClick(product)}
                    component='th'
                    scope='row'>
                    {product.name || '-'}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
                    {product.variation || '-'}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
                    {getStoreQuantity(product, ENKA_OUTLET_ID)}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
                    {getStoreQuantity(product, KOZA_OUTLET_ID)}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
                    {product.category?.name || '-'}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
                    {product.brand?.name || '-'}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
                    {currencyFormatter(product.price)}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
                    {currencyFormatter(product.discountPrice)}
                  </StyledTableCell>
                </StyledTableBodyRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
