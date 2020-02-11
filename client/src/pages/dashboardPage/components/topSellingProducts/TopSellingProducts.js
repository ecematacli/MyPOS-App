import React from 'react';
import clsx from 'clsx';
import {
  Paper,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import styles from './styles';

const TopSellingItems = ({ topSellingProducts }) => {
  const classes = styles();
  const renderTopSellingItems = () => {
    if (!topSellingProducts) {
      return <TableRow />;
    }
    return topSellingProducts
      .filter((product, i) => i < 3)
      .map(({ sku, name, variation, soldQty }, i) => (
        <TableRow className={classes.tableBodyRow} key={i}>
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
      <Divider className={classes.divider} />
      <div className={classes.topSellingContent}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {['Sku', 'Product Name', 'Variation', 'Unit Sold'].map(head => (
                <TableCell key={head}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderTopSellingItems()}</TableBody>
        </Table>
        <div className={classes.paginationContainer}>
          <div className={classes.paginationItemsDiv}>
            <div className={classes.arrowDiv}>
              <KeyboardArrowLeftIcon className={classes.arrowIcon} />
            </div>
            <div className={classes.pageCount}>1</div>
            <div className={classes.arrowDiv}>
              <KeyboardArrowRightIcon className={classes.arrowIcon} />
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default TopSellingItems;
