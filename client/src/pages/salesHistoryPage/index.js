import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

import styles from './styles';
import { fetchSales } from '../../redux/sales/salesActions';

const SalesHistoryPage = ({ fetchSales, sales }) => {
  const classes = styles();

  useEffect(() => {
    fetchSales();
  }, []);

  console.log(sales);

  const tableBody = () => {
    return sales.map((sale, i) => {
      const formattedDate = format(new Date(sale.createdAt), ' d MMMM y - p');
      return (
        <TableRow
          style={i % 2 ? { background: '#f9f9f9' } : { background: 'white' }}
          key={sale.id}
        >
          <TableCell component="th" scope="row">
            {formattedDate}
          </TableCell>
          <TableCell align="center">10</TableCell>
          <TableCell align="center">1000</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Paper className={classes.historyTablePaper}>
      <div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="center">Total Quantity</TableCell>
              <TableCell align="center">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBody()}</TableBody>
        </Table>
      </div>
    </Paper>
  );
};

const mapStateToProps = ({ sales }) => ({
  sales: Object.values(sales)
});

export default connect(mapStateToProps, { fetchSales })(SalesHistoryPage);
