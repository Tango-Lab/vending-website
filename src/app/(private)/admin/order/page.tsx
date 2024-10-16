'use client';

import React, { useEffect, useState } from 'react';
import { formatDateForForm } from '@/helper/format-date';
import * as order from '@/constants/Order';
import * as payment from '@/constants/Payment';

import { formatOrderStatus, formatPaymentMethod, formatPaymentStatus } from '@/helper/format-status';
import { IOrder } from '@/models/Order';
import { getAllOrders } from '@/service/order';
import { Button, Dropdown, Form, Pagination, useApi } from '@Core';
import classNames from 'classnames';
import Link from 'next/link';
import { getMachineAutoComplete } from '@/service/vending-machine';
import { useForm } from 'react-hook-form';
import { ListItemType } from '@/core/components/Dropdown';
import { formatCurrencyWithSymbol } from '@/helper/format-number';

function Page() {
  const limit = 10;
  //
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<IOrder[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<number | null>(null);
  const [machinesList, setMachinesList] = useState<ListItemType[]>([]);

  const methods = useForm<ListItemType>({ defaultValues: { machine: null, status: null } });

  const { watch, setValue } = methods;
  const machine = watch('machine');
  const status = watch('status');

  const { response } = useApi({
    service: getAllOrders,
    params: { limit, offset, machine, status },
    effects: [offset, selectedMachine, selectedOrderStatus],
  });

  const { response: machines } = useApi<ListItemType[]>({
    service: getMachineAutoComplete,
    params: {},
    effects: [],
  });

  useEffect(() => {
    if (response?.data) {
      setList(response.data);
      setTotal(response.total);
    }
  }, [response]);

  useEffect(() => {
    if (machines?.length) {
      setMachinesList(machines);
    }
  }, [machines]);

  useEffect(() => {
    if (machines?.length) {
      setMachinesList(machines);
    }
  }, [status]);

  // When We filtered machine
  useEffect(() => {
    setOffset(0);
    setSelectedMachine(machine);
    setSelectedOrderStatus(parseInt(status));
  }, [machine, status]);

  function onClearFilter() {
    setOffset(0);
    setValue('machine', null);
    setValue('status', null);
  }

  function getStatusClass(statusOrder: number) {
    switch (statusOrder) {
      case order.ORDER_STATUS_PENDING || payment.PAYMENT_STATUS_PENDING:
        return 'bg-yellow-500';
      case order.ORDER_STATUS_COMPLETED || payment.PAYMENT_STATUS_COMPLETED:
        return 'bg-green-500';
      case order.ORDER_STATUS_CANCEL || payment.PAYMENT_STATUS_FAILED:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  const OrderStatusArray = Array.from({ length: 3 }, (_, i) => ({
    id: String(i + 1),
    name: formatOrderStatus(i + 1),
  }));

  return (
    <div>
      <Form methods={methods} classNames="flex gap-4">
        <div className="flex-1 max-w-[200px]">
          <Dropdown items={machinesList} name="machine" />
        </div>
        <div className="flex-1 max-w-[200px]">
          <Dropdown items={OrderStatusArray} name="status" />
        </div>
        <Button onClick={onClearFilter}>Clear</Button>
      </Form>

      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Order No
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Transaction No
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Machine
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Amount
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Status
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Payment Status
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Payment Method
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Created At
            </th>

            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Completed At
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((row) => (
            <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700" key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>{row.orderNo}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>{row.payments[0]?.transactionNo}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>{row.machine.name}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>
                  {formatCurrencyWithSymbol(row.totalAmount, '', row.currency)}
                </Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>
                  <div className="flex gap-x-2 items-center">
                    <div className={classNames('h-2.5 w-2.5 rounded-full me-2', getStatusClass(row.orderStatus))}></div>
                    {formatOrderStatus(row.orderStatus)}
                  </div>
                </Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>
                  <div className="flex gap-x-2 items-center">
                    <div
                      className={classNames('h-2.5 w-2.5 rounded-full me-2', getStatusClass(row.paymentStatus))}
                    ></div>
                    {formatPaymentStatus(row.paymentStatus)}
                  </div>
                </Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>{formatPaymentMethod(row.payments[0]?.paymentMethod)}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>{formatDateForForm(row.createdAt, 'DD MMM yyyy hh:mm a')}</Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                <Link href={'/admin/order/' + row.id}>
                  {formatDateForForm(row.payments[0]?.paymentTimestamp, 'DD MMM yyyy hh:mm a')}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!list.length && (
        <div className="mt-10 text-center text-gray-800 dark:text-neutral-200">
          No order has been recorded for this filter(s).
        </div>
      )}

      <div className="mt-4">
        <Pagination total={total} pageSize={limit} onChange={setOffset} />
      </div>
    </div>
  );
}

export default Page;
