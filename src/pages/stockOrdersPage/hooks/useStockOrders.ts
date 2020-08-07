import { useState } from 'react';

import api from '../../../api';
import { UploadSuccess, UploadError } from './types';

export default () => {
  const [openAlert, setOpenAlert] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState<UploadSuccess>(null);
  const [uploadError, setErrorSuccess] = useState<UploadError>(null);

  const getUploadedFile = (fileName: string) => setUploadedFileName(fileName);

  const removeUploadedFile = () => setUploadedFileName('');

  const sendFile = async (file: FormData) => {
    try {
      const response = await api.post('/stock-orders/import', file, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      setUploadSuccess(response.data);
    } catch (e) {
      setErrorSuccess(e.response);
    }
  };

  return {
    openAlert,
    setOpenAlert,
    getUploadedFile,
    removeUploadedFile,
    uploadedFileName,
    uploadSuccess,
    uploadError,
  };
};
