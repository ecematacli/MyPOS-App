import React from 'react';
import {
  TextField
} from '@material-ui/core';

import { useStyles } from './useStyles';

const SellPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.salesContainer}>
      <div style={{ width: '100%' }} className="QQQQQQQQQQQQQ">
        <form>
          <TextField
            id="outlined-basic"
            label="Search for products..."
            style={{ width: '50%', color: 'black' }} variant="outlined"
          />
        </form>
      </div>
    </div>
  )
};

export default SellPage;