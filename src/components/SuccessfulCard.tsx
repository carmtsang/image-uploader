import { Fragment, SyntheticEvent } from 'react';
import { Image, InputGroup, Button, Form } from 'react-bootstrap';

const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';

export interface SuccessfulProps {
  urls: string[];
}

export default function SuccessfulCard({ urls }: SuccessfulProps) {
  const handleCopy = (e: SyntheticEvent<EventTarget>) => {
    // navigator.clipboard.writeText(e.target.value);
    console.log(e);
  };

  return (
    <>
      <p>{SUCCESSFUL_MESSAGE}</p>

      {urls.length > 0 &&
        urls.map((url, index) => (
          <Fragment key={url}>
            <Image src={url} alt="uploaded image" />
            <InputGroup className="mb-3">
              <Form.Control value={url} id={`image-url-${index}`} readOnly />
              <Button
                className="copy-btn"
                variant="primary"
                onClick={handleCopy}
              >
                Copy
              </Button>
            </InputGroup>
          </Fragment>
        ))}
    </>
  );
}
