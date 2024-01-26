import React from 'react'
import { TableRow, TableCell, IconButton, Box } from '@mui/material'
import Refresh from '@mui/icons-material/Refresh'

import { OrderedProduct } from '../types'
import { currencyFormatter } from '../../../../utils'
import { SyncedIcon } from '../../../synced-icon/synced-icon'
import { Align } from '../../../Align'
import { useResync } from '../../../../hooks/use-resync'

interface Props {
  row: OrderedProduct
}

export const OrderedProductRow: React.FC<Props> = ({ row }) => {
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
        <Box display='flex' alignItems='center'>
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
        </Box>
      </TableCell>
    </TableRow>
  )
}
