import { Dispatch, Fragment, SetStateAction } from 'react';
import { Image, InputGroup, Button, Form, Card } from 'react-bootstrap';
import DoneCheck from '../images/done_FILL1_wght600_GRAD0_opsz48.svg';
import { UploadableFile } from './CardBody';
const SUCCESSFUL_MESSAGE = 'Uploaded Successfully!';

export interface SuccessfulProps {
  files: UploadableFile[];
  setFiles: Dispatch<SetStateAction<UploadableFile[]>>;
}

export default function SuccessfulCard({ setFiles, files }: SuccessfulProps) {
  return (
    <>
      <Image src={DoneCheck} className="done-check" />
      <Card.Title>{SUCCESSFUL_MESSAGE}</Card.Title>
      <Button
        variant="outline-secondary"
        id="new-upload-btn"
        className="spacing"
        onClick={() => setFiles([])}
      >
        New Upload
      </Button>
      {files.length > 0 &&
        files.map((file, index) => (
          <Fragment key={file.file.name}>
            <Image
              src={file?.url}
              alt="uploaded image"
              id={`image-${index}`}
              className="uploaded-img"
            />
            <InputGroup className="mb-3">
              <Form.Control
                value={file?.url}
                id={`image-url-${index}`}
                readOnly
              />
              <Button
                className="copy-btn"
                variant="primary"
                onClick={() => navigator.clipboard.writeText(file?.url)}
              >
                Copy Link
              </Button>
            </InputGroup>
          </Fragment>
        ))}
    </>
  );
}
