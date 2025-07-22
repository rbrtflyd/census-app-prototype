import { Dialog, DialogContent, DialogTrigger } from '~/components/ui';
import { Button } from '~/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { Text } from '@radix-ui/themes';
import { Input } from '~/components/ui/input';
import { toast } from 'sonner';

export default function CreateNewFolderDialog({
  createFolderDialogOpen,
  setCreateFolderDialogOpen,
}: {
  createFolderDialogOpen: boolean;
  setCreateFolderDialogOpen: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={createFolderDialogOpen}
      onOpenChange={setCreateFolderDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="small">
          <FontAwesomeIcon
            icon={faPlus}
            className="mr-2 text-xxs"
          />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-4 flex flex-col gap-4 *:flex">
        <div className="flex flex-col gap-1 leading-none">
          <Text className="font-medium">New Folder</Text>
        </div>
        <div>
          <Input
            placeholder="Folder name"
            className="w-full"
          />
        </div>
        <div className="flex-row">
          <Button
            variant="primary"
            onClick={() => {
              setTimeout(() => {
                toast.success('Folder created');
                setCreateFolderDialogOpen(false);
              }, 500);
            }}>
            <FontAwesomeIcon
              icon={faPlus}
              className="mr-2 text-xxs"
            />
            Create Folder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
