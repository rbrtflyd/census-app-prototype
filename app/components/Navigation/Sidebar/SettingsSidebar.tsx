import { useState } from 'react';
import { NavLink, useLocation } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';

const settingsItems = [
  {
    label: 'Organization',
    collapsible: true,
  },
  {
    label: 'Workspaces',
    collapsible: false,
    to: '/settings/workspaces',
  },
  {
    label: 'User Settings',
    collapsible: false,
    to: '/settings/user',
  },
];

const organizationItems = [
  {
    label: 'General',
    to: '/settings/organization/general',
  },
  {
    label: 'Members',
    to: '/settings/organization/members',
  },
  {
    label: 'Roles',
    to: '/settings/organization/roles',
  },
  {
    label: 'Billing',
    to: '/settings/organization/billing',
  },
  {
    label: 'Integrations',
    to: '/settings/organization/integrations',
  },
];

const NavLinkItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `py-2.5 px-4 leading-none transition-all duration-75 flex flex-row items-center border-l-[3px] border-transparent ${
          isActive ? 'text-plum-500 border-l-plum-500 bg-white' : 'text-dark'
        }`
      }>
      <Text>{label}</Text>
    </NavLink>
  );
};

export default function SettingsSidebar() {
  const { pathname } = useLocation();
  const [isOrganizationOpen, setIsOrganizationOpen] = useState(
    pathname.includes('/settings/organization')
  );

  return (
    <div className="w-[220px] h-full bg-slate-12 border-r border-base">
      <div className="px-3 pt-8 pb-3">
        <Text className="text-lg font-medium">Settings</Text>
      </div>
      <div className="flex flex-col py-2 gap-3">
        {settingsItems.map((item) => {
          if (item.collapsible) {
            return (
              <Collapsible
                key={item.label}
                open={isOrganizationOpen}
                onOpenChange={setIsOrganizationOpen}>
                <CollapsibleTrigger asChild>
                  <button className="w-full py-2.5 px-4 rounded-md leading-none transition-all duration-75 flex flex-row items-center justify-between font-medium text-base">
                    <Text>{item.label}</Text>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={`text-xs transition-transform duration-100 icon-light ${
                        isOrganizationOpen ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col">
                  {organizationItems.map((orgItem) => (
                    <NavLinkItem
                      key={orgItem.to}
                      to={orgItem.to!}
                      label={orgItem.label}
                    />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          } else {
            return (
              <NavLinkItem
                key={item.to}
                to={item.to!}
                label={item.label}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
