import { useContext } from 'react'
import { NotificationsContext } from '../../contexts/NotificationsContext'
import { Product } from '../../redux/products/types'
import api from '../../api/api-client'
import { OrderedProduct } from '../components/tables/plainTable/types'

interface SyncBody {
  type: 'sale' | 'stockOrder'
  id: number
  products: Product[] | OrderedProduct[]
}

export const useResync = () => {
  const { addNotification } = useContext(NotificationsContext)

  const reSync = async ({ type, id, products }: SyncBody) => {
    if (products.every(p => p.synced)) {
      return addNotification('Products are already synced', 'warning')
    }
    try {
      await api.post('/re-sync', {
        id,
        type,
        products: products
          .filter(p => !p.synced)
          .map(({ id, barcode, qty }) => ({ id, barcode, qty })),
      })
      addNotification('ReSync request sent', 'success')
    } catch (err) {
      addNotification(
        err.response?.data?.message || 'Something went wrong',
        'error'
      )
    }
  }

  return { reSync }
}
