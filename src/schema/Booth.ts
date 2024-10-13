import * as yup from 'yup';

import { IBootTypeList } from './BoothType';
import { IEventList } from './Event';

export interface IBootList extends IBooth {
  id: string;
}

export interface IBooth {
  isActive: boolean
  boothNumber: string
  hall: string
  size: string
  mapUrl: string
  exhibitor?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  id: string
  event?: IEventList;
  boothType?: IBootTypeList;
}

export interface IBoothForm {
  boothNumber: string;
  size: string;
  hall: string;
  event: string;
  boothType: string;
  mapUrl: string;
  isActive: boolean;
}

// Define a validation schema with Yup
export const FormBooth = yup.object().shape({
  boothNumber: yup.string().required('This field is required'),
  size: yup.string().required('This field is required'),
  hall: yup.string().required('This field is required'),
  event: yup.string().required('Event is required'),
  boothType: yup.string().required('Boot Type is required'),
  mapUrl: yup.string().optional().default(null),
  isActive: yup.boolean().optional().default(true),
});

export interface IBoothTypeCreate {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}
