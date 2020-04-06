import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Typography, Button } from '@material-ui/core';

import styles from './styles';
import history from '../../history';
import { StoreState } from '../../redux/types';
import { Category } from '../../redux/categories/types';
import { Brand } from '../../redux/brands/types';
import useInventoryState from './hooks/useInventoryState';
import BatchTable from './components/batchTable/BatchTable';
import Loading from '../../common/components/loading';

interface InventoryProps {
  brands: Brand[];
  categories: Category[];
}

const InventoryCountPage: React.FC<InventoryProps> = ({
  brands,
  categories,
}) => {
  const classes = styles();

  const [value, setValue] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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

  const { batches, fetchCountBatches, loading } = useInventoryState(
    brands,
    categories
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchCountBatches(page, rowsPerPage);
  }, []);

  const renderInventoryTabs = () => (
    <Tabs
      className={classes.tabs}
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="secondary"
      centered
    >
      {['Opened', 'Completed', 'Canceled'].map((label: string) => (
        <Tab classes={{ root: classes.tabRoot }} key={label} label={label} />
      ))}
    </Tabs>
  );

  const renderAddCountPaper = () => (
    <div className={classes.addCountContainer}>
      <div className={classes.addCountDiv}>
        <Typography className={classes.infoText}>
          Create, schedule and complete counts to keep track of your inventory.
        </Typography>
        <Button
          onClick={() => history.push('/inventory/count_create')}
          className={classes.addBtn}
        >
          <Typography className={classes.btnText}>
            Add Inventory Count
          </Typography>
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes.inventoryContainer}>
      {renderInventoryTabs()}
      {renderAddCountPaper()}
      <Typography className={classes.pageStatusMsg}>
        Please kindly note that this page is under development for the time
        being.
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <BatchTable
          batchesData={batches}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  brands: state.brands,
  categories: state.categories,
});

export default connect(mapStateToProps)(InventoryCountPage);
