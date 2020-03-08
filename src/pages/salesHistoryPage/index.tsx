import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchSales } from '../../redux/sales/salesActions';
import { formatDate } from '../../common/utils';
import { ActionTypes, StoreState } from '../../redux/types';
import { Sale } from '../../redux/sales/types';
import { loadingSelector } from '../../redux/loading/loadingReducer';
import Loading from '../../common/components/loading/Loading';
import CustomTable from '../../common/components/customTable/CustomTable';
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

  useEffect(() => {
    fetchSales(1, 10);
  }, []);

  const salesInOrder = (): Sale[] => ids.map((saleId: number) => sales[saleId]);

  const formattedSalesData = () =>
    salesInOrder().map((sale: Sale) => ({
      ...sale,
      createdAt: formatDate(sale.createdAt, 'd MMMM y - p')
    }));

  return (
    <Fragment>
      <SalesFilters page={page} rowsPerPage={rowsPerPage} />
      {isFetching ? (
        <Loading />
      ) : (
        <CustomTable
          tableHeads={[
            {
              label: 'Date'
            },
            {
              label: 'Total Qty',
              numeric: true
            },
            {
              label: 'Total Discount',
              numeric: true
            },
            {
              label: 'Total Payment',
              numeric: true
            }
          ]}
          rows={{ type: 'sales', sales: formattedSalesData() }}
          tableType="sales"
          count={count}
          fetchSales={fetchSales}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          component={SaleDetails}
        />
      )}
    </Fragment>
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
