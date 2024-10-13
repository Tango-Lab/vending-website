import { IPagination, IPaginationParam } from '@/models/Pagination';
import { IBootTypeList } from '@/schema/BoothType';
import { GETWithToken, POSTWithToken, PUTWithToken } from '@Core';

import { IBoothTypeCreate } from '../schema/BoothType';

export function getAllBoothType(pagination: IPaginationParam): Promise<IPagination<IBootTypeList>> {
  const API_URL = '/api/booth-types/v1/list';
  return GETWithToken<IPagination<IBootTypeList>, IPaginationParam>(API_URL, pagination);
}

export function getAllBoothTypeAutoComplete(): Promise<IBootTypeList[]> {
  const API_URL = '/api/booth-types/v1/autocomplete';
  return GETWithToken<IBootTypeList[]>(API_URL, {});
}

export function findBoothTypeById(id: string): Promise<IBootTypeList> {
  const API_URL = '/api/booth-types/v1/' + id;
  return GETWithToken<IBootTypeList, {}>(API_URL, {});
}

export function createBoothType(data: IBoothTypeCreate): Promise<IBootTypeList> {
  const API_URL = '/api/booth-types/v1/create';
  return POSTWithToken<IBootTypeList, IBoothTypeCreate>(API_URL, data);
}

export function updateBoothTypeById(id: string, data: IBoothTypeCreate): Promise<IBootTypeList> {
  const API_URL = '/api/booth-types/v1/' + id;
  return PUTWithToken<IBootTypeList, IBoothTypeCreate>(API_URL, data);
}
