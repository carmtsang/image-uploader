import { Fragment } from 'react';
import { Image, InputGroup, Button, Form, Card } from 'react-bootstrap';
import DoneCheck from '../../images/done_FILL1_wght600_GRAD0_opsz48.svg';
const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';

export interface SuccessfulProps {
  urls: string[];
  handleNewUpload: () => void;
  showSuccessful: boolean;
}

export default function SuccessfulCard({
  urls,
  showSuccessful,
  handleNewUpload
}: SuccessfulProps) {
  const handleCopy = (url: string | undefined) => {
    if (!url) {
      return;
    }
    return navigator.clipboard.writeText(url);
  };

  return (
    <Card
      border="light"
      className={`content-card text-center ${showSuccessful ? '' : 'hidden'}`}
    >
      <Image src={DoneCheck} className="done-check" />
      <Card.Title>{SUCCESSFUL_MESSAGE}</Card.Title>
      <Card.Body>
        <Button
          variant="outline-secondary"
          id="new-upload-btn"
          className="spacing"
          onClick={() => handleNewUpload()}
        >
          New Upload
        </Button>
        {urls.length > 0 &&
          urls.map((url, index) => (
            <Fragment key={`url-${index}`}>
              <Image
                src={url}
                alt="uploaded image"
                id={`image-${index}`}
                className="uploaded-img"
                width="336"
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
      </Card.Body>
    </Card>
  );
}
