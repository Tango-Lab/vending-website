import * as yup from 'yup';

export interface IExhibitor {
  id?: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  logoUrl: string;
  contact: IContact;
  location: ILocation;
  isActive: boolean;
  socials: ISocials[];
  attachments: Attachments[];
  //
  createdBy: string;
  createdAt: string;
}

export interface ILocation {
  country: string;
  city: string;
  state: string;
  postalCode: string;
  addressOne: string;
  addressTwo: string;
}

export interface IContact {
  name: string;
  phoneNumber: string;
  vatNumber: string;
  email: string;
}

export interface ISocials {
  type: string; // EX: FACEBOOK ; WEBSITE; INSTAGRAM ...etc
  url: string;
}

export interface Attachments {
  type: string; // EX: VIDEO; IMAGE; FILE; ..etc
  url: string;
}

// Define a validation schema with Yup
export const LoginSchema = yup.object().shape({
  name: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const locationSchema = yup.object().shape({
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  postalCode: yup.string().required('Postal Code is required'),
  addressOne: yup.string().required('Address One is required'),
  addressTwo: yup.string().nullable(),
});

const contactSchema = yup.object().shape({
  name: yup.string().required('Contact name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  vatNumber: yup.string().required('VAT number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const socialsSchema = yup.object().shape({
  type: yup.string().required('Social type is required'),
  url: yup.string().url('Invalid URL').optional(),
});

// Main IExhibitor schema
export const ExhibitorSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('Name is required'),
  description: yup.string().optional(),
  category: yup.string().required('Category is required'),
  tags: yup.array().of(yup.string()).required('Tags are required'),
  logoUrl: yup
    .string()
    .url('Invalid logo URL')
    .required('Logo URL is required'),
  contact: contactSchema.required('Contact is required'),
  location: locationSchema.required('Location is required'),
  socials: yup.array().of(socialsSchema).required('Socials are required'),
});
