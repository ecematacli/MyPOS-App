import React, { useEffect, Fragment } from 'react';
import { Typography, Button } from '@material-ui/core';

import styles from './styles';
import history from '../../history';
import useInventoryBatchState from './hooks/useInventoryBatchState';
import BatchTable from './components/BatchTable';
import Loading from '../../common/components/loading';
import CustomTabs from '../../common/components/customTabs/CustomTabs';

const InventoryCountBatches: React.FC<{}> = () => {
  const classes = styles();

  const {
    batches,
    fetchCountBatches,
    loading,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    tabsValue,
    handleTabsChange,
  } = useInventoryBatchState();

  useEffect(() => {
    fetchCountBatches(page, rowsPerPage);
  }, []);

  const renderBatchActionPaper = () => (
    <Fragment>
      <CustomTabs
        centered
        textColor="secondary"
        tabsValue={tabsValue}
        handleChange={handleTabsChange}
        tabs={[
          { tab: 'Opened', value: 'opened' },
          { tab: 'Completed', value: 'completed' },
          { tab: 'Canceled', value: 'canceled' },
        ]}
        className={classes.tabs}
        classes={{ root: classes.tabRoot }}
      />

      <div className={classes.addCountContainer}>
        <div className={classes.addCountDiv}>
          <Typography className={classes.infoText}>
            Create, schedule and complete counts to keep track of your
            inventory.
          </Typography>
          <Button
            onClick={() => history.push('/inventory/count_create')}
            className={classes.addBtn}>
            <Typography className={classes.btnText}>
              Add Inventory Count
            </Typography>
          </Button>
        </div>
      </div>
    </Fragment>
  );

  const renderBatchData = () => (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.tableDiv}>
          <BatchTable
            batchesData={batches}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </div>
      )}
    </Fragment>
  );

  return (
    <div className={classes.inventoryContainer}>
      {renderBatchActionPaper()}
      {renderBatchData()}
    </div>
  );
};

export default InventoryCountBatches;
