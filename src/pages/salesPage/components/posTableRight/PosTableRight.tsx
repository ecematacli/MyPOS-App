import React, { Fragment, useState } from 'react';
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Divider,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';
import useAddPriceInputState from './useAddPriceInputState';
import { Product } from '../../../../redux/products/types';
import { TABLE_HEAD } from './tableHead';
import { currencyFormatter } from '../../../../common/utils';
import EditPricePopover from '../editPricePopover/EditPricePopover';
import Total from '../total/Total';

interface PosTableProps {
  products: Product[];
  deleteProduct: (id: number) => void;
  decreaseProductQuantity: (product: Product) => void;
  increaseProductQuantity: (product: Product) => void;
  editPriceLocalStorageState: (id: number, newPrice: number) => void;
  total: number;
  tax: number;
  discount: number;
  handleDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  completeSale: (
    products: Product[],
    total: number,
    discount: number,
    addNotification: (m: string, t: string) => void,
    discardSale: () => void
  ) => void;
  discardSale: () => void;
}

const PosTableRight: React.FC<PosTableProps> = ({
  products,
  deleteProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
  editPriceLocalStorageState,
  total,
  tax,
  discount,
  handleDiscountChange,
  completeSale,
  discardSale
}) => {
  const classes = styles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const {
    inputValue,
    handleInputChange,
    resetInput,
    editPriceValue
  } = useAddPriceInputState(id, products);

  const handleEditPriceClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    product: Product
  ) => {
    setAnchorEl(event.currentTarget);
    setId(id);
    setEditedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleCompleteEditClick = () => {
    if (inputValue && editedProduct.price !== inputValue) {
      editPriceValue(id);
      editPriceLocalStorageState(id, inputValue);
      setId(null);
    }
    resetInput();
    handleClose();
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
    products.map((product: Product) => {
      const { id, name, qty, price, discountPrice } = product;
      return (
        <TableRow
          className={classes.tableRow}
          role="checkbox"
          hover
          tabIndex={-1}
          key={id}
        >
          <TableCell className={classes.firstCell} component="th" scope="row">
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
          <TableCell align="right">
            <Fragment>
              <div
                className={classes.noPrice}
                onClick={e => handleEditPriceClick(e, id, product)}
              >
                {currencyFormatter(price)}
              </div>
              <EditPricePopover
                data-test="input-box"
                open={open}
                anchorEl={anchorEl}
                inputValue={inputValue}
                handleInputChange={handleInputChange}
                handleClose={handleClose}
                handleCompleteEditClick={handleCompleteEditClick}
              />
            </Fragment>
          </TableCell>
          <TableCell align="right">
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
        handleDiscountChange={handleDiscountChange}
        completeSale={completeSale}
        discardSale={discardSale}
      />
    </Paper>
  );
};

export default PosTableRight;
