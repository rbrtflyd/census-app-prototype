import { useState } from 'react';
import FileUpload from './CSVUploadComponents/CSVFileUpload';
import ColumnMapping from './CSVUploadComponents/CSVColumnMapping';

export default function CSVUploadManager() {
  const [step, setStep] = useState(1);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  const handleFileUpload = (data: string[][], headers: string[]) => {
    setCsvData(data);
    setHeaders(headers);
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

  return (
    <div className="mx-auto p-4 w-full h-full">
      {step === 1 ? (
        <FileUpload onFileUpload={handleFileUpload} />
      ) : (
        <ColumnMapping
          headers={headers}
          onColumnMapping={handleColumnMapping}
        />
      )}
    </div>
  );
}
