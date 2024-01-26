import { useState, useEffect } from 'react'

import api from '../../../api/api-client'
import { Product } from '../../../redux/products/types'

interface StockOrders {
  id: number
  createdAt: string
  products: Product[]
}

export default () => {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [stockOrders, setStockOrders] = useState<StockOrders[]>([])

  const fetchStockOrders = async () => {
    const response = await api.get('/stock-orders')
    setStockOrders(response.data?.stockOrders)
  }

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return
    setPage(newPage + 1)
    fetchStockOrders()
  }

  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value)
    setRowsPerPage(numValue)
    fetchStockOrders()
  }

  useEffect(() => {
    fetchStockOrders()
  }, [])

  return {
    loading,
    stockOrders,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
  }
}
