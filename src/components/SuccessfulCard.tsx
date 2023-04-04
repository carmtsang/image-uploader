import { Card } from 'react-bootstrap';

const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';
export default function SuccessfulCard() {
  return (
    <Card>
      <p>{SUCCESSFUL_MESSAGE}</p>
    </Card>
  );
}
