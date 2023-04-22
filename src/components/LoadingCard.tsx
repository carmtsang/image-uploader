import { Card } from 'react-bootstrap';
import UploadProgress from './UploadProgress';
import { UploadableFile } from './CardBody';
import { Dispatch, SetStateAction } from 'react';
const LOADING = 'Loading...';

export interface LoadingProp {
  files: UploadableFile[];
  setUrls: Dispatch<SetStateAction<string[]>>;
  setFiles: Dispatch<SetStateAction<UploadableFile[]>>;
}
export default function LoadingCard({ files, setUrls }: LoadingProp) {
  return (
    <>
      <Card.Title className="loading">{LOADING}</Card.Title>
      {files &&
        files.map((file) => (
          <UploadProgress
            key={file.file.name}
            file={file.file}
            setUrls={setUrls}
          />
        ))}
    </>
  );
}
