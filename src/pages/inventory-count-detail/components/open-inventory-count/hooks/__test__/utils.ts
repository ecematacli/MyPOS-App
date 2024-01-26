import { BatchData, BatchProduct, BatchesProductsData } from '../../types'
import { createTestProduct } from '../../../../../../testUtils'
import { LocalStorageMock } from '../../../../../../__mocks__/localStorage'

const createBatch = (id: string): BatchData => ({
  id: parseInt(id),
  status: 'Open',
  started: new Date().toISOString(),
  finished: null,
  name: 'Test',
  category: 'test-category',
  brand: 'test-brand',
})

const createBatchProducts = (length: number = 1): BatchProduct[] =>
  createTestProduct(length).map(({ id, sku, barcode, name, variation, qty }) => ({
    id,
    sku,
    barcode,
    name,
    variation,
    expected: qty,
    counted: qty + Math.floor(Math.random() * 4),
    synced: Math.random() > 0.5,
    updatedAt: new Date().toISOString(),
  }))

const createBatchProductsData = (productCount: number): BatchesProductsData => ({
  counted: Math.floor(Math.random() * 100),
  uncounted: Math.floor(Math.random() * 100),
  synced: Math.floor(Math.random() * 100),
  notSynced: Math.floor(Math.random() * 100),
  products: createBatchProducts(productCount),
})

const checkLastCountedProduct = (
  localStorage: LocalStorageMock,
  product: BatchProduct,
  counted: number = 1
) => {
  const { id, sku, name, barcode, variation } = product
  expect(
    JSON.parse(localStorage.getItem('lastCountedItem-batch1')).map(({ countedAt, ...r }) => ({
      ...r,
    }))
  ).toEqual([
    {
      id,
      sku,
      name,
      barcode,
      variation,
      counted,
    },
  ])
}

export const invCountTestUtils = {
  createBatch,
  createBatchProducts,
  createBatchProductsData,
  checkLastCountedProduct,
}
