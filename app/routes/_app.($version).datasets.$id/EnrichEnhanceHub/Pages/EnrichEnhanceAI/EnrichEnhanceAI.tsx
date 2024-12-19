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
      <Text>AI Configuration</Text>
    </div>
  );
}
