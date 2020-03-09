interface TableHead {
  label: string;
  numeric?: boolean;
}

export const TABLE_HEADS: TableHead[] = [
  {
    label: 'Sku'
  },
  {
    label: 'Product Name'
  },
  {
    label: 'Category'
  },
  {
    label: 'Brand'
  },
  {
    label: 'Price',
    numeric: true
  },
  {
    label: 'Discounted Price',
    numeric: true
  }
];
