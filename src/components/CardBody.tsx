import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import UploadCard from './UploadCard';
import LoadingCard from './LoadingCard';
import SuccessfulCard from './SuccessfulCard';

export default function CardBody() {
  const [progress, setProgress] = useState(0);
  const [cardBody, setCardBody] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    progress === 100 && setCardBody(2);
  }, [progress]);

  return (
    <Card border="light" className="content-card text-center">
      {cardBody === 0 && (
        <UploadCard
          setProgress={setProgress}
          setUrls={setUrls}
          setCardBody={setCardBody}
        />
      )}
      {cardBody === 1 && <LoadingCard now={progress} cardBody={cardBody} />}
      {cardBody === 2 && (
        <SuccessfulCard setCardBody={setCardBody} urls={urls} />
      )}
    </Card>
  );
}
