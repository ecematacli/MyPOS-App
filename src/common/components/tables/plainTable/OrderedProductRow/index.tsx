import React from 'react'
import { TableRow, TableCell, IconButton } from '@mui/material'

import { OrderedProduct } from '../types'
import { currencyFormatter } from '../../../../utils'
import { SyncedIcon } from '../../../syncedIcon'
import { Align } from '../../../Align'
import { Refresh } from '@material-ui/icons'
import { useResync } from '../../../../hooks/useResync'

interface Props {
  row: OrderedProduct
}

const OrderedProductRow: React.FC<Props> = ({ row }) => {
  const { reSync } = useResync()

  const {
    id,
    name,
    barcode,
    sku,
    variation,
    brand,
    category,
    discountPrice,
    price,
    qty,
    synced,
  } = row

  return (
    <TableRow hover>
      <TableCell style={{ width: '12%' }}>{sku || '-'}</TableCell>
      <TableCell style={{ width: '30%' }}>{name || '-'}</TableCell>
      <TableCell style={{ width: '10%' }}>{variation || '-'}</TableCell>
      <TableCell style={{ width: '8%' }}>
        {category ? category.name : '-'}
      </TableCell>
      <TableCell style={{ width: '8%' }}>{brand ? brand.name : '-'}</TableCell>
      <TableCell align='right'>{price && currencyFormatter(price)}</TableCell>
      <TableCell align='right'>
        {discountPrice ? currencyFormatter(discountPrice) : '-'}
      </TableCell>
      <TableCell align='right'>{qty}</TableCell>
      <TableCell align='center'>
        <Align align='center'>
          <SyncedIcon synced={synced} />
          {!synced && (
            <IconButton size='small'>
              <Refresh
                onClick={() =>
                  reSync({ id, type: 'stockOrder', products: [row] })
                }
              />
            </IconButton>
          )}
        </Align>
      </TableCell>
    </TableRow>
  )
}

export default OrderedProductRow
