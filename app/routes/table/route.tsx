import { json } from '@remix-run/node';
import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { Switch } from '~/components/ui/switch';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import SidebarNavigation from '~/components/Navigation/Sidebar/SidebarNavigation';

const datasetSchema = {
  columns: {
    user_id: { type: 'string', nullCount: 0, source: 'salesforce' },
    email: { type: 'string', nullCount: 50, source: 'salesforce' },
    company_name: { type: 'string', nullCount: 100, source: 'salesforce' },
    sign_up_date: { type: 'date', nullCount: 0, source: 'salesforce' },
    last_login_date: { type: 'date', nullCount: 200, source: 'salesforce' },
    total_logins: { type: 'integer', nullCount: 0, source: 'salesforce' },
    average_session_duration: {
      type: 'float',
      nullCount: 150,
      source: 'salesforce',
    },
    features_used: { type: 'array', nullCount: 300, source: 'salesforce' },
    subscription_tier: { type: 'string', nullCount: 0, source: 'salesforce' },
    monthly_recurring_revenue: {
      type: 'float',
      nullCount: 0,
      source: 'salesforce',
    },
    lifetime_value: { type: 'float', nullCount: 100, source: 'salesforce' },
    churn_probability: { type: 'float', nullCount: 250, source: 'salesforce' },
  },
  clearbit: {
    industry: { type: 'string', nullCount: 400, source: 'clearbit' },
    employee_count: { type: 'integer', nullCount: 350, source: 'clearbit' },
    funding_total: { type: 'float', nullCount: 600, source: 'clearbit' },
    tech_stack: { type: 'array', nullCount: 450, source: 'clearbit' },
  },
  'Growth Potential': {
    growth_potential: { type: 'string', nullCount: 200, source: 'gpt' },
    product_fit_score: { type: 'float', nullCount: 300, source: 'gpt' },
    next_best_action: { type: 'string', nullCount: 250, source: 'gpt' },
  },
  'Customer Health': {
    product_fit_score: { type: 'float', nullCount: 300, source: 'gpt' },
    next_best_action: { type: 'string', nullCount: 250, source: 'gpt' },
  },
  'Computed Metrics': {
    engagement_score: { type: 'float', nullCount: 100, source: 'computed' },
    revenue_growth_rate: { type: 'float', nullCount: 150, source: 'computed' },
    customer_health_index: {
      type: 'float',
      nullCount: 200,
      source: 'computed',
    },
  },
};

export const loader = async () => {
  // You can fetch data or perform any server-side operations here
  return json({
    message: 'Hello from the table route!',
  });
};

export default function TableRoute() {
  const data = useLoaderData<typeof loader>();
  const [showAlphabetical, setShowAlphabetical] = useState(false);

  const allFields = Object.entries(datasetSchema).reduce(
    (acc, [category, fields]) => {
      Object.entries(fields).forEach(([fieldName, fieldInfo]) => {
        acc[fieldName] = { ...fieldInfo, category };
      });
      return acc;
    },
    {} as Record<
      string,
      { type: string; nullCount: number; category: string; source: string }
    >
  );

  const sortedFields = Object.entries(allFields).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden">
      <SidebarNavigation />
      <div className="flex flex-col w-full">
        <div className="flex flex-row px-6 py-3 border-b border-base">
          <Text className="text-lg font-medium">Datasets</Text>
        </div>
        <div className="flex flex-row w-full">
          <Tabs
            defaultValue="columns"
            className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="columns">Columns</TabsTrigger>
              <TabsTrigger value="syncs">Syncs</TabsTrigger>
              <TabsTrigger value="segments">Segments</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-row justify-between px-6 py-3 border-b border-base">
          <Text className="text font-medium">Columns</Text>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-2 text-light">
              <Text>Grouped</Text>
              <Switch
                checked={showAlphabetical}
                onCheckedChange={(checked) => setShowAlphabetical(checked)}
              />
              <Text>Alphabetical</Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-full overflow-y-auto">
          <div className="flex flex-col max-w-[1200px] w-full mx-auto space-y-4 px-6 pt-3 h-full">
            {showAlphabetical ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Column Name</TableHead>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Nulls</TableHead>
                    <TableHead>PII</TableHead>
                    <TableHead>Enumerated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedFields.map(([fieldName, fieldInfo]) => (
                    <TableRow key={fieldName}>
                      <TableCell className="font-medium">{fieldName}</TableCell>
                      <TableCell>{fieldInfo.type}</TableCell>
                      <TableCell>{fieldInfo.nullCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              Object.entries(datasetSchema).map(([category, fields]) => (
                <Collapsible
                  key={category}
                  className="flex flex-col space-y-2">
                  <CollapsibleTrigger className="px-2 py-3  w-full space-x-4 flex flex-row justify-between text-sm items-center">
                    <div className="flex flex-row space-x-2 shrink-0">
                      <Text className="capitalize font-medium">{category}</Text>
                      <Text className="text-lighter">
                        {Object.keys(fields).length}
                      </Text>
                    </div>
                    <div className="h-px border-base border-b w-full" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">
                            Column Name
                          </TableHead>
                          <TableHead>Data Type</TableHead>
                          <TableHead>Nulls</TableHead>
                          <TableHead>Source</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(fields).map(
                          ([fieldName, fieldInfo]) => (
                            <TableRow key={fieldName}>
                              <TableCell className="font-medium">
                                {fieldName}
                              </TableCell>
                              <TableCell>{fieldInfo.type}</TableCell>
                              <TableCell>{fieldInfo.nullCount}</TableCell>
                              <TableCell>{fieldInfo.source}</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </CollapsibleContent>
                </Collapsible>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
