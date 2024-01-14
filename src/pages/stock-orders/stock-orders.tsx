import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/material'

import {
  ButtonText,
  InfoText,
  TableContainer,
  TableSectionWrapper,
  TitleText,
  UploadButton,
} from './styles'
import { formatDate } from '../../common/utils'
import { Loading } from '../../common/components/loading/loading'
import PlainTable from '../../common/components/tables/plainTable'
import useStockOrders from './hooks/use-stock-orders'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import { PageContainer } from 'common/components/page-container/page-container'

export const StockOrdersPage = () => {
  const history = useHistory()

  const { stockOrders, loading } = useStockOrders()

  const transformedOrdersData = () =>
    stockOrders.map(order => {
      const total = order.products.reduce(
        (acc, pr) => {
          return {
            totalQty: acc.totalQty + pr.qty,
            totalPrice: acc.totalPrice + (pr.price - pr.discountPrice) * pr.qty,
          }
        },
        { totalQty: 0, totalPrice: 0 }
      )
      return {
        ...order,
        createdAt: formatDate(order.createdAt, 'd MMMM y - p'),
        ...total,
      }
    })

  return (
    <PageContainer>
      <InventoryCountTopBar
        title={<TitleText component='span'>Stock Orders</TitleText>}
        inventoryCountActionsPaper={
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <InfoText>
              Upload and validate files to keep track of your stock orders.
            </InfoText>
            <UploadButton onClick={() => history.push('stock-orders/upload')}>
              <ButtonText>Upload File</ButtonText>
            </UploadButton>
          </Box>
        }
      />
      {loading ? (
        <Loading />
      ) : (
        <TableContainer>
          <TableSectionWrapper>
            <PlainTable
              tableHeads={[
                { name: 'Creation Date' },
                { name: 'Total Products' },
                { name: 'Total Quantity' },
                { name: 'Total Price', rightAlign: true },
              ]}
              noPagination
              hasDataToShow={!!stockOrders.length}
              noDataMessage='No stock orders to show'
              rows={transformedOrdersData()}
              tableFor='StockOrders'
            />
          </TableSectionWrapper>
        </TableContainer>
      )}
    </PageContainer>
  )
}
