import { faArrowsUpDownLeftRight } from '@fortawesome/pro-solid-svg-icons';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@radix-ui/themes';
import { toast } from 'sonner';
import { TableRowType } from '~/routes/_app.($version).datasets._index/route';
import { faFolder } from '@fortawesome/pro-regular-svg-icons';

export default function MoveTableItemDialog({
  moveFolderDialogOpen,
  setMoveFolderDialogOpen,
  selectedItems,
  foldersData,
  setSelectedRows,
}: {
  moveFolderDialogOpen: boolean;
  setMoveFolderDialogOpen: (open: boolean) => void;
  selectedItems: TableRowType[];
  foldersData: any[];
  setSelectedRows: (rows: Record<string, boolean>) => void;
}) {
  return (
    <Dialog
      open={moveFolderDialogOpen}
      onOpenChange={setMoveFolderDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="small"
          disabled={selectedItems.length === 0}>
          <FontAwesomeIcon
            icon={faArrowsUpDownLeftRight}
            className="mr-2 text-xxs"
          />
          Move
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-4 flex flex-col gap-4 *:flex">
        <div className="flex flex-col gap-1 leading-none">
          <Text className="font-medium">
            Move {selectedItems.length} item
            {selectedItems.length !== 1 ? 's' : ''}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Selected: {selectedItems.map((item) => item.name).join(', ')}
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          {foldersData.map((folder) => (
            <button
              key={folder.id}
              className="flex flex-row gap-2 items-center">
              <FontAwesomeIcon
                icon={faFolder}
                className="text-xxs"
              />
              <Text>{folder.name}</Text>
            </button>
          ))}
        </div>
        <div className="flex-row justify-between">
          <Button
            variant="secondary"
            size="small">
            New Folder
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setTimeout(() => {
                toast.success(
                  `Moved ${selectedItems.length} item${
                    selectedItems.length !== 1 ? 's' : ''
                  }`
                );
                setMoveFolderDialogOpen(false);
                setSelectedRows({});
              }, 500);
            }}>
            <FontAwesomeIcon
              icon={faArrowsUpDownLeftRight}
              className="mr-2 text-xxs"
            />
            Move Items
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
