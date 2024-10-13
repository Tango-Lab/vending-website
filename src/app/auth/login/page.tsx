'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { handleSubmitLogin } from '@/actions/Authentication';
import { useAuthContext } from '@/context/AuthContext';
import { IAuthLogin, LoginSchema } from '@/schema';
import { Button, Form, InputPassword, InputText } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
  const router = useRouter();
  const { onRefresh, isFetchingProfile } = useAuthContext();
  const methods = useForm({ resolver: yupResolver(LoginSchema) });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: IAuthLogin) => {
    setLoading(true);
    handleSubmitLogin(data)
      .then(() => {
        setLoading(false);
        onRefresh();
        router.push('/admin/dashboard');
      })
      .catch((err) => {
        console.log(err);
        setError('Invalid Password');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isFetchingProfile) {
    return <></>;
  }

  return (
    <div className="border border-gray-200 bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <Form classNames="space-y-4 md:space-y-6" methods={methods} onSubmit={onSubmit}>
              <InputText name="username" label="Email" placeholder="Enter Your Email." />
              <div>
                <InputPassword name="password" label="Password" placeholder="*********" />
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
              <Button disabled={loading} className="w-full" type="submit">
                {loading ? 'Loading...' : 'Sign In'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
