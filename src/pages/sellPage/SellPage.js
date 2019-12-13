import React from 'react';
import { TextField, Grid } from '@material-ui/core';

import styles from './styles';
import PosTableRight from './components/PosTableRight/PosTableRight';

const SellPage = () => {
  const classes = styles();

  return (
    <Grid container className={classes.gridContainer} spacing={10}>
      <div className={classes.salesContent}>
        <Grid item sm={5} md={6} lg={5}>
          <form>
            <TextField
              id="outlined-basic"
              label="Search for products..."
              style={{ width: '100%', color: 'black' }}
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item sm={4} md={5} lg={4}></Grid>
        <PosTableRight />
      </div>
    </Grid>
  );
};

export default SellPage;
