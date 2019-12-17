import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Divider,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';
import useInputState from '../../../../common/hooks/useInputState';

const PosTableRight = ({
  products,
  deleteProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
  total,
  tax,
  discount,
  handleDiscountChange,
  lastPrice
}) => {
  const classes = styles();

  console.log(products);

  const productsArr = Object.values(products);

  const [discountInput, setDiscountInput] = useInputState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    handleDiscountChange(discountInput);
  };

  return (
    <Paper className={classes.paperRoot}>
      <Toolbar className={classes.toolbar}></Toolbar>
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          classes={{ root: classes.tableContent }}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Product</TableCell>
              <TableCell className={classes.qtHeaderCell}>Quantity</TableCell>
              <TableCell className={classes.priceHeaderCell} align="left">
                Price
              </TableCell>
              <TableCell
                colSpan={4}
                className={classes.headerCell}
                align="left"
              >
                <div className={classes.discountHeaderCell}>Discount</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsArr.map(product => {
              return (
                <TableRow hover tabIndex={-1} key={product.id}>
                  <TableCell component="th" id={product.id} scope="product">
                    {product.name}
                  </TableCell>
                  <TableCell padding="none">
                    <div className={classes.quantity}>
                      <div
                        className={classes.arrow}
                        onClick={() => {
                          decreaseProductQuantity(product);
                        }}
                      >
                        &#10094;
                      </div>
                      <div className={classes.quantityVal}>
                        {product.quantity}
                      </div>
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
                  <TableCell>{product.price}</TableCell>
                  <TableCell align="left">15780</TableCell>
                  <TableCell colSpan={3} align="right">
                    <IconButton onClick={() => deleteProduct(product.id)}>
                      <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Divider className={classes.totalDividerBg} />
      <Fragment>
        <div className={classes.totalSection}>
          <Typography>Sub-Total</Typography>
          <Typography>{total - tax}</Typography>
        </div>
        <div className={classes.totalSection}>
          <Typography>Tax</Typography>
          <Typography>{tax}</Typography>
        </div>
        <div className={classes.totalSection}>
          <Typography>Discount</Typography>
          <form onSubmit={handleFormSubmit}>
            <input
              className={classes.discountInput}
              value={discountInput}
              onChange={setDiscountInput}
            />
          </form>
        </div>
        <Divider className={classes.totalDividerEnd} />
        <div className={clsx(classes.totalSection, classes.totalAmount)}>
          <Typography>Total</Typography>
          <Typography>{lastPrice}</Typography>
        </div>
        <div className={classes.paymentBtnContainer}>
          <Button
            className={classes.paymentButton}
            fullWidth
            variant="contained"
          >
            <div className={classes.paymentBtnTextHolder}>
              <Typography className={classes.paymentBtnTxt}>
                Complete Payment
              </Typography>
              <Typography className={classes.paymentBtnTxt}>
                {lastPrice}
              </Typography>
            </div>
          </Button>
        </div>
      </Fragment>
    </Paper>
  );
};

export default PosTableRight;
