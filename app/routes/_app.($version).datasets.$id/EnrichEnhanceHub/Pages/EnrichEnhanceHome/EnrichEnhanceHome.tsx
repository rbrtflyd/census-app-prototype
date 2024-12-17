import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faTimes,
  faCaretDown,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { useEnrichEnhance } from '../../context/EnrichEnhanceContext';

export function EnrichEnhanceHome() {
  const { navigateToPage } = useEnrichEnhance();

  const EnrichEnhanceFunctions = [
    {
      title: 'Enrich Data',
      icon: faSparkles,
      onClick: () => navigateToPage('enrichment-selection'),
    },
    {
      title: 'Use AI',
      icon: faSparkles,
      onClick: () => navigateToPage('enrich-enhance-ai'),
    },
    {
      title: 'No Code Calculations',
      icon: faSparkles,
      onClick: () => navigateToPage('no-code-calculations'),
    },
    {
      title: 'Reference Related Data',
      icon: faSparkles,
      onClick: () => navigateToPage('reference-related-data'),
    },
    {
      title: 'Deduplicate Data',
      icon: faSparkles,
      onClick: () => navigateToPage('deduplicate-data'),
    },
  ];

  return (
    <div className="flex flex-col gap-2 p-6">
      {EnrichEnhanceFunctions.map((item) => (
        <button
          onClick={item.onClick}
          key={item.title}
          className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base">
          {item.icon && (
            <FontAwesomeIcon
              icon={item.icon}
              className="text-lg icon-lighter"
            />
          )}
          <Text className="font-medium text-lg leading-none">{item.title}</Text>
        </button>
      ))}
    </div>
  );
}
