import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faTimes,
  faCaretDown,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { useEnrichEnhance } from '../../../context/EnrichEnhanceContext';

export function EnrichByColumn() {
  const { navigateToPage, selectedColumn } = useEnrichEnhance();
  return (
    <div className="flex flex-col gap-6 p-6">
      <Text className="font-medium text-lg">
        Enriching column: {selectedColumn}
      </Text>
      <button
        className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base"
        onClick={() => navigateToPage('enrich-by-row')}>
        <Text className="font-medium text-lg">
          Magically Fill in Missing Data
        </Text>
      </button>
      <button
        className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base"
        onClick={() => navigateToPage('enrich-condition-builder')}>
        <Text className="font-medium text-lg">Conditionally Fill Data</Text>
      </button>
      <button
        className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base"
        onClick={() => navigateToPage('enrich-by-row')}>
        <Text className="font-medium text-lg">
          Use Multiple Providers to Fill Data
        </Text>
      </button>
    </div>
  );
}
