import React, { Fragment } from 'react'

import styles from './styles'
import { BatchesProductsData, BatchProduct } from '../../types'
import CustomTabs from '../../../../../../common/components/customTabs'
import PlainTable from '../../../../../../common/components/tables/plainTable'

export interface CountBatchesProductsTableProps {
  batchProducts: BatchesProductsData
  page: number
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => void
  rowsPerPage: number
  handleChangeRowsPerPage: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void
  selectedProductRow: BatchProduct
  tabsValue: string
  handleTabsChange: (e: React.ChangeEvent<HTMLInputElement>, newValue: string) => void
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
  const classes = styles()
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
      <div className={classes.tableSectionWrapper}>
        <CustomTabs
          tabsValue={tabsValue}
          handleChange={handleTabsChange}
          className={classes.tabs}
          classes={{ root: classes.tabRoot }}
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
          hasDataToShow={products.length > 1}
          noDataMessage='No products to show'
          count={getCountForTabs()}
          rows={{ type: 'batchProducts', batchProducts: products }}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          selectedRow={selectedProductRow}
        />
      </div>
    </Fragment>
  )
}

export default CountBatchesProductsTable
