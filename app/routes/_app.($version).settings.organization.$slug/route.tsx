import { useParams } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Text } from '@radix-ui/themes';
import { settingsSections } from '~/db/data/settings/settingsSections';
import { useSettings } from '~/contexts/SettingsContext';

export default function SettingsOrganizationSlug() {
  const { slug } = useParams();
  const { workspacesEnabled } = useSettings();

  const sections = slug ? settingsSections[slug] : [];
  const displayTitle = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : 'Settings';

  // Filter sections based on workspacesEnabled if needed
  const filteredSections = sections.filter((section) => {
    // If workspacesEnabled is explicitly set on the section, use it to filter
    if (section.workspacesEnabled !== undefined) {
      return section.workspacesEnabled === workspacesEnabled;
    }
    // Otherwise, show the section regardless of workspace state
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={displayTitle} />

      {/* Show workspaces mode indicator */}
      <div className="px-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Text className="text-sm text-blue-800">
            Workspaces mode: {workspacesEnabled ? 'Enabled' : 'Disabled'}
            {!workspacesEnabled &&
              slug === 'integrations' &&
              ' (Showing workspace-level integrations here)'}
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6">
        {filteredSections.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredSections.map((section, index) => (
              <div
                key={index}
                className="bg-white border border-base rounded-lg p-6">
                <div className="flex flex-col gap-3">
                  <Text className="text-base font-medium">{section.title}</Text>
                  {section.description && (
                    <Text className="text-sm text-slate-600">
                      {section.description}
                    </Text>
                  )}
                  {section.fields && (
                    <div className="flex flex-col gap-2 pt-2">
                      {section.fields.map((field, fieldIndex) => (
                        <div
                          key={fieldIndex}
                          className="text-sm text-slate-700">
                          • {field}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-base rounded-lg p-6">
            <Text className="text-slate-600">
              No configuration defined for {slug} (prototype placeholder)
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
