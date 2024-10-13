import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface InputTypeProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  isNotShowErrMsg?: boolean;
  disableSpecialChars?: boolean;
}

const InputText: React.FC<InputTypeProps> = (props: InputTypeProps) => {
  const { name, label, disabled, placeholder, isNotShowErrMsg = false, disableSpecialChars = false } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  const error = name.split('.').reduce((acc, part) => (acc as any)?.[part], errors);

  const ctxClass = classNames({
    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700': error,
    'bg-gray-50 border-gray-300 text-gray-900': !error,
  });

  // Function to handle input and prevent special characters
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9\s]*$/; // Alphanumeric characters and spaces
    if (disableSpecialChars && !regex.test(e.key)) {
      e.preventDefault(); // Prevent keypress if not allowed
    }
  };

  return (
    <div>
      {label && <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>}
      <input
        className={classNames(ctxClass, 'w-full border font-medium  rounded-lg p-2.5')}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...register(name)}
      />
      {error && !isNotShowErrMsg && <p className="text-red-500 text-xs mt-2">{(error as any).message?.toString()}</p>}
    </div>
  );
};

export default InputText;
