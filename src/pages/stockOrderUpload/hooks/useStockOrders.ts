import { useState } from 'react';

import api from '../../../api';
import { transformInvalidRowTypes } from '../transformInvalidRowTypes';

export interface UploadError {
  message: string;
  validationErrors: {
    rows: number[];
    errorType: string;
  }[];
}

export default () => {
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileData, setUploadedFileData] = useState<FormData>(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [invalidFile, setInvalidFile] = useState<UploadError>(null);

  const handleUploadedFileName = (fileName: string) =>
    setUploadedFileName(fileName);

  const handleUploadedFile = (formData: FormData) =>
    setUploadedFileData(formData);

  const sendFile = async (file: FormData) => {
    try {
      await api.post('/stock-orders/import', file, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setUploadedFileName('');
      setInvalidFile(null);
      setIsUploadSuccess(true);
      setUploadedFileData(null);
    } catch (e) {
      const { data } = e.response;
      const transformedRespError = data.validationErrors.map(
        ({ errorType, rows }) => {
          return { errorType: transformInvalidRowTypes(errorType), rows };
        }
      );
      setIsUploadSuccess(false);
      setInvalidFile({ ...data, validationErrors: transformedRespError });
      setUploadedFileName('');
      setUploadedFileData(null);
    }
  };

  return {
    handleUploadedFileName,
    handleUploadedFile,
    uploadedFileData,
    uploadedFileName,
    isUploadSuccess,
    invalidFile,
    sendFile,
  };
};
