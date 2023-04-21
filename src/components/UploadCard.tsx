import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebaseSetup';
import { useDropzone } from 'react-dropzone';

import UploadImage from '../images/image.svg';

const UPLOAD_TITLE = 'Upload your image';
const UPLOAD_DESCRIPTION = 'File should be Jpeg, Png...';
const OR = 'or';

export interface UploaderProp {
  setProgress: Dispatch<SetStateAction<number>>;
  setCardBody: Dispatch<SetStateAction<number>>;
  setUrls: Dispatch<SetStateAction<string[]>>;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export default function UploadCard({
  setProgress,
  setCardBody,
  setUrls,
  setFiles
}: UploaderProp) {
  // const handleUpload = async (files: File[]) => {
  //   try {
  //     if (!files.length || files === null) return;
  //     await Promise.all(
  //       files.map(async (file) => {
  //         const imageRef = ref(
  //           storage,
  //           `images/${file.lastModified}${file.name}`
  //         );
  //         await uploadBytesResumable(imageRef, file);
  //         const url = await getDownloadURL(imageRef);
  //         setUrls((prev) => [...prev, url]);
  //         console.log('uploaded');
  //       })
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     handleCardChange(2);
  //   }
  // };

  const handleUpload = (files: File[]) => {
    if (!files.length || files === null) return;
    setCardBody(1);
    return files.forEach((file) => {
      const imageRef = ref(storage, `images/${file.lastModified}${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => console.log(error),
        () =>
          getDownloadURL(imageRef).then((url) =>
            setUrls((prev) => [...prev, url])
          )
      );
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    acceptedFiles.map((file) => setFiles((prev) => [...prev, file]));
  }, []);

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
    </>
  );
}
