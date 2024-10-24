import { TotalAmount } from '@/app/(private)/admin/dashboard/page';
import { GETWithToken } from '@/core';
import { IAmountParams } from '@/models/Dashboards';

export function getTotalAmount(param: IAmountParams): Promise<TotalAmount> {
  const API_URL = '/api/dashboards/v1/revenue';
  return GETWithToken<TotalAmount, any>(API_URL, param);
}
