import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';
import { Sale } from '../../../redux/sales/types';
import { Product } from '../../../redux/products/types';
import { TableProps, PaginationLabel } from './types';
import SaleRow from './saleRow/SaleRow';
import ProductRow from './productRow/ProductRow';

const CustomTable: React.FC<TableProps> = ({
  tableHeads,
  rows,
  tableType,
  rowsPerPage,
  page,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  component: Component,
}) => {
  const classes = styles();
  const [expandedRows, setExpandedRows] = useState<{
    [id: string]: boolean;
  }>({});

  const toggleExpanded = (id: number): void => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] });
  };

  const renderExpandIconContainer = (id: number) => (
    <div className={classes.expandIconContainer}>
      {expandedRows[id] ? (
        <ExpandLess className={classes.expandIcon} />
      ) : (
        <ExpandMore className={classes.expandIcon} />
      )}
    </div>
  );

  const renderTableHead = () => {
    return tableHeads.map(({ label, numeric }, i) => (
      <TableCell align={numeric ? 'right' : 'left'} key={i}>
        <div>{label}</div>
      </TableCell>
    ));
  };

  const renderNoDisplay = () => (
    <TableRow>
      <TableCell className={classes.noDisplayCell} colSpan={10}>
        <div className={classes.noDisplayMsg}>
          {`No ${tableType === 'sales' ? 'sales' : 'products'} to display`}
        </div>
      </TableCell>
    </TableRow>
  );

  const renderTableBody = () => {
    if ('sales' in rows) {
      return rows.sales.map((sale: Sale, i: number) => (
        <SaleRow
          key={sale.id}
          index={i}
          sale={sale}
          toggleExpanded={toggleExpanded}
          renderExpandIconContainer={renderExpandIconContainer}
          expandedRows={expandedRows}
          component={Component}
        />
      ));
    }

    if ('products' in rows) {
      return rows.products.map((product: Product, i: number) => (
        <ProductRow
          key={product.id}
          index={i}
          product={product}
          toggleExpanded={toggleExpanded}
          renderExpandIconContainer={renderExpandIconContainer}
          expandedRows={expandedRows}
          component={Component}
        />
      ));
    }
  };

  const renderLabelDisplayRows = ({ from, to, count }: PaginationLabel) => {
    return `Page ${page} of ${Math.ceil(
      count / rowsPerPage
    )}  -  ${count} items`;
  };

  const renderPagination = () => (
    <div className={classes.paginationContainer}>
      <TablePagination
        classes={{
          toolbar: classes.smallPagination,
          caption: classes.smallPagination,
          select: classes.smallPagination,
        }}
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={renderLabelDisplayRows}
      />
    </div>
  );

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
          <TableBody>
            {!count ? renderNoDisplay() : renderTableBody()}
          </TableBody>
        </Table>
      </div>
      {count > 1 && renderPagination()}
    </TableContainer>
  );
};

export default CustomTable;
