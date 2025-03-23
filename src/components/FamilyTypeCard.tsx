
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface FamilyTypeCardProps {
  category: string;
  adultCount: number;
  kidsCount: number;
}

const FamilyTypeCard: React.FC<FamilyTypeCardProps> = ({ category, adultCount, kidsCount }) => {
  // Define the icon and background color based on the category
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'One Family, No Kids':
        return { 
          icon: 'adult-only',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700'
        };
      case 'One Family, Two Kids':
        return { 
          icon: 'family-kids',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700'
        };
      case 'One Family, Multiple Kids':
        return { 
          icon: 'family-multiple-kids',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-700'
        };
      case 'One Family, One Kid':
        return { 
          icon: 'family-one-kid',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-700'
        };
      default:
        return { 
          icon: 'custom',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-700'
        };
    }
  };

  const { bgColor, borderColor, textColor } = getCategoryStyles(category);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`rounded-xl overflow-hidden border ${borderColor}`}>
        <CardContent className={`p-4 ${bgColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${bgColor} mr-3`}>
                <Users className={`h-5 w-5 ${textColor}`} />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{category}</h4>
                <p className="text-sm text-muted-foreground">
                  {adultCount} {adultCount === 1 ? 'adult' : 'adults'} and {kidsCount} {kidsCount === 1 ? 'kid' : 'kids'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FamilyTypeCard;
