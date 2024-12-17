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
} from '~/components/ui/select';

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

const operatorsRequiringValue = [
  'equals',
  'not_equals',
  'contains',
  'not_contains',
  'starts_with',
  'ends_with',
  'greater_than',
  'less_than',
];

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
  };
};

export function EnrichConditionBuilder() {
  const { navigateToPage, selectedColumn } = useEnrichEnhance();
  const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>([
    {
      id: '1',
      conditions: [{ column: selectedColumn || '', operator: '', value: '' }],
      then: { column: '', value: '' },
    },
  ]);

  const addConditionGroup = () => {
    setConditionGroups((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        conditions: [{ column: '', operator: '', value: '' }],
        then: { column: '', value: '' },
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
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        {conditionGroups.map((group) => (
          <React.Fragment key={group.id}>
            <div className="flex flex-row gap-2 p-4 border border-base rounded-lg items-center">
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

            <div className="flex flex-col gap-2 p-4 border border-base rounded-lg">
              <Text className="font-medium">Then</Text>
              <div className="flex items-center gap-2">
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
                  onChange={(e) =>
                    updateThen(group.id, 'value', e.target.value)
                  }
                />
              </div>
            </div>
          </React.Fragment>
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
