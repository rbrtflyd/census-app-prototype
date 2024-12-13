import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faTimes,
  faCaretDown,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '~/components/ui/drawer';

export function EnrichEnhanceDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          size="small"
          variant="fancy">
          <Text>Enrich & Enhance</Text>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="text-xxs ml-2"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        direction="right"
        className="overflow-hidden">
        <DrawerHeader className="bg-gradient-to-tr from-pink-500 to-plum-500 text-white p-12">
          <div className="flex flex-row gap-4 items-center">
            <FontAwesomeIcon
              icon={faSparkles}
              className="text-[28px] text-white"
            />
            <div className="flex flex-col gap-2 leading-none">
              <Text className="font-medium text-2xl">Enrich & Enhance</Text>
              <Text>
                Enrich and enhance this dataset which is great for reasons
              </Text>
            </div>
          </div>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon">
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-2 p-6">
          <button className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base">
            <Text className="font-medium text-lg">Enrich Company</Text>
          </button>
          <button className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base">
            <Text className="font-medium text-lg">Use AI</Text>
          </button>
          <button className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base">
            <Text className="font-medium text-lg">No Code Calculations</Text>
          </button>
          <button className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base">
            <Text className="font-medium text-lg">Reference Related Data</Text>
          </button>
          <button className="flex items-center gap-2 p-8 rounded-lg hover:bg-deep border border-base">
            <Text className="font-medium text-lg">Deduplicate Data</Text>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
