import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSparkles, faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { faArrowLeft, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { useEnrichEnhance } from '../../../../contexts/EnrichEnhanceContext';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '~/components/ui/drawer';

interface EnrichEnhanceDrawerProps {
  trigger: React.ReactNode;
  defaultPage?: string;
}

export function EnrichEnhanceNestedDrawer({
  trigger,
  defaultPage = 'home',
}: EnrichEnhanceDrawerProps) {
  const { currentPageId, pageHistory, navigateBack, pages } =
    useEnrichEnhance();
  const currentPage = pages[currentPageId];
  const showBackButton = pageHistory.length > 1;
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        direction="right"
        className="overflow-hidden max-w-[50%]">
        <DrawerHeader
          className={`flex flex-row items-center gap-4 border-b border-base  ${
            !showBackButton
              ? 'bg-gradient-to-r from-pink-500 to-plum-500 p-8 text-white'
              : 'bg-white p-4'
          }`}>
          <div className="flex flex-row items-center gap-2">
            {showBackButton && (
              <Button
                onClick={navigateBack}
                variant="ghost"
                size="icon">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-sm icon-lighter"
                />
              </Button>
            )}
            <Text className="font-medium text-lg">{currentPage?.title}</Text>
          </div>

          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon">
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">{currentPage?.component}</div>
      </DrawerContent>
    </Drawer>
  );
}
