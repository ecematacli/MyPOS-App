import { useState } from 'react'

import api from '../../../api'
import { UploadSuccess, UploadError } from './types'
import { transformInvalidRowTypes } from '../transformInvalidRowTypes'

export default () => {
  const [openAlert, setOpenAlert] = useState(true)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileData, setUploadedFileData] = useState<FormData>(null)
  const [validFile, setValidFile] = useState<UploadSuccess>(null)
  const [invalidFile, setInvalidFile] = useState<UploadError>(null)

  const handleUploadedFileName = (fileName: string) => setUploadedFileName(fileName)

  const handleUploadedFile = (formData: FormData) => setUploadedFileData(formData)

  const removeUploadedFile = () => setUploadedFileName('')

  const sendFile = async (file: FormData) => {
    try {
      const response = await api.post('/stock-orders/import', file, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      setValidFile(response.data)
      setUploadedFileName('')
      setUploadedFileData(null)
    } catch (e) {
      console.log(e.response.message, e)

      const { data } = e.response

      const transformedRespError = data.validationErrors.map(({ errorType, rows }) => {
        return { errorType: transformInvalidRowTypes(errorType), rows }
      })

      setInvalidFile({ ...data, validationErrors: transformedRespError })
      setUploadedFileName('')
      setUploadedFileData(null)
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
    validFile,
    invalidFile,
    sendFile,
  }
}
