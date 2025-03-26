export type Plan = {
  id: string;
  name: string;
  additionalDestinations: number;
  maxAdditionalDestinations: number;
  additionalDestinationsPrice: number;
  price: number | 'Custom';
  billingPeriod: BillingPeriod;
  features: string[];
};

export type BillingPeriod = 'monthly' | 'yearly';

export type AddOns =
  | 'Audience Hub'
  | 'Census Embedded'
  | 'Real-time Live Syncs';
