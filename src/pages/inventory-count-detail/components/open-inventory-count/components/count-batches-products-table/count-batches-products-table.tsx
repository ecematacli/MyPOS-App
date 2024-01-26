import React, { Fragment } from 'react'
import { Box } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import { BatchesProductsData, BatchProduct } from '../../types'
import { CustomTabs } from '../../../../../../common/components/custom-tabs/custom-tabs'
import { PlainTable } from '../../../../../../common/components/tables/plain-table/plain-table'

export const TableSectionContainer = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  maxWidth: theme.spacing(137.5),
}))

export interface CountBatchesProductsTableProps {
  batchProducts: BatchesProductsData
  page: number
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void
  rowsPerPage: number
  handleChangeRowsPerPage: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void
  selectedProductRow: BatchProduct
  tabsValue: string
  handleTabsChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => void
}

const CountBatchesProductsTable: React.FC<CountBatchesProductsTableProps> = ({
  batchProducts,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  selectedProductRow,
  tabsValue,
  handleTabsChange,
}) => {
  const theme = useTheme()
  const { counted, uncounted, products } = batchProducts

  const getCountForTabs = () => {
    const { counted, uncounted } = batchProducts
    if (tabsValue === 'all') {
      return counted + uncounted
    } else if (tabsValue === 'counted') {
      return counted
    } else {
      return uncounted
    }
  }
  return (
    <Fragment>
      <TableSectionContainer>
        <CustomTabs
          tabsValue={tabsValue}
          handleChange={handleTabsChange}
          styles={{
            boxShadow: 'none',
            marginTop: theme.spacing(2),
            color: theme.palette.grayColors[3],
            backgroundColor: 'inherit',
          }}
          stylesWithClasses={{
            root: { textTransform: 'none', fontSize: theme.spacing(2) },
          }}
          tabs={[
            {
              tab: `All (${counted + uncounted})`,
              value: 'all',
            },
            {
              tab: `Counted (${counted})`,
              value: 'counted',
            },
            {
              tab: `Uncounted (${uncounted})`,
              value: 'uncounted',
            },
          ]}
        />
        <PlainTable
          tableHeads={[
            { name: 'Barcode' },
            { name: 'Sku' },
            { name: 'Product' },
            { name: 'Expected', rightAlign: true },
            { name: 'Counted', rightAlign: true },
          ]}
          hasDataToShow={products.length >= 1}
          noDataMessage='No products to show'
          count={getCountForTabs()}
          tableFor='InventoryCountProducts'
          rows={products}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          selectedRow={selectedProductRow}
        />
      </TableSectionContainer>
    </Fragment>
  )
}

export default CountBatchesProductsTable
