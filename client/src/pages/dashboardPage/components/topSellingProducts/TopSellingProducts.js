import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@material-ui/core';

import styles from './styles';

const TopSellingItems = ({ topSellingProducts }) => {
  const classes = styles();
  const renderProducts = () => {
    if (!topSellingProducts) {
      return <TableRow />;
    }
    return topSellingProducts.map(({ sku, name, variation, soldQty }, i) => (
      <TableRow key={i}>
        <TableCell>{sku}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{variation}</TableCell>
        <TableCell>{soldQty}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Paper className={classes.topSellingPaper}>
      <div className={classes.title}>
        <Typography>Top Selling Items</Typography>
      </div>
      <Divider />
      <div className={classes.tableDiv}>
        <Table>
          <TableHead>
            <TableRow style={{ height: 48 }}>
              <TableCell>Sku</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Variation</TableCell>
              <TableCell>Unit Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderProducts()}</TableBody>
        </Table>
      </div>
      <div className={classes.pagination}>
        <TablePagination
          labelRowsPerPage=""
          // rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={5}
          // rowsPerPage={5}
          page={10}
          onChangePage={() => 'y'}
          // onChangeRowsPerPage={123}
        />
      </div>
    </Paper>
  );
};

export default TopSellingItems;
