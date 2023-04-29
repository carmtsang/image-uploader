import { Dispatch, Fragment, SetStateAction } from 'react';
import { Image, InputGroup, Button, Form, Card } from 'react-bootstrap';
import DoneCheck from '../images/done_FILL1_wght600_GRAD0_opsz48.svg';
import { UploadableFile } from './CardBody';
const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';

export interface SuccessfulProps {
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>;
  setFiles: Dispatch<SetStateAction<UploadableFile[]>>;
}

export default function SuccessfulCard({
  setUrls,
  setFiles,
  urls
}: SuccessfulProps) {
  const handleCopy = (url: string | undefined) => {
    if (!url) {
      return;
    }
    return navigator.clipboard.writeText(url);
  };

  const handleNewUpload = () => {
    setFiles([]);
    setUrls([]);
  };

  return (
    <>
      <Image src={DoneCheck} className="done-check" />
      <Card.Title>{SUCCESSFUL_MESSAGE}</Card.Title>
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
