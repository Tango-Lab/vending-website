'use client';
import { Button, Card, Dropdown, Form, useApi } from '@/core';
import { ListItemType } from '@/core/components/Dropdown';
import { getMachineAutoComplete } from '@/service/vending-machine';
import { useForm } from 'react-hook-form';
import { getMonthRange, getWeekRange } from '@/helper/format-date';
import React, { useEffect, useState } from 'react';
import { getMonthlyTotal, useDailyTotal, useWeeklyTotal } from '@/actions/Amount';

export interface TotalAmount {
  amount: number;
}

const Page = () => {
  const [machines, setMachines] = useState<ListItemType[]>([]);
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

  const { amount, loading: loadingAmount } = useDailyTotal(machine, selectMachine as string);
  const { weekly } = useWeeklyTotal(machine, weekRange, selectMachine as string);
  const { monthly } = getMonthlyTotal(machine, monthRange, selectMachine as string);

  function onClearFilter() {
    setValue('machine', null);
  }

  useEffect(() => {
    if (response?.length) {
      setMachines(response);
    }
  }, [response]);

  useEffect(() => {
    setSelectMachine(machine);
  }, [machine]);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-semibold text-2xl">Dashboard Page</h2>
      <div>
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
          <Card loading={loadingAmount} amount={amount} />
          <Card loading={loadingAmount} amount={weekly} />
          <Card loading={loadingAmount} amount={monthly} />
        </div>
      </div>
      <div className="w-full rounded-lg border p-5 flex flex-col gap-5">
        <table className="w-full text-left">
          <thead>
            <tr className="py-5 px-5 bg-gray-100">
              <th className="w-32 py-2 px-5">Image</th>
              <th className="w-32 py-2 px-5">Product</th>
              <th className="w-32 py-2 px-5">Qty Sold</th>
              <th className="w-32 py-2 px-5">Unit Price</th>
              <th className="w-32 py-2 px-5">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="py-2 px-5">
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
