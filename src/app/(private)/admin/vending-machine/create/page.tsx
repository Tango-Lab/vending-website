'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  CONNECTIVITY_STATUS_LIST,
  POWER_STATUS_LIST,
} from '@/constants/device';
import DatePicker from '@/core/components/Datepicker';
import { formatDateForForm } from '@/helper/format-date';
import { IVendingMachineForm } from '@/models/VendingMachine';
import { VendingMachineForm } from '@/schema/VendingMachine';
import {
  createVendingMachine,
  getMachineDetailByID,
  updateVendingMachineByID,
} from '@/service/vending-machine';
import { Button, Dropdown, Form, InputText, TextArea } from '@Core';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
  const router = useRouter();
  const id = useSearchParams().get('id') ?? null; // default value is "1"
  const methods = useForm<IVendingMachineForm>({
    defaultValues: { location: { latitude: null, longitude: null } },
    resolver: yupResolver(VendingMachineForm),
  });
  const { setValue } = methods;

  const onFormSubmit: SubmitHandler<IVendingMachineForm> = (data) => {
    const request = id
      ? updateVendingMachineByID(id, data)
      : createVendingMachine(data);

    request.then(() => {
      router.push('/admin/vending-machine');
    });
  };

  useEffect(() => {
    if (id) {
      getMachineDetailByID(id).then((res) => {
        setValue('name', res.name);
        setValue('capacity', res.capacity);
        setValue('contactPerson', res.contactPerson);
        setValue('installationDate', formatDateForForm(res.installationDate));
        setValue('lastRestocked', formatDateForForm(res.lastRestocked));
        setValue('note', res.note);
        //
        setValue('location.name', res.location.name);
        setValue('location.latitude', res.location.latitude);
        setValue('location.longitude', res.location.longitude);
        //
        setValue('device.ip', res.device.ip);
        setValue('device.modelNo', res.device.modelNo);
        setValue('device.serialNo', res.device.serialNo);
        setValue('device.connectivityStatus', res.device.connectivityStatus);
        setValue('device.powerStatus', res.device.powerStatus);
        setValue('device.temperatureSensor', res.device.temperatureSensor);
      });
    }
  }, [id]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Vending Machine Form
      </h2>
      <Form
        classNames="flex flex-col gap-4"
        methods={methods}
        onSubmit={onFormSubmit}
      >
        <div className="grid grid-cols-3 grid-flow-col gap-4">
          <InputText
            name="name"
            label="Machine Name"
            placeholder="Ex: Machine A"
          />
          <InputText name="capacity" label="Capacity" placeholder="Ex: 50" />
          <InputText
            name="contactPerson"
            label="Contact Person"
            placeholder="Ex: 012 555 666"
          />
        </div>
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <DatePicker name="lastRestocked" label="Last Restocked Date" />
          <DatePicker name="installationDate" label="Installation Date" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Location
        </h2>
        <div className="flex flex-col gap-4">
          <InputText
            name="location.name"
            label="Location Name"
            placeholder="Ex: Phnom Penh ...."
          />
          <div className="grid grid-cols-2 gap-4">
            <InputText
              name="location.latitude"
              label="Latitude"
              placeholder="111.11111"
            />
            <InputText
              name="location.longitude"
              label="Longitude"
              placeholder="111.11111"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Device Information
        </h2>
        <div className="flex flex-col gap-4">
          <InputText
            name="device.ip"
            label="IP Address"
            placeholder="127.0.0.1"
          />
          <div className="grid grid-cols-2 gap-4">
            <InputText
              name="device.modelNo"
              label="Model"
              placeholder="SG-TP"
            />
            <InputText
              name="device.serialNo"
              label="Serial No"
              placeholder="124-SG-TP"
            />
          </div>
          <div className="grid grid-cols-2 grid-flow-col gap-4">
            <Dropdown
              name="device.connectivityStatus"
              label="Connectivity Status"
              items={CONNECTIVITY_STATUS_LIST}
            />
            <Dropdown
              name="device.powerStatus"
              label="Power Status"
              items={POWER_STATUS_LIST}
            />
          </div>
        </div>
        <TextArea name="note" label="Note" placeholder="Ex: Note" />
        <div>
          <Button type="submit">Save & Close</Button>
        </div>
      </Form>
    </div>
  );
};

export default Page;
