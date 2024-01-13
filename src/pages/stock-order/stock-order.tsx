import React from 'react'
import { useHistory } from 'react-router-dom'

import { TableContainer } from './styles'
import { Product } from '../../redux/products/types'
import PlainTable from '../../common/components/tables/plainTable'
import { Box, Button } from '@mui/material'
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
  const history = useHistory()

  const { reSync } = useResync()

  return (
    <Box display='flex' flexDirection='column'>
      <TableContainer>
        <Box display='flex' padding={1} justifyContent='flex-end'>
          <Button
            variant='contained'
            onClick={() =>
              reSync({ id: parseInt(id), products, type: 'stockOrder' })
            }
            sx={{ marginRight: 10 }}>
            Sync
          </Button>
          <Button
            variant='contained'
            onClick={() => history.push('/inventory/stock-orders')}>
            Back
          </Button>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <PlainTable
            tableHeads={tableHead}
            rows={products}
            tableFor='OrderedProducts'
            hasDataToShow
          />
        </Box>
      </TableContainer>
    </Box>
  )
}

export default StockOrderPage
