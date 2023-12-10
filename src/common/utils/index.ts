import { format } from 'date-fns'

import { Product } from '../../redux/products/types'
import { Category } from '../../redux/categories/types'
import { Brand } from '../../redux/brands/types'
import { translatePaymentMethodLabel } from './translation'
import { PaymentMethod, PAYMENT_METHODS } from '../../redux/sales/types'

export const currencyFormatter = (num: number): string => {
  if (typeof num === 'undefined' || num === null) {
    return ''
  }
  // @ts-ignore
  return num.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
}

export const findMatchedFields = (
  fields: Category[] | Brand[],
  fieldToBeMatched: string
): Category | Brand =>
  fieldToBeMatched && fields.find(f => f.name === fieldToBeMatched)

export const formatDate = (dateToFormat: string | Date, formatType: string) =>
  dateToFormat && format(new Date(dateToFormat), formatType)

export const capitalize = (str: string) => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeFirstLetters = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')

export const totalQty = (products: Product[]) =>
  products?.reduce((acc: number, item: Product) => {
    return acc + item.qty
  }, 0) || 0

export const totalDiscount = (products: Product[]) =>
  products.reduce((acc: number, item: Product) => {
    return acc + item.discountPrice
  }, 0)

export const getPaymentMethodLabel = (pm: PaymentMethod) => {
  const paymentMethod = PAYMENT_METHODS.find(p => p.value === pm)
  return paymentMethod ? translatePaymentMethodLabel(paymentMethod.label) : ''
}

export const productNameWithVariation = (name: string, variation?: string) =>
  `${name}${variation ? ` / ${variation}` : ''}`
