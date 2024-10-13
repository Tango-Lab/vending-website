'use client';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { formatDisplayDate } from '@/helper/format-date';
import { VendingMachineList, VendingMachine } from '@/models/VendingMachine';
import { getAllVendingMachines } from '@/service/vending-machine';
import { Button, Form, InputText, Pagination, useApi } from '@Core';
import { IPagination } from '@/models/Pagination';
import { MdEditDocument } from 'react-icons/md';

const Page = () => {
  const methods = useForm({ defaultValues: { name: null } });
  const limit = 10;
  const { watch, setValue } = methods;

  // State
  const [list, setList] = useState<VendingMachineList>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const name = watch('name');

  // API
  const { response } = useApi<IPagination<VendingMachine>>({
    service: getAllVendingMachines,
    params: { limit: 10, offset, name },
    effects: [offset, name],
  });

  useEffect(() => {
    if (response?.data.length) {
      setList(response.data);
      setTotal(response.total);
    }
  }, [response]);

  useEffect(() => {
    setOffset(0);
  }, [name]);

  function onClearFilter() {
    setOffset(0);
    setValue('name', null);
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Vending Machine
        </h2>

        <Link
          className="col-end-7 text-white bg-primary hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          href="/admin/vending-machine/create"
        >
          Create Vending Machine
        </Link>
      </div>
      <Form methods={methods} classNames="my-5">
        <div className="grid grid-cols-4 gap-4">
          <InputText
            name="name"
            disableSpecialChars={true}
            placeholder="Ex: Vending Machine A"
          />
          <div className="grid grid-cols-3">
            <Button className="" onClick={onClearFilter}>
              Clear
            </Button>
          </div>
        </div>
      </Form>

      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Name
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              IP Address
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Capacity
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Last Restocked
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Serial No
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Placed On Date
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Created At
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Status
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Action
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {list.length > 0 &&
            list.map((row, idx) => {
              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link href={'/admin/vending-machine/' + row.id}>
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link href={'/admin/vending-machine/' + row.id}>
                      {row.device.ip}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link href={'/admin/vending-machine/' + row.id}>
                      {row.capacity}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link href={'/admin/vending-machine/' + row.id}>
                      {formatDisplayDate(row.lastRestocked, 'DD MMM YYYY')}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.device.serialNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link href={'/admin/vending-machine/' + row.id}>
                      {formatDisplayDate(row.installationDate, 'DD MMM YYYY')}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link href={'/admin/vending-machine/' + row.id}>
                      {formatDisplayDate(row.createdAt, 'DD MMM YYYY')}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link href={'/admin/vending-machine/' + row.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className={classNames(
                            'h-2.5 w-2.5 rounded-full me-2',
                            { 'bg-green-500': row.state },
                            { 'bg-red-500': !row.state }
                          )}
                        ></div>
                        <div>{row.state ? 'Active' : 'Deactive'}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <Link
                      className="text-blue-600 hover:underline"
                      href={{
                        pathname: '/admin/vending-machine/create',
                        query: { id: row.id },
                      }}
                    >
                      <button className='p-3 text-center'>
                        <MdEditDocument className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table >
      <div className="mt-4">
        <Pagination total={total} pageSize={limit} onChange={setOffset} />
      </div>
    </div >
  );
};

export default Page;
