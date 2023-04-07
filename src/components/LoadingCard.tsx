import { Card, ProgressBar } from 'react-bootstrap';
const LOADING = 'Loading...';

export interface LoadingProp {
  now: number;
}
export default function LoadingCard({ now }: LoadingProp) {
  return (
    <Card border="light" className="content-card text-center">
      <Card.Title>{LOADING}</Card.Title>
      <ProgressBar now={now} />;
    </Card>
  );
}
