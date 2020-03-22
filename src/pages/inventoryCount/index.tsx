import React, { useState } from 'react';
import { Tabs, Tab, Typography } from '@material-ui/core';

import styles from './styles';
import history from '../../history';
import inventoryImage from '../../assets/img/stocktake-emptylist-v1.png';
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

  const renderAddCountActionPaper = () => (
    <div className={classes.addCountContainer}>
      <div className={classes.addCountDiv}>
        <Typography className={classes.infoText}>
          Create, schedule and complete counts to keep track of your inventory.
        </Typography>
        <CustomButton
          className={classes.addBtn}
          onClick={() => history.push('/inventory/count_create')}
        >
          <Typography className={classes.addCountBtnDiv}>
            Add Inventory Count
          </Typography>
        </CustomButton>
      </div>
    </div>
  );

  return (
    <div className={classes.inventoryContainer}>
      {renderInventoryTabs()}
      {renderAddCountActionPaper()}
      <InventoryCountBatchTable />
      {/* <div className={classes.imageDiv}>
        <img src={inventoryImage} />
      </div> */}
    </div>
  );
};

export default InventoryCount;
