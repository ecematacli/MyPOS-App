import { useState } from 'react'

import api from '../../../api'
import { formatDate } from '../../../common/utils'

export interface UploadError {
  message: string
  validationErrors?: {
    rows: number[]
    kind: string
  }[]
}

export default () => {
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileData, setUploadedFileData] = useState<File>(null)
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<UploadError>(null)

  const handleUploadedFileName = (fileName: string) => setUploadedFileName(fileName)

  const handleUploadedFile = (formData: File) => setUploadedFileData(formData)

  const sendFile = async (file: File) => {
    try {
      await api.post(`/stock-orders/import?date=${formatDate(new Date(), 'yyyy-M-dd')}`, file, {
        headers: { 'Content-Type': 'text/csv' },
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
