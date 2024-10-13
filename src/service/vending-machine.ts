import { ListItemType } from '@/core/components/Dropdown';
import { IPagination } from '@/models/Pagination';
import {
  IMachineFilterParam,
  IVendingMachineForm,
  VendingMachine,
  VendingMachineDetail,
} from '@/models/VendingMachine';
import { GET, GETWithToken, POSTWithToken, PUTWithToken } from '@Core';

export function getAllVendingMachines(params: IMachineFilterParam): Promise<IPagination<VendingMachine>> {
  const API_URL = '/api/machines/v1/list';
  return GETWithToken<IPagination<VendingMachine>, IMachineFilterParam>(API_URL, params);
}

export function getMachineDetailByID(id: string): Promise<VendingMachineDetail> {
  const API_URL = '/api/machines/v1/' + id;
  return GET<VendingMachineDetail>(API_URL, {});
}

export function getMachineAutoComplete(): Promise<ListItemType[]> {
  const API_URL = '/api/machines/v1/autocomplete';
  return GET<ListItemType[]>(API_URL, {});
}

export function createVendingMachine(data: IVendingMachineForm): Promise<VendingMachine> {
  const API_URL = '/api/machines/v1/create';
  return POSTWithToken<VendingMachine, IVendingMachineForm>(API_URL, data);
}

export function updateVendingMachineByID(id: string, data: IVendingMachineForm): Promise<VendingMachine> {
  const API_URL = '/api/machines/v1/' + id;
  return PUTWithToken<VendingMachine, IVendingMachineForm>(API_URL, data, {});
}
