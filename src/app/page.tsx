'use client';
import React, { useState } from 'react';

import { Button, Header, message, Modal } from '@Core';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Header />

      <Modal visible={openModal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <div className="container mx-auto px-4">
        <h2 className="text-lg">This is Home Page</h2>
        <div className="flex flex-row gap-4">
          <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
          <Button onClick={() => message.success('This is success')}>
            Message
          </Button>
          <Button onClick={() => message.error('This is Error')}>Error</Button>
          <Button onClick={() => message.warning('This is Error')}>
            Warning
          </Button>
        </div>
      </div>
    </>
  );
}
