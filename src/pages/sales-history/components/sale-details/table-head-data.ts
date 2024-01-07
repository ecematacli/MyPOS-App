interface TableHead {
  label: string;
  numeric?: boolean;
}

export const TABLE_HEAD: TableHead[] = [
  {
    label: 'Sku',
  },
  {
    label: 'Product Name',
  },
  {
    label: 'Synced',
  },
  {
    label: 'Variation',
    numeric: true,
  },
  {
    label: 'Quantity',
    numeric: true,
  },
  {
    label: 'Price',
    numeric: true,
  },
  {
    label: 'Discounted Price',
    numeric: true,
  },
];
