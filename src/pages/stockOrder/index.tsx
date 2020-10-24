import React from 'react'

import styles from './styles'
import { Product } from '../../redux/products/types';
import { TABLE_HEADS } from './tableHeads';
import CustomTable from '../../common/components/tables/customTable'

interface Props {
  match: { params: { id: string } },
  location: { state: Product[] }
}

const StockOrderPage: React.FC<Props> = ({
  location: {
    state: products
  }
}) => {
  const classes = styles()

  return (
    <div className={classes.tableContainer}>
      <CustomTable
        tableType="products"
        rows={{ type: 'stockOrderProducts', products }}
        tableHeads={TABLE_HEADS}
        count={products.length}
        noPagination
      />
    </div>
  )
}



export default StockOrderPage