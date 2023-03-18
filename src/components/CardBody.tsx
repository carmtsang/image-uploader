import React from "react";
import { Card } from "react-bootstrap";

const TEXT = "HELLO WORLD!";

const CardBody = () => {
  return (
    <Card border="light" className="content-card">
      <Card.Body>{TEXT}</Card.Body>
    </Card>
  );
};

export default CardBody;
