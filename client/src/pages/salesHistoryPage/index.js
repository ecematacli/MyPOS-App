import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchSales } from '../../redux/sales/salesActions';
import { formatDate } from '../../common/utils';
import CustomTable from '../../common/components/customTable/CustomTable';
import SaleDetails from './components/saleDetails/SaleDetails';
import SalesFilters from './components/salesFilters/SalesFilters';

const SalesHistoryPage = ({ fetchSales, sales, count, ids }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSales();
  }, []);

  const salesInOrder = () => ids.map(saleId => sales[saleId]);

  const formattedSalesData = () =>
    salesInOrder().map(sale => ({
      ...sale,
      createdAt: formatDate(sale.createdAt, 'd MMMM y - p')
    }));

  return !sales ? (
    <CircularProgress color="primary" />
  ) : (
    <Fragment>
      <SalesFilters page={page} rowsPerPage={rowsPerPage} />
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
        rows={formattedSalesData()}
        tableType="sales"
        count={count}
        fetchSales={fetchSales}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        component={SaleDetails}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ sales: { sales, count, ids } }) => ({
  sales,
  count,
  ids
});

export default connect(mapStateToProps, { fetchSales })(SalesHistoryPage);
