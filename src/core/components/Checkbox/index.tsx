import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface CheckboxTypeProps {
  name: string;
  label?: string;
}

const Checkbox = (props: CheckboxTypeProps) => {
  const { name, label } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  return (
    <label className="flex items-center" htmlFor={name}>
      <input type="checkbox" {...register(name)} />
      {label && (
        <div className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </div>
      )}
    </label>
  );
};

export default Checkbox;
