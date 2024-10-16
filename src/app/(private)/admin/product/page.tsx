'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ProductTypeList } from '@/constants/products';
import { formatDisplayDate } from '@/helper/format-date';
import { IPagination } from '@/models/Pagination';
import { Product } from '@/models/Product';
import { getAllProduct } from '@/service/product';
import { Button, Dropdown, Form, InputText, Pagination, useApi } from '@Core';
import { MdDelete, MdEditDocument } from 'react-icons/md';

const Page = () => {
  const methods = useForm({ defaultValues: { name: null, type: null } });
  const limit = 10;
  const { watch, setValue } = methods;

  // State
  const [list, setList] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  // Filtered
  const name = watch('name');
  const type = watch('type');

  const { response } = useApi<IPagination<Product>>({
    service: getAllProduct,
    params: { limit: 10, offset, name, type },
    effects: [offset, name, type],
  });

  useEffect(() => {
    if (response?.data.length) {
      setList(response.data ?? []);
      setTotal(response.total);
    }
  }, [response]);

  useEffect(() => {
    setOffset(0);
  }, [name, type]);

  function onClearFilter() {
    setOffset(0);
    setValue('name', null);
    setValue('type', null);
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl">All Product ({total})</h2>
        </div>
        <Button className="text-center">
          <Link href="/admin/product/create">Create Product</Link>
        </Button>
      </div>
      <Form methods={methods} classNames="my-5 flex gap-4 items-center justify-start">
        <div className="flex-1 max-w-[200px]">
          <InputText name="name" disableSpecialChars={true} placeholder="Ex: Snack" />
        </div>
        <div className="flex-1 max-w-[200px]">
          <Dropdown name="type" items={ProductTypeList} placeholder="Product Type" />
        </div>
        <Button onClick={onClearFilter}>Clear</Button>
      </Form>
      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Product Name
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Code
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Type
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Bar Code
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Price
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {list.length > 0 &&
            list.map((row, idx) => {
              return (
                <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    <div className="flex items-center gap-2">
                      {row.imageUrl && (
                        <Image
                          className="w-10 h-10 rounded-full object-cover"
                          width={100}
                          height={100}
                          src={row.imageUrl}
                          alt={row.imageUrl}
                        />
                      )}
                      {row.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {row.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {row.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {row.barCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {row.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {formatDisplayDate(row.createdAt, 'DD MMM YYYY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    <div className="flex items-center gap-2">
                      <div
                        className={classNames(
                          'h-2.5 w-2.5 rounded-full me-2',
                          { 'bg-green-500': row.isActive },
                          { 'bg-red-500': !row.isActive }
                        )}
                      ></div>
                      <div>{row.isActive ? 'Active' : 'Deactive'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    <Link
                      href={{
                        pathname: '/admin/product/create',
                        query: { id: row.id },
                      }}
                    >
                      <button className="p-3 text-center">
                        <MdEditDocument className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination total={total} pageSize={limit} onChange={setOffset} />
      </div>
    </div>
  );
};

export default Page;
