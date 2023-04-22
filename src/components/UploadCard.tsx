import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebaseSetup';
import { useDropzone } from 'react-dropzone';

import UploadImage from '../images/image.svg';
import { UploadableFile } from './CardBody';
import LoadingCard from './LoadingCard';

const UPLOAD_TITLE = 'Upload your image';
const UPLOAD_DESCRIPTION = 'File should be Jpeg, Png...';
const OR = 'or';

export interface UploaderProp {
  setCardBody: Dispatch<SetStateAction<number>>;
  setUrls: Dispatch<SetStateAction<string[]>>;
}

export default function UploadCard({ setCardBody, setUrls }: UploaderProp) {
  const [files, setFiles] = useState<UploadableFile[]>([]);

  // const handleUpload = (files: File[]) => {
  //   if (!files.length || files === null) return;
  //   setCardBody(1);
  //   return files.forEach((file) => {
  //     const imageRef = ref(storage, `images/${file.lastModified}${file.name}`);
  //     const uploadTask = uploadBytesResumable(imageRef, file);

  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setProgress(progress);
  //       },
  //       (error) => console.log(error),
  //       () =>
  //         getDownloadURL(imageRef).then((url) =>
  //           setUrls((prev) => [...prev, url])
  //         )
  //     );
  //   });
  // };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mappedFiles = acceptedFiles.map((file) => ({ file }));
      mappedFiles.map((file) => setFiles((prev) => [...prev, file]));
    },
    [setFiles]
  );

  const { getRootProps, open, getInputProps } = useDropzone({
    onDrop,
    multiple: true
  });

  return (
    <>
      <Card.Title>{UPLOAD_TITLE}</Card.Title>
      <Card.Body id="upload-section">
        {UPLOAD_DESCRIPTION}
        <div className="image-uploader">
          <div className="drop-area" {...getRootProps()}>
            <input {...getInputProps()} />
            <Image id="upload-box-image" src={UploadImage} alt="drop area" />
            <p>Drag 'n' drop some files here</p>
          </div>
          <p>{OR}</p>
          <Button onClick={open}>Choose a File</Button>
        </div>
      </Card.Body>
      <LoadingCard setFiles={setFiles} files={files} setUrls={setUrls} />
    </>
  );
}
