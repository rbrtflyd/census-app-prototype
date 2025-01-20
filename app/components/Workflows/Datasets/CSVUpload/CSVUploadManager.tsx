import { useState } from 'react';
import FileUpload from './CSVUploadComponents/CSVFileUpload';
import ColumnMapping from './CSVUploadComponents/CSVColumnMapping';

import { Button } from '~/components/ui/button';

export default function CSVUploadManager() {
  const [step, setStep] = useState(1);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [csvFileName, setCsvFileName] = useState<string>('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (data: string[][], headers: string[]) => {
    setCsvData(data);
    setHeaders(headers);
    // Simulate upload progress

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Clear interval and proceed after completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(0);
      setStep(2);
    }, 2200);

    // Don't immediately set step
    return;
    setStep(2);
  };

  const handleColumnMapping = (mapping: Record<string, string>) => {
    console.log('Column mapping:', mapping);
    // Here you would typically send the mapping and csvData to your backend
    alert('CSV processed successfully!');

    setStep(1);
    setCsvData([]);
    setHeaders([]);
  };

  const handleFileName = (fileName: string) => {
    setCsvFileName(fileName);
  };

  return (
    <div className="mx-auto p-8 w-full h-full">
      {step === 1 ? (
        <FileUpload
          onFileUpload={handleFileUpload}
          progress={progress}
          onFileName={handleFileName}
        />
      ) : (
        <ColumnMapping
          onBack={() => setStep(1)}
          headers={headers}
          onColumnMapping={handleColumnMapping}
          csvFileName={csvFileName}
        />
      )}
    </div>
  );
}
