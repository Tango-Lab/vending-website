'use client';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface InputTagsTypeProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const InputTag = (props: InputTagsTypeProps) => {
  const { name, label, placeholder } = props;
  const {
    register,
    getValues,
    watch,
    setValue: setFormContextValue,
  } = useFormContext();
  const defaultValue = getValues(name);

  const [value, setValue] = useState<string>('');
  const [items, setItem] = useState<string[]>(watch(name) || []);

  const onClickDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItem(newItems);
    emitFormValue(newItems);
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newItems = [...items, value];
      if (value) {
        setItem(newItems);
      }

      emitFormValue(newItems);
      setValue(''); // Clear the input after pressing Enter
    }
  };

  function emitFormValue(items: string[]) {
    setFormContextValue(name, items);
  }

  useEffect(() => {
    register(name);
  }, [register, name]);

  useEffect(() => {
    setItem(defaultValue ?? []);
  }, [defaultValue]);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="flex flex-column border gap-2 border-gray-300 rounded-lg p-2.5">
        <ul className="flex flex-column flex-wrap gap-2">
          {items.map((tag, idx) => {
            return (
              <div
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs gap-4 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                key={idx}
                onClick={() => onClickDelete(idx)}
              >
                {tag}
              </div>
            );
          })}
        </ul>
        <input
          onChange={onChangeText}
          type="text"
          className="w-full"
          value={value}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default InputTag;
