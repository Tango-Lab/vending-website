import * as yup from 'yup';

import { IPaginationParam } from '@/models/Pagination';

export interface EventListingFilterParam extends IPaginationParam {
  name?: string;
}

export interface IEventList extends IEvents {
  id: string;
}

export interface IEvents {
  name: string;
  description: string;
  startFrom: string;
  endDate: string;
  email: string;
  location: string;
  phoneNumber: string;
  isActive: boolean;
  floorPlanUrl: string;
  mainWebsiteUrl: string;
  logoUrl: string;
}

// Define a validation schema with Yup
export const EventCreateFormSchema = yup.object().shape({
  name: yup.string().required('Event name is required'),
  description: yup.string().optional().default(null),
  logoUrl: yup.string().optional().default(null),
  floorPlanUrl: yup.string().optional().default(null),
  mainWebsiteUrl: yup.string().optional().default(null),
  startFrom: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  email: yup.string().email('Invalid email').optional().default(null),
  location: yup.string().required(),
  phoneNumber: yup.string().optional().default(null),
  isActive: yup.boolean().optional().default(null),
});