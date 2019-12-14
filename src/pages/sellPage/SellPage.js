import React from 'react';
import { TextField, Grid } from '@material-ui/core';

import styles from './styles';
import PosTableRight from './components/PosTableRight/PosTableRight';

const SellPage = () => {
  const classes = styles();

  return (
    <div className={classes.salesContent}>
      <Grid
        container
        className={classes.gridContainer}
        spacing={10}
        justify="center"
      >
        <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
          <form>
            <TextField
              id="outlined-basic"
              color="secondary"
              label="Search for products..."
              className={classes.productSearchInput}
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
          <PosTableRight />
        </Grid>
      </Grid>
    </div>
  );
};

export default SellPage;
