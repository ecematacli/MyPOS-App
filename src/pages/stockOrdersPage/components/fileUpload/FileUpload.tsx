import React, { useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import GetAppIcon from '@material-ui/icons/GetApp';
import ClearIcon from '@material-ui/icons/Clear';

import styles from './styles'
import { formatDate } from '../../../../common/utils'

interface Props {
  getUploadedFile: (fileName: string) => void,
  removeUploadedFile: () => void,
  uploadedFileName: string
}

const FileUpload: React.FC<Props> = ({ getUploadedFile, removeUploadedFile, uploadedFileName }) => {
  const classes = styles()

  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData()
    console.log('accepted files?', acceptedFiles[0].name)
    formData.append('file', acceptedFiles[0] as any)
    formData.append('date', formatDate(new Date(), 'yyyy-M-dd'))
    // getUploadedFile(formData)
    getUploadedFile(acceptedFiles[0].name)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const renderFileUploadBoxContent = () => (
    uploadedFileName ? (
      <div className={classes.uploadedFileInfo}>
        <div className={classes.fileName}>{uploadedFileName}</div>
        <div onClick={removeUploadedFile}><ClearIcon className={classes.clearIcon} /></div>
      </div>
    ) : (
        isDragActive ?
          <p className={classes.infoText}>Drop files here!</p> : (
            <Fragment>
              <p className={classes.infoText}>Select a file or drag here!</p>
              <button className={classes.selectBtn} > Select a file</button>
            </Fragment>
          )
      )
  );

  return (
    <div className={classes.fileUploadDiv} {...getRootProps()}>
      <div><GetAppIcon className={classes.uploadIcon} /></div>
      <input className={classes.dropInput} {...getInputProps()} />
      {renderFileUploadBoxContent()}
    </div>
  )
}

export default FileUpload
