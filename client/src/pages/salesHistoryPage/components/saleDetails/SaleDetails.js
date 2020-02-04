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
import { currencyFormatter } from '../../../../common/utils';
import { TABLE_HEAD } from './tableHead';

const SaleDetails = props => {
  const classes = styles(props);
  const {
    sale: { products, total }
  } = props;

  const tableHead = () => {
    return TABLE_HEAD.map(({ label, numeric }) => (
      <TableCell align={numeric && 'right'} key={label}>
        {label}
      </TableCell>
    ));
  };

  const tableBody = () => {
    return products.map(
      ({ sku, name, variation, qty, price, discountPrice }, key) => (
        <TableRow
          role="checkbox"
          hover
          tabIndex={-1}
          key={key}
          className={classes.tableBodyRow}
        >
          <TableCell>{sku}</TableCell>
          <TableCell>{name ? name : '-'}</TableCell>
          <TableCell align="right">{variation ? variation : '-'}</TableCell>
          <TableCell align="right">{qty}</TableCell>
          <TableCell align="right">
            {price ? currencyFormatter(price) : '-'}
          </TableCell>
          <TableCell align="right">
            {discountPrice ? currencyFormatter(discountPrice) : '-'}
          </TableCell>
        </TableRow>
      )
    );
  };

  return (
    <Paper className={classes.salesDetailsContainer}>
      <div className={classes.table}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>{tableHead()}</TableRow>
          </TableHead>
          <TableBody>{tableBody()}</TableBody>
        </Table>
      </div>
      <div className={classes.detailTotal}>
        <div>
          <Typography className={classes.total}>
            Total &nbsp; {currencyFormatter(total)}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default SaleDetails;
