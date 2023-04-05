import React from 'react';
import { useCallback, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import image from '../../images/image.svg';
import SingleUploader from './SingleUploader';
import { db, storage } from '../../firebase/firebaseSetup';

const OR = 'or';

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

export default function Uploader() {
  const [files, setFiles] = useState<UploadableFile[]>([]);

  console.log(db);
  console.log(storage);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const accepted = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...accepted, ...rejFiles]);
  }, []);

  const { getRootProps, open, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div className="drop-area" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <Image src={image} />
      </div>

      <p>{OR}</p>
      <Button onClick={open}>Choose a File</Button>

      {files.map((fileWrapper) => (
        <SingleUploader key={fileWrapper.file.name} file={fileWrapper.file} />
      ))}
    </>
  );
}
