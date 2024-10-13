'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IValidatingEmail, ValidateEmail } from '@/schema';
import { emailIsValid } from '@/service/authentication';
import { Button, Form, InputText } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [disabled, setIsDisabled] = useState<boolean>(false);
  const methods = useForm({
    resolver: yupResolver(ValidateEmail),
  });
  const { setError } = methods;

  const onValidatingEmail = (data: IValidatingEmail) => {
    setIsDisabled(true);
    emailIsValid(data)
      .then(({ isValid }) => {
        if (!isValid) {
          setError('email', { message: 'Email has register.' });
        }
        setIsDisabled(false);
      })
      .catch(() => {
        setIsDisabled(false);
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Your Account
            </h2>
            <Form
              classNames="flex flex-col gap-4"
              methods={methods}
              onSubmit={onValidatingEmail}
            >
              <InputText
                name="email"
                label="Email"
                disabled={disabled}
                placeholder="exmaple@gmail.com"
              />
              <Button disabled={disabled} type="submit">
                Continue
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
