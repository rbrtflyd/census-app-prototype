import { useState } from 'react';
import { Button } from '../../../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { Input } from '~/components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBracketSquare,
  faBracketsSquare,
  faHashtag,
  faText,
} from '@fortawesome/pro-regular-svg-icons';
import { faCalendar, faToggleOn } from '@fortawesome/pro-solid-svg-icons';

interface ColumnMappingProps {
  headers: string[];
  onColumnMapping: (mapping: Record<string, string>) => void;
}

const DATA_TYPES = [
  { label: 'String', value: 'string', icon: faText },
  { label: 'Number', value: 'number', icon: faHashtag },
  { label: 'Date', value: 'date', icon: faCalendar },
  { label: 'Boolean', value: 'boolean', icon: faToggleOn },
  { label: 'Array', value: 'array', icon: faBracketsSquare },
];

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
          className="flex flex-row items-center gap-8">
          <Input
            className="w-full bg-subtle hover:ring-0 hover:cursor-default truncate"
            value={header}
            readOnly
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            className="icon-lighter"
          />
          <Select onValueChange={(value) => handleMapping(header, value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an attribute" />
            </SelectTrigger>
            <SelectContent>
              {DATA_TYPES.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}>
                  <div className="flex flex-row items-center gap-3">
                    <FontAwesomeIcon
                      icon={type.icon}
                      className="icon-light"
                    />
                    {type.label}
                  </div>
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
