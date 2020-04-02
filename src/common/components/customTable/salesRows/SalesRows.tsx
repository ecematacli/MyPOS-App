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
import { currencyFormatter, totalQty } from '../../../utils';

const SalesRows = ({
  sale,
  expandedRows,
  toggleExpanded,
  rowClassName,
  index,
  renderExpandIconContainer,
  component: Component
}) => {
  const classes = styles();
  const { id, createdAt, discount, total, products } = sale;

  return (
    <Fragment key={id}>
      <TableRow
        className={clsx(
          classes.tableBodyRow,
          classes[index % 2 ? 'whiteRow' : 'greenRow']
        )}
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
              <Component sale={sale} rowIndex={index} />
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </Fragment>
  );
};

export default SalesRows;
