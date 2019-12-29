import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchSales } from '../../redux/sales/salesActions';
import Table from './components/Table';

const SalesHistoryPage = ({ fetchSales, sales }) => {
  useEffect(() => {
    fetchSales();
  }, []);

  console.log(sales);

  return (
    <Table
      tableHead={['Date', 'Payment Method', 'Total Q', 'Total P']}
      tableData={sales}
      fetchSales={fetchSales}
    />
  );
};

const mapStateToProps = ({ sales }) => {
  console.log(sales);
  return {
    sales: Object.values(sales)
  };
};

export default connect(mapStateToProps, { fetchSales })(SalesHistoryPage);
