import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { UploadableFile } from './CardBody';
import remove from '../images/close_FILL0_wght400_GRAD0_opsz48.svg';

export interface UploadableFilesProps {
  files: UploadableFile[];
  handleUpload: (files: UploadableFile[]) => void;
  handleDelete: (file: UploadableFile) => void;
}

export default function UploadableFiles({
  files,
  handleUpload,
  handleDelete
}: UploadableFilesProps) {
  return (
    <Container>
      <Button variant="secondary-outline" onClick={() => handleUpload(files)}>
        Upload
      </Button>
      {files &&
        files.map((fileWrapper) => (
          <Row key={fileWrapper.file.name}>
            <Col sm={10}>{fileWrapper.file.name}</Col>
            <Col sm={2}>
              <Image
                src={remove}
                onClick={() => handleDelete}
                roundedCircle
                width={20}
              />
            </Col>
          </Row>
        ))}
    </Container>
  );
}
