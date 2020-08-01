import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import styles from './styles';
import api from '../../../../api'

const FileUpload = () => {
  const classes = styles();
  const onDrop = useCallback(acceptedFiles => {
    console.log('accepted files>', acceptedFiles[0])
    // Do something with the files
    const promises = Array.from(acceptedFiles).map(file => {
      const formData = new FormData();
      console.log('file>>', file)
      formData.append('file', file as any);
      formData.append('date', new Date() as any)

      // return api.post('/stock-orders/import', formData);
    });

    return Promise.all(promises);
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className={classes.dropper} {...getRootProps()}>
      <input className={classes.dropInput}  {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop files here!</p> :
          <p>Drag files here!</p>
      }
    </div>
  )
}

export default FileUpload