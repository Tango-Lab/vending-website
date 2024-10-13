'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ProductTypeList } from '@/constants/products';
import { IProductForm } from '@/models/Product';
import { ProductCreateForm } from '@/schema/Product';
import { createProduct, getProductById, updateProductById } from '@/service/product';
import { Button, Checkbox, Dropdown, Form, InputText, Upload } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: { isActive: true },
    resolver: yupResolver(ProductCreateForm),
  });
  const { setValue, trigger } = methods;
  const id = useSearchParams().get('id') ?? null; // default value is "1"

  const onSubmit = (data: IProductForm) => {
    formSubmitAction(data).then(() => {
      router.push('/admin/product');
    });
  };

  const formSubmitAction = (data: IProductForm) => {
    const action = id ? updateProductById(id, data) : createProduct(data);
    return action.catch((err) => {
      alert(err.message);
    });
  };

  useEffect(() => {
    if (id) {
      getProductById(id).then((res) => {
        setValue('name', res.name);
        setValue('type', res.type);
        setValue('price', res.price);
        setValue('code', res.code);
        setValue('isActive', res.isActive);
        setValue('barCode', res.barCode);
        setValue('imageUrl', res.imageUrl);
        trigger('imageUrl');
      });
    }
  }, [id]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create Product</h2>
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 grid-flow-col gap-4">
            <InputText name="name" placeholder="Ex: Coca Cola" label="Product Name" />
            <InputText name="code" label="Product Code" placeholder="Ex: 111111" />
            <InputText name="barCode" label="Bar Code" placeholder="Ex: 555666777888" />
          </div>
          <div className="grid grid-cols-3 grid-flow-col gap-4">
            <InputText name="price" placeholder="Ex: 4.99" label="Product Name" />
            <Dropdown name="type" label="Product Type" items={ProductTypeList} />
          </div>
          <div className="col-span-2">
            <Upload name="imageUrl" label="Image URL" />
          </div>
          <Checkbox name="isActive" label="Is Active" />
        </div>
        <Button className="mt-4" type="submit">
          Save & Close
        </Button>
      </Form>
    </div>
  );
};

export default Page;
