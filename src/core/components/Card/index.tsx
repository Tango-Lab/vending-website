import React from 'react';
import Image from 'next/image';
import { formatCurrencyWithSymbol } from '@/helper/format-number';
import { TotalAmount } from '@/app/(private)/admin/dashboard/page';

export interface ICard {
  label: string;
  loading: boolean;
  amount: TotalAmount;
}
const Card = ({ loading, amount, label }: ICard) => {
  return (
    <div className="p-5 mt-5 h-full border rounded-lg min-w-[120px] min-h-[120px]  bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="flex items-center gap-5 ">
        <div className="min-w-[120px] min-h-[120px] bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg rounded-lg">
          <Image src="/assets/icons/riel.png" width={120} height={120} alt="logo" className="border rounded-lg" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {loading ? (
              <div className="w-6 h-6 border-4 border-t-4 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
            ) : (
              formatCurrencyWithSymbol(amount?.amount as number, '', 'KHR')
            )}
          </h2>
          <div className="flex items-center justify-between">
            <h2 className="text-lg">{label}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
