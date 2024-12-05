import React from 'react';
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
    availableIn: ['v1'],
  },
  {
    id: 'connections-v2',
    label: 'Connections V2',
    description: 'New unified connections layout',
    availableIn: ['v2'],
  },
];

export default function OperatorToolbar() {
  const navigate = useNavigate();
  const { version } = useParams();
  const [selectedLayout, setSelectedLayout] = React.useState('default');

  const handleVersionChange = (newVersion: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${version}`, `/${newVersion}`);
    navigate(newPath);
  };

  const handleLayoutChange = (layoutId: string) => {
    setSelectedLayout(layoutId);
    // Here you could emit an event or update a context to change the layout
  };

  const availableLayouts = layouts.filter((layout) =>
    layout.availableIn.includes(version || 'v1')
  );

  return (
    <div className="absolute inset-x-0 bottom-2 max-w-[1440px] mx-auto flex flex-row gap-6 bg-slate-800 px-8 py-2 rounded-full shadow-lg text-white leading-none">
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
  );
}
