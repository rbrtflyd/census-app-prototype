import React, { useState } from 'react';
import { Button, Input } from '~/components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import CreateNewFolderDialog from '~/components/Dialogs/FolderDialogs/CreateNewFolderDialog';
import MoveTableItemDialog from '~/components/Dialogs/FolderDialogs/MoveTableItemDialog';

// Define the types for toolbar actions
export interface ToolbarAction {
  id: string;
  label: string;
  icon: IconDefinition;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'fancy' | 'ghost';
  title?: string;
  // Dialog-specific properties
  dialogType?: 'create-folder' | 'move-items';
  dialogProps?: any;
}

export interface ToolbarActionGroup {
  id: string;
  actions: ToolbarAction[];
}

export interface TableToolbarProps {
  // Left side configuration
  leftActions?: ToolbarAction[];
  leftActionGroups?: ToolbarActionGroup[];

  // Right side configuration
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  rightActions?: ToolbarAction[];

  // Additional customization
  className?: string;

  // Dialog-specific props (for existing dialogs)
  selectedItems?: any[];
  foldersData?: any[];
  onSelectionCleared?: () => void;
}

export default function TableToolbar({
  leftActions = [],
  leftActionGroups = [],
  showSearch = true,
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  rightActions = [],
  className = '',
  selectedItems = [],
  foldersData = [],
  onSelectionCleared,
}: TableToolbarProps) {
  const [dialogStates, setDialogStates] = useState<Record<string, boolean>>({});

  const openDialog = (actionId: string) => {
    setDialogStates((prev) => ({ ...prev, [actionId]: true }));
  };

  const closeDialog = (actionId: string) => {
    setDialogStates((prev) => ({ ...prev, [actionId]: false }));
  };

  const renderAction = (action: ToolbarAction) => {
    const isDialogAction = !!action.dialogType;
    const isOpen = dialogStates[action.id] || false;

    // For dialog actions, we need to render both the trigger and the dialog
    if (isDialogAction) {
      switch (action.dialogType) {
        case 'create-folder':
          return (
            <CreateNewFolderDialog
              key={action.id}
              createFolderDialogOpen={isOpen}
              setCreateFolderDialogOpen={(open) => {
                if (open) {
                  openDialog(action.id);
                } else {
                  closeDialog(action.id);
                }
              }}
            />
          );

        case 'move-items':
          return (
            <MoveTableItemDialog
              key={action.id}
              moveFolderDialogOpen={isOpen}
              setMoveFolderDialogOpen={(open) => {
                if (open) {
                  openDialog(action.id);
                } else {
                  closeDialog(action.id);
                }
              }}
              selectedItems={selectedItems}
              foldersData={foldersData}
              setSelectedRows={onSelectionCleared || (() => {})}
            />
          );

        default:
          return null;
      }
    }

    // Regular action button
    return (
      <Button
        key={action.id}
        onClick={action.onClick}
        variant={action.variant || 'secondary'}
        size="small"
        disabled={action.disabled}
        title={action.title}>
        <FontAwesomeIcon
          icon={action.icon}
          className="mr-2 text-xxs"
        />
        {action.label}
      </Button>
    );
  };

  const renderActionGroup = (group: ToolbarActionGroup) => (
    <div
      key={group.id}
      className="flex flex-row items-center gap-2">
      {group.actions.map(renderAction)}
    </div>
  );

  return (
    <div
      className={`flex flex-row items-center gap-2 px-6 py-3 border-b border-base justify-between ${className}`}>
      <div className="flex flex-row gap-2.5 items-center">
        {/* Render individual left actions */}
        {leftActions.map(renderAction)}

        {/* Render action groups with separators */}
        {leftActionGroups.map((group, index) => (
          <React.Fragment key={group.id}>
            {(index > 0 || leftActions.length > 0) && (
              <div className="h-7 w-px bg-slate-50 mx-2" />
            )}
            {renderActionGroup(group)}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-row items-center gap-2">
        {/* Right actions */}
        {rightActions.map(renderAction)}

        {/* Search input */}
        {showSearch && (
          <Input
            placeholder={searchPlaceholder}
            className="w-80"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
