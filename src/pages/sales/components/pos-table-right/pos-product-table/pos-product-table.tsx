import React, { FC, ChangeEvent, Fragment } from 'react'

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
  Box,
} from '@mui/material'

import {
  ArrowBox,
  EditableAmountBox,
  PopOverTitle,
  QuantityBox,
  QuantityValueBox,
  StyledTableRow,
  DeleteIcon,
  TableWrapperBox,
} from './pos-product-table-styles'
import { TABLE_HEAD } from './table-head-data'
import { Product } from '../../../../../redux/products/types'
import { EditPricePopover } from '../../edit-product-field-popover/edit-product-field-popover'
import {
  currencyFormatter,
  productNameWithVariation,
} from '../../../../../common/utils'

interface Props {
  priceValue: number
  handlePriceChange: (e: ChangeEvent) => void
  handleDiscountedPriceChange: (e: ChangeEvent) => void
  onCompletePriceEditClick: (field: string, inputValue: number) => void
  discountedPriceValue: number
  anchorEl: { [key: string]: EventTarget & HTMLDivElement }
  handleClose: (field: string) => void
  products: Product[]
  deleteProduct: (id: number) => void
  decreaseProductQuantity: (product: Product) => void
  increaseProductQuantity: (product: Product) => void
  handleEditClick: (e: any, field: string, id: number, product: Product) => void
}

export const POSProductTable: FC<Props> = ({
  priceValue,
  handleDiscountedPriceChange,
  handlePriceChange,
  onCompletePriceEditClick,
  discountedPriceValue,
  anchorEl,
  handleClose,
  products,
  decreaseProductQuantity,
  deleteProduct,
  increaseProductQuantity,
  handleEditClick,
}) => {
  const translateText = (text: string) => {
    switch (text) {
      case 'price':
        return 'Fiyat'
      case 'discountPrice':
        return 'İndirimli Fiyat'
      default:
        return text
    }
  }

  const renderEditPopover = (
    field: string,
    title: string,
    value: number,
    handleValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label?: string
  ) => (
    <EditPricePopover
      data-test='input-box'
      title={title}
      field={field}
      open={Boolean(anchorEl && anchorEl[field])}
      anchorEl={anchorEl ? anchorEl[field] : null}
      inputValue={value}
      handleInputChange={handleValue}
      handleClose={() => handleClose(field)}
      currencySign
      handleCompleteEditClick={() => onCompletePriceEditClick(field, value)}
      popoverContentElement={
        <PopOverTitle sx={{ ...(field === 'discountPrice' && { width: 40 }) }}>
          {label ? label : translateText(field)}
        </PopOverTitle>
      }
    />
  )
  const renderTableHead = () =>
    TABLE_HEAD.map(({ label, numeric }, i) => (
      <TableCell
        sx={theme => ({ ...(i === 0 && { paddingLeft: theme.spacing(2.8) }) })}
        key={label}
        align={numeric ? 'right' : 'left'}>
        {label}
      </TableCell>
    ))

  const renderTableBody = () =>
    products.map((product: Product) => {
      const { id, name, qty, price, discountPrice, variation } = product
      return (
        <StyledTableRow role='checkbox' hover tabIndex={-1} key={id}>
          <TableCell
            sx={theme => ({ paddingLeft: theme.spacing(2.8) })}
            component='td'
            scope='row'>
            {productNameWithVariation(name, variation)}
          </TableCell>
          <TableCell align='right' padding='none'>
            <QuantityBox>
              <ArrowBox onClick={() => decreaseProductQuantity(product)}>
                &#10094;
              </ArrowBox>
              <QuantityValueBox>{qty}</QuantityValueBox>
              <ArrowBox onClick={() => increaseProductQuantity(product)}>
                &#10095;
              </ArrowBox>
            </QuantityBox>
          </TableCell>
          <TableCell align='right'>
            <Fragment>
              <EditableAmountBox
                onClick={e => handleEditClick(e, 'price', id, product)}>
                {currencyFormatter(price)}
              </EditableAmountBox>
              {renderEditPopover(
                'price',
                'Fiyat için miktar ekleyin',
                priceValue,
                handlePriceChange
              )}
            </Fragment>
          </TableCell>
          <TableCell align='right'>
            <Fragment>
              <EditableAmountBox
                onClick={e => handleEditClick(e, 'discountPrice', id, product)}>
                {discountPrice ? currencyFormatter(discountPrice) : '-'}
              </EditableAmountBox>
              {renderEditPopover(
                'discountPrice',
                'İndirimli fiyat için miktar ekleyin',
                discountedPriceValue,
                handleDiscountedPriceChange
              )}
            </Fragment>
          </TableCell>
          <TableCell colSpan={3} align='right'>
            <IconButton onClick={() => deleteProduct(product.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </StyledTableRow>
      )
    })

  return (
    <TableWrapperBox>
      <Table size='medium'>
        <TableHead>
          <StyledTableRow>{renderTableHead()}</StyledTableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </TableWrapperBox>
  )
}
