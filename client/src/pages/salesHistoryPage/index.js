import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { format } from 'date-fns';

import styles from './styles';
import { fetchSales } from '../../redux/sales/salesActions';
import Table from './components/Table';

const SalesHistoryPage = ({ fetchSales, sales }) => {
  const classes = styles();

  useEffect(() => {
    fetchSales();
  }, []);

  console.log(sales);

  return (
    <Table
      tableHead={['Date', 'Payment Method', 'Total Q', 'Total P']}
      tableData={sales}
    />
  );
};

const mapStateToProps = ({ sales }) => ({
  sales: Object.values(sales)
});

export default connect(mapStateToProps, { fetchSales })(SalesHistoryPage);

// return(
//       <div className={classes.salesHistoryTable}>
//       <div className={classes.slHistoryTableHeader}>
//         <div className={clsx(classes.slHistoryHeaderCell, classes.dateHeader)}>
//           Date
//         </div>
//         <div className={classes.slHistoryHeaderCell}>Payment Method</div>
//         <div className={classes.slHistoryHeaderCell}>Total Quantity</div>
//         <div className={classes.slHistoryHeaderCell}>Total Amount</div>
//       </div>
//       {sales.map((sale, i) => {
//         const formattedDate = format(new Date(sale.createdAt), ' d MMMM y - p');
//         return (
//           <div
//             key={sale.id}
//             className={clsx(
//               classes[i % 2 ? 'whiteRow' : 'greenRow'],
//               classes.tableBody
//             )}
//           >
//             <div className={classes.tableRow}>
//               <div className={classes.tableCell}>{formattedDate}</div>
//               <div className={classes.tableCell}>Cash</div>
//               <div className={classes.tableCell}>10</div>
//               <div className={classes.tableCell}>&#x20BA; 1000</div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
// )
