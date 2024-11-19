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
import { useBreadcrumbContext } from '~/providers/breadcrumbContext';

import {
  useBreadcrumb,
  BreadcrumbItem as BreadcrumbItemType,
} from '~/hooks/useBreadcrumb';
import { IconDefinition } from '@fortawesome/pro-regular-svg-icons';
interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: IconDefinition;
}

interface PageHeaderProps {
  title: string;
  initialBreadcrumbs?: BreadcrumbItemType[];
  button?: ButtonProps;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, button, children }) => {
  const { items: breadcrumbs } = useBreadcrumbContext();
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b border-base h-16">
      <div className="flex items-center">
        <div className="mr-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs &&
                breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.href}>
                        <Text>{item.label}</Text>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                ))}
              <BreadcrumbPage>
                <Text>{title}</Text>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {!button && <div className="flex items-center gap-4">{children}</div>}
      {button && (
        <div className="flex space-x-2">
          <Button
            size="small"
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
    </header>
  );
};

export default PageHeader;
