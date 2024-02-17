import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Product } from '../../redux/products/types'
import { PageContainer } from 'common/components/page-container/page-container'
import { GridItem } from './products-styles'
import { ProductsTable } from './components/products-table/products-table'
import { ProductDetailsPage } from '../product-details/product-details'

export const ProductsPage = () => {
  const theme = useTheme()

  const [selectedProductId, setSelectedProductId] = useState<
    null | Product['id']
  >(null)

  return (
    <PageContainer
      sx={{
        padding: 0,
        height: '100%',
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(2),
        },
      }}>
      <Grid container height='100%'>
        <Grid
          item
          xs={12}
          md={selectedProductId ? 6 : 12}
          pt={5.8}
          height='100%'>
          <ProductsTable
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
          />
        </Grid>
        {selectedProductId && (
          <GridItem item md={6}>
            <ProductDetailsPage
              selectedProductId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
            />
          </GridItem>
        )}
      </Grid>
    </PageContainer>
  )
}
