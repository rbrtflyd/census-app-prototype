import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faTimes,
  faCaretDown,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { useEnrichEnhance } from '../../context/EnrichEnhanceContext';
import { EnrichDialog } from '../../DialogVersion/EnrichDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '~/components/ui';

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
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base">
            <Text>Enrich Old Way</Text>
          </button>
        </DialogTrigger>
        <DialogContent className=" overflow-hidden">
          <DialogHeader>
            <DialogTitle>New Enrichment</DialogTitle>
          </DialogHeader>
          <EnrichDialog />
          <DialogFooter>
            <Button>Enrich</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
