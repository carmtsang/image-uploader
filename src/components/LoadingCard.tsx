import { Card } from 'react-bootstrap';
import UploadProgress from './UploadProgress';
import { UploadableFile } from './CardBody';
const LOADING = 'Loading...';

export interface LoadingProp {
  progress: number;
  files: UploadableFile[];
}
export default function LoadingCard({ progress, files }: LoadingProp) {
  return (
    <>
      <Card.Title className="loading">{LOADING}</Card.Title>
      {files &&
        files.map((file) => (
          <UploadProgress
            key={file.file.name}
            file={file.file}
            progress={progress}
          />
        ))}
    </>
  );
}
