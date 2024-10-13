'use client';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { formatDisplayDate } from '@/helper/format-date';
import { IBootTypeList } from '@/schema/BoothType';
import { getAllBoothType } from '@/service/booth-type';
import { useApi } from '@Core';

const Page = () => {
  const [list, setList] = useState<IBootTypeList[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const limit = 10;

  // API
  const { response } = useApi({
    service: getAllBoothType,
    params: { limit, offset },
    effects: [offset],
  });

  useEffect(() => {
    if (response && response.data) {
      setList(response.data);
      setTotal(response.total);
    }
  }, [response]);

  return (
    <div>
      <Link
        className="col-end-7 text-white bg-primary hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        href="/admin/booth-type/create"
      >
        Create Booth Type
      </Link>
      <table className="w-full min-w-max table-auto mt-4 text-left">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Event Name
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
                    {row.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {row.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {formatDisplayDate(row.createdAt, 'DD MMM YYYY')}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div
                        className={classNames(
                          'h-2.5 w-2.5 rounded-full me-2',
                          { 'bg-green-500': row.isActive },
                          { 'bg-red-500': !row.isActive },
                        )}
                      ></div>
                      <div>{row.isActive ? 'Active' : 'Deactive'}</div>
                    </div>
                  </td>
                  <td>
                    <Link
                      href={{
                        pathname: '/admin/booth-type/create',
                        query: { id: row.id },
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
