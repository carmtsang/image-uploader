import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Card, Image, Button } from 'react-bootstrap';

import { useDropzone } from 'react-dropzone';

import uploadImage from '../../images/image.svg';
import LoadingCard from './LoadingCard';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import UploadableFiles from './UploadableFiles';
import { UploadableFile } from '.';
import { storage } from '../../firebase/firebaseSetup';

const UPLOAD_TITLE = 'Upload your image';
const UPLOAD_DESCRIPTION = 'File should be Jpeg, Png...';
const LOADING = 'Loading...';
const OR = 'or';

export interface UploaderProp {
  setFiles: Dispatch<SetStateAction<UploadableFile[]>>;
  files: UploadableFile[];
  setUrls: Dispatch<SetStateAction<string[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  showSuccessful: boolean;
  setShowSuccessful: Dispatch<SetStateAction<boolean>>;
}

export default function UploadCard({
  setFiles,
  files,
  setUrls,
  loading,
  showSuccessful,
  setShowSuccessful,
  setLoading
}: UploaderProp) {
  const handleUpload = (files: UploadableFile[]) => {
    setLoading(true);

    try {
      files.forEach((fileWrapper) => {
        const imageRef = ref(
          storage,
          `images/${fileWrapper.file.lastModified}${fileWrapper.file.name}`
        );

        const uploadTask = uploadBytesResumable(imageRef, fileWrapper.file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            const updated = files.map((fileWrap) => {
              if (fileWrap.file.name === fileWrapper.file.name) {
                return {
                  ...fileWrapper,
                  progress
                };
              }
              return fileWrap;
            });
            setFiles(updated);
          },
          (error) => console.log(error),
          () =>
            getDownloadURL(imageRef).then((url) =>
              setUrls((prev) => [...prev, url])
            )
        );
      });
      return setShowSuccessful(true);
    } catch (e) {
      console.error(e);
    }
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
    multiple: true,
    accept: { 'image/png': ['.png', '.jpeg', '.jpg'] }
  });

  return (
    <Card
      border="light"
      className={`content-card text-center ${showSuccessful ? 'hidden' : ''}`}
    >
      <Card.Title className={loading ? 'loading' : ''}>
        {loading ? LOADING : UPLOAD_TITLE}
      </Card.Title>

      {loading ? (
        <LoadingCard files={files} />
      ) : (
        <Card.Body id="upload-section">
          {UPLOAD_DESCRIPTION}
          <div className="image-uploader">
            <div className="drop-area" {...getRootProps()}>
              <input {...getInputProps()} />
              <Image id="upload-box-image" src={uploadImage} alt="drop area" />
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
      )}
    </Card>
  );
}
