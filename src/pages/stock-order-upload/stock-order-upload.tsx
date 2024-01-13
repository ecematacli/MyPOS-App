import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/material'

import {
  BackArrowIcon,
  IconContainer,
  InfoText,
  TitleText,
  UploadFeedback,
  UploadFileContainer,
  UploadFileWrapper,
  ValidateButton,
  ValidateText,
} from './styles'
import useStockOrders from './hooks/useStockOrders'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import { FileUpload } from './components/file-upload/file-upload'
import { Alert } from '../../common/components/alert/alert'
import { PageContainer } from 'common/components/page-container/page-container'

export const StockOrderUploadPage = () => {
  const history = useHistory()

  const {
    uploadedFileName,
    handleUploadedFileName,
    uploadedFileData,
    handleUploadedFile,
    isUploadSuccess,
    uploadError,
    sendFile,
  } = useStockOrders()

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
      <React.Fragment>
        <Alert
          open
          severity='error'
          alertMessage={`${uploadError.message}${
            uploadError?.validationErrors?.length ? ':' : ''
          }`}
        />
        {validationErrorRow}
      </React.Fragment>
    )
  }

  return (
    <PageContainer>
      <InventoryCountTopBar
        title={
          <React.Fragment>
            <IconContainer
              component='span'
              onClick={() => history.push('/inventory/stock-orders')}>
              <BackArrowIcon />
            </IconContainer>
            <TitleText>Upload Stock Order File</TitleText>
          </React.Fragment>
        }
        inventoryCountActionsPaper={
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <InfoText>
              Upload and validate files to keep track of your stock orders.
            </InfoText>
            <ValidateButton
              onClick={() => sendFile(uploadedFileData)}
              disabled={!uploadedFileName}>
              <ValidateText>Upload File</ValidateText>
            </ValidateButton>
          </Box>
        }
      />
      <UploadFileContainer>
        <UploadFileWrapper>
          <UploadFeedback>
            {isUploadSuccess && (
              <Alert
                open
                severity='success'
                alertMessage='Stock order uploaded successfully!'
              />
            )}
            {uploadError && renderInvalidFileFeedback()}
          </UploadFeedback>
          <FileUpload
            uploadedFileName={uploadedFileName}
            setUploadedFileName={handleUploadedFileName}
            setUploadedFile={handleUploadedFile}
          />
        </UploadFileWrapper>
      </UploadFileContainer>
    </PageContainer>
  )
}
