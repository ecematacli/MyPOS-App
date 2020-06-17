import React from 'react'
import { act, renderHook, HookResult } from '@testing-library/react-hooks'

import useCountDetails from '../useCountDetails'
import { NotificationsContext } from '../../../../../../contexts/NotificationsContext'
import { LocalStorageMock } from '../../../../../../__mocks__/localStorage'
import { axios } from '../../../../../../__mocks__/axios'

import { invCountTestUtils } from './utils'
import { BatchesProductsData } from '../../types'

const addNotification = jest.fn()
const wrapper: React.FC = ({ children }) => (
  <NotificationsContext.Provider
    value={{ addNotification, notifications: [], removeNotification: null }}>
    {children}
  </NotificationsContext.Provider>
)
const localStorage = new LocalStorageMock()

Object.defineProperty(window, 'localStorage', {
  value: localStorage,
})

const fetchBatchProducts = async (
  result: HookResult<any>,
  productsData: BatchesProductsData
) => {
  axios.get = jest.fn(() =>
    Promise.resolve({
      data: productsData,
    })
  )

  await act(async () => {
    result.current.fetchBatchesProducts(1)
  })
}

describe('[Inventory Count Details Hook]', () => {
  test('should fetch batch data', async () => {
    const batchId = '1'
    const batch = invCountTestUtils.createBatch(batchId)
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: batch,
      })
    )
    let result
    await act(async () => {
      result = renderHook(() => useCountDetails(jest.fn(), batchId), { wrapper }).result
    })
    expect(result.current.batch).toBe(batch)
  })

  test('should fetch batch products', async () => {
    const batchId = '1'
    const productsData = invCountTestUtils.createBatchProductsData(10)
    const { result } = renderHook(() => useCountDetails(jest.fn(), batchId), { wrapper })
    await fetchBatchProducts(result, productsData)

    expect(result.current.batchProducts).toBe(productsData)
    expect(axios.get).toHaveBeenCalledWith(
      `/inventory-count/1/products?page=1&rowsPerPage=10&status=all`
    )
  })

  test('should count product in quick scan mode', async () => {
    const productsData = invCountTestUtils.createBatchProductsData(10)
    const { result } = renderHook(() => useCountDetails(jest.fn(), '1'), { wrapper })
    await fetchBatchProducts(result, productsData)
    const product = productsData.products[0]
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: { ...product, counted: product.counted + 1 },
      })
    )

    await act(async () => {
      result.current.setIsQuickScanMode(true)
      result.current.countProduct(product)
    })

    expect(axios.post).toHaveBeenCalledWith('/inventory-count/count-product', {
      id: product.id,
      count: product.counted + 1,
    })

    expect(result.current.batchProducts.products.find(p => p.id === product.id).counted).toBe(
      product.counted + 1
    )
    invCountTestUtils.checkLastCountedProduct(localStorage, product)
  })

  test('should count product in normal mode', async () => {
    localStorage.clear()
    const productsData = invCountTestUtils.createBatchProductsData(10)
    const { result } = renderHook(() => useCountDetails(jest.fn(), '1'), { wrapper })
    await fetchBatchProducts(result, productsData)
    act(() => {
      result.current.setItemCount(1000)
    })
    const product = productsData.products[0]
    const updatedProduct = { ...product, counted: product.counted + 1100 }
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: updatedProduct,
      })
    )
    await act(async () => {
      result.current.countProduct(product)
    })

    expect(axios.post).toHaveBeenCalledWith('/inventory-count/count-product', {
      id: product.id,
      count: product.counted + 1000,
    })
    expect(result.current.batchProducts.products.find(p => p.id === product.id).counted).toBe(
      product.counted + 1100
    )
    invCountTestUtils.checkLastCountedProduct(localStorage, product, 1000)
    expect(result.current.selectedProduct).toEqual(updatedProduct)
  })

  test('should change tab and count product on uncounted tab', async () => {
    localStorage.clear()
    const productsData = invCountTestUtils.createBatchProductsData(10)
    const { result } = renderHook(() => useCountDetails(jest.fn(), '1'), { wrapper })
    await fetchBatchProducts(result, productsData)

    const uncountedPData = { ...productsData, products: productsData.products.slice(0, 5) }
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: uncountedPData,
      })
    )

    await act(async () => {
      result.current.setItemCount(5)
      result.current.handleTabsChange(null, 'uncounted')
    })
    expect(result.current.tabsValue).toBe('uncounted')
    expect(result.current.batchProducts).toEqual(uncountedPData)

    const product = uncountedPData.products[0]
    const updatedProduct = { ...product, counted: product.counted + 5 }

    axios.post = jest.fn(() =>
      Promise.resolve({
        data: updatedProduct,
      })
    )

    await act(async () => {
      result.current.countProduct(product)
    })

    expect(axios.post).toHaveBeenCalledWith('/inventory-count/count-product', {
      id: product.id,
      count: product.counted + 5,
    })
    expect(
      result.current.batchProducts.products.find(p => p.id === product.id)
    ).toBeUndefined()
    invCountTestUtils.checkLastCountedProduct(localStorage, product, 5)
    expect(result.current.selectedProduct).toEqual(updatedProduct)
  })

  test('should change page and call api', async () => {
    const productsData = invCountTestUtils.createBatchProductsData(10)
    const { result } = renderHook(() => useCountDetails(jest.fn(), '1'), { wrapper })
    await fetchBatchProducts(result, productsData)

    await act(async () => {
      result.current.handleChangePage(null, 2)
    })

    expect(axios.get).toHaveBeenCalledWith(
      `/inventory-count/1/products?page=3&rowsPerPage=10&status=all`
    )
  })

  test('should change rows per page and call api', async () => {
    const productsData = invCountTestUtils.createBatchProductsData(10)
    const { result } = renderHook(() => useCountDetails(jest.fn(), '1'), { wrapper })
    await fetchBatchProducts(result, productsData)

    await act(async () => {
      result.current.handleChangeRowsPerPage({ target: { value: '100' } } as React.ChangeEvent<
        HTMLInputElement
      >)
    })

    expect(axios.get).toHaveBeenCalledWith(
      `/inventory-count/1/products?page=1&rowsPerPage=100&status=all`
    )
  })

  test('should complete inventory count', async () => {
    const { result } = renderHook(() => useCountDetails(jest.fn(), '1'), { wrapper })

    await act(async () => {
      result.current.complete()
    })

    expect(axios.post).toHaveBeenCalledWith(
      '/inventory-count/1/complete?force=true',
      undefined
    )
    expect(localStorage.getItem('lastCountedItem-batch1')).toBeUndefined()
  })
})
