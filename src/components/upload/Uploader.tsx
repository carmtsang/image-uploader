import React from 'react';
import { useCallback, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import uploadImage from '../../images/image.svg';
import SingleUploader from './SingleUploader';
import { db, storage } from '../../firebase/firebaseSetup';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable
} from 'firebase/storage';

const OR = 'or';

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

export interface UploaderProp {
  setProgress: 
}

export default function Uploader({ setProgress }: UploaderProp) {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const [file, setFile] = useState<File>();
  const [url, setURL] = useState(null);

  const handleUpload = async () => {
    const storageRef = ref(storage, `/files/${files.name}`);
    const uploadFile = uploadBytesResumable(storageRef, file);
    try {
      uploadFile.on('state_changed', (snapshot) => {
        const percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      });
    } catch (e) {
      console.log(e);
    }
    // await Promise.all(a
    //   files.map((file) => {
    //     const imageRef = ref(storage, `posts/${docRef.id}/${image.path}`)
    //     uploadBytes(imageRef, image, "data_url").then( async () => {
    //       await const downloadURL = await getDownloadURL(imageRef)
    //     })
    //   })
    // )
  };

  // const handleFile = (e: React.SyntheticEvent) => {

  // }

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const accepted = accFiles.map((file) => ({ file, errors: [] }));

    setFiles((curr) => [...curr, ...accepted, ...rejFiles]);
  }, []);

  const { getRootProps, open, getInputProps } = useDropzone({
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

      {files.map((fileWrapper) => (
        <SingleUploader key={fileWrapper.file.name} file={fileWrapper.file} />
      ))}
    </>
  );
}
