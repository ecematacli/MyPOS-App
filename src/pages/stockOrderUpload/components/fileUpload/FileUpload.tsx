import React, { useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import GetAppIcon from '@material-ui/icons/GetApp'
import ClearIcon from '@material-ui/icons/Clear'

import styles from './styles'
import { formatDate } from '../../../../common/utils'

interface Props {
  setUploadedFileName: (fileName: string) => void
  uploadedFileName: string
  setUploadedFile: (file: File) => void
}

const FileUpload: React.FC<Props> = ({ setUploadedFileName, setUploadedFile, uploadedFileName }) => {
  const classes = styles({ uploadedFileName })

  const onDrop = useCallback(acceptedFiles => {
    setUploadedFile(acceptedFiles[0])
    setUploadedFileName(acceptedFiles[0].name)
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
