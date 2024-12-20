import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faSparkles,
  faTimes,
  faCaretDown,
  faPlus,
  faBuilding,
  faUser,
  faMapMarker,
  faGlobe,
  faBriefcase,
  faUsers,
  faEnvelope,
  faPhone,
  faEyeSlash,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '~/components/ui/select';
import {
  faArrowRight,
  faBan,
  faChevronCircleRight,
  faChevronRight,
  faDiagramSankey,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { Label, Separator } from '~/components/ui';

const enrichmentObjects = [
  { value: 'company', label: 'Company', icon: faBuilding, bg: 'bg-purple-600' },
  { value: 'person', label: 'Person', icon: faUser, bg: 'bg-pink-600' },
];

const enrichmentFields = [
  { value: 'company.name', label: 'Company Name' },
  { value: 'company.domain', label: 'Domain' },
  { value: 'company.industry', label: 'Industry' },
  { value: 'company.location', label: 'Location' },
  { value: 'person.name', label: 'Full Name' },
  { value: 'person.title', label: 'Job Title' },
  { value: 'person.email', label: 'Email' },
];

const objectColumnMapping = {
  company: [
    { name: 'company_name', icon: faBuilding as IconProp },
    { name: 'location', icon: faMapMarker as IconProp },
    { name: 'website_url', icon: faGlobe as IconProp },
    { name: 'linkedin_url', icon: faLinkedin as IconProp },
    { name: 'twitter_url', icon: faTwitter as IconProp },
    { name: 'facebook_url', icon: faFacebook as IconProp },
    { name: 'instagram_url', icon: faInstagram as IconProp },
    { name: 'youtube_url', icon: faYoutube as IconProp },
  ],
  person: [
    { name: 'job_title', icon: faBriefcase as IconProp },
    { name: 'department', icon: faUsers as IconProp },
    { name: 'email_address', icon: faEnvelope as IconProp },
    { name: 'phone_number', icon: faPhone as IconProp },
    { name: 'linkedin_url', icon: faLinkedin as IconProp },
    { name: 'twitter_url', icon: faTwitter as IconProp },
  ],
};

const columns = [
  'job_title',
  'company_name',
  'location',
  'department',
  'email_address',
  'phone_number',
  'linkedin_url',
  'twitter_url',
  'facebook_url',
  'instagram_url',
  'youtube_url',
  'website_url',
];

const enrichmentProviders = [
  { name: 'Apollo', logo: '/apollo.svg' },
  { name: 'Clearbit', logo: '/clearbit.svg' },
  { name: 'ZoomInfo', logo: '' },
];

const operators = [
  'equals',
  'does not equal',
  'contains',
  'is blank or null',
  'is not blank or null',
];

const operatorsRequiringValue = ['equals', 'does not equal', 'contains'];

const logicalOperators = ['AND', 'OR'];

type Condition = {
  column: string;
  operator: string;
  value: string;
  logicalOperator?: string;
};

type ConditionGroup = {
  id: string;
  conditions: Condition[];
  then: {
    column: string;
    value: string;
    provider: string;
    enrichmentField: string;
  };
};

const getPrefixedEnrichmentFields = (provider: string) => {
  const prefix =
    provider === 'Clearbit'
      ? 'cb'
      : provider === 'ZoomInfo'
      ? 'zi'
      : provider === 'Apollo'
      ? 'ap'
      : '';

  return enrichmentFields.map((field) => ({
    ...field,
    value: `${prefix}.${field.value}`,
  }));
};

export function EnrichDialogV2() {
  const selectedColumn = 'job_title';
  const [selectedObject, setSelectedObject] = useState<string>('');
  const [conditionalColumns, setConditionalColumns] = useState<string[]>([]);
  const [viewingSequenceForColumn, setViewingSequenceForColumn] = useState<
    string | null
  >(null);

  const handleColumnImportChange = (column: string, value: string) => {
    if (value === 'conditional') {
      setConditionalColumns((prev) => [...prev, column]);
    } else {
      setConditionalColumns((prev) => prev.filter((c) => c !== column));
    }
  };

  const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>([
    {
      id: '1',
      conditions: [
        {
          column: selectedColumn || '',
          operator: '',
          value: '',
          logicalOperator: 'AND',
        },
      ],
      then: {
        column: '',
        value: '',
        enrichmentField: '',
        provider: '',
      },
    },
  ]);

  const addConditionGroup = () => {
    setConditionGroups((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        conditions: [
          { column: '', operator: '', value: '', logicalOperator: 'AND' },
        ],
        then: {
          column: '',
          value: '',
          enrichmentField: '',
          provider: '',
        },
      },
    ]);
  };

  const addCondition = (groupId: string) => {
    setConditionGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: [
                ...group.conditions,
                { column: '', operator: '', value: '', logicalOperator: 'AND' },
              ],
            }
          : group
      )
    );
  };

  const updateCondition = (
    groupId: string,
    conditionIndex: number,
    field: keyof Condition,
    value: string
  ) => {
    setConditionGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              conditions: group.conditions.map((condition, idx) =>
                idx === conditionIndex
                  ? { ...condition, [field]: value }
                  : condition
              ),
            }
          : group
      )
    );
  };

  const updateThen = (
    groupId: string,
    field: keyof ConditionGroup['then'],
    value: string
  ) => {
    setConditionGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              then: { ...group.then, [field]: value },
            }
          : group
      )
    );
  };

  return (
    <div className="flex flex-row overflow-y-auto grow">
      <div className="flex flex-row gap-8 w-3/5 h-full">
        <div className="flex flex-col gap-8 w-1/2 h-full p-6">
          <div className="flex flex-col gap-2">
            <Label>Choose Enrichment Object</Label>
            <Select
              onValueChange={setSelectedObject}
              value={selectedObject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Enrichment Object" />
              </SelectTrigger>
              <SelectContent>
                {enrichmentObjects.map((object) => (
                  <SelectItem
                    key={object.value}
                    value={object.value}>
                    <div className={`flex flex-row gap-2 items-center`}>
                      <div
                        className={`size-[22px] rounded-lg leading-none flex items-center justify-center ${object.bg}`}>
                        <FontAwesomeIcon
                          icon={object.icon}
                          className="text-white text-sm"
                        />
                      </div>

                      {object.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedObject && (
            <div className="flex flex-col gap-2 h-full">
              <Text className="font-medium">
                {selectedObject === 'company'
                  ? 'Company Attributes to Import'
                  : 'Person Attributes to Import'}
              </Text>
              <div className="flex flex-col gap-2">
                {objectColumnMapping[
                  selectedObject as keyof typeof objectColumnMapping
                ].map((column) => (
                  <div className="flex flex-row gap-5 justify-stretch items-stretch leading-none">
                    <div
                      key={column.name}
                      className="px-3 py-2 border border-base rounded-md flex items-center w-full justify-between">
                      <div className="flex flex-row gap-1 items-center">
                        <FontAwesomeIcon
                          icon={column.icon}
                          className="icon-light mr-3"
                        />
                        <Text>{column.name}</Text>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Button
                          variant="ghost"
                          size="icon">
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="icon-light"
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="icon-light"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-2/5 sticky top-0 border-l border-base bg-subtle p-6 justify-between items-start">
        <Text className="font-medium text-lg">Preview</Text>
        <div className="grow w-full h-full border border-base rounded-md bg-white items-center justify-center flex">
          <Text>Preview Will be here</Text>
        </div>
      </div>
    </div>
  );
}
