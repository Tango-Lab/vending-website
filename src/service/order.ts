import { ICancelOrderParm, IOrder, OrderListParam } from '@/models/Order';
import { IPagination } from '@/models/Pagination';
import { GETWithToken, POST, POSTWithToken } from '@Core';

export function getAllOrders(param: OrderListParam): Promise<IPagination<IOrder>> {
  const API_URL = '/api/orders/v1/admin/list';
  return GETWithToken<IPagination<IOrder>, any>(API_URL, param);
}

export function getOrderById(id: string): Promise<IOrder> {
  const API_URL = '/api/orders/v1/admin/' + id;
  return GETWithToken<IOrder>(API_URL, {});
}

export function cancelOrder(param: ICancelOrderParm): Promise<void> {
  const API_URL = '/api/orders/v1/cancel/';
  return POST<void>(API_URL, param);
}
