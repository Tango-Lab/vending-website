import { PowerStatusType } from '@/constants/device';

import { ConnectivityType } from '../constants/device';
import { IProductFilterParam, IProductFormDetail } from './Product';

export type VendingMachineList = VendingMachine[];
export type IMachineFilterParam = IProductFilterParam;

export interface VendingMachine {
  products: string[];
  name: string;
  capacity: string;
  lastRestocked: string;
  description: string;
  installationDate: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  serialNo: string;
  device: IDevice;
  state: boolean;
  id: string;
}

export interface IDevice {
  ip: string | null;
  modelNo: string | null;
  serialNo: string | null;
  connectivityStatus: ConnectivityType;
  powerStatus: PowerStatusType;
  temperatureSensor: string | null;
}

export interface VendingMachineDetail {
  name: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
  _id: string;
  installationDate: string | null;
  capacity: number;
  lastRestocked: string | null;
  contactPerson: string;
  location: IMachineLocation;
  device: IDevice;
  createdBy: string;
  state: number;
  slots: MachineProduct[];
}

export interface IMachineLocation {
  name: string;
  latitude: number | null;
  longitude: number | null;
}

export interface IVendingMachineForm {
  name: string;
  capacity: number;
  installationDate: string | null;
  lastRestocked: string | null;
  contactPerson: string;
  note: string | null;
  location: IMachineLocation;
  device: IDevice;
}

export interface MachineProduct {
  slotNo: string;
  quantity: number;
  availableQuantity: number;
  price: number;
  machine: string;
  product: IProductFormDetail;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  _id: string;
  capacity: number;
  lastRestock: string | null;
  productExpirationDate: string | null;
  sensorData: string | null;
  sensorAddress: string | null;
  note: string | null;
}
