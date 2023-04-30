// import UploadProgress from './UploadProgress';
import { UploadableFile } from '.';
import { Card, ProgressBar } from 'react-bootstrap';

export interface LoadingProp {
  files: UploadableFile[];
}
export default function LoadingCard({ files }: LoadingProp) {
  return (
    <Card.Body>
      {/* {files &&
        files.map((fileWrapper) => (
          <UploadProgress
            key={fileWrapper.file.name}
            file={fileWrapper.file}
            progress={fileWrapper.progress}
          />
        ))} */}
      <ProgressBar now={100} className="spacing progress indeterminate" />
    </Card.Body>
  );
}
