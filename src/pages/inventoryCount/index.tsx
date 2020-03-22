import React, { useState } from 'react';
import { Tabs, Tab, Typography, Button } from '@material-ui/core';

import styles from './styles';
import history from '../../history';
import CustomButton from '../../common/components/customButton';
import InventoryCountBatchTable from './components/batchTable/BatchTable';

const InventoryCount: React.FC = () => {
  const classes = styles();
  const [value, setValue] = useState(2);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    setValue(newValue);
  };

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
      <InventoryCountBatchTable />
    </div>
  );
};

export default InventoryCount;
