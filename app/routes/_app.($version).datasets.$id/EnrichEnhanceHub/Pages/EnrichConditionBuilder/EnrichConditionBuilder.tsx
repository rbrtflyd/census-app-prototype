import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faTimes,
  faCaretDown,
  faPlus,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { useEnrichEnhance } from '../../../../../contexts/EnrichEnhanceContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '~/components/ui/select';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';

const enrichmentFields = [
  { value: 'company.name', label: 'Company Name' },
  { value: 'company.domain', label: 'Domain' },
  { value: 'company.industry', label: 'Industry' },
  { value: 'company.location', label: 'Location' },
  { value: 'person.name', label: 'Full Name' },
  { value: 'person.title', label: 'Job Title' },
  { value: 'person.email', label: 'Email' },
];

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
  { name: 'Apollo', logo: '/images/providers/apollo.svg' },
  { name: 'Clearbit', logo: '/clearbit.svg' },
  { name: 'ZoomInfo', logo: '/images/providers/zoominfo.svg' },
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

export function EnrichConditionBuilder() {
  const { navigateToPage, selectedColumn } = useEnrichEnhance();
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
    <div className="flex flex-col gap-8 px-4 py-6">
      <Text className="font-medium">Enrichment Sequence</Text>
      <div className="flex flex-col gap-4">
        {conditionGroups.map((group) => (
          <div
            key={group.id}
            className="flex flex-col gap-4 border border-base rounded-lg">
            <Text className="font-medium text-lg p-4">Selected Column</Text>
            <Text className="font-bold text-xxs text-light uppercase tracking-wider px-4">
              Logic
            </Text>
            <div className="flex flex-col gap-4 px-4">
              {group.conditions.map((condition, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-4 items-center">
                  {index === 0 ? (
                    <Text className="font-medium">If</Text>
                  ) : (
                    <Select
                      value={condition.logicalOperator}
                      onValueChange={(value) =>
                        updateCondition(
                          group.id,
                          index,
                          'logicalOperator',
                          value
                        )
                      }>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {logicalOperators.map((op) => (
                          <SelectItem
                            key={op}
                            value={op}>
                            {op}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Select
                    value={condition.column}
                    onValueChange={(value) =>
                      updateCondition(group.id, index, 'column', value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Column" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem
                          key={column}
                          value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue="equals"
                    value={condition.operator}
                    onValueChange={(value) =>
                      updateCondition(group.id, index, 'operator', value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((operator) => (
                        <SelectItem
                          key={operator}
                          value={operator}>
                          {operator}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {operatorsRequiringValue.includes(condition.operator) && (
                    <input
                      type="text"
                      placeholder="Enter value"
                      className="p-2 border border-base rounded"
                      value={condition.value}
                      onChange={(e) =>
                        updateCondition(
                          group.id,
                          index,
                          'value',
                          e.target.value
                        )
                      }
                    />
                  )}
                </div>
              ))}
              <Button
                onClick={() => addCondition(group.id)}
                variant="ghost"
                className="w-fit">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2"
                />
                <Text>Add Condition</Text>
              </Button>
            </div>

            <div className="flex flex-row gap-2 items-center justify-stretch px-4">
              <Text className="font-medium shrink-0">Then Enrich With</Text>

              <Select
                value={group.then.provider}
                onValueChange={(value) =>
                  updateThen(group.id, 'provider', value)
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Select Provider" />
                </SelectTrigger>
                <SelectContent>
                  {enrichmentProviders.map((provider) => (
                    <SelectItem
                      key={provider.name}
                      value={provider.name}>
                      <div className="flex flex-row gap-2 items-center">
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="w-4 h-4"
                        />
                        {provider.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-subtle border-t border-base">
              <Text className="font-bold text-xxs text-light uppercase tracking-wider">
                Map Field
              </Text>
              <div className="flex flex-row gap-2 items-center">
                <Select disabled={!group.then.provider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Field" />
                  </SelectTrigger>
                  <SelectContent>
                    {group.then.provider &&
                      getPrefixedEnrichmentFields(group.then.provider).map(
                        (field) => (
                          <SelectItem
                            key={field.value}
                            value={field.value}>
                            {field.value}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-base mx-3"
                />
                <Select
                  value={group.conditions[0].column}
                  onValueChange={(value) =>
                    updateCondition(group.id, 0, 'column', value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Column" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((column) => (
                      <SelectItem
                        key={column}
                        value={column}>
                        {column}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
        <Button
          onClick={addConditionGroup}
          variant="secondary"
          className="mt-4">
          <Text>Add Rule Group</Text>
        </Button>
      </div>
    </div>
  );
}
