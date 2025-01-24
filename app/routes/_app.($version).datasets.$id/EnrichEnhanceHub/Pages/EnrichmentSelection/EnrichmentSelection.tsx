import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faTimes,
  faCaretDown,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { useEnrichEnhance } from '../../../../../contexts/EnrichEnhanceContext';

const columns = [
  'Company Name',
  'Company Address',
  'Company Website',
  'Company Domain',
  'Industry',
  'Employee Count',
  'Annual Revenue',
  'Company Description',
  'Founded Year',
  'Technologies Used',
  'Social Media Profiles',
  'Company Phone',
  'Company Email',
  'Company LinkedIn URL',
  'Company Twitter Handle',
  'Company Location',
  'Company Type',
  'Funding Information',
  'Company Tags',
  'Company Logo URL',
];

export function EnrichmentSelection() {
  const { navigateToPage, setSelectedColumn } = useEnrichEnhance();
  const [filteredColumns, setFilteredColumns] = React.useState(columns);

  const handleColumnSelect = (column: string) => {
    setSelectedColumn(column);
    navigateToPage('enrich-condition-builder');
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <button
        className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base"
        onClick={() => navigateToPage('enrich-by-row')}>
        <Text className="font-medium text-lg">Enrich by Row Value</Text>
      </button>
      <div className="flex flex-col gap-4">
        <Text className="font-medium text-lg">
          Choose a column to enrich by
        </Text>

        <div className="flex flex-col gap-2">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-3 py-2 border border-base rounded-md focus:outline-none focus:ring-2 focus:ring-plum-200 focus:border- before:content-['search'] before:text-lighter before:text-xs before:mr-2 before:absolute before:left-2"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              const filtered = columns.filter((column) =>
                column.toLowerCase().includes(searchTerm)
              );
              setFilteredColumns(filtered);
            }}
          />
          {filteredColumns.map((column) => (
            <button
              key={column}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-deep border border-base w-full mb-1"
              onClick={() => handleColumnSelect(column)}>
              <Text className="font-medium text-xs">{column}</Text>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
