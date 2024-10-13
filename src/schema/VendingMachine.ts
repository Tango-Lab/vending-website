import * as yup from 'yup';

import {
    CONNECTIVITY_STATUS_LIST, ConnectivityType, POWER_STATUS_LIST, PowerStatusType
} from '@/constants/device';

const connectivityIds: ConnectivityType[] = CONNECTIVITY_STATUS_LIST.map(({ id }) => id);
const powerStatusIds: PowerStatusType[] = POWER_STATUS_LIST.map(({ id }) => id);

// Define a validation schema with Yup
export const VendingMachineForm = yup.object().shape({
  name: yup.string().required('Name is required'),
  capacity: yup.number().required().positive().integer(),
  installationDate: yup.string().nullable().default(null),
  lastRestocked: yup.string().nullable().default(null),
  contactPerson: yup.string().required('Name is required'),
  note: yup.string().nullable().default(null),

  // Location
  location: yup.object().shape({
    name: yup.string().required('Location is required'),
    latitude: yup.number().nullable().transform((value, originalValue) => (originalValue === '' ? null : value)).default(null),
    longitude: yup.number().nullable().transform((value, originalValue) => (originalValue === '' ? null : value)).default(null),
  }).required(),

  device: yup.object().shape({
    ip: yup.string().nullable().default(null),
    modelNo: yup.string().nullable().default(null),
    serialNo: yup.string().nullable().default(null),
    connectivityStatus: yup.string<ConnectivityType>().oneOf(connectivityIds).required(),
    powerStatus: yup.string<PowerStatusType>().oneOf(powerStatusIds).required(),
    temperatureSensor: yup.string().nullable().default(null),
  }).required(),
});