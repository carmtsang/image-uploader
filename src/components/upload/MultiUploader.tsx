import React from 'react';
import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import SingleUploader from './SingleUploader';

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

export default function MultiUploader() {
  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const accepted = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...accepted, ...rejFiles]);
  }, []);

  const { getRootProps, open, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps({ style: {} })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <Button onClick={open}>Choose a File</Button>
      </div>

      {files.map((fileWrapper) => (
        <SingleUploader file={fileWrapper.file} />
      ))}
    </>
  );
}
