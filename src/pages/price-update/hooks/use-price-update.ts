import { useState } from 'react'

import { api } from '../../../api/api-client'

export interface UploadError {
  message: string
  validationErrors?: {
    rows: number[]
    kind: string
  }[]
}

export interface PriceUpdateResponse {
  updated: number
  notFound: number
}

export const usePriceUpdate = () => {
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileData, setUploadedFileData] = useState<FormData | null>(
    null
  )
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<UploadError | null>(null)
  const [result, setResult] = useState<PriceUpdateResponse | null>(null)

  const handleUploadedFileName = (fileName: string) =>
    setUploadedFileName(fileName)

  const handleUploadedFile = (formData: FormData) =>
    setUploadedFileData(formData)

  const sendFile = async (file: FormData) => {
    try {
      const { data } = await api.post('/products/price-update', file, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      setUploadError(null)
      setResult(data)
      setIsUploadSuccess(true)
    } catch (e) {
      setIsUploadSuccess(false)
      setUploadError(e.response?.data)
      setResult(null)
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
    result,
  }
}
