import { IMachineProductDetail, IMachineProductForm, IVendingMachineSlotForm } from '@/models/MachineProduct';
import { DELETEWithToken, POSTWithToken, PUTWithToken } from '@Core';

export function addProductToMachineSlot(data: IVendingMachineSlotForm): Promise<IMachineProductDetail> {
  const API_URL = '/api/machine-slots/v1/create';
  return POSTWithToken<IMachineProductDetail, IVendingMachineSlotForm>(API_URL, data);
}
export function updateProductToMachineSlotById(
  id: string,
  data: IVendingMachineSlotForm
): Promise<IMachineProductDetail> {
  const API_URL = '/api/machine-slots/v1/' + id;
  return PUTWithToken<IMachineProductDetail, IVendingMachineSlotForm>(API_URL, data, {});
}

export function addProductBatchToMachine(data: IMachineProductForm[]): Promise<IMachineProductDetail> {
  const API_URL = '/api/machine-slots/v1/create-batch';
  return POSTWithToken<IMachineProductDetail, IMachineProductForm[]>(API_URL, data);
}

export function deletedOneById(id: string): Promise<void> {
  const API_URL = '/api/machine-slots/v1/' + id;
  return DELETEWithToken<void, {}>(API_URL);
}
