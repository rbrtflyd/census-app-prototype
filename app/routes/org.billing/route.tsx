import { plans } from '~/db/data/plans/plans';
import { Text } from '@radix-ui/themes';
import { cn } from '~/lib/utils';
import { Badge, Button } from '~/components/ui';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from '@remix-run/react';

function PlanCard({ plan }: { plan: (typeof plans)[0] }) {
  const isEnterprise = plan.id === 'enterprise';
  const currentPlan = plan.id === 'free';
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'border border-base p-8 rounded-md w-[calc(50%-1rem)] grow',
        isEnterprise
          ? 'bg-subtle flex flex-row items-start gap-8'
          : 'bg-white flex flex-col shadow-lg gap-9'
      )}>
      <div className="flex flex-row gap-3 items-center">
        <Text className="text-xl leading-none font-medium">{plan.name}</Text>
        {currentPlan && <Badge>Current Plan</Badge>}
      </div>

      {!isEnterprise && (
        <>
          <div className="flex flex-col gap-2">
            {plan.features.map((feature) => (
              <div
                key={feature}
                className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-emerald-500"
                />
                <Text>{feature}</Text>
              </div>
            ))}
          </div>

          {currentPlan ? (
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
      {isEnterprise && (
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <Text>Audience Hub</Text>
            <Text>Census Embedded</Text>
            <Text>Enterprise Connectors</Text>
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
    </div>
  );
}

export default function OrganizationBilling() {
  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="w-1/3 border border-base rounded-lg p-9">
        Usage Information goes here?
      </div>
      <div className="flex flex-row flex-wrap gap-8 w-full">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
          />
        ))}
      </div>
    </div>
  );
}
