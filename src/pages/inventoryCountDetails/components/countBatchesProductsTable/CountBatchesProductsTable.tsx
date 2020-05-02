import React, { useState, Fragment } from 'react';

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
  handleSelectedRow,
  countInputRef,
}) => {
  const classes = styles();
  const { counted, uncounted, products } = batchProducts;

  const [tabsValue, setTabsValue] = useState(0);

  const handleTabsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => setTabsValue(newValue);

  return (
    <Fragment>
      <div className={classes.tabsDiv}>
        <CustomTabs
          tabsValue={tabsValue}
          handleChange={handleTabsChange}
          className={classes.tabs}
          classes={{ root: classes.tabRoot }}
          tabs={[
            `All (${counted + uncounted})`,
            `Counted (${counted})`,
            `Uncounted (${uncounted})`,
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
          noDataMessage={'No products to show'}
          count={counted + uncounted}
          rows={{ type: 'batchProducts', batchProducts: products }}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          selectedRow={selectedProductRow}
          handleSelectedRow={handleSelectedRow}
          countInputRef={countInputRef}
        />
      </div>
    </Fragment>
  );
};

export default CountBatchesProductsTable;
