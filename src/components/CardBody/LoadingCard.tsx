import UploadProgress from './UploadProgress';
import { UploadableFile } from '.';
import { Card } from 'react-bootstrap';

export interface LoadingProp {
  files: UploadableFile[];
}
export default function LoadingCard({ files }: LoadingProp) {
  return (
    <Card.Body>
      {files &&
        files.map((fileWrapper) => (
          <UploadProgress
            key={fileWrapper.file.name}
            file={fileWrapper.file}
            progress={fileWrapper.progress}
          />
        ))}
    </Card.Body>
  );
}
