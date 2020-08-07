import React from 'react'
import { Typography, Button } from '@material-ui/core';

import styles from './styles';
import useStockOrders from './hooks/useStockOrders'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import FileUpload from './components/fileUpload/FileUpload'
import Alert from '../../common/components/alert'

const StockOrdersPage = () => {
  const classes = styles();
  const { openAlert, setOpenAlert, uploadedFileName, getUploadedFile, removeUploadedFile, uploadSuccess, uploadError } = useStockOrders()

  const renderInventoryCountTopBar = () => (
    <InventoryCountTopBar
      type='countBatches'
      title={
        <span className={classes.titleText}>Upload Stock Orders</span>
      }
      inventoryCountActionsPaper={
        <div className={classes.uploadFileDiv}>
          <Typography className={classes.infoText}>
            Upload and validate files to keep track of your stock orders.
          </Typography>
          <Button
            onClick={() => ''}
            className={classes.uploadBtn}
          >
            <Typography className={classes.btnText}>Validate File</Typography>
          </Button>
        </div>
      }
    />
  )

  const renderStockOrdersContent = () => (
    <div>
      <FileUpload
        uploadedFileName={uploadedFileName}
        removeUploadedFile={removeUploadedFile}
        getUploadedFile={getUploadedFile} />
      {(uploadSuccess || uploadError) && (
        <Alert
          open={openAlert}
          setOpen={setOpenAlert}
          severity={uploadSuccess ? 'success' : 'error'}
          alertMessage={
            uploadSuccess
              ? 'The validation of rows has been successful!'
              : 'The validation of some rows has been failed!'
          }
        />
      )}

    </div>
  )
  return (
    <div className={classes.stockOrdersContainer}>
      {renderInventoryCountTopBar()}
      {renderStockOrdersContent()}
    </div>
  )
}

export default StockOrdersPage
