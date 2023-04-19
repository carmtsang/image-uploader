import { Card, ProgressBar } from 'react-bootstrap';
const LOADING = 'Loading...';

export interface LoadingProp {
  now: number;
  cardBody: number;
}
export default function LoadingCard({ now, cardBody }: LoadingProp) {
  return (
    <>
      <Card.Title className="card-title">{LOADING}</Card.Title>
      <p>{cardBody}</p>
      <ProgressBar now={now} />
    </>
  );
}
