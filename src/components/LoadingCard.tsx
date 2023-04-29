import UploadProgress from './UploadProgress';
import { UploadableFile } from './CardBody';

export interface LoadingProp {
  files: UploadableFile[];
}
export default function LoadingCard({ files }: LoadingProp) {
  return (
    <>
      {files &&
        files.map((fileWrapper) => (
          <UploadProgress
            key={fileWrapper.file.name}
            file={fileWrapper.file}
            progress={fileWrapper.progress}
          />
        ))}
    </>
  );
}
