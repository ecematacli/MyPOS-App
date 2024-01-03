import React, { FC } from 'react'
import { Button, Typography } from '@mui/material'

import { Align } from '../../../common/components/Align'
import { Page } from '../../../common/components/page'
import PlainTable from '../../../common/components/tables/plainTable'
import { formatDate } from '../../../common/utils'
import { StockTransfer } from '../types'
import StockTransferProductRow from './StockTransferProductRow'

interface Props {
  transfer: StockTransfer
  goBack: () => void
}

export const TransferDetail: FC<Props> = ({ transfer, goBack }) => {
  const Actions = (
    <Align justify='flex-end' fullWidth>
      <Button
        onClick={goBack}
        variant='contained'
        color='primary'
        style={{ color: 'white' }}>
        Back
      </Button>
    </Align>
  )

  return (
    <Page
      title={`Stock Transfer ${transfer.id}`}
      loading={false}
      actions={Actions}>
      <Align vertical fullWidth>
        <Align width={30} vertical>
          <Typography>
            Created: {formatDate(transfer.createdAt, 'd MMM yyyy')}
          </Typography>
          <Typography>Origin: {transfer.origin.name}</Typography>
          <Typography>Destination: {transfer.destination.name}</Typography>
        </Align>
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
      </Align>
    </Page>
  )
}
