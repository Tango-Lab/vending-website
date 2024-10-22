'use client';
import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import * as orderConstant from '@/constants/Order';
import * as payment from '@/constants/Payment';

import { useRouter } from 'next/navigation';

import { formatOrderStatus, formatPaymentMethod, formatPaymentStatus } from '@/helper/format-status';

import { IOrder, PaymentInfo } from '@/models/Order';
import { cancelOrder, getOrderById } from '@/service/order';
import { formatCurrencyWithSymbol } from '@/helper/format-number';
import { Button } from '@Core';
import { MdArrowRight } from 'react-icons/md';
import { formatDateForForm, formatDisplayDate } from '@/helper/format-date';

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [refresh, setIsRefresh] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    if (id) {
      getOrderById(id)
        .then((res) => {
          if (res) {
            setOrder(res);
            if (res.payments.length) {
              setPaymentInfo(res.payments[0]?.paymentInfo);
            }
          }
        })
        .catch(() => {
          router.replace('/404'); // Redirect to 404 on error
        });
    }
  }, [id, refresh]);

  if (!order) {
    return <></>;
  }

  function getStatusClass(statusOrder: number) {
    switch (statusOrder) {
      case orderConstant.ORDER_STATUS_PENDING:
        return 'text-yellow-600 bg-yellow-100 px-3 rounded-lg py-1';
      case orderConstant.ORDER_STATUS_COMPLETED:
        return 'text-green-600 bg-green-100 px-3 rounded-lg py-1';
      case orderConstant.ORDER_STATUS_CANCEL:
        return 'text-red-600 bg-red-100 px-3 rounded-lg py-1';
      default:
        return 'text-gray-600 bg-gray-100 px-3 rounded-lg py-1';
    }
  }

  const orderStatus = (status: number) => (
    <span className={classNames(getPaymentStatusClass(status), 'text-sm')}>Order {formatOrderStatus(status)}</span>
  );

  const paymentStatus = (status: number) => (
    <span className={classNames(getStatusClass(status), 'text-sm')}>{formatPaymentStatus(status)}</span>
  );

  function getPaymentStatusClass(statusOrder: number) {
    switch (statusOrder) {
      case payment.PAYMENT_STATUS_PENDING:
        return 'text-yellow-600 bg-yellow-100 px-3 rounded-lg py-1';
      case payment.PAYMENT_STATUS_COMPLETED:
        return 'text-green-600 bg-green-100 px-3 rounded-lg py-1';
      case payment.PAYMENT_STATUS_FAILED:
        return 'text-red-600 bg-red-100 px-3 rounded-lg py-1';
      default:
        return 'text-gray-600 bg-gray-100 px-3 rounded-lg py-1';
    }
  }

  const onClickCancel = () => {
    const machine = order.machine;
    const serialNo = machine?.device.serialNo;

    if (serialNo && order) {
      if (confirm('Do you want to cancel this order')) {
        setCancelling(true);
        const param = { machine: machine.id, orderNo: order.orderNo, serialNo };
        cancelOrder(param)
          .then(() => {
            setIsRefresh(true);
            setCancelling(true);
            alert('Ordered has cancelled successfully');
          })
          .catch((err) => {
            alert(err.message);
          })
          .finally(() => {
            setCancelling(false);
          });
      }
    }
  };

  return (
    <div>
      {order && (
        <div
          key={order.id}
          className="rounded-lg mx-auto px-0 lg:px-5 flex-wrap text-sm text-gray-600 lg:text-base max-w-[600px] lg:max-w-full"
        >
          <h2 className="py-3 text-start flex items-start justify-center gap-x-5 gap-y-2 flex-col lg:flex-row lg:justify-start lg:items-center">
            <span className="text-xl font-bold text-gray-900">Order No: {order.orderNo}</span>
            <div className="flex gap-x-5">
              {orderStatus(order.orderStatus)}
              {paymentStatus(order.paymentStatus)}
            </div>
            {order.orderStatus === orderConstant.ORDER_STATUS_PENDING && (
              <Button onClick={onClickCancel} disabled={cancelling} theme="light">
                Cancel
              </Button>
            )}
          </h2>
          <div className="mb-5">
            <span>Order created: </span>
            <span className="text-sm">{formatDateForForm(order.createdAt, 'DD MMM yyyy hh:mm a')}</span>
          </div>

          <div className="w-full grid grid-cols-6 gap-5 rounded-lg">
            <div className="rounded-lg grid h-full col-span-6 2xl:col-span-3">
              <div className="border row-span-2 h-full rounded-lg py-5 px-8">
                <div className="flex gap-4 flex-col text-gray-500">
                  <div className="flex justify-between flex-col lg:flex-row items-start gap-y-2 lg:items-center">
                    <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                  </div>
                  <div className="flex flex-col text-gray-500 gap-2 rounded-lg text-lg">
                    <div className="flex gap-4 flex-col text-gray-500">
                      {order.items.map((item) => {
                        const product = item.product;

                        return (
                          <div className="border rounded-lg" key={item._id}>
                            <div className="w-full bg-white rounded-lg flex flex-col lg:flex-row">
                              <Link href={`/admin/product/create?id=${item.product.id}`}>
                                <Image
                                  className="p-3 object-cover h-[100px] w-[100px] rounded-lg"
                                  src={product.imageUrl}
                                  alt={product.imageUrl as string}
                                  width={200}
                                  height={200}
                                />
                              </Link>
                              <div className="grid py-4 text-sm">
                                <div className="flex gap-2">
                                  <span>{product.name}</span>
                                  <span>({product.type})</span>
                                </div>
                                <div>Slot: {item.slotNo}</div>
                                <div className="flex gap-2">
                                  {formatCurrencyWithSymbol(item.unitPrice, '', order.currency)}
                                  <span>X</span>
                                  <span>{item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-1 flex-col">
                        <p className="flex justify-between">
                          <span className="font-bold">Total Amount:</span>
                          {formatCurrencyWithSymbol(order.totalAmount, '', order.currency)}
                        </p>
                      </div>
                      <div className="flex gap-1 flex-col">
                        <p className="flex justify-between">
                          <span className="font-bold">Method:</span>
                          {formatPaymentMethod(order.payments[0]?.paymentMethod)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 shadow-lg row-span-2 border h-full p-8 flex flex-col flex-grow flex-wrap gap-5 rounded-lg flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Machine</h2>
                  <Button theme="light" className="flex items-center justify-between">
                    <Link href={`/admin/vending-machine/${order.machine.id}`}> View Details</Link>
                    <MdArrowRight className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex flex-col gap-1 justify-start text-gray-500">
                  <div className="flex flex-col space-y-2 w-full">
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Name:</span>
                        {order.machine.name}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Location:</span>
                        {order.machine.location.name}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Serial No:</span>
                        {order.machine.device.serialNo}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Model No;</span>
                        {order.machine.device.modelNo}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col">
                      <p className="space-x-12 flex justify-between">
                        <span className="font-bold">Contact Person:</span>
                        {order.machine.contactPerson}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-lg border flex flex-col col-span-6 2xl:col-span-3 gap-5 rounded-lg p-8">
              <div className="flex justify-between flex-col lg:flex-row items-start gap-y-2 lg:items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  <span>Order Summary</span>
                  <span>({order.payments[0]?.transactionNo})</span>
                </h2>
                {paymentStatus(order.paymentStatus)}
              </div>
              <div className="flex flex-col text-gray-500 gap-2 rounded-lg text-lg">
                <div>
                  {order.payments[0]?.status === payment.PAYMENT_STATUS_COMPLETED && (
                    <div className="p-5 text-base bg-gray-100 rounded-lg">
                      <span className="w-2 font-bold"></span>
                      <pre className="whitespace-pre-wrap break-words text-sm overflow-auto">
                        {JSON.stringify(paymentInfo, null, 4)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
