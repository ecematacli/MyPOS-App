import React, { useEffect, useState } from 'react'
import { Box, Grid, InputAdornment } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import DoneIcon from '@mui/icons-material/Done'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useTheme } from '@mui/material/styles'

import { PageContainer } from 'common/components/page-container/page-container'
import {
  DetailContentTypography,
  DetailsCard,
  PaperHead,
  PaperTitle,
  StyledIconButton,
  ProductDetailsContainer,
  StyledLabel,
  GridContainer,
  StyledInput,
} from './product-details-styles'
import { useProductQuery } from 'api/product/use-product-query'
import { useCategoriesQuery } from 'api/categories/use-categories-query'
import { useBrandsQuery } from 'api/brands/use-brands-query'
import { Product } from 'types/products'
import { Outlet } from 'types/outlets'
import { ENKA_OUTLET_ID, KOZA_OUTLET_ID } from 'constants/outlets'
import { useEditProductMutation } from 'api/product/use-product-mutation'
import { NotificationsContext } from 'contexts/notifications-context'
import { Loading } from 'common/components/loading/loading'

interface IProductDetailsProps {
  selectedProductId?: number
  setSelectedProductId?: React.Dispatch<React.SetStateAction<number | null>>
}

export const ProductDetailsPage = ({
  selectedProductId,
  setSelectedProductId,
}: IProductDetailsProps) => {
  const { id: idFromParam } = useParams<{ id: string }>()
  // const { addNotification } = useContext(NotificationsContext)
  const theme = useTheme()

  // The id can be either passed as a prop or as a route param
  const productId = Number(idFromParam) || selectedProductId

  const { data: product, isLoading: isProductLoading } = useProductQuery(
    productId!
  )
  const { data: categories } = useCategoriesQuery()
  const { data: brands } = useBrandsQuery()

  const [editedProductFields, setEditedProductFields] = useState<string[]>([])
  const [productInputValues, setProductInputValues] = useState<Product>(
    product!
  )
  const { mutate: editProduct } = useEditProductMutation()

  useEffect(() => {
    setProductInputValues(product!)
    setEditedProductFields([])
  }, [product])

  const getStoreQuantity = (product: Product, outletId: Outlet['id']) =>
    product.inventoryLevels.find(inventory => inventory.outletId === outletId)
      ?.qty

  const handleProductEditClick = (field: string) => {
    setEditedProductFields([...editedProductFields, field])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value
    const field = e.currentTarget.name

    // Only allow numbers for the mentioned fields
    if (field === 'price' || field === 'discountPrice' || field === 'barcode') {
      if (isNaN(Number(userInput))) {
        return null
      }
    }

    setProductInputValues(prevState => ({
      ...prevState,
      [field]:
        field === 'category' || field === 'brand'
          ? { ...prevState[field], name: userInput }
          : userInput,
    }))
  }

  const handleInventoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const userInput = e.target.value

    if (isNaN(Number(userInput)) && userInput.trim() !== '') {
      return null
    }

    setProductInputValues(prevState => {
      const newInventoryLevels = prevState.inventoryLevels.map(inventory => {
        return inventory.outletId === id
          ? { ...inventory, qty: Number(userInput) }
          : inventory
      })

      return { ...prevState, inventoryLevels: newInventoryLevels }
    })
  }

  const handleEditClick = () => {
    setEditedProductFields([
      ...Object.keys(productInputValues),
      'enkaQty',
      'kozaQty',
    ])
  }

  const handleOnCompleteEdit = () => {
    setEditedProductFields([])
    editProduct({
      updatedField: {
        ...productInputValues,
        taxRate: String(productInputValues.taxRate),
      },
      productId,
    })
  }

  if (!productInputValues || !brands || !categories) {
    return <React.Fragment />
  }

  if (isProductLoading) {
    return <Loading />
  }

  return (
    <PageContainer
      sx={{
        padding: theme.spacing(2, 3),
      }}>
      <Box component='span' display='flex' justifyContent='flex-end'>
        {selectedProductId && (
          <Close
            onClick={() => setSelectedProductId!(null)}
            sx={{ cursor: 'pointer', mt: '20px' }}
          />
        )}
      </Box>
      <ProductDetailsContainer data-testid='product-details'>
        <PaperHead hasSelectedProductId={!!selectedProductId}>
          <PaperTitle color='secondary'>Detaylar</PaperTitle>
          {editedProductFields.length ? (
            <StyledIconButton
              onClick={handleOnCompleteEdit}
              data-testid='edit-complete-button'>
              <DoneIcon />
            </StyledIconButton>
          ) : (
            <StyledIconButton
              onClick={handleEditClick}
              data-testid='edit-icon-button'>
              <EditOutlinedIcon />
            </StyledIconButton>
          )}
        </PaperHead>

        <DetailsCard hasSelectedProductId={!!selectedProductId}>
          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Ürün Adı: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('name') ? (
                <StyledInput
                  width='90%'
                  name='name'
                  value={productInputValues.name}
                  onChange={handleInputChange}
                />
              ) : (
                <DetailContentTypography
                  data-testid='product-name'
                  onClick={() => handleProductEditClick('name')}>
                  {productInputValues.name}
                </DetailContentTypography>
              )}
            </Grid>
          </GridContainer>

          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Enka Miktar: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('enkaQty') ? (
                <StyledInput
                  type='number'
                  name='inventoryLevels'
                  value={getStoreQuantity(productInputValues, ENKA_OUTLET_ID)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInventoryInputChange(e, ENKA_OUTLET_ID)
                  }
                />
              ) : (
                <DetailContentTypography
                  data-testid='enka-inventory-level'
                  onClick={() => handleProductEditClick('enkaQty')}>
                  {getStoreQuantity(productInputValues, ENKA_OUTLET_ID)}
                </DetailContentTypography>
              )}
            </Grid>
          </GridContainer>

          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Koza Miktar: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('kozaQty') ? (
                <StyledInput
                  type='number'
                  name='inventoryLevels'
                  value={getStoreQuantity(productInputValues, KOZA_OUTLET_ID)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInventoryInputChange(e, KOZA_OUTLET_ID)
                  }
                />
              ) : (
                <DetailContentTypography
                  data-testid='koza-inventory-level'
                  onClick={() => handleProductEditClick('kozaQty')}>
                  {getStoreQuantity(productInputValues, KOZA_OUTLET_ID)}
                </DetailContentTypography>
              )}
            </Grid>
          </GridContainer>

          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Barkod: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('barcode') ? (
                <StyledInput
                  name='barcode'
                  value={productInputValues.barcode}
                  onChange={handleInputChange}
                />
              ) : (
                <DetailContentTypography
                  data-testid='barcode'
                  onClick={() => handleProductEditClick('barcode')}>
                  {productInputValues.barcode}
                </DetailContentTypography>
              )}
            </Grid>
          </GridContainer>

          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Varyasyon: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('variation') ? (
                <StyledInput
                  name='variation'
                  value={productInputValues.variation}
                  onChange={handleInputChange}
                />
              ) : (
                <DetailContentTypography
                  data-testid='variation'
                  onClick={() => handleProductEditClick('variation')}>
                  {productInputValues.variation}
                </DetailContentTypography>
              )}
            </Grid>
          </GridContainer>

          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Fiyat: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('price') ? (
                <StyledInput
                  name='price'
                  value={productInputValues.price}
                  onChange={handleInputChange}
                  startAdornment={
                    <InputAdornment position='start'>&#x20BA;</InputAdornment>
                  }
                />
              ) : (
                <Box display='flex'>
                  <Box>&#x20BA;</Box>
                  <DetailContentTypography
                    data-testid='price'
                    onClick={() => handleProductEditClick('price')}>
                    {productInputValues.price}
                  </DetailContentTypography>
                </Box>
              )}
            </Grid>
          </GridContainer>

          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>İndirimli Fiyat: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('discountPrice') ? (
                <StyledInput
                  name='discountPrice'
                  value={productInputValues.discountPrice}
                  onChange={handleInputChange}
                  startAdornment={
                    <InputAdornment position='start'>&#x20BA;</InputAdornment>
                  }
                />
              ) : (
                <Box display='flex'>
                  <Box>&#x20BA;</Box>
                  <DetailContentTypography
                    data-testid='discount-price'
                    onClick={() => handleProductEditClick('discountPrice')}>
                    {productInputValues.discountPrice}
                  </DetailContentTypography>
                </Box>
              )}
            </Grid>
          </GridContainer>

          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Stok Kodu: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('sku') ? (
                <StyledInput
                  name='sku'
                  value={productInputValues.sku}
                  onChange={handleInputChange}
                />
              ) : (
                <DetailContentTypography
                  data-testid='sku'
                  onClick={() => handleProductEditClick('sku')}>
                  {productInputValues.sku}
                </DetailContentTypography>
              )}
            </Grid>
          </GridContainer>

          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Marka: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('brand') ? (
                <StyledInput
                  name='brand'
                  value={productInputValues.brand?.name}
                  onChange={handleInputChange}
                />
              ) : (
                <DetailContentTypography
                  data-testid='brand'
                  onClick={() => handleProductEditClick('brand')}>
                  {productInputValues.brand?.name}
                </DetailContentTypography>
              )}
            </Grid>
          </GridContainer>
          <GridContainer container>
            <Grid item xs={3}>
              <StyledLabel>Kategori adı: </StyledLabel>
            </Grid>
            <Grid item xs={selectedProductId ? 9 : 5}>
              {editedProductFields.includes('category') ? (
                <StyledInput
                  name='category'
                  value={productInputValues.category?.name}
                  onChange={handleInputChange}
                />
              ) : (
                <DetailContentTypography
                  data-testid='category'
                  onClick={() => handleProductEditClick('category')}>
                  {productInputValues.category?.name}
                </DetailContentTypography>
              )}
            </Grid>
          </GridContainer>
        </DetailsCard>
      </ProductDetailsContainer>
    </PageContainer>
  )
}
