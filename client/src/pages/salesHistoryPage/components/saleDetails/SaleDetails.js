import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import styles from './styles';

const SaleDetails = props => {
  const classes = styles(props);
  const { sale } = props;
  const { products } = sale;

  const tableBody = () => {
    return products.map((product, key) => (
      <TableRow key={key} className={classes.tableBodyRow}>
        <TableCell>{product.sku}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.variation}</TableCell>
        <TableCell>{product.qty}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell>{product.discountPrice}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Paper className={classes.salesDetailsContainer}>
      <div className={classes.table}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {[
                'Sku',
                'Product Name',
                'Variation',
                'Quantity',
                'Price',
                'Discounted Price'
              ].map((head, i) => {
                return (
                  <TableCell className={classes.tableHeadCell} key={i}>
                    {head}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>{tableBody()}</TableBody>
        </Table>
      </div>
      <div className={classes.detailTotal}>
        <div>
          <Typography className={classes.total}>
            Total &nbsp; &#x20BA; 5000
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default SaleDetails;
