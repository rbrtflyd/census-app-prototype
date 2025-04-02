import { plans } from '~/db/data/plans/plans';
import PlanCard from '~/components/Card/PlanCard/PlanCard';

export default function OrganizationBilling() {
  const visiblePlans = ['enterprise'];
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row flex-wrap gap-8 w-full">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlan="enterprise"
            visiblePlans={visiblePlans as ('enterprise' | 'pro' | 'free')[]}
          />
        ))}
      </div>
      <div className=" border border-base rounded-lg p-9">
        Usage Information goes here?
      </div>
    </div>
  );
}
