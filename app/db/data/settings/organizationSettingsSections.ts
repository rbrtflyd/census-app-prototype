// Define sections for each slug

interface SettingsSection {
  title: string;
  description?: string;
  fields?: string[];
  workspacesEnabled?: boolean;
}

export const organizationSettingsSections: Record<
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
    },
    {
      title: 'Fivetran',
    },
    {
      title: 'GitLink',
      workspacesEnabled: false,
    },
    {
      title: 'Datadog Monitoring',
      workspacesEnabled: false,
    },
    {
      title: 'Dataset API',
      workspacesEnabled: false,
    },
    {
      title: 'API Access',
      workspacesEnabled: false,
    },
    {
      title: 'Webhooks',
      workspacesEnabled: false,
    },
    {
      title: 'Variables',
      workspacesEnabled: false,
    },
    {
      title: 'Storage Provider and Iceberg Catalog',
      workspacesEnabled: false,
    },
  ],
  branded: [
    {
      title: 'Custom Themes',
    },
    {
      title: 'Custom Branding',
    },
    {
      title: 'Connect Link Settings',
    },
  ],
};
