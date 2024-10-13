import * as order from '@/constants/Order';
import * as payment from '@/constants/Payment';
import { State } from '@/enums/State';

export function formatState(state: State): string {
  const stateLabels: Record<State, string> = {
    [State.Active]: 'Active',
    [State.DeActive]: 'DeActive',
  };
  return stateLabels[state] || '';
}

export const formatOrderStatus = (status: number) => {
  switch (status) {
    case order.ORDER_STATUS_PENDING:
      return 'Pending';
    case order.ORDER_STATUS_COMPLETED:
      return 'Completed';
    case order.ORDER_STATUS_CANCEL:
      return 'Canceled';
    default:
      return '';
  }
};

export const formatPaymentStatus = (status: number) => {
  switch (status) {
    case payment.PAYMENT_STATUS_PENDING:
      return 'Pending';
    case payment.PAYMENT_STATUS_COMPLETED:
      return 'Paid';
    case payment.PAYMENT_STATUS_FAILED:
      return 'Failed';
    default:
      return '';
  }
};

export const formatPaymentMethod = (method: number) => {
  switch (method) {
    case payment.PAYMENT_METHOD_CASH:
      return 'Cash';
    case payment.PAYMENT_METHOD_CARD:
      return 'Card';
    case payment.PAYMENT_METHOD_MOBILE:
      return 'Mobile Payment';
    case payment.PAYMENT_METHOD_BAKONG_QRCODE:
      return 'Bakong QR Code';
    default:
      return '';
  }
};
