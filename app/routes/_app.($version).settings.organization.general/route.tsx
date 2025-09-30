import PageHeader from '~/components/Structural/Headers/PageHeader';
import { organizationSettingsSections } from '~/db/data/settings/organizationSettingsSections';
import { Text } from '@radix-ui/themes';
import { Switch } from '~/components/ui/switch';
import { useSettings } from '~/contexts/SettingsContext';

export default function SettingsOrganizationGeneral() {
  const sections = organizationSettingsSections.general;
  const { workspacesEnabled, setWorkspacesEnabled } = useSettings();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="General" />
      <div className="flex flex-col gap-4 px-6">
        {/* Workspaces Toggle */}
        <div className="bg-white border border-base rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Text className="text-base font-medium">Enable Workspaces</Text>
              <Text className="text-sm text-slate-600">
                Control whether workspace-level settings are available. When
                disabled, workspace settings will be consolidated into
                organization settings.
              </Text>
            </div>
            <Switch
              checked={workspacesEnabled}
              onCheckedChange={setWorkspacesEnabled}
            />
          </div>
        </div>

        {/* Other sections */}
        {sections.map((section, index) => (
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
    </div>
  );
}
