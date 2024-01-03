import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Typography, Box } from '@mui/material'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Add } from '@material-ui/icons'
import { useDispatch } from 'react-redux'

import styles from './styles'
import { fetchCategories } from '../../redux/categories/categoriesActions'
import { fetchBrands } from '../../redux/brands/brandsActions'
import useSalesState from './hooks/useSalesState'
import ProductSearchBar from './components/productSearchBar/ProductSearchBar'
import { PosTableRight } from './components/pos-table-right/pos-table-right'
import CreateProductModal from './components/CreateProductModal'
import { OutletName } from './components/outlet-name/OutletName'

export const Sales = () => {
  const classes = styles()
  const dispatch = useDispatch()

  const [createProductModalOpen, setCreateProductModalOpen] = useState(false)
  const {
    products,
    addProduct,
    deleteProduct,
    decreaseProductQuantity,
    increaseProductQuantity,
    editProductField,
    createProduct,
    discardSale,
    total,
    tax,
    discount,
    setDiscount,
    percentageDiscount,
    setPercentageDiscount,
    ...rest
  } = useSalesState()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchBrands())
  }, [])

  return (
    <Box className={classes.salesPage}>
      <CreateProductModal
        open={createProductModalOpen}
        onClose={() => setCreateProductModalOpen(false)}
        createProduct={createProduct}
      />
      <Box className={classes.salesContainer}>
        <Grid container spacing={0} justify='center'>
          {/*
         // @ts-ignore */}
          <Grid item align='center' className={classes.discardSaleGridItem}>
            <Box className={classes.discardSaleBtnHolder}>
              <OutletName />
              <Box>
                <IconButton
                  classes={{ root: classes.iconBtn }}
                  onClick={discardSale}>
                  <DeleteForeverIcon />
                  <Typography>Satışı İptal Et</Typography>
                </IconButton>
                <IconButton
                  classes={{ root: classes.iconBtn }}
                  onClick={() => setCreateProductModalOpen(true)}>
                  <Add />
                  <Typography>Ürün Ekle</Typography>
                </IconButton>
              </Box>
            </Box>
          </Grid>
          {/*
        // @ts-ignore */}
          <Grid
            item
            align='center'
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={5}
            className={classes.searchBarGridItem}
            zeroMinWidth>
            <ProductSearchBar addProduct={addProduct} />
          </Grid>
          {/*
        // @ts-ignore */}
          <Grid
            item
            align='center'
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            className={classes.posTableGridItem}
            zeroMinWidth>
            <PosTableRight
              products={products}
              deleteProduct={deleteProduct}
              decreaseProductQuantity={decreaseProductQuantity}
              increaseProductQuantity={increaseProductQuantity}
              editProductFieldLocalStorageState={editProductField}
              total={total}
              tax={tax}
              discount={discount}
              setDiscount={setDiscount}
              percentageDiscount={percentageDiscount}
              setPercentageDiscount={setPercentageDiscount}
              discardSale={discardSale}
              {...rest}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
