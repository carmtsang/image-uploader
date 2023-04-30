import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
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

  console.log('files', files);
  console.log('urls', urls);
  return (
    <Card border="light" className="content-card text-center">
      <UploadCard
        setFiles={setFiles}
        files={files}
        setUrls={setUrls}
        loading={loading}
        setLoading={setLoading}
      />
      <SuccessfulCard
        setUrls={setUrls}
        urls={urls}
        setFiles={setFiles}
        setLoading={setLoading}
      />
    </Card>
  );
}
