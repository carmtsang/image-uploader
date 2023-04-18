import React, { Fragment } from 'react';
import { useCallback, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import uploadImage from '../../images/image.svg';
// import SingleUploader from './SingleUploader';
import { db, storage } from '../../firebase/firebaseSetup';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { UploaderProp } from '../UploadCard';

const OR = 'or';

export interface UploadableFile {
  file: File;
}

export default function Uploader({
  setProgress,
  handleCardChange,
  setUrls
}: UploaderProp) {
  const [selectedFiles, setSelectedFiles] = useState<UploadableFile[]>([]);

  const resetUploader = () => {
    setSelectedFiles([]);
  };

  // const handleUpload = (files: File[]) => {
  //   if (!files.length || files === null) return;

  //   return files.forEach((file) => {
  //     const imageRef = ref(storage, `images/${file.lastModified}${file.name}`);
  //     uploadBytesResumable(imageRef, file)
  //       .then(() =>
  //         getDownloadURL(imageRef).then((url) =>
  //           setUrls((prev) => [...prev, url])
  //         )
  //       )
  //       .catch((e) => console.error(e))
  //       .finally(() => console.log('uploaded'));
  //   });
  // };

  const handleUpload = async (files: File[]) => {
    try {
      if (!files.length || files === null) return;
      await Promise.all(
        files.map(async (file) => {
          const imageRef = ref(
            storage,
            `images/${file.lastModified}${file.name}`
          );
          await uploadBytesResumable(imageRef, file);
          const url = await getDownloadURL(imageRef);
          setUrls((prev) => [...prev, url]);
          console.log('uploaded');
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const accepted = acceptedFiles.map((file) => ({ file }));
    setSelectedFiles((curr) => [...curr, ...accepted]);
    handleUpload(acceptedFiles);
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
