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

const PosTableRight = ({ products }) => {
  const classes = styles();

  const [selected, setSelected] = useState([]);

  const productsArr = Object.values(products);

  console.log(productsArr);

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
                  key={product.name}
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
                      <span className={classes.arrow}>&#10094;</span>
                      <div className={classes.quantityVal}>
                        {product.quantity}
                      </div>
                      <span className={classes.arrow}>&#10095;</span>
                    </div>
                  </TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="right">
                    <IconButton>
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
      <Total />
    </Paper>
  );
};

// PosTableRight.defaultProps = {
//   products: [
//     {
//       id: 1,
//       name: 'Nike Airmax',
//       quantity: 5,
//       price: 500,
//       taxRate: 15,
//       discount: 0
//     },
//     {
//       id: 2,
//       name: 'Adidas NMD',
//       quantity: 2,
//       price: 800.90,
//       taxRate: 15,
//       discount: '10%'
//     },
//     {
//       id: 3,
//       quantity: 1,
//       name: 'Adidas falcon',
//       price: 700.10,
//       taxRate: 8
//     }
//   ]
// };

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
