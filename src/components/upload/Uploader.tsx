import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import uploadImage from '../../images/image.svg';
// import SingleUploader from './SingleUploader';
import { db, storage } from '../../firebase/firebaseSetup';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { UploaderProp } from '../UploadCard';

const OR = 'or';

// export interface UploaderProp {
//   setProgress?: Dispatch<SetStateAction<number>>;
// }

export interface UploadableFile {
  file: File;
}

const handleUpload = (files: File[]) => {
  if (!files.length) return;

  files.map((file) => {
    const imageRef = ref(storage, `images/${file.lastModified}${file.name}`);
    return uploadBytes(imageRef, file).then(() => {
      console.log('uploaded');
    });
  });

  // for image preview
  // files.map((file) =>
  //   Object.assign(file, {
  //     preview: URL.createObjectURL(file)
  //   })
  // );
};

export default function Uploader({ setProgress }: UploaderProp) {
  const [selectedFiles, setSelectedFiles] = useState<UploadableFile[]>([]);
  const [url, setURL] = useState(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const accepted = acceptedFiles.map((file) => ({ file }));
    setSelectedFiles((curr) => [...curr, ...accepted]);
    handleUpload(acceptedFiles);
  }, []);

  const { getRootProps, open, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true
  });

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>{file.path}</li>
  // ));

  const resetImage = () => {
    setSelectedFiles([]);
  };

  console.log(storage);
  console.log(process.env.FIREBASE_API_KEY);
  return (
    <>
      <div className="drop-area" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image id="upload-box-image" src={uploadImage} alt="drop area" />
        <p>Drag 'n' drop some files here</p>
      </div>
      <p>{OR}</p>
      <Button onClick={open}>Choose a File</Button>

      {selectedFiles.map((fileWrapper) => {
        console.log(fileWrapper);
        return (
          <Fragment key={fileWrapper.file.name}>
            <p>{fileWrapper.file.name}</p>
            <Image src={fileWrapper.file.name} />
          </Fragment>
        );
      })}
    </>
  );
}
