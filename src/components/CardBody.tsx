import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import image from "../images/image.svg";
const UPLOAD_TITLE = "Upload your image";
const UPLOAD_DESCRIPTION = "File should be Jpeg, Png...";
// const OR = "or";

const CardBody = () => {
  const handleSubmit = () => {};

  return (
    <Card border="light" className="content-card text-center">
      <Card.Title>{UPLOAD_TITLE}</Card.Title>
      <Card.Body>
        {UPLOAD_DESCRIPTION}
        <div>
          <Image src={image} />
        </div>
        <Button variant="primary" onClick={handleSubmit}>
          Choose File
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardBody;
