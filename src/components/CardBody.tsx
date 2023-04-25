import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import UploadCard from './UploadCard';
import SuccessfulCard from './SuccessfulCard';

export interface UploadableFile {
  file: File;
  progress?: number | undefined;
  url?: string | undefined;
}

export default function CardBody() {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  // useEffect(() => {
  //   progress === 100 && setCardBody(2);
  // }, [progress]);

  return (
    <Card border="light" className="content-card text-center">
      <UploadCard setFiles={setFiles} />
      <SuccessfulCard setFiles={setFiles} files={files} />
    </Card>
  );
}
