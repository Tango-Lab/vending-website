export interface IMachineProductForm {
  machine: string;
  slotNo: string;
  quantity: number;
  price: number;
  product: string;
}

export interface IMachineProductDetail extends IMachineProductForm {
  machines: any[];
  createdAt: string;
  updatedAt: string;
  id: string;
  _id: string;
}

export interface IVendingMachineSlotForm {
  slotNo: string;
  price: number;
  availableQuantity: number;
  quantity: number;
  capacity: number;
  lastRestock: string | null;
  createdAt: string | null;
  productExpirationDate: string | null;
  sensorData: string | null;
  sensorAddress: string | null;
  note: string | null;
  isActive: boolean;
  machine: string; // Assuming machine ID as a string
  product: string; // Assuming product ID as a string
}
