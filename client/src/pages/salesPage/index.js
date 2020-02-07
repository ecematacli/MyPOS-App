import React from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import styles from './styles';
import useSalesState from './hooks/useSalesState';
import ProductSearchBar from './components/productSearchBar/ProductSearchBar';
import PosTableRight from './components/posTableRight/PosTableRight';
import { completeSale } from '../../redux/sales/salesActions';

const SalesPage = ({ completeSale }) => {
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
    <Grid
      container
      className={classes.gridContainer}
      spacing={3}
      justify="center"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.discardSaleGridItem}
      >
        <div className={classes.discardSaleBtnHolder}>
          <IconButton
            classes={{ root: classes.discardIconBtn }}
            onClick={discardSale}
          >
            <DeleteForeverIcon className={classes.discardSaleBtn} />
            <Typography>Discard Sale</Typography>
          </IconButton>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={5}
        className={classes.searchBarGridItem}
        zeroMinWidth
      >
        <ProductSearchBar addProduct={addProduct} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={5}
        className={classes.tableGridItem}
        zeroMinWidth
      >
        <PosTableRight
          products={products}
          deleteProduct={deleteProduct}
          decreaseProductQuantity={decreaseProductQuantity}
          increaseProductQuantity={increaseProductQuantity}
          total={total}
          tax={tax}
          discount={discount}
          handleDiscountChange={handleDiscountChange}
          completeSale={completeSale}
          discardSale={discardSale}
        />
      </Grid>
    </Grid>
  );
};

export default connect(null, { completeSale })(SalesPage);
