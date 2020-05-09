import React, { Fragment } from 'react';

import styles from './styles';
import PlainTable from '../../../../common/components/plainTable';
import { CountBatchesProductsTableProps } from '../../types';
import CustomTabs from '../../../../common/components/customTabs/CustomTabs';

const CountBatchesProductsTable: React.FC<CountBatchesProductsTableProps> = ({
  batchProducts,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  selectedProductRow,
  countCompletedRows,
  handleSelectedRow,
  countInputRef,
  tabsValue,
  handleTabsChange,
}) => {
  const classes = styles();
  const { counted, uncounted, products } = batchProducts;

  const getCountForTabs = () => {
    const { counted, uncounted } = batchProducts;
    if (tabsValue === 'all') {
      return counted + uncounted;
    } else if (tabsValue === 'counted') {
      return counted;
    } else {
      return uncounted;
    }
  };

  return (
    <Fragment>
      <div className={classes.tabsDiv}>
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
      </div>
      <div className={classes.tableDiv}>
        <PlainTable
          tableHeads={[
            { name: 'Barcode' },
            { name: 'Sku' },
            { name: 'Product' },
            { name: 'Expected', rightAlign: true },
            { name: 'Counted', rightAlign: true },
          ]}
          hasDataToShow={products.length > 1}
          noDataMessage="No products to show"
          count={getCountForTabs()}
          rows={{ type: 'batchProducts', batchProducts: products }}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          selectedRow={selectedProductRow}
          countCompletedRows={countCompletedRows}
          handleSelectedRow={handleSelectedRow}
          countInputRef={countInputRef}
        />
      </div>
    </Fragment>
  );
};

export default CountBatchesProductsTable;
