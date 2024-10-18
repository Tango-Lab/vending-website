import { TypeCurrency } from '@/@types/currency';
import { IPaginationParam } from './Pagination';
import { IMachineLocation, VendingMachine } from './VendingMachine';

export interface OrderListParam extends IPaginationParam {
  machine?: number | null;
}

export interface IOrder {
  _id: string;
  machine: IOrderVendingMachine;
  serialNo: string;
  orderNo: string;
  ip: string;
  totalAmount: number;
  currency: TypeCurrency;
  orderStatus: number;
  paymentStatus: number;
  note: string;
  items: Item[];
  createdAt: string;
  updateAt: string;
  __v: number;
  payments: Payment[];
  id: string;
}

export interface IOrderVendingMachine extends VendingMachine {
  location: IMachineLocation;
  contactPerson: string;
}

export interface Item {
  product: Product;
  slotNo: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  _id: string;
}

export interface Product {
  name: string;
  type: string;
  imageUrl: string;
  id: string;
}

export interface Payment {
  _id: string;
  order: string;
  paymentMethod: number;
  status: number;
  paymentInfo: PaymentInfo;
  paymentTimestamp: string;
  transactionNo: string;
}

export interface PaymentInfo {
  hash: string;
  fromAccountId: string;
  toAccountId: string;
  currency: string;
  amount: number;
  description: string;
  createdDateMs: number;
  acknowledgedDateMs: number;
  externalRef: string;
  _id: string;
}

export interface ICancelOrderParm {
  machine: string;
  serialNo: string;
  orderNo: string;
}
