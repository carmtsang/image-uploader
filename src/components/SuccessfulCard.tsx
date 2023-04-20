import { Fragment } from 'react';
import { Image, InputGroup, Button, Form, Card } from 'react-bootstrap';
import DoneCheck from '../images/done_FILL1_wght600_GRAD0_opsz48.svg';
const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';

export interface SuccessfulProps {
  urls: string[];
}

const handleCopy = (url: string) => {
  navigator.clipboard.writeText(url);
};

export default function SuccessfulCard({ urls }: SuccessfulProps) {
  return (
    <>
      <Image src={DoneCheck} className="done-check" />
      <Card.Title className="card-title">{SUCCESSFUL_MESSAGE}</Card.Title>
      {urls.length > 0 &&
        urls.map((url, index) => (
          <Fragment key={url}>
            <Image
              src={url}
              alt="uploaded image"
              id={`image-${index}`}
              className="uploaded-img"
            />
            <InputGroup className="mb-3">
              <Form.Control value={url} id={`image-url-${index}`} readOnly />
              <Button
                className="copy-btn"
                variant="primary"
                onClick={() => handleCopy(url)}
              >
                Copy Link
              </Button>
            </InputGroup>
          </Fragment>
        ))}
    </>
  );
}
