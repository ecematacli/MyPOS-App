import { useContext, useState } from 'react'

import { NotificationsContext } from '../../../contexts/NotificationsContext'
import api from '../../../api/api-client'
import { Outlet, ProductToTransfer } from '../types'
import { useGetRequest } from '../../../common/hooks/useGetRequest'
import history from '../../../history'

export const useNewTransferState = () => {
  const { addNotification } = useContext(NotificationsContext)
  const [products, setProducts] = useState<ProductToTransfer[]>([])
  const { error, value: outlets } = useGetRequest<Outlet[]>('/outlets')
  const [selectedOrigin, setSelectedOrigin] = useState<number>(0)
  const [selectedDestination, setSelectedDestination] = useState<number>(0)

  const addProduct = (newP: ProductToTransfer) => {
    const existing = products.find(p => p.id === newP.id)

    if (existing) {
      setProducts(pp =>
        pp.map(p =>
          p.id === existing.id
            ? { ...existing, qtyToTransfer: existing.qtyToTransfer + 1 }
            : p
        )
      )
    } else {
      setProducts(pp => [...pp, { ...newP, qtyToTransfer: 1 }])
    }
  }

  const changeQtyToTransfer = (id: number) => (change: number) => {
    setProducts(
      products.map(p =>
        p.id === id ? { ...p, qtyToTransfer: p.qtyToTransfer + change } : p
      )
    )
  }

  const searchProducts = async (
    query: string
  ): Promise<ProductToTransfer[]> => {
    try {
      const { data } = await api.get(`/products/search/?q=${query}`)
      return data
    } catch (e) {
      const errMessage = e?.response?.data || 'Unable to search with the query'
      addNotification(errMessage, 'error')
      return []
    }
  }

  const submit = async () => {
    if (!products.length) {
      return addNotification('Please add products', 'error')
    }
    if (!selectedDestination || !selectedOrigin) {
      return addNotification('Please select origin and destination', 'error')
    }
    try {
      await api.post(`/stock-transfers`, {
        originId: selectedOrigin,
        destinationId: selectedDestination,
        products: products.map(({ id, barcode, qtyToTransfer }) => ({
          id,
          barcode,
          qty: qtyToTransfer,
        })),
      })
      history.push('/inventory/stock-transfers')
    } catch (err) {
      addNotification(err.response?.data?.message, 'error')
    }
  }

  const changeOutlet = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case 'origin':
        return setSelectedOrigin(parseInt(value))
      case 'destination':
        return setSelectedDestination(parseInt(value))
    }
  }

  return {
    products,
    addProduct,
    searchProducts,
    submit,
    getOutletsError: error,
    outlets: outlets || [],
    selectedDestination,
    selectedOrigin,
    changeOutlet,
    changeQtyToTransfer,
  }
}
