import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { Progress, Text } from '@radix-ui/themes';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import CircularProgressIndicator from '~/components/Progress/CircularProgressIndicator';
interface FileUploadProps {
  onFileUpload: (data: string[][], headers: string[]) => void;
  progress: number;
}

export default function FileUpload({
  onFileUpload,
  progress,
}: FileUploadProps) {
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
      className={`border rounded-md border-dashed p-8 text-center cursor-pointer transition-all duration-75 h-full flex flex-col justify-center items-center ${
        isDragActive
          ? 'border-plum-500 bg-plum-100'
          : 'border-slate-100 bg-subtle'
      }`}>
      <input {...getInputProps()} />
      {progress > 0 ? (
        <div className="flex flex-col items-center gap-4 w-full max-w-[300px]">
          <CircularProgressIndicator
            progress={progress}
            size={32}
          />
          <Text className="text-lg text-light">Uploading CSV...</Text>
        </div>
      ) : isDragActive ? (
        <div>
          <Text>Drop your CSV in this area to upload</Text>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-stretch">
          <Text className="text-lg font-medium">
            Drop your CSV in this area to upload
          </Text>
          <div className="flex flex-row gap-6 items-center justify-center">
            <Separator className="w-full" />
            <Text>or</Text>
            <Separator className="w-full" />
          </div>
          <Button
            variant="secondary"
            onClick={() => {}}>
            Choose a .CSV file
          </Button>
        </div>
      )}
    </div>
  );
}
