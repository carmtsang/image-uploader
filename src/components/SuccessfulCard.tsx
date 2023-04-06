import { Card, Image } from 'react-bootstrap';

const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';
export default function SuccessfulCard() {
  return (
    <Card>
      <p>{SUCCESSFUL_MESSAGE}</p>
      <Image />
      <input type="text" />
    </Card>
  );
}
