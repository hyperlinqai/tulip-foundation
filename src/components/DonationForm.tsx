import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createPaymentIntent } from '@/lib/stripe';

// Form schema for validation
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  amount: z.number().min(1, "Amount must be at least $1"),
  designation: z.string().optional(),
  isAnonymous: z.boolean().optional(),
});

type DonationFormProps = {
  setPaymentAmount: (amount: number) => void;
};

const DonationForm: React.FC<DonationFormProps> = ({ setPaymentAmount }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: 0,
      designation: "Where Needed Most",
      isAnonymous: false,
    },
  });

  // Handle preset amount selection
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setValue("amount", amount);
    setPaymentAmount(amount * 100); // Convert to cents for Stripe
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);

    const numValue = parseFloat(value) || 0;
    setValue("amount", numValue);
    setPaymentAmount(numValue * 100); // Convert to cents for Stripe
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!stripe || !elements) {
      toast.error('Stripe has not been initialized');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Get the client secret from your backend with description for India export compliance
      const clientSecret = await createPaymentIntent(
        data.amount * 100,
        `Donation to Tulip Kids Foundation - ${data.designation || 'General'}`
      );

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            address: {
              line1: '123 Main St', // Add a valid address line
              country: 'US' // Add country information
            }
          },
        },
        shipping: {
          name: `${data.firstName} ${data.lastName}`,
          address: {
            line1: '123 Main St', // Add a valid address line
            country: 'US'
          }
        }
      });

      if (result.error) {
        throw result.error;
      }

      // Save donation to database
      const { error: dbError } = await supabase
        .from('donations')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          amount: data.amount,
          designation: data.designation,
          is_anonymous: data.isAnonymous || false,
          payment_id: result.paymentIntent.id,
          donation_type: 'Website Donation',
          status: 'completed',
          created_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error('Database error:', dbError);
        // Continue with success flow even if DB save fails
      }

      // Payment succeeded
      toast.success('Donation successful!', {
        description: 'Thank you for your generous support.',
      });

      // Navigate to success page with donation data
      navigate('/donation-success', {
        state: {
          donationData: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            amount: data.amount,
            designation: data.designation,
            isAnonymous: data.isAnonymous || false,
          },
          transactionId: result.paymentIntent.id
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label className="mb-3 block">Donation Amount</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[25, 50, 100, 250].map((amount) => (
            <Button
              key={amount}
              type="button"
              variant={selectedAmount === amount ? "default" : "outline"}
              onClick={() => handleAmountSelect(amount)}
              className="border border-tulip"
            >
              ${amount}
            </Button>
          ))}
        </div>
        <div>
          <Label htmlFor="customAmount">Custom Amount</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              id="customAmount"
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="pl-8"
              placeholder="Enter amount"
              min="1"
              step="0.01"
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="designation">Donation Designation</Label>
        <Select
          onValueChange={(value) => setValue("designation", value)}
          defaultValue="Where Needed Most"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select designation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Where Needed Most">Where Needed Most</SelectItem>
            <SelectItem value="Summer Camp Programs">Summer Camp Programs</SelectItem>
            <SelectItem value="Educational Initiatives">Educational Initiatives</SelectItem>
            <SelectItem value="Family Support Services">Family Support Services</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Card Information</Label>
        <div className="border border-gray-300 p-4 rounded-md">
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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isAnonymous"
          onChange={(e) => setValue("isAnonymous", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-tulip focus:ring-tulip"
        />
        <Label htmlFor="isAnonymous" className="text-sm font-normal">
          Make my donation anonymous
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-tulip hover:bg-tulip-dark text-white font-bold py-3"
        disabled={isProcessingPayment || !stripe}
      >
        {isProcessingPayment ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Donate ${watch("amount") ? `$${watch("amount").toFixed(2)}` : ""}`
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Your donation is tax-deductible to the extent allowed by law.
        Tulip Kids Foundation is a registered 501(c)(3) nonprofit organization.
      </p>
    </form>
  );
};

export default DonationForm;