// Define sections for each slug

interface SettingsSection {
  title: string;
  description?: string;
  fields?: string[];
  workspacesEnabled?: boolean;
}

export const settingsSections: Record<
  string,
  {
    title: string;
    description?: string;
    fields?: string[];
    workspacesEnabled?: boolean;
  }[]
> = {
  general: [
    {
      title: 'Organization Details',
      description: 'Basic information about your organization',
      fields: ['Organization Name', 'Organization ID', 'Created Date'],
    },
    {
      title: 'General Settings',
      description: 'Configure general organization preferences',
      fields: ['Time Zone', 'Date Format', 'Language'],
    },
  ],
  members: [
    {
      title: 'Members',
      description: 'Existing Member List',
    },
  ],
  roles: [
    {
      title: 'Roles',
      description: 'Existing Role List',
    },
  ],
  billing: [
    {
      title: 'Overview',
      description: 'Overview card with current plan',
    },
    {
      title: 'Upgrade to enterprise banner',
      description: "Maybe we don't need this?",
    },
    {
      title: 'Usage Report',
      description: 'Embedded from Omni',
    },
  ],
  integrations: [
    {
      title: 'dbtCloud',
      workspacesEnabled: true, // Only show when workspaces enabled
    },
    {
      title: 'Fivetran',
      workspacesEnabled: true, // Only show when workspaces enabled
    },
    {
      title: 'Organization-level Integration 1',
      description: 'This always shows',
    },
    {
      title: 'Workspace Integration (fallback)',
      description: 'This shows when workspaces are disabled',
      workspacesEnabled: false, // Only show when workspaces disabled
    },
  ],
};
