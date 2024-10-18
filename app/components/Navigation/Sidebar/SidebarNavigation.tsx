import React from 'react';
import { Link } from '@remix-run/react';
import { NavLink } from '@remix-run/react';
import { Text } from '@radix-ui/themes';

interface SidebarNavigationProps {
  newSidebar?: boolean;
}

const navLinks = [
  {
    group: 'Home',
    links: [
      { to: '/get-started', label: 'Getting Started' },
      { to: '/', label: 'Home' },
    ],
  },
  {
    group: 'Activate',
    links: [{ to: '/syncs', label: 'Syncs' }],
  },
  {
    group: 'Audience Hub',
    links: [
      { to: '/explorer', label: 'Explorer' },
      { to: '/segments', label: 'Segments' },
    ],
  },
  {
    group: 'Define',
    links: [{ to: '/datasets', label: 'Datasets' }],
  },
  {
    group: 'Connections',
    links: [
      { to: '/sources', label: 'Sources' },
      { to: '/destinations', label: 'Destinations' },
    ],
  },
];

const SidebarNavigation: React.FC<SidebarNavigationProps> = (props) => {
  const newSidebar = props.newSidebar ?? false;

  return (
    <nav
      className={`flex flex-col h-full shrink-0 w-[220px] text-white space-y-4 ${
        !newSidebar
          ? 'bg-gradient-to-b from-[#1B1636] to-[#34162F]'
          : 'bg-slate-12'
      }`}>
      <div className="px-3 pt-8 pb-3 border-b border-white/10">
        <img
          src="census-logo-full.svg"
          alt="Census Logo"
          className="w-auto h-7"
        />
      </div>
      <div className="flex flex-col px-3 py-2 space-y-6">
        {navLinks.map((group) => (
          <div
            key={group.group}
            className="flex flex-col space-y-0.5">
            {group.group !== 'Home' && (
              <div className="px-2">
                <Text className="text-xxs leading-none mb-2 text-white/50 font-medium">
                  {group.group}
                </Text>
              </div>
            )}
            <div className="flex flex-col space-y-2">
              {group.links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-md leading-none transition-all duration-75 ${
                      isActive
                        ? 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
                        : 'text-white/75 hover:text-white/90 hover:bg-white/10'
                    }`
                  }>
                  <Text>{link.label}</Text>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SidebarNavigation;
