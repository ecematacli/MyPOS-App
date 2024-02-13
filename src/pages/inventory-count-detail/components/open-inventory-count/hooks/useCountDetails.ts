import { useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { api } from '../../../../../api/api-client'
import {
  BatchesProductsData,
  BatchProduct,
  BatchData,
  LastCountedProduct,
} from '../types'
import { NotificationsContext } from '../../../../../contexts/notifications-context'
import { useLocalStorageState } from '../../../../../common/hooks/use-local-storage-state'
import { useGetRequest } from '../../../../../common/hooks/use-get-request'
import { usePostRequest } from '../../../../../common/hooks/use-post-request'

export default (batchId: string) => {
  const history = useHistory()

  const { addNotification } = useContext(NotificationsContext)
  const [isQuickScanMode, setIsQuickScanMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [itemCount, setItemCount] = useState<number>(1)
  const [selectedProduct, setSelectedProduct] = useState<BatchProduct>(null)

  const [lastCountedItems, setLastCountedItems] = useLocalStorageState<
    LastCountedProduct[]
  >(`lastCountedItem-batch${batchId}`, [])

  const [tabsValue, setTabsValue] = useState('all')
  const [batchProducts, setBatchProducts] = useState<BatchesProductsData>({
    counted: 0,
    uncounted: 0,
    products: [],
  })
  const [completeInvCountError, setCompleteInvCountError] = useState('')
  const countInputRef = useRef<HTMLInputElement>()

  //API Requests
  const { value: batch } = useGetRequest<BatchData>(
    `/inventory-count/${batchId}`
  )

  const [postProductCount] = usePostRequest()

  const fetchBatchesProducts = async (
    id: number,
    status = 'all',
    page = 1,
    rowsPerPage = 10
  ) => {
    try {
      setLoading(true)
      const response = await api.get(
        `/inventory-count/${id}/products?page=${page}&rowsPerPage=${rowsPerPage}&status=${status}`
      )
      const data: BatchesProductsData = response.data
      setBatchProducts(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  // Helper functions
  const handleTabsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    setTabsValue(newValue)
    setPage(1)
    fetchBatchesProducts(parseInt(batchId), newValue, 1, rowsPerPage)
  }

  const handleSelectedProduct = (product: BatchProduct) => {
    setSelectedProduct(product)
  }

  const replaceBatchProduct = (
    idToReplace: number,
    replacement: BatchProduct
  ) => {
    setBatchProducts(batchProducts => ({
      ...batchProducts,
      products: batchProducts.products.map(product =>
        product.id === idToReplace ? replacement : product
      ),
    }))
  }

  const countProduct = async (p: BatchProduct) => {
    const count = p.counted + (isQuickScanMode ? 1 : itemCount)
    const [updatedProduct] = await postProductCount(
      '/inventory-count/count-product',
      {
        payload: {
          id: p.id,
          count,
        },
      }
    )

    if (!updatedProduct) {
      return addNotification('Something went wrong!', 'error')
    }

    // if on uncounted tab, remove the updated product else replace it with the response
    if (tabsValue === 'uncounted') {
      setBatchProducts(bp => ({
        ...bp,
        products: bp.products.filter(({ id }) => id !== p.id),
      }))
    } else {
      replaceBatchProduct(p.id, updatedProduct)
    }

    if (!p.counted) {
      setBatchProducts(bp => ({
        ...bp,
        counted: bp.counted + 1,
        uncounted: bp.uncounted - 1,
      }))
    }

    const { id, sku, name, barcode, variation } = p
    setLastCountedItems([
      {
        id,
        sku,
        name,
        barcode,
        variation,
        counted: isQuickScanMode ? 1 : itemCount,
        countedAt: new Date().toISOString(),
      },
      ...lastCountedItems.slice(0, 59),
    ])

    if (isQuickScanMode) {
      setSelectedProduct(null)
    } else {
      setSelectedProduct(updatedProduct)
      setItemCount(1)
    }
  }

  // Input handlers on pagination
  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value)
    setRowsPerPage(numValue)

    fetchBatchesProducts(parseInt(batchId), tabsValue, page, numValue)
  }

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return
    setPage(newPage + 1)
    fetchBatchesProducts(parseInt(batchId), tabsValue, newPage + 1, rowsPerPage)
  }

  const [completeInvCount] = usePostRequest()
  const complete = async () => {
    await completeInvCount(`/inventory-count/${batchId}/complete?force=true`, {
      onSuccess: res => {
        localStorage.removeItem(`lastCountedItem-batch${batchId}`)
        history.push(`/inventory/inventory-count`)
      },
      onError: e => setCompleteInvCountError(e),
    })
  }

  const searchProducts = async (query: string): Promise<BatchProduct[]> => {
    try {
      const { data } = await api.get(
        `inventory-count/${batchId}/search-products?query=${query}`
      )
      return data
    } catch (e) {
      console.log('Error from batch products search bar hook', e)
      return []
    }
  }

  const onProductSelect = (product: BatchProduct) => {
    if (!isQuickScanMode) {
      countInputRef.current.focus()
      handleSelectedProduct(product)
    } else {
      countProduct(product)
    }
  }

  return {
    tabsValue,
    handleTabsChange,
    loading,
    itemCount,
    setItemCount,
    countProduct,
    lastCountedItems,
    batch,
    batchProducts,
    fetchBatchesProducts,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    selectedProduct,
    setSelectedProduct,
    handleSelectedProduct,
    isQuickScanMode,
    setIsQuickScanMode,
    complete,
    completeInvCountError,
    searchProducts,
    onProductSelect,
    countInputRef,
  }
}
