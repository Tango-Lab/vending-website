'use client';
import React, { useState } from 'react';

import { Button, Header, message, Modal } from '@Core';
import Image from 'next/image';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      style={{
        backgroundImage: 'url("/assets/vending.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
      }}
      className="w-full h-full"
    >
      <Header />

      <Modal visible={openModal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <div className="w-full h-screen flex tilted-layer ">
        <div className="relative h-screen ">
          <div className=" absolute inset-0"></div>
          <div className="relative z-10 p-10 flex flex-col gap-5 ">
            <h1 className="text-4xl font-black">Welcome to VM Mart</h1>
            <p className="">This is an example of a landing page with a tilted background layer.</p>
            <div className="container mx-auto ">
              <div className="flex flex-row gap-4">
                <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
                <Button onClick={() => message.success('This is success')}>Message</Button>
                <Button onClick={() => message.error('This is Error')}>Error</Button>
                <Button onClick={() => message.warning('This is Error')}>Warning</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
