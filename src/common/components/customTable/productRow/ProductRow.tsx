import React, { Fragment } from 'react';
import clsx from 'clsx';
import { TableCell, TableRow, Collapse } from '@material-ui/core';

import styles from './styles';
import { Product } from '../../../../redux/products/types';
import { currencyFormatter } from '../../../utils';

interface Props {
  product: Product;
  expandedRows: {
    [id: string]: boolean;
  };
  toggleExpanded: (id: number) => void;
  index: number;
  renderExpandIconContainer: (id: number) => JSX.Element;
  component: React.JSXElementConstructor<any>;
}

const ProductRow: React.FC<Props> = ({
  product,
  expandedRows,
  toggleExpanded,
  index,
  renderExpandIconContainer,
  component: Component
}) => {
  const classes = styles();

  const { id, sku, name, category, brand, price, discountPrice } = product;

  const renderProductDetails = () => (
    <TableRow key={id}>
      <TableCell padding={'none'} colSpan={12}>
        <Collapse in={expandedRows[id]} timeout="auto" unmountOnExit>
          <Component product={product} rowIndex={index} />
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
            <div className={classes.firstCellItem}>{sku ? sku : '-'}</div>
          </div>
        </TableCell>
        <TableCell className={classes.tableCell}>{name ? name : '-'}</TableCell>
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
      {expandedRows[id] ? renderProductDetails() : null}
    </Fragment>
  );
};

export default ProductRow;
