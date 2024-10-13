import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface TextAreaTypeProps {
  name: string;
  placeholder?: string;
  label?: string;
  rows?: number;
}

const TextArea = (props: TextAreaTypeProps) => {
  const { placeholder, label, name, rows = 5 } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

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
      <textarea
        placeholder={placeholder}
        className="block p-2.5 w-full rounded-lg border border-gray-300"
        rows={rows}
        {...register(name)}
      ></textarea>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-2">
          {errors[name].message?.toString()}
        </p>
      )}
    </div>
  );
};

export default TextArea;
