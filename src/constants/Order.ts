import { formatOrderStatus } from '@/helper/format-status';

export const ORDER_STATUS_PENDING = 1;
export const ORDER_STATUS_COMPLETED = 2;
export const ORDER_STATUS_CANCEL = 3;

export const STATUS_LIST = [
  {
    id: String(ORDER_STATUS_PENDING),
    name: 'Pending',
  },
  {
    id: String(ORDER_STATUS_COMPLETED),
    name: 'Completed',
  },
  {
    id: String(ORDER_STATUS_CANCEL),
    name: 'Cancelled',
  },
];
