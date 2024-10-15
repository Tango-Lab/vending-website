import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { formatDateForForm } from '@/helper/format-date';
import { ProductAutoComplete } from '@/models/Product';
import { MachineProduct } from '@/models/VendingMachine';
import { AddProductSlotFormSchema } from '@/schema/MachineProduct';
import { addProductToMachineSlot, updateProductToMachineSlotById } from '@/service/machine-product';
import { getProductAutoComplete } from '@/service/product';
import { Button, Datepicker, Dropdown, Form, InputText, message, TextArea, useApi } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

import { IVendingMachineSlotForm } from '../../../models/MachineProduct';

export interface TypeProps {
  formValue?: MachineProduct | null;
  machineId: string;
  lastSlotNo?: string;
  onSuccessSubmit?: () => void;
  closeForm?: () => void;
}

export const AddMachineProductForm = (props: TypeProps) => {
  const { machineId, lastSlotNo = '01', closeForm, onSuccessSubmit, formValue } = props;
  const [productList, setProductsList] = useState<ProductAutoComplete[]>([]);
  const [loading, setLoading] = useState(false);

  // API
  const { response } = useApi({
    service: getProductAutoComplete,
    params: {},
    effects: [],
  });

  useEffect(() => {
    if (formValue?._id) {
      setValue('product', formValue.product._id);
      trigger('product');
      setValue('price', formValue.price);
      setValue('slotNo', formValue.slotNo);
      setValue('quantity', formValue.quantity);
      setValue('capacity', formValue.capacity);
      setValue('lastRestock', formatDateForForm(formValue.lastRestock));
      setValue('productExpirationDate', formatDateForForm(formValue.productExpirationDate));
    }
    if (response?.length) {
      setProductsList(response);
    }
  }, [response, formValue]);

  const methods = useForm<IVendingMachineSlotForm>({
    defaultValues: { machine: machineId },
    resolver: yupResolver(AddProductSlotFormSchema),
  });

  const { setValue, trigger } = methods;
  const id = formValue?._id;

  const onSubmitForm = (data: IVendingMachineSlotForm) => {
    setLoading(true);
    formSubmitAction(data)
      .then(() => {
        message.success('Saved successfully.!');
        setLoading(false);
        if (onSuccessSubmit) {
          onSuccessSubmit();
        }
      })
      .catch((error) => {
        alert(error?.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formSubmitAction = (data: IVendingMachineSlotForm) => {
    const action = id ? updateProductToMachineSlotById(id, data) : addProductToMachineSlot(data);
    return action.catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div>
      <div className="border-b-2 mb-9">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Product</h2>
      </div>
      <Form classNames="flex flex-col gap-4 w-full" methods={methods} onSubmit={onSubmitForm}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Dropdown name="product" label="Select Product" items={productList} />
            <InputText name="price" label="Price Per Item" placeholder="10" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <InputText name="slotNo" label="Vending Slot" placeholder={`Last Slot: ${lastSlotNo}`} />
            <InputText name="quantity" label="Slot Quantity" placeholder="10" />
            <InputText name="capacity" label="Slot Capacity" placeholder="25" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Datepicker name="lastRestock" label="Restock At" placeholder="25" />
            <Datepicker name="productExpirationDate" label="Expiration At" placeholder="25" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputText name="sensorData" label="Sensor Data" />
            <InputText name="sensorAddress" label="Sensor Address" />
          </div>

          <TextArea name="note" label="Note" placeholder="Type Something Here.!" />
        </div>
        <div className="flex justify-between">
          <Button theme="light" onClick={closeForm}>
            Close
          </Button>
          <Button disabled={loading} type="submit">
            {loading ? 'Processing' : 'Save & Close'}
          </Button>
        </div>
      </Form>
    </div>
  );
};
