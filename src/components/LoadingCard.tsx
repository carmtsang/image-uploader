import { Card, ProgressBar } from 'react-bootstrap';
const LOADING = 'Loading...';

export interface LoadingProp {
  now: number;
}
export default function LoadingCard({ now }: LoadingProp) {
  return (
    <>
      <Card.Title>{LOADING}</Card.Title>
      <ProgressBar now={now} />;
    </>
  );
}
