import { useNavigate } from '@remix-run/react';
import { Button, Input } from '~/components/ui';
import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/pro-solid-svg-icons';
import FancyRadioGroup from '~/components/RadioGroup/RadioGroup';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
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

const formSchema = z.object({
  billingPeriod: z.enum(['monthly', 'yearly']),
  addOns: z.array(z.string()),
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

export default function BillingUpgrade() {
  const navigate = useNavigate();

  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly'
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  const proPlan: Plan = {
    id: 'pro',
    name: 'Professional',
    price: 350,
    billingPeriod: 'monthly',
    features: [
      '2 Billable Destinations',
      'Unlimited Free Destinations',
      '5 Active Syncs per Billable Destination',
      '5 User Seats',
      '2 Workspaces',
      'Up to 2 Additional Billable Destinations',
    ],
  };

  const calculatePrice = (billingPeriod: 'monthly' | 'yearly') => {
    if (billingPeriod === 'yearly') {
      return proPlan.price * 12 * 0.82;
    }
    return proPlan.price;
  };

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
          <div className="w-1/2 flex flex-col gap-4">
            <div className="p-6 mb-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8">
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
                                  extra: 'Save 19%',
                                },
                              ]}
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                                setBillingPeriod(value as 'monthly' | 'yearly'); // Update UI state for price display
                              }}
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
                </form>
              </Form>
            </div>
          </div>
          <div className="w-1/3 bg-white border border-base shadow-lg h-full p-8 rounded-lg flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <Text className="text-lg font-medium">
                  Upgrade to Professional
                </Text>

                <Text className="text-[2.5rem] font-medium">
                  ${calculatePrice(form.watch('billingPeriod'))}
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
            <div>
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
    </div>
  );
}
