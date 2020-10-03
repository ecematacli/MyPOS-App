import React from 'react'
import { Typography, Button } from '@material-ui/core'

import styles from './styles'
import useStockOrders from './hooks/useStockOrders'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import FileUpload from './components/fileUpload/FileUpload'
import Alert from '../../common/components/alert'

const StockOrdersPage = () => {
  const classes = styles()
  const {
    openAlert,
    setOpenAlert,
    uploadedFileName,
    handleUploadedFileName,
    uploadedFileData,
    handleUploadedFile,
    removeUploadedFile,
    validFile,
    invalidFile,
    sendFile,
  } = useStockOrders()

  const renderInventoryCountTopBar = () => (
    <InventoryCountTopBar
      type='countBatches'
      title={<span className={classes.titleText}>Upload Stock Orders</span>}
      inventoryCountActionsPaper={
        <div className={classes.uploadFileDiv}>
          <Typography className={classes.infoText}>
            Upload and validate files to keep track of your stock orders.
          </Typography>
          <Button
            onClick={() => sendFile(uploadedFileData)}
            disabled={!uploadedFileName}
            className={classes.uploadBtn}>
            <Typography className={classes.btnText}>Validate File</Typography>
          </Button>
        </div>
      }
    />
  )

  const renderValidFileFeedback = () => (
    <Alert
      open={openAlert}
      setOpen={setOpenAlert}
      severity='success'
      alertMessage='File validation was successful!'
    />
  )

  const renderInvalidFileFeedback = () => {
    return invalidFile.validationErrors.map(file => {
      return file.rows.map(row => (
        <Alert
          key={file.errorType}
          open={openAlert}
          setOpen={setOpenAlert}
          severity='error'
          alertMessage={`${file.errorType}: In row ${row}`}
        />
      ))
    })
  }

  const renderStockOrdersContent = () => (
    <div className={classes.content}>
      <div className={classes.uploadFeedback}>
        {validFile && renderValidFileFeedback()}
        {invalidFile && renderInvalidFileFeedback()}
      </div>
      <FileUpload
        uploadedFileName={uploadedFileName}
        removeUploadedFile={removeUploadedFile}
        setUploadedFileName={handleUploadedFileName}
        setUploadedFile={handleUploadedFile}
      />
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
