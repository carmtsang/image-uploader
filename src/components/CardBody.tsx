import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import UploadCard from './UploadCard';
import LoadingCard from './LoadingCard';
import SuccessfulCard from './SuccessfulCard';

export default function CardBody() {
  const [progress, setProgress] = useState<number>(0);
  const [cardBody, setCardBody] = useState<number>(0);
  const [url, setURL] = useState(null);

  return (
    <Card border="light" className="content-card text-center">
      {cardBody === 0 && (
        <UploadCard setProgress={setProgress} setCardBody={setCardBody} />
      )}
      {cardBody === 1 && <LoadingCard now={progress} />}
      {cardBody === 2 && <SuccessfulCard />}
    </Card>
  );
}
