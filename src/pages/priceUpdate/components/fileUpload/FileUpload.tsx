import React, { useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import GetAppIcon from '@material-ui/icons/GetApp'
import ClearIcon from '@material-ui/icons/Clear'

import styles from './styles'
import { formatDate } from '../../../../common/utils'

interface Props {
  setUploadedFileName: (fileName: string) => void
  uploadedFileName: string
  setUploadedFile: (formData: FormData) => void
}

const FileUpload: React.FC<Props> = ({
  setUploadedFileName,
  setUploadedFile,
  uploadedFileName,
}) => {
  const classes = styles({ uploadedFileName })

  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0] as any)
    formData.append('date', formatDate(new Date(), 'yyyy-M-dd'))
    setUploadedFileName(acceptedFiles[0].name)
    setUploadedFile(formData)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const renderFileUploadBoxContent = () =>
    uploadedFileName ? (
      <div className={classes.uploadedFileInfo}>
        <div className={classes.fileName}>{uploadedFileName}</div>
        <div onClick={() => setUploadedFileName('')}>
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
      <GetAppIcon className={classes.uploadIcon} />
      {renderFileUploadBoxContent()}
    </div>
  )
}

export default FileUpload
