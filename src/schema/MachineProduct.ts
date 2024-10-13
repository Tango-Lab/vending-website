import * as yup from 'yup';

import { IVendingMachineSlotForm } from '@/models/MachineProduct';

// Define a validation schema with Yup
export const AddProductSlotFormSchema = yup.object<IVendingMachineSlotForm>().shape({
  slotNo: yup.string().required('Slot Order No is required'),
  price: yup
    .number()
    .required('Price is required')
    .default(0)
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .moreThan(0, 'Price should be a positive number'),
  quantity: yup.number()
    .required()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .default(0)
    .min(1, 'Quantity should be at least 1'),
  capacity: yup.number()
    .required()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .default(0)
    .min(1, 'Capacity should be at least 1'),
  createdAt: yup.string().nullable().default(null),
  lastRestock: yup.string().nullable().default(null),
  productExpirationDate: yup.string().nullable().default(null),
  sensorData: yup.string().nullable().default(null),
  sensorAddress: yup.string().nullable().default(null),
  note: yup.string().nullable().default(null),
  //
  machine: yup.string().required(), // Assuming machine ID as a string
  product: yup.string().required(), // Assuming product ID as a string
});