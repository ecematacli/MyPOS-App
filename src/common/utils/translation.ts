export const translatePaymentMethodLabel = (label: string) => {
  switch (label) {
    case 'Cash':
      return 'Nakit'
    case 'Credit Card':
      return 'Kredi Kartı'
    case 'On Credit':
      return 'Veresiye'
    default:
      return ''
  }
}
