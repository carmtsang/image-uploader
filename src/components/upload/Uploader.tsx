import React, { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import uploadImage from '../../images/image.svg';
// import SingleUploader from './SingleUploader';
import { db, storage } from '../../firebase/firebaseSetup';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable
} from 'firebase/storage';
import { UploaderProp } from '../UploadCard';

const OR = 'or';

// export interface UploaderProp {
//   setProgress?: Dispatch<SetStateAction<number>>;
// }

export interface UploadableFile {
  file: File;
}

export default function Uploader({ setProgress }: UploaderProp) {
  const [selectedFiles, setSelectedFiles] = useState<UploadableFile[]>([]);
  const [url, setURL] = useState(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const accepted = acceptedFiles.map((file) => ({ file, errors: [] }));

    setSelectedFiles((curr) => [...curr, ...accepted]);
  }, []);

  const { getRootProps, open, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));
  // const handleUpload = async (e: React.SyntheticEvent) => {
  //   if (!storage) return;
  //   const storageRef = ref(storage, `/images/${file.name}`);
  //   try {
  //     await storageRef.child(files[0].file.name).put(files[0]);
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // };
  const handleUpload = (files: File[]) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setSelectedFiles(files);
  };

  const resetImage = () => {
    setSelectedFiles([]);
  };

  // const handleFile = (e: React.SyntheticEvent) => {
  // }

  // const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
  //   const accepted = accFiles.map((file) => ({ file, errors: [] }));
  //   setFiles((curr) => [...curr, ...accepted, ...rejFiles]);
  //   setFile(accFiles[0]);
  // }, []);

  return (
    <>
      <div className="drop-area" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image id="upload-box-image" src={uploadImage} alt="drop area" />
        <p>Drag 'n' drop some files here</p>
      </div>
      <p>{OR}</p>
      <Button onClick={open}>Choose a File</Button>

      <ul>{files}</ul>
      {/* {files.map((fileWrapper) => (
        <p key={fileWrapper.file.name}>{fileWrapper.file.name}</p>
      ))} */}
    </>
  );
}
