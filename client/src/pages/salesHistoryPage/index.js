import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchSales } from '../../redux/sales/salesActions';
import Table from './components/table/Table';

const SalesHistoryPage = ({ fetchSales, sales, count }) => {
  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <Table
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
