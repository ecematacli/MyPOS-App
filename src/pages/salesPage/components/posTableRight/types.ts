import { Product } from '../../../../redux/products/types'
import { PaymentMethod } from '../../hooks/types'

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>

export type SetNumberState = React.Dispatch<React.SetStateAction<number>>
export interface EditActionArgs {
  updatedField: { [key: string]: string }
  productId: number
  label: string
  addNotification: (m?: string, t?: string) => void
}

export type EditProductAction = ({
  updatedField,
  productId,
  label,
  addNotification,
}: EditActionArgs) => Promise<void>

export type EditProductFieldLocalStorageState = (
  id: number,
  field: string,
  newValue: number
) => void
export interface PosTableProps {
  products: Product[]
  deleteProduct: (id: number) => void
  decreaseProductQuantity: (product: Product) => void
  increaseProductQuantity: (product: Product) => void
  editProductFieldLocalStorageState: EditProductFieldLocalStorageState
  total: number
  setTotal: (t: number) => void
  tax: number
  discount: number
  setDiscount: SetNumberState
  percentageDiscount: number
  setPercentageDiscount: SetNumberState
  completeSale: (
    products: Product[],
    total: number,
    discount: number,
    description: string,
    paymentMethod: PaymentMethod,
    addNotification: (m: string, t: string) => void,
    discardSale: () => void
  ) => void
  discardSale: () => void
  editProduct: EditProductAction
  paymentMethod: PaymentMethod
  setPaymentMethod: (p: PaymentMethod) => void
  description: string
  setDescription: (d: string) => void
}

export interface TotalProps {
  products: Product[]
  total: number
  setTotal: (t: number) => void
  tax: number
  discount: number
  setDiscount: SetNumberState
  percentageDiscount: number
  setPercentageDiscount: SetNumberState
  discardSale: () => void
  anchorEl: { [key: string]: EventTarget & HTMLDivElement }
  handleEditClick: (e: ClickEvent, field: string, id?: number, product?: Product) => void
  onCompleteDiscountEditClick: (
    total: number,
    discountType: string,
    discountValue: number,
    setDiscount: SetNumberState,
    setPercentageDiscount: SetNumberState
  ) => void
  handleClose: (field: string) => void
}

export interface Args {
  products: Product[]
  editProduct: EditProductAction
  addNotification: (message: string, severity: string) => void
  editProductFieldLocalStorageState: EditProductFieldLocalStorageState
}
