import UploadProgress from './UploadProgress';
import { UploadableFile } from './CardBody';
import { Dispatch, SetStateAction } from 'react';

export interface LoadingProp {
  files: UploadableFile[];
  setUrls: Dispatch<SetStateAction<string[]>>;
  setFiles: Dispatch<SetStateAction<UploadableFile[]>>;
}
export default function LoadingCard({ files, setUrls }: LoadingProp) {
  return (
    <>
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
