import React, { useState } from 'react';
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
  CircularProgress,
  TableSortLabel
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';

const CustomTable = ({
  tableHeads,
  sales,
  products,
  salesCount,
  productsCount,
  fetchSales,
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
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
    sales && fetchSales(1, e.target.value);
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
          <React.Fragment key={id}>
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
                &#x20BA;1000
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
          </React.Fragment>
        );
      });
    }

    if (products) {
      return products.map((product, i) => {
        return (
          <React.Fragment key={product.sku}>
            <TableRow
              className={clsx(
                classes.tableBodyRow,
                classes[i % 2 ? 'whiteRow' : 'greenRow']
              )}
              onClick={() => toggleExpanded(product.id)}
            >
              <TableCell className={classes.tableCell}>
                <div className={classes.firstCellContainer}>
                  <div className={classes.expandIconContainer}>
                    {expandedRows[product.id] ? (
                      <ExpandLess className={classes.expandIcon} />
                    ) : (
                      <ExpandMore className={classes.expandIcon} />
                    )}
                  </div>
                  <div className={classes.firstCellItem}>{product.sku}</div>
                </div>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {product.name}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {product.category}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {product.brand}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                &#x20BA;{product.price}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                &#x20BA;{product.discountedPrice}
              </TableCell>
            </TableRow>
            {expandedRows[product.id] ? (
              <TableRow key={product.id}>
                <TableCell padding={'none'} colSpan={12}>
                  <Collapse
                    hidden={!expandedRows[product.id]}
                    in={expandedRows[product.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Component />
                  </Collapse>
                </TableCell>
              </TableRow>
            ) : null}
          </React.Fragment>
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
