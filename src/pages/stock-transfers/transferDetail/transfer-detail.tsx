import React from 'react'
import { Box, Button, Typography } from '@mui/material'

import { Page } from '../page/page'
import PlainTable from '../../../common/components/tables/plainTable'
import { formatDate } from '../../../common/utils'
import { StockTransfer } from '../types'
import { StockTransferProductRow } from './stock-transfer-product-row'

interface Props {
  transfer: StockTransfer
  goBack: () => void
}

export const TransferDetail: React.FC<Props> = ({ transfer, goBack }) => {
  const Actions = (
    <Box display='flex' justifyContent='flex-end' width='100%'>
      <Button
        onClick={goBack}
        variant='contained'
        color='primary'
        sx={{ color: 'white' }}>
        Back
      </Button>
    </Box>
  )

  return (
    <Page
      title={`Stock Transfer ${transfer.id}`}
      loading={false}
      actions={Actions}>
      <Box display='flex' flexDirection='column' width='100%'>
        <Box display='flex' flexDirection='column' width={'30em'}>
          <Typography>
            Created: {formatDate(transfer.createdAt, 'd MMM yyyy')}
          </Typography>
          <Typography>Origin: {transfer.origin.name}</Typography>
          <Typography>Destination: {transfer.destination.name}</Typography>
        </Box>
        <PlainTable
          tableHeads={[
            { name: 'Barcode' },
            { name: 'Sku' },
            { name: 'Name/Variation' },
            { name: 'TransferredQty' },
            { name: 'Brand' },
            { name: 'Category' },
            { name: 'Synced' },
          ]}
          hasDataToShow={transfer.products.length > 0}
          rows={transfer.products.map(p => (
            <StockTransferProductRow key={p.id} product={p} />
          ))}
          tableFor='StockTransferProducts'
        />
      </Box>
    </Page>
  )
}
