import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { UploadableFile } from './CardBody';
import remove from '../images/close_FILL0_wght400_GRAD0_opsz48.svg';

export interface UploadableFilesProps {
  files: UploadableFile[];
  handleUpload: (files: UploadableFile[]) => void;
  handleDelete: (fileName: string) => void;
}

export default function UploadableFiles({
  files,
  handleUpload,
  handleDelete
}: UploadableFilesProps) {
  return (
    <Container>
      <Button variant="outline-secondary" onClick={() => handleUpload(files)}>
        Upload
      </Button>
      {files &&
        files.map((fileWrapper) => (
          <Row key={fileWrapper.file.name}>
            <Col sm={10}>{fileWrapper.file.name}</Col>
            <Col sm={2}>
              <Image
                src={remove}
                className="close-item"
                onClick={() => handleDelete(fileWrapper.file.name)}
                roundedCircle
                width={20}
              />
            </Col>
          </Row>
        ))}
    </Container>
  );
}
