import React from 'react';
import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

export default function ImageUploader() {
  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const accepted = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...accepted, ...rejFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ style: {} })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here</p>
      {JSON.stringify(files)}
    </div>
  );
}
