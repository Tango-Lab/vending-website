import { IPagination } from '@/models/Pagination';
import { EventListingFilterParam } from '@/schema/Event';
import { IExhibitor } from '@/schema/Exhibition';
import { GETWithToken, POSTWithToken, PUTWithToken } from '@Core';

export function getExhibitionById(id: string): Promise<IExhibitor> {
  const API_URL = '/api/exhibition/v1/' + id;
  return GETWithToken<IExhibitor>(API_URL, {});
}

export function createExhibition(param: IExhibitor): Promise<IExhibitor> {
  const API_URL = '/api/exhibition/v1/create';
  return POSTWithToken<IExhibitor>(API_URL, param);
}

export function getAllExhibition(
  param: EventListingFilterParam
): Promise<IPagination<IExhibitor>> {
  const API_URL = '/api/exhibition/v1/list';
  return GETWithToken<IPagination<IExhibitor>, EventListingFilterParam>(
    API_URL,
    param
  );
}

export function updateExhibition(
  id: string,
  param: EventListingFilterParam
): Promise<IPagination<IExhibitor>> {
  const API_URL = '/api/exhibition/v1/' + id;
  return PUTWithToken<IPagination<IExhibitor>, EventListingFilterParam>(
    API_URL,
    param
  );
}
