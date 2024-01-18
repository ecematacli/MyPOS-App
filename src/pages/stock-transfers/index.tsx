import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import Alert from '@mui/material/Alert'

import { Page } from './page/page'
import { PlainTable } from '../../common/components/tables/plain-table/plain-table'
import { useGetRequest } from '../../common/hooks/use-get-request'
import { StockTransferRow } from './stock-transfer-row'
import { TransferDetail } from './transfer-detail/transfer-detail'
import { StockTransfer } from './types'

type Response = {
  stockTransfers: StockTransfer[]
}

interface Props {}

export const StockTransfers: React.FC<Props> = () => {
  const history = useHistory()

  const { loading, error, value } = useGetRequest<Response>('/stock-transfers')
  const [
    selectedTransfer,
    setSelectedTransfer,
  ] = useState<StockTransfer | null>(null)

  const Actions = (
    <Box display='flex' justifyContent='flex-end' width='100%'>
      <Button
        onClick={() => history.push('/inventory/stock-transfers/new')}
        variant='contained'
        color='primary'
        style={{ color: 'white' }}>
        New Transfer
      </Button>
    </Box>
  )

  if (selectedTransfer) {
    return (
      <TransferDetail
        transfer={selectedTransfer}
        goBack={() => setSelectedTransfer(null)}
      />
    )
  }

  return (
    <Page
      title='Stock Transfers'
      description='List of stock transfers'
      loading={loading}
      actions={Actions}>
      {error && (
        <Alert elevation={6} variant='filled' severity='error'>
          {error.message || 'Unable to fetch stock transfers'}
        </Alert>
      )}
      <PlainTable
        tableHeads={[
          { name: 'Origin' },
          { name: 'Destination' },
          { name: 'Created At' },
          { name: 'Product Count' },
          { name: 'Total Quantity' },
        ]}
        hasDataToShow={value?.stockTransfers?.length > 0}
        rows={(value?.stockTransfers || []).map(t => (
          <StockTransferRow
            key={t.id}
            transfer={t}
            handleClick={() => setSelectedTransfer(t)}
          />
        ))}
        tableFor='StockTransfers'
      />
    </Page>
  )
}
