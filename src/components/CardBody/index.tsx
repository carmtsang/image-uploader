import React, { useState } from 'react';
import UploadCard from './UploadCard';
import SuccessfulCard from './SuccessfulCard';

export interface UploadableFile {
  file: File;
  progress?: number | undefined;
}

export default function CardBody() {
  const [files, setFiles] = useState<UploadableFile[]>([] as UploadableFile[]);
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessful, setShowSuccessful] = useState<boolean>(false);

  const resetUpload = () => {
    setFiles([]);
    setUrls([]);
    setLoading(false);
    setShowSuccessful(false);
  };

  return (
    <>
      <UploadCard
        setFiles={setFiles}
        files={files}
        setUrls={setUrls}
        setShowSuccessful={setShowSuccessful}
        showSuccessful={showSuccessful}
        loading={loading}
        setLoading={setLoading}
        resetUpload={resetUpload}
      />
      <SuccessfulCard
        urls={urls}
        handleNewUpload={resetUpload}
        showSuccessful={showSuccessful}
      />
    </>
  );
}
