import React, { Fragment } from 'react'
import clsx from 'clsx'
import { TableCell, TableRow, Collapse, Chip, Tooltip } from '@material-ui/core'

import styles from './styles'
import { Sale } from '../../../../redux/sales/types'
import { currencyFormatter, totalQty, getPaymentMethodLabel } from '../../../utils'

interface Props {
  sale: Sale
  expandedRows: {
    [id: string]: boolean
  }
  toggleExpanded: (id: number) => void
  index: number
  renderExpandIconContainer: (id: number) => JSX.Element
  component: React.JSXElementConstructor<any>
}

const SaleRow: React.FC<Props> = ({
  sale,
  expandedRows,
  toggleExpanded,
  index,
  renderExpandIconContainer,
  component: Component,
}) => {
  const classes = styles()

  const { id, createdAt, discount, total, paymentMethod, outlet, orderNo, products } = sale

  const renderSaleDetails = () => (
    <TableRow key={id}>
      <TableCell padding='none' colSpan={12}>
        <Collapse in={expandedRows[id]} timeout='auto' unmountOnExit>
          <Component sale={sale} rowIndex={index} />
        </Collapse>
      </TableCell>
    </TableRow>
  )

  return (
    <Fragment key={id}>
      <TableRow
        className={clsx(classes.tableBodyRow, classes[index % 2 ? 'whiteRow' : 'greenRow'])}
        onClick={() => toggleExpanded(id)}>
        <TableCell>{renderExpandIconContainer(id)}</TableCell>
        <TableCell>{createdAt}</TableCell>
        <TableCell>
          <Tooltip title={orderNo} placement='top'>
            <Chip
              variant='outlined'
              label={outlet}
              className={outlet === 'Web' ? classes.blueChip : classes.redChip}
            />
          </Tooltip>
        </TableCell>
        <TableCell>{getPaymentMethodLabel(paymentMethod)}</TableCell>
        <TableCell align='right'>{totalQty(products)}</TableCell>
        <TableCell align='right'>{discount ? currencyFormatter(discount) : '-'}</TableCell>
        <TableCell align='right'>{total ? currencyFormatter(total) : '-'}</TableCell>
      </TableRow>
      {expandedRows[id] ? renderSaleDetails() : null}
    </Fragment>
  )
}

export default SaleRow
