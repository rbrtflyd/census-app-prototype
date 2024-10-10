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

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: Array<BreadcrumbItem>;
}

interface PageHeaderProps {
  title: string;
  breadcrumb?: Array<BreadcrumbProps>;
  button?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumb,
  button,
}) => {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b border-base">
      <div className="flex items-center">
        {breadcrumb && (
          <div className="mr-4">
            <Breadcrumb>
              <BreadcrumbList>
                <div>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
        <Text className="text-xl font-medium leading-none">{title}</Text>
      </div>
      {button && (
        <div className="flex space-x-2">
          <Button>New</Button>
        </div>
      )}
    </header>
  );
};

export default PageHeader;
