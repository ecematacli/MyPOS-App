import React, { useState } from 'react';
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Checkbox,
  Divider
} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';
import SelectedProductsToolbar from './components/SelectedProductsToolbar/SelectedProductsToolbar';
import PosTableHead from './components/PosTableHead/PosTableHead';
import Total from './components/Total/Total';

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

  const [selected, setSelected] = useState([]);

  console.log(products);

  // console.log(discount);

  const productsArr = Object.values(products);

  const handleSelectAllClick = e => {
    if (e.target.checked) {
      const newSelecteds = productsArr.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <Paper className={classes.paperRoot}>
      <SelectedProductsToolbar numSelected={selected.length} />
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <PosTableHead
            classes={classes}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={Object.values(products).length}
          />
          <TableBody>
            {productsArr.map((product, index) => {
              const isItemSelected = isSelected(product.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={product.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      onClick={e => handleClick(e, product.name)}
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      classes={{ checked: classes.checked }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="product"
                    padding="none"
                  >
                    {product.name}
                  </TableCell>
                  <TableCell align="center">
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
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="right">
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
      <Divider className={classes.totalDivider} />
      <Total
        total={total}
        tax={tax}
        discount={discount}
        handleDiscountChange={handleDiscountChange}
        lastPrice={lastPrice}
      />
    </Paper>
  );
};

export default PosTableRight;
//
/////
// const selectedProducts = {}

// const handleSelect = (id) => {
//   if (selectedProducts[id]) {
//     selectedProducts[id] = false
//   } else {
//     selectedProducts[id] = true
//   }
// }

// {
//   ['123asd']: false,
//   'asdasd': true
// }
