import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchSales } from '../../redux/sales/salesActions';
import SalesTable from './components/salesTable/SalesTable';

const SalesHistoryPage = ({ fetchSales, sales, count }) => {
  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <SalesTable
      tableHead={['Date', 'Payment Method', 'Total Q', 'Total P']}
      tableData={sales}
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
