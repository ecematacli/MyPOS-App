interface TableHead {
  label: string
  numeric?: boolean
}

export const TABLE_HEADS: TableHead[] = [
  { label: '' },
  {
    label: 'Date',
  },
  { label: 'Outlet' },
  {
    label: 'Payment Method',
  },
  {
    label: 'Total Qty',
    numeric: true,
  },
  {
    label: 'Total Discount',
    numeric: true,
  },
  {
    label: 'Total Payment',
    numeric: true,
  },
]
