import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Collapse,
  TableSortLabel
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { currencyFormatter } from '../../utils/currencyFormatter';

import styles from './styles';

const CustomTable = ({
  tableHeads,
  sales,
  products,
  salesCount,
  productsCount,
  fetchSales,
  fetchProducts,
  component: Component
}) => {
  const classes = styles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState({});
  const [direction, setDirection] = useState('asc');

  const handleChangePage = (e, newPage) => {
    if (newPage < 0) return;
    setPage(newPage);
    sales && fetchSales(newPage, rowsPerPage);
    products && fetchProducts(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
    sales && fetchSales(1, e.target.value);
    products && fetchProducts(1, e.target.value);
  };

  const handleDirectionChange = () => {
    const isDesc = direction === 'desc';
    setDirection(isDesc ? 'asc' : 'desc');
  };

  const toggleExpanded = id => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] });
  };

  const displayedLabel = ({ from, count }) => {
    return `${from} of ${count}`;
  };

  const renderTableHead = () => {
    return tableHeads.map(({ label, numeric, sortLabel }, i) => (
      <TableCell align={numeric && 'right'} key={i}>
        {sortLabel ? (
          <TableSortLabel
            active={label.id}
            direction={direction}
            onClick={handleDirectionChange}
          >
            {label}
          </TableSortLabel>
        ) : (
          <div>{label}</div>
        )}
      </TableCell>
    ));
  };

  const renderTableBody = () => {
    if (sales) {
      return sales.map((sale, i) => {
        const { id, createdAt } = sale;
        return (
          <Fragment key={id}>
            <TableRow
              className={clsx(
                classes.tableBodyRow,
                classes[i % 2 ? 'whiteRow' : 'greenRow']
              )}
              onClick={() => toggleExpanded(id)}
            >
              <TableCell className={classes.tableCell}>
                <div className={classes.firstCellContainer}>
                  <div className={classes.expandIconContainer}>
                    {expandedRows[id] ? (
                      <ExpandLess className={classes.expandIcon} />
                    ) : (
                      <ExpandMore className={classes.expandIcon} />
                    )}
                  </div>
                  <div className={classes.firstCellItem}>{createdAt}</div>
                </div>
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                Cash
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                10
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {currencyFormatter(13454)}
              </TableCell>
            </TableRow>
            {expandedRows[id] ? (
              <TableRow key={id}>
                <TableCell padding={'none'} colSpan={12}>
                  <Collapse
                    hidden={!expandedRows[id]}
                    in={expandedRows[id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Component sale={sale} rowIndex={i} />
                  </Collapse>
                </TableCell>
              </TableRow>
            ) : null}
          </Fragment>
        );
      });
    }

    if (products) {
      return products.map((product, i) => {
        const {
          id,
          sku,
          name,
          category,
          brand,
          price,
          discountPrice
        } = product;
        return (
          <Fragment key={id}>
            <TableRow
              className={clsx(
                classes.tableBodyRow,
                classes[i % 2 ? 'whiteRow' : 'greenRow']
              )}
              onClick={() => toggleExpanded(id)}
            >
              <TableCell className={classes.tableCell}>
                <div className={classes.firstCellContainer}>
                  <div className={classes.expandIconContainer}>
                    {expandedRows[id] ? (
                      <ExpandLess className={classes.expandIcon} />
                    ) : (
                      <ExpandMore className={classes.expandIcon} />
                    )}
                  </div>
                  <div className={classes.firstCellItem}>{sku}</div>
                </div>
              </TableCell>
              <TableCell className={classes.tableCell}>{name}</TableCell>
              <TableCell className={classes.tableCell}>
                {category && category}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {brand && brand}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {price && currencyFormatter(price)}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {discountPrice && currencyFormatter(discountPrice)}
              </TableCell>
            </TableRow>
            {expandedRows[id] ? (
              <TableRow key={id}>
                <TableCell padding={'none'} colSpan={12}>
                  <Collapse
                    hidden={!expandedRows[id]}
                    in={expandedRows[id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Component product={product} rowIndex={i} />
                  </Collapse>
                </TableCell>
              </TableRow>
            ) : null}
          </Fragment>
        );
      });
    }
  };
  return (
    <TableContainer>
      <div className={classes.tableContainer}>
        <Table className={classes.table}>
          {tableHeads !== undefined ? (
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {renderTableHead()}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </div>
      <div className={classes.paginationContainer}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={salesCount}
          labelDisplayedRows={displayedLabel}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </TableContainer>
  );
};

export default CustomTable;
