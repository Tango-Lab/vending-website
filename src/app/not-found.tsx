'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/core';
import { MdArrowBack } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const PageNotFounf = () => {
  const router = useRouter();

  const redirectToHome = () => {
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center items-center">
        <Image src="/assets/error.jpg" width={500} height={500} alt="error" />
        <Button
          theme="light"
          onClick={redirectToHome}
          className="flex items-center gap-2"
        >
          <MdArrowBack className="h-5 w-5" />
          Back to Homepage
        </Button>
      </div>
    </div>
  );
};

export default PageNotFounf;
