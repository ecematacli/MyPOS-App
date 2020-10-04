import React, { useState, useEffect } from 'react';
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
import { TopSellingData } from '../../types';
import Loading from '../../../../common/components/loading';

interface Props {
  loading: boolean;
  topSellingProducts: TopSellingData;
  fetchTopSellingProducts: (
    pageNumber: number,
    start: Date,
    end: Date
  ) => Promise<void>;
  startDate: Date;
  endDate: Date;
}

const TopSellingItems: React.FC<Props> = ({
  loading,
  topSellingProducts: { products, count },
  fetchTopSellingProducts,
  startDate,
  endDate
}) => {
  const classes = styles();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [startDate, endDate]);

  const onRightArrowClick = () => {
    const totalPageToShow = count / 3;
    if (pageNumber >= totalPageToShow) return;
    setPageNumber(prevPageNumber => prevPageNumber + 1);
    fetchTopSellingProducts(pageNumber, startDate, endDate);
  };

  const onLeftArrowClick = () => {
    if (pageNumber === 1) return;

    setPageNumber(prevPageNumber => prevPageNumber - 1);
    fetchTopSellingProducts(pageNumber, startDate, endDate);
  };

  const renderTableHead = () => (
    <TableRow className={classes.tableHeadRow}>
      {['Sku', 'Product Name', 'Variation', 'Unit Sold'].map((head, i) => (
        <TableCell align={i > 1 ? 'center' : 'left'} key={head}>
          {head}
        </TableCell>
      ))}
    </TableRow>
  );

  const renderTopSellingItems = () =>
    products
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

  return (
    <Paper className={classes.topSellingPaper}>
      <div className={classes.title}>
        <Typography>Top Selling Items</Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.topSellingContent}>
        <Table>
          <TableHead>{renderTableHead()}</TableHead>
          <TableBody>
            {loading || !products ? (
              <TableRow>
                <TableCell className={classes.displayMsgCell} colSpan={10}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <div className={classes.displayMsg}>
                      No top selling item to display
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              renderTopSellingItems()
            )}
          </TableBody>
        </Table>
      </div>
      {!loading && products && (
        <div className={classes.paginationContainer}>
          <div onClick={onLeftArrowClick} className={classes.arrowDiv}>
            <KeyboardArrowLeftIcon className={classes.arrowIcon} />
          </div>
          <div>{pageNumber}</div>
          <div onClick={onRightArrowClick} className={classes.arrowDiv}>
            <KeyboardArrowRightIcon className={classes.arrowIcon} />
          </div>
        </div>
      )}
    </Paper>
  );
};

export default TopSellingItems;
