import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <nav className="flex p-4 justify-between items-center bg-white border-gray-200 border-b">
      <div className="flex items-center justify-between gap-3">
        <Image src="/assets/logo/logo-pic.svg" alt="/assets/logo/logo-pic" width={70} height={70} />
        <Image src="/assets/logo/logo-text.svg" alt="/assets/logo/logo-text" width={100} height={100} />
      </div>
      <div className="flex items-center">
        <Link href="/">
          <div className="hover:text-blue-500 ml-8">Home</div>
        </Link>
        <Link href="/">
          <div className="hover:text-blue-500 ml-8">About</div>
        </Link>
        <Link href="/">
          <div className="hover:text-blue-500 ml-8">Contact</div>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/auth/login " className="hover:text-blue-500">
          <div>Login</div>
        </Link>
        <Link href="/auth/sign-up" className="ml-8">
          <div className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 text-center rounded-lg text-sm">
            Getting Start
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
