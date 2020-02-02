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

const TopSellingItems = () => {
  const classes = styles();
  const renderProducts = () => {
    return (
      <TableRow key={Math.random()}>
        <TableCell>12342</TableCell>
        <TableCell>Adidas nmd</TableCell>
        <TableCell>37</TableCell>
        <TableCell>5</TableCell>
      </TableRow>
    );
    // if (!products) {
    //   return <TableRow />;
    // }
    // return products.map(({ sku, productName, variation, unitSold }, index) => (
    // <TableRow key={Math.random()}>
    //   <TableCell>12342</TableCell>
    //   <TableCell>Adidas nmd</TableCell>
    //   <TableCell>37</TableCell>
    //   <TableCell>5</TableCell>
    // </TableRow>
    // ));
  };

  return (
    <Paper className={classes.topSellingPaper}>
      <div className={classes.title}>
        <Typography>Top Selling Items</Typography>
      </div>
      <Divider />
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
      <div className={classes.pagination}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={5}
          rowsPerPage={25}
          page={10}
          onChangePage={() => 'y'}
          onChangeRowsPerPage={123}
        />
      </div>
    </Paper>
  );
};

export default TopSellingItems;

{
  /* <TableRow key={index}>
<TableCell>{sku}</TableCell>
<TableCell>{productName}</TableCell>
<TableCell>{variation}</TableCell>
<TableCell>{unitSold}</TableCell> */
}
