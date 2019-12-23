import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import styles from './styles';
import useSalesState from './hooks/useSalesState';
import ProductSearchBar from './components/ProductSearchBar';
import PosTableRight from './components/PosTableRight/PosTableRight';

const SellPage = () => {
  const classes = styles();
  const {
    products,
    addProduct,
    deleteProduct,
    decreaseProductQuantity,
    increaseProductQuantity,
    discardSale,
    total,
    tax,
    discount,
    handleDiscountChange
  } = useSalesState();

  return (
    <div>
      <Grid
        container
        // spacing={10}
        justify="flex-end"
        style={{ padding: '0 50px' }}
      >
        <Grid item>
          <div className={classes.discardSaleBtnHolder}>
            <IconButton onClick={discardSale}>
              <DeleteForeverIcon className={classes.discardSaleBtn} />
            </IconButton>
            <Typography>Discard Sale</Typography>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridContainer}
        spacing={3}
        justify="center"
      >
        <Grid item xs={12} sm={12} md={12} lg={6} xl={5} zeroMinWidth>
          <ProductSearchBar addProduct={addProduct} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={5} zeroMinWidth>
          <PosTableRight
            products={products}
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
