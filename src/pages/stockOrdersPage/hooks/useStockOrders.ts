import { useState } from 'react'

import api from '../../../api'
import { UploadSuccess, UploadError } from './types'
import { transformInvalidRowTypes } from '../transformInvalidRowTypes'

export default () => {
  const [openAlert, setOpenAlert] = useState(true)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileData, setUploadedFileData] = useState<FormData>(null)
  const [uploadSuccess, setUploadSuccess] = useState<UploadSuccess>(null)
  const [uploadError, setErrorSuccess] = useState<UploadError>(null)

  const handleUploadedFileName = (fileName: string) => setUploadedFileName(fileName)

  const handleUploadedFile = (formData: FormData) => setUploadedFileData(formData)

  const removeUploadedFile = () => setUploadedFileName('')

  const sendFile = async (file: FormData) => {
    try {
      const response = await api.post('/stock-orders/import', file, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      setUploadSuccess(response.data)
    } catch (e) {
      console.log('Something went wrong with sending the file...', e)
      // setErrorSuccess(e.response)

      const { data } = e.response

      const respErrorType = data.validationErrors.map(({ errorType, rows }) => {
        // console.log('errortype:', errorType, 'rows::', rows)
        return { errorType, rows }
      })

      transformInvalidRowTypes(respErrorType)
    }
  }

  return {
    openAlert,
    setOpenAlert,
    handleUploadedFileName,
    handleUploadedFile,
    uploadedFileData,
    removeUploadedFile,
    uploadedFileName,
    uploadSuccess,
    uploadError,
    sendFile,
  }
}
