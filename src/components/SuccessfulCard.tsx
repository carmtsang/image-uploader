import { Image } from 'react-bootstrap';

const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';

export interface SuccessfulProps {
  urls: string[];
}

export default function SuccessfulCard({ urls }: SuccessfulProps) {
  return (
    <>
      <p>{SUCCESSFUL_MESSAGE}</p>
      <Image />
      <input type="text" />
    </>
  );
}
