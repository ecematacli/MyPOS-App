import React, { useContext, useState } from 'react'
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'

import api from '../../../../api'
import styles from './styles'
import { Sale } from '../../../../redux/sales/types'
import { currencyFormatter } from '../../../../common/utils'
import { SyncedIcon } from '../../../../common/components/syncedIcon'
import { TABLE_HEAD } from './tableHead'
import { Refresh } from '@material-ui/icons'
import { Align } from '../../../../common/components/Align'
import { NotificationsContext } from '../../../../contexts/NotificationsContext'
import { Product } from '../../../../redux/products/types'

interface DetailsProps {
  sale: Sale
  rowIndex: number
}

const SaleDetails: React.FC<DetailsProps> = props => {
  const { addNotification } = useContext(NotificationsContext)
  const [reSyncBtnClicked, setResyncBtnClicked] = useState(false)
  const classes = styles(props)
  const {
    sale: { id, products, total, outlet },
  } = props

  const reSync = async (product: Product[]) => {
    if (products.every(p => p.synced)) {
      return addNotification('Products are already synced', 'warning')
    }
    try {
      await api.post('/sales/re-sync', {
        saleId: id,
        products: product.filter(p => !p.synced),
      })
      addNotification('ReSync request sent', 'success')
    } catch (err) {
      addNotification(err.response?.data?.message || 'Something went wrong', 'error')
    }
  }

  const handleResyncSaleClick = (products: Product[]) => {
    setResyncBtnClicked(true)
    reSync(products)
  }

  const tableHead = () => {
    return TABLE_HEAD.map(({ label, numeric }) => (
      <TableCell align={numeric ? 'right' : 'left'} key={label}>
        {label}
      </TableCell>
    ))
  }

  const tableBody = () => {
    return products?.map((product, key) => {
      const { sku, name, variation, qty, price, discountPrice, synced } = product
      return (
        <TableRow
          role='checkbox'
          hover
          tabIndex={-1}
          key={key}
          className={classes.tableBodyRow}>
          <TableCell>{sku}</TableCell>
          <TableCell>{name ? name : '-'}</TableCell>
          <TableCell align='center'>
            <Align align='center'>
              <SyncedIcon synced={synced} />
              {!synced && (
                <IconButton size='small'>
                  <Refresh onClick={() => reSync([product])} />
                </IconButton>
              )}
            </Align>
          </TableCell>
          <TableCell align='right'>{variation ? variation : '-'}</TableCell>
          <TableCell align='right'>{qty}</TableCell>
          <TableCell align='right'>{price ? currencyFormatter(price) : '-'}</TableCell>
          <TableCell align='right'>
            {discountPrice ? currencyFormatter(discountPrice) : '-'}
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <Paper className={classes.salesDetailsContainer}>
      <div className={classes.table}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>{tableHead()}</TableRow>
          </TableHead>
          <TableBody>{tableBody()}</TableBody>
        </Table>
      </div>
      <div className={classes.detailTotal}>
        {!reSyncBtnClicked && outlet != 'Web' && products?.length ? (
          <Button
            variant='contained'
            color='primary'
            style={{ color: 'white' }}
            onClick={() => handleResyncSaleClick(products)}
            size='small'>
            Re-sync sale
          </Button>
        ) : (
          <div />
        )}
        <div>
          <Typography className={classes.total}>
            Total &nbsp; {currencyFormatter(total)}
          </Typography>
        </div>
      </div>
    </Paper>
  )
}

export default SaleDetails
