import { Fragment } from 'react';
import { Image, InputGroup, Button, Form } from 'react-bootstrap';

const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';

export interface SuccessfulProps {
  urls: string[];
}

export default function SuccessfulCard({ urls }: SuccessfulProps) {
  return (
    <>
      <p>{SUCCESSFUL_MESSAGE}</p>

      {urls.length > 0 &&
        urls.map((url) => (
          <Fragment key={url}>
            <Image src={url} alt="uploaded image" />
            <InputGroup className="mb-3">
              <Form.Control value={url} />
              <Button variant="primary">Copy</Button>
            </InputGroup>
          </Fragment>
        ))}
    </>
  );
}
