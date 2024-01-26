import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/material'

import {
  BackArrowIcon,
  ButtonText,
  IconContainer,
  InfoText,
  TitleText,
  UploadFeedback,
  UploadFileContainer,
  UploadFileWrapper,
  ValidateButton,
} from './styles'
import { usePriceUpdate } from './hooks/use-price-update'
import { InventoryCountTopBar } from '../../common/components/inventory-count-topbar/inventory-count-topbar'
import FileUpload from './components/file-upload/file-upload'
import { Alert } from '../../common/components/alert/alert'
import { PageContainer } from 'common/components/page-container/page-container'

export const PriceUpdatePage = () => {
  const history = useHistory()

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

  return (
    <PageContainer>
      <InventoryCountTopBar
        title={
          <Fragment>
            <IconContainer
              component='span'
              onClick={() => history.push('/inventory/stock-orders')}>
              <BackArrowIcon />
            </IconContainer>
            <TitleText>Upload the Products Export File</TitleText>
          </Fragment>
        }
        inventoryCountActionsPaper={
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <InfoText>
              Upload a products export file to update the prices.
            </InfoText>
            <ValidateButton
              onClick={() => sendFile(uploadedFileData)}
              disabled={!uploadedFileName}>
              <ButtonText>Upload File</ButtonText>
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
                alertMessage={`Prices are updated! Updated: ${result.updated} Not Found: ${result.notFound}`}
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
