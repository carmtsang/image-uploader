import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { storage } from '../firebase/firebaseSetup';
import { Dispatch, SetStateAction, useState } from 'react';

export interface UploadProgressProps {
  file: File;
  setUrls: Dispatch<SetStateAction<string[]>>;
}

export default function UploadProgress({ file, setUrls }: UploadProgressProps) {
  const [progress, setProgress] = useState(0);

  const handleUpload = (file: File) => {
    if (!file) return;

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
  };

  const fileName = file.name || '';
  return (
    <Row>
      <Col>
        <Card.Subtitle>{fileName}</Card.Subtitle>
        <ProgressBar now={progress} id="progress-bar" className="spacing" />
      </Col>
    </Row>
  );
}
