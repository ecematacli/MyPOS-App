import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { ActionTypes, StoreState } from '../../redux/types'
import { fetchSales } from '../../redux/sales/salesActions'
import { Sale } from '../../redux/sales/types'
import { loadingSelector } from '../../redux/loading/loadingReducer'
import { formatDateInLocale } from '../../common/utils'
import { TABLE_HEADS } from './table-heads-data'
import { useSalesFilterState } from './hooks/use-sales-filter-state'
import { Loading } from '../../common/components/loading/loading'
import { CustomTable } from '../../common/components/tables/custom-table/custom-table'
import { SaleDetails } from './components/sale-details/sale-details'
import { SalesFilters } from './components/sales-filters/sales-filters'
import { Box } from '@mui/material'
import { fetchOutlets } from '../../api/outlets/outlets'
import { PageContainer } from 'common/components/page-container/page-container'
import { Outlets } from 'types/outlets'

export interface IFetchSalesArgs {
  rowsPerPage: number
  afterCursor?: string | null
  beforeCursor?: string | null
  startDate?: Date | null
  endDate?: Date | null
  outletId?: number
}
interface SalesHistoryProps {
  fetchSales: (args: IFetchSalesArgs) => void
  sales: { [id: string]: Sale }
  count: number
  ids: number[]
  isFetching: boolean
  cursors: { before: string; after: string }
}

const SalesHistory: React.FC<SalesHistoryProps> = ({
  fetchSales,
  sales,
  count,
  ids,
  isFetching,
  cursors,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [outlets, setOutlets] = useState<Outlets>([])

  const {
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    onDateSelection,
    onDateFilterClearing,
    handleOutletChange,
    selectedOutlet,
  } = useSalesFilterState({
    rowsPerPage,
    setPage,
    fetchSales,
  })

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return

    fetchSales({
      rowsPerPage,
      afterCursor: newPage + 1 > page && cursors.after,
      beforeCursor: newPage + 1 < page && cursors.before,
      startDate,
      endDate,
      outletId: selectedOutlet?.id,
    })

    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value)
    setRowsPerPage(numValue)

    if (Math.ceil(count / rowsPerPage) === page) {
      setPage(1)
    }
    fetchSales({
      rowsPerPage: numValue,
      afterCursor: null,
      beforeCursor: null,
      startDate,
      endDate,
      outletId: selectedOutlet?.id,
    })
  }

  useEffect(() => {
    const fetchSalesAndOutlets = async () => {
      fetchSales({ rowsPerPage, outletId: selectedOutlet?.id })

      const outlets = await fetchOutlets()
      setOutlets(outlets)
    }

    fetchSalesAndOutlets()
  }, [])

  const salesInOrder = (): Sale[] => ids.map((saleId: number) => sales[saleId])

  const formattedSalesData = () =>
    salesInOrder().map((sale: Sale) => ({
      ...sale,
      // createdAt: formatDate(sale.createdAt, 'd MMMM y - p'),
      createdAt: formatDateInLocale(sale.createdAt),
    }))

  return (
    <PageContainer>
      <SalesFilters
        outlets={outlets}
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        onDateSelection={onDateSelection}
        onDateFilterClearing={onDateFilterClearing}
        handleOutletChange={handleOutletChange}
        selectedOutlet={selectedOutlet}
      />
      {isFetching ? (
        <Loading />
      ) : (
        <CustomTable
          tableHeads={TABLE_HEADS}
          rows={{ type: 'sales', sales: formattedSalesData() }}
          tableType='sales'
          rowsPerPage={rowsPerPage}
          page={page}
          count={count}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          component={SaleDetails}
        />
      )}
    </PageContainer>
  )
}

const mapStateToProps = (state: StoreState) => {
  const {
    sales: { sales, count, ids, cursors },
  } = state
  return {
    sales,
    count,
    cursors,
    ids,
    isFetching: loadingSelector(ActionTypes.FETCH_SALES, state),
  }
}

export const SalesHistoryPage = connect(mapStateToProps, { fetchSales })(
  SalesHistory
)
