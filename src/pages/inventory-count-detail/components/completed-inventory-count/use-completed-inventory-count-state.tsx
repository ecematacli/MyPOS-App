import { useGetRequest } from '../../../../common/hooks/use-get-request'
import { BatchData, BatchesProductsData } from '../open-inventory-count/types'
import { useState, useEffect } from 'react'
import api from '../../../../api/api-client'

export const useCompletedInventoryCountState = (batchId: string) => {
  const [loading, setLoading] = useState(false)
  const { value: batch } = useGetRequest<BatchData>(
    `/inventory-count/${batchId}`
  )
  const [currentTab, setCurrentTab] = useState('all')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [batchProducts, setBatchProducts] = useState<BatchesProductsData>({
    counted: 0,
    uncounted: 0,
    synced: 0,
    notSynced: 0,
    products: [],
  })

  const tabValToSyncFilter = (tabVal: string) => {
    switch (tabVal) {
      case 'all':
        return null
      case 'synced':
        return 'true'
      case 'notSynced':
        return 'false'
    }
  }

  const fetchBatchProducts = async (
    id: string,
    status = 'all',
    page = 1,
    rowsPerPage = 10,
    synced?: string
  ) => {
    try {
      setLoading(true)
      const response = await api.get(
        `/inventory-count/${id}/products?page=${page}&rowsPerPage=${rowsPerPage}&status=${status}${
          synced ? `&synced=${synced}` : ''
        }`
      )
      const data: BatchesProductsData = response.data
      setBatchProducts(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleTabsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    setCurrentTab(newValue)
    setPage(1)
    fetchBatchProducts(
      batchId,
      newValue,
      1,
      rowsPerPage,
      tabValToSyncFilter(newValue)
    )
  }

  // Input handlers on pagination
  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value)
    setRowsPerPage(numValue)

    fetchBatchProducts(
      batchId,
      currentTab,
      page,
      numValue,
      tabValToSyncFilter(currentTab)
    )
  }

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return
    setPage(newPage + 1)
    fetchBatchProducts(
      batchId,
      currentTab,
      newPage + 1,
      rowsPerPage,
      tabValToSyncFilter(currentTab)
    )
  }

  useEffect(() => {
    fetchBatchProducts(batchId)
  }, [])

  return {
    currentTab,
    batch,
    page,
    rowsPerPage,
    batchProducts,
    handleTabsChange,
    handleChangeRowsPerPage,
    handleChangePage,
  }
}
