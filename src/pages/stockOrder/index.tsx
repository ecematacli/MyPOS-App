import React from 'react'

import styles from './styles'
import { Product } from '../../redux/products/types'
import PlainTable from '../../common/components/tables/plainTable'
import { Align } from '../../common/components/Align'
import { Button, Typography } from '@material-ui/core'
import history from '../../history'
import { useResync } from '../../common/hooks/useResync'

interface Props {
  match: { params: { id: string } }
  location: { state: Product[] }
}

const tableHead = [
  { name: 'Sku' },
  { name: 'Name' },
  { name: 'Variation' },
  { name: 'Category' },
  { name: 'Brand' },
  { name: 'Price' },
  { name: 'Discounted Price' },
  { name: 'Quantity' },
  { name: 'Synced' },
]

const StockOrderPage: React.FC<Props> = ({
  location: { state: products },
  match: {
    params: { id },
  },
}) => {
  const classes = styles()
  const { reSync } = useResync()

  return (
    <Align vertical>
      <div className={classes.tableContainer}>
        <Align padding={[1]} justify='flex-end'>
          <Button
            variant='contained'
            onClick={() => reSync({ id: parseInt(id), products, type: 'stockOrder' })}
            style={{ marginRight: 10 }}>
            Sync
          </Button>
          <Button variant='contained' onClick={() => history.push('/inventory/stock-orders')}>
            Back
          </Button>
        </Align>
        <div className={classes.tableSectionWrapper}>
          <PlainTable tableHeads={tableHead} rows={products} tableFor='OrderedProducts' hasDataToShow />
        </div>
      </div>
    </Align>
  )
}

export default StockOrderPage
