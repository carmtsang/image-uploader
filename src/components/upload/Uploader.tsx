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

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

// export interface UploaderProp {
//   setProgress?: Dispatch<SetStateAction<number>>;
// }

export default function Uploader({ setProgress }: UploaderProp) {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [url, setURL] = useState(null);

  // const handleUpload = async () => {
  //   if (!file) {
  //     console.log('upload file');
  //   }
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadFile = uploadBytesResumable(storageRef, file);

  //   uploadFile.on('state_changed', (item) => {
  //     const percentage = Math.round(
  //       (item.bytesTransferred / item.totalBytes) * 100
  //     );
  //     setProgress(percentage);
  //     (err) => console.log(err);
  //     () =>
  //       getDownloadURL(uploadFile.snapshot.ref).then((url) => console.log(url));
  //   });
  // await Promise.all(a
  //   files.map((file) => {
  //     const imageRef = ref(storage, `posts/${docRef.id}/${image.path}`)
  //     uploadBytes(imageRef, image, "data_url").then( async () => {
  //       await const downloadURL = await getDownloadURL(imageRef)
  //     })
  //   })
  // )
  // };

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
        <p key={fileWrapper.file.name}>{fileWrapper.file.name}</p>
      ))}
    </>
  );
}
