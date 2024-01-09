import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { BatchesData } from '../types'
import { formatDate } from '../../../common/utils'
import PlainTable from '../../../common/components/tables/plainTable'

export const TableContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: '100%',
}))

interface Props {
  batchesData: BatchesData
  page: number
  rowsPerPage: number
  handleChangeRowsPerPage: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void
}

export const BatchTable: React.FC<Props> = ({
  batchesData,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
}) => {
  const { count, batches } = batchesData

  const formattedBatchData = () =>
    batches.map(batch => ({
      ...batch,
      started: batch.started && formatDate(batch.started, 'd MMMM y - p'),
      finished: batch.finished && formatDate(batch.finished, 'd MMMM y - p'),
    }))

  return (
    <TableContainer>
      <PlainTable
        tableHeads={[
          { name: 'Name' },
          { name: 'Started' },
          { name: 'Finished' },
          {
            name: 'Category',
          },
          { name: 'Brand', rightAlign: true },
        ]}
        count={count}
        hasDataToShow={formattedBatchData().length > 0}
        tableFor='InventoryCountBatches'
        rows={formattedBatchData()}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
      />
    </TableContainer>
  )
}
