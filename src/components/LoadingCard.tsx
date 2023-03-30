import { Card } from "react-bootstrap";
const LOADING = "Loading...";
export default function LoadingCard() {
  return (
    <Card border="light" className="content-card text-center">
      <Card.Title>{LOADING}</Card.Title>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </Card>
  );
}
