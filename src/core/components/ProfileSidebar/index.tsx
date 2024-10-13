'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useAuthContext } from '@/context/AuthContext';

import Style from './style.module.scss';
import MobileSideBar from './MobileSidebar';

function ProfileSidebar() {
  const router = useRouter();
  const [isCollapse, setIsCollapse] = useState(false);
  const { logOut } = useAuthContext();

  const collapsibleCtx = classNames({
    'max-w-20': isCollapse,
    [Style['is-collapse']]: isCollapse,
    'max-w-[200px]': !isCollapse,
  });

  function onLogoutOut() {
    logOut();
    router.push('/auth/login');
  }

  return (
    <>
      <MobileSideBar />
      <aside className={classNames(collapsibleCtx, 'hidden md:block', Style['sidebar-wrapper'])}>
        <div className={Style['sidebar-content']}>
          <div onClick={() => setIsCollapse(!isCollapse)} className="h-[80px] py-4 px-6 flex items-center">
            <h2>VM Mart</h2>
          </div>
          <ul>
            <Link href="/admin/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link href="/admin/order">
              <li>Order</li>
            </Link>
            <Link href="/admin/product">
              <li>Product</li>
            </Link>
            <Link href="/admin/vending-machine">
              <li>Vending Machine</li>
            </Link>
            <li onClick={onLogoutOut}>Logout</li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default ProfileSidebar;
