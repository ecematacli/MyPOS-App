import React, { Fragment } from 'react'
import { Typography, Button } from '@material-ui/core'

import styles from './styles'
import history from '../../history'
import useStockOrders from './hooks/useStockOrders'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import FileUpload from './components/fileUpload/FileUpload'
import Alert from '../../common/components/alert'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const StockOrdersPage = () => {
  const classes = styles()
  const {
    uploadedFileName,
    handleUploadedFileName,
    uploadedFileData,
    handleUploadedFile,
    isUploadSuccess,
    uploadError,
    sendFile,
  } = useStockOrders()

  const renderStockOrderUploadTopBar = () => (
    <InventoryCountTopBar
      title={
        <Fragment>
          <span
            className={classes.iconDiv}
            onClick={() => history.push('/inventory/stock-orders')}>
            <ArrowBackIcon className={classes.backArrow} />
          </span>
          <Typography className={classes.titleText}>Upload Stock Order File</Typography>
        </Fragment>
      }
      inventoryCountActionsPaper={
        <div className={classes.uploadFileDiv}>
          <Typography className={classes.infoText}>
            Upload and validate files to keep track of your stock orders.
          </Typography>
          <Button
            onClick={() => sendFile(uploadedFileData)}
            disabled={!uploadedFileName}
            className={classes.validateBtn}>
            <Typography className={classes.btnText}>Upload File</Typography>
          </Button>
        </div>
      }
    />
  )

  const renderInvalidFileFeedback = () => {
    const validationErrorRow = uploadError?.validationErrors?.map(err => {
      const errRow = err.rows?.length > 1 ? 'rows' : 'row'
      return (
        <Alert
          key={err.kind}
          open
          severity='error'
          alertMessage={`${err.kind}: In ${errRow} ${err.rows.join(', ')}`}
        />
      )
    })
    return (
      <Fragment>
        <Alert
          open
          severity='error'
          alertMessage={`${uploadError.message}${
            uploadError?.validationErrors?.length ? ':' : ''
          }`}
        />
        {validationErrorRow}
      </Fragment>
    )
  }
  const renderStockOrderUploadContent = () => (
    <div className={classes.uploadFileContainer}>
      <div className={classes.uploadFileWrapper}>
        <div className={classes.uploadFeedback}>
          {isUploadSuccess && (
            <Alert open severity='success' alertMessage='Stock order uploaded successfully!' />
          )}
          {uploadError && renderInvalidFileFeedback()}
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
    <div className={classes.stockOrderUploadContainer}>
      {renderStockOrderUploadTopBar()}
      {renderStockOrderUploadContent()}
    </div>
  )
}

export default StockOrdersPage
