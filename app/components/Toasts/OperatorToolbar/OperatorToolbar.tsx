'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '@radix-ui/themes';
import { useOperator } from '~/contexts/OperatorContext';

interface VersionConfig {
  id: string;
  label: string;
  description: string;
}

const versions: VersionConfig[] = [
  {
    id: 'v1',
    label: 'Version 1',
    description: 'Sidebar Navigation',
  },
  {
    id: 'v2',
    label: 'Version 2',
    description: 'Top Navigation',
  },
];

interface LayoutConfig {
  id: string;
  label: string;
  description: string;
  availableIn: string[];
}

const layouts: LayoutConfig[] = [
  {
    id: 'connections-v1',
    label: 'Connections V1',
    description: 'Original connections layout',
    availableIn: ['v1', 'v2'],
  },
  {
    id: 'connections-v2',
    label: 'Connections V2',
    description: 'New unified connections layout',
    availableIn: ['v2', 'v1'],
  },
  {
    id: 'connections-v3',
    label: 'Connections V3',
    description: 'Table layout',
    availableIn: ['v2', 'v1'],
  },
];

export default function OperatorToolbar() {
  const [isVisible, setIsVisible] = useState(() => {
    // Only access sessionStorage in browser environment
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('operatorToolbarVisible');
      return stored === null ? true : stored === 'true';
    }
    return false; // Default value for server-side rendering
  });

  const navigate = useNavigate();
  const { version } = useParams();
  const { selectedLayout, setSelectedLayout } = useOperator();

  const handleVersionChange = (newVersion: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${version}`, `/${newVersion}`);
    navigate(newPath);
  };

  const handleLayoutChange = (layoutId: string) => {
    setSelectedLayout(layoutId);
  };

  const availableLayouts = layouts.filter((layout) =>
    layout.availableIn.includes(version || 'v1')
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('operatorToolbarVisible', isVisible.toString());
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key === ',') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-x-12 bottom-2 max-w-[800px] mx-auto flex flex-row gap-6 bg-slate-800 px-8 py-1 rounded-full shadow-lg text-white/60 leading-none justify-between text-xs">
      <div className="flex flex-row gap-6">
        <div className="flex flex-row gap-2 items-center">
          <Text className="text-sm font-medium shrink-0">App Layout</Text>
          <Select
            value={version || 'v1'}
            onValueChange={handleVersionChange}>
            <SelectTrigger className="bg-slate-900 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {versions.map((v) => (
                <SelectItem
                  key={v.id}
                  value={v.id}>
                  <Text className="text-sm ">{v.description}</Text>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <Text className="text-sm font-medium shrink-0">Page Layout</Text>
          <Select
            value={selectedLayout}
            onValueChange={handleLayoutChange}>
            <SelectTrigger className="bg-slate-900 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableLayouts.map((layout) => (
                <SelectItem
                  key={layout.id}
                  value={layout.id}>
                  <Text className="font-medium text-xs">{layout.label}</Text>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button
          onClick={() => setIsVisible(false)}
          variant="ghost"
          className="gap-4">
          <Text className="text-xs font-medium">Hide</Text>
          <div className="flex flex-row items-stretch gap-1 leading-none *:px-1 *:py-1 *:rounded *:bg-slate-700 font-mono text-slate-200 ">
            <span>⌘</span>
            <span>↑</span>
            <span>,</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
