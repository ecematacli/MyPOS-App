import React from 'react'
import { Box } from '@mui/material'
import { RouteComponentProps } from 'react-router-dom'

import { useGetRequest } from '../../common/hooks/useGetRequest'
import { OpenInventoryCount } from './components/open-inventory-count/open-inventory-count'
import { CompletedInventoryCountDetail } from './components/completed-inventory-count/completed-inventory-count'
import { BatchData } from './components/open-inventory-count/types'

interface Props extends RouteComponentProps<{ id: string }> {}

export const InventoryCountDetail: React.FC<Props> = ({
  match: {
    params: { id },
  },
}) => {
  const { value: batch, loading } = useGetRequest<BatchData>(
    `/inventory-count/${id}`
  )

  if (!batch || loading) {
    return null
  }

  return (
    <Box pt={3}>
      {batch.status === 'Open' ? (
        <OpenInventoryCount batchId={id} />
      ) : (
        <CompletedInventoryCountDetail batchId={id} />
      )}
    </Box>
  )
}
