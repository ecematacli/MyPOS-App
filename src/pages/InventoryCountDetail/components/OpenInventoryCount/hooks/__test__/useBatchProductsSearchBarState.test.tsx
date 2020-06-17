import { act, renderHook } from '@testing-library/react-hooks'

import { axios } from '../../../../../../__mocks__/axios'

import { invCountTestUtils } from './utils'
import { useBatchProductsSearchBarState } from '../useBatchProductsSearchBarState'

describe('[Inventory Count Search Hook]', () => {
  test('should search for products on query change', async () => {
    const { result } = renderHook(() => useBatchProductsSearchBarState('1'))
    const products = invCountTestUtils.createBatchProducts(5)
    const mock = jest.fn(() => Promise.resolve({ data: products }))
    axios.get = mock
    await act(async () => {
      result.current.handleQueryChange('q123')
    })

    expect(mock).toHaveBeenCalledWith('inventory-count/1/search-products?query=q123')
    expect(result.current.searchResults).toEqual(products)
    expect(result.current.query).toEqual('q123')
  })

  test('should set not found when no products returned', async () => {
    const { result } = renderHook(() => useBatchProductsSearchBarState('2'))
    const mock = jest.fn(() => Promise.resolve({ data: [] }))
    axios.get = mock
    await act(async () => {
      result.current.handleQueryChange('q1234')
    })

    expect(mock).toHaveBeenCalledWith('inventory-count/2/search-products?query=q1234')
    expect(result.current.searchResults).toEqual([])
    expect(result.current.query).toEqual('q1234')
    expect(result.current.productNotFound).toBeTruthy()
  })
})
