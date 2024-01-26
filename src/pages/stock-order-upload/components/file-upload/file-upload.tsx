import React, { useCallback, Fragment } from 'react'
import { Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'

import {
  FileNameContainer,
  StyledClearIcon,
  StyledUploadIcon,
  UploadContainer,
  UploadInput,
} from './styles'
import { formatDate } from '../../../../common/utils'
import { Box } from '@mui/material'

interface Props {
  setUploadedFileName: (fileName: string) => void
  uploadedFileName: string
  setUploadedFile: (formData: FormData) => void
}

export const FileUpload: React.FC<Props> = ({
  setUploadedFileName,
  setUploadedFile,
  uploadedFileName,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0] as any)
    formData.append('date', formatDate(new Date(), 'yyyy-M-dd'))
    setUploadedFileName(acceptedFiles[0].name)
    setUploadedFile(formData)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <UploadContainer uploadedFileName={uploadedFileName} {...getRootProps()}>
      <StyledUploadIcon />
      {uploadedFileName ? (
        <Box display='flex' alignItems='center'>
          <FileNameContainer>{uploadedFileName}</FileNameContainer>
          <Box onClick={() => setUploadedFileName('')}>
            <StyledClearIcon />
          </Box>
        </Box>
      ) : (
        <Fragment>
          <Typography sx={{ marginTop: -0.5 }}>
            Select a file or drag here!
          </Typography>
          <UploadInput component='input' {...getInputProps()} />
        </Fragment>
      )}
    </UploadContainer>
  )
}
