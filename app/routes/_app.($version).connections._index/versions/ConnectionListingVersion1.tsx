import { useNavigate, useOutletContext } from '@remix-run/react';
import { Text } from '@radix-ui/themes';
import PageHeader from '../../../components/Structural/Headers/PageHeader';
import { Badge } from '~/components/ui/badge';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from '~/components/ui/tooltip';
import { ConnectionServiceType, ConnectionType } from '~/db/types';

export default function ConnectionListingVersion1({
  version,
  combinedConnections,
}: {
  version: string;
  combinedConnections: any;
}) {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="Connections"
        button={{
          label: 'New Connection',
          icon: faPlus,
          onClick: () => navigate(`/${version}/connections/new/step1`),
        }}
      />
      <div className="px-8 py-5 border-b border-base text-sm leading-none">
        {combinedConnections.length} connections
      </div>
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col max-w-[1400px] mx-auto w-full">
          {combinedConnections.map((wc: any) => {
            return (
              <button
                key={wc.id}
                className="w-full rounded-md hover:bg-slate-25 transition-colors duration-75 *:leading-none group"
                onClick={() => {
                  navigate(`/${version}/connections/${wc.id}`);
                }}>
                <div className="flex flex-row items-center justify-between px-6 py-4">
                  <div className="flex flex-row items-center gap-4">
                    {wc.logo && (
                      <div className="h-7 px-1.5 flex items-center justify-center border border-base rounded bg-white gap-2 shadow">
                        <img
                          src={wc.logo}
                          alt={wc.connectionServiceName}
                          className="size-4"
                        />
                        <Text className="text-xxs text-light">
                          {wc.connectionServiceName}
                        </Text>
                      </div>
                    )}
                    <div className="flex flex-row items-center gap-2">
                      <Text className="font-medium text-slate-500">
                        {wc.name}
                      </Text>
                      <Text className="px-1.5 py-1 bg-subtle font-mono rounded-sm leading-none text-xxs text-lighter ">
                        connection:{wc.id}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <Text className="text-sm text-slate-500">
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger>
                            <Badge>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  wc.lastTestStatus === 'healthy'
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                } mr-1`}
                              />
                              <Text className="capitalize">
                                {wc.lastTestStatus}
                              </Text>
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <Text className="capitalize">
                              Last tested on{' '}
                              {new Date(wc.createdAt).toLocaleDateString()}
                            </Text>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Text>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-50 group-hover:opacity-0" />
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
}
