import { Card, Col, ProgressBar, Row } from 'react-bootstrap';

export interface UploadProgressProps {
  file: File;
  progress: number;
}

export default function UploadProgress({
  file,
  progress
}: UploadProgressProps) {
  const fileName = file.name || '';
  return (
    <Row>
      <Col>
        <Card.Subtitle>{fileName}</Card.Subtitle>
        <ProgressBar now={progress} id="progress-bar" className="spacing" />
      </Col>
    </Row>
  );
}
