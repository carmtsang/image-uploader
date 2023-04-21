import React, { Fragment } from 'react';
import { useCallback, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import UploadImage from '../../images/image.svg';

import { storage } from '../../firebase/firebaseSetup';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { UploaderProp } from '../UploadCard';

const OR = 'or';

export interface UploadableFile {
  file: File;
}

export default function Uploader({
  setProgress,
  setCardBody,
  setUrls
}: UploaderProp) {
  const [selectedFiles, setSelectedFiles] = useState<UploadableFile[]>([]);

  // for previewing upload before hand. Do i want to implement this...
  const resetUploader = () => {
    setSelectedFiles([]);
  };

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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const accepted = acceptedFiles.map((file) => ({ file }));
      setSelectedFiles((curr) => [...curr, ...accepted]);
      const handleUpload = (files: File[]) => {
        if (!files.length || files === null) return;
        setCardBody(1);
        return files.forEach((file) => {
          const imageRef = ref(
            storage,
            `images/${file.lastModified}${file.name}`
          );
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
      handleUpload(acceptedFiles);
    },
    [setCardBody, setProgress, setUrls]
  );

  const { getRootProps, open, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true
  });

  return (
    <>
      <div className="drop-area" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image id="upload-box-image" src={UploadImage} alt="drop area" />
        <p>Drag 'n' drop some files here</p>
      </div>
      <p>{OR}</p>
      <Button onClick={open}>Choose a File</Button>
    </>
  );
}
