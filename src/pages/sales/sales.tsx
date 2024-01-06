import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, IconButton, Typography, Box } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Add from '@mui/icons-material/Add'

import {
  ActionGridItem,
  PosTableGridItem,
  SalesContainer,
  SalesPageContainer,
  SearchBarGridItem,
} from './sales-styles'
import { fetchCategories } from '../../redux/categories/categoriesActions'
import { fetchBrands } from '../../redux/brands/brandsActions'
import { useSalesState } from './hooks/use-sales-state'
import { ProductSearchBar } from './components/product-searchbar/product-searchbar'
import { PosTableRight } from './components/pos-table-right/pos-table-right'
import { CreateProductModal } from './components/create-product-modal/create-product-modal'
import { OutletName } from './components/outlet-name/outlet-name'

export const Sales = () => {
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
    <SalesPageContainer>
      <CreateProductModal
        open={createProductModalOpen}
        onClose={() => setCreateProductModalOpen(false)}
        createProduct={createProduct}
      />
      <SalesContainer>
        <Grid container spacing={2}>
          <ActionGridItem xs={12} item>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'>
              <OutletName />
              <Box>
                <IconButton
                  sx={{
                    borderRadius: 0,
                  }}
                  onClick={discardSale}>
                  <DeleteForeverIcon />
                  <Typography>Satışı İptal Et</Typography>
                </IconButton>
                <IconButton
                  sx={{
                    borderRadius: 0,
                  }}
                  onClick={() => setCreateProductModalOpen(true)}>
                  <Add />
                  <Typography>Ürün Ekle</Typography>
                </IconButton>
              </Box>
            </Box>
          </ActionGridItem>
          <SearchBarGridItem
            item
            alignItems='center'
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            zeroMinWidth>
            <ProductSearchBar addProduct={addProduct} />
          </SearchBarGridItem>
          <PosTableGridItem
            item
            alignItems='center'
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
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
          </PosTableGridItem>
        </Grid>
      </SalesContainer>
    </SalesPageContainer>
  )
}
