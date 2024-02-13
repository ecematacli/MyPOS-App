import { useState } from 'react'

import { api } from '../../../api/api-client'
import { BatchesData } from '../types'

export const useInventoryBatchState = () => {
  const [loading, setLoading] = useState(false)
  const [batches, setBatches] = useState<BatchesData>({
    count: 0,
    batches: [],
  })
  const [tabsValue, setTabsValue] = useState('opened')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const fetchCountBatches = async (
    page: number,
    rowsPerPage: number,
    status = 'opened'
  ) => {
    try {
      const url = `/inventory-count?page=${page}&rowsPerPage=${rowsPerPage}&status=${status}`
      setLoading(true)
      const response = await api.get(url)
      const data: BatchesData = response.data
      setBatches(data)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return
    setPage(newPage + 1)
    fetchCountBatches(newPage + 1, rowsPerPage, tabsValue)
  }

  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value)
    setRowsPerPage(numValue)
    fetchCountBatches(page, numValue, tabsValue)
  }

  const handleTabsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    setTabsValue(newValue)
    fetchCountBatches(page, rowsPerPage, newValue)
  }

  return {
    fetchCountBatches,
    loading,
    batches,
    tabsValue,
    handleTabsChange,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
  }
}
