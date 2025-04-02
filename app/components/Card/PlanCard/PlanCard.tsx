import { Plan } from '~/db/types/plan';
import { Text } from '@radix-ui/themes';
import { cn } from '~/lib/utils';
import { Badge, Button } from '~/components/ui';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from '@remix-run/react';

interface PlanCardProps {
  plan: Plan;
  currentPlan?: 'pro' | 'enterprise' | 'free';
  visiblePlans?: ('pro' | 'enterprise' | 'free')[];
}

export default function PlanCard({
  plan,
  currentPlan,
  visiblePlans,
}: PlanCardProps) {
  const isEnterprise = plan.id === 'enterprise';
  const isFree = plan.id === 'free';
  const currentlyEnterprise = currentPlan === 'enterprise';
  const navigate = useNavigate();

  const isVisible = visiblePlans?.includes(
    plan.id as 'pro' | 'enterprise' | 'free'
  );

  if (!isVisible) {
    return null;
  }

  const enterpriseFeatures = [
    'Unlimited Destinations',
    'Audience Hub',
    'Enterprise Connectors',
    'SSO',
  ];
  return (
    <div
      className={cn(
        ' p-8 rounded-md  grow flex',
        isEnterprise && !currentlyEnterprise
          ? 'bg-gradient-to-br from-[#0A0254] from-20% to-plum-500 text-white  flex-row items-center justify-between gap-16'
          : 'bg-white flex-col gap-9 border border-base',
        visiblePlans?.length ?? 0 > 2 ? 'w-[calc(50%-1rem)]' : 'w-full'
      )}>
      <div className="flex flex-row gap-3 justify-between shrink-0 items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center leading-none">
            <Text className="text-xl font-medium">{plan.name}</Text>
            {currentPlan === plan.id && (
              <Badge className="bg-plum-100 border-plum-200 text-plum-500">
                Current Plan
              </Badge>
            )}
          </div>
          <Text className="text-lg opacity-75">{plan.tagline}</Text>
        </div>
      </div>

      {!isEnterprise && (
        <>
          <div className="flex flex-col">
            {plan.features.map((feature) => (
              <div
                key={feature}
                className="flex flex-row gap-2 border-b border-base leading-tight p-4 items-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-plum-500 text-xs"
                />

                <Text>{feature}</Text>
              </div>
            ))}
          </div>

          {isFree || currentPlan === plan.id ? (
            ''
          ) : (
            <Button
              size="large"
              onClick={() => {
                navigate('/upgrade');
              }}>
              Upgrade to Pro
            </Button>
          )}
        </>
      )}
      {isEnterprise && !currentlyEnterprise && (
        <div className="flex flex-row items-center">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 shrink-0">
            {enterpriseFeatures.map((feature) => (
              <div
                key={feature}
                className="flex gap-3 items-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-xs"
                />
                <Text>{feature}</Text>
              </div>
            ))}
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              navigate('/upgrade');
            }}>
            Talk to sales
          </Button>
        </div>
      )}
      {isEnterprise && currentlyEnterprise && (
        <div className="flex flex-row items-center bg-subtle p-8">
          Usage Information goes here?
        </div>
      )}
    </div>
  );
}
