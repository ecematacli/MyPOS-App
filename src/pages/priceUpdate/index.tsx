import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button } from '@mui/material'

import styles from './styles'
import usePriceUpdate from './hooks/usePriceUpdate'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import FileUpload from './components/fileUpload/FileUpload'
import { Alert } from '../../common/components/alert/alert'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const PriceUpdatePage = () => {
  const history = useHistory()

  const classes = styles()
  const {
    uploadedFileName,
    handleUploadedFileName,
    uploadedFileData,
    handleUploadedFile,
    isUploadSuccess,
    uploadError,
    sendFile,
    result,
  } = usePriceUpdate()

  const renderPriceUpdateUploadTopBar = () => (
    <InventoryCountTopBar
      title={
        <Fragment>
          <span
            className={classes.iconDiv}
            onClick={() => history.push('/inventory/stock-orders')}>
            <ArrowBackIcon className={classes.backArrow} />
          </span>
          <Typography className={classes.titleText}>
            Upload the Products Export File
          </Typography>
        </Fragment>
      }
      inventoryCountActionsPaper={
        <div className={classes.uploadFileDiv}>
          <Typography className={classes.infoText}>
            Upload a products export file to update the prices.
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
  const renderPriceUpdateUploadContent = () => (
    <div className={classes.uploadFileContainer}>
      <div className={classes.uploadFileWrapper}>
        <div className={classes.uploadFeedback}>
          {isUploadSuccess && (
            <Alert
              open
              severity='success'
              alertMessage={`Prices are updated! Updated: ${result.updated} Not Found: ${result.notFound}`}
            />
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
    <div className={classes.priceUpdateUploadContainer}>
      {renderPriceUpdateUploadTopBar()}
      {renderPriceUpdateUploadContent()}
    </div>
  )
}

export default PriceUpdatePage
