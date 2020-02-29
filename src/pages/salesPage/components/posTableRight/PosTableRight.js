import React, { useContext, Fragment, useState } from 'react';
import clsx from 'clsx';
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Divider,
  Typography,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';
import { currencyFormatter } from '../../../../common/utils';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import CustomInput from '../../../../common/components/customInput/CustomInput';
import CustomButton from '../../../../common/components/customButton/CustomButton';
import CustomPopover from '../../../../common/components/customPopover/CustomPopover';

const TABLE_HEAD = [
  {
    label: 'Product'
  },
  {
    label: 'Quantity'
  },
  {
    label: 'Price',
    numeric: true
  },
  {
    label: 'Discount Price',
    numeric: true
  },
  {
    label: ''
  }
];

const PosTableRight = ({
  products,
  deleteProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
  total,
  tax,
  discount,
  handleDiscountChange,
  completeSale,
  discardSale
}) => {
  const classes = styles();
  const { addNotification } = useContext(NotificationsContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onCompleteSaleClick = () => {
    completeSale(products, total, discount, addNotification, discardSale);
  };

  const getPriceValue = price => {
    return (
      <Fragment>
        <div onClick={handleClick}>{currencyFormatter(price)}</div>
        <CustomPopover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Typography className={classes.typography}>
            The content of the Popover.
          </Typography>
        </CustomPopover>
      </Fragment>
    );
  };

  const renderTableHead = () =>
    TABLE_HEAD.map(({ label, numeric }, i) => (
      <TableCell
        className={classes[i === 0 && 'firstCell']}
        key={label}
        align={numeric ? 'right' : 'left'}
      >
        {label}
      </TableCell>
    ));

  const renderTableBody = () =>
    products.map(product => {
      const { id, name, qty, price, discountPrice } = product;
      return (
        <TableRow
          className={classes.tableRow}
          role="checkbox"
          hover
          tabIndex={-1}
          key={id}
        >
          <TableCell
            className={classes.firstCell}
            component="th"
            id={id}
            scope="row"
          >
            {name}
          </TableCell>
          <TableCell align="right" padding="none">
            <div className={classes.quantity}>
              <div
                className={classes.arrow}
                onClick={() => {
                  decreaseProductQuantity(product);
                }}
              >
                &#10094;
              </div>
              <div className={classes.quantityVal}>{qty}</div>
              <div
                className={classes.arrow}
                onClick={() => {
                  increaseProductQuantity(product);
                }}
              >
                &#10095;
              </div>
            </div>
          </TableCell>
          <TableCell align="right">{getPriceValue(price)}</TableCell>
          <TableCell align={discountPrice ? 'right' : 'center'}>
            {discountPrice ? currencyFormatter(discountPrice) : '-'}
          </TableCell>
          <TableCell colSpan={3} align="right">
            <IconButton onClick={() => deleteProduct(product.id)}>
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

  const renderTotalSection = () => (
    <div className={classes.totalContentDiv}>
      <div className={classes.totalSection}>
        <Typography>Sub-Total</Typography>
        <Typography>{currencyFormatter(total - tax)}</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Tax</Typography>
        <Typography>{currencyFormatter(tax)}</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Discount</Typography>
        <CustomInput
          classesProp={{
            root: classes.discountInput,
            focused: classes.fieldInput,
            notchedOutline: classes.notchedOutline
          }}
          inputProps={{ style: { textAlign: 'right' } }}
          value={discount}
          onChange={handleDiscountChange}
          startAdornment={
            <InputAdornment position="start">&#x20BA;</InputAdornment>
          }
        />
      </div>
      <Divider className={classes.totalDivider} />
      <div className={clsx(classes.totalSection, classes.totalAmount)}>
        <Typography>Total</Typography>
        <Typography>{currencyFormatter(total - discount)}</Typography>
      </div>
      <div className={classes.paymentBtnContainer}>
        <CustomButton
          disabled={products.length < 1}
          onClick={onCompleteSaleClick}
          fullWidth
        >
          <div className={classes.paymentBtnTextHolder}>
            <Typography className={classes.paymentBtnTxt}>
              Complete Payment
            </Typography>
            <Typography className={classes.paymentBtnTxt}>
              {currencyFormatter(total - discount)}
            </Typography>
          </div>
        </CustomButton>
      </div>
    </div>
  );

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
      {renderTotalSection()}
    </Paper>
  );
};

export default PosTableRight;
