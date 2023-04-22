import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import UploadCard from './UploadCard';
import SuccessfulCard from './SuccessfulCard';

export interface UploadableFile {
  file: File;
}

export default function CardBody() {
  const [cardBody, setCardBody] = useState(0);

  const [urls, setUrls] = useState<string[]>([]);

  // useEffect(() => {
  //   progress === 100 && setCardBody(2);
  // }, [progress]);

  const resetUploader = () => {
    setCardBody(0);
    setUrls([]);
  };

  return (
    <Card border="light" className="content-card text-center">
      <UploadCard setUrls={setUrls} setCardBody={setCardBody} />
      <SuccessfulCard resetUploader={resetUploader} urls={urls} />
    </Card>
  );
}
