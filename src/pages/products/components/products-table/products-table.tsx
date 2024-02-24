import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import { currencyFormatter } from 'common/utils'
import { Product } from 'types/products'
import { Loading } from 'common/components/loading/loading'
import { Outlet } from 'types/outlets'
import { useProductsQuery } from 'api/products/use-products-query'
import { TABLE_HEADS } from './table-heads-data'
import {
  StyledTableBodyRow,
  StyledTableCell,
  StyledTablePagination,
} from './products-table-styles'
import { ENKA_OUTLET_ID, KOZA_OUTLET_ID } from 'constants/outlets'
import { ProductsTableFilters } from '../products-table-filters/product-table-filters'
import { ProductsNotFound } from '../products-not-found/products-not-found'

interface IProductsTableProps {
  selectedProductId?: number | null
  setSelectedProductId: React.Dispatch<React.SetStateAction<number | null>>
}

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
    ...(searchQuery && { searchQuery: debouncedSearchQuery }),
    ...(selectedCategoryId && { categoryId: Number(selectedCategoryId) }),
    ...(selectedBrandId && { brandId: Number(selectedBrandId) }),
  })

  const getStoreQuantity = (product: Product, outletId: Outlet['id']) =>
    product.inventoryLevels.find(inventory => inventory.outletId === outletId)
      ?.qty

  const hasNoProducts = !isLoading && productsData?.count === 0

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

  return (
    <Box display='flex' flexDirection='column' height='100%' pb='5px'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        p={'10px'}
        pl={'20px'}
        width='100%'>
        <ProductsTableFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedBrandId={selectedBrandId}
          setSelectedBrandId={setSelectedBrandId}
        />

        {!hasNoProducts && (
          <StyledTablePagination
            data-testid='products-table-pagination'
            component='div'
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
                  <StyledTableCell
                    sx={{
                      width: '60px',
                      p: '10px',
                      pl: '20px',
                    }}>
                    <Box display='flex' alignItems='center'>
                      <OpenInNewIcon
                        fontSize='small'
                        onClick={() => handleOpenInANewTabClick(product.id)}
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
                    {product.sku || '-'}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleRowClick(product)}>
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
