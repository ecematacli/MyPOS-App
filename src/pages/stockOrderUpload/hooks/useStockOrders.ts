import { useState } from 'react'

import api from '../../../api'

export interface UploadError {
  message: string
  validationErrors?: {
    rows: number[]
    kind: string
  }[]
}

export default () => {
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileData, setUploadedFileData] = useState<FormData>(null)
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<UploadError>(null)

  const handleUploadedFileName = (fileName: string) => setUploadedFileName(fileName)

  const handleUploadedFile = (formData: FormData) => setUploadedFileData(formData)

  const sendFile = async (file: FormData) => {
    try {
      await api.post('/stock-orders/import', file, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      setUploadError(null)
      setIsUploadSuccess(true)
    } catch (e) {
      setIsUploadSuccess(false)
      setUploadError(e.response?.data)
    }
    setUploadedFileName('')
    setUploadedFileData(null)
  }

  return {
    handleUploadedFileName,
    handleUploadedFile,
    uploadedFileData,
    uploadedFileName,
    isUploadSuccess,
    uploadError,
    sendFile,
  }
}
