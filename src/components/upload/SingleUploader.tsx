import { useEffect } from 'react';

export interface SingleUploaderProps {
  file: File;
}

const uploadFile = (file: File, onProgress: (percentage: number) => void) => {
  const url = '...';
  const key = '....';
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      res('url where cloud saves file');
    };

    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', key);
    xhr.send(formData);
  });
};

export default function SingleUploader({ file }: SingleUploaderProps) {
  return <>{file.name}</>;
}
