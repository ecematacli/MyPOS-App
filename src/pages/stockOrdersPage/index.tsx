import React from 'react'

import useStockOrders from './hooks/useStockOrders'
import FileUpload from './components/fileUpload/FileUpload'
import Alert from '../../common/components/alert'

const StockOrdersPage = () => {
  const { openAlert, setOpenAlert, sendFile, uploadSuccess, uploadError } = useStockOrders()

  const getUploadedFile = (file: FormData) => {
    sendFile(file)
  }
  return (
    <div style={{ padding: 24, marginTop: 70 }}>
      <FileUpload getUploadedFile={getUploadedFile} />
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
}

export default StockOrdersPage
