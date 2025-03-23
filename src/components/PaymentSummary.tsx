
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

interface PaymentSummaryProps {
  familyCategory: string;
  adultCount: number;
  kidsCount: number;
  totalAmount: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ 
  familyCategory, 
  adultCount, 
  kidsCount, 
  totalAmount 
}) => {
  // Use the actual prices from RegistrationForm
  const ADULT_PRICE = 20; // Changed back to $20 per person
  const KID_PRICE = 20; // Changed back to $20 per person
  
  // Calculate individual totals
  const adultTotal = adultCount * ADULT_PRICE;
  const kidsTotal = kidsCount * KID_PRICE;
  
  // Verify that our calculated total matches the passed totalAmount
  const calculatedTotal = adultTotal + kidsTotal;
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="rounded-xl overflow-hidden shadow-soft">
        <CardHeader className="bg-primary/5 pb-3">
          <CardTitle className="text-xl">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Family Category:</span>
              <span className="font-medium">{familyCategory}</span>
            </div>
            
            <div className="space-y-2">
              {adultCount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{adultCount} Adult{adultCount > 1 ? 's' : ''} × ${ADULT_PRICE} each:</span>
                  <span className="font-medium">${adultTotal.toFixed(2)}</span>
                </div>
              )}
              
              {kidsCount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{kidsCount} Kid{kidsCount > 1 ? 's' : ''} × ${KID_PRICE} each:</span>
                  <span className="font-medium">${kidsTotal.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between font-medium">
            <span>Total Amount:</span>
            <span className="text-lg font-bold text-primary">${calculatedTotal.toFixed(2)}</span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>All fees include tax where applicable.</p>
            <p>Payment will be processed securely through Stripe.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaymentSummary;
