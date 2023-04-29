import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Card, Image, Button } from 'react-bootstrap';

import { useDropzone } from 'react-dropzone';

import UploadImage from '../images/image.svg';
import { UploadableFile } from './CardBody';
import LoadingCard from './LoadingCard';
import { storage } from '../firebase/firebaseSetup';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import UploadableFiles from './UploadableFiles';

const UPLOAD_TITLE = 'Upload your image';
const UPLOAD_DESCRIPTION = 'File should be Jpeg, Png...';
const LOADING = 'Loading...';
const OR = 'or';

export interface UploaderProp {
  setFiles: Dispatch<SetStateAction<UploadableFile[]>>;
  files: UploadableFile[];
  setUrls: Dispatch<SetStateAction<string[]>>;
}

export default function UploadCard({ setFiles, files, setUrls }: UploaderProp) {
  const [loading, setLoading] = useState<boolean>(false);

  const fileUpdate = (
    fileWrapper: UploadableFile,
    prop: string,
    value: string | number
  ) => {
    const updatedFile = files.map((fileWrap) => {
      if (fileWrap.file.name === fileWrapper.file.name) {
        return {
          ...fileWrapper,
          [prop]: value
        };
      }
      return fileWrap;
    });
    console.log('updated', updatedFile);
    setFiles((prev) => [...prev, ...updatedFile]);
    console.log(files);
  };

  const handleUpload = (files: UploadableFile[]) => {
    if (!files.length || files === null) return;
    setLoading(true);
    return files.forEach((fileWrapper) => {
      const imageRef = ref(
        storage,
        `images/${fileWrapper.file.lastModified}${fileWrapper.file.name}`
      );
      console.log('imageRef', imageRef);
      const uploadTask = uploadBytesResumable(imageRef, fileWrapper.file);
      console.log('ref: ', imageRef);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          fileUpdate(fileWrapper, 'progress', progress);
        },
        (error) => console.log(error),
        () =>
          getDownloadURL(imageRef).then((url) =>
            fileUpdate(fileWrapper, 'url', url)
          )
      );
    });
  };

  const handleDelete = (fileName: string) => {
    const updatedFiles = files.filter(
      (fileWrapper) => fileWrapper.file.name !== fileName
    );
    setFiles(updatedFiles);
  };

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

  const uploadBody = () => {
    return (
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
        {files.length >= 1 && (
          <UploadableFiles
            files={files}
            handleUpload={handleUpload}
            handleDelete={handleDelete}
          />
        )}
      </Card.Body>
    );
  };

  return (
    <>
      <Card.Title className={loading ? 'loading' : ''}>
        {loading ? LOADING : UPLOAD_TITLE}
      </Card.Title>
      {loading ? <LoadingCard files={files} /> : uploadBody()}
    </>
  );
}
