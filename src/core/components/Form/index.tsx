import React from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

export interface FormTypeProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  children: React.ReactNode;
  classNames?: string;
  onSubmit?: (data: T) => void;
}

const Form = <T extends FieldValues>(props: FormTypeProps<T>) => {
  const { children, methods, onSubmit, classNames } = props;
  const { handleSubmit } = methods;

  const onSubmitForm = (data: T) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={classNames} onSubmit={handleSubmit(onSubmitForm)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
