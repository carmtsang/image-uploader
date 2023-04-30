import { Card, ProgressBar } from 'react-bootstrap';

export default function LoadingCard() {
  return (
    <Card.Body>
      <ProgressBar>
        <div className="progress-bar indeterminate" />
      </ProgressBar>
    </Card.Body>
  );
}
