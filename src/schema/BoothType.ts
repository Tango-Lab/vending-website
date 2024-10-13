import * as yup from 'yup';

export interface IBootTypeList extends IBootType {
  id: string;
}

export interface IBootType {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Define a validation schema with Yup
export const FormBoothType = yup.object().shape({
  name: yup.string().required('Booth name is required'),
  description: yup.string().optional().default(null),
  price: yup.number().required('Price is required'),
  isActive: yup.boolean().optional().default(true),
});

export interface IBoothTypeCreate {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}
