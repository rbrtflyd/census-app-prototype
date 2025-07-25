import React from 'react';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/pro-solid-svg-icons';

import { IconDefinition } from '@fortawesome/pro-regular-svg-icons';
import { useBreadcrumbs } from '~/contexts/BreadcrumbContext';
import { Link } from '@remix-run/react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: IconDefinition;
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'table' | 'fancy';
}

interface PageHeaderProps {
  title: string;
  button?: ButtonProps;
  children?: React.ReactNode;
  breadcrumbs?: any[];
}

const TitleSlot = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

const RightSlot = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-row items-center gap-4">{children}</div>;
};

const PageHeader: React.FC<PageHeaderProps> & {
  TitleSlot: typeof TitleSlot;
  RightSlot: typeof RightSlot;
} = ({
  title,
  button = { variant: 'primary', label: '' },
  children,
}: PageHeaderProps) => {
  const { breadcrumbs, folderBreadcrumbs } = useBreadcrumbs();
  const titleSlotChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TitleSlot
  );

  const rightSlotChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === RightSlot
  );

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b border-base h-16">
      <div className="flex items-center">
        <div className="mr-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs?.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <Link
                      to={item.href}
                      className="transition-colors duration-75 text-lighter hover:text-slate-950 dark:hover:text-slate-50 px-2 py-2 hover:bg-slate-50 rounded">
                      <Text>{item.label}</Text>
                    </Link>
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}

              {/* Folder breadcrumbs - all except the last one are clickable */}
              {folderBreadcrumbs?.map((folder, index) => (
                <React.Fragment key={`folder-${folder.id || 'root'}`}>
                  {index < folderBreadcrumbs.length - 1 ? (
                    // Clickable breadcrumb items (not the current page)
                    <BreadcrumbItem className="flex flex-row items-center">
                      <BreadcrumbLink
                        className="cursor-pointer flex items-center"
                        onClick={() => folder.onClick?.(folder.id)}>
                        {folder.id && (
                          <FontAwesomeIcon
                            icon={faFolder}
                            className="mr-2 icon-lighter"
                          />
                        )}
                        <Text>{folder.name}</Text>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    // Current page (highlighted, not clickable)
                    <BreadcrumbItem className="flex flex-row items-center">
                      <BreadcrumbPage className="flex items-center">
                        {folder.id && (
                          <FontAwesomeIcon
                            icon={faFolder}
                            className="mr-2 icon-lighter"
                          />
                        )}
                        <Text>{folder.name}</Text>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}

                  {index < folderBreadcrumbs.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              ))}

              {/* Only show regular title if no folder breadcrumbs and title exists */}
              {(!folderBreadcrumbs || folderBreadcrumbs.length === 0) &&
                title && (
                  <>
                    {breadcrumbs?.length > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbPage>
                      {typeof title === 'string' ? <Text>{title}</Text> : title}
                    </BreadcrumbPage>
                  </>
                )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {rightSlotChild}
        {button.label && (
          <div className="flex space-x-2 items-center">
            <Button
              size="small"
              variant={button.variant}
              onClick={button.onClick}>
              {button.icon && (
                <FontAwesomeIcon
                  icon={button.icon}
                  className="mr-1.5 text-xs"
                />
              )}
              {button.label}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

PageHeader.TitleSlot = TitleSlot;
PageHeader.RightSlot = RightSlot;

export default PageHeader;
