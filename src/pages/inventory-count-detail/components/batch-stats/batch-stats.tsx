import React from 'react'

import { FieldBox, StatsSectionContainer } from './styles'

import { BatchData } from '../open-inventory-count/types'
import { formatDate } from '../../../../common/utils'
import { Box } from '@mui/material'

export const BatchStats: React.FC<{ batch: BatchData }> = ({ batch }) => (
  <StatsSectionContainer>
    <Box display='flex' mt='1em' mb='2em'>
      <Box display='flex' flexDirection='column' mr='3.5em'>
        <FieldBox display='flex' justifyContent='space-between' width='10em'>
          <Box component='span'>Start:</Box>
          {formatDate(batch.started, 'd MMM yyyy')}
        </FieldBox>
        <FieldBox display='flex' justifyContent='space-between' width='10em'>
          <Box component='span'>End:</Box>
          {batch.finished ? formatDate(batch.finished, 'd MMM yyyy') : '-'}
        </FieldBox>
      </Box>
      <Box display='flex' flexDirection='column'>
        <FieldBox display='flex' justifyContent='space-between' width='10em'>
          <Box component='span'>Category:</Box>
          {batch.category || '-'}
        </FieldBox>
        <FieldBox display='flex' justifyContent='space-between' width='10em'>
          <Box component='span'>Brand:</Box>
          {batch.brand || '-'}
        </FieldBox>
      </Box>
    </Box>
  </StatsSectionContainer>
)
