import { RouteComponentProps } from 'react-router-dom'

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export interface LastCountedProduct {
  id: number
  sku: string
  barcode: string
  name: string
  variation: string
  counted: number
}

export interface BatchProduct {
  id: number
  sku: string
  barcode: string
  name: string
  variation: string
  expected: number
  counted: number | null
  updatedAt: string
  synced: boolean
}

export interface BatchesProductsData {
  counted: number
  uncounted: number
  products: BatchProduct[]
}

export interface BatchData {
  id: number
  status: string
  started: string
  finished: string | null
  name: string
  category: string
  brand: string
}

//Props of the components
interface RouterMatchProps {
  id: string
}

export interface InventoryCountDetailsProps extends RouteComponentProps<RouterMatchProps> {}
