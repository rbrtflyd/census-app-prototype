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
} from './Pages';

export function EnrichEnhanceDrawer() {
  const { addPage } = useEnrichEnhance();

  useEffect(() => {
    // Register all pages
    addPage({
      id: 'home',
      title: 'Enrich & Enhance',
      component: <EnrichEnhanceHome />,
    });

    addPage({
      id: 'enrichment-selection',
      title: 'Enrichment by Company',
      component: <EnrichmentSelection />,
      parentId: 'home',
    });
    addPage({
      id: 'enrich-enhance-ai',
      title: 'Enrich & Enhance AI',
      component: <EnrichEnhanceAI />,
      parentId: 'home',
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
