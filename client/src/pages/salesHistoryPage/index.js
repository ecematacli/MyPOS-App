import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { fetchSales } from '../../redux/sales/salesActions';
import SalesTable from './components/salesTable/SalesTable';

const SalesHistoryPage = ({ fetchSales, sales, count }) => {
  useEffect(() => {
    fetchSales();
  }, []);

  const salesData = () =>
    sales.map(sale => {
      return {
        ...sale,
        createdAt: format(new Date(sale.createdAt), ' d MMMM y - p')
      };
    });

  return (
    <SalesTable
      tableHead={[
        {
          label: 'Date'
        },
        {
          label: 'Total Qty',
          numeric: true
        },
        {
          label: 'Total Price',
          numeric: true
        },
        {
          label: 'Total Discount',
          numeric: true
        }
      ]}
      tableData={salesData()}
      salesCount={count}
      fetchSales={fetchSales}
    />
  );
};

const mapStateToProps = ({ sales: { sales, count } }) => ({
  sales: Object.values(sales),
  count
});

export default connect(mapStateToProps, { fetchSales })(SalesHistoryPage);
