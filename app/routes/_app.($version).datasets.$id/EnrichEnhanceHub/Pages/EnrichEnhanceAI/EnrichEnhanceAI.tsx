import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faTimes,
  faCaretDown,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { useEnrichEnhance } from '../../context/EnrichEnhanceContext';

export function EnrichEnhanceAI() {
  return (
    <div className="flex flex-col gap-2 p-6">
      <button className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base">
        <Text className="font-medium text-lg">Enrich by Row Value</Text>
      </button>
      <Text>Choose a column to enrich by</Text>
    </div>
  );
}
