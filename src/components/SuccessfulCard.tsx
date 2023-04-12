import { Image } from 'react-bootstrap';

const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';
export default function SuccessfulCard() {
  return (
    <>
      <p>{SUCCESSFUL_MESSAGE}</p>
      <Image />
      <input type="text" />
    </>
  );
}
