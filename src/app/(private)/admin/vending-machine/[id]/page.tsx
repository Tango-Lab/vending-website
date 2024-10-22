'use client';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  MdBlock,
  MdClose,
  MdDelete,
  MdDevices,
  MdEditDocument,
  MdOutlineContactPhone,
  MdOutlineFastfood,
  MdOutlineLocationOn,
  MdOutlinePendingActions,
  MdOutlinePowerSettingsNew,
  MdOutlineTaskAlt,
  MdOutlineWifi,
  MdOutlineStorm,
} from 'react-icons/md';

import { AddMachineProductForm } from '@/components/partials/MachineProductForm';
import { formatState } from '@/helper/format-status';
import { capitalizeFirstLetter } from '@/helper/format-text';
import { DropdownItem, MachineProduct, VendingMachineDetail } from '@/models/VendingMachine';
import { deletedOneById } from '@/service/machine-product';
import { getMachineDetailByID } from '@/service/vending-machine';
import { Button, Dropdown, Form, Modal, Pagination } from '@Core';

import { formatDisplayDate } from '../../../../../helper/format-date';
import { useRouter } from 'next/navigation';
import { formatCurrencyWithSymbol } from '@/helper/format-number';
import { useForm } from 'react-hook-form';
import { ListItemType } from '@/core/components/Dropdown';

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [machine, setMachine] = useState<VendingMachineDetail | null>(null);
  const [slots, setSlots] = useState<MachineProduct[]>([]);
  const [selectProduct, setSelectProduct] = useState<MachineProduct | null>(null);

  const limit = 10;

  useEffect(() => {
    if (id) {
      getMachineDetailByID(id)
        .then((res) => {
          if (res) {
            setMachine(res);
            setSlots(res.slots.splice(0, limit));
          }
        })
        .catch(() => {
          router.replace('/404');
        });
    }
  }, [id, isRefresh]);

  const methods = useForm<ListItemType>({ defaultValues: { slotNo: null } });
  const { watch, setValue } = methods;
  const selectedSlotNo = watch('slotNo');

  const dropdownItems: DropdownItem[] = slots.map((slot) => ({ id: slot.slotNo, name: slot.slotNo }));

  // Filter slots based on slotNo selection
  const filteredSlots = selectedSlotNo ? slots.filter((slot) => slot.slotNo === selectedSlotNo) : slots;

  const toggleForm = () => {
    setOpenForm(!openForm);
  };

  const onSuccessAddProduct = () => {
    setOpenForm(false);
    setIsRefresh(!isRefresh);
  };

  const removeProductByID = (id: string) => {
    if (confirm('Do you want to remove this row')) {
      deletedOneById(id).then(() => {
        onSuccessAddProduct();
      });
    }
  };

  const addProduct = () => {
    setSelectProduct(null);
    setOpenForm(!openForm);
  };

  const editProduct = (params: MachineProduct) => {
    setSelectProduct(params);
    setOpenForm(!openForm);
  };

  const onClearFilter = () => {
    setValue('slotNo', null);
  };

  if (!machine) {
    return <></>;
  }

  const onChangeOffset = (offset: number) => {
    const machineSlots = machine.slots.slice(offset, limit + offset);
    setSlots(machineSlots);
  };
  return (
    <>
      <Modal visible={openForm}>
        <AddMachineProductForm
          formValue={selectProduct}
          machineId={id}
          onSuccessSubmit={onSuccessAddProduct}
          closeForm={toggleForm}
        />
      </Modal>

      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{machine.name}</h2>

      <div className="border p-5 rounded-xl gap-3 shadow-inner bg-gray-50 grid text-gray-700">
        <div className="grid gap-y-2">
          <h2 className="font-bold text-lg">Location</h2>
          <div className="flex items-center gap-x-5 pl-5">
            <MdOutlineLocationOn className="text-xl " />
            <span className="w-32 ">Location</span> :<span>{machine.location.name}</span>
          </div>
        </div>
        <hr />
        <div className="grid gap-y-2">
          <h2 className="font-bold text-lg">Info</h2>
          <div className="flex items-center gap-x-5 pl-5">
            <MdOutlineTaskAlt className="text-xl " />
            <span className="w-32 ">Status</span> :<span>{formatState(machine.state)}</span>
          </div>
          <div className="flex items-center gap-x-5 pl-5">
            <MdOutlinePendingActions className="text-xl " />
            <span className="w-32 ">Created at</span> :
            <span> {formatDisplayDate(machine.createdAt, 'DD MMM YYYY')}</span>
          </div>
          <div className="flex items-center gap-x-5 pl-5">
            <MdOutlineFastfood className="text-xl " />
            <span className="w-32 ">Capacity</span> :<span> {machine.capacity}</span>
          </div>
          <div className="flex items-center gap-x-5 pl-5">
            <MdOutlineContactPhone className="text-xl " />
            <span className="w-32 ">Contact Person</span> :<span>{machine.contactPerson}</span>
          </div>
          <div className="flex items-center gap-x-5 pl-5">
            <MdOutlineStorm className="text-xl" />
            <span className="w-32 ">Serial No</span> :<span>{machine.device.serialNo}</span>
          </div>
        </div>
        <hr />
        <div className="grid gap-y-2">
          <h2 className="font-bold text-lg">Devices</h2>
          <div className="flex items-center gap-x-5 pl-5">
            <MdDevices className="text-xl " />
            <span className="w-32 "> IP Address</span> :<span>{machine.device.ip}</span>
          </div>
          <div className="flex items-center gap-x-5 pl-5">
            <MdOutlineWifi className="text-xl " />
            <span className="w-32 ">Connectivity</span> :
            <span>{capitalizeFirstLetter(machine.device.connectivityStatus)}</span>
          </div>
          <div className="flex items-center gap-x-5 pl-5">
            <MdOutlinePowerSettingsNew className="text-xl " />
            <span className="w-32 ">Power Status</span> :
            <span>{capitalizeFirstLetter(machine.device.powerStatus)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mt-10">
        <h2 className="text-3xl">All Product ({machine.slots.length})</h2>
        <Button onClick={addProduct}>Add Products</Button>
      </div>

      <Form methods={methods} classNames="flex gap-4 mt-4 items-center">
        <div className="flex-1 max-w-[200px] flex-grow">
          <Dropdown items={dropdownItems} name="slotNo" placeholder="Select Slot No" />
        </div>
        <Button onClick={onClearFilter}>Clear</Button>
      </Form>

      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Slot No
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Restock Qty
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Available Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSlots.map((row, idx) => {
              const product = row.product;
              return (
                <tr className="bg-white dark:bg-gray-800" key={idx}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link
                      href={{
                        pathname: '/admin/product/create',
                        query: { id: product._id },
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {product.imageUrl && (
                          <Image
                            className="w-10 h-10 rounded-full object-cover"
                            width={100}
                            height={100}
                            src={product.imageUrl}
                            alt={product.imageUrl}
                          />
                        )}
                        {product.name}
                      </div>
                    </Link>
                  </th>
                  <td className="px-6 py-4">{row.slotNo}</td>
                  <td className="px-6 py-4">{formatCurrencyWithSymbol(row.price, '', 'KHR')}</td>
                  <td className="px-6 py-4 text-center"> {row.quantity}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center">
                      {row.availableQuantity === 0 ? (
                        <div
                          title="Available Qty = 0"
                          className={`flex justify-center items-center w-[50px] h-[50px] rounded-full hover:bg-red-100`}
                        >
                          <MdBlock className={`w-7 h-7  text-red-500 rounded-full`} />
                        </div>
                      ) : (
                        <div>{row.availableQuantity}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={classNames(
                          'h-2.5 w-2.5 rounded-full me-2',
                          { 'bg-green-500': row.isActive },
                          { 'bg-red-500': !row.isActive }
                        )}
                      ></div>
                      <div>{row.isActive ? 'Active' : 'Deactive'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{formatDisplayDate(product.createdAt)}</td>
                  <td className="text-center">
                    <button className="p-3 text-center" onClick={() => editProduct(row)}>
                      <MdEditDocument className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                    </button>
                    <button className="p-3 text-center" onClick={() => removeProductByID(row._id)}>
                      <MdDelete className="w-6 h-6 text-gray-400 hover:text-red-400" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          total={selectedSlotNo ? filteredSlots.length : machine.slots.length}
          pageSize={limit}
          onChange={onChangeOffset}
        />
      </div>
    </>
  );
};

export default Page;
