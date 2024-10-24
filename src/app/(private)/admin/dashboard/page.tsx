'use client';
import { Button, Dropdown, Form, useApi } from '@/core';
import { ListItemType } from '@/core/components/Dropdown';
import { formatCurrencyWithSymbol } from '@/helper/format-number';
import { getTotalAmount } from '@/service/dashboards';
import { getMachineAutoComplete } from '@/service/vending-machine';
import { useForm } from 'react-hook-form';
import { getMonthRange, getWeekRange } from '@/helper/format-date';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export interface TotalAmount {
  amount: number;
}

const Page = () => {
  const [machines, setMachines] = useState<ListItemType[]>([]);
  const [monthlyAmount, setMonthlyAmount] = useState<TotalAmount | null>(null);
  const [weeklyAmount, setWeeklyAmount] = useState<TotalAmount | null>(null);
  const [selectMachine, setSelectMachine] = useState<string | null>(null);

  const methods = useForm<ListItemType>();
  const { watch, setValue } = methods;
  const machine = watch('machine');
  const today = new Date();
  const monthRange = getMonthRange(today);
  const weekRange = getWeekRange(today);

  const { response, loading } = useApi({
    service: getMachineAutoComplete,
    params: {},
    effects: [],
  });

  const { response: amount } = useApi<TotalAmount>({
    service: getTotalAmount,
    params: {},
    effects: [],
  });

  const { response: weekly } = useApi<TotalAmount>({
    service: getTotalAmount,
    params: { machine, from: weekRange.start, to: weekRange.end },
    effects: [selectMachine],
  });

  const { response: monthly } = useApi<TotalAmount>({
    service: getTotalAmount,
    params: { machine, from: monthRange.start, to: monthRange.end },
    effects: [selectMachine],
  });

  function onClearFilter() {
    setValue('machine', null);
  }

  useEffect(() => {
    if (response?.length) {
      setMachines(response);
    }
    if (weekly) {
      setWeeklyAmount(weekly);
    }
    if (monthly) {
      setMonthlyAmount(monthly);
    }
  }, [response, weekly, monthly]);

  useEffect(() => {
    setSelectMachine(machine);
  }, [machine]);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-semibold text-2xl">Dashboard Page</h2>
      <div className="">
        <h2 className="font-semibold text-xl">Overview</h2>
        <Form methods={methods} classNames="flex gap-4 mt-5">
          <div className="flex-1 max-w-[300px] flex-grow">
            <Dropdown items={machines} name="machine" placeholder="Select Machine" />
          </div>
          <Button disabled={loading} onClick={onClearFilter}>
            Clear
          </Button>
        </Form>
        <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className=" p-5 mt-5 h-full border rounded-lg">
            <div className="flex items-center gap-5 ">
              <div className="min-w-[120px] min-h-[120px]">
                <Image
                  src="/assets/icons/riel.png "
                  width={120}
                  height={120}
                  alt="logo"
                  className="border rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-2xl font-bold">
                  {formatCurrencyWithSymbol(monthlyAmount?.amount as number, '', 'KHR')}
                </h2>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg">Monthly Revenue</h2>
                </div>
              </div>
            </div>
          </div>
          <div className=" p-5 mt-5 h-full border rounded-lg">
            <div className="flex items-center gap-5 ">
              <div className="min-w-[120px] min-h-[120px]">
                <Image
                  src="/assets/icons/riel.png "
                  width={120}
                  height={120}
                  alt="logo"
                  className="border rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-2xl font-bold">
                  {formatCurrencyWithSymbol(weeklyAmount?.amount as number, '', 'KHR')}
                </h2>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg">Weekly Revenue</h2>
                </div>
              </div>
            </div>
          </div>
          <div className=" p-5 mt-5 h-full border rounded-lg hover:bg-slate-50">
            <div className="flex items-center gap-5 ">
              <div className="min-w-[120px] min-h-[120px]">
                <Image
                  src="/assets/icons/riel.png "
                  width={120}
                  height={120}
                  alt="logo"
                  className="border rounded-lg  "
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{formatCurrencyWithSymbol(amount?.amount as number, '', 'KHR')}</h2>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg">Daily Revenue</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <table className="w-full text-left">
          <thead>
            <tr className="py-5 px-5 bg-gray-100">
              <th className="w-32 py-2 px-5">image</th>
              <th className="w-32 py-2 px-5">Product</th>
              <th className="w-32 py-2 px-5">Qty Sold</th>
              <th className="w-32 py-2 px-5">Unit Price</th>
              <th className="w-32 py-2 px-5">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" py-2 px-5">
              <td className="w-32 py-2 px-5"></td>
              <td className="w-32 py-2 px-5"></td>
              <td className="w-32 py-2 px-5"></td>
              <td className="w-32 py-2 px-5"></td>
              <td className="w-32 py-2 px-5"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
