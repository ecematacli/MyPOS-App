import React, { useState, useEffect, Fragment } from 'react';
import { Typography, Button } from '@material-ui/core';

import styles from './styles';
import history from '../../history';
import useInventoryBatchState from './hooks/useInventoryBatchState';
import BatchTable from './components/BatchTable';
import Loading from '../../common/components/loading';
import CustomTabs from '../../common/components/customTabs/CustomTabs';

const InventoryCountBatches: React.FC<{}> = () => {
  const classes = styles();

  const [tabsValue, setTabsValue] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { batches, fetchCountBatches, loading } = useInventoryBatchState();

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return;
    setPage(newPage + 1);
    fetchCountBatches(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value);
    setRowsPerPage(numValue);
    fetchCountBatches(page, numValue);
  };

  const handleTabsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    setTabsValue(newValue);
  };

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
        tabs={['Opened', 'Completed', 'Canceled']}
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
      <Typography className={classes.pageStatusMsg}>
        Please kindly note that this page is under development for the time
        being.
      </Typography>
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
