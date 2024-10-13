import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface DatePickerTypeProps {
  name: string;
  placeholder?: string;
  label?: string;
}

const DatePicker = (props: DatePickerTypeProps) => {
  const { label, name } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  const error = name
    .split('.')
    .reduce((acc, part) => (acc as any)?.[part], errors);

  const ctxClass = classNames({
    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700': error,
    'bg-gray-50 border border-gray-300 text-gray-900': !error,
  });

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        className={classNames(ctxClass, 'block p-2.5 w-full rounded-lg')}
        type="date"
        placeholder={props.placeholder}
        {...register(name)}
      />
      {error && (
        <p className="text-red-500 text-xs mt-2">
          {(error as any).message?.toString()}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
