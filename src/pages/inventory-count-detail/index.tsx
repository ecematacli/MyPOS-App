import React from 'react'
import { Box } from '@mui/material'
import { RouteComponentProps } from 'react-router-dom'

import { useGetRequest } from '../../common/hooks/useGetRequest'
import { OpenInventoryCount } from './components/open-inventory-count/open-inventory-count'
import { CompletedInventoryCountDetail } from './components/completed-inventory-count/completed-inventory-count'
import { BatchData } from './components/open-inventory-count/types'
import { PageContainer } from 'common/components/page-container/page-container'

interface Props extends RouteComponentProps<{ id: string }> {}

export const InventoryCountDetailPage: React.FC<Props> = ({
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
    <PageContainer>
      <Box pt={3}>
        {batch.status === 'Open' ? (
          <OpenInventoryCount batchId={id} />
        ) : (
          <CompletedInventoryCountDetail batchId={id} />
        )}
      </Box>
    </PageContainer>
  )
}
