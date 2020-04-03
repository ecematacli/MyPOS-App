import React, { Fragment } from 'react';
import clsx from 'clsx';
import { TableCell, TableRow, Collapse } from '@material-ui/core';

import styles from './styles';
import { Sale } from '../../../../redux/sales/types';
import { currencyFormatter, totalQty } from '../../../utils';

interface Props {
  sale: Sale;
  expandedRows: {
    [id: string]: boolean;
  };
  toggleExpanded: (id: number) => void;
  index: number;
  renderExpandIconContainer: (id: number) => JSX.Element;
  component: React.JSXElementConstructor<any>;
}

const SaleRow: React.FC<Props> = ({
  sale,
  expandedRows,
  toggleExpanded,
  index,
  renderExpandIconContainer,
  component: Component
}) => {
  const classes = styles();

  const { id, createdAt, discount, total, products } = sale;

  const renderSaleDetails = () => (
    <TableRow key={id}>
      <TableCell padding="none" colSpan={12}>
        <Collapse in={expandedRows[id]} timeout="auto" unmountOnExit>
          <Component sale={sale} rowIndex={index} />
        </Collapse>
      </TableCell>
    </TableRow>
  );

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
      {expandedRows[id] ? renderSaleDetails() : null}
    </Fragment>
  );
};

export default SaleRow;
