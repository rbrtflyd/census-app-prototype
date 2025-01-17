import { useState } from 'react';
import { Button } from '../../../../ui/button';
import { Text } from '@radix-ui/themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { Input } from '~/components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBan,
  faBracketSquare,
  faBracketsSquare,
  faHashtag,
  faRefresh,
  faText,
} from '@fortawesome/pro-regular-svg-icons';
import { faCalendar, faToggleOn } from '@fortawesome/pro-solid-svg-icons';

interface ColumnMappingProps {
  headers: string[];
  onColumnMapping: (mapping: Record<string, string>) => void;
  onBack: () => void;
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
  onBack,
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
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-medium">Map CSV Columns to Attributes</h2>
        <Button
          variant="secondary"
          size="small"
          onClick={onBack}>
          <FontAwesomeIcon
            icon={faRefresh}
            className="mr-1 text-sm icon-light"
          />
          Change CSV File
        </Button>
      </div>
      <div className="flex flex-col gap-2 w-2/3">
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
                <SelectValue placeholder="Select a data type" />
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
                      <Text>{type.label}</Text>
                    </div>
                  </SelectItem>
                ))}
                <SelectSeparator />
                <SelectItem value="no_import">
                  <FontAwesomeIcon
                    icon={faBan}
                    className="icon-light mr-3"
                  />
                  <Text className="text-sm">Do not import</Text>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}
