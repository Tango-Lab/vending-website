'use client';
import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface ListItemType {
  id: string;
  name: string;
  [key: string]: any;
}

export interface DropdownTypeProps {
  name: string;
  label?: string;
  items?: ListItemType[];
  isNotShowErrMsg?: boolean;
}

const DropdownComponent = (props: DropdownTypeProps) => {
  const { name, label, items = [], isNotShowErrMsg } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  register(name);

  const error = name.split('.').reduce((acc, part) => (acc as any)?.[part], errors);

  const ctxClass = classNames({
    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700': error,
    'bg-gray-50 border border-gray-300 text-gray-900': !error,
  });

  return (
    <div>
      {label && (
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <select
        id={name}
        defaultValue={0}
        className={classNames(ctxClass, 'bg-gray-50 text-sm rounded-lg block w-full p-2.5')}
        {...register(name)}
      >
        <option value={0} disabled>
          Select an option
        </option>
        {items.map((row) => (
          <option value={row.id} key={row.id}>
            {row.name}
          </option>
        ))}
      </select>
      {error && !isNotShowErrMsg && <p className="text-red-500 text-xs mt-2">{(error as any).message?.toString()}</p>}
    </div>
  );
};

export default DropdownComponent;
