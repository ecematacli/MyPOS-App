import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import styles from './styles';
import { completeSale } from '../../redux/sales/salesActions';
import { fetchCategories } from '../../redux/categories/categoriesActions';
import { fetchBrands } from '../../redux/brands/brandsActions';
import useSalesState from './hooks/useSalesState';
import ProductSearchBar from './components/productSearchBar/ProductSearchBar';
import PosTableRight from './components/posTableRight/PosTableRight';

const SalesPage = ({ completeSale, fetchBrands, fetchCategories }) => {
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

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  console.log('asd');
  return (
    <Grid container spacing={3} justify="center">
      <Grid item align="center" className={classes.discardSaleGridItem}>
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
        align="center"
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
        align="center"
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={5}
        className={classes.posTableGridItem}
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

export default connect(null, {
  completeSale,
  fetchBrands,
  fetchCategories
})(SalesPage);
