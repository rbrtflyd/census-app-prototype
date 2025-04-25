import { Plan } from '~/db/types/plan';
import { Text } from '@radix-ui/themes';
import { cn } from '~/lib/utils';
import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from '@remix-run/react';
import { toast } from 'sonner';
interface PlanCardProps {
  plan: Plan;
  currentPlan: 'pro' | 'enterprise' | 'free';
  visiblePlans: ('pro' | 'enterprise' | 'free')[];
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
        ' p-8 rounded-md grow flex',
        isEnterprise && !currentlyEnterprise
          ? 'bg-gradient-to-br from-[#0A0254] from-20% to-plum-500 text-white  flex-row items-center justify-between gap-16'
          : 'bg-white flex-col gap-9 border border-base',
        visiblePlans.length > 2 ? 'w-[calc(50%-1rem)]' : 'w-full'
      )}>
      <div className="flex flex-row gap-3 justify-between shrink-0 items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center leading-none">
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
                className="flex flex-row gap-2 border-b border-base py-3 px-2 items-baseline last:border-b-0">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-plum-500 text-sm relative top-0.5"
                />

                <Text>{feature}</Text>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
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
            {!isFree && currentPlan === plan.id && (
              <div className="flex flex-row gap-4 p-4 border border-base rounded-md justify-between">
                <div className="flex flex-col gap-2">
                  <Text className="text-lg">Plan Renews: May 7, 2024</Text>
                  <Text className="text-lg">Amount: $XXXX</Text>
                  <Text className="text-lg">Card: **** **** **** ****</Text>
                  <Button variant="ghost">Edit Payment Information</Button>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="place-self-start">
                      Cancel Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Professional Plan</DialogTitle>
                    </DialogHeader>
                    <div className="h-full p-4">
                      A summary of what a user willl lose access to:
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button>Nevermind</Button>
                      </DialogClose>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          navigate('/org/billing');
                          toast.success('Plan cancelled');
                        }}>
                        Continue with Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
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
