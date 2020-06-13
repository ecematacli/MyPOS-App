import React, { FC, ChangeEvent, Fragment } from 'react'

import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'

import styles from './styles'
import { TABLE_HEAD } from './tableHead'
import { Product } from '../../../../../redux/products/types'
import EditPricePopover from '../../editProductFieldPopover/EditProductFieldPopover'
import { capitalizeFirstLetters, currencyFormatter } from '../../../../../common/utils'

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
  const classes = styles()

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
        <div
          className={clsx(
            classes[field === 'discountPrice' && 'discounted'],
            classes.popoverTitle
          )}>
          {!label ? capitalizeFirstLetters(field) : label}
        </div>
      }
    />
  )
  const renderTableHead = () =>
    TABLE_HEAD.map(({ label, numeric }, i) => (
      <TableCell
        className={classes[i === 0 && 'firstCell']}
        key={label}
        align={numeric ? 'right' : 'left'}>
        {label}
      </TableCell>
    ))

  const renderTableBody = () =>
    products.map((product: Product) => {
      const { id, name, qty, price, discountPrice, variation } = product
      return (
        <TableRow className={classes.tableRow} role='checkbox' hover tabIndex={-1} key={id}>
          <TableCell className={classes.firstCell} component='td' scope='row'>
            {name}
            {variation ? ` | ${variation}` : ''}
          </TableCell>
          <TableCell align='right' padding='none'>
            <div className={classes.quantity}>
              <div
                className={classes.arrow}
                onClick={() => {
                  decreaseProductQuantity(product)
                }}>
                &#10094;
              </div>
              <div className={classes.quantityVal}>{qty}</div>
              <div
                className={classes.arrow}
                onClick={() => {
                  increaseProductQuantity(product)
                }}>
                &#10095;
              </div>
            </div>
          </TableCell>
          <TableCell align='right'>
            <Fragment>
              <div
                className={classes.editableAmount}
                onClick={e => handleEditClick(e, 'price', id, product)}>
                {currencyFormatter(price)}
              </div>
              {renderEditPopover(
                'price',
                'Add amount for price',
                priceValue,
                handlePriceChange
              )}
            </Fragment>
          </TableCell>
          <TableCell align='right'>
            <Fragment>
              <div
                className={classes.editableAmount}
                onClick={e => handleEditClick(e, 'discountPrice', id, product)}>
                {discountPrice ? currencyFormatter(discountPrice) : '-'}
              </div>
              {renderEditPopover(
                'discountPrice',
                'Add amount for discounted price',
                discountedPriceValue,
                handleDiscountedPriceChange,
                'Discounted Price'
              )}
            </Fragment>
          </TableCell>
          <TableCell colSpan={3} align='right'>
            <IconButton onClick={() => deleteProduct(product.id)}>
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })
  return (
    <div className={classes.tableWrapper}>
      <Table size='medium'>
        <TableHead>
          <TableRow className={classes.tableRow}>{renderTableHead()}</TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </div>
  )
}
