import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { Text } from '@radix-ui/themes';

interface FileUploadProps {
  onFileUpload: (data: string[][], headers: string[]) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as string[][];
          const headers = data[0];
          onFileUpload(data.slice(1), headers);
        },
        header: false,
      });
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-8 text-center cursor-pointer ${
        isDragActive ? 'border-plum-500 bg-plum-50' : 'border-slate-300'
      }`}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Text>Drop the CSV file here ...</Text>
      ) : (
        <Text>Drag and drop a CSV file here, or click to select a file</Text>
      )}
    </div>
  );
}
