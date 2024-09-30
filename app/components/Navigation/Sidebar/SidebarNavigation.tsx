import React from 'react';
import { Link } from '@remix-run/react';
import { NavLink } from '@remix-run/react';

interface SidebarNavigationProps {
  // Define your props here
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = (props) => {
  return (
    <nav className="flex flex-col gap-4 h-full bg-slate-500 shrink-0">
      Sidebar nav
    </nav>
  );
};

export default SidebarNavigation;
