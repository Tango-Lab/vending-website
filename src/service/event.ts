import { IPagination } from '@/models/Pagination';
import { EventListingFilterParam, IEventList, IEvents } from '@/schema/Event';
import { GETWithToken, POSTWithToken, PUTWithToken } from '@Core';

export function createEvent(param: IEvents): Promise<IEvents> {
  const API_URL = '/api/events/v1/create';
  return POSTWithToken<IEvents, IEvents>(API_URL, param);
}

export function updateEventById(id: string, param: IEvents): Promise<IEvents> {
  const API_URL = '/api/events/v1/' + id;
  return PUTWithToken<IEvents, IEvents>(API_URL, param);
}

export function getAllEvent(param: EventListingFilterParam): Promise<IPagination<IEventList>> {
  const API_URL = '/api/events/v1/list';
  return GETWithToken<IPagination<IEventList>, EventListingFilterParam>(API_URL, param);
}

export function getEventById(id: string): Promise<IEventList> {
  const API_URL = '/api/events/v1/' + id;
  return GETWithToken<IEventList, {}>(API_URL, {});
}

export function getAllEventAutoComplete(): Promise<IEventList[]> {
  const API_URL = '/api/events/v1/autocomplete';
  return GETWithToken<IEventList[]>(API_URL, {});
}