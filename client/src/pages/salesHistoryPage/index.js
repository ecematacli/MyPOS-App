import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { fetchSales } from '../../redux/sales/salesActions';
import CustomTable from '../../common/components/customTable/CustomTable';
import SaleDetails from './components/saleDetails/SaleDetails';

const SalesHistoryPage = ({ fetchSales, sales, count }) => {
  useEffect(() => {
    fetchSales();
  }, []);

  const formattedSalesData = () =>
    sales.map(sale => {
      return {
        ...sale,
        createdAt: format(new Date(sale.createdAt), ' d MMMM y - p')
      };
    });

  return (
    <CustomTable
      tableHeads={[
        {
          label: 'Date',
          sortLabel: true
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
      sales={formattedSalesData()}
      salesCount={count}
      fetchSales={fetchSales}
      component={SaleDetails}
    />
  );
};

const mapStateToProps = ({ sales: { sales, count } }) => ({
  sales: Object.values(sales),
  count
});

export default connect(mapStateToProps, { fetchSales })(SalesHistoryPage);
