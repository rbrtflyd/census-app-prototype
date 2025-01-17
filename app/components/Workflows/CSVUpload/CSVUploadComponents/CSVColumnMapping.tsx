import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';

interface ColumnMappingProps {
  headers: string[];
  onColumnMapping: (mapping: Record<string, string>) => void;
}

const ATTRIBUTES = ['First Name', 'Last Name', 'Email', 'Phone', 'Address'];

export default function ColumnMapping({
  headers,
  onColumnMapping,
}: ColumnMappingProps) {
  const [mapping, setMapping] = useState<Record<string, string>>({});

  const handleMapping = (header: string, attribute: string) => {
    setMapping((prev) => ({ ...prev, [header]: attribute }));
  };

  const handleSubmit = () => {
    onColumnMapping(mapping);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Map CSV Columns to Attributes</h2>
      {headers.map((header) => (
        <div
          key={header}
          className="flex items-center space-x-4">
          <span className="w-1/3">{header}</span>
          <Select onValueChange={(value) => handleMapping(header, value)}>
            <SelectTrigger className="w-2/3">
              <SelectValue placeholder="Select an attribute" />
            </SelectTrigger>
            <SelectContent>
              {ATTRIBUTES.map((attribute) => (
                <SelectItem
                  key={attribute}
                  value={attribute}>
                  {attribute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        className="mt-4">
        Process CSV
      </Button>
    </div>
  );
}
