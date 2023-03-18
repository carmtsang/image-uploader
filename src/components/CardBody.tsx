import React from "react";
import { Card } from "react-bootstrap";

const UPLOAD_TITLE = "Upload your image";
const UPLOAD_DESCRIPTION = "File should be Jpeg, Png...";
// const OR = "or";

const CardBody = () => {
  return (
    <Card border="light" className="content-card text-center">
      <Card.Title>{UPLOAD_TITLE}</Card.Title>
      <Card.Body>{UPLOAD_DESCRIPTION}</Card.Body>
    </Card>
  );
};

export default CardBody;
