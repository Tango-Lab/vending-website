'use client';
import React, { useEffect, useState } from 'react';

export interface PaginationTypeProps {
  total: number;
  pageSize: number;
  onChange?: (page: number) => void;
}

const PaginationComponent = (props: PaginationTypeProps) => {
  const { total, pageSize, onChange } = props;
  const [totalPage, setTotalPage] = useState<number>(0);
  const [list, setList] = useState<number[]>([]);

  useEffect(() => {
    setTotalPage(Math.ceil(total / pageSize));
  }, [total, pageSize]);

  useEffect(() => {
    const items = Array.from({ length: totalPage }, (_, index) => index + 1);
    setList(items);
  }, [totalPage]);

  const onPaginationChange = (idx: number) => {
    const nextOffset = (idx - 1) * pageSize;
    if (onChange) {
      onChange(nextOffset);
    }
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {list.map((idx) => {
            return (
              <li
                key={idx}
                onClick={() => onPaginationChange(idx)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {idx}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default PaginationComponent;
