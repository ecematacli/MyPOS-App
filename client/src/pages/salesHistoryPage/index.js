import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
    console.log('use effect ran');
    fetchSales();
  }, []);

  console.log(sales);

  return (
    <Paper>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {sales.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = ({ sales }) => ({
  sales: Object.values(sales)
});

export default connect(mapStateToProps, { fetchSales })(SalesHistoryPage);
