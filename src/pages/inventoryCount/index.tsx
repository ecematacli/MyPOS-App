import React, { useState } from 'react';
import { Paper, Tabs, Tab, Typography } from '@material-ui/core';

import styles from './styles';
import history from '../../history';
import inventoryImage from '../../assets/img/stocktake-emptylist-v1.png';
import CustomButton from '../../common/components/customButton/CustomButton';

const InventoryCount: React.FC = () => {
  const classes = styles();
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.inventoryContainer}>
      <Paper className={classes.tabsPaper}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="secondary"
        >
          <Tab classes={{ root: classes.tabRoot }} label="Opened" />
          <Tab classes={{ root: classes.tabRoot }} label="Completed" />
          <Tab classes={{ root: classes.tabRoot }} label="Canceled" />
        </Tabs>
      </Paper>
      <Paper className={classes.addCountPaper}>
        <Typography className={classes.infoText}>
          Create, schedule and complete counts to keep track of your inventory.
        </Typography>
        <CustomButton onClick={() => history.push('/inventory/count_create')}>
          <Typography className={classes.addCountBtnDiv}>
            Add Inventory Count
          </Typography>
        </CustomButton>
      </Paper>
      <div className={classes.imageDiv}>
        <img src={inventoryImage} />
      </div>
    </div>
  );
};

export default InventoryCount;
