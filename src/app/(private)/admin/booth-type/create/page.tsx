'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormBoothType, IBoothTypeCreate } from '@/schema/BoothType';
import {
  createBoothType,
  findBoothTypeById,
  updateBoothTypeById,
} from '@/service/booth-type';
import { InputText, TextArea } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

import Checkbox from '../../../../../core/components/Checkbox/index';

const Page = () => {
  const id = useSearchParams().get('id') ?? null; // default value is "1"
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(FormBoothType),
    defaultValues: { isActive: true },
  });
  const { handleSubmit, setValue } = methods;

  const submitForm = (value: IBoothTypeCreate) => {
    const request = id
      ? updateBoothTypeById(id, value)
      : createBoothType(value);
    request
      .then(() => {
        router.push('/admin/booth-type/');
      })
      .catch((err: any) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (id) {
      findBoothTypeById(id).then(res => {
        setValue('name', res.name);
        setValue('isActive', res.isActive);
        setValue('description', res.description);
        setValue('price', res.price);
      });
    }
  }, [id]);

  return (
    <div>
      <h2 className="text-3xl">All Booth Type</h2>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-2 mt-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="grid grid-cols-2 gap-4">
            <InputText name="name" label="Name" />
            <InputText name="price" label="Price" />
          </div>
          <TextArea name="description" label="Description" />
          <Checkbox name="isActive" label="Active" />
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add Event
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
