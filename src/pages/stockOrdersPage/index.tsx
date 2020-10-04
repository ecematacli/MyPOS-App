import React, { Fragment } from 'react'
import { Typography, Button } from '@material-ui/core'

import styles from './styles'
import useStockOrders from './hooks/useStockOrders'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import FileUpload from './components/fileUpload/FileUpload'
import Alert from '../../common/components/alert'

const StockOrdersPage = () => {
  const classes = styles()
  const {
    uploadedFileName,
    handleUploadedFileName,
    uploadedFileData,
    handleUploadedFile,
    isUploadSuccess,
    invalidFile,
    sendFile,
  } = useStockOrders()

  const renderInventoryCountTopBar = () => (
    <InventoryCountTopBar
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

  const renderInvalidFileFeedback = () => {
    const validationErrorRow = invalidFile && invalidFile.validationErrors.map(file => {
      const errRow = file.rows?.length > 1 ? 'rows' : 'row'
      return (
        <Alert
          key={file.errorType}
          open
          severity='error'
          alertMessage={`${file.errorType}: In ${errRow} ${file.rows.join(', ')}`}
        />
      )
    })
    return (
      <Fragment>
        <Alert
          open
          severity='error'
          alertMessage={`${invalidFile.message} :`}
        />
        {validationErrorRow}
      </Fragment>
    )
  }
  const renderStockOrdersContent = () => (
    <div className={classes.uploadFileContainer}>
      <div className={classes.uploadFileWrapper}>
        <div className={classes.uploadFeedback}>
          {isUploadSuccess && (
            <Alert
              open
              severity='success'
              alertMessage='File validation was successful!'
            />
          )}
          {invalidFile && renderInvalidFileFeedback()}
        </div>
        <FileUpload
          uploadedFileName={uploadedFileName}
          setUploadedFileName={handleUploadedFileName}
          setUploadedFile={handleUploadedFile}
        />
      </div>
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
