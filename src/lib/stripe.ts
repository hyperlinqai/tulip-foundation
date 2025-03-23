
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

export const createPaymentIntent = async (amount: number, description?: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: description || 'Donation to Tulip Kids Foundation',
      // Add metadata for India export compliance
      metadata: {
        purpose_code: 'P1101', // Donations code
        purpose_description: 'Charitable donation to non-profit organization',
        beneficiary_name: 'Tulip Kids Foundation',
        beneficiary_country: 'US'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

