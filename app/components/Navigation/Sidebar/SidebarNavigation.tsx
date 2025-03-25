import React from 'react';
import { useLocation, NavLink } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import CircularProgressIndicator from '~/components/Progress/CircularProgressIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faCog,
  faHome,
  faMessage,
} from '@fortawesome/pro-solid-svg-icons';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import {
  CensusSyncs,
  CensusDestinations,
  CensusSources,
  CensusModels,
  CensusSegments,
  CensusNotifications,
} from '~/assets/census-icons';
import { Button } from '~/components/ui';

interface SidebarNavigationProps {
  newSidebar?: boolean;
}

const navLinks = [
  {
    group: 'Home',
    links: [
      { to: '/v1/getting-started', label: 'Getting Started' },
      { to: '/v1/home', label: 'Home', icon: faHome },
    ],
  },
  {
    group: 'Activate',
    links: [{ to: '/v1/syncs', label: 'Syncs', icon: CensusSyncs }],
  },
  {
    group: 'Audience Hub',
    links: [{ to: '/v1/segments', label: 'Segments', icon: CensusSegments }],
  },
  {
    group: 'Define',
    links: [{ to: '/v1/datasets', label: 'Datasets', icon: CensusModels }],
  },
  {
    group: 'Connections',
    links: [
      {
        to: '/v1/connections',
        label: 'Connections',
        icon: CensusNotifications,
      },
      { to: '/v1/sources', label: 'Sources', icon: CensusSources },
      {
        to: '/v1/destinations',
        label: 'Destinations',
        icon: CensusDestinations,
      },
    ],
  },
];

const SidebarNavigation: React.FC<SidebarNavigationProps> = (props) => {
  const { pathname } = useLocation();

  const newSidebar = props.newSidebar ?? false;

  return (
    <nav
      className={`flex flex-col h-full shrink-0 w-[220px] text-white space-y-4 border-r border-base justify-between ${
        !newSidebar
          ? 'bg-gradient-to-b from-[#1B1636] to-[#34162F]'
          : 'bg-slate-12'
      }`}>
      <div className="flex flex-col gap-4">
        <div className="px-3 pt-8 pb-3 border-b border-white/10">
          <img
            src="/logos/census/census-logo-full.svg"
            alt="Census Logo"
            className="w-auto h-7"
          />
        </div>
        <div className="flex flex-col px-3 space-y-4">
          <button className="flex flex-row items-center space-x-2 px-4 py-2 rounded-md hover:bg-white/10">
            <div className="bg-white/10 size-6 rounded font-bold flex items-center justify-center leading-none text-xs">
              <Text>S</Text>
            </div>
            <Text>Sales Team</Text>
          </button>
          <button className="flex flex-row items-center justify-center space-x-1 px-4 py-3 rounded-md hover:bg-white/20 bg-white/10 leading-none">
            <FontAwesomeIcon
              icon={faSearch}
              className="mr-2 text-sm"
            />
            <Text>Search Census...</Text>
          </button>
        </div>
        <div className="flex flex-col px-3 py-2 gap-1">
          {navLinks.map((group) => (
            <div
              key={group.group}
              className="flex flex-col">
              <div className="flex flex-col space-y-2">
                {group.links.map(
                  (link) =>
                    link.to !== '/v1/sources' &&
                    link.to !== '/v1/destinations' && (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `py-2.5 px-4 rounded-md leading-none transition-all duration-75 flex flex-row items-center ${
                            isActive || pathname.includes(link.to)
                              ? 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
                              : 'text-white/75 hover:text-white/90 hover:bg-white/10'
                          } ${link.label === 'Getting Started' ? 'mb-4' : ''}`
                        }>
                        <div className="w-4 mr-2">
                          {link.label === 'Getting Started' && (
                            <CircularProgressIndicator
                              size={16}
                              strokeWidth={2.2}
                              progress={15}
                              color="#2EBE82"
                            />
                          )}
                          {typeof link.icon === 'string' ? (
                            <img
                              src={link.icon}
                              alt={link.label}
                              className="w-4 h-4 fill-white"
                            />
                          ) : link.icon ? (
                            <FontAwesomeIcon
                              icon={link.icon}
                              className="mr-2 text-sm fill-white"
                            />
                          ) : null}
                        </div>
                        <Text>{link.label}</Text>
                      </NavLink>
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="px-3">
          <div className="flex flex-col p-5 bg-white/10 rounded-md gap-4 font-medium leading-none">
            <div className="flex flex-row gap-2">
              <Text>Free Trial</Text>
              <Text>15 days left</Text>
            </div>
            <Button>Upgrade to Pro</Button>
          </div>
        </div>
        <div className="flex flex-col px-3 py-2 gap-1">
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `py-2.5 px-4 rounded-md leading-none transition-all duration-75 flex flex-row items-center ${
                isActive
                  ? 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
                  : 'text-white/75 hover:text-white/90 hover:bg-white/10'
              } `
            }>
            <div className="w-4 mr-2">
              <FontAwesomeIcon
                icon={faMessage}
                className="mr-2 text-sm"
              />
            </div>
            <Text>Chat</Text>
          </NavLink>
          <NavLink
            to="/settings/general"
            className={({ isActive }) =>
              `py-2.5 px-4 rounded-md leading-none transition-all duration-75 flex flex-row items-center ${
                isActive
                  ? 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
                  : 'text-white/75 hover:text-white/90 hover:bg-white/10'
              } `
            }>
            <div className="w-4 mr-2">
              <FontAwesomeIcon
                icon={faCog}
                className="mr-2 text-sm"
              />
            </div>
            <Text>Settings</Text>
          </NavLink>
        </div>
        <div className="flex flex-col px-3 pt-4 pb-6 gap-1 border-t border-white/10">
          <button className="flex flex-row items-center space-x-2 px-4 py-2 rounded-md hover:bg-white/10">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="mr-2 text-sm"
            />
            <Text>John Doe</Text>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SidebarNavigation;
