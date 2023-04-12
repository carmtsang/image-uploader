import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import uploadImage from '../../images/image.svg';
// import SingleUploader from './SingleUploader';
import { db, storage } from '../../firebase/firebaseSetup';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { UploaderProp } from '../UploadCard';

const OR = 'or';

export interface UploadableFile {
  file: File;
}

export default function Uploader({ setProgress, setCardBody }: UploaderProp) {
  const [selectedFiles, setSelectedFiles] = useState<UploadableFile[]>([]);

  const resetUploader = () => {
    setSelectedFiles([]);
  };

  const handleUpload = (files: File[]) => {
    if (!files.length) return;

    files.map((file) => {
      const imageRef = ref(storage, `images/${file.lastModified}${file.name}`);
      return uploadBytes(imageRef, file).then(() => {
        console.log('uploaded');
      });
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const accepted = acceptedFiles.map((file) => ({ file }));
    setSelectedFiles((curr) => [...curr, ...accepted]);
    try {
      handleUpload(acceptedFiles);
    } catch (e) {
      console.log(`Could not upload file. ${e}`);
    } finally {
      resetUploader();
    }
  }, []);

  const { getRootProps, open, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true
  });

  return (
    <>
      <div className="drop-area" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image id="upload-box-image" src={uploadImage} alt="drop area" />
        <p>Drag 'n' drop some files here</p>
      </div>
      <p>{OR}</p>
      <Button onClick={open}>Choose a File</Button>
    </>
  );
}
