import React from 'react';

import useStockOrders from './hooks/useStockOrders';
import FileUpload from './components/fileUpload/FileUpload';
import Alert from '../../common/components/alert'


const StockOrdersPage = () => {
  const { openAlert, setOpenAlert } = useStockOrders();
  return (
    <div style={{ padding: 24, marginTop: 70 }}>
      <FileUpload />
      <Alert open={openAlert} setOpen={setOpenAlert} severity="error" alertMessage="The validation of some rows has been failed!" />
    </div>
  )
};

export default StockOrdersPage;




