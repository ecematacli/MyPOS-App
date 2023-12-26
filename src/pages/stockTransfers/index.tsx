import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { Align } from '../../common/components/Align'
import { Page } from '../../common/components/page'
import PlainTable from '../../common/components/tables/plainTable'
import { useGetRequest } from '../../common/hooks/useGetRequest'
import StockTransferRow from './StockTransferRow'
import { TransferDetail } from './transferDetail'
import { StockTransfer } from './types'

type Response = {
  stockTransfers: StockTransfer[]
}

interface Props {}

export const StockTransfers: FC<Props> = () => {
  const history = useHistory()

  const { loading, error, value } = useGetRequest<Response>('/stock-transfers')
  const [
    selectedTransfer,
    setSelectedTransfer,
  ] = useState<StockTransfer | null>(null)

  const Actions = (
    <Align justify='flex-end' fullWidth>
      <Button
        onClick={() => history.push('/inventory/stock-transfers/new')}
        variant='contained'
        color='primary'
        style={{ color: 'white' }}>
        New Transfer
      </Button>
    </Align>
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
