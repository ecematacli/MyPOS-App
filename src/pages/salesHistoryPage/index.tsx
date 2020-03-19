import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { ActionTypes, StoreState } from '../../redux/types';
import { fetchSales } from '../../redux/sales/salesActions';
import { Sale } from '../../redux/sales/types';
import { loadingSelector } from '../../redux/loading/loadingReducer';
import { formatDate } from '../../common/utils';
import useSalesFiltersState from './hooks/useSalesFiltersState';
import { TABLE_HEADS } from './tableHeads';
import Loading from '../../common/components/loading';
import CustomTable from '../../common/components/customTable';
import SaleDetails from './components/saleDetails/SaleDetails';
import SalesFilters from './components/salesFilters/SalesFilters';

interface SalesHistoryProps {
  fetchSales: (
    page: number,
    rowsPerPage: number,
    startDate?: Date,
    endDate?: Date
  ) => void;
  sales: { [id: string]: Sale };
  count: number;
  ids: number[];
  isFetching: boolean;
}

const SalesHistoryPage: React.FC<SalesHistoryProps> = ({
  fetchSales,
  sales,
  count,
  ids,
  isFetching
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const {
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    onDateSelection,
    onDateFilterClearing
  } = useSalesFiltersState(page, rowsPerPage, setPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return;
    setPage(newPage + 1);
    fetchSales(newPage + 1, rowsPerPage, startDate, endDate);
  };

  const handleChangeRowsPerPage = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value);
    setRowsPerPage(numValue);
    fetchSales(page, numValue, startDate, endDate);
  };

  useEffect(() => {
    fetchSales(page, rowsPerPage);
  }, []);

  const salesInOrder = (): Sale[] => ids.map((saleId: number) => sales[saleId]);

  const formattedSalesData = () =>
    salesInOrder().map((sale: Sale) => ({
      ...sale,
      createdAt: formatDate(sale.createdAt, 'd MMMM y - p')
    }));

  return (
    <div style={{ padding: 24 }}>
      <SalesFilters
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        onDateSelection={onDateSelection}
        onDateFilterClearing={onDateFilterClearing}
      />
      {isFetching ? (
        <Loading />
      ) : (
        <CustomTable
          tableHeads={TABLE_HEADS}
          rows={{ type: 'sales', sales: formattedSalesData() }}
          tableType="sales"
          rowsPerPage={rowsPerPage}
          page={page}
          count={count}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          component={SaleDetails}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  const {
    sales: { sales, count, ids }
  } = state;
  return {
    sales,
    count,
    ids,
    isFetching: loadingSelector(ActionTypes.FETCH_SALES, state)
  };
};

export default connect(mapStateToProps, { fetchSales })(SalesHistoryPage);
