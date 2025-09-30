// Define sections for each slug
export const settingsSections: Record<
  string,
  { title: string; description: string; fields: string[] }[]
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
      title: 'Team Members',
      description: 'Manage your organization members',
      fields: ['Active Members', 'Pending Invitations', 'Member List'],
    },
  ],
  roles: [
    {
      title: 'Role Management',
      description: 'Configure roles and permissions',
      fields: ['Admin', 'Editor', 'Viewer', 'Custom Roles'],
    },
  ],
  billing: [
    {
      title: 'Billing Information',
      description: 'Manage your billing and subscription',
      fields: ['Current Plan', 'Payment Method', 'Billing History'],
    },
  ],
  integrations: [
    {
      title: 'Connected Integrations',
      description: 'Manage third-party integrations',
      fields: ['Active Integrations', 'Available Integrations'],
    },
  ],
};
