import React, { useEffect, useState, useContext } from 'react'
import { connect } from 'react-redux'
import { Grid, IconButton, Typography, Box } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import StoreIcon from '@material-ui/icons/StoreOutlined'
import { Add } from '@material-ui/icons'

import styles from './styles'
import { completeSale } from '../../redux/sales/salesActions'
import { Product } from '../../redux/products/types'
import { fetchCategories } from '../../redux/categories/categoriesActions'
import { fetchBrands } from '../../redux/brands/brandsActions'
import useSalesState from './hooks/useSalesState'
import ProductSearchBar from './components/productSearchBar/ProductSearchBar'
import PosTableRight from './components/posTableRight'
import { PaymentMethod } from '../../redux/sales/types'
import CreateProductModal from './components/CreateProductModal'
import { AuthContext } from '../../contexts/AuthContext'
import { OutletName } from './components/outlet-name/OutletName'

interface SalesProps {
  completeSale: (
    products: Product[],
    total: number,
    discount: number,
    description: string,
    paymentMethod: PaymentMethod,
    addNotification: (m: string, t: string) => void,
    discardSale: () => void
  ) => void
  fetchBrands: () => void
  fetchCategories: () => void
}

const SalesPage: React.FC<SalesProps> = ({
  completeSale,
  fetchBrands,
  fetchCategories,
}) => {
  const classes = styles()
  const { user } = useContext(AuthContext)
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
    fetchCategories()
    fetchBrands()
  }, [])

  return (
    <div className={classes.salesPage}>
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
              completeSale={completeSale}
              discardSale={discardSale}
              {...rest}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default connect(null, {
  completeSale,
  fetchBrands,
  fetchCategories,
})(SalesPage)
