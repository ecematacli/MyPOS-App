import React, { Fragment } from 'react';
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
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';

const PosTableRight = ({
  products,
  deleteProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
  total,
  tax,
  discount,
  handleDiscountChange,
  totalDiscount
}) => {
  const classes = styles();

  console.log(products);

  return (
    <Paper className={classes.paperRoot}>
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          classes={{ root: classes.tableContent }}
          size="medium"
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
                <div className={classes.discountHeaderCell}>Discounted P</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => {
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
                      <div className={classes.quantityVal}>{product.qty}</div>
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
                  <TableCell>&#x20BA;{product.price}</TableCell>
                  <TableCell align="left">
                    &#x20BA;{product.discountPrice}
                  </TableCell>
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
        <Divider className={classes.totalDividerEnd} />
        <div className={clsx(classes.totalSection, classes.totalAmount)}>
          <Typography>Total</Typography>
          <Typography>&#x20BA;{total - discount}</Typography>
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
                &#x20BA; {total - discount}
              </Typography>
            </div>
          </Button>
        </div>
      </Fragment>
    </Paper>
  );
};

export default PosTableRight;
