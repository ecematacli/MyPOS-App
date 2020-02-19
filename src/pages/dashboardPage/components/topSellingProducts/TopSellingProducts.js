import React, { useState } from 'react';
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

const TopSellingItems = ({
  topSellingProducts: { products, count },
  fetchTopSellingProducts
}) => {
  const classes = styles();
  const [pageNumber, setPageNumber] = useState(1);

  const onRightArrowClick = () => {
    const totalPageToShow = count / 3;
    if (pageNumber >= totalPageToShow) return;
    setPageNumber(prevPageNumber => prevPageNumber + 1);
    fetchTopSellingProducts(pageNumber);
  };

  const onLeftArrowClick = () => {
    if (pageNumber === 1) return;

    setPageNumber(prevPageNumber => prevPageNumber - 1);
    fetchTopSellingProducts(pageNumber);
  };

  const renderTopSellingItems = () => {
    return products
      .filter((product, i) => i < 3)
      .map(({ sku, name, variation, soldQty }, i) => (
        <TableRow className={classes.tableBodyRow} key={i}>
          <TableCell>{sku}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell align="center">{variation ? variation : '-'}</TableCell>
          <TableCell align="center">
            <div className={classes.soldQtyDiv}>
              <span className={classes.qtyData}>{soldQty}</span>
            </div>
          </TableCell>
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
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {['Sku', 'Product Name', 'Variation', 'Unit Sold'].map(
                (head, i) => (
                  <TableCell align={i > 1 ? 'center' : 'left'} key={head}>
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!products || products.length < 1 ? (
              <TableRow>
                <TableCell className={classes.noDisplayCell} colSpan={10}>
                  <div className={classes.noDisplayMsg}>
                    No top selling item to display
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              renderTopSellingItems()
            )}
          </TableBody>
        </Table>
      </div>
      <div className={classes.paginationContainer}>
        <div onClick={onLeftArrowClick} className={classes.arrowDiv}>
          <KeyboardArrowLeftIcon className={classes.arrowIcon} />
        </div>
        <div className={classes.pageCountText}>{pageNumber}</div>
        <div onClick={onRightArrowClick} className={classes.arrowDiv}>
          <KeyboardArrowRightIcon className={classes.arrowIcon} />
        </div>
      </div>
    </Paper>
  );
};

export default TopSellingItems;
