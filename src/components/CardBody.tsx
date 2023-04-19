import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import UploadCard from './UploadCard';
import LoadingCard from './LoadingCard';
import SuccessfulCard from './SuccessfulCard';

export default function CardBody() {
  const [progress, setProgress] = useState(0);
  const [cardBody, setCardBody] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);

  const handleCardChange = (num: number) => setCardBody(num);

  return (
    <Card border="light" className="content-card text-center">
      {cardBody === 0 && (
        <UploadCard
          setProgress={setProgress}
          setUrls={setUrls}
          handleCardChange={handleCardChange}
        />
      )}
      {cardBody === 1 && <LoadingCard now={progress} cardBody={cardBody} />}
      {cardBody === 2 && <SuccessfulCard urls={urls} />}
    </Card>
  );
}
