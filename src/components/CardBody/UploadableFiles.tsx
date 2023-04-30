import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import remove from '../../images/close_FILL0_wght400_GRAD0_opsz48.svg';
import { UploadableFile } from '.';

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
            <Col sm={10}>
              <p className="file-name">{fileWrapper.file.name} </p>
              <p className="file-size">- {fileWrapper.file.size} bytes</p>
            </Col>
            <Col sm={2}>
              <Image
                src={remove}
                className="close-item"
                onClick={() => handleDelete(fileWrapper.file.name)}
                width={20}
              />
            </Col>
          </Row>
        ))}
    </Container>
  );
}
