import { plans } from '~/db/data/plans/plans';
import PlanCard from '~/components/Card/PlanCard/PlanCard';

export default function OrganizationBilling() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[900px] mx-auto">
      <div className="flex flex-col gap-8 w-full">
        {plans.map((plan) => (
          <PlanCard
            visiblePlans={['pro', 'enterprise']}
            key={plan.id}
            plan={plan}
            currentPlan="pro"
          />
        ))}
      </div>
      <div className=" border border-base rounded-lg p-9">
        Usage Information goes here?
      </div>
    </div>
  );
}
