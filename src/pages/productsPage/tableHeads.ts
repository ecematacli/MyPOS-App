interface TableHead {
  label: string
  numeric?: boolean
}

export const TABLE_HEADS: TableHead[] = [
  { label: '' },
  {
    label: 'Sku',
  },
  {
    label: 'Name',
  },
  {
    label: 'Variation'
  },
  {
    label: 'Category',
  },
  {
    label: 'Brand',
  },
  {
    label: 'Price',
    numeric: true,
  },
  {
    label: 'Discounted Price',
    numeric: true,
  },
]
