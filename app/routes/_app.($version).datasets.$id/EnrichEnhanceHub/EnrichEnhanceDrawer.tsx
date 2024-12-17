import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSparkles } from '@fortawesome/pro-solid-svg-icons';
import { EnrichEnhanceNestedDrawer } from './EnrichEnhanceNestedDrawer/EnrichEnhanceNestedDrawer';
import { useEnrichEnhance } from './context/EnrichEnhanceContext';
import { useEffect } from 'react';

import {
  EnrichEnhanceHome,
  EnrichmentSelection,
  EnrichEnhanceAI,
  EnrichByRow,
  EnrichByColumn,
  EnrichConditionBuilder,
} from './Pages';

export function EnrichEnhanceDrawer() {
  const { addPage, selectedColumn } = useEnrichEnhance();

  useEffect(() => {
    // Register all pages
    addPage({
      id: 'home',
      title: 'Enrich & Enhance',
      component: <EnrichEnhanceHome />,
    });

    addPage({
      id: 'enrichment-selection',
      title: 'Enrich Data',
      component: <EnrichmentSelection />,
      parentId: ['home'],
    });
    addPage({
      id: 'enrich-enhance-ai',
      title: 'Use AI',
      component: <EnrichEnhanceAI />,
      parentId: ['home'],
    });

    addPage({
      id: 'enrich-by-row',
      title: 'Enrich by Row Value',
      component: <EnrichByRow />,
      parentId: ['enrichment-selection'],
    });
    addPage({
      id: 'enrich-by-column',
      title: `Enrich by ${selectedColumn}`,
      component: <EnrichByColumn />,
      parentId: ['enrichment-selection'],
    });
    addPage({
      id: 'enrich-condition-builder',
      title: 'Conditionally Fill Data',
      component: <EnrichConditionBuilder />,
      parentId: ['enrich-by-column', 'enrich-by-row'],
    });
    // Add other pages as needed
  }, [addPage]);

  const trigger = (
    <Button
      size="small"
      variant="fancy">
      <Text>Enrich & Enhance</Text>
      <FontAwesomeIcon
        icon={faCaretDown}
        className="text-xxs ml-2"
      />
    </Button>
  );

  return <EnrichEnhanceNestedDrawer trigger={trigger} />;
}
