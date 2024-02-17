import { format } from 'date-fns'

import { Product } from '../../redux/products/types'
import { Category } from '../../redux/categories/types'
import { Brand } from '../../redux/brands/types'
import { translatePaymentMethodLabel } from './translation'
import { PaymentMethod, PAYMENT_METHODS } from '../../redux/sales/types'

export const currencyFormatter = (num?: number | null): string => {
  if (!num) {
    return '-'
  }
  // @ts-ignore
  return num.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
}

export const findMatchedFields = (
  fields: Category[] | Brand[],
  fieldToBeMatched?: string
) => fieldToBeMatched && fields.find(f => f.name === fieldToBeMatched)

export const formatDate = (dateToFormat: string | Date, formatType: string) =>
  dateToFormat && format(new Date(dateToFormat), formatType)

export const formatDateInLocale = (
  dateToFormat: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
  locale = 'tr-TR'
) => {
  const date = new Date(dateToFormat)
  return new Intl.DateTimeFormat(locale, options).format(date)
}

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

export const totalQty = (products: Product[]) => 0
// products?.reduce((acc: number, item: Product) => {
//   return acc + item.qty
// }, 0) || 0

export const totalDiscount = (products: Product[]) => 0
// products.reduce((acc: number, item: Product) => {
//   return acc + item?.discountPrice
// }, 0)

export const getPaymentMethodLabel = (pm: PaymentMethod) => {
  const paymentMethod = PAYMENT_METHODS.find(p => p.value === pm)
  return paymentMethod ? translatePaymentMethodLabel(paymentMethod.label) : ''
}

export const productNameWithVariation = (name: string, variation?: string) =>
  `${name}${variation ? ` / ${variation}` : ''}`
