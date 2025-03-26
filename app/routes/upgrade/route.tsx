'use client';
import { useNavigate } from '@remix-run/react';
import { Button, Input, Separator } from '~/components/ui';
import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/pro-solid-svg-icons';
import FancyRadioGroup from '~/components/RadioGroup/RadioGroup';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plan, BillingPeriod } from '~/db/types/plan';
import { plans } from '~/db/data/plans/plans';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import NumberInput from '~/components/NumberInput/NumberInput';

const formSchema = z.object({
  billingPeriod: z.enum(['monthly', 'yearly']),
  additionalDestinations: z.number().min(1).optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  companyName: z.string().min(1),
  phoneNumber: z.string().min(1),
  country: z.string().min(1),
  stateOrProvince: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  addressLine1: z.string().min(1),
  addressLine2: z.string().min(1),
  billingEmail: z.string().email().optional(),
});

export default function BillingUpgrade() {
  const navigate = useNavigate();

  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('yearly');

  const handleGoBack = () => {
    navigate(-1);
  };

  const proPlan: Plan = plans.find((plan) => plan.id === 'pro') as Plan;

  if (!proPlan) {
    throw new Error('Pro plan not found');
  }

  const calculatePrice = (billingPeriod: BillingPeriod) => {
    const basePrice = proPlan.price as number;
    const additionalDests = form.watch('additionalDestinations') ?? 0;
    const additionalDestsPrice =
      Math.max(0, additionalDests) * proPlan.additionalDestinationsPrice;

    if (billingPeriod === 'yearly') {
      const yearlyBasePrice = basePrice * 12 * 0.82;
      const yearlyAdditionalPrice = additionalDestsPrice * 12 * 0.82;
      const total = yearlyBasePrice + yearlyAdditionalPrice;
      return {
        basePrice: yearlyBasePrice.toFixed(2),
        additionalDestsPrice: yearlyAdditionalPrice.toFixed(2),
        totalPrice: total.toFixed(2),
      };
    }

    const total = basePrice + additionalDestsPrice;
    return {
      basePrice: basePrice.toFixed(2),
      additionalDestsPrice: additionalDestsPrice.toFixed(2),
      totalPrice: total.toFixed(2),
    };
  };

  const formatPrice = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billingPeriod: 'yearly',
      additionalDestinations: 0,
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      phoneNumber: '',
      billingEmail: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex border-b border-base py-4 px-6">
        <div className="w-full max-w-[1200px] mx-auto flex flex-row items-center gap-3">
          <Button
            variant="ghost"
            onClick={handleGoBack}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="mr-2 text-sm"
            />
            Back
          </Button>
          <img
            src="/logos/census/census-logo-full.svg"
            alt="Census Logo"
            className="w-auto h-7"
          />
        </div>
      </div>
      <div className="w-full h-full py-8 flex flex-row relative overflow-y-auto justify-center gap-16">
        <div className="w-[600px] flex flex-col gap-4 h-full">
          <div className="pb-12 pt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-16">
                <div>
                  <FormField
                    control={form.control}
                    name="billingPeriod"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-lg">
                          Choose Billing Cycle
                        </FormLabel>
                        <FormControl>
                          <FancyRadioGroup
                            options={[
                              { label: 'Monthly', value: 'monthly' },
                              {
                                label: 'Yearly',
                                value: 'yearly',
                                extra: 'Save 18%',
                              },
                            ]}
                            defaultValue={billingPeriod}
                            onValueChange={(value) => {
                              field.onChange(value); // Update form state
                              setBillingPeriod(value as BillingPeriod); // Update UI state for price display
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Text className="text-lg font-medium">
                    Add Additional Destinations to your Professional Plan
                  </Text>
                  <FormField
                    control={form.control}
                    name="additionalDestinations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-4 w-56">
                        <FormControl>
                          <NumberInput
                            {...field}
                            minValue={0}
                            maxValue={2}
                            defaultValue={0}
                            onChange={(value) => {
                              field.onChange(value);
                              form.setValue('additionalDestinations', value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Text className="text-lg font-medium">
                    Personal Information
                  </Text>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Text className="text-lg font-medium">
                    Company Information
                  </Text>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Text className="text-lg font-medium">Billing Address</Text>
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stateOrProvince"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State or Province</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="billingEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          If different from primary contact email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Text className="text-lg font-medium">Payment Details</Text>
                  <div className="w-full h-[100px] bg-deep rounded-lg flex justify-center items-center">
                    Stripe integration input goes here
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div>
          <div className="w-[400px] bg-white border border-base shadow-lg h-full p-8 rounded-lg flex flex-col justify-between sticky top-0 max-h-[1100px]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <Text className="text-lg font-medium">
                  Upgrade to Professional
                </Text>

                <Text className="text-[2.5rem] font-medium">
                  $
                  {formatPrice(
                    parseFloat(calculatePrice(billingPeriod).totalPrice)
                  )}
                  <span className="text-[1.5rem] font-normal text-lighter">
                    /{billingPeriod === 'yearly' ? 'year' : 'mo'}
                  </span>
                </Text>
              </div>
              <div className="flex flex-col gap-2">
                {proPlan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex flex-row items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-emerald-500"
                    />
                    <Text className="text-lg">{feature}</Text>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <Text className="uppercase text-xxs tracking-wider font-bold text-lighter">
                      Professional Plan Subscription
                    </Text>
                    <div className="flex flex-row items-center gap-2 justify-between">
                      <Text>
                        {billingPeriod === 'yearly' ? 'Yearly' : 'Monthly'}
                      </Text>
                      <Text>
                        $
                        {formatPrice(
                          parseFloat(calculatePrice(billingPeriod).basePrice)
                        )}
                      </Text>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Text className="uppercase text-xxs tracking-wider font-bold text-lighter">
                      Additional Destinations
                    </Text>
                    <div className="flex flex-row items-center gap-2 justify-between">
                      <Text>
                        {form.watch('additionalDestinations') ? (
                          <span>$200.00 x </span>
                        ) : (
                          ''
                        )}
                        {form.watch('additionalDestinations') || 0} Destinations
                      </Text>
                      <Text>
                        $
                        {formatPrice(
                          parseFloat(
                            calculatePrice(billingPeriod).additionalDestsPrice
                          )
                        )}
                      </Text>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-row items-center gap-2 justify-between font-bold">
                    <div className="flex flex-row items-center gap-2">
                      <Text>Total Due Today</Text>
                      {billingPeriod === 'yearly' && (
                        <Text className="text-xs text-dark border border-base px-2.5 leading-none py-1 rounded-full font-medium">
                          Saving <span className="text-plum-500">18%</span>
                        </Text>
                      )}
                    </div>
                    <Text>
                      $
                      {formatPrice(
                        parseFloat(calculatePrice(billingPeriod).totalPrice)
                      )}
                    </Text>
                  </div>
                </div>
              </div>
              <Button
                size="large"
                type="submit"
                disabled={!form.formState.isValid}
                className="w-full">
                Upgrade Plan
              </Button>
              <div className="text-sm text-lighter">
                {billingPeriod === 'yearly' ? (
                  <Text>
                    You&apos;ll be charged $
                    {calculatePrice(form.watch('billingPeriod')).totalPrice} on{' '}
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    and each year thereafter until you cancel.
                  </Text>
                ) : (
                  <Text>
                    You&apos;ll be charged $
                    {calculatePrice(form.watch('billingPeriod')).totalPrice} on{' '}
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    and each month thereafter until you cancel.
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
