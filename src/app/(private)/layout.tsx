'use client';
import React, { useEffect } from 'react';

import { useAuthContext } from '@/context/AuthContext';
import { ProfileSidebar } from '@Core';

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: Readonly<RootLayoutProps>) {
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    document.body.classList.add('bg-gray');

    return () => {
      document.body.classList.remove('bg-gray');
    };
  }, []);

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <>
      <div className="min-h-screen mt-4 flex max-md:flex-col gap-y-4">
        <ProfileSidebar />
        <main className="flex-1 mx-4 overflow-scroll bg-white rounded-xl">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </>
  );
}
