import { useParams } from '@remix-run/react';
import PageHeader from '~/components/Structural/Headers/PageHeader';
import { Text } from '@radix-ui/themes';
import { settingsSections } from '~/db/data/settings/settingsSections';

export default function SettingsOrganizationSlug() {
  const { slug } = useParams();

  const sections = slug ? settingsSections[slug] : [];
  const displayTitle = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : 'Settings';

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={displayTitle} />
      <div className="flex flex-col gap-4 px-6">
        {sections.length > 0 ? (
          <div className="flex flex-col gap-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white border border-base rounded-lg p-6">
                <div className="flex flex-col gap-3">
                  <div>
                    <Text className="text-base font-medium">
                      {section.title}
                    </Text>
                    <Text className="text-sm text-slate-600">
                      {section.description}
                    </Text>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    {section.fields.map((field, fieldIndex) => (
                      <div
                        key={fieldIndex}
                        className="text-sm text-slate-700">
                        • {field}
                      </div>
                    ))}
                  </div>
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
