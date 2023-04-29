import { Card, Col, ProgressBar, Row } from 'react-bootstrap';

export interface UploadProgressProps {
  file: File;
  progress: number | undefined;
}

export default function UploadProgress({
  progress,
  file
}: UploadProgressProps) {
  const fileName = file.name || '';
  return (
    <Row>
      <Col>
        <Card.Subtitle className="file-name">{fileName}</Card.Subtitle>
        <ProgressBar now={progress} id="progress-bar" className="spacing" />
      </Col>
    </Row>
  );
}
