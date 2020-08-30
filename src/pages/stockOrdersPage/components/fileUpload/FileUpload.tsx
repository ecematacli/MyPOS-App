import React, { useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import GetAppIcon from '@material-ui/icons/GetApp'
import ClearIcon from '@material-ui/icons/Clear'

import styles from './styles'
import { formatDate } from '../../../../common/utils'

interface Props {
  getUploadedFileName: (fileName: string) => void
  removeUploadedFile: () => void
  uploadedFileName: string
  sendFormData: (file: FormData) => Promise<void>
}

const FileUpload: React.FC<Props> = ({
  getUploadedFileName,
  removeUploadedFile,
  uploadedFileName,
  sendFormData,
}) => {
  const classes = styles({ uploadedFileName })

  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0] as any)
    formData.append('date', formatDate(new Date(), 'yyyy-M-dd'))
    getUploadedFileName(acceptedFiles[0].name)
    sendFormData(formData)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const renderFileUploadBoxContent = () =>
    uploadedFileName ? (
      <div className={classes.uploadedFileInfo}>
        <div className={classes.fileName}>{uploadedFileName}</div>
        <div onClick={removeUploadedFile}>
          <ClearIcon className={classes.clearIcon} />
        </div>
      </div>
    ) : (
      <Fragment>
        <p className={classes.infoText}>Select a file or drag here!</p>
        <input className={classes.dropInput} {...getInputProps()} />
      </Fragment>
    )

  return (
    <div className={classes.fileUploadDiv} {...getRootProps()}>
      <div>
        <GetAppIcon className={classes.uploadIcon} />
      </div>
      {renderFileUploadBoxContent()}
    </div>
  )
}

export default FileUpload
