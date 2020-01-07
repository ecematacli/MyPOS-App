import React, { Fragment } from 'react';
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
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';
import { createSale } from '../../../../redux/sales/salesActions';
import CustomButton from '../../../../common/components/customButton/CustomButton';

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
    label: 'Discounted P',
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
  createSale
}) => {
  const classes = styles();

  const tableHead = () => {
    return TABLE_HEAD.map(({ label, numeric }) => {
      return (
        <TableCell key={label} align={numeric ? 'right' : 'left'}>
          {label}
        </TableCell>
      );
    });
  };

  const tableBody = () => {
    return products.map(product => {
      const { id, name, qty, price, discountPrice } = product;
      return (
        <TableRow role="checkbox" hover tabIndex={-1} key={id}>
          <TableCell component="th" id={id} scope="row">
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
          <TableCell align="right">&#x20BA;{price}</TableCell>
          <TableCell align="right">&#x20BA;{discountPrice}</TableCell>
          <TableCell colSpan={3} align="right">
            <IconButton onClick={() => deleteProduct(product.id)}>
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Paper className={classes.paperRoot}>
      <div className={classes.tableWrapper}>
        <Table classes={{ root: classes.tableContent }} size="medium">
          <TableHead>
            <TableRow>{tableHead()}</TableRow>
          </TableHead>
          <TableBody>{tableBody()}</TableBody>
        </Table>
      </div>
      <Divider className={classes.totalDivider} />
      <Fragment>
        <div className={classes.totalSection}>
          <Typography>Sub-Total</Typography>
          <Typography>&#x20BA;{total - tax}</Typography>
        </div>
        <div className={classes.totalSection}>
          <Typography>Tax</Typography>
          <Typography>&#x20BA;{tax}</Typography>
        </div>
        <div className={classes.totalSection}>
          <Typography>Discount</Typography>
          <OutlinedInput
            classes={{
              root: classes.discountInput,
              focused: classes.fieldInput,
              notchedOutline: classes.notchedOutline
            }}
            inputProps={{ style: { textAlign: 'right' } }}
            color="secondary"
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
          <Typography>&#x20BA;{total - discount}</Typography>
        </div>
        <div className={classes.paymentBtnContainer}>
          <CustomButton fullWidth>
            <div
              onClick={() => createSale(products, total, discount)}
              className={classes.paymentBtnTextHolder}
            >
              <Typography className={classes.paymentBtnTxt}>
                Complete Payment
              </Typography>
              <Typography className={classes.paymentBtnTxt}>
                &#x20BA; {total - discount}
              </Typography>
            </div>
          </CustomButton>
        </div>
      </Fragment>
    </Paper>
  );
};

export default connect(null, { createSale })(PosTableRight);
