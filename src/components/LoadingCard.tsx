import UploadProgress from './UploadProgress';
import { UploadableFile } from './CardBody';
import { Dispatch, SetStateAction } from 'react';

export interface LoadingProp {
  files: UploadableFile[];
}
export default function LoadingCard({ files }: LoadingProp) {
  return (
    <>
      {files &&
        files.map((file) => (
          <UploadProgress
            key={file.file.name}
            file={file.file}
            progress={file.progress}
          />
        ))}
    </>
  );
}
