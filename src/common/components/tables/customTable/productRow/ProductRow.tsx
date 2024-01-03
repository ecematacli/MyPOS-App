import React, { Fragment } from 'react'
import clsx from 'clsx'
import { TableCell, TableRow, Collapse } from '@mui/material'

import styles from './styles'
import { Product } from '../../../../../redux/products/types'
import { currencyFormatter } from '../../../../utils'

interface Props {
  product: Product
  renderIconContainer: (id?: number) => JSX.Element
  index: number
  stockOrderProducts?: boolean
  expandedRows?: {
    [id: string]: boolean
  }
  toggleExpanded?: (id: number) => void
  component?: React.JSXElementConstructor<any>
}

const ProductRow: React.FC<Props> = ({
  product,
  expandedRows,
  toggleExpanded,
  index,
  renderIconContainer,
  stockOrderProducts,
  component: Component,
}) => {
  const classes = styles({ type: stockOrderProducts })

  const {
    id,
    sku,
    name,
    category,
    brand,
    price,
    discountPrice,
    variation,
  } = product

  const renderProductDetails = () => (
    <TableRow key={id}>
      <TableCell padding={'none'} colSpan={12}>
        <Collapse in={expandedRows[id]} timeout='auto' unmountOnExit>
          <Component product={product} rowIndex={index} />
        </Collapse>
      </TableCell>
    </TableRow>
  )

  return (
    <Fragment key={id}>
      <TableRow
        className={clsx(
          classes.tableBodyRow,
          classes[index % 2 ? 'whiteRow' : 'greenRow']
        )}
        onClick={() => toggleExpanded(id)}>
        <TableCell className={classes.tableCell}>
          {renderIconContainer(id)}
        </TableCell>
        <TableCell className={classes.tableCell}>
          <div className={classes.firstCellContainer}>
            <div className={classes.firstCellItem}>{sku || '-'}</div>
          </div>
        </TableCell>
        <TableCell className={classes.tableCell}>{name || '-'}</TableCell>
        <TableCell className={classes.tableCell}>{variation || '-'}</TableCell>
        <TableCell className={classes.tableCell}>
          {category ? category.name : '-'}
        </TableCell>
        <TableCell className={classes.tableCell}>
          {brand ? brand.name : '-'}
        </TableCell>
        <TableCell align='right' className={classes.tableCell}>
          {price && currencyFormatter(price)}
        </TableCell>
        <TableCell align='right' className={classes.tableCell}>
          {discountPrice ? currencyFormatter(discountPrice) : '-'}
        </TableCell>
      </TableRow>
      {expandedRows && expandedRows[id] ? renderProductDetails() : null}
    </Fragment>
  )
}

export default ProductRow
