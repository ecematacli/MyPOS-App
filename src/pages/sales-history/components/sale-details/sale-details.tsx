import React, { useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
} from '@mui/material'
import Refresh from '@mui/icons-material/Refresh'

import {
  DetailTotalContainer,
  SalesDetailsPaper,
  StyledTableHeadRow,
  StyledTableRow,
  TableContainer,
  TotalText,
} from './styles'
import { Sale } from '../../../../redux/sales/types'
import { currencyFormatter } from '../../../../common/utils'
import { SyncedIcon } from '../../../../common/components/synced-icon/synced-icon'
import { TABLE_HEAD } from './table-head-data'
import { Align } from '../../../../common/components/Align'
import { Product } from '../../../../redux/products/types'
import { useResync } from '../../../../common/hooks/use-resync'

interface IDetailsProps {
  sale: Sale
  rowIndex: number
}

export const SaleDetails: React.FC<IDetailsProps> = props => {
  const [reSyncBtnClicked, setResyncBtnClicked] = useState(false)

  const {
    sale: { id, products, total, outlet },
  } = props
  const { reSync } = useResync()

  const handleResyncSaleClick = (products: Product[]) => {
    setResyncBtnClicked(true)
    reSync({ id, type: 'sale', products })
  }

  const tableBody = () => {
    return products?.map((product, key) => {
      const {
        sku,
        name,
        variation,
        qty,
        price,
        discountPrice,
        synced,
      } = product
      return (
        <StyledTableRow role='checkbox' hover tabIndex={-1} key={key}>
          <TableCell>{sku}</TableCell>
          <TableCell>{name ? name : '-'}</TableCell>
          <TableCell align='center'>
            <Align align='center'>
              <SyncedIcon synced={synced} />
              {!synced && (
                <IconButton size='small'>
                  <Refresh
                    onClick={() =>
                      reSync({ id, type: 'sale', products: [product] })
                    }
                  />
                </IconButton>
              )}
            </Align>
          </TableCell>
          <TableCell align='right'>{variation ? variation : '-'}</TableCell>
          <TableCell align='right'>{qty}</TableCell>
          <TableCell align='right'>
            {price ? currencyFormatter(price) : '-'}
          </TableCell>
          <TableCell align='right'>
            {discountPrice ? currencyFormatter(discountPrice) : '-'}
          </TableCell>
        </StyledTableRow>
      )
    })
  }

  return (
    <SalesDetailsPaper rowIndex={props.rowIndex}>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableHeadRow>
              {TABLE_HEAD.map(({ label, numeric }) => (
                <TableCell align={numeric ? 'right' : 'left'} key={label}>
                  {label}
                </TableCell>
              ))}
            </StyledTableHeadRow>
          </TableHead>
          <TableBody>{tableBody()}</TableBody>
        </Table>
      </TableContainer>
      <DetailTotalContainer
        {...props}
        display='flex'
        justifyContent='space-between'
        alignItems='center'>
        {!reSyncBtnClicked && outlet.name != 'Web' && products?.length && (
          <Button
            variant='contained'
            color='primary'
            sx={{ color: 'white' }}
            onClick={() => handleResyncSaleClick(products)}
            size='small'>
            Yeniden Senkronize Et
          </Button>
        )}
        <Box>
          <TotalText>Toplam &nbsp; {currencyFormatter(total)}</TotalText>
        </Box>
      </DetailTotalContainer>
    </SalesDetailsPaper>
  )
}
