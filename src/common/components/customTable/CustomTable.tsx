import React, { Fragment } from 'react';
import clsx from 'clsx';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Collapse
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';
import { TableProps } from './types';
import { currencyFormatter, totalQty } from '../../utils';
import useTableState from './useTableState';

const CustomTable: React.FC<TableProps> = props => {
  const classes = styles(props);
  const {
    tableHeads,
    rows,
    tableType,
    count,
    rowsPerPage,
    page,
    component: Component
  } = props;

  const {
    handleChangePage,
    handleChangeRowsPerPage,
    toggleExpanded,
    expandedRows
  } = useTableState(props);

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
    const rowClassName = (index: number) =>
      clsx(classes.tableBodyRow, classes[index % 2 ? 'whiteRow' : 'greenRow']);

    if (tableType === 'sales') {
      return rows.map((sale: any, i: number) => {
        const { id, createdAt, discount, total, products } = sale;
        return (
          <Fragment key={id}>
            <TableRow
              className={rowClassName(i)}
              onClick={() => toggleExpanded(id)}
            >
              <TableCell className={classes.tableCell}>
                <div className={classes.firstCellContainer}>
                  {renderExpandIconContainer(id)}
                  <div className={classes.firstCellItem}>{createdAt}</div>
                </div>
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {totalQty(products)}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {discount ? currencyFormatter(discount) : '-'}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {total ? currencyFormatter(total) : '-'}
              </TableCell>
            </TableRow>
            {expandedRows[id] ? (
              <TableRow key={id}>
                <TableCell padding="none" colSpan={12}>
                  <Collapse in={expandedRows[id]} timeout="auto" unmountOnExit>
                    <Component sale={sale} rowIndex={i} />
                  </Collapse>
                </TableCell>
              </TableRow>
            ) : null}
          </Fragment>
        );
      });
    }

    if (tableType === 'products') {
      return rows.map((product: any, i: number) => {
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
              className={rowClassName(i)}
              onClick={() => toggleExpanded(id)}
            >
              <TableCell className={classes.tableCell}>
                <div className={classes.firstCellContainer}>
                  {renderExpandIconContainer(id)}
                  <div className={classes.firstCellItem}>{sku ? sku : '-'}</div>
                </div>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {name ? name : '-'}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {category ? category.name : '-'}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {brand ? brand.name : '-'}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {price && currencyFormatter(price)}
              </TableCell>
              <TableCell align="right" className={classes.tableCell}>
                {discountPrice ? currencyFormatter(discountPrice) : '-'}
              </TableCell>
            </TableRow>
            {expandedRows[id] ? (
              <TableRow key={id}>
                <TableCell padding={'none'} colSpan={12}>
                  <Collapse in={expandedRows[id]} timeout="auto" unmountOnExit>
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

  const renderLabelFDisplayRows = ({ from, to, count }) =>
    `Page ${page} of ${Math.ceil(count / rowsPerPage)}  -  ${count} items`;

  const renderPagination = () => (
    <div className={classes.paginationContainer}>
      <TablePagination
        classes={{
          toolbar: classes.smallPagination,
          caption: classes.smallPagination,
          select: classes.smallPagination
        }}
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelDisplayedRows={renderLabelFDisplayRows}
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
            {!rows || !count ? renderNoDisplay() : renderTableBody()}
          </TableBody>
        </Table>
      </div>
      {rows && rows.length > 1 && renderPagination()}
    </TableContainer>
  );
};

export default CustomTable;
