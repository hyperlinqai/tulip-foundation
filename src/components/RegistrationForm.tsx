
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import { Check, ChevronsRight, CreditCard, Loader2, Send, User, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import FamilyTypeCard from './FamilyTypeCard';
import PaymentSummary from './PaymentSummary';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { createPaymentIntent } from '@/lib/stripe';

// Define the base form schema with proper transformations
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  // Address fields for Indian export regulations
  addressLine1: z.string().min(1, {
    message: "Address is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  postalCode: z.string().length(5, {
    message: "US zip code must be exactly 5 digits.",
  }).regex(/^\d{5}$/, {
    message: "Please enter a valid 5-digit US zip code.",
  }),
  // Use string type for form inputs but transform to number for validation
  adultCount: z.string().transform(val => Number(val)).refine((val) => val > 0, {
    message: "At least one adult is required.",
  }),
  kidsCount: z.string().transform(val => Number(val)),
  isTulipParent: z.boolean().default(false),
});

interface RegistrationFormProps {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  setPaymentAmount: React.Dispatch<React.SetStateAction<number>>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ formStep, setFormStep, setPaymentAmount }) => {
  const [familyCategory, setFamilyCategory] = useState<string>('');
  const [adultCount, setAdultCount] = useState<number>(1);
  const [kidsCount, setKidsCount] = useState<number>(0);
  const [tShirtSizes, setTShirtSizes] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isTulipParent, setIsTulipParent] = useState<boolean>(false); // New state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  // At the component level, define constants
  const ADULT_PRICE = 20; // Changed back to $20 per person
  const KID_PRICE = 20; // Changed back to $20 per person

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      addressLine1: "",
      city: "",
      postalCode: "",
      adultCount: 1, // Set as string to match the Select component's value type
      kidsCount: 0, // Set as string to match the Select component's value type
      isTulipParent: false,
    },
  });

  useEffect(() => {
    // Determine family category based on adults and kids count
    const determineFamilyCategory = () => {
      if (adultCount >= 1) {
        if (kidsCount === 0) {
          return 'One Family, No Kids';
        } else if (kidsCount === 2) {
          return 'One Family, Two Kids';
        } else if (kidsCount > 2) {
          return 'One Family, Multiple Kids';
        } else {
          return 'One Family, One Kid';
        }
      }
      return 'Custom Case';
    };

    // Update family category
    setFamilyCategory(determineFamilyCategory());

    // Calculate payment amount based on category
    const calculatePayment = () => {
      const adultTotal = adultCount * ADULT_PRICE;
      const kidsTotal = kidsCount * KID_PRICE;
      return adultTotal + kidsTotal;
    };

    const total = calculatePayment();
    setTotalAmount(total);
    
    // Update the payment amount in cents for Stripe
    setPaymentAmount(total * 100);

    // Initialize t-shirt sizes array based on total participants
    const totalParticipants = adultCount + kidsCount;
    setTShirtSizes(Array(totalParticipants).fill('M'));
  }, [adultCount, kidsCount, setPaymentAmount]);

  const onSubmitContactDetails = (data: z.infer<typeof formSchema>) => {
    // Convert string form values to numbers for state
    setAdultCount(Number(data.adultCount));
    setKidsCount(Number(data.kidsCount));
    setIsTulipParent(data.isTulipParent); // Save the new field value
    setFormStep(2);
    
    toast("Contact details saved successfully", {
      description: "Moving to participant details",
      duration: 3000,
    });
  };

  const handleTShirtSizeChange = (index: number, size: string) => {
    const newSizes = [...tShirtSizes];
    newSizes[index] = size;
    setTShirtSizes(newSizes);
  };

  // Replace the createPaymentIntent function with a mock implementation for development
  const createPaymentIntent = async (amount: number) => {
    try {
      // For development/testing, return a mock client secret
      // In production, this should call your actual backend API
      console.log(`Creating payment intent for $${(amount/100).toFixed(2)}`);
      
      // Option 1: Use the imported function from lib/stripe if you have a backend
      // return await import('@/lib/stripe').then(module => module.createPaymentIntent(amount));
      
      // Option 2: Mock response for testing
      return `pi_mock_${Math.random().toString(36).substring(2)}_secret_${Math.random().toString(36).substring(2)}`;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  };

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) {
      toast.error('Stripe has not been initialized');
      return;
    }
    
    setIsProcessingPayment(true);
    
    try {
      // Get the client secret (mock for development)
      const clientSecret = await createPaymentIntent(totalAmount * 100);
      
      // For testing purposes, skip the actual payment confirmation
      // and simulate a successful payment
      
      // In production, uncomment this code:
      /*
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: form.getValues('name'),
            email: form.getValues('email'),
          },
        },
      });
      
      if (result.error) {
        throw result.error;
      }
      */
      
      // Mock successful payment for development
      console.log('Payment would be processed with secret:', clientSecret);
      
      // Generate a mock transaction ID
      const mockTransactionId = `tx_${Math.random().toString(36).substring(2, 15)}`;
      
      // Create registration data object to pass to success page
      const registrationData = {
        name: form.getValues('name'),
        email: form.getValues('email'),
        phone: form.getValues('phone'),
        adultCount: adultCount,
        kidsCount: kidsCount,
        familyCategory: familyCategory,
        totalAmount: totalAmount,
        isTulipParent: form.getValues('isTulipParent'),
        tShirtSizes: tShirtSizes
      };
      
      // Payment succeeded
      toast.success('Registration successful!', {
        description: 'Your payment has been processed successfully.',
      });
      
      // Navigate to success page with registration data and transaction ID
      navigate('/success', { 
        state: { 
          registrationData,
          transactionId: mockTransactionId
        } 
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed', {
        description: 'Please try again or contact support',
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Registration</h2>
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                formStep >= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {formStep === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitContactDetails)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <FormLabel>Full Name</FormLabel>
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="rounded-xl h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="email@example.com" 
                              type="email" 
                              {...field} 
                              className="rounded-xl h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(123) 456-7890" 
                              type="tel" 
                              {...field} 
                              className="rounded-xl h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="adultCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Adults</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setAdultCount(Number(value));
                              }} 
                              value={String(field.value) || "1"} // Default to "1" if no value
                            >
                              <SelectTrigger className="rounded-xl h-11">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <SelectItem key={num} value={String(num)}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="kidsCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Kids (Above 4 Years)</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setKidsCount(Number(value));
                              }}
                              value={String(field.value)}
                              defaultValue="0"
                            >
                              <SelectTrigger className="rounded-xl h-11">
                                <SelectValue>
                                  {String(field.value) === "0" ? "0" : undefined}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {[0, 1, 2, 3, 4, 5].map((num) => (
                                  <SelectItem key={num} value={String(num)}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="isTulipParent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Are you a Tulip Kids Student's parent?
                            </FormLabel>
                            <FormDescription>
                              Please check this box if your child is currently enrolled at Tulip Kids.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />

                <h3 className="text-lg font-medium mb-3">Billing Address</h3>
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Street address" 
                          {...field} 
                          className="rounded-xl h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="City" 
                            {...field} 
                            className="rounded-xl h-11"
                          />
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
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="5-digit zip code" 
                            maxLength={5}
                            {...field} 
                            className="rounded-xl h-11"
                            onChange={(e) => {
                              // Only allow digits
                              const value = e.target.value.replace(/\D/g, '');
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full rounded-xl h-12 btn-hover-effect"
                >
                  Continue <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
        
        {formStep === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Family Category</h3>
                <FamilyTypeCard category={familyCategory} adultCount={adultCount} kidsCount={kidsCount} />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">T-Shirt Sizes</h3>
                <Card className="rounded-xl overflow-hidden">
                  <CardContent className="p-4">
                    {[...Array(adultCount + kidsCount)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">
                            {index < adultCount 
                              ? `Adult ${adultCount > 1 ? index + 1 : ''}` 
                              : `Child ${kidsCount > 1 ? (index - adultCount) + 1 : ''}`}
                          </p>
                        </div>
                        <Select 
                          onValueChange={(value) => handleTShirtSizeChange(index, value)} 
                          defaultValue={tShirtSizes[index]}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="XS">XS</SelectItem>
                            <SelectItem value="S">S</SelectItem>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="XL">XL</SelectItem>
                            <SelectItem value="XXL">XXL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl h-12"
                  onClick={() => setFormStep(1)}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1 rounded-xl h-12 btn-hover-effect"
                  onClick={() => setFormStep(3)}
                >
                  Continue <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        {formStep === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <PaymentSummary 
                familyCategory={familyCategory}
                adultCount={adultCount}
                kidsCount={kidsCount}
                totalAmount={totalAmount}
              />
              
              <div className="border border-dashed p-4 rounded-xl bg-primary/5">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-medium">Payment Details</h3>
                </div>
                
                {/* Stripe Card Element */}
                <div className="space-y-4 mt-4">
                  <div className="p-3 border rounded-lg">
                    <CardElement 
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  onClick={handlePaymentSubmit}
                  disabled={isProcessingPayment || !stripe}
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${totalAmount.toFixed(2)}`
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegistrationForm;
