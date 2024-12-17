import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSparkles,
  faTimes,
  faCaretDown,
} from '@fortawesome/pro-solid-svg-icons';
import { Button } from '~/components/ui/button';
import { Text } from '@radix-ui/themes';
import { useEnrichEnhance } from '../../context/EnrichEnhanceContext';
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
  'facebook_url',
  'instagram_url',
  'youtube_url',
  'website_url',
];

const operators = [
  'equals',
  'does not equal',
  'contains',
  'is empty',
  'is not empty',
];

const operatorsRequiringValue = ['equals', 'does not equal', 'contains'];

type ConditionGroup = {
  id: string;
  conditions: {
    column: string;
    operator: string;
    value: string;
  }[];
  then: {
    column: string;
    value: string;
    enrichmentField: string;
  };
};

export function EnrichConditionBuilder() {
  const { navigateToPage, selectedColumn } = useEnrichEnhance();
  const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>([
    {
      id: '1',
      conditions: [{ column: selectedColumn || '', operator: '', value: '' }],
      then: { column: '', value: '', enrichmentField: '' },
    },
  ]);

  const addConditionGroup = () => {
    setConditionGroups((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        conditions: [{ column: '', operator: '', value: '' }],
        then: { column: '', value: '', enrichmentField: '' },
      },
    ]);
  };

  const updateCondition = (
    groupId: string,
    conditionIndex: number,
    field: keyof (typeof conditionGroups)[0]['conditions'][0],
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
    field: keyof (typeof conditionGroups)[0]['then'],
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
    <div className="flex flex-col gap-8 p-6">
      <Text className="font-medium">Enrichment Sequence</Text>
      <div className="flex flex-col gap-4">
        {conditionGroups.map((group) => (
          <div
            key={group.id}
            className="flex flex-col gap-4 p-4 border border-base rounded-lg">
            <div className="flex flex-row gap-4 items-center">
              <Text className="font-medium">If</Text>
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
              <Select
                value={group.conditions[0].operator}
                onValueChange={(value) =>
                  updateCondition(group.id, 0, 'operator', value)
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
              {operatorsRequiringValue.includes(
                group.conditions[0].operator
              ) && (
                <input
                  type="text"
                  placeholder="Enter value"
                  className="p-2 border border-base rounded"
                  value={group.conditions[0].value}
                  onChange={(e) =>
                    updateCondition(group.id, 0, 'value', e.target.value)
                  }
                />
              )}
            </div>

            <div className="flex flex-row gap-2 items-center justify-stretch">
              <Text className="font-medium">Then</Text>

              <Select
                value={group.then.column}
                onValueChange={(value) =>
                  updateThen(group.id, 'column', value)
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
              <input
                type="text"
                placeholder="New value"
                className="p-2 border border-base rounded"
                value={group.then.value}
                onChange={(e) => updateThen(group.id, 'value', e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-2 items-center mt-4">
              <Text className="font-medium shrink-0">Map Field</Text>
              <Select
                value={group.then.enrichmentField || ''}
                onValueChange={(value) =>
                  updateThen(group.id, 'enrichmentField', value)
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Select Provider Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Company</SelectLabel>
                    <SelectItem value="company.name">Company Name</SelectItem>
                    <SelectItem value="company.domain">Domain</SelectItem>
                    <SelectItem value="company.industry">Industry</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Person</SelectLabel>
                    <SelectItem value="person.name">Full Name</SelectItem>
                    <SelectItem value="person.title">Job Title</SelectItem>
                    <SelectItem value="person.email">Email</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-base"
              />
              <Select
                value={group.then.enrichmentField || ''}
                onValueChange={(value) =>
                  updateThen(group.id, 'enrichmentField', value)
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Select Provider Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Company</SelectLabel>
                    <SelectItem value="company.name">Company Name</SelectItem>
                    <SelectItem value="company.domain">Domain</SelectItem>
                    <SelectItem value="company.industry">Industry</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Person</SelectLabel>
                    <SelectItem value="person.name">Full Name</SelectItem>
                    <SelectItem value="person.title">Job Title</SelectItem>
                    <SelectItem value="person.email">Email</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
