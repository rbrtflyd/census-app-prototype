import React from 'react';
import { Link } from '@remix-run/react';
import { NavLink } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import CircularProgressIndicator from '~/components/Progress/CircularProgressIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/pro-solid-svg-icons';
import { faAnglesUpDown, faSearch } from '@fortawesome/pro-regular-svg-icons';
import {
  CensusSyncs,
  CensusDestinations,
  CensusSources,
  CensusModels,
  CensusSegments,
  CensusEntities,
  CensusNotifications,
} from '~/assets/census-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface HeaderNavigationProps {
  newSidebar?: boolean;
}

const navLinks = [
  {
    id: 1,
    links: [{ to: '/v2/home', label: 'Home', icon: faHome }],
  },
  {
    id: 2,
    links: [{ to: '/v2/syncs', label: 'Syncs', icon: CensusSyncs }],
  },
  {
    id: 3,
    parent: 'Audience Hub',
    links: [
      { to: '/v2/explorer', label: 'Explorer', icon: CensusSegments },
      { to: '/v2/segments', label: 'Segments', icon: CensusSegments },
    ],
  },
  {
    id: 4,
    links: [{ to: '/v2/datasets', label: 'Datasets', icon: CensusModels }],
  },
  {
    id: 5,
    parent: 'Connections',
    links: [
      { to: '/v2/sources', label: 'Sources', icon: CensusSources },
      {
        to: '/v2/destinations',
        label: 'Destinations',
        icon: CensusDestinations,
      },
    ],
  },
];

const HeaderNavigation: React.FC<HeaderNavigationProps> = (props) => {
  const newSidebar = props.newSidebar ?? false;

  return (
    <nav
      className={`flex flex-row h-[60px] shrink-0 w-full text-light space-x-5 border-b border-base bg-subtle `}>
      <div className="h-full flex flex-row items-center px-3 space-x-4">
        <img
          src="/logos/census/census-logo-mark.svg"
          alt="Census Logo"
          className="w-auto h-7"
        />
        <Text className="opacity-20 leading-none">/</Text>
        <div className="flex flex-row items-center space-x-2 h-full py-3">
          <div className="bg-violet-300 size-6 rounded-full font-bold flex items-center justify-center leading-none text-xs text-violet-800">
            <Text>S</Text>
          </div>
          <Text className="leading-none">Sales Team</Text>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-row items-center space-x-1 px-2 py-1 rounded-md hover:bg-slate-100 transition-all duration-75 h-full bg-white/10 leading-none group">
                <FontAwesomeIcon
                  icon={faAnglesUpDown}
                  className="text-xs group-hover:text-light transition-all duration-75"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Workspace Settings</DropdownMenuItem>
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuItem>Sales Team</DropdownMenuItem>
              <DropdownMenuItem>Product Team</DropdownMenuItem>
              <DropdownMenuItem>Sales Development</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-row px-3 space-x-6">
        <div className="flex flex-row *:leading-none items-center">
          {navLinks.map((group) => (
            <React.Fragment key={group.id}>
              {group.parent ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex flex-row items-center space-x-1 px-2 py-1 rounded-md hover:bg-slate-100 transition-all duration-75 h-full my-3 leading-none group">
                      <Text>{group.parent}</Text>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {group.links.map((link) => (
                      <DropdownMenuItem
                        key={link.to}
                        asChild>
                        <Link
                          to={link.to}
                          className="flex items-center gap-2">
                          <Text>{link.label}</Text>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                group.links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `py-2.5 px-4 rounded-md leading-none transition-all duration-75 flex flex-row items-center ${
                        isActive ? 'text-light' : 'text-dark'
                      }`
                    }>
                    <Text>{link.label}</Text>
                  </NavLink>
                ))
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavigation;
