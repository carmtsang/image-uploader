import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import UploadCard from './UploadCard';
import LoadingCard from './LoadingCard';
import SuccessfulCard from './SuccessfulCard';

export interface ImageUploaderProps {
  urls: string[];
  progress: number;
  cardBody: number;
}

export default function CardBody() {
  const [progress, setProgress] = useState(0);
  const [cardBody, setCardBody] = useState(0);
  const [urls, setUrls] = useState([]);

  return (
    <Card border="light" className="content-card text-center">
      {cardBody === 0 && (
        <UploadCard
          setProgress={setProgress}
          setCardBody={setCardBody}
          setUrls={setUrls}
        />
      )}
      {cardBody === 1 && <LoadingCard now={progress} />}
      {cardBody === 2 && <SuccessfulCard />}
    </Card>
  );
}
