import React from 'react';
import { TextField, Grid, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import styles from './styles';
import useSalesState from './hooks/useSalesState';
import PosTableRight from './components/PosTableRight/PosTableRight';

const SellPage = () => {
  const classes = styles();
  const {
    products,
    productsArr,
    deleteProduct,
    decreaseProductQuantity,
    increaseProductQuantity,
    total,
    tax,
    discount,
    handleDiscountChange
  } = useSalesState();

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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
          <PosTableRight
            products={products}
            productsArr={productsArr}
            deleteProduct={deleteProduct}
            decreaseProductQuantity={decreaseProductQuantity}
            increaseProductQuantity={increaseProductQuantity}
            total={total}
            tax={tax}
            discount={discount}
            handleDiscountChange={handleDiscountChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SellPage;
