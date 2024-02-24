import React from 'react'
import { fireEvent, within } from '@testing-library/react'
import { Box } from '@mui/material'

import { render } from 'testUtils/render'
import { currencyFormatter } from 'common/utils'
import { ProductsTable } from '../components/products-table/products-table'
import { useProductsQuery } from 'api/products/use-products-query'
import { TABLE_HEADS } from '../components/products-table/table-heads-data'

const tablePaginationId = 'products-table-pagination'

const product = {
  id: 3406,
  sku: 'NER30052NS',
  barcode: '887791165213',
  name: 'Nike Intensity Speed Rope Atlama İpi',
  price: 649.9,
  discountPrice: 649.9,
  inventoryLevels: [
    {
      outletId: 1,
      qty: 0,
    },
    {
      outletId: 2,
      qty: 0,
    },
  ],
  variation: 'US9,5',
  taxRate: 18,
  brand: {
    id: 4,
    name: 'Nike',
  },
  category: {
    id: 5,
    name: 'Atlama İpi',
  },
  deleted: false,
}

jest.mock('api/products/use-products-query', () => ({
  useProductsQuery: jest.fn(() => ({
    data: {
      count: 15422,
      products: [product],
    },
    isLoading: false,
  })),
}))

jest.mock('../components/products-table-filters/product-table-filters', () => ({
  ProductsTableFilters: () => (
    <Box>Mocked Products Table Filters component!</Box>
  ),
}))

const mockedUseProductsQuery = useProductsQuery as jest.Mock

describe('ProductsTable component', () => {
  it('renders not found page, and no products table when there are no products', () => {
    mockedUseProductsQuery.mockReturnValueOnce({
      data: {
        products: [],
        count: 0,
      },
      isLoading: false,
    })

    const { queryByTestId, queryByRole } = render(
      <ProductsTable setSelectedProductId={jest.fn()} />
    )
    expect(queryByTestId('products-not-found')).toBeInTheDocument()
    expect(queryByRole('table')).not.toBeInTheDocument()
    expect(queryByTestId(tablePaginationId)).not.toBeInTheDocument()
  })

  it('renders products table', () => {
    const { getByTestId, queryByRole } = render(
      <ProductsTable setSelectedProductId={jest.fn()} />
    )
    expect(queryByRole('table')).toBeInTheDocument()
    expect(getByTestId(tablePaginationId)).toBeInTheDocument()
  })

  it('renders the loading indicator', () => {
    mockedUseProductsQuery.mockReturnValueOnce({
      data: {
        products: [],
        count: 0,
      },
      isLoading: true,
    })
    const { getByTestId, queryByRole } = render(
      <ProductsTable setSelectedProductId={jest.fn()} />
    )

    expect(getByTestId('loading-indicator')).toBeInTheDocument()
    expect(queryByRole('table')).not.toBeInTheDocument()
  })

  it('calls setSelectedProductId with correct id when product row is clicked', () => {
    const setSelectedProductId = jest.fn()
    const { getAllByRole } = render(
      <ProductsTable setSelectedProductId={setSelectedProductId} />
    )

    fireEvent.click(getAllByRole('cell')[1])
    expect(setSelectedProductId).toHaveBeenCalledWith(3406)
  })

  it('renders the pagination component and changes page correctly', () => {
    const { getByTestId } = render(
      <ProductsTable setSelectedProductId={jest.fn()} />
    )
    const pagination = getByTestId(tablePaginationId)
    expect(pagination).toBeInTheDocument()

    const nextPageButton = within(pagination).getByRole('button', {
      name: /next page/i,
    })

    fireEvent.click(nextPageButton)
    expect(mockedUseProductsQuery).toHaveBeenCalledWith({
      page: 2,
    })

    fireEvent.click(nextPageButton)
    expect(mockedUseProductsQuery).toHaveBeenCalledWith({
      page: 3,
    })
  })

  it('renders table headers and their corresponding cell data in the correct order and structure', () => {
    const { getAllByRole, getByTestId } = render(
      <ProductsTable setSelectedProductId={jest.fn()} />
    )

    const headerCells = getAllByRole('columnheader')
    const rowCells = getAllByRole('cell')

    TABLE_HEADS.forEach((tableHead, index) => {
      expect(headerCells[index].textContent).toBe(tableHead.label)

      switch (tableHead.key) {
        case 'icon':
          expect(rowCells[index]).toContainElement(getByTestId('OpenInNewIcon'))
          break

        case 'category':
        case 'brand':
          expect(rowCells[index].textContent).toBe(product[tableHead.key].name)
          break

        case 'price':
        case 'discountPrice':
          expect(rowCells[index].textContent).toBe(
            currencyFormatter(product[tableHead.key])
          )
          break

        case 'inventoryLevels':
          const inventoryLevel = product.inventoryLevels.find(
            level => level.outletId === tableHead.id
          )
          expect(rowCells[index].textContent).toBe(
            inventoryLevel!.qty.toString()
          )
          break

        default:
          expect(rowCells[index].textContent).toBe(product[tableHead.key])
      }
    })
  })
})
