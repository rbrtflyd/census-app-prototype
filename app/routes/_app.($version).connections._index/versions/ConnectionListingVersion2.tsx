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

export default function ConnectionListingVersion2({
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
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col max-w-[1400px] mx-auto w-full gap-2">
          {combinedConnections.map((wc: any) => {
            return (
              <button
                key={wc.id}
                className="w-full bg-white shadow-sm rounded-md  border border-base transition-colors duration-75 *:leading-none group"
                onClick={() => {
                  navigate(`/${version}/connections/${wc.id}`);
                }}>
                <div className="flex flex-row items-center justify-between px-5 py-4">
                  <div className="flex flex-row items-center gap-4">
                    {wc.logo && (
                      <div className="size-8 flex items-center justify-center border border-base rounded-md bg-white">
                        <img
                          src={wc.logo}
                          alt={wc.connectionServiceName}
                          className="size-4"
                        />
                      </div>
                    )}
                    <div className="flex flex-row items-start gap-2">
                      <Text className="font-medium text-slate-500">
                        {wc.name || wc.connectionServiceName}
                      </Text>
                      <Text>{wc.id}</Text>
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
                                  wc.lastTestStatus === 'connected'
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
