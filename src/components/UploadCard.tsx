import React from 'react';
import { Card } from 'react-bootstrap';

import Uploader from './upload/Uploader';

const UPLOAD_TITLE = 'Upload your image';
const UPLOAD_DESCRIPTION = 'File should be Jpeg, Png...';

const UploadCard = ({ setProgress }) => {
  return (
    <Card border="light" className="content-card text-center">
      <Card.Title>{UPLOAD_TITLE}</Card.Title>
      <Card.Body>
        {UPLOAD_DESCRIPTION}
        <div className="image-uploader">
          <Uploader />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardBody;
