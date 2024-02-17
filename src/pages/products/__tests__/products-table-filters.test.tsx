import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { ProductsTableFilters } from '../components/products-table-filters/product-table-filters'

jest.mock('api/categories/use-categories-query', () => ({
  useCategoriesQuery: jest.fn(() => ({
    data: [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ],
  })),
}))

jest.mock('api/brands/use-brands-query', () => ({
  useBrandsQuery: jest.fn(() => ({
    data: [
      { id: '1', name: 'Brand 1' },
      { id: '2', name: 'Brand 2' },
    ],
  })),
}))

const setSearchQuery = jest.fn()
const setSelectedCategoryId = jest.fn()
const setSelectedBrandId = jest.fn()

const renderComponent = ({
  searchQuery = '',
  selectedBrandId = '',
  selectedCategoryId = '',
}: {
  searchQuery?: string
  selectedBrandId?: string
  selectedCategoryId?: string
} = {}) => {
  return render(
    <ProductsTableFilters
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedCategoryId={selectedCategoryId}
      setSelectedCategoryId={setSelectedCategoryId}
      selectedBrandId={selectedBrandId}
      setSelectedBrandId={setSelectedBrandId}
    />
  )
}

const searchInput = 'product-search-input'
const cleanInputButton = 'cancel-icon-button'

describe('ProductsTableFilters component', () => {
  it('renders the component correctly', () => {
    const { getByTestId, container } = renderComponent()

    expect(getByTestId(searchInput).querySelector('input')).toBeInTheDocument()

    expect(container.querySelector('#category')).toBeInTheDocument()
    expect(container.querySelector('#brand')).toBeInTheDocument()
  })

  it('sets the product search bar input', () => {
    const { getByTestId, queryByTestId } = renderComponent()

    const inputElement = getByTestId(searchInput).querySelector('input')
    expect(queryByTestId(cleanInputButton)).not.toBeInTheDocument()

    fireEvent.change(inputElement!, {
      target: { value: 'testy' },
    })

    expect(setSearchQuery).toHaveBeenCalledWith('testy')
  })

  it('clears the search input when the cancel button is clicked', () => {
    const { getByTestId } = renderComponent({ searchQuery: 'Nike' })

    expect(getByTestId(cleanInputButton)).toBeInTheDocument()

    fireEvent.click(getByTestId(cleanInputButton))
    expect(setSearchQuery).toHaveBeenCalledWith('')
  })

  it('renders the selected category and brand with their id', () => {
    const { getByText } = renderComponent({
      selectedCategoryId: '1',
      selectedBrandId: '2',
    })

    expect(getByText('Category 1')).toBeInTheDocument()
    expect(getByText('Brand 2')).toBeInTheDocument()
  })

  it('handles the category dropdown change', () => {
    const { getByText, getAllByRole } = renderComponent({
      selectedCategoryId: '1',
    })

    const select = getAllByRole('combobox')[0]
    fireEvent.mouseDown(select)

    const menuItem = getByText('Category 2')
    fireEvent.click(menuItem)

    expect(setSelectedCategoryId).toHaveBeenCalledWith('2')
  })

  it('handles the brand dropdown change', () => {
    const { getByText, getAllByRole } = renderComponent({
      selectedBrandId: '2',
    })

    const select = getAllByRole('combobox')[1]
    fireEvent.mouseDown(select)

    const menuItem = getByText('Brand 1')
    fireEvent.click(menuItem)

    expect(setSelectedBrandId).toHaveBeenCalledWith('1')
  })
})
