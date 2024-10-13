import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface InputPasswordTypeProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const InputPassword = (props: InputPasswordTypeProps) => {
  const { name, label } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        className="bg-gray-50 w-full border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 p-2.5"
        type="password"
        {...props}
        {...register(name)}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-2">{errors[name].message?.toString()}</p>}
    </div>
  );
};

export default InputPassword;
