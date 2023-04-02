import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

export default function ImageUploader() {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const { getRootProps, acceptedFiles, getInputProps } = useDropzone({
    accept: { 'image/*': [] }
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejFiles: FileRejection[]) => {
      const accepted = acceptedFiles.map((file) => ({ file, errors: [] }));
      setFiles((curr) => [...curr, ...accepted, ...rejFiles]);
    },
    []
  );

  // const accepted = acceptedFiles.map((file: File) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  return (
    <section className="container">
      <div {...getRootProps({ style: {} })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        {/* <ul>{accepted}</ul> */}
      </aside>
    </section>
  );
}
