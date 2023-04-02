import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader() {
  const [files, setFiles] = useState([]);
  const { getRootProps, acceptedFiles, getInputProps } = useDropzone({
    accept: { "image/*": [] },
  });

  const onDrop = useCallback((acceptedFiles: []) => {
    console.log(acceptedFiles);
    // do something with the files
  }, []);

  const accepted = acceptedFiles.map((file: {}) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ style: {} })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{accepted}</ul>
      </aside>
    </section>
  );
}
