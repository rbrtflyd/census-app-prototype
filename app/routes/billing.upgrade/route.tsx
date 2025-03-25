import { json, redirect } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { Button, Input, Select } from '~/components/ui';
import { Card } from '~/components/ui/card';
import { Text, Heading } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/pro-solid-svg-icons';
import FancyRadioGroup from '~/components/RadioGroup/RadioGroup';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'annual';
  features: string[];
}

export const loader = async () => {
  // In a real implementation, you would:
  // 1. Check if user is authenticated
  // 2. Get current subscription details
  // 3. Fetch available plans from your payment provider

  return json({ plans });
};

const formSchema = z.object({
  billingPeriod: z.enum(['monthly', 'yearly']),
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
});

export const action = async () => {
  //const formData = await request.formData();
  //   const planId = formData.get('planId');
  //   const billingPeriod = formData.get('billingPeriod');

  // In a real implementation, you would:
  // 1. Create/update subscription with payment provider
  // 2. Update user's subscription in your database
  // 3. Handle payment processing

  // For now, we'll just redirect back to the home page
  return redirect('/v1/home');
};

export default function BillingUpgrade() {
  const { plans } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); // Default to Pro plan
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const handleGoBack = () => {
    navigate(-1);
  };

  // const proPlan = {
  //   id: 'pro',
  //   name: 'Professional',
  //   price: 199,
  //   billingPeriod: 'monthly',
  //   features: [
  //     'Unlimited syncs',
  //     'Priority support',
  //     'Advanced integrations',
  //     '1M records per month',
  //     'Custom fields',
  //   ],
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billingPeriod: 'monthly',
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      phoneNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const calculatePrice = (plan: Plan) => {
    if (billingPeriod === 'annual') {
      return (plan.price * 10).toFixed(2); // 2 months free with annual billing
    }
    return plan.price.toFixed(2);
  };

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
      <div className="w-full h-full py-8">
        <div className="flex flex-row w-full max-w-[1200px] mx-auto gap-8 h-full justify-center">
          <div className="w-2/5 flex flex-col gap-4">
            <div className="p-6 mb-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8">
                  <div>
                    <FormField
                      control={form.control}
                      name="billingPeriod"
                      render={() => (
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
                                  extra: '-18%',
                                  value: 'yearly',
                                },
                              ]}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
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
                  <div>
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
                  <div>
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
                  </div>
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
          <div className="w-1/3 bg-white border border-base shadow-lg h-full p-8 rounded-lg flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <Text className="text-lg font-medium">
                Upgrade to Professional
              </Text>

              <Text className="text-[2.5rem] font-medium">
                $350
                <span className="text-[1.5rem] font-normal text-lighter">
                  /mo
                </span>
              </Text>
            </div>
            <div>
              {/* {proPlan.features.map((feature) => (
                <div key={feature}>
                  <FontAwesomeIcon icon={faCheck} />
                  {feature}
                </div>
              ))} */}
            </div>
            <Button
              size="large"
              type="submit"
              className="w-full">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
