import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faFont,
  faHashtag,
  faCalendar,
  faEnvelope,
  faToggleOn,
  faDiamond,
  faLink,
} from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { faText } from '@fortawesome/pro-regular-svg-icons';

interface HeaderColumnProps {
  label: string;
  dataType?: 'string' | 'number' | 'date' | 'boolean';
  onSort?: () => void;
  onHide?: () => void;
  onPin?: () => void;
  significance?: 'unique' | 'primary' | 'foreign' | 'derived' | 'calculated';
}

const dataTypeIcons = {
  string: faText,
  number: faHashtag,
  date: faCalendar,
  boolean: faToggleOn,
};

const significanceIcons = {
  unique: faDiamond,
  primary: faHashtag,
  foreign: faLink,
  derived: faHashtag,
  calculated: faHashtag,
};

const significanceColors = {
  unique: 'text-plum-500',
  primary: 'bg-plum-100/35',
  foreign: 'bg-plum-100/35',
  derived: 'bg-plum-100/35',
  calculated: 'bg-plum-100/35',
};

export function HeaderColumn({
  label,
  dataType = 'string',
  onSort,
  onHide,
  onPin,
  significance,
}: HeaderColumnProps) {
  return (
    <div
      className={`pl-3 pr-5 py-1 flex items-center gap-2 h-full justify-between ${
        significance === 'unique' ? 'bg-plum-100/35' : ''
      }`}>
      <div className="flex flex-row items-center gap-3 leading-none">
        <div className="flex flex-row items-center gap-1">
          <FontAwesomeIcon
            icon={dataTypeIcons[dataType]}
            className="text-[10px] icon-lighter"
          />
          <Text>{label}</Text>
        </div>
        {significance && (
          <FontAwesomeIcon
            icon={significanceIcons[significance]}
            className={`text-[8px] icon-lighter ${significanceColors[significance]}`}
          />
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-[22px] rounded">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="h-2.5 w-2.5"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onSort}>Sort</DropdownMenuItem>
          <DropdownMenuItem onClick={onPin}>Pin Column</DropdownMenuItem>
          <DropdownMenuItem onClick={onHide}>Hide Column</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
