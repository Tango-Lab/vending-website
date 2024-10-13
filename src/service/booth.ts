import { IPagination } from '@/models/Pagination';
import { IBoothForm, IBootList } from '@/schema/Booth';
import { GETWithToken, POSTWithToken, PUTWithToken } from '@Core';

export function createBooth(param: IBoothForm): Promise<IBootList> {
  const API_URL = '/api/booths/v1/create';
  return POSTWithToken<IBootList, IBoothForm>(API_URL, param);
}

export function findBoothOneId(id: string): Promise<IBootList> {
  const API_URL = '/api/booths/v1/' + id;
  return GETWithToken<IBootList, any>(API_URL, {});
}

export function updateBoothByID(
  id: string,
  param: IBoothForm
): Promise<IBootList> {
  const API_URL = '/api/booths/v1/' + id;
  return PUTWithToken<IBootList, IBoothForm>(API_URL, param);
}

export function getAllBooths(): Promise<IPagination<IBootList>> {
  const API_URL = '/api/booths/v1/list';
  return GETWithToken<IPagination<IBootList>, {}>(API_URL, {});
}
