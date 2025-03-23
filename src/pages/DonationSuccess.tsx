import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Download, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const DonationSuccess = () => {
  const location = useLocation();
  const { donationData, transactionId } = location.state || {};

  if (!donationData) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-6">
              The donation information could not be found. Please return to the home page.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-soft border border-gray-100 p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">Thank You for Your Donation!</h1>
              <p className="text-gray-600">
                Your generous support helps us make a difference in children's lives.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">Donation Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{donationData.isAnonymous ? "Anonymous" : donationData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">${donationData.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Designation:</span>
                  <span className="font-medium">{donationData.designation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium text-sm">{transactionId}</span>
                </div>
              </div>
            </div>

            <div className="bg-tulip-muted rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Heart className="h-6 w-6 text-tulip" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Your Impact</h3>
                  <p className="text-gray-600 mb-2">
                    Your donation will help provide educational resources, enrichment programs,
                    and vital support to children in our community.
                  </p>
                  <p className="text-gray-600">
                    A tax receipt has been sent to your email address.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="flex items-center justify-center"
                onClick={() => window.print()}
              >
                <Download className="mr-2 h-4 w-4" />
                Print Receipt
              </Button>
              <Link to="/" className="w-full sm:w-auto">
                <Button className="w-full">Return to Home</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonationSuccess;