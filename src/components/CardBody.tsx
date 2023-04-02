import React from 'react';
import { Card, Image } from 'react-bootstrap';
import image from '../images/image.svg';
import MultiUploader from './upload/MultiUploader';
const UPLOAD_TITLE = 'Upload your image';
const UPLOAD_DESCRIPTION = 'File should be Jpeg, Png...';
// const OR = "or";

const CardBody = () => {
  return (
    <Card border="light" className="content-card text-center">
      <Card.Title>{UPLOAD_TITLE}</Card.Title>
      <Card.Body>
        {UPLOAD_DESCRIPTION}
        <div className="image-uploader">
          <Image src={image} />
          <MultiUploader />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardBody;
