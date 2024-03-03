import React, { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Box,
} from '@mui/material'

import {
  ContentContainer,
  PaperContainer,
  StyledDivider,
  TitleBox,
  TableCell,
  NoDisplayMessage,
  PaginationContainer,
  IconContainer,
  ArrowLeftIcon,
  ArrowRightIcon,
  TableHeadRow,
  TableBodyRow,
  QuantityData,
} from './styles'
import { TopSellingData } from '../../types'
import { Loading } from '../../../../common/components/loading/loading'

interface Props {
  loading: boolean
  topSellingProducts: TopSellingData
  fetchTopSellingProducts: (
    pageNumber: number,
    start: Date,
    end: Date
  ) => Promise<void>
  startDate: Date
  endDate: Date
}

export const TopSellingItems: React.FC<Props> = ({
  loading,
  topSellingProducts,
  fetchTopSellingProducts,
  startDate,
  endDate,
}) => {
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    setPageNumber(1)
  }, [startDate, endDate])

  const onRightArrowClick = () => {
    const totalPageToShow = topSellingProducts?.count / 3 || 0
    if (pageNumber >= totalPageToShow) return
    setPageNumber(prevPageNumber => prevPageNumber + 1)
    fetchTopSellingProducts(pageNumber, startDate, endDate)
  }

  const onLeftArrowClick = () => {
    if (pageNumber === 1) return

    setPageNumber(prevPageNumber => prevPageNumber - 1)
    fetchTopSellingProducts(pageNumber, startDate, endDate)
  }

  const renderTopSellingItems = () =>
    topSellingProducts?.products
      .filter((_, i) => i < 3)
      .map(({ sku, name, variation, soldQty }, i) => (
        <TableBodyRow key={i}>
          <TableCell>{sku}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell align='center'>{variation ? variation : '-'}</TableCell>
          <TableCell align='center'>
            <Box display='flex' justifyContent='center'>
              <QuantityData component='span'>{soldQty}</QuantityData>
            </Box>
          </TableCell>
        </TableBodyRow>
      ))

  return (
    <PaperContainer>
      <TitleBox>
        <Typography>Top Selling Items</Typography>
      </TitleBox>
      <StyledDivider />
      <ContentContainer>
        <Table>
          <TableHead>
            <TableHeadRow>
              {['Sku', 'Product Name', 'Variation', 'Unit Sold'].map(
                (head, i) => (
                  <TableCell align={i > 1 ? 'center' : 'left'} key={head}>
                    {head}
                  </TableCell>
                )
              )}
            </TableHeadRow>
          </TableHead>
          <TableBody>
            {loading || !topSellingProducts?.products ? (
              <TableRow>
                <TableCell colSpan={10}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <NoDisplayMessage>
                      No top selling item to display
                    </NoDisplayMessage>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              renderTopSellingItems()
            )}
          </TableBody>
        </Table>
      </ContentContainer>
      {!loading && topSellingProducts?.products && (
        <PaginationContainer>
          <IconContainer onClick={onLeftArrowClick}>
            <ArrowLeftIcon />
          </IconContainer>
          <Box>{pageNumber}</Box>
          <IconContainer onClick={onRightArrowClick}>
            <ArrowRightIcon />
          </IconContainer>
        </PaginationContainer>
      )}
    </PaperContainer>
  )
}
