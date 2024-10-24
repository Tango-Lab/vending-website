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
        backgroundPosition: 'right top',
      }}
      className="w-full h-full"
    >
      <Header />

      <Modal visible={openModal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <div className="w-full h-screen flex xl:tilted-layer">
        <div className="relative h-screen ">
          <div className="relative z-10 p-10 flex gap-5 flex-col ">
            <h1 className="text-4xl font-black">Welcome to VM Mart</h1>
            <p className="text-lg font-semibold w-full">
              Discover a hassle-free way to enjoy your favorite snacks and beverages!
            </p>
            <p className="xl:w-1/3 w-full">
              Our innovative vending machines allow you to select products and pay using your mobile device's QR code.
              Enjoy a contactless, secure, and convenient shopping experience—no cash or cards needed. Scan, pay, and
              savor the moment!
            </p>
            <div>
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
    </div>
  );
}
