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
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Array<BreadcrumbItem>;
}

interface ButtonProps {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumb?: BreadcrumbProps;
  button?: ButtonProps;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumb,
  button,
}) => {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b border-base h-16">
      <div className="flex items-center">
        <div className="mr-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb &&
                breadcrumb.items.map((item, index) => (
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
      {button && (
        <div className="flex space-x-2">
          <Button size="sm">{button.label}</Button>
        </div>
      )}
    </header>
  );
};

export default PageHeader;
