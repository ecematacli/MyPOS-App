import React, { useState } from 'react';
import { Paper, Tabs, Tab, Typography, Grid } from '@material-ui/core';

import styles from './styles';
import history from '../../history';
import inventoryImage from '../../assets/img/stocktake-emptylist-v1.png';
import CustomButton from '../../common/components/customButton/CustomButton';

const InventoryCount: React.FC = () => {
  const classes = styles();
  const [value, setValue] = useState(2);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.inventoryContainer}>
      <Grid className={classes.tabsPaper} component={Paper} container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="secondary"
            centered
          >
            <Tab classes={{ root: classes.tabRoot }} label="Opened" />
            <Tab classes={{ root: classes.tabRoot }} label="Completed" />
            <Tab classes={{ root: classes.tabRoot }} label="Canceled" />
          </Tabs>
        </Grid>
      </Grid>
      <div className={classes.addCountContainer}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.addCountPaper}
        >
          <Grid item xl={9} lg={9}>
            <Typography className={classes.infoText}>
              Create, schedule and complete counts to keep track of your
              inventory.
            </Typography>
          </Grid>
          <Grid item xl={3} lg={3}>
            <CustomButton
              className={classes.addBtn}
              onClick={() => history.push('/inventory/count_create')}
            >
              <Typography className={classes.addCountBtnDiv}>
                Add Inventory Count
              </Typography>
            </CustomButton>
          </Grid>
        </Grid>
      </div>
      <Grid container justify="center">
        <div className={classes.imageDiv}>
          <img src={inventoryImage} />
        </div>
      </Grid>
    </div>
  );
};

export default InventoryCount;
