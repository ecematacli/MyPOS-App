import React, { Fragment, useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Divider,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';
import { PosTableProps } from './types';
import { Product } from '../../../../redux/products/types';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import useEditProductFieldState from './useEditProductFieldState';
import { editProduct } from '../../../../redux/products/productsActions';
import { TABLE_HEAD } from './tableHead';
import { currencyFormatter } from '../../../../common/utils';
import { capitalizeFirstLetters } from '../../../../common/utils';
import EditPricePopover from '../editProductFieldPopover/EditProductFieldPopover';
import Total from '../total/Total';

const PosTableRight: React.FC<PosTableProps> = ({
  products,
  deleteProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
  editProductFieldLocalStorageState,
  total,
  tax,
  discount,
  setDiscount,
  percentageDiscount,
  setPercentageDiscount,
  completeSale,
  discardSale,
  editProduct,
}) => {
  const classes = styles();
  const { addNotification } = useContext(NotificationsContext);

  const {
    priceValue,
    handlePriceChange,
    discountedPriceValue,
    handleDiscountedPriceChange,
    handleEditClick,
    onCompletePriceEditClick,
    onCompleteDiscountEditClick,
    anchorEl,
    handleClose,
  } = useEditProductFieldState({
    products,
    editProduct,
    editProductFieldLocalStorageState,
    addNotification,
  });

  const renderEditPopover = (
    field: string,
    title: string,
    value: number,
    handleValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label?: string
  ) => (
    <EditPricePopover
      data-test="input-box"
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
  );

  const renderTableHead = () =>
    TABLE_HEAD.map(({ label, numeric }, i) => (
      <TableCell
        className={classes[i === 0 && 'firstCell']}
        key={label}
        align={numeric ? 'right' : 'left'}>
        {label}
      </TableCell>
    ));

  const renderTableBody = () =>
    products.map((product: Product) => {
      const { id, name, qty, price, discountPrice } = product;
      return (
        <TableRow
          className={classes.tableRow}
          role="checkbox"
          hover
          tabIndex={-1}
          key={id}>
          <TableCell className={classes.firstCell} component="th" scope="row">
            {name}
          </TableCell>
          <TableCell align="right" padding="none">
            <div className={classes.quantity}>
              <div
                className={classes.arrow}
                onClick={() => {
                  decreaseProductQuantity(product);
                }}>
                &#10094;
              </div>
              <div className={classes.quantityVal}>{qty}</div>
              <div
                className={classes.arrow}
                onClick={() => {
                  increaseProductQuantity(product);
                }}>
                &#10095;
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <Fragment>
              <div
                className={classes.editableAmount}
                onClick={(e) => handleEditClick(e, 'price', id, product)}>
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
          <TableCell align="right">
            <Fragment>
              <div
                className={classes.editableAmount}
                onClick={(e) =>
                  handleEditClick(e, 'discountPrice', id, product)
                }>
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
          <TableCell colSpan={3} align="right">
            <IconButton onClick={() => deleteProduct(product.id)}>
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Paper className={classes.paperRoot}>
      <div className={classes.tableWrapper}>
        <Table size="medium">
          <TableHead>
            <TableRow className={classes.tableRow}>
              {renderTableHead()}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </div>
      <Divider className={classes.totalDivider} />
      <Total
        products={products}
        total={total}
        tax={tax}
        discount={discount}
        setDiscount={setDiscount}
        percentageDiscount={percentageDiscount}
        setPercentageDiscount={setPercentageDiscount}
        completeSale={completeSale}
        discardSale={discardSale}
        anchorEl={anchorEl}
        handleEditClick={handleEditClick}
        onCompleteDiscountEditClick={onCompleteDiscountEditClick}
        handleClose={handleClose}
      />
    </Paper>
  );
};

export default connect(null, { editProduct })(PosTableRight);
