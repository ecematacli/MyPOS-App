import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import styles from './styles'
import { formatDate } from '../../../../common/utils'

interface Props {
  getUploadedFile: (file: FormData) => void
}

const FileUpload: React.FC<Props> = ({ getUploadedFile }) => {
  const classes = styles()

  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData()

    formData.append('file', acceptedFiles[0] as any)
    formData.append('date', formatDate(new Date(), 'yyyy-M-dd'))
    getUploadedFile(formData)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className={classes.dropper} {...getRootProps()}>
      <input className={classes.dropInput} {...getInputProps()} />
      {isDragActive ? <p>Drop files here!</p> : <p>Drag files here!</p>}
    </div>
  )
}

export default FileUpload
