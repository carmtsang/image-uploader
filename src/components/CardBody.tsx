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

  return (
    <Card border="light" className="content-card text-center">
      <UploadCard setFiles={setFiles} files={files} setUrls={setUrls} />
      <SuccessfulCard setUrls={setUrls} urls={urls} setFiles={setFiles} />
    </Card>
  );
}
